'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './deliver-gallery.module.css';

const screens = [
  { file: 'sign-up-landing', title: 'Choose your account', alt: 'ENTA sign-up account selection' },
  { file: 'individual-signup', title: 'Individual sign-up', alt: 'Individual sign-up email entry' },
  { file: 'business-security', title: 'Business passkey setup', alt: 'Business wallet security and passkey setup' },
  { file: 'home-tier2-unlocked', title: 'Individual wallet', alt: 'Individual wallet balances and transaction actions' },
  { file: 'business-picker', title: 'Choose a business', alt: 'Business account picker after passkey authentication' },
  { file: 'business-verification', title: 'Verification in progress', alt: 'Business verification progress and wallet setup steps' },
  { file: 'business-home', title: 'Business wallet', alt: 'Business wallet balances and transaction actions' },
].map((screen) => ({ ...screen, src: `/work/shiga-onboarding/screens-2026-09/${screen.file}.png` }));

function lockBackgroundScroll() {
  const html = document.documentElement;
  const body = document.body;
  const x = window.scrollX;
  const y = window.scrollY;
  const scrollbar = Math.max(0, window.innerWidth - html.clientWidth);
  const paddingRight = parseFloat(getComputedStyle(body).paddingRight) || 0;
  const capture = (element, properties) => properties.map((property) => ({
    element,
    property,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  }));
  const restore = (records) => records.forEach(({ element, property, value, priority }) => {
    if (value) element.style.setProperty(property, value, priority);
    else element.style.removeProperty(property);
  });
  const htmlScroll = capture(html, ['scroll-behavior']);
  const htmlOverflow = capture(html, ['overflow-x', 'overflow-y']);
  const bodyStyles = capture(body, ['position', 'top', 'left', 'width', 'overflow-x', 'overflow-y', 'padding-right']);
  // The site sets overflow with !important. Preserve inline values and their
  // priorities, and fix the body so touch scrolling cannot move the article.
  const set = (element, property, value) => element.style.setProperty(property, value, 'important');
  set(html, 'scroll-behavior', 'auto');
  set(html, 'overflow-x', 'hidden');
  set(html, 'overflow-y', 'hidden');
  set(body, 'position', 'fixed');
  set(body, 'top', `${-y}px`);
  set(body, 'left', `${-x}px`);
  set(body, 'width', '100%');
  set(body, 'overflow-x', 'hidden');
  set(body, 'overflow-y', 'hidden');
  if (scrollbar) set(body, 'padding-right', `${paddingRight + scrollbar}px`);

  let released = false;
  return () => {
    if (released) return;
    released = true;
    restore(bodyStyles);
    restore(htmlOverflow);
    try {
      window.scrollTo({ left: x, top: y, behavior: 'auto' });
    } finally {
      restore(htmlScroll);
    }
  };
}

function Arrow({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} />
    </svg>
  );
}

function Expand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6m0 6 7-7" />
    </svg>
  );
}

function ScreenViewer({ initialIndex, triggerRef, onDismiss }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const canvasRef = useRef(null);
  const closeRef = useRef(null);
  const screen = screens[index];

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const unlockScroll = lockBackgroundScroll();
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      unlockScroll();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [triggerRef]);

  function move(direction) {
    setIndex((current) => (current + direction + screens.length) % screens.length);
    setZoomed(false);
    canvasRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.viewer}
      aria-labelledby="enta-screen-title"
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onDismiss(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onDismiss(); }}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), [tabindex="0"]')];
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          return;
        }
        if (zoomed) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <header className={styles.viewerHeader}>
        <h3 id="enta-screen-title" aria-live="polite">{screen.title}</h3>
        <button ref={closeRef} type="button" className={styles.iconButton} onClick={onDismiss} aria-label="Close screen viewer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
        </button>
      </header>
      <div ref={canvasRef} className={styles.canvas} data-zoomed={zoomed} tabIndex={0} aria-label="Expanded screenshot; scroll to pan at actual size">
        <Image src={screen.src} alt={screen.alt} width={1440} height={1024} unoptimized className={styles.fullImage} />
      </div>
      <footer className={styles.viewerFooter}>
        <div className={styles.navigation}>
          <button type="button" className={styles.iconButton} onClick={() => move(-1)} aria-label="Previous screen"><Arrow direction="left" /></button>
          <button type="button" className={styles.iconButton} onClick={() => move(1)} aria-label="Next screen"><Arrow direction="right" /></button>
        </div>
        <button type="button" className={styles.zoomButton} aria-pressed={zoomed} onClick={() => {
          setZoomed((current) => !current);
          canvasRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }}>{zoomed ? 'Fit to screen' : 'Actual size'}</button>
      </footer>
    </dialog>
  );
}

export default function DeliverGallery() {
  const railRef = useRef(null);
  const triggerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const rail = railRef.current;
    const update = () => setEdges({ start: rail.scrollLeft < 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); rail.removeEventListener('scroll', update); };
  }, []);

  function scroll(direction) {
    const rail = railRef.current;
    const step = rail.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap);
    rail.scrollBy({ left: step * direction, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return (
    <div className={styles.gallery} data-deliver-gallery>
      <div className={styles.toolbar}>
        <p><strong>Some product screens</strong><span>Select a screen to explore</span></p>
        <div className={styles.navigation} role="group" aria-label="Scroll screenshots">
          <button type="button" className={styles.iconButton} onClick={() => scroll(-1)} disabled={edges.start} aria-label="Scroll gallery left"><Arrow direction="left" /></button>
          <button type="button" className={styles.iconButton} onClick={() => scroll(1)} disabled={edges.end} aria-label="Scroll gallery right"><Arrow direction="right" /></button>
        </div>
      </div>
      <ul ref={railRef} className={styles.rail} tabIndex={0} aria-label="ENTA product screenshots">
        {screens.map((screen, index) => (
          <li key={screen.file} className={styles.card}>
            <button type="button" className={styles.cardButton} aria-label={`Expand ${screen.title}`} onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(index); }}>
              <span className={styles.preview}>
                <Image src={screen.src} alt={screen.alt} width={1440} height={1024} sizes="(max-width: 700px) 82vw, 330px" />
              </span>
              <span className={styles.caption}>
                <span>{screen.title}</span>
                <Expand />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {selected !== null && <ScreenViewer initialIndex={selected} triggerRef={triggerRef} onDismiss={() => setSelected(null)} />}
    </div>
  );
}
