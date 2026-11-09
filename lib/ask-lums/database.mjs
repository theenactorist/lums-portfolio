import { copyGPTDatabaseSSL } from '../copygpt/database-tls.mjs';

// Ask Lums logs questions to the same Railway Postgres as CopyGPT. Its certificate is
// self-signed and named "localhost", so plain `ssl: true` rejects it. CopyGPT's verified
// setup trusts only Railway's CA plus the exact certificate pin when those Production
// variables are set, and is otherwise unchanged (verified TLS, or no checks in local dev).
// Throws when the certificate variables are incomplete or invalid.
export function askLumsPoolConfig(env = process.env) {
  return {
    connectionString: env.DATABASE_URL,
    ssl: copyGPTDatabaseSSL(env),
    max: 3,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
    statement_timeout: 5_000,
    query_timeout: 5_000,
  };
}
