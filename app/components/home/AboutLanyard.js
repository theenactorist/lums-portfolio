'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './AboutLanyard.module.css';

const LanyardScene = dynamic(() => import('./LanyardScene'), { ssr: false });
const PORTRAIT = '/home/about/olumide-profile.png';
const BACK_QUOTE = 'UX is everyone’s business. AI UX is mine.';

// Keep the generated front artwork visible as a static fallback when motion is reduced.
// v2 is v1's PNG as WebP (quality 90, same 1060x1484): 483 KB instead of 3.4 MB.
export default function AboutLanyard({
  frontImage = '/home/about/olumide-lanyard-front-v2.webp',
  backImage = '/home/about/lanyard-back.svg',
  strapImage,
}) {
  const containerRef = useRef(null);
  const entryMarkerRef = useRef(null);
  const controlsRef = useRef(null);
  const nudgePlayedRef = useRef(false);
  const [nearViewport, setNearViewport] = useState(false);
  // On a phone About starts just under the fold, so "near" is true at load. The scene (three.js
  // and the card artwork) waits for the page's load event so it doesn't share the connection
  // with the hero. The static card shows until the scene is ready, as before.
  const [pageLoaded, setPageLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(null);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [entryReached, setEntryReached] = useState(false);
  const [framing, setFraming] = useState({ cardHeight: 416, strapDrop: 124, anchor: 0.22 });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      setReady(false);
      setReducedMotion(preference.matches);
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    let idle = null;
    const markLoaded = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setPageLoaded(true), { timeout: 1000 })
        : window.setTimeout(() => setPageLoaded(true), 0);
    };
    if (document.readyState === 'complete') markLoaded();
    else window.addEventListener('load', markLoaded, { once: true });
    return () => {
      window.removeEventListener('load', markLoaded);
      if (idle !== null) (window.cancelIdleCallback || window.clearTimeout)(idle);
    };
  }, []);

  useEffect(() => {
    const marker = entryMarkerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntryReached(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -24px 0px' });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: '200px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleReady = useCallback(() => setReady(true), []);
  const handleUnavailable = useCallback(() => {
    setReady(false);
    setUnavailable(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const mobile = window.matchMedia('(max-width: 700px)').matches;
      const next = {
        cardHeight: mobile ? Math.min(250, window.innerWidth * 0.6) : Math.min(520, Math.max(360, width * 0.34)) * 0.8,
        strapDrop: mobile ? 56 : Math.min(124, Math.max(72, width * 0.08)),
        anchor: mobile ? 0.5 : 0.22,
      };
      setFraming((current) => (
        current.cardHeight === next.cardHeight && current.strapDrop === next.strapDrop && current.anchor === next.anchor
          ? current : next
      ));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const useScene = nearViewport && pageLoaded && reducedMotion === false && !unavailable;
  const sceneVisible = useScene && ready;
  const staticImage = imageFailed ? PORTRAIT : (showBack ? (backImage || frontImage) : frontImage);
  let instructions = 'Click, tap, or press Enter or Space to flip the portrait card.';
  if (sceneVisible) {
    instructions = 'Drag the portrait card to move it. Click, tap, or press Enter or Space to flip.';
  } else if (useScene && !ready) {
    instructions = 'The portrait card is loading. Flip will be available when it is ready.';
  }

  useEffect(() => {
    if (!sceneVisible || !entryReached || reducedMotion !== false || nudgePlayedRef.current) return;
    const markerRect = entryMarkerRef.current?.getBoundingClientRect();
    const markerVisible = markerRect && markerRect.bottom > 0 &&
      markerRect.top < window.innerHeight - 24 && markerRect.right > 0 && markerRect.left < window.innerWidth;
    // Late assets must not defer the first-entry kick to a later return.
    nudgePlayedRef.current = true;
    if (document.hidden || !markerVisible) return;
    controlsRef.current?.nudge?.();
  }, [sceneVisible, entryReached, reducedMotion]);

  const flipCard = () => {
    if (sceneVisible) controlsRef.current?.flip();
    else setShowBack((previous) => !previous);
  };

  return (
    <figure className={styles.figure} ref={containerRef} aria-label="Olumide Olusesi (Lums), portrait card">
      <span ref={entryMarkerRef} className={styles.entryMarker} aria-hidden="true" />
      <div className={styles.stage}>
        {!sceneVisible && (
          <>
            <div className={styles.strap} aria-hidden="true" />
            <button
              className={styles.staticCard}
              type="button"
              onClick={flipCard}
              disabled={useScene && !ready}
              aria-label="Flip Olumide’s portrait card"
              aria-describedby="about-lanyard-instructions"
            >
              <Image
                src={staticImage || PORTRAIT}
                alt={showBack && !imageFailed ? BACK_QUOTE : 'Olumide Olusesi (Lums)'}
                fill
                sizes="(max-width: 700px) 178px, 296px"
                onError={() => setImageFailed(true)}
              />
            </button>
          </>
        )}
        {useScene && (
          <LanyardScene
            frontImage={frontImage}
            backImage={backImage}
            strapImage={strapImage}
            anchor={framing.anchor}
            cardHeight={framing.cardHeight}
            strapDrop={framing.strapDrop}
            overlay
            label="Olumide Olusesi (Lums), portrait card. Press Enter or Space to flip."
            elasticity={0.4}
            finish="glossy"
            gravity={0.9}
            breeze={0}
            intro={false}
            controlsRef={controlsRef}
            onReady={handleReady}
            onUnavailable={handleUnavailable}
            className={styles.scene}
            interactive={sceneVisible}
            style={{ opacity: ready ? 1 : 0 }}
          />
        )}
        {sceneVisible && <span className={styles.srOnly}>Olumide Olusesi (Lums)</span>}
        <span className={styles.srOnly}>Back of card: {BACK_QUOTE}</span>
      </div>
      <figcaption className={styles.srOnly} id="about-lanyard-instructions">
        {instructions}
      </figcaption>
    </figure>
  );
}
