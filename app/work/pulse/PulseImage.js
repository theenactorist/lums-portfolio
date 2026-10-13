'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './PulseImage.module.css';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;
const INITIAL_VIEW = { scale: MIN_SCALE, x: 0, y: 0 };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function Icon({ kind, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'magnifier' ? <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" /></> : null}
      {kind === 'plus' ? <path d="M5 12h14M12 5v14" /> : null}
      {kind === 'minus' ? <path d="M5 12h14" /> : null}
      {kind === 'close' ? <path d="m6 6 12 12M6 18 18 6" /> : null}
      {kind === 'original' ? <path d="M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /> : null}
    </svg>
  );
}

/** Pulse-only viewer: fitted presentation, original source, bounded pointer gestures. */
export default function PulseImage({ src, alt, width, height, unoptimized, priority, className, sizes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW);
  const [isDragging, setIsDragging] = useState(false);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const closeRef = useRef(null);
  const viewRef = useRef(INITIAL_VIEW);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const instructionsId = useId();
  const originalSrc = typeof src === 'string' ? src : src.src;

  // clientWidth/clientHeight exclude the transform, so the bounds follow the
  // image's actual fitted aspect ratio rather than its containing box.
  const updateView = useCallback((next) => {
    const scale = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    const stage = stageRef.current;
    const image = imageRef.current;
    const maxX = stage && image ? Math.max(0, (image.clientWidth * scale - stage.clientWidth) / 2) : 0;
    const maxY = stage && image ? Math.max(0, (image.clientHeight * scale - stage.clientHeight) / 2) : 0;
    const bounded = { scale, x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
    viewRef.current = bounded;
    setView(bounded);
  }, []);

  const zoomTo = useCallback((requestedScale, anchor = { x: 0, y: 0 }) => {
    const current = viewRef.current;
    const scale = clamp(requestedScale, MIN_SCALE, MAX_SCALE);
    const ratio = scale / current.scale;
    updateView({ scale, x: anchor.x + (current.x - anchor.x) * ratio, y: anchor.y + (current.y - anchor.y) * ratio });
  }, [updateView]);

  const close = useCallback(() => {
    pointersRef.current.clear();
    gestureRef.current = null;
    setIsDragging(false);
    setIsOpen(false);
    viewRef.current = INITIAL_VIEW;
    setView(INITIAL_VIEW);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const stage = stageRef.current;
    const body = document.body;
    const previousFocus = document.activeElement;
    const trigger = triggerRef.current;
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

    const onWheel = (event) => {
      event.preventDefault();
      const rect = stage.getBoundingClientRect();
      zoomTo(viewRef.current.scale + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 });
    };
    const observer = new ResizeObserver(() => updateView(viewRef.current));
    observer.observe(stage);
    observer.observe(imageRef.current);
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      observer.disconnect();
      dialog.close();
      Object.assign(body.style, previousStyles);
      // Temporarily avoid the page's smooth anchor scrolling on restoration.
      const root = document.documentElement;
      const previousBehaviour = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = previousBehaviour;
      const focusTarget = previousFocus?.isConnected ? previousFocus : trigger;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [isOpen, updateView, zoomTo]);

  const pointInStage = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 };
  };

  const beginGesture = () => {
    const points = [...pointersRef.current.values()];
    if (points.length >= 2) {
      const [first, second] = points;
      gestureRef.current = { type: 'pinch', distance: Math.hypot(second.x - first.x, second.y - first.y), midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }, view: { ...viewRef.current }, moved: true };
    } else if (points.length === 1) {
      gestureRef.current = { type: 'pan', point: points[0], view: { ...viewRef.current }, moved: false, backdrop: points[0].backdrop };
    } else {
      gestureRef.current = null;
    }
  };

  const onPointerDown = (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    pointersRef.current.set(event.pointerId, { ...pointInStage(event), backdrop: event.target === stageRef.current });
    stageRef.current.setPointerCapture(event.pointerId);
    beginGesture();
    setIsDragging(viewRef.current.scale > MIN_SCALE || pointersRef.current.size > 1);
  };

  const onPointerMove = (event) => {
    if (!pointersRef.current.has(event.pointerId) || !gestureRef.current) return;
    const previous = pointersRef.current.get(event.pointerId);
    pointersRef.current.set(event.pointerId, { ...pointInStage(event), backdrop: previous.backdrop });
    const gesture = gestureRef.current;
    const points = [...pointersRef.current.values()];
    if (gesture.type === 'pinch' && points.length >= 2) {
      const [first, second] = points;
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const midpoint = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      const scale = clamp(gesture.view.scale * distance / Math.max(1, gesture.distance), MIN_SCALE, MAX_SCALE);
      const ratio = scale / gesture.view.scale;
      updateView({ scale, x: midpoint.x + (gesture.view.x - gesture.midpoint.x) * ratio, y: midpoint.y + (gesture.view.y - gesture.midpoint.y) * ratio });
    } else if (gesture.type === 'pan') {
      const dx = points[0].x - gesture.point.x;
      const dy = points[0].y - gesture.point.y;
      if (Math.hypot(dx, dy) > 5) gesture.moved = true;
      updateView({ scale: gesture.view.scale, x: gesture.view.x + dx, y: gesture.view.y + dy });
    }
  };

  const endPointer = (event) => {
    const gesture = gestureRef.current;
    const shouldClose = event.type === 'pointerup' && pointersRef.current.size === 1 && gesture?.type === 'pan' && gesture.backdrop && !gesture.moved;
    pointersRef.current.delete(event.pointerId);
    if (stageRef.current.hasPointerCapture(event.pointerId)) stageRef.current.releasePointerCapture(event.pointerId);
    beginGesture();
    // Lifting either finger after a pinch must never count as a backdrop tap.
    if (gesture?.type === 'pinch' && gestureRef.current) gestureRef.current.moved = true;
    setIsDragging(pointersRef.current.size > 0 && viewRef.current.scale > MIN_SCALE);
    if (shouldClose) close();
  };

  const onKeyDown = (event) => {
    if (event.key === 'Tab') {
      const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), a[href]')];
      const currentIndex = controls.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? controls.length - 1 : currentIndex - 1)
        : (currentIndex + 1) % controls.length;
      event.preventDefault();
      controls[nextIndex]?.focus({ preventScroll: true });
      return;
    }
    const current = viewRef.current;
    if (['+', '=', '-', '_', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
    if (event.key === '+' || event.key === '=') zoomTo(current.scale + ZOOM_STEP);
    if (event.key === '-' || event.key === '_') zoomTo(current.scale - ZOOM_STEP);
    if (event.key === '0') updateView(INITIAL_VIEW);
    if (event.key === 'ArrowLeft') updateView({ ...current, x: current.x + 80 });
    if (event.key === 'ArrowRight') updateView({ ...current, x: current.x - 80 });
    if (event.key === 'ArrowUp') updateView({ ...current, y: current.y + 80 });
    if (event.key === 'ArrowDown') updateView({ ...current, y: current.y - 80 });
  };

  return (
    <>
      <button type="button" className={`zoom-trigger ${styles.trigger} ${className || ''}`} onClick={() => setIsOpen(true)} aria-label={`Enlarge ${alt || 'image'}`} aria-haspopup="dialog" ref={triggerRef}>
        <Image src={src} alt={alt || ''} width={width} height={height} unoptimized={unoptimized} preload={Boolean(priority)} sizes={sizes} className="zoom-trigger__image" />
        <span className={`zoom-trigger__hint ${styles.hint}`} aria-hidden="true"><Icon kind="magnifier" size={16} /></span>
      </button>
      {isOpen ? createPortal(
        <dialog className={styles.dialog} aria-modal="true" aria-label={alt || 'Image viewer'} aria-describedby={instructionsId} ref={dialogRef} onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={onKeyDown} onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
          <p id={instructionsId} className={styles.srOnly}>Use the zoom controls, plus and minus keys, or pinch to zoom. Drag the image or use the arrow keys to pan. Press zero to reset, or Escape to close.</p>
          <div className={styles.stage} ref={stageRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endPointer} onPointerCancel={endPointer} onLostPointerCapture={(event) => { if (pointersRef.current.has(event.pointerId)) endPointer(event); }}>
            <Image src={src} alt={alt || ''} width={width} height={height} unoptimized loading="eager" draggable={false} ref={imageRef} onLoad={() => updateView(viewRef.current)} onDoubleClick={() => zoomTo(viewRef.current.scale === MIN_SCALE ? 2.5 : MIN_SCALE)} className={styles.image} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`, cursor: view.scale > MIN_SCALE ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }} />
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.control} onClick={() => zoomTo(viewRef.current.scale - ZOOM_STEP)} aria-label="Zoom out" disabled={view.scale <= MIN_SCALE}><Icon kind="minus" /></button>
            <span className={styles.scale} aria-live="polite">{Math.round(view.scale * 100)}%</span>
            <button type="button" className={styles.control} onClick={() => zoomTo(viewRef.current.scale + ZOOM_STEP)} aria-label="Zoom in" disabled={view.scale >= MAX_SCALE}><Icon kind="plus" /></button>
            <button type="button" className={`${styles.control} ${styles.reset}`} onClick={() => updateView(INITIAL_VIEW)} aria-label="Reset zoom">Reset</button>
            <a className={styles.control} href={originalSrc} target="_blank" rel="noopener noreferrer" aria-label="Open original image in a new tab"><Icon kind="original" size={18} /></a>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label="Close image viewer" ref={closeRef}><Icon kind="close" size={22} /></button>
        </dialog>, document.body,
      ) : null}
    </>
  );
}
