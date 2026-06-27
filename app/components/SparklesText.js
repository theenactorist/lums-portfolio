'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/* ============================================
   Sparkles Text Component
   ============================================
   Generates animated sparkle particles around 
   text with smooth CSS transitions. Inspired by
   MagicUI's sparkles-text component.
   
   Speed is reduced by 50% per user request.
*/

const SPARKLE_COLORS = ['#e07b3c', '#f4a261', '#ffd6a0', '#ffebb0', '#ffffff'];

function generateSparkle() {
  return {
    id: `sparkle-${Date.now()}-${Math.random()}`,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 4,
    color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    delay: Math.random() * 0.6,
    duration: Math.random() * 1.5 + 2, // 50% slower (was 1-2s, now 1.5-3.5s)
  };
}

function Sparkle({ sparkle }) {
  return (
    <svg
      className="sparkles-text__sparkle"
      style={{
        position: 'absolute',
        left: sparkle.x,
        top: sparkle.y,
        width: sparkle.size,
        height: sparkle.size,
        pointerEvents: 'none',
        zIndex: 2,
        animation: `sparkle-spin ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
      }}
      viewBox="0 0 68 68"
      fill="none"
    >
      <path
        d="M34 0C34 0 33.234 18.995 26.5 25.5C19.004 33.37 0 34 0 34C0 34 19.101 35.368 26.5 42.5C33.234 49.005 34 68 34 68C34 68 36.949 47.634 44.5 42.5C50.2 38.54 68 34 68 34C68 34 50.2 29.46 44.5 25.5C36.949 20.366 34 0 34 0Z"
        fill={sparkle.color}
      />
    </svg>
  );
}

export default function SparklesText({ children, className = '' }) {
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate initial sparkles
    const frame = requestAnimationFrame(() => {
      setSparkles(Array.from({ length: 3 }, () => generateSparkle()));
    });

    // Continuously cycle sparkles — 50% slower interval
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const next = [...prev];
        // Replace the oldest sparkle
        next.shift();
        next.push(generateSparkle());
        return next;
      });
    }, 1200); // 50% slower (was ~800ms)

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`sparkles-text ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} sparkle={sparkle} />
      ))}
      <span className="sparkles-text__content" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}
