'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './AnimatedHero.module.css';

const ANIMATION = '/work/uba/cover.gif';
const POSTER = '/work/uba/cover-poster.png';
const ALT = 'UBA headquarters, employees and brand animation';

function lockBackgroundScroll() {
  const html = document.documentElement;
  const body = document.body;
  const x = window.scrollX;
  const y = window.scrollY;
  const scrollbar = Math.max(0, window.innerWidth - html.clientWidth);
  const paddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
  const capture = (element, properties) => properties.map(property => ({
    element,
    property,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  }));
  const restore = records => records.forEach(({ element, property, value, priority }) => {
    if (value) element.style.setProperty(property, value, priority);
    else element.style.removeProperty(property);
  });
  const htmlScroll = capture(html, ['scroll-behavior']);
  const htmlOverflow = capture(html, ['overflow-x', 'overflow-y']);
  const bodyStyles = capture(body, ['position', 'top', 'left', 'width', 'overflow-x', 'overflow-y', 'padding-right']);
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

export default function AnimatedHero({ className = '', imageClassName = '', style }) {
  const mediaId = useId();
  const frameRef = useRef(null);
  const dialogRef = useRef(null);
  const expandRef = useRef(null);
  const closeRef = useRef(null);
  const scrollReleaseRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [requestedPlayback, setRequestedPlayback] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => () => {
    scrollReleaseRef.current?.();
    scrollReleaseRef.current = null;
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frame = requestAnimationFrame(() => {
      setPageVisible(!document.hidden);
      setRequestedPlayback(!preference.matches);
      setReady(true);
    });
    const onPreferenceChange = () => {
      if (preference.matches) setRequestedPlayback(false);
    };
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    preference.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (frameRef.current) observer.observe(frameRef.current);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  const playing = ready && requestedPlayback && pageVisible && (inView || expanded) && !failed;
  const animationSrc = retry ? `${ANIMATION}?retry=${retry}` : ANIMATION;
  const statusMessage = failed
    ? 'The animation could not load. Choose Retry to try again.'
    : playing ? 'UBA animation playing.' : 'UBA animation paused on its opening frame.';

  function togglePlayback() {
    if (failed) {
      setFailed(false);
      setRetry(value => value + 1);
      setRequestedPlayback(true);
    } else {
      setRequestedPlayback(value => !value);
    }
  }

  function onAnimationError() {
    setFailed(true);
    setRequestedPlayback(false);
  }

  function openFullScreen() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    scrollReleaseRef.current = lockBackgroundScroll();
    try {
      dialog.showModal();
    } catch (error) {
      scrollReleaseRef.current();
      scrollReleaseRef.current = null;
      throw error;
    }
    setExpanded(true);
    requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
  }

  function closeFullScreen() {
    dialogRef.current?.close();
  }

  function onDialogClose() {
    scrollReleaseRef.current?.();
    scrollReleaseRef.current = null;
    setExpanded(false);
    requestAnimationFrame(() => expandRef.current?.focus({ preventScroll: true }));
  }

  function playbackControl(id) {
    return (
      <button
        className={styles.control}
        type="button"
        onClick={togglePlayback}
        aria-controls={id}
        aria-label={failed ? 'Retry UBA animation' : playing ? 'Pause UBA animation' : 'Play UBA animation'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" /></svg>
        )}
        {failed ? 'Retry' : playing ? 'Pause' : 'Play'}
      </button>
    );
  }

  return (
    <div className={`${styles.root} ${className}`} style={style} ref={frameRef}>
      <div className={styles.media}>
        <Image
          id={mediaId}
          src={playing && !expanded ? animationSrc : POSTER}
          alt={ALT}
          width={640}
          height={360}
          unoptimized
          loading="eager"
          fetchPriority="high"
          className={`${styles.image} ${imageClassName}`}
          onError={playing && !expanded ? onAnimationError : undefined}
        />
        <button
          className={styles.expand}
          type="button"
          onClick={openFullScreen}
          ref={expandRef}
          aria-haspopup="dialog"
          aria-label="View UBA animation in full screen"
        >
          <span className={styles.expandIcon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </span>
        </button>
      </div>
      <div className={styles.controls}>
        {playbackControl(mediaId)}
      </div>
      <span className={styles.status} role="status">
        {statusMessage}
      </span>
      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-label="UBA animation viewer"
        onClose={onDialogClose}
        onKeyDown={event => {
          if (event.key !== 'Tab') return;
          const controls = [...event.currentTarget.querySelectorAll('button:not([disabled])')];
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={event => {
          if (event.target === event.currentTarget) closeFullScreen();
        }}
      >
        <div className={styles.viewer}>
          <Image
            id={`${mediaId}-expanded`}
            src={expanded && playing ? animationSrc : POSTER}
            alt={ALT}
            width={640}
            height={360}
            unoptimized
            className={styles.expandedImage}
            onError={expanded && playing ? onAnimationError : undefined}
          />
          <div className={styles.viewerControls}>
            {playbackControl(`${mediaId}-expanded`)}
            <button type="button" className={styles.control} onClick={closeFullScreen} ref={closeRef}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
              Close
            </button>
          </div>
          <span className={styles.status} role="status">{statusMessage}</span>
        </div>
      </dialog>
    </div>
  );
}
