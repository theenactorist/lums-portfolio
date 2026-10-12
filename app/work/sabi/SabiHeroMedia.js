'use client';

import { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import ZoomableImage from '../../components/case-studies/ZoomableImage';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribe(callback) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getSnapshot = () => window.matchMedia(motionQuery).matches;
const getServerSnapshot = () => true;

export default function SabiHeroMedia() {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [playOverride, setPlayOverride] = useState(null);
  const playing = playOverride ?? !reducedMotion;

  return (
    <figure className="hero-evidence">
      <div className="hero-evidence-visual" id="sabi-animation">
        {playing ? (
          <ZoomableImage src="/work/sabi/cover.gif" alt="Sabi supply-chain animation showing shipping, port operations, road transport, warehousing and a market" width={640} height={360} unoptimized priority sizes="(min-width: 1480px) 36vw, (min-width: 768px) 530px, 90vw" />
        ) : (
          <Image src="/work/sabi/cover-poster.jpg" alt="Still frame from the Sabi supply-chain animation, showing a cargo ship at sea" width={640} height={360} priority sizes="(min-width: 1480px) 36vw, (min-width: 768px) 530px, 90vw" />
        )}
      </div>
      <button className="animation-control" type="button" aria-controls="sabi-animation" onClick={() => setPlayOverride(!playing)}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>{playing ? 'Pause animation' : 'Play animation'}
      </button>
    </figure>
  );
}
