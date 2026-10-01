'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from './LoadingState';
import StreamingText from './StreamingText';
import styles from './AskLums.module.css';

const CHIPS = ['Experience?', 'Tools?', 'Vibe coding?', 'Industries?'];
const ERROR_MESSAGE = "Hmm, something went sideways on my end. Try again? 🛠️";

function createMessageId() {
  return crypto.randomUUID();
}

function cancelRequest(request) {
  if (!request) return;
  request.controller.abort();
  request.reader?.cancel().catch(() => {});
}

export default function AskLums({ inputRef } = {}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [activeResponseId, setActiveResponseId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const messagesInnerRef = useRef(null);
  const textareaRef = useRef(null);
  const setTextareaRef = useCallback((node) => {
    textareaRef.current = node;
    if (inputRef) inputRef.current = node;
  }, [inputRef]);
  const messagesRef = useRef([]);
  const activeRequestRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const followOutputRef = useRef(true);
  const sessionId = useRef(
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  );

  const isBusy = activeResponseId !== null;
  const activeResponse = messages.find((message) => message.id === activeResponseId);
  const isTyping = isBusy && !activeResponse?.content.trim();
  const latestMessage = messages.at(-1);
  const followUps = CHIPS.filter((chip) => !messages.some(
    (message) => message.role === 'user' && message.content === chip
  )).slice(0, 2);

  const scrollToLatest = useCallback(() => {
    if (messagesInnerRef.current && followOutputRef.current) {
      messagesInnerRef.current.scrollTop = messagesInnerRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToLatest, [messages, isTyping, scrollToLatest]);

  useEffect(() => () => {
    const request = activeRequestRef.current;
    activeRequestRef.current = null;
    cancelRequest(request);
    clearTimeout(copyTimeoutRef.current);
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  }, [input]);

  const updateMessages = useCallback((update) => {
    const next = typeof update === 'function' ? update(messagesRef.current) : update;
    messagesRef.current = next;
    setMessages(next);
  }, []);

  const streamFromAPI = useCallback(async (userMessage, retryId) => {
    // Keep the request locked until both the network and word reveal have finished.
    if (activeRequestRef.current) return;
    let previous = messagesRef.current;
    if (retryId) {
      const last = previous.at(-1);
      const question = previous.at(-2);
      if (last?.id !== retryId || question?.role !== 'user') return;
      userMessage = question.content;
      previous = previous.slice(0, -2);
    }

    const responseId = createMessageId();
    const request = { id: responseId, controller: new AbortController(), reader: null };
    activeRequestRef.current = request;
    setActiveResponseId(responseId);
    setHasInteracted(true);
    setAnnouncement('');
    setCopiedId(null);
    clearTimeout(copyTimeoutRef.current);
    followOutputRef.current = true;

    const history = previous.slice(-10).map(({ role, content }) => ({ role, content }));
    updateMessages([
      ...previous,
      { id: createMessageId(), role: 'user', content: userMessage },
      { id: responseId, role: 'assistant', content: '', status: 'streaming', revealed: false },
    ]);

    let assistantText = '';
    const updateResponse = (changes) => {
      if (activeRequestRef.current !== request) return;
      updateMessages((current) => current.map((message) => message.id === responseId
        ? { ...message, ...changes }
        : message));
    };

    try {
      const res = await fetch('/api/ask-lums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: request.controller.signal,
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId.current,
          history,
        }),
      });

      if (!res.ok || !res.body) throw new Error('Stream failed');

      const reader = res.body.getReader();
      request.reader = reader;
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (activeRequestRef.current !== request) return;
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        assistantText += chunk;

        updateResponse({ content: assistantText });
      }

      assistantText += decoder.decode();
      if (!assistantText.trim()) throw new Error('Empty response');
      updateResponse({ content: assistantText, status: 'complete' });
    } catch {
      if (activeRequestRef.current !== request || request.controller.signal.aborted) return;
      updateResponse({
        content: assistantText.trim() ? assistantText : ERROR_MESSAGE,
        status: 'error',
        error: assistantText.trim() ? 'The response was interrupted. Try again.' : null,
      });
    } finally {
      request.reader?.releaseLock();
      request.reader = null;
    }
  }, [updateMessages]);

  const handleResponseDone = useCallback((messageId) => {
    const message = messagesRef.current.find((item) => item.id === messageId);
    if (!message || message.revealed || message.status === 'streaming') return;
    updateMessages((current) => current.map((item) => item.id === messageId
      ? { ...item, revealed: true }
      : item));
    if (activeRequestRef.current?.id === messageId) {
      activeRequestRef.current = null;
      setActiveResponseId(null);
      setAnnouncement([message.content.replace(/\*\*/g, ''), message.error].filter(Boolean).join(' '));
    }
  }, [updateMessages]);

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q || isBusy) return;
    setInput('');
    streamFromAPI(q);
  }, [input, isBusy, streamFromAPI]);

  const handleChipClick = useCallback((chip) => {
    if (isBusy) return;
    streamFromAPI(chip);
  }, [isBusy, streamFromAPI]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleClear = () => {
    const request = activeRequestRef.current;
    activeRequestRef.current = null;
    cancelRequest(request);
    updateMessages([]);
    setActiveResponseId(null);
    setHasInteracted(false);
    setCopiedId(null);
    clearTimeout(copyTimeoutRef.current);
    setAnnouncement('Conversation cleared.');
    textareaRef.current?.focus();
  };

  const handleCopy = useCallback(async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      if (!messagesRef.current.some((message) => message.id === messageId)) return;
      setCopiedId(messageId);
      setAnnouncement('Response copied.');
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setAnnouncement('Could not copy. Select the response text to copy it.');
    }
  }, []);

  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  return (
    <div className="ask-lums-wrapper">
      <div
        className={`ask-lums ${isFocused ? 'ask-lums--focused' : ''} ${hasInteracted ? 'ask-lums--active' : ''}`}
        id="ask-lums"
      >
        <div className="ask-lums__glow" />
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <div className="ask-lums__header">
          <div className="ask-lums__header-left">
            <svg className="ask-lums__ai-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.09 9.91L22 12L14.09 14.09L12 22L9.91 14.09L2 12L9.91 9.91L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              <path d="M19 3L19.9 5.1L22 6L19.9 6.9L19 9L18.1 6.9L16 6L18.1 5.1L19 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            <span className="ask-lums__title">Ask Lums AI</span>
          </div>
          {hasInteracted && messages.length > 0 && (
            <motion.button
              className="ask-lums__clear"
              onClick={handleClear}
              aria-label="Clear chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              </svg>
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {hasInteracted && (
            <motion.div
              className="ask-lums__messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="ask-lums__messages-inner"
                ref={messagesInnerRef}
                onScroll={(event) => {
                  const panel = event.currentTarget;
                  followOutputRef.current = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 48;
                }}
              >
                {messages.filter((msg) => msg.content.trim()).map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`ask-lums__message ask-lums__message--${msg.role}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                  >
                    {msg.role === 'assistant' && (
                      <div className="ask-lums__message-avatar">
                        <svg className="ask-lums__ai-icon ask-lums__ai-icon--sm" width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L14.09 9.91L22 12L14.09 14.09L12 22L9.91 14.09L2 12L9.91 9.91L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                    <div className={`ask-lums__message-content ${msg.role === 'assistant' ? styles.response : ''}`}>
                      {msg.role === 'assistant' ? (
                        <>
                          <StreamingText
                            content={msg.content}
                            isStreaming={msg.status === 'streaming'}
                            messageId={msg.id}
                            onDone={handleResponseDone}
                            onProgress={scrollToLatest}
                          />
                          {msg.revealed && (
                            <div className={styles.completed}>
                              {msg.error && <p className={styles.error}>{msg.error}</p>}
                              <div className={styles.actions} aria-label="Response actions">
                                <button
                                  type="button"
                                  className={styles.action}
                                  onClick={() => handleCopy(msg.content, msg.id)}
                                  aria-label={copiedId === msg.id ? 'Response copied' : 'Copy response'}
                                  title={copiedId === msg.id ? 'Copied' : 'Copy response'}
                                >
                                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {copiedId === msg.id ? <polyline points="20 6 9 17 4 12" /> : (
                                      <>
                                        <rect x="9" y="9" width="12" height="12" rx="2.5" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                      </>
                                    )}
                                  </svg>
                                </button>
                                {msg.id === latestMessage?.id && (
                                  <button
                                    type="button"
                                    className={styles.action}
                                    onClick={() => streamFromAPI('', msg.id)}
                                    disabled={isBusy}
                                    aria-label="Retry response"
                                    title="Retry response"
                                  >
                                    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              {msg.id === latestMessage?.id && msg.status === 'complete' && followUps.length > 0 && (
                                <div className={styles.followUps}>
                                  <p className={styles.followUpLabel}>Follow-ups</p>
                                  {followUps.map((question, index) => (
                                    <button
                                      type="button"
                                      key={question}
                                      className={styles.followUp}
                                      style={{ '--follow-up-delay': `${index * 90}ms` }}
                                      onClick={() => handleChipClick(question)}
                                      disabled={isBusy}
                                    >
                                      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 10l-5 5 5 5M20 4v7a4 4 0 0 1-4 4H4" />
                                      </svg>
                                      {question}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : renderContent(msg.content)}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    className="ask-lums__message ask-lums__message--assistant"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="ask-lums__message-avatar">
                      <svg className="ask-lums__ai-icon ask-lums__ai-icon--sm" width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L14.09 9.91L22 12L14.09 14.09L12 22L9.91 14.09L2 12L9.91 9.91L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="ask-lums__typing">
                      <LoadingState label="Thinking" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`ask-lums__input-area ${isFocused ? 'ask-lums__input-area--focused' : ''}`}>
          <textarea
            ref={setTextareaRef}
            className="ask-lums__input"
            placeholder="Ask me anything about Lums..."
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            id="ask-lums-input"
            aria-label="Ask Lums AI a question"
            aria-busy={isBusy}
          />
          <motion.button
            className={`ask-lums__send ${input.trim() ? 'ask-lums__send--active' : ''}`}
            onClick={handleSend}
            aria-label="Send question"
            id="ask-lums-send"
            disabled={!input.trim() || isBusy}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              className="ask-lums__chips"
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
            >
              {CHIPS.map((chip, i) => (
                <motion.button
                  key={chip}
                  className="ask-lums__chip"
                  onClick={() => handleChipClick(chip)}
                  id={`chip-${chip.toLowerCase().replace(/[^a-z]/g, '')}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {chip}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
