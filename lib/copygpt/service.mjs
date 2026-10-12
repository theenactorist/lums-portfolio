import { CopyGPTInputError, readSubmission, validateResult } from './contracts.mjs';
import { RESULT_SCHEMA, systemText } from './system.mjs';

export const MODEL = 'claude-sonnet-5-5';
export const MAX_OUTPUT_TOKENS = 512;
export const PROVIDER_TIMEOUT_MS = 30_000;
const unavailable = 'CopyGPT is temporarily unavailable. No model request was sent. Please try again later.';
const limitMessages = {
  visitor: 'You have used all 3 submissions for this browser. Thanks for trying CopyGPT.',
  network: 'This connection has reached the demo’s daily allowance. Please try again tomorrow.',
  daily: 'CopyGPT has reached its daily demo allowance. Please try again tomorrow.',
};
const response = (body, status = 200) => ({ status, body });
const statusBody = state => ({ ready: true, model: MODEL, limit: 3, remaining: state.remaining, blocked: state.blocked });

export function buildModelRequest(submission) {
  const content = [];
  if (submission.image) content.push({ type: 'image', source: { type: 'base64', media_type: submission.image.mediaType, data: submission.image.data } });
  content.push({ type: 'text', text: submission.message || 'Please review this screenshot. Ask me which one text item to rewrite if it is unclear.' });
  return {
    model: MODEL, max_tokens: MAX_OUTPUT_TOKENS,
    thinking: { type: 'between_tools' },
    output_config: { effort: 'low', format: { type: 'json_schema', schema: RESULT_SCHEMA } },
    system: [{ type: 'text', text: systemText, cache_control: { type: 'ephemeral' } }],
    messages: [...submission.history, { role: 'user', content }],
  };
}

export function parseModelResult(message) {
  if (message?.model !== MODEL || message.stop_reason !== 'end_turn') throw new Error('Incomplete or unexpected model response');
  const blocks = message.content?.filter(block => block.type === 'text');
  if (!blocks?.length) throw new Error('No model text response');
  return validateResult(JSON.parse(blocks.map(block => block.text).join('')));
}

export function createCopyGPTService({ quota, provider, identity, configured = true }) {
  async function status(request) {
    if (!configured) return response({ ready: false, remaining: null, error: unavailable }, 503);
    try {
      const visitor = identity(request);
      const state = await quota.status(visitor.id, visitor.guard);
      return { ...response(statusBody(state)), visitor };
    } catch {
      return response({ ready: false, remaining: null, error: unavailable }, 503);
    }
  }

  async function submit(request) {
    // Invalid input and cross-site requests are rejected before quota writes.
    let submission;
    try {
      // Next development can normalise request.url to localhost even when the
      // browser uses 127.0.0.1. Compare with the actual HTTP Host, which browsers
      // cannot override, while retaining the server URL's protocol.
      const expectedOrigin = new URL(request.url);
      if (request.headers.get('host')) expectedOrigin.host = request.headers.get('host');
      if (request.headers.get('origin') !== expectedOrigin.origin ||
        ['cross-site', 'same-site'].includes(request.headers.get('sec-fetch-site'))) {
        throw new CopyGPTInputError('Submit from the CopyGPT page.', 403);
      }
      submission = await readSubmission(request);
    } catch (error) {
      return response({ error: error instanceof CopyGPTInputError ? error.message : 'Invalid request.' }, error instanceof CopyGPTInputError ? error.status : 400);
    }
    if (!configured) return response({ ready: false, remaining: null, error: unavailable }, 503);
    let visitor, reservation;
    try {
      visitor = identity(request);
      reservation = await quota.reserve(visitor.id, visitor.guard);
    } catch {
      return response({ ready: false, remaining: null, error: unavailable }, 503);
    }
    const state = statusBody(reservation);
    if (!reservation.allowed) return { ...response({ ...state, error: limitMessages[reservation.blocked] ?? limitMessages.visitor }, 429), visitor };
    try {
      // Exactly one attempt. Reservations are never refunded: a timeout or
      // provider failure may already have incurred cost.
      const output = await provider(buildModelRequest(submission));
      return { ...response({ ...state, result: parseModelResult(output) }), visitor };
    } catch (error) {
      let detail = 'Claude could not complete this submission.';
      if ([401, 403, 404].includes(error?.status)) detail = 'The requested Claude Sonnet 5.5 model is unavailable for this account.';
      if (error?.name === 'APIConnectionTimeoutError') detail = 'Claude took too long to respond.';
      return { ...response({ ...state, error: `${detail} This attempt used one submission.${state.remaining ? ' You can try again with the remaining allowance.' : ''}` }, 502), visitor };
    }
  }
  return { status, submit };
}
