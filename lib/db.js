import { Pool } from 'pg';
import { askLumsPoolConfig } from './ask-lums/database.mjs';

// Built on first use, so an incomplete certificate setup fails the query (logged by the
// caller) instead of the import, which would take the Ask Lums answer down with it.
function pool() {
  if (!globalThis.askLumsPool) {
    const created = new Pool(askLumsPoolConfig());
    created.on('error', (err) => console.error('[Ask Lums database]', err));
    globalThis.askLumsPool = created;
  }
  return globalThis.askLumsPool;
}

export async function query(text, params) {
  const client = await pool().connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS questions (
      id                 SERIAL PRIMARY KEY,
      session_id         VARCHAR(64),
      user_message       TEXT NOT NULL,
      assistant_response TEXT,
      is_unknown         BOOLEAN DEFAULT FALSE,
      created_at         TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
