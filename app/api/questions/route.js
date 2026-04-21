import { query, initDb } from '../../../lib/db';
import crypto from 'crypto';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const providedKey = searchParams.get('key') || '';
  const expectedKey = process.env.ADMIN_KEY || '';

  let isAuthorized = false;
  try {
    if (providedKey.length === expectedKey.length && expectedKey.length > 0) {
      isAuthorized = crypto.timingSafeEqual(
        Buffer.from(providedKey),
        Buffer.from(expectedKey)
      );
    }
  } catch (err) {
    isAuthorized = false;
  }

  if (!isAuthorized) {
    return new Response('Unauthorized', { status: 401 });
  }

  await initDb();
  const result = await query(
    'SELECT id, session_id, user_message, assistant_response, is_unknown, created_at FROM questions ORDER BY created_at DESC LIMIT 100'
  );

  return Response.json({ questions: result.rows });
}
