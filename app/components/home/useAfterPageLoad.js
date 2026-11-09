'use client';

import { useEffect, useState } from 'react';

export const HERO_READY_EVENT = 'lums:hero-ready';

// Called by the Toronto scene once it's showing (or has given up), so the rest of Home's extras
// can follow without competing with it.
export function announceHeroReady() {
  window.__lumsHeroReady = true;
  window.dispatchEvent(new Event(HERO_READY_EVENT));
}

const isOpaque = (element) => {
  for (let node = element; node; node = node.parentElement) {
    if (Number.parseFloat(getComputedStyle(node).opacity) < 1) return false;
  }
  return true;
};

// True once the page's load event has fired (the HTML, styles, fonts, scripts and the
// preloaded hero poster are in). Home uses it to hold back its heavy extras so a slow phone
// gets the first view first: the hero video and Toronto scene, then the About lanyard.
// - revealRef: an element in the first view (the hero video). Also wait for the page's
//   fade-in (PageTransition) to finish, then repaint that element once. Chrome doesn't record
//   a paint for content revealed by a compositor opacity fade until it next repaints, so
//   without this the poster's Largest Contentful Paint is only reported when the video starts
//   downloading, and Lighthouse then charges the whole video to it. The repaint (an outline set
//   and cleared, invisible) makes the report match the moment the poster is fully visible.
// - afterHero: wait for announceHeroReady(), falling back to 10 s after load.
// - idle: then wait for an idle moment (at most a second).
export default function useAfterPageLoad({ idle = false, afterHero = false, revealRef = null } = {}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let frame = null;
    let timer = null;
    let idleId = null;
    const nextFrame = (callback) => { frame = requestAnimationFrame(callback); };
    const done = () => { if (!cancelled) setLoaded(true); };
    const onHeroReady = () => finish();
    function finish() {
      if (cancelled) return;
      window.removeEventListener(HERO_READY_EVENT, onHeroReady);
      if (timer !== null) window.clearTimeout(timer);
      nextFrame(() => {
        if (idle && window.requestIdleCallback) idleId = window.requestIdleCallback(done, { timeout: 1000 });
        else nextFrame(done);
      });
    }
    const reveal = (element, started = performance.now()) => {
      if (cancelled) return;
      if (!isOpaque(element) && performance.now() - started < 2000) {
        nextFrame(() => reveal(element, started));
        return;
      }
      element.style.outline = '0px solid transparent';
      nextFrame(() => {
        element.style.outline = '';
        finish();
      });
    };
    const afterLoad = () => {
      if (afterHero) {
        if (window.__lumsHeroReady) { finish(); return; }
        timer = window.setTimeout(finish, 10000);
        window.addEventListener(HERO_READY_EVENT, onHeroReady);
        return;
      }
      const element = revealRef?.current;
      if (element) reveal(element);
      else finish();
    };
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', afterLoad);
      window.removeEventListener(HERO_READY_EVENT, onHeroReady);
      if (frame !== null) cancelAnimationFrame(frame);
      if (timer !== null) window.clearTimeout(timer);
      if (idleId !== null) window.cancelIdleCallback(idleId);
    };
  }, [idle, afterHero, revealRef]);

  return loaded;
}
