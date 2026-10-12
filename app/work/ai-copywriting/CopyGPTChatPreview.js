'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { queryCopyGPTStatus, createSubmissionController } from './copygpt-chat-controller.mjs';
import { CopyGPTChatView } from './CopyGPTChatView';
import useCaseStudySlot from './useCaseStudySlot';
export { CopyGPTChatView } from './CopyGPTChatView';

const screenshotTypes = ['image/png', 'image/jpeg', 'image/webp'];
async function queryStatus(signal) {
  return queryCopyGPTStatus({ signal });
}

function readScreenshot(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('The screenshot could not be read. Remove it and attach it again.'));
    reader.onload = () => {
      const data = String(reader.result).split(',')[1];
      if (!data) reject(new Error('The screenshot could not be read. Remove it and attach it again.'));
      else resolve({ mediaType: file.type, data });
    };
    reader.readAsDataURL(file);
  });
}

export default function CopyGPTChatPreview() {
  const input = useRef(null);
  const message = useRef(null);
  const mounted = useRef(false);
  const submission = useRef(false);
  const statusController = useRef(null);
  const conversation = useRef(null);
  const currentState = useRef(null);
  const controller = useRef(null);
  const target = useCaseStudySlot('copygpt-chat-slot');
  const [draft, setDraft] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState(null);
  const [checking, setChecking] = useState(true);
  const [sending, setSending] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState('');

  currentState.current = { draft, attachment, status, checking, sending };
  if (!controller.current) controller.current = createSubmissionController({
    submission,
    getState: () => currentState.current,
    isMounted: () => mounted.current,
    readScreenshot,
    queryStatus,
    request: (payload, signal) => fetch('/api/copygpt', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal,
      body: JSON.stringify(payload),
    }),
    onStart: turn => {
      setSending(true);
      setError('');
      setDraft('');
      setInteractions(previous => [...previous, turn]);
    },
    onStatus: setStatus,
    onSuccess: ({ turn, result, preserveAttachment }) => {
      setInteractions(previous => previous.map(item => item.id === turn.id
        ? { ...item, state: 'complete', result } : item));
      if (!preserveAttachment) setAttachment(null);
    },
    onFailure: ({ turn, error: requestError }) => {
      setInteractions(previous => previous.map(item => item.id === turn.id
        ? { ...item, state: 'failed', error: requestError } : item));
      setDraft(turn.message);
    },
    onFinish: () => {
      setSending(false);
      message.current?.focus();
    },
  });

  useEffect(() => {
    const node = conversation.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [interactions]);

  useEffect(() => {
    mounted.current = true;
    const initialStatusRequest = new AbortController();
    const chatController = controller.current;
    statusController.current = initialStatusRequest;
    queryStatus(initialStatusRequest.signal)
      .then(next => {
        if (mounted.current && !initialStatusRequest.signal.aborted) setStatus(next);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError' && mounted.current) setError(requestError.message);
      })
      .finally(() => {
        if (mounted.current && !initialStatusRequest.signal.aborted) setChecking(false);
      });
    return () => {
      mounted.current = false;
      initialStatusRequest.abort();
      statusController.current?.abort();
      chatController?.abort();
    };
  }, []);

  useEffect(() => () => {
    if (attachment) URL.revokeObjectURL(attachment.url);
  }, [attachment]);

  const checkAvailability = async () => {
    if (checking || submission.current) return;
    const controller = new AbortController();
    statusController.current = controller;
    setChecking(true);
    setError('');
    try {
      const next = await queryStatus(controller.signal);
      if (mounted.current) setStatus(next);
    } catch (requestError) {
      if (mounted.current && requestError.name !== 'AbortError') {
        setStatus(null);
        setError(requestError.message);
      }
    } finally {
      if (mounted.current && !controller.signal.aborted) setChecking(false);
    }
  };

  const attach = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || submission.current) return;
    if (!screenshotTypes.includes(file.type)) {
      setError('Choose a PNG, JPEG or WebP screenshot.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Choose a screenshot no larger than 2 MB.');
      return;
    }
    setError('');
    setAttachment({ file, name: file.name, url: URL.createObjectURL(file) });
    message.current?.focus();
  };

  const removeAttachment = () => {
    if (submission.current) return;
    setAttachment(null);
    setError('');
    message.current?.focus();
  };

  const submit = event => {
    event.preventDefault();
    controller.current.submit();
  };

  if (!target) return null;

  return createPortal(
    <CopyGPTChatView
      draft={draft}
      attachment={attachment}
      status={status}
      checking={checking}
      sending={sending}
      interactions={interactions}
      error={error}
      inputRef={input}
      messageRef={message}
      conversationRef={conversation}
      onSubmit={submit}
      onDraftChange={event => setDraft(event.target.value)}
      onMessageKeyDown={event => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.nativeEvent.isComposing) submit(event);
      }}
      onAttach={attach}
      onRemoveAttachment={removeAttachment}
      onChooseScreenshot={() => input.current?.click()}
      onCheckAvailability={checkAvailability}
    />,
    target,
  );
}
