'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHIPS = ['Experience?', 'Tools?', 'Vibe coding?', 'Industries?'];

export default function AskLums() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesInnerRef = useRef(null);
  const textareaRef = useRef(null);
  const sessionId = useRef(
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  );

  useEffect(() => {
    if (messagesInnerRef.current) {
      messagesInnerRef.current.scrollTop = messagesInnerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  }, [input]);

  const messagesRef = useRef([]);

  const streamFromAPI = useCallback(async (userMessage) => {
    setIsTyping(true);
    setHasInteracted(true);

    const history = messagesRef.current.slice(-10);
    setMessages((prev) => {
      messagesRef.current = [...prev, { role: 'user', content: userMessage }];
      return messagesRef.current;
    });

    try {
      const res = await fetch('/api/ask-lums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId.current,
          history,
        }),
      });

      if (!res.ok || !res.body) throw new Error('Stream failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let firstChunk = true;

      // Add placeholder assistant message
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantText += chunk;

        if (firstChunk) {
          setIsTyping(false);
          firstChunk = false;
        }

        // Update the last assistant message in place
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantText };
          messagesRef.current = updated;
          return updated;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Hmm, something went sideways on my end. Try again? 🛠️" },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q || isTyping) return;
    setInput('');
    streamFromAPI(q);
  }, [input, isTyping, streamFromAPI]);

  const handleChipClick = useCallback((chip) => {
    if (isTyping) return;
    streamFromAPI(chip);
  }, [isTyping, streamFromAPI]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleClear = () => {
    setMessages([]);
    messagesRef.current = [];
    setHasInteracted(false);
  };

  const handleCopy = useCallback((text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
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

        <div className="ask-lums__header">
          <div className="ask-lums__header-left">
            <svg className="ask-lums__ai-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.09 9.91L22 12L14.09 14.09L12 22L9.91 14.09L2 12L9.91 9.91L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              <path d="M19 3L19.9 5.1L22 6L19.9 6.9L19 9L18.1 6.9L16 6L18.1 5.1L19 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            <span className="ask-lums__title">Ask Lums</span>
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
              <div className="ask-lums__messages-inner" ref={messagesInnerRef}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
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
                    <div className="ask-lums__message-content">
                      {msg.content ? renderContent(msg.content) : (
                        <span className="ask-lums__cursor">▋</span>
                      )}
                      {msg.role === 'assistant' && msg.content && (
                        <button
                          className="ask-lums__copy"
                          onClick={() => handleCopy(msg.content, i)}
                          aria-label="Copy response"
                          title="Copy"
                        >
                          {copiedIndex === i ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                          )}
                        </button>
                      )}
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
                      <span className="ask-lums__typing-dot" />
                      <span className="ask-lums__typing-dot" />
                      <span className="ask-lums__typing-dot" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`ask-lums__input-area ${isFocused ? 'ask-lums__input-area--focused' : ''}`}>
          <textarea
            ref={textareaRef}
            className="ask-lums__input"
            placeholder="Ask me anything about Lums..."
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            id="ask-lums-input"
            aria-label="Ask Lums a question"
            disabled={isTyping}
          />
          <motion.button
            className={`ask-lums__send ${input.trim() ? 'ask-lums__send--active' : ''}`}
            onClick={handleSend}
            aria-label="Send question"
            id="ask-lums-send"
            disabled={!input.trim() || isTyping}
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
