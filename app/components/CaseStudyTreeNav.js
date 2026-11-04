'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './CaseStudyTreeNav.module.css';

// Critically damped: damping = 2 * sqrt(stiffness * mass), so the marker settles without overshoot.
const spring = { type: 'spring', stiffness: 400, damping: 40, mass: 1 };

// The tree look for CaseStudyProgressRail. Rows share one height, so the pill and the diamond move by
// whole rows (a percentage of their own height) and nothing has to be measured.
export default function CaseStudyTreeNav({ phases, activeId, listRef }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const reducedMotion = useReducedMotion();
  const targetId = hoveredId ?? focusedId ?? activeId;
  const targetIndex = Math.max(0, phases.findIndex((phase) => phase.id === targetId));
  const transition = reducedMotion ? { duration: 0 } : spring;
  const y = `${targetIndex * 100}%`;

  return (
    <div className={styles.tree} ref={listRef}>
      <span className={styles.guide} aria-hidden="true" />
      <span className={styles.end} aria-hidden="true" />
      <motion.span className={styles.pill} aria-hidden="true" initial={false} animate={{ y }} transition={transition} />
      <motion.span className={styles.marker} aria-hidden="true" initial={false} animate={{ y }} transition={transition}>
        <span className={styles.diamond} />
      </motion.span>
      <ol className={styles.list} onPointerLeave={() => setHoveredId(null)}>
        {phases.map((phase) => {
          const isActive = phase.id === activeId;
          return (
            <li key={phase.id} data-phase-id={phase.id}>
              <a
                href={`#${phase.id}`}
                className={phase.id === targetId ? styles.target : undefined}
                aria-current={isActive ? 'location' : undefined}
                onPointerEnter={() => setHoveredId(phase.id)}
                onFocus={() => setFocusedId(phase.id)}
                onBlur={() => setFocusedId(null)}
              >
                {phase.label}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
