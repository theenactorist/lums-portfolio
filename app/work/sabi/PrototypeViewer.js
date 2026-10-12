'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styles from './PrototypeViewer.module.css';

function embedUrl(href) {
  const url = new URL(href);
  url.hostname = 'embed.figma.com';
  url.searchParams.set('embed-host', 'olumide-portfolio');
  url.searchParams.set('footer', 'false');
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches) {
    url.searchParams.set('device-frame', 'false');
  }
  return url.toString();
}

export default function PrototypeViewer({ href, title, children }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const previousOverflowRef = useRef(null);
  const titleId = useId();

  useEffect(() => () => {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
    }
  }, []);

  function show() {
    if (dialogRef.current.open) return;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setLoading(true);
    setOpen(true);
    dialogRef.current.showModal();
    closeRef.current.focus();
  }

  function finishClose() {
    setOpen(false);
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
    triggerRef.current?.focus({ preventScroll: true });
  }

  function dismissBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
      dialogRef.current.close();
    }
  }

  return (
    <div className={styles.action}>
      <button ref={triggerRef} type="button" className={`${styles.trigger} prototype-link`} aria-haspopup="dialog" onClick={show}>
        {children}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg>
      </button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} onClose={finishClose} onClick={dismissBackdrop}>
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          <button ref={closeRef} type="button" className={styles.close} aria-label="Close prototype" onClick={() => dialogRef.current.close()}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className={styles.frameArea}>
          {open && <iframe src={embedUrl(href)} title={title} className={styles.frame} allowFullScreen onLoad={() => setLoading(false)} />}
          {open && loading && <div className={styles.loading} role="status">Loading prototype…</div>}
        </div>
      </dialog>
    </div>
  );
}
