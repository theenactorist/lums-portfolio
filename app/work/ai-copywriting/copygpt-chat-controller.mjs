const model = 'claude-sonnet-5-5';
const resultTypes = new Set(['rewrite', 'clarification', 'human_review']);

export function readStatus(data) {
  if (data?.ready !== true || data.model !== model || data.limit !== 3 ||
    !Number.isInteger(data.remaining) || data.remaining < 0 || data.remaining > 3 ||
    ![null, 'visitor', 'network', 'daily'].includes(data.blocked)) return null;
  return { ready: true, model, remaining: data.remaining, limit: 3, blocked: data.blocked };
}

export function canSubmit({ checking, sending, status, draft, attachment }) {
  return Boolean(!checking && !sending && status?.ready && status.remaining > 0 &&
    !status.blocked && (draft.trim() || attachment));
}

export async function queryCopyGPTStatus({ fetcher = fetch, signal, timeoutMs = 10000 } = {}) {
  const statusRequest = new AbortController();
  const abort = () => statusRequest.abort();
  let timedOut = false;
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    statusRequest.abort();
  }, timeoutMs);
  try {
    const response = await fetcher('/api/copygpt', { cache: 'no-store', signal: statusRequest.signal });
    const data = await response.json();
    const status = readStatus(data);
    if (!response.ok || !status) throw new Error(data.error || 'CopyGPT is unavailable right now. Please try again later.');
    return status;
  } catch (error) {
    if (timedOut) throw new Error('CopyGPT’s availability check timed out. Please try again later.');
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}

// The live React portal supplies state/render callbacks. Tests exercise this same
// controller with deferred transport, without replacing React hooks or the API.
export function createSubmissionController({
  submission, getState, isMounted, readScreenshot, request, queryStatus,
  onStart, onStatus, onSuccess, onFailure, onFinish,
}) {
  let history = [];
  let nextId = 0;
  let activeRequest = null;

  const refreshStatus = async signal => {
    onStatus(null);
    try {
      const next = await queryStatus(signal);
      if (isMounted() && !signal.aborted) onStatus(next);
    } catch {
      // A status failure must leave sending unavailable, without retrying POST.
    }
  };

  return {
    abort() { activeRequest?.abort(); },
    async submit() {
      const state = getState();
      if (submission.current || !canSubmit(state)) return false;
      submission.current = true;
      const submittedMessage = state.draft.trim();
      const submittedAttachment = state.attachment;
      const turn = { id: ++nextId, message: submittedMessage,
        screenshot: submittedAttachment?.name, state: 'pending' };
      const controller = new AbortController();
      activeRequest = controller;
      let posted = false;
      onStart(turn);
      try {
        const image = submittedAttachment ? await readScreenshot(submittedAttachment.file) : undefined;
        if (!isMounted() || controller.signal.aborted) return false;
        posted = true;
        const response = await request({ message: submittedMessage, history: [...history],
          ...(image ? { image } : {}) }, controller.signal);
        const data = await response.json();
        if (!isMounted() || controller.signal.aborted) return false;
        const next = readStatus(data);
        if (next) onStatus(next);
        else if (data.ready === false || response.status === 503) onStatus(null);
        if (!response.ok) {
          const error = data.error || 'CopyGPT could not complete this request. Please try again later.';
          if (isMounted() && !controller.signal.aborted) onFailure({ turn, error, posted });
          if (response.status !== 400 && response.status !== 503 && !next) await refreshStatus(controller.signal);
          return false;
        }
        const result = data.result;
        if (!next || !resultTypes.has(result?.type) || typeof result.copy !== 'string' || !result.copy.trim() ||
          (result.reason !== undefined && typeof result.reason !== 'string')) {
          throw new Error('The response could not be displayed. This attempt may have used a submission.');
        }
        const displayedResult = { type: result.type, copy: result.copy, reason: result.reason || '' };
        const userHistory = [submittedMessage, submittedAttachment ? '[Screenshot attached]' : '']
          .filter(Boolean).join('\n').slice(0, 1200);
        const assistantHistory = [displayedResult.copy, displayedResult.reason].filter(Boolean).join('\n').slice(0, 1200);
        history = [...history, { role: 'user', content: userHistory },
          { role: 'assistant', content: assistantHistory }].slice(-4);
        onSuccess({ turn, result: displayedResult, preserveAttachment: result.type === 'clarification' });
        return true;
      } catch (requestError) {
        if (isMounted() && !controller.signal.aborted && requestError.name !== 'AbortError') {
          const error = posted
            ? `${requestError.message === 'Failed to fetch' ? 'We could not receive a response. Check your connection.' : requestError.message} If Claude was reached, the attempt counts towards your allowance.`
            : requestError.message;
          if (isMounted() && !controller.signal.aborted) onFailure({ turn, error, posted });
          if (posted) await refreshStatus(controller.signal);
        }
        return false;
      } finally {
        submission.current = false;
        activeRequest = null;
        if (isMounted() && !controller.signal.aborted) onFinish();
      }
    },
  };
}
