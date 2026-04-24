'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;

export default function ZoomableImage({
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
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const open = useCallback((e) => {
    e.preventDefault();
    setIsOpen(true);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, +(s + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(MIN_SCALE, +(s - ZOOM_STEP).toFixed(2));
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, zoomIn, zoomOut, resetZoom]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }, [zoomIn, zoomOut]);

  const onMouseDown = useCallback((e) => {
    if (scale === 1) return;
    e.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  }, [scale, offset]);

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
  }, []);

  const onMouseUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  const onImageDoubleClick = useCallback(() => {
    if (scale === 1) setScale(2.5);
    else resetZoom();
  }, [scale, resetZoom]);

  const modal = isOpen && (
    <div
      className="zoom-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image viewer'}
      onClick={close}
    >
      <div
        className="zoom-stage"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt || ''}
          draggable={false}
          className="zoom-image"
          onDoubleClick={onImageDoubleClick}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? (dragRef.current.dragging ? 'grabbing' : 'grab') : 'zoom-in',
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

      <button type="button" className="zoom-close" onClick={close} aria-label="Close viewer">
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
