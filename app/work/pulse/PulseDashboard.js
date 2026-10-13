'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './PulseDashboard.module.css';

const DASHBOARD_URL = 'https://pulse-staging-seven.vercel.app/app?embed=1&theme=light';
const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 900;

function MagnifierIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" /></svg>;
}

function ExternalIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></svg>;
}

/** Fixed desktop preview; the modal contains the unscaled, interactive app. */
export default function PulseDashboard({ src = DASHBOARD_URL }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewScale, setPreviewScale] = useState(null);
  const previewRef = useRef(null);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const backdropDownRef = useRef(false);
  const titleId = useId();
  const helpId = useId();
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const preview = previewRef.current;
    const observer = new ResizeObserver(([entry]) => setPreviewScale(entry.contentRect.width / PREVIEW_WIDTH));
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousFocus = document.activeElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previousStyles = { position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      Object.assign(body.style, previousStyles);
      const root = document.documentElement;
      const previousBehaviour = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = previousBehaviour;
      const focusTarget = trigger?.isConnected ? trigger : previousFocus;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const isBackdrop = (event) => {
    if (event.target !== dialogRef.current) return false;
    const rect = dialogRef.current.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
    if (event.key === 'Tab') {
      const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), a[href], iframe')];
      const currentIndex = controls.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? controls.length - 1 : currentIndex - 1)
        : (currentIndex + 1) % controls.length;
      event.preventDefault();
      controls[nextIndex]?.focus({ preventScroll: true });
    }
  };

  return (
    <div className={styles.shell}>
      <div className={styles.preview} ref={previewRef}>
        <div className={styles.previewContent} aria-hidden="true" inert>
          {previewScale !== null ? <iframe
            src={src}
            title="Desktop preview of the Pulse partner dashboard"
            className={styles.previewFrame}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            tabIndex={-1}
            loading="lazy"
            style={{ transform: `scale(${previewScale})` }}
          /> : null}
        </div>
        <button type="button" className={styles.trigger} aria-label="Enlarge Pulse partner dashboard" aria-haspopup="dialog" onClick={() => setIsOpen(true)} ref={triggerRef}>
          <span className={styles.magnifier}><MagnifierIcon /></span>
        </button>
      </div>
      <p className={styles.caption}>Desktop preview · synthetic demo data</p>
      {isOpen ? createPortal(
        <dialog
          className={styles.dialog}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={helpId}
          ref={dialogRef}
          onCancel={(event) => { event.preventDefault(); close(); }}
          onKeyDown={onKeyDown}
          onPointerDown={(event) => { backdropDownRef.current = isBackdrop(event); }}
          onPointerUp={(event) => { if (!isBackdrop(event)) backdropDownRef.current = false; }}
          onPointerCancel={() => { backdropDownRef.current = false; }}
          onClick={(event) => { if (backdropDownRef.current && isBackdrop(event)) close(); backdropDownRef.current = false; }}
        >
          <div className={styles.panel}>
            <header className={styles.toolbar}>
              <h2 id={titleId}>Pulse partner dashboard</h2>
              <div className={styles.actions}>
                <a className={styles.control} href={src} target="_blank" rel="noopener noreferrer" aria-label="Open Pulse partner dashboard in a new tab"><ExternalIcon /></a>
                <button type="button" className={`${styles.control} ${styles.closeControl}`} onClick={close} aria-label="Close dashboard viewer" ref={closeRef}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg><span>Close</span></button>
              </div>
            </header>
            <p id={helpId} className={styles.srOnly}>Explore the dashboard with synthetic demo data. Use Close to return to the case study. You can also open the dashboard in a new tab.</p>
            <iframe className={styles.appFrame} src={src} title="Interactive Pulse partner dashboard" loading="eager" allow="clipboard-read; clipboard-write" />
            <span className={styles.srOnly} tabIndex={0} onFocus={() => dialogRef.current?.querySelector('a[href]')?.focus({ preventScroll: true })} />
          </div>
        </dialog>, document.body,
      ) : null}
    </div>
  );
}
