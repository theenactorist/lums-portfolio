'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from './SiteLink';
import styles from './BrandMark.module.css';

export default function BrandMark({ id, location = 'header', onHomeClick }) {
  const noteId = useId();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const hoveredRef = useRef(false);
  const activatedRef = useRef(false);
  const close = useCallback(() => {
    activatedRef.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const escape = (event) => { if (event.key === 'Escape') close(); };
    const outside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) close();
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open, close]);

  return (
    <span
      className={styles.mark}
      data-brand-mark={location}
      ref={wrapperRef}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') {
          hoveredRef.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        hoveredRef.current = false;
        if (!event.currentTarget.contains(document.activeElement)) close();
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && !hoveredRef.current) close();
      }}
    >
      <Link
        href="/"
        id={id}
        className={location === 'header' ? `nav__logo ${styles.home}` : styles.home}
        aria-label="Lums home"
        aria-describedby={noteId}
        onClick={() => { close(); onHomeClick?.(); }}
      >
        <span className={styles.wordmark} aria-hidden="true" />
      </Link>
      <button
        type="button"
        className={styles.asterisk}
        aria-label="About the name Lums"
        aria-describedby={noteId}
        aria-expanded={open}
        onClick={() => {
          activatedRef.current = !activatedRef.current;
          setOpen(activatedRef.current);
        }}
      >
        <span aria-hidden="true">*</span>
      </button>
      <span id={noteId} className={styles.note} role="tooltip" data-open={open} aria-hidden={!open}>
        Lums is short for <strong>Olumide Olusesi</strong>, a name coined by former colleagues.
      </span>
    </span>
  );
}
