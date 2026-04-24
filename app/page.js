'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from './components/PageTransition';
import BackgroundRipple from './components/BackgroundRipple';
import AskLums from './components/AskLums';
import LogoTicker from './components/LogoTicker';

/* ============================================
   Featured Work Data — Lums style
   ============================================ */
const projects = [
  {
    id: 'branch-ai',
    title: 'Three AIs, One Design System',
    description: 'Engineering three AI-powered tools that transformed how Branch\'s product team creates illustrations, writes copy, and prototypes across 3 markets.',
    role: 'AI UX Designer',
    period: 'Oct 2025 - Feb 2026',
    tags: ['AI', 'Design Systems', 'Fintech'],
    color: '#0a1628',
    accentColor: '#6CD2FF',
    thumbnail: '/work/branch-ai/cover.jpg',
  },
  {
    id: 'carbon',
    title: 'Revamping Fintech Home screen Experience',
    description: 'Revamping the home screen experience for a leading digital bank to improve feature discoverability and user engagement.',
    role: 'Product Designer',
    period: '2023',
    tags: ['B2C', 'Fintech & Banking', 'Mobile App'],
    color: '#1a1a2e',
    accentColor: '#e07b3c',
    thumbnail: '/work/carbon/Revamping Fintech Home screen Experience.jpg',
  },
  {
    id: 'sabi',
    title: "Sabi's Supply Chain Logistics Solution for African SMEs",
    description: 'Revolutionizing supply chain logistics for African SMEs, building tools for inventory, commerce, and distribution at scale.',
    role: 'Senior Product Designer',
    period: '2022',
    tags: ['B2B2C', 'E-commerce', 'Logistics'],
    color: '#1e1e28',
    accentColor: '#6fa3ef',
    thumbnail: '/work/sabi/Navigating Complexity_ Revolutionizing Supply Chain Logistics for African SMEs.jpg',
  },
  {
    id: 'uba',
    title: "UBA's Human Resource Management System",
    description: 'Concept to production: HR management system for 20,000+ employees across 20 African countries.',
    role: 'Product Designer',
    period: '2021',
    tags: ['Web App', 'Enterprise'],
    color: '#141422',
    accentColor: '#d4613a',
    thumbnail: '/work/uba/Concept to Production_ Human Resource Management System.jpg',
  },
  {
    id: 'shiga',
    title: 'Shiga Digital',
    description: 'Shaping the future of cross-border payments and crypto infrastructure for businesses across Africa and beyond.',
    role: 'Senior Product Designer',
    period: 'May 2024 — Present',
    tags: ['Fintech', 'Crypto', 'B2B'],
    color: '#161625',
    accentColor: '#4fd1c5',
    hidden: true,
  },
  {
    id: 'branch',
    title: 'Branch International',
    description: 'Designing lending and financial inclusion products for emerging markets — making credit accessible and transparent.',
    role: 'Senior Product Designer',
    period: 'Oct 2025 - Feb 2026',
    tags: ['Lending', 'Mobile', 'Emerging Markets'],
    color: '#1a1a24',
    accentColor: '#a78bfa',
    hidden: true,
  },
];

