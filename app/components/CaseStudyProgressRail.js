'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function CaseStudyProgressRail({ phases }) {
  const [activeId, setActiveId] = useState(phases[0]?.id ?? '');
  const viewportRef = useRef(null);
  const activeIndex = useMemo(
    () => Math.max(0, phases.findIndex((phase) => phase.id === activeId)),
    [activeId, phases],
  );

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId || !phases.some((phase) => phase.id === targetId)) return undefined;

    let cancelled = false;
    const alignHashTarget = () => {
      const target = document.getElementById(targetId);
      if (!cancelled && target) target.scrollIntoView({ block: 'start', behavior: 'auto' });
    };

    const alignAfterLayout = () => {
      requestAnimationFrame(() => requestAnimationFrame(alignHashTarget));
    };

    if (document.readyState === 'complete') {
      alignAfterLayout();
    } else {
      window.addEventListener('load', alignAfterLayout, { once: true });
    }

    document.fonts?.ready.then(alignAfterLayout);

    return () => {
      cancelled = true;
      window.removeEventListener('load', alignAfterLayout);
    };
  }, [phases]);

  useEffect(() => {
    const sections = phases
      .map((phase) => document.getElementById(phase.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        if (activeEntry) setActiveId(activeEntry.target.id);
      },
      {
        rootMargin: '-34% 0px -65% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [phases]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeStep = viewport?.querySelector(`[data-phase-id="${activeId}"]`);

    if (!viewport || !activeStep || viewport.scrollWidth <= viewport.clientWidth) return;

    viewport.scrollLeft = Math.max(
      0,
      activeStep.offsetLeft - (viewport.clientWidth - activeStep.clientWidth) / 2,
    );
  }, [activeId]);

  return (
    <nav className="cs-phase-nav" aria-label="Case study progress">
      <div className="container cs-phase-nav__viewport" ref={viewportRef}>
        <ol className="cs-phase-nav__list">
          {phases.map((phase, index) => {
            const isActive = phase.id === activeId;
            const isComplete = index < activeIndex;

            return (
              <li
                className={isComplete ? 'is-complete' : isActive ? 'is-active' : ''}
                data-phase-id={phase.id}
                key={phase.id}
              >
                <a href={`#${phase.id}`} aria-current={isActive ? 'step' : undefined}>
                  <span className="cs-phase-nav__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="cs-phase-nav__label">{phase.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
