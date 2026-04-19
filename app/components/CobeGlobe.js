'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function CobeGlobe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    let globe = null;

    // By delaying creation by 100ms, we circumvent the React 18 strict mode
    // double-invocation which causes cobe to throw a WebGL buffer exception on Nextjs.
    const timeout = setTimeout(() => {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 280 * 2,
        height: 280 * 2,
        phi: 0,
        theta: 0.1,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.1, 0.2],
        markerColor: [224 / 255, 123 / 255, 60 / 255],
        glowColor: [0.15, 0.15, 0.25],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.005;
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: 280, height: 280, position: 'relative' }}>
      <canvas
        ref={canvasRef}
        className="cosmic-globe"
        style={{
          width: 280,
          height: 280,
          contain: 'layout paint size',
          opacity: 0.9,
          display: 'block'
        }}
      />
    </div>
  );
}
