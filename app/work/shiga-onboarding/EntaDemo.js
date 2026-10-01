'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import styles from './enta-demo.module.css';

const demoBase = '/work/shiga-onboarding/demo-2026-09';
const views = [
  { label: 'Sign up', path: '/index.html#/signup' },
  { label: 'Sign in', path: '/index.html#/login' },
  { label: 'Individual dashboard', path: '/tier2/index.html#dashboard' },
  { label: 'Business dashboard', path: '/index.html#/home/business' },
];

export default function EntaDemo() {
  const [activeView, setActiveView] = useState(views[0]);
  const demoRef = useRef(null);
  const controlsRef = useRef(null);
  const stageRef = useRef(null);
  const footerRef = useRef(null);
  const src = `${demoBase}${activeView.path}`;

  useLayoutEffect(() => {
    const demo = demoRef.current;
    const controls = controlsRef.current;
    const stage = stageRef.current;
    const footer = footerRef.current;
    let animationFrame;

    const fitDemo = () => {
      const gap = parseFloat(getComputedStyle(demo).rowGap) || 0;
      // Leave 100px above the tabs for the site header and 24px below the CTA.
      const availableHeight = window.innerHeight - 124
        - controls.getBoundingClientRect().height
        - footer.getBoundingClientRect().height - gap * 2;
      const width = Math.min(1100, document.documentElement.clientWidth - 32,
        Math.max(0, availableHeight) * 1440 / 1024);
      demo.style.setProperty('--demo-fit-width', `${Math.floor(width)}px`);
      stage.style.setProperty('--demo-scale', String(stage.clientWidth / 1440));
    };

    const scheduleFit = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(fitDemo);
    };

    const observer = new ResizeObserver(scheduleFit);
    [controls, stage, footer].forEach((element) => observer.observe(element));
    window.addEventListener('resize', scheduleFit);
    fitDemo();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scheduleFit);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={demoRef} className={styles.demo}>
      <div ref={controlsRef} className={styles.controls} role="group" aria-label="Choose an ENTA demo view">
        {views.map((view) => (
          <button
            key={view.path}
            type="button"
            aria-pressed={activeView.path === view.path}
            aria-controls="enta-demo"
            onClick={() => setActiveView(view)}
          >
            {view.label}
          </button>
        ))}
      </div>
      <figure ref={stageRef} className={styles.stage}>
        <iframe
          id="enta-demo"
          src={src}
          width="1440"
          height="1024"
          title={`ENTA interactive demo — ${activeView.label}`}
          loading="lazy"
          className={styles.frame}
        />
      </figure>
      <div ref={footerRef} className={styles.footer}>
        <p className="cs-feature__caption">ENTA onboarding and wallets</p>
        <a href={src} target="_blank" rel="noopener noreferrer" className="cs-inline-link"
          aria-label={`Open ${activeView.label.toLowerCase()} demo in a new tab`}>
          Open full-screen demo ↗
        </a>
      </div>
    </div>
  );
}
