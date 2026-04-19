import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function query(text, params) {
  const client = await pool.connect();
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
