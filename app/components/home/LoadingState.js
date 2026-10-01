'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingState.module.css';

const CHEVRON_DELAYS = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3);
  const column = index % 3;
  return (column + Math.abs(row - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const ORBIT_DELAYS = Array.from({ length: 9 }, (_, index) => {
  const step = ORBIT_ORDER.indexOf(index);
  return step === -1 ? null : step * 110;
});

const PATTERNS = {
  Drive: { delays: CHEVRON_DELAYS, duration: 650, round: false },
  Dots: { delays: CHEVRON_DELAYS, duration: 650, round: true },
  Orbit: { delays: ORBIT_DELAYS, duration: 950, round: false },
};

export default function LoadingState({ variant = 'Drive', label = 'Churning', className = '' }) {
  const [elapsedTenths, setElapsedTenths] = useState(0);
  const pattern = PATTERNS[variant] || PATTERNS.Drive;
  const elapsedSeconds = elapsedTenths / 10;
  const elapsed = elapsedSeconds < 60
    ? `${elapsedSeconds.toFixed(1)}s`
    : `${Math.floor(elapsedSeconds / 60)}m ${(elapsedSeconds % 60).toFixed(1)}s`;

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      setElapsedTenths(Math.floor((performance.now() - startedAt) / 100));
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`${styles.loadingState} ${className}`.trim()} role="status">
      <span
        className={styles.grid}
        aria-hidden="true"
        style={{ '--loading-pulse-duration': `${pattern.duration}ms` }}
      >
        {pattern.delays.map((delay, index) => (
          <span
            key={index}
            className={[
              styles.pixel,
              pattern.round ? styles.round : '',
              delay === null ? styles.inactive : '',
            ].filter(Boolean).join(' ')}
            style={delay === null ? undefined : { '--loading-pixel-delay': `${delay}ms` }}
          />
        ))}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.timer} aria-hidden="true">
        {elapsed}
      </span>
    </div>
  );
}
