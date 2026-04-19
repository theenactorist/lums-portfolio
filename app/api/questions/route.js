import { query, initDb } from '../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('key') !== process.env.ADMIN_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  await initDb();
  const result = await query(
    'SELECT id, session_id, user_message, assistant_response, is_unknown, created_at FROM questions ORDER BY created_at DESC LIMIT 100'
  );

  return Response.json({ questions: result.rows });
}