const testimonials = [
  {
    name: 'Deovrat Dwivedi',
    role: 'Design Team Lead',
    kind: 'colleague',
    quote: "Lums is not a pixel pusher. He is an AI-native builder with a designer's eye and a PM's brain — and that combination is exactly what product teams need to stay relevant in 2026. He specialises in taking an abstract problem, dissecting it surgically, and creating something better than what you imagined. Beyond the work — he is a generous collaborator, a fun teammate, and someone who makes the people around him better.",
  },
  {
    name: 'Duncan',
    role: 'Product Designer',
    kind: 'colleague',
    quote: 'From being your onboarding buddy to someone who shaped how I think about AI and automation — you inspired a whole new way of approaching problems and possibilities.',
  },
  {
    name: 'Annmercy',
    role: 'UX Researcher',
    kind: 'colleague',
    quote: 'One of the fiercest AI champs at work. Impeccable work that made our experience easier. Such a valuable addition to the product team.',
  },
  {
    name: 'Fortunate Nneji',
    role: 'Product Manager',
    kind: 'colleague',
    quote: 'Consistently impressed with his design skills, team leadership, and ability to make complex projects feel effortless. He would be an asset to any organization.',
  },
  {
    name: 'Tonye Boham',
    role: 'Head, HR Group Shared Service',
    kind: 'stakeholder',
    quote: 'Your immense contribution towards the delivery of the HR automation platform is a sterling achievement — borne out of your dedication, result-oriented approach, and willingness to go the extra mile to ensure delivery of all envisioned and ad-hoc requirements of the platform.',
  },
  {
    name: 'Chijioke Dozie',
    role: 'Chief Executive Officer',
    kind: 'stakeholder',
    quote: "I'm really proud of what the @get_carbon team are delivering and this new design change of the Carbon app is just one of the many new changes that are coming. Our mission is not just to change the way you bank, but change your life by banking with us!",
  },
  {
    name: 'Rachael Aluko',
    role: 'Senior Product Designer',
    kind: 'colleague',
    quote: 'Olumide consistently made well-informed design decisions that were backed strongly by research, data, and design processes, making it difficult for stakeholders to say no. His ability to communicate ideas and solutions in a way that commands attention is remarkable.',
  },
  {
    name: 'Eniayo',
    role: 'Product Manager',
    kind: 'colleague',
    quote: "You're one of those people who make work feel easy — reliable, thoughtful, and just always on top of things.",
  },
  {
    name: 'Simon Julius',
    role: 'Frontend Engineer',
    kind: 'colleague',
    quote: 'I love the dedication Olumide puts into his work — how he carries the developer along when making designs, and how he takes responsibility while creating user-centric designs.',
  },
  {
    name: 'Emike Okoyomoh',
    role: 'Product Designer',
    kind: 'colleague',
    quote: 'His unique wealth of design experience and flexibility made him a valuable asset. He excels at his core — product design — but also contributes beyond scope, taking initiative to mentor junior designers.',
  },
];

/* ============================================
   Animation Variants
   ============================================ */
const stagger = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ============================================
   Ripple Hero Background Component
   ============================================ */
function RippleHero({ children }) {
  return (
    <section className="ripple-hero" id="hero">
      {/* Ripple grid background covers entire screen */}
      <BackgroundRipple rows={25} cols={50} cellSize={56} />

      {/* Subtle gradient overlay for depth */}
      <div className="ripple-hero__overlay" />

      {/* Content */}
      <div className="ripple-hero__content">
        {children}
      </div>
    </section>
  );
}

/* ============================================
   Home Page
   ============================================ */
