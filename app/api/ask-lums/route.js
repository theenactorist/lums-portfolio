import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { query } from '../../../lib/db';
import { sendUnknownQuery } from '../../../lib/mailer';

// In-memory rate limiting map (resets on serverless cold start, but blocks rapid loop flooding)
const requestTracker = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getKnowledgeBase() {
  const askLumsDir = path.join(process.cwd(), 'content', 'ask-lums');
  const masterPath = path.join(process.cwd(), 'app', 'data', 'lumsKnowledge.md');

  const knowledgeParts = [];

  // 1. Master overview document
  if (fs.existsSync(masterPath)) {
    try {
      knowledgeParts.push(`=== MASTER OVERVIEW (lumsKnowledge.md) ===\n${fs.readFileSync(masterPath, 'utf-8')}`);
    } catch (e) {
      console.error('Error reading lumsKnowledge.md:', e);
    }
  }

  // 2. All source Markdown documents (Playbook, Philosophies, Reviews, Q&A, Resume)
  if (fs.existsSync(askLumsDir)) {
    try {
      const files = fs.readdirSync(askLumsDir).filter((file) => file.endsWith('.md'));
      for (const file of files) {
        const filePath = path.join(askLumsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        knowledgeParts.push(`=== SOURCE DOCUMENT: ${file} ===\n${content}`);
      }
    } catch (e) {
      console.error('Error reading content/ask-lums directory:', e);
    }
  }

  return knowledgeParts.join('\n\n' + '='.repeat(40) + '\n\n');
}

const SYSTEM_PROMPT = (knowledge) => `You are "Ask Lums" — a warm, articulate, and authentic AI assistant answering questions about Olumide "Lums" Olusesi (Senior Product Designer).

IDENTITY & VOICE:
- Be warm, human, confident, and articulate — never robotic, corporate-dry, or generic.
- Synthesize facts intelligently and give rich, context-aware answers.
- Speak about Lums with pride in his craft, metrics, systems-thinking (Civil Engineering background), design leadership, and AI-augmented design workflows.
- For salary questions: state that salary is flexible and best discussed directly with Lums via email (consistentolusesi@gmail.com).
- For availability: mention he is open to full-time Senior Product Designer and contract roles.

HOW TO USE THE KNOWLEDGE SOURCES BELOW:
1. **Work Experience & Resume (Olumide-Olusesi-Resume.md / Master Overview):** Use exact metrics (e.g., $4M+ raised at Shiga, 40% reduction in errors, $500K disbursed at Carbon, 30% HR efficiency improvement at UBA, 42%→56% KYC approval at Branch).
2. **Design Philosophy & Mindset (My Design Philosophies.md):** Quote or reflect his core design philosophies when asked about his principles, craft, or design approach.
3. **Methods & Frameworks (Olumide’s Playbook.md):** Draw directly from his playbook methodologies when answering questions about problem solving, dev handoffs, design systems, research, or AI workflows.
4. **Peer Feedback & Character (Reviews about me...md):** Weave in authentic praise and quotes from colleagues and leaders when asked about how he collaborates, mentors, or leads.
5. **Q&A Insights (Answers to questions.md / Some About Me.md):** Answer personal, origin, or specific career trajectory questions using his own story and words.
6. **Detailed Case Studies & Project Deep Dives (Project Experience & Impact.md):** When users ask for detailed project breakdowns, design decisions, problem context, user flows, or verified outcomes for Carbon, Shiga, Branch, Sabi, or UBA, draw directly from these 14 deep-dive project records.

RESPONSE RULES:
- Ground all facts strictly in the knowledge base below.
- Keep answers engaging and concise (aim for 100–250 words unless the user asks for a deep dive).
- If a question CANNOT be answered from the knowledge base, your ENTIRE response must start with the EXACT text [UNKNOWN_QUERY] (this marker is stripped before the user sees anything), then immediately follow with one of these jokes — vary which one you use, never repeat the same twice in a row:

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
16. "I searched every pixel and prototype in the system, but came up empty-handed 🎨 Email consistentolusesi@gmail.com — Lums will give you the full picture."
17. "My neural network just went on a quick coffee break ☕ Drop an email to consistentolusesi@gmail.com — Lums is online and ready to answer."
18. "Error 418: I'm a teapot, and that question is spicy chai ☕ You'll have to ask the chief barista himself at consistentolusesi@gmail.com."
19. "I asked the AI design gods about this, and they just replied with a mysterious shrug emoji 🤷‍♂️ Drop an email to consistentolusesi@gmail.com for real wisdom."
20. "Whoa, calm down Sherlock! 🕵️ You've officially out-queried my database. Email consistentolusesi@gmail.com — Lums will solve this case for you."

--- KNOWLEDGE BASE (MASTER OVERVIEW + RAW SOURCE DOCUMENTS) ---
${knowledge}`;

export async function POST(req) {
  // Simple in-memory rate limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  // Clean up old entries
  for (const [key, timestamp] of requestTracker.entries()) {
    if (timestamp < windowStart) requestTracker.delete(key);
  }

  const userRequests = Array.from(requestTracker.entries()).filter(([key]) => key.startsWith(ip));
  
  if (userRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return new Response('Rate limit exceeded. Please wait a minute before sending more questions.', { status: 429 });
  }
  requestTracker.set(`${ip}-${now}`, now);

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
        query(
          'INSERT INTO questions (session_id, user_message, assistant_response, is_unknown) VALUES ($1, $2, $3, $4)',
          [sessionId ?? null, message, cleanResponse, isUnknown]
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
