'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import styles from './StreamingText.module.css';

const WORD_MS = 55;
const RESOLVE_MS = 180;
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(listener) {
  const preference = window.matchMedia(MOTION_QUERY);
  preference.addEventListener('change', listener);
  return () => preference.removeEventListener('change', listener);
}

function getMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionPreference() {
  return false;
}

// Source offsets stay stable as chunks arrive. An unfinished word is held back,
// while a trailing single asterisk waits to see whether it belongs to **markup**.
function tokenizeContent(content, isStreaming) {
  const words = [];
  let leadingWhitespace = '';
  let currentWord = null;
  let bold = false;

  for (let index = 0; index < content.length; index += 1) {
    if (content.startsWith('**', index)) {
      bold = !bold;
      index += 1;
      continue;
    }

    const character = content[index];
    if (isStreaming && character === '*' && index === content.length - 1) break;

    if (/\s/u.test(character)) {
      if (words.length === 0) {
        leadingWhitespace += character;
      } else {
        const previousWord = words[words.length - 1];
        previousWord.whitespace += character;
        previousWord.complete = true;
      }
      currentWord = null;
      continue;
    }

    if (!currentWord) {
      currentWord = { key: index, parts: [], whitespace: '', complete: false };
      words.push(currentWord);
    }

    const previousPart = currentWord.parts[currentWord.parts.length - 1];
    if (previousPart && previousPart.bold === bold) {
      previousPart.text += character;
    } else {
      currentWord.parts.push({ key: index, text: character, bold });
    }
  }

  const lastWord = words[words.length - 1];
  const readyCount = words.length - (isStreaming && lastWord && !lastWord.complete ? 1 : 0);
  return { words, leadingWhitespace, readyCount };
}

function MessageStream({ content, isStreaming, messageId, onDone, onProgress }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );
  const parsed = useMemo(() => tokenizeContent(content, isStreaming), [content, isStreaming]);
  const [presentedCount, setPresentedCount] = useState(0);
  const [settled, setSettled] = useState(false);
  const presentationRef = useRef({ count: 0, lastRevealAt: -Infinity });
  const queueRef = useRef({ readyCount: parsed.readyCount, wordCount: parsed.words.length });
  const callbacksRef = useRef({ onDone, onProgress });
  const doneRef = useRef(false);

  // Preserve immediately shown words if the motion preference changes later.
  if (reducedMotion && presentedCount < parsed.words.length) {
    setPresentedCount(parsed.words.length);
  }

  const visibleCount = reducedMotion ? parsed.words.length : presentedCount;
  const queueComplete = !isStreaming && visibleCount >= parsed.words.length;
  const finished = queueComplete && settled;

  useEffect(() => {
    callbacksRef.current = { onDone, onProgress };
  }, [onDone, onProgress]);

  useEffect(() => {
    queueRef.current = { readyCount: parsed.readyCount, wordCount: parsed.words.length };
    if (reducedMotion) {
      presentationRef.current = { count: parsed.words.length, lastRevealAt: -Infinity };
    }
  }, [parsed.readyCount, parsed.words.length, reducedMotion]);

  useEffect(() => {
    if (finished) return undefined;

    const advance = () => {
      const target = reducedMotion ? queueRef.current.wordCount : queueRef.current.readyCount;
      const presentation = presentationRef.current;
      if (presentation.count >= target) return;

      presentation.count = reducedMotion ? target : presentation.count + 1;
      presentation.lastRevealAt = performance.now();
      setPresentedCount(presentation.count);
    };

    // Keep one clock running so frequent network chunks cannot restart the delay.
    const interval = window.setInterval(advance, WORD_MS);
    const immediate = reducedMotion ? window.setTimeout(advance, 0) : null;
    return () => {
      window.clearInterval(interval);
      if (immediate !== null) window.clearTimeout(immediate);
    };
  }, [reducedMotion, finished]);

  const visibleWords = parsed.words.slice(0, visibleCount);
  const visibleText = parsed.leadingWhitespace + visibleWords.map((word) => (
    word.parts.map((part) => part.text).join('') + word.whitespace
  )).join('');
  useEffect(() => {
    if (visibleText) callbacksRef.current.onProgress?.();
  }, [visibleText]);

  useEffect(() => {
    if (!queueComplete) return undefined;

    const wait = reducedMotion
      ? 0
      : Math.max(0, RESOLVE_MS - (performance.now() - presentationRef.current.lastRevealAt));
    const timer = window.setTimeout(() => setSettled(true), wait);
    return () => window.clearTimeout(timer);
  }, [queueComplete, reducedMotion, content]);

  useEffect(() => {
    if (!finished || doneRef.current) return;
    doneRef.current = true;
    callbacksRef.current.onDone?.(messageId);
  }, [finished, messageId]);

  return (
    <div className={styles.stream} aria-live="off" aria-busy={!finished}>
      {parsed.leadingWhitespace}
      {visibleWords.map((word) => (
        <span className={styles.word} key={word.key}>
          {word.parts.map((part) => (
            part.bold
              ? <strong className={styles.bold} key={part.key}>{part.text}</strong>
              : <span key={part.key}>{part.text}</span>
          ))}
          {word.whitespace}
        </span>
      ))}
      {!finished && <span className={styles.cursor} aria-hidden="true" />}
    </div>
  );
}

export default function StreamingText({
  content = '',
  isStreaming = false,
  messageId,
  onDone,
  onProgress,
}) {
  return (
    <MessageStream
      key={messageId}
      content={content}
      isStreaming={isStreaming}
      messageId={messageId}
      onDone={onDone}
      onProgress={onProgress}
    />
  );
}
