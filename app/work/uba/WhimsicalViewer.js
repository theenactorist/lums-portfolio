'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './WhimsicalViewer.module.css';

export default function WhimsicalViewer({ href, label, title, src, alt, width, height }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const initialView = href ? 'live' : 'captured';
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(initialView);
  const [zoomed, setZoomed] = useState(false);
  const boardReference = href ? new URL(href).pathname.split('/').pop().split('-').pop() : null;
  const embedUrl = boardReference ? `https://whimsical.com/embed/${boardReference}?key=0` : null;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [open]);

  function showViewer() {
    setView(initialView);
    setZoomed(false);
    dialogRef.current?.showModal();
    setOpen(true);
    requestAnimationFrame(() => closeRef.current?.focus());
  }

  function closeViewer() {
    dialogRef.current?.close();
  }

  function onClose() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <button type="button" className={styles.trigger} ref={triggerRef} onClick={showViewer} aria-haspopup="dialog">
        {label}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={onClose}
        onClick={event => { if (event.target === event.currentTarget) closeViewer(); }}
      >
        <div className={styles.viewer}>
          <header className={styles.header}>
            <h2 id={titleId}>{title}</h2>
            <button type="button" ref={closeRef} className={styles.control} onClick={closeViewer} aria-label={`Close ${title.toLowerCase()} viewer`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
              Close
            </button>
          </header>
          <div className={styles.toolbar} aria-label="Whimsical view">
            <div className={styles.viewControls}>
              {href ? <>
                <button type="button" className={styles.control} aria-pressed={view === 'live'} onClick={() => setView('live')}>Live board</button>
                <button type="button" className={styles.control} aria-pressed={view === 'captured'} onClick={() => setView('captured')}>Captured view</button>
              </> : <span className={styles.viewLabel}>Captured view</span>}
            </div>
            {view === 'captured' && <button type="button" className={styles.control} aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? 'Fit view' : 'Zoom in'}</button>}
          </div>
          {open && (view === 'live' ? (
            <iframe className={styles.board} src={embedUrl} title={`${title} in Whimsical`} allowFullScreen />
          ) : (
            <div className={`${styles.capture} ${zoomed ? styles.zoomed : ''}`} tabIndex={0} role="region" aria-label={`${title}, captured Whimsical view`}>
              <Image src={src} alt={alt} width={width} height={height} sizes={zoomed ? '1800px' : '1200px'} unoptimized className={styles.image} />
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
