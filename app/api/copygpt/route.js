import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Pool } from 'pg';
import { createQuotaStore } from '@/lib/copygpt/quota.mjs';
import { createCopyGPTService, PROVIDER_TIMEOUT_MS } from '@/lib/copygpt/service.mjs';
import { cookieOptions, networkGuard, VISITOR_COOKIE, visitorIdentity } from '@/lib/copygpt/identity.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 45;
let quotaStore;

function service() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const database = process.env.DATABASE_URL;
  if (!apiKey || !database) return createCopyGPTService({ configured: false });
  // Separate quota-only store. Ask Lums and its conversation logging are not used.
  if (!globalThis.copyGPTQuotaPool) {
    globalThis.copyGPTQuotaPool = new Pool({ connectionString: database, max: 3,
      connectionTimeoutMillis: 5_000, idleTimeoutMillis: 10_000,
      statement_timeout: 5_000, query_timeout: 5_000,
      ssl: process.env.NODE_ENV === 'development' || process.env.DB_REJECT_UNAUTHORIZED === 'false' ? { rejectUnauthorized: false } : true });
    globalThis.copyGPTQuotaPool.on('error', () => {});
  }
  if (!quotaStore) quotaStore = createQuotaStore({ pool: globalThis.copyGPTQuotaPool });
  const client = new Anthropic({ apiKey, maxRetries: 0, timeout: PROVIDER_TIMEOUT_MS });
  return createCopyGPTService({
    quota: quotaStore,
    provider: body => client.messages.create(body, { maxRetries: 0, timeout: PROVIDER_TIMEOUT_MS }),
    identity: request => ({
      ...visitorIdentity(request.cookies.get(VISITOR_COOKIE)?.value, apiKey),
      guard: networkGuard(request.headers, apiKey, process.env.VERCEL === '1'),
    }),
  });
}

function send(result, request) {
  const response = NextResponse.json(result.body, { status: result.status, headers: { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
  if (result.visitor?.minted) response.cookies.set(VISITOR_COOKIE, result.visitor.cookie, cookieOptions(request.url));
  return response;
}

export async function GET(request) { return send(await service().status(request), request); }
export async function POST(request) { return send(await service().submit(request), request); }
