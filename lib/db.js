import { Pool } from 'pg';

const sslConfig = process.env.NODE_ENV === 'development' || process.env.DB_REJECT_UNAUTHORIZED === 'false' 
  ? { rejectUnauthorized: false } 
  : true;

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: sslConfig 
});

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
