'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;

function clampOffset(offset, scale, bounds) {
  const maxX = Math.max(0, (bounds.imageWidth * scale - bounds.stageWidth) / 2);
  const maxY = Math.max(0, (bounds.imageHeight * scale - bounds.stageHeight) / 2);
  return {
    x: Math.max(-maxX, Math.min(maxX, offset.x)),
    y: Math.max(-maxY, Math.min(maxY, offset.y)),
  };
}

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

export default function EvidenceImage({
  src,
  alt,
  width,
  height,
  unoptimized,
  priority,
  className,
  sizes,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [{ scale, offset }, setView] = useState({ scale: 1, offset: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ pointerId: null, moved: false, startedOnImage: false });
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const closeButtonRef = useRef(null);
  const scrollReleaseRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => {
      cancelAnimationFrame(frame);
      scrollReleaseRef.current?.();
      scrollReleaseRef.current = null;
    };
  }, []);

  const stopDragging = useCallback((event) => {
    const drag = dragRef.current;
    if (event && event.pointerId !== drag.pointerId) return;
    const pointerId = drag.pointerId;
    drag.pointerId = null;
    if (pointerId !== null && drag.target?.hasPointerCapture(pointerId)) {
      drag.target.releasePointerCapture(pointerId);
    }
    setIsDragging(false);
  }, []);

  const close = useCallback(() => {
    stopDragging();
    setIsOpen(false);
    setView({ scale: 1, offset: { x: 0, y: 0 } });
  }, [stopDragging]);

  const open = useCallback((e) => {
    e.preventDefault();
    if (scrollReleaseRef.current) return;
    scrollReleaseRef.current = lockBackgroundScroll();
    setIsOpen(true);
  }, []);

  const measureBounds = useCallback(() => ({
    stageWidth: stageRef.current?.clientWidth || 0,
    stageHeight: stageRef.current?.clientHeight || 0,
    imageWidth: imageRef.current?.clientWidth || 0,
    imageHeight: imageRef.current?.clientHeight || 0,
  }), []);

  const zoomIn = useCallback(() => {
    stopDragging();
    const bounds = measureBounds();
    setView(current => {
      const next = Math.min(MAX_SCALE, +(current.scale + ZOOM_STEP).toFixed(2));
      return { scale: next, offset: clampOffset(current.offset, next, bounds) };
    });
  }, [measureBounds, stopDragging]);

  const zoomOut = useCallback(() => {
    stopDragging();
    const bounds = measureBounds();
    setView(current => {
      const next = Math.max(MIN_SCALE, +(current.scale - ZOOM_STEP).toFixed(2));
      return { scale: next, offset: clampOffset(current.offset, next, bounds) };
    });
  }, [measureBounds, stopDragging]);

  const resetZoom = useCallback(() => {
    stopDragging();
    setView({ scale: 1, offset: { x: 0, y: 0 } });
  }, [stopDragging]);

  const reclamp = useCallback(() => {
    const bounds = measureBounds();
    setView(current => {
      const nextOffset = clampOffset(current.offset, current.scale, bounds);
      if (nextOffset.x === current.offset.x && nextOffset.y === current.offset.y) return current;
      return { ...current, offset: nextOffset };
    });
  }, [measureBounds]);

  useEffect(() => {
    if (!isOpen) return;
    const observer = new ResizeObserver(reclamp);
    if (stageRef.current) observer.observe(stageRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [isOpen, reclamp]);

  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    const onKey = (e) => {
      if (['Escape', '+', '=', '-', '_', '0'].includes(e.key)) e.preventDefault();
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
      if (e.key === 'Tab') {
        const focusable = [...(overlayRef.current?.querySelectorAll('button:not([disabled])') ?? [])];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && (document.activeElement === first || !overlayRef.current?.contains(document.activeElement))) {
          e.preventDefault();
          last.focus({ preventScroll: true });
        } else if (!e.shiftKey && (document.activeElement === last || !overlayRef.current?.contains(document.activeElement))) {
          e.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKey);
      scrollReleaseRef.current?.();
      scrollReleaseRef.current = null;
      requestAnimationFrame(() => {
        if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      });
    };
  }, [isOpen, close, zoomIn, zoomOut, resetZoom]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }, [zoomIn, zoomOut]);

  useEffect(() => {
    if (!isOpen) return;
    const stage = stageRef.current;
    stage?.addEventListener('wheel', onWheel, { passive: false });
    return () => stage?.removeEventListener('wheel', onWheel);
  }, [isOpen, onWheel]);

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0 || dragRef.current.pointerId !== null) return;
    dragRef.current = {
      pointerId: null,
      moved: false,
      startedOnImage: e.target.closest('.zoom-image') !== null,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
      target: e.currentTarget,
    };
    if (scale === MIN_SCALE) return;
    e.preventDefault();
    dragRef.current.pointerId = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, [scale, offset]);

  const onPointerMove = useCallback((e) => {
    if (e.pointerId !== dragRef.current.pointerId) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.hypot(dx, dy) > 3) dragRef.current.moved = true;
    const nextOffset = { x: dragRef.current.originX + dx, y: dragRef.current.originY + dy };
    const bounds = measureBounds();
    setView(current => ({ ...current, offset: clampOffset(nextOffset, current.scale, bounds) }));
  }, [measureBounds]);

  const onImageDoubleClick = useCallback(() => {
    if (scale === 1) setView({ scale: 2.5, offset: { x: 0, y: 0 } });
    else resetZoom();
  }, [scale, resetZoom]);

  const modal = isOpen && (
    <div
      className="zoom-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image viewer'}
      onClick={close}
      ref={overlayRef}
    >
      <div
        className="zoom-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
        onDoubleClick={(e) => {
          if (dragRef.current.startedOnImage) onImageDoubleClick();
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget && !dragRef.current.startedOnImage && !dragRef.current.moved) close();
        }}
      >
        <Image
          src={src}
          alt={alt || ''}
          width={width}
          height={height}
          unoptimized
          sizes="100vw"
          draggable={false}
          className="zoom-image"
          ref={imageRef}
          onLoad={reclamp}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
        />
      </div>

      <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="zoom-btn" onClick={zoomOut} aria-label="Zoom out" disabled={scale <= MIN_SCALE}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <span className="zoom-scale" aria-live="polite">{Math.round(scale * 100)}%</span>
        <button type="button" className="zoom-btn" onClick={zoomIn} aria-label="Zoom in" disabled={scale >= MAX_SCALE}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </button>
        <button type="button" className="zoom-btn zoom-btn--reset" onClick={resetZoom} aria-label="Reset zoom">
          Reset
        </button>
      </div>

      <button type="button" className="zoom-close" onClick={close} aria-label="Close viewer" ref={closeButtonRef}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`zoom-trigger ${className || ''}`}
        aria-label={`View ${alt || 'image'} in full size`}
        ref={triggerRef}
      >
        <Image
          src={src}
          alt={alt || ''}
          width={width}
          height={height}
          unoptimized={unoptimized}
          priority={priority}
          sizes={sizes}
          className="zoom-trigger__image"
        />
        <div className="zoom-trigger__hint" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </button>
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
