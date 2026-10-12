'use client';

import { useEffect, useState } from 'react';
import { chapters } from './caseStudyContent';

export default function SabiContents() {
  const [activeId, setActiveId] = useState('overview');

  useEffect(() => {
    let frame = 0;
    let cancelled = false;
    const update = () => {
      frame = 0;
      if (cancelled) return;
      const sections = chapters.map(([id]) => document.getElementById(id)).filter(Boolean);
      const root = document.getElementById('sabi-case');
      const navHeight = parseFloat(getComputedStyle(root).getPropertyValue('--nav-height')) || 72;
      const current = [...sections].reverse().find(section => section.getBoundingClientRect().top < navHeight + 64) || sections[0];
      if (current) setActiveId(current.id);
    };
    const schedule = () => { if (!cancelled && !frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const links = chapters.map(([id, label]) => (
    <a key={id} href={`#${id}`} aria-current={activeId === id ? 'location' : undefined}>{label}</a>
  ));

  return (
    <>
      <aside className="chapter-rail"><nav className="chapter-nav" aria-label="Case study chapters">{links}</nav></aside>
      <details className="mobile-contents">
        <summary>In this case study</summary>
        <nav className="mobile-chapters" aria-label="Mobile case study chapters" onClick={event => {
          if (event.target.closest('a')) event.currentTarget.closest('details').open = false;
        }}>{links}</nav>
      </details>
    </>
  );
}
