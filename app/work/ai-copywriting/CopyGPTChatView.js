'use client';

import { Paperclip, ArrowUp, X } from 'lucide-react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/app/work/ai-copywriting/ui/input-group';
import styles from './CopyGPTChatPreview.module.css';

function allowanceMessage(status) {
  if (status.blocked === 'network') return 'This network has reached its allowance. Please try again later.';
  if (status.blocked === 'daily') return 'CopyGPT has reached today’s shared limit. Please try again tomorrow.';
  if (status.blocked === 'visitor' || status.remaining === 0) return 'All 3 submissions in this browser have been used.';
  return `${status.remaining} of 3 submissions remaining in this browser.`;
}

export function CopyGPTChatView({
  draft, attachment, status, checking, sending, interactions, error,
  inputRef, messageRef, conversationRef, onSubmit, onDraftChange, onMessageKeyDown,
  onAttach, onRemoveAttachment, onChooseScreenshot, onCheckAvailability,
}) {
  const canSend = !checking && !sending && status?.ready && status.remaining > 0 &&
    !status.blocked && Boolean(draft.trim() || attachment);
  const connection = checking ? 'Checking availability…' :
    status ? allowanceMessage(status) : 'Unavailable';

  return (
    <div className={styles.shell}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <strong>CopyGPT</strong>
          <span id="copygpt-connection-note" role="status" aria-live="polite" aria-atomic="true">{connection}</span>
        </div>
        <div
          ref={conversationRef}
          id="copygpt-conversation"
          className={styles.conversation}
          role="log"
          aria-label="CopyGPT conversation"
          aria-live="polite"
          aria-relevant="additions text"
          tabIndex={0}
        >
          {interactions.length === 0 ? (
            <p className={styles.empty}>Paste copy or attach a screenshot to begin.</p>
          ) : (
            <ol className={styles.transcript} role="list" aria-label="Messages">
              {interactions.map(interaction => (
                <li key={interaction.id} className={styles.interaction} data-interaction-id={interaction.id} data-state={interaction.state}>
                  <article className={styles.userMessage} data-chat-role="user" aria-label="Your message">
                    {interaction.message && <p>{interaction.message}</p>}
                    {interaction.screenshot && (
                      <p className={styles.screenshotName}><Paperclip aria-hidden="true" />Screenshot: {interaction.screenshot}</p>
                    )}
                  </article>
                  <article
                    className={`${styles.assistantMessage}${interaction.state === 'pending' ? ` ${styles.pending}` : ''}${interaction.state === 'failed' ? ` ${styles.failed}` : ''}`}
                    data-chat-role="assistant"
                    data-result-type={interaction.result?.type}
                    aria-label="CopyGPT response"
                  >
                    {interaction.state === 'pending' ? (
                      <p className={styles.pendingText} role="status"><span className={styles.thinking}>Thinking</span></p>
                    ) : interaction.state === 'failed' ? (
                      <p className={styles.threadError} role="alert">{interaction.error || 'CopyGPT could not complete this request.'}</p>
                    ) : interaction.result ? (
                      <div className={styles.replyBody}>
                        {interaction.result.type === 'human_review' && <span className={styles.reviewCue}>Human review</span>}
                        <p className={interaction.result.type === 'rewrite' ? styles.resultCopy : styles.assistantCopy}>{interaction.result.copy}</p>
                        {interaction.result.reason && <p className={styles.reason}>{interaction.result.reason}</p>}
                      </div>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
        <form className={styles.form} aria-label="Try CopyGPT" onSubmit={onSubmit}>
          <label className={styles.visuallyHidden} htmlFor="copygpt-message">Message CopyGPT</label>
          <InputGroup className={styles.composer} aria-label="Message composer" aria-describedby="copygpt-connection-note copygpt-message-help">
            <InputGroupTextarea
              ref={messageRef}
              id="copygpt-message"
              placeholder="Paste UX writing or describe a screen…"
              rows={2}
              maxLength={1200}
              value={draft}
              onChange={onDraftChange}
              readOnly={sending}
              aria-describedby={`copygpt-message-help${error ? ' copygpt-request-error' : ''}`}
              onKeyDown={onMessageKeyDown}
              className={styles.message}
            />
            {attachment && (
              <InputGroupAddon align="block-start" className={styles.attachment} aria-label="Attached screenshot">
                <Paperclip aria-hidden="true" />
                <span className={styles.fileName} title={attachment.name}>{attachment.name}</span>
                <InputGroupButton size="icon-sm" className={styles.removeButton} aria-label="Remove screenshot" onClick={onRemoveAttachment} disabled={sending}>
                  <X aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
            <InputGroupAddon align="block-end" className={styles.actions}>
              <InputGroupButton size="sm" className={styles.attachButton} onClick={onChooseScreenshot} disabled={sending}>
                <Paperclip data-icon="inline-start" aria-hidden="true" />
                Attach screenshot
              </InputGroupButton>
              <InputGroupButton type="submit" variant="default" size="icon-sm" className={styles.sendButton} disabled={!canSend} aria-label={sending ? 'Sending request' : 'Send message'}>
                <ArrowUp aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <input hidden ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" aria-label="Choose app screenshot" onChange={onAttach} disabled={sending} />
          <div className={styles.feedback}>
            <div className={styles.inputHelp}>
              <p id="copygpt-message-help" className={styles.note}>Ctrl or ⌘ + Enter to send. Enter adds a line. Screenshots: PNG, JPEG or WebP, up to 2 MB.</p>
              <span className={styles.characterCount}>{draft.length}/1,200</span>
            </div>
            {error && <p id="copygpt-request-error" className={styles.error} role="alert">{error}</p>}
            {!status && !checking && !sending && <button type="button" className={styles.retryButton} onClick={onCheckAvailability}>Check availability</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CopyGPTChatView;
