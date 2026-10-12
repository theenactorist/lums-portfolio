import { createHash } from 'node:crypto';

export const VISITOR_LIMIT = 3;
export const NETWORK_DAILY_LIMIT = 6;
export const GLOBAL_DAILY_LIMIT = 30;

function opaqueKey(value, name) {
  if (typeof value !== 'string' || !value.trim() || value.length > 256) {
    throw new TypeError(`${name} must be a non-empty opaque identifier of at most 256 characters.`);
  }
  return createHash('sha256').update(value).digest('hex');
}

function quotaKeys(visitorId, guardId, now) {
  const visitor = opaqueKey(visitorId, 'visitorId');
  const network = opaqueKey(guardId, 'guardId');
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
    throw new TypeError('now must be a valid Date.');
  }
  const day = now.toISOString().slice(0, 10);
  // This order is also the transaction lock order. Visitor keys never expire.
  return [`global:${day}`, `network:${day}:${network}`, `visitor:${visitor}`];
}

function countsFor(keys, rows) {
  const counts = new Map(rows.map(row => [row.quota_key, row.attempts]));
  return keys.map(key => {
    const value = counts.get(key) ?? 0;
    if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid stored quota count.');
    return value;
  });
}

function snapshot([globalUsed, networkUsed, visitorUsed]) {
  const blocked = visitorUsed >= VISITOR_LIMIT ? 'visitor'
    : networkUsed >= NETWORK_DAILY_LIMIT ? 'network'
      : globalUsed >= GLOBAL_DAILY_LIMIT ? 'daily' : null;
  return {
    remaining: blocked ? 0 : Math.max(0, VISITOR_LIMIT - visitorUsed),
    limit: VISITOR_LIMIT,
    blocked,
  };
}

export function createQuotaStore({ pool, tableName = 'copygpt_demo_quota' } = {}) {
  if (typeof pool?.connect !== 'function' || typeof pool?.query !== 'function') {
    throw new TypeError('A PostgreSQL pool with connect and query methods is required.');
  }
  if (typeof tableName !== 'string' || !/^[a-z_][a-z0-9_]{0,62}$/.test(tableName)) {
    throw new TypeError('tableName must be a valid lowercase PostgreSQL identifier.');
  }
  const table = `"${tableName}"`;
  let schemaReady;

  async function transaction(operation) {
    const client = await pool.connect();
    let active = false;
    let discard = false;
    try {
      await client.query('BEGIN');
      active = true;
      const result = await operation(client);
      await client.query('COMMIT');
      active = false;
      return result;
    } catch (error) {
      if (active) {
        try { await client.query('ROLLBACK'); }
        catch { discard = true; }
      }
      throw error;
    } finally {
      client.release(discard);
    }
  }

  async function ensureSchema() {
    if (!schemaReady) {
      // A transaction-scoped schema lock also serializes cold starts from
      // separate instances; CREATE IF NOT EXISTS alone can race in pg's catalog.
      schemaReady = transaction(async client => {
        await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`copygpt-schema:${tableName}`]);
        await client.query(`CREATE TABLE IF NOT EXISTS ${table} (
          quota_key TEXT PRIMARY KEY,
          attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0)
        )`);
      }).catch(error => {
        schemaReady = undefined;
        throw error;
      });
    }
    await schemaReady;
  }

  async function status(visitorId, guardId, now = new Date()) {
    const keys = quotaKeys(visitorId, guardId, now);
    await ensureSchema();
    // One statement observes a consistent snapshot; missing counters mean zero.
    const result = await pool.query(`SELECT quota_key, attempts FROM ${table} WHERE quota_key = ANY($1::text[])`, [keys]);
    return snapshot(countsFor(keys, result.rows));
  }

  async function reserve(visitorId, guardId, now = new Date()) {
    const keys = quotaKeys(visitorId, guardId, now);
    await ensureSchema();
    return transaction(async client => {
      const counts = [];
      async function lockCounter(key) {
        // A competing first INSERT waits on the unique key, then reads the
        // committed count under FOR UPDATE.
        await client.query(`INSERT INTO ${table} (quota_key, attempts) VALUES ($1, 0) ON CONFLICT (quota_key) DO NOTHING`, [key]);
        const result = await client.query(`SELECT quota_key, attempts FROM ${table} WHERE quota_key = $1 FOR UPDATE`, [key]);
        if (result.rows.length !== 1) throw new Error('Quota counter could not be locked.');
        return countsFor([key], result.rows)[0];
      }
      async function blockedSnapshot() {
        // Preserve the existing visitor/network priority without creating new
        // counters for requests that the shared gates already reject.
        const result = await client.query(`SELECT quota_key, attempts FROM ${table} WHERE quota_key = ANY($1::text[])`, [keys]);
        return { ...snapshot(countsFor(keys, result.rows)), allowed: false };
      }
      counts.push(await lockCounter(keys[0]));
      if (counts[0] >= GLOBAL_DAILY_LIMIT) return blockedSnapshot();
      counts.push(await lockCounter(keys[1]));
      if (counts[1] >= NETWORK_DAILY_LIMIT) return blockedSnapshot();
      counts.push(await lockCounter(keys[2]));
      const before = snapshot(counts);
      if (before.blocked) return { ...before, allowed: false };
      const result = await client.query(`UPDATE ${table} SET attempts = attempts + 1 WHERE quota_key = ANY($1::text[]) RETURNING quota_key, attempts`, [keys]);
      if (result.rowCount !== keys.length) throw new Error('Quota reservation did not update every counter.');
      // Reservations commit before provider work and have no refund operation.
      return { ...snapshot(countsFor(keys, result.rows)), allowed: true };
    });
  }

  return { status, reserve };
}
