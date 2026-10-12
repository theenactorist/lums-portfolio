import { createHash, timingSafeEqual, X509Certificate } from 'node:crypto';

function configurationError() {
  return Object.assign(new Error('CopyGPT database TLS configuration is incomplete or invalid.'), {
    code: 'COPYGPT_DB_TLS_CONFIG',
  });
}

function rejectConnectionStringTLSOverrides(database) {
  if (database === undefined) return;
  let url;
  try { url = new URL(database); }
  catch { throw configurationError(); }
  if (!['postgres:', 'postgresql:'].includes(url.protocol)) throw configurationError();
  // pg parses connectionString after the explicit ssl option. These query keys
  // can replace that option and silently discard CA verification or the pin.
  for (const name of url.searchParams.keys()) {
    if (/^ssl/i.test(name) || name.toLowerCase() === 'uselibpqcompat') throw configurationError();
  }
}

export function copyGPTDatabaseSSL(env = process.env) {
  const caValue = env.COPYGPT_DB_TLS_CA;
  const pinValue = env.COPYGPT_DB_TLS_CERT_SHA256;
  const configured = caValue !== undefined || pinValue !== undefined;
  if (!configured && env.NODE_ENV === 'development') return { rejectUnauthorized: false };
  rejectConnectionStringTLSOverrides(env.DATABASE_URL);
  if (!configured) return true;
  if (typeof caValue !== 'string' || typeof pinValue !== 'string') throw configurationError();
  const caInput = caValue.trim();
  const pin = pinValue.trim();
  // Railway's public download may include a readable OpenSSL certificate dump.
  // Trust only its one actual certificate, never a bundle or key material.
  const blocks = caInput.match(/-----BEGIN CERTIFICATE-----[A-Za-z0-9+/=\r\n]+-----END CERTIFICATE-----/g);
  const beginnings = caInput.match(/-----BEGIN [^-]+-----/g);
  if (caInput.length > 16_384 || !/^[a-f0-9]{64}$/i.test(pin) || blocks?.length !== 1 || beginnings?.length !== 1) {
    throw configurationError();
  }
  let ca;
  try {
    const certificate = new X509Certificate(blocks[0]);
    if (!certificate.ca) throw configurationError();
    ca = certificate.toString().trim();
  } catch { throw configurationError(); }
  const expected = Buffer.from(pin, 'hex');
  return {
    ca,
    rejectUnauthorized: true,
    // Node verifies the trusted chain and certificate validity before calling
    // this callback. The authenticated exact leaf pin replaces only hostname
    // matching for Railway's localhost-named PostgreSQL certificate.
    checkServerIdentity(_hostname, certificate) {
      if (Buffer.isBuffer(certificate?.raw) && certificate.raw.length > 0) {
        const actual = createHash('sha256').update(certificate.raw).digest();
        if (timingSafeEqual(actual, expected)) return undefined;
      }
      return Object.assign(new Error('CopyGPT database TLS certificate pin does not match.'), {
        code: 'COPYGPT_DB_TLS_PIN_MISMATCH',
      });
    },
  };
}
