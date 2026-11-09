import assert from 'node:assert/strict';
import { createHash, X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { askLumsPoolConfig } from '../../lib/ask-lums/database.mjs';
import { INSERT_QUESTION, recordAfterResponse } from '../../lib/ask-lums/record.mjs';

// Public certificates only (the CopyGPT fixtures). No connection or query is made.
const ca = readFileSync(new URL('./fixtures/copygpt/railway-public-root.pem', import.meta.url), 'utf8');
const leaf = new X509Certificate(readFileSync(new URL('./fixtures/copygpt/railway-public-leaf.pem', import.meta.url)));
const pin = createHash('sha256').update(leaf.raw).digest('hex');
const production = { NODE_ENV: 'production', DATABASE_URL: 'postgresql://test:fake@database.example:5432/demo' };

test('Ask Lums uses the pinned Railway certificate when Production has it', () => {
  const config = askLumsPoolConfig({ ...production, COPYGPT_DB_TLS_CA: ca, COPYGPT_DB_TLS_CERT_SHA256: pin });
  assert.equal(config.connectionString, production.DATABASE_URL);
  assert.equal(config.ssl.rejectUnauthorized, true);
  assert.equal(config.ssl.checkServerIdentity('database.example', leaf.toLegacyObject()), undefined);
  assert.equal(config.connectionTimeoutMillis, 5_000);
  assert.equal(config.query_timeout, 5_000);
});

test('without the certificate variables, verified TLS in production and the old local policy in development', () => {
  assert.equal(askLumsPoolConfig(production).ssl, true);
  assert.equal(askLumsPoolConfig({ ...production, DB_REJECT_UNAUTHORIZED: 'false' }).ssl, true);
  assert.deepEqual(askLumsPoolConfig({ NODE_ENV: 'development' }).ssl, { rejectUnauthorized: false });
});

test('an incomplete certificate setup throws instead of connecting unverified', () => {
  assert.throws(() => askLumsPoolConfig({ ...production, COPYGPT_DB_TLS_CA: ca }), { code: 'COPYGPT_DB_TLS_CONFIG' });
});

function harness({ query, sendUnknownQuery } = {}) {
  const calls = { after: [], query: [], email: [], log: [], error: [] };
  const settle = recordAfterResponse({
    after: (fn) => calls.after.push(fn),
    query: query ?? (async (...args) => { calls.query.push(args); return { rows: [{ id: 42 }] }; }),
    sendUnknownQuery: sendUnknownQuery ?? (async (message) => { calls.email.push(message); }),
    log: { log: (...a) => calls.log.push(a.join(' ')), error: (...a) => calls.error.push(a[0]) },
  });
  return { calls, settle };
}

test('the save is registered with after() at once but waits for the stream to settle', async () => {
  const { calls, settle } = harness();
  assert.equal(calls.after.length, 1);
  const run = calls.after[0]();
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(calls.query.length, 0, 'nothing saved before the answer finished');
  settle({ sessionId: 's1', message: 'How many years?', response: 'Seven.', isUnknown: false });
  await run;
  assert.deepEqual(calls.query, [[INSERT_QUESTION, ['s1', 'How many years?', 'Seven.', false]]]);
  assert.deepEqual(calls.email, []);
  assert.deepEqual(calls.log, ['[Ask Lums] saved question 42']);
  assert.deepEqual(calls.error, []);
});

test('an unknown question is saved and emailed', async () => {
  const { calls, settle } = harness();
  settle({ sessionId: undefined, message: 'Favourite club?', response: 'A joke.', isUnknown: true });
  await calls.after[0]();
  assert.deepEqual(calls.query[0][1], [null, 'Favourite club?', 'A joke.', true]);
  assert.deepEqual(calls.email, ['Favourite club?']);
  assert.deepEqual(calls.log, ['[Ask Lums] saved question 42', '[Ask Lums] emailed unknown question']);
});

test('a failed save and a failed email are logged separately, and neither stops the other', async () => {
  const { calls, settle } = harness({
    query: async () => { throw new Error('self-signed certificate in certificate chain'); },
    sendUnknownQuery: async () => { throw new Error('smtp down'); },
  });
  settle({ sessionId: 's2', message: 'q', response: '', isUnknown: true });
  await calls.after[0]();
  assert.deepEqual(calls.error, ['[Ask Lums save]', '[Ask Lums email]']);
});
