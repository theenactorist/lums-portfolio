// Saves each Ask Lums question, and emails the ones it couldn't answer, once the answer
// has finished streaming. `after` (from next/server) must be called while the request is
// being handled; it keeps the function running until the work is done, so Vercel doesn't
// freeze the save once the response ends.
export const INSERT_QUESTION =
  'INSERT INTO questions (session_id, user_message, assistant_response, is_unknown) VALUES ($1, $2, $3, $4) RETURNING id';

export function recordAfterResponse({ after, query, sendUnknownQuery, log = console }) {
  let settle;
  const finished = new Promise((resolve) => { settle = resolve; });
  after(async () => {
    const { sessionId, message, response, isUnknown } = await finished;
    const [saved, emailed] = await Promise.allSettled([
      query(INSERT_QUESTION, [sessionId ?? null, message, response, isUnknown]),
      isUnknown ? sendUnknownQuery(message) : Promise.resolve(null),
    ]);
    if (saved.status === 'fulfilled') log.log(`[Ask Lums] saved question ${saved.value?.rows?.[0]?.id ?? '(no id)'}`);
    else log.error('[Ask Lums save]', saved.reason);
    if (emailed.status === 'rejected') log.error('[Ask Lums email]', emailed.reason);
    else if (isUnknown) log.log('[Ask Lums] emailed unknown question');
  });
  // Call once the stream has closed or failed, with whatever answer was produced.
  return settle;
}
