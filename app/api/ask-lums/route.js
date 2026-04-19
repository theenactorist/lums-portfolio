import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { initDb, query } from '../../../lib/db';
import { sendUnknownQuery } from '../../../lib/mailer';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getKnowledgeBase() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'lumsKnowledge.md');
  return fs.readFileSync(filePath, 'utf-8');
}

const SYSTEM_PROMPT = (knowledge) => `You are "Ask Lums" — a warm, witty AI assistant answering questions about Olumide "Lums" Olusesi.
Answer ONLY from the knowledge base below. Be concise, human, and confident — not robotic.
For salary questions: say it's flexible and should be discussed directly with Lums via email.
For availability: say he's open to full-time and contract roles.
Keep responses under 200 words unless detail is truly needed.

If a question CANNOT be answered from the knowledge base, your ENTIRE response must start with the EXACT text [UNKNOWN_QUERY] (this marker is stripped before the user sees anything), then immediately follow with one of these jokes — vary which one you use, never repeat the same twice in a row:

1. "Whoa — looks like you've found a tear in the wormhole. Even my neural pathways don't have data on that one 🌀 Try emailing Lums directly at consistentolusesi@gmail.com — he handles the mysteries of the universe personally."
2. "Hmm, my knowledge matrix just returned a 404 on that one 🤖 Lums keeps some things off the grid. Fire him an email at consistentolusesi@gmail.com and he'll get back to you."
3. "That question just blue-screened my brain. I've searched every dimension of Lums' data and came up empty 💥 Email consistentolusesi@gmail.com — he's far better at answering the unanswerable."
4. "Ooh, you've wandered into uncharted territory 🗺️ My training didn't cover that corner of the Lumsverse. Drop him an email at consistentolusesi@gmail.com."
5. "Bold question. Tragically, that one exists outside my event horizon 🌌 Try consistentolusesi@gmail.com — Lums himself is the best source for the really deep cuts."
6. "I just ran a deep scan across the entire Lumsverse and got… nothing. You've officially asked the forbidden question 🔍 Shoot an email to consistentolusesi@gmail.com — Lums will sort you out."
7. "Interesting. My circuits are drawing a blank on that one — and I never draw blanks 😅 This one's above my clearance level. Email consistentolusesi@gmail.com."
8. "You've unlocked a secret level. Unfortunately, I don't have the cheat code 🎮 Try consistentolusesi@gmail.com — Lums is the final boss on questions like this."
9. "My quantum processor just spun for 3 seconds and returned… vibes. That's it. Just vibes. 🌀 Email consistentolusesi@gmail.com for actual answers."
10. "Ah, a rare breed of question. I respect it. I just can't answer it 🫡 Lums can though — hit him at consistentolusesi@gmail.com."
11. "I tried to look that up in every parallel universe I have access to. Zero results. Which is wild. 🪐 Try consistentolusesi@gmail.com."
12. "That question skipped right past my knowledge base and kept going 😂 It's out there somewhere. Email consistentolusesi@gmail.com — Lums will track it down."
13. "Okay so I know a LOT about Lums. But this? This one broke me a little 🤯 Email consistentolusesi@gmail.com and ask him directly."
14. "My training data is whispering 'we don't talk about that one.' 🤫 Email consistentolusesi@gmail.com — what happens next is between you and Lums."
15. "I searched, I scanned, I meditated on it. Still nothing. 🧘 You'll need to go to the source: consistentolusesi@gmail.com."

--- KNOWLEDGE BASE ---
${knowledge}`;

export async function POST(req) {
  const { message, sessionId, history = [] } = await req.json();
  if (!message?.trim()) {
    return new Response('Missing message', { status: 400 });
  }

  const knowledge = getKnowledgeBase();

  // Build messages array from history + current message
  // Strip [UNKNOWN_QUERY] prefix from any prior assistant messages
  const priorMessages = history
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role,
      content: m.role === 'assistant'
        ? m.content.replace(/^\[UNKNOWN_QUERY\]\s*/i, '')
        : m.content,
    }))
    .filter((m) => m.content.trim());
  const messages = [...priorMessages, { role: 'user', content: message }];

  // Streaming response setup
  const encoder = new TextEncoder();
  let fullResponse = '';
  let isUnknown = false;
  let headerStripped = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await client.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT(knowledge),
          messages,
        });

        for await (const chunk of anthropicStream) {
          if (chunk.type === 'content_block_delta' && chunk.delta?.type === 'text_delta') {
            const text = chunk.delta.text;
            fullResponse += text;

            // Strip [UNKNOWN_QUERY] marker before streaming to client
            if (!headerStripped) {
              if (fullResponse.startsWith('[UNKNOWN_QUERY]')) {
                isUnknown = true;
                // Wait until we have text past the marker before streaming
                const afterMarker = fullResponse.slice('[UNKNOWN_QUERY]'.length);
                if (afterMarker.length > 0) {
                  headerStripped = true;
                  controller.enqueue(encoder.encode(afterMarker));
                }
              } else if (fullResponse.length >= '[UNKNOWN_QUERY]'.length || !('[UNKNOWN_QUERY]'.startsWith(fullResponse))) {
                // Definitely not an unknown query — stream normally
                headerStripped = true;
                controller.enqueue(encoder.encode(fullResponse));
              }
              // Otherwise keep buffering until we know
            } else {
              controller.enqueue(encoder.encode(text));
            }
          }
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      }

      // Background: save to DB + email if unknown (non-blocking)
      const cleanResponse = isUnknown
        ? fullResponse.slice('[UNKNOWN_QUERY]'.length).trim()
        : fullResponse.trim();

      Promise.all([
        initDb().then(() =>
          query(
            'INSERT INTO questions (session_id, user_message, assistant_response, is_unknown) VALUES ($1, $2, $3, $4)',
            [sessionId ?? null, message, cleanResponse, isUnknown]
          )
        ),
        isUnknown ? sendUnknownQuery(message) : Promise.resolve(),
      ]).catch((err) => console.error('[Ask Lums background]', err));
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
