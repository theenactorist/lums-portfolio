import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';

export const VISITOR_COOKIE = 'copygpt_visitor';
const idPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const sign = (value, secret) => createHmac('sha256', secret).update(`copygpt:v1:${value}`).digest('base64url');

export function visitorIdentity(cookie, secret) {
  if (!secret) throw new Error('CopyGPT signing configuration unavailable');
  const [id, signature, extra] = typeof cookie === 'string' ? cookie.split('.') : [];
  if (idPattern.test(id ?? '') && /^[\w-]{43}$/.test(signature ?? '') && !extra) {
    const expected = Buffer.from(sign(id, secret));
    const actual = Buffer.from(signature);
    if (expected.length === actual.length && timingSafeEqual(expected, actual)) return { id, cookie, minted: false };
  }
  const nextId = randomUUID();
  return { id: nextId, cookie: `${nextId}.${sign(nextId, secret)}`, minted: true };
}

export function networkGuard(headers, secret, vercel = false) {
  // Only Vercel's overwritten header is trusted. Direct/local hosting uses a
  // shared guard, so a forged forwarding header cannot reset the budget.
  const candidate = vercel ? headers.get('x-vercel-forwarded-for')?.trim() : '';
  const network = isIP(candidate ?? '') ? candidate : 'shared-direct-network';
  return sign(`network:${network}`, secret);
}

export function cookieOptions(url) {
  return { httpOnly: true, sameSite: 'strict', secure: new URL(url).protocol === 'https:',
    path: '/api/copygpt', maxAge: 365 * 24 * 60 * 60 };
}
