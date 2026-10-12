'use client';

import { useId, useState } from 'react';
import styles from './CopyGPTSourceSnippet.module.css';

export default function CopyGPTSourceSnippet({
  code = '',
  filename = 'Source',
  label = 'Source excerpt',
}) {
  const captionId = useId();
  const [copyState, setCopyState] = useState('idle');
  const [message, setMessage] = useState('');

  const copyCode = async () => {
    setCopyState('copying');
    setMessage('');

    if (!navigator.clipboard?.writeText) {
      setCopyState('error');
      setMessage('Clipboard is unavailable. Select the code and copy it manually.');
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      setMessage('Code copied to clipboard.');
    } catch {
      setCopyState('error');
      setMessage('Copy did not work. Select the code and copy it manually.');
    }
  };

  return (
    <figure className={styles.panel}>
      <figcaption className={styles.header}>
        <div className={styles.caption} id={captionId}>
          {label && <span className={styles.label}>{label}</span>}
          <span className={styles.filename}>{filename}</span>
        </div>
        <button
          className={styles.copyButton}
          type="button"
          onClick={copyCode}
          disabled={copyState === 'copying' || !code}
          aria-label={`Copy code from ${filename}`}
        >
          {copyState === 'copying' ? 'Copying…' : 'Copy'}
        </button>
      </figcaption>
      <pre className={styles.code} tabIndex={0} aria-labelledby={captionId}>
        <code>{code}</code>
      </pre>
      <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        {message}
      </p>
    </figure>
  );
}
