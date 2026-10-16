'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fragmentTarget } from '../lib/fragments.mjs';

export default function CaseStudyProgressRail({ phases, orientation = 'horizontal' }) {
  const [activeId, setActiveId] = useState(phases[0]?.id ?? '');
  const viewportRef = useRef(null);
  const activeIndex = useMemo(
    () => Math.max(0, phases.findIndex((phase) => phase.id === activeId)),
    [activeId, phases],
  );

  useEffect(() => {
    const sections = phases
      .map((phase) => document.getElementById(phase.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let cancelled = false;
    let updateFrame;

    const getHashTargetId = () => {
      const targetId = fragmentTarget(window.location.hash);
      return phases.some((phase) => phase.id === targetId) ? targetId : '';
    };

    const updateActiveSection = () => {
      if (cancelled) return;

      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;

      if (pageBottom >= documentBottom - 2) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const railBounds = viewportRef.current
        ?.closest('.cs-phase-nav')
        ?.getBoundingClientRect();
      const railEdge = orientation === 'vertical' ? railBounds?.top : railBounds?.bottom;
      const readingLine = Math.max((railEdge ?? 0) + 32, window.innerHeight * 0.33);
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) currentSection = section;
      });

      setActiveId(currentSection.id);
    };

    const scheduleActiveUpdate = () => {
      if (updateFrame) cancelAnimationFrame(updateFrame);
      updateFrame = requestAnimationFrame(updateActiveSection);
    };

    const alignHashTarget = () => {
      const targetId = getHashTargetId();
      const target = targetId ? document.getElementById(targetId) : null;

      if (!cancelled && target) {
        setActiveId(targetId);
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        scheduleActiveUpdate();
      }
    };

    const alignAfterLayout = () => {
      requestAnimationFrame(() => requestAnimationFrame(alignHashTarget));
    };

    const initialTargetId = getHashTargetId();
    if (initialTargetId) {
      queueMicrotask(() => {
        if (!cancelled) setActiveId(initialTargetId);
      });
    }

    if (initialTargetId && document.readyState === 'complete') {
      alignAfterLayout();
    } else if (initialTargetId) {
      window.addEventListener('load', alignAfterLayout, { once: true });
    } else {
      scheduleActiveUpdate();
    }

    if (initialTargetId) document.fonts?.ready.then(alignAfterLayout);

    const handleHashChange = () => {
      const targetId = getHashTargetId();
      if (!targetId) return;

      setActiveId(targetId);
      alignAfterLayout();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', scheduleActiveUpdate);
    window.addEventListener('scroll', scheduleActiveUpdate, { passive: true });

    return () => {
      cancelled = true;
      if (updateFrame) cancelAnimationFrame(updateFrame);
      window.removeEventListener('load', alignAfterLayout);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', scheduleActiveUpdate);
      window.removeEventListener('scroll', scheduleActiveUpdate);
    };
  }, [phases, orientation]);

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
      <div
        className="container cs-phase-nav__viewport"
        ref={viewportRef}
        role="region"
        aria-label="Scrollable case study progress"
        tabIndex={0}
      >
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
