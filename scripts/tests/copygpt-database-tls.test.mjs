import assert from 'node:assert/strict';
import { createHash, X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { checkServerIdentity, createSecureContext } from 'node:tls';
import test from 'node:test';
import { copyGPTDatabaseSSL } from '../../lib/copygpt/database-tls.mjs';

// Public certificates only, authenticated from the owner's Railway dashboard.
// No private key, DATABASE_URL, connection, query or provider request is used.
const ca = readFileSync(new URL('./fixtures/copygpt/railway-public-root.pem', import.meta.url), 'utf8');
const leaf = new X509Certificate(readFileSync(new URL('./fixtures/copygpt/railway-public-leaf.pem', import.meta.url)));
const pin = createHash('sha256').update(leaf.raw).digest('hex');
const production = { NODE_ENV: 'production', DATABASE_URL: 'postgresql://test:fake@database.example:5432/demo' };
const configured = (overrides = {}) => ({ ...production, COPYGPT_DB_TLS_CA: ca, COPYGPT_DB_TLS_CERT_SHA256: pin, ...overrides });
const isConfigurationError = error => error.code === 'COPYGPT_DB_TLS_CONFIG' && !error.message.includes('fake@');

test('normal production uses verified TLS and ignores the broad insecure override', () => {
  assert.equal(copyGPTDatabaseSSL(production), true);
  assert.equal(copyGPTDatabaseSSL({ ...production, DB_REJECT_UNAUTHORIZED: 'false' }), true);
  assert.equal(copyGPTDatabaseSSL({}), true);
});

test('development preserves the existing local policy unless explicit pinning is configured', () => {
  assert.deepEqual(copyGPTDatabaseSSL({ NODE_ENV: 'development' }), { rejectUnauthorized: false });
  assert.equal(copyGPTDatabaseSSL(configured({ NODE_ENV: 'development' })).rejectUnauthorized, true);
});

test('partial, blank, invalid-type and malformed pin configurations fail closed', () => {
  for (const change of [
    { COPYGPT_DB_TLS_CA: undefined }, { COPYGPT_DB_TLS_CERT_SHA256: undefined },
    { COPYGPT_DB_TLS_CA: '' }, { COPYGPT_DB_TLS_CERT_SHA256: '' },
    { COPYGPT_DB_TLS_CA: false }, { COPYGPT_DB_TLS_CERT_SHA256: 123 },
    { COPYGPT_DB_TLS_CERT_SHA256: 'a'.repeat(63) },
    { COPYGPT_DB_TLS_CERT_SHA256: 'a'.repeat(65) },
    { COPYGPT_DB_TLS_CERT_SHA256: 'g'.repeat(64) },
    { COPYGPT_DB_TLS_CERT_SHA256: leaf.fingerprint256 },
  ]) assert.throws(() => copyGPTDatabaseSSL(configured(change)), isConfigurationError);
  assert.throws(() => copyGPTDatabaseSSL({ ...production, COPYGPT_DB_TLS_CA: '', COPYGPT_DB_TLS_CERT_SHA256: '' }), isConfigurationError);
});

test('CA must be one bounded parseable CA certificate, not a leaf, key, bundle or junk', () => {
  for (const invalid of ['not a certificate', '-----BEGIN CERTIFICATE-----\nAAAA\n-----END CERTIFICATE-----',
    leaf.toString(), `${ca.trim()}\n${ca.trim()}`, `${ca}\n-----BEGIN PRIVATE KEY-----`, 'x'.repeat(16_385)]) {
    assert.throws(() => copyGPTDatabaseSSL(configured({ COPYGPT_DB_TLS_CA: invalid })), isConfigurationError);
  }
});

test('CA plus the exact authenticated leaf pin builds a verified Node TLS context', () => {
  const ssl = copyGPTDatabaseSSL(configured());
  assert.equal(ssl.rejectUnauthorized, true);
  assert.equal(ssl.ca, new X509Certificate(ca).toString().trim());
  assert.doesNotThrow(() => createSecureContext(ssl));
  assert.equal(leaf.verify(new X509Certificate(ssl.ca).publicKey), true);
  assert.equal(ssl.checkServerIdentity('database.example', leaf.toLegacyObject()), undefined);
  // This certificate is genuinely localhost-named; ordinary hostname matching
  // fails. Pinning permits only these exact authenticated bytes, not any leaf.
  assert.ok(checkServerIdentity('database.example', leaf.toLegacyObject()) instanceof Error);
});

test('an incorrect pin rejects the real leaf even when ordinary hostname matching succeeds', () => {
  const ssl = copyGPTDatabaseSSL(configured({ COPYGPT_DB_TLS_CERT_SHA256: '0'.repeat(64) }));
  assert.equal(checkServerIdentity('localhost', leaf.toLegacyObject()), undefined);
  assert.equal(ssl.checkServerIdentity('localhost', leaf.toLegacyObject()).code, 'COPYGPT_DB_TLS_PIN_MISMATCH');
});

test('a rotated/different leaf or missing raw certificate cannot pass a claimed fingerprint', () => {
  const ssl = copyGPTDatabaseSSL(configured());
  const altered = Buffer.from(leaf.raw); altered[altered.length - 1] ^= 1;
  for (const certificate of [undefined, {}, { raw: Buffer.alloc(0) }, { fingerprint256: leaf.fingerprint256 },
    { raw: altered, fingerprint256: leaf.fingerprint256 }]) {
    assert.equal(ssl.checkServerIdentity('database.example', certificate).code, 'COPYGPT_DB_TLS_PIN_MISMATCH');
  }
});

test('environment newline/CRLF and uppercase hex are normalized without weakening verification', () => {
  const ssl = copyGPTDatabaseSSL(configured({ COPYGPT_DB_TLS_CA: `\n${ca.replaceAll('\n', '\r\n')}\n`, COPYGPT_DB_TLS_CERT_SHA256: ` ${pin.toUpperCase()}\n` }));
  assert.equal(ssl.rejectUnauthorized, true);
  assert.equal(ssl.checkServerIdentity('database.example', leaf.toLegacyObject()), undefined);
});

test('connection-string TLS parameters cannot overwrite production verification or custom pinning', () => {
  for (const key of ['ssl', 'sslmode', 'sslcert', 'sslkey', 'sslrootcert', 'sslnegotiation', 'SSLmode', 'uselibpqcompat']) {
    const DATABASE_URL = `${production.DATABASE_URL}?${key}=no-verify`;
    assert.throws(() => copyGPTDatabaseSSL({ ...production, DATABASE_URL }), isConfigurationError);
    assert.throws(() => copyGPTDatabaseSSL(configured({ DATABASE_URL })), isConfigurationError);
  }
  assert.equal(copyGPTDatabaseSSL({ ...production, DATABASE_URL: `${production.DATABASE_URL}?application_name=copygpt` }), true);
  for (const DATABASE_URL of ['not-a-url', 'https://database.example']) {
    assert.throws(() => copyGPTDatabaseSSL({ ...production, DATABASE_URL }), isConfigurationError);
  }
});