export default function Home() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const wallRowRef = useRef(null);
  const wallPausedRef = useRef(false);
  const wallPosRef = useRef(0);

  const scrollWallBy = (direction) => {
    const row = wallRowRef.current;
    if (!row) return;
    const card = row.querySelector('.wall__card');
    const step = card ? card.offsetWidth + 24 : 400;
    const half = row.scrollWidth / 2;
    let newPos = wallPosRef.current + (direction === 'next' ? step : -step);
    if (newPos < 0) newPos += half > 0 ? half : 0;
    if (half > 0 && newPos >= half) newPos -= half;
    wallPosRef.current = newPos;
    row.scrollLeft = newPos;
  };

  useEffect(() => {
    const row = wallRowRef.current;
    if (!row) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let lastTime = performance.now();
    const pxPerSec = 35;

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      if (!wallPausedRef.current) {
        const half = row.scrollWidth / 2;
        if (half > 0) {
          wallPosRef.current += (pxPerSec * dt) / 1000;
          if (wallPosRef.current >= half) wallPosRef.current -= half;
          row.scrollLeft = wallPosRef.current;
        }
      } else {
        wallPosRef.current = row.scrollLeft;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <PageTransition>
      <main>
        {/* ===== RIPPLE HERO ===== */}
        <RippleHero>
          <div className="hero__container container">
            <motion.div
              className="hero__content"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {/* Main headline */}
              <motion.h1 className="hero__headline" variants={fadeUp}>
                <span
                  className="hero__name"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                >
                  Lums
                  <span className="hero__asterisk">*</span>
                  <span className={`tooltip ${tooltipVisible ? 'tooltip--visible' : ''}`} role="tooltip">
                    Lums is a short form of Olumide Olusesi — crafted by past amazing colleagues.
                  </span>
                </span>{' '}
                is a senior product designer blending <span className="hero__italic">behavioural science</span> and <span className="hero__italic">AI</span> to create valuable digital products.
              </motion.h1>

              {/* Company links */}
              <motion.p className="hero__companies" variants={fadeUp}>
                Currently @{' '}
                <a href="https://shiga.co" target="_blank" rel="noopener noreferrer" className="hero__company-link" id="hero-shiga">Shiga</a>
                {' '}✦ Previously @{' '}
                <a href="https://branch.co" target="_blank" rel="noopener noreferrer" className="hero__company-link" id="hero-branch">Branch</a>
                , @{' '}
                <a href="https://getcarbon.co" target="_blank" rel="noopener noreferrer" className="hero__company-link" id="hero-carbon">Carbon</a>
                , @{' '}
                <a href="https://ubagroup.com" target="_blank" rel="noopener noreferrer" className="hero__company-link" id="hero-uba">UBA</a>
              </motion.p>

              {/* Location + CTA */}
              <motion.p className="hero__meta-line" variants={fadeUp}>
                Based in Ontario, 🇨🇦 —{' '}
                <Link href="/about" className="hero__more-link" id="hero-about-link">
                  More about me ↗
                </Link>
              </motion.p>

            </motion.div>

            {/* Ask Lums AI — Right Side */}
            <motion.div
              className="hero__ask-lums"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AskLums />
            </motion.div>
          </div>
          <LogoTicker />
        </RippleHero>

        {/* ===== SELECTED WORK — Lums Style ===== */}
        <section className="selected-work section" id="featured-work">
          <div className="container">
            <motion.div
              className="selected-work__header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="selected-work__label">Selected work ↓</h2>
              <p className="selected-work__sublabel">Reach out for more details</p>
            </motion.div>

            <div className="selected-work__list">
              {projects.filter((p) => !p.hidden).map((project, i) => (
                <motion.article
                  key={project.id}
                  className="project-entry"
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  id={`project-${project.id}`}
                >
                  <Link href={`/work/${project.id}`} className="project-entry__link">
                    {/* Top row: title + description */}
                    <div className="project-entry__header">
                      <div className="project-entry__title-group">
                        <h3 className="project-entry__title">
                          {project.title}
                          <span className="project-entry__title-arrow">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </h3>
                        {project.tags && project.tags.length > 0 && (
                          <ul className="project-entry__tags" aria-label="Project categories">
                            {project.tags.map((tag) => (
                              <li key={tag} className="project-entry__tag">{tag}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <p className="project-entry__description">{project.description}</p>
                    </div>

                    {/* Image panel */}
                    <div className="project-entry__image" style={{ backgroundColor: project.color }}>
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <div className="project-entry__image-placeholder">
                          <span>{project.title}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RECOMMENDATIONS WALL ===== */}
        <section className="wall section" id="recommendations">
          <div className="container">
            <motion.div
              className="wall__header wall__header--row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="wall__header-text">
                <span className="wall__eyebrow">Recommendations</span>
                <h2 className="wall__title">Words from people I&apos;ve built with</h2>
                <p className="wall__sub">
                  Verified quotes from stakeholders and colleagues across the teams I&apos;ve designed with.
                </p>
              </div>
              <div className="wall__nav" role="group" aria-label="Recommendation carousel controls">
                <button
                  type="button"
                  className="wall__nav-btn"
                  aria-label="Previous recommendation"
                  onClick={() => scrollWallBy('prev')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="wall__nav-btn"
                  aria-label="Next recommendation"
                  onClick={() => scrollWallBy('next')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          <div
            className="wall__row-wrap"
            onMouseEnter={() => { wallPausedRef.current = true; }}
            onMouseLeave={() => { wallPausedRef.current = false; }}
            onFocus={() => { wallPausedRef.current = true; }}
            onBlur={() => { wallPausedRef.current = false; }}
            onTouchStart={() => { wallPausedRef.current = true; }}
            onTouchEnd={() => {
              setTimeout(() => {
                if (wallRowRef.current) wallPosRef.current = wallRowRef.current.scrollLeft;
                wallPausedRef.current = false;
              }, 800);
            }}
            onTouchCancel={() => {
              setTimeout(() => {
                if (wallRowRef.current) wallPosRef.current = wallRowRef.current.scrollLeft;
                wallPausedRef.current = false;
              }, 800);
            }}
          >
            <ul className="wall__row" ref={wallRowRef}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  className="wall__card"
                  aria-hidden={i >= testimonials.length ? 'true' : undefined}
                >
                  <span className="wall__quote-mark" aria-hidden="true">&ldquo;</span>
                  <p className="wall__text">{t.quote}</p>
                  <div className="wall__footer">
                    <div className="wall__avatar" aria-hidden="true">
                      {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="wall__meta">
                      <span className="wall__name">
                        {t.name}
                        <svg
                          className="wall__verified"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-label="Verified on LinkedIn"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </span>
                      <span className="wall__role">{t.role}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="container">
            <div className="wall__cta">
              <a
                href="https://www.linkedin.com/in/olumideolusesi/details/recommendations/"
                target="_blank"
                rel="noopener noreferrer"
                className="wall__cta-btn"
              >
                See more on LinkedIn
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
