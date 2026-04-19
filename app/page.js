'use client';

import { useState } from 'react';
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
    id: 'carbon',
    title: 'Carbon',
    description: 'Revamping the home screen experience for a leading digital bank to improve feature discoverability and user engagement.',
    role: 'Product Designer',
    period: 'Jun 2022 — Oct 2024',
    tags: ['Mobile', 'Fintech', 'UX Research'],
    color: '#1a1a2e',
    accentColor: '#e07b3c',
  },
  {
    id: 'sabi',
    title: 'Sabi',
    description: 'Revolutionizing supply chain logistics for African SMEs — building tools for inventory, commerce, and distribution at scale.',
    role: 'Senior Product Designer',
    period: '2021 — 2022',
    tags: ['Web', 'B2B', 'Logistics'],
    color: '#1e1e28',
    accentColor: '#6fa3ef',
  },
  {
    id: 'uba',
    title: 'UBA',
    description: 'Concept to production: HR management system for 20,000+ employees across 20 African countries.',
    role: 'Product Designer',
    period: 'Nov 2019 — Jun 2022',
    tags: ['Enterprise', 'Web App', 'HR Tech'],
    color: '#141422',
    accentColor: '#d4613a',
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
  },
  {
    id: 'branch',
    title: 'Branch International',
    description: 'Designing lending and financial inclusion products for emerging markets — making credit accessible and transparent.',
    role: 'Senior Product Designer',
    period: 'Oct 2024 — Mar 2026',
    tags: ['Lending', 'Mobile', 'Emerging Markets'],
    color: '#1a1a24',
    accentColor: '#a78bfa',
  },
];

const testimonials = [
  {
    name: 'Chijioke Dozie',
    role: 'CEO',
    company: 'Carbon',
    relationship: 'Manager',
    quote: 'Olumide is a rare talent — he combines deep user empathy with the ability to deliver pixel-perfect, ship-ready designs. His work on our home screen revamp directly improved user engagement.',
    source: 'LinkedIn',
  },
  {
    name: 'Tonye Boham',
    role: 'Group Head, Digital Banking',
    company: 'UBA',
    relationship: 'Manager',
    quote: 'From concept to production, Olumide delivered an HR management system that transformed how we manage 20,000+ employees across 20 countries. His attention to detail is exceptional.',
    source: 'LinkedIn',
  },
  {
    name: 'ADPList Mentee',
    role: 'Product Designer',
    company: 'Various',
    relationship: 'Mentee',
    quote: 'Lums is one of the most insightful mentors I\'ve worked with. His feedback is always actionable and he genuinely cares about your growth as a designer.',
    source: 'ADPList',
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
              {projects.map((project, i) => (
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
                        <h3 className="project-entry__title">{project.title}</h3>
                        <span className="project-entry__period">{project.period}</span>
                      </div>
                      <p className="project-entry__description">{project.description}</p>
                    </div>

                    {/* Image panel */}
                    <div className="project-entry__image" style={{ backgroundColor: project.color }}>
                      {i === 0 ? (
                        <div className="project-entry__bento">
                          <motion.div className="bento-card bento-card--left" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                            Analytics
                          </motion.div>
                          <motion.div className="bento-card bento-card--main" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                            Home Screen
                          </motion.div>
                          <motion.div className="bento-card bento-card--right" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 + 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                            Cards
                          </motion.div>
                        </div>
                      ) : (
                        <div className="project-entry__image-placeholder">
                          <span>{project.title}</span>
                        </div>
                      )}
                      <div className="project-entry__image-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7 7 17 7 17 17"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="testimonials section" id="testimonials">
          <div className="container">
            <motion.div
              className="testimonials__header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="selected-work__label">What people say</h2>
              <p className="selected-work__sublabel">Kind words from colleagues, managers, and mentees</p>
            </motion.div>

            <div className="testimonials__grid">
              {testimonials.map((t, i) => (
                <motion.div
                  className="testimonial"
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  id={`testimonial-${i}`}
                >
                  <div className="testimonial__quote-mark">"</div>
                  <blockquote className="testimonial__text">{t.quote}</blockquote>
                  <div className="testimonial__author">
                    <div className="testimonial__avatar">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="testimonial__info">
                      <span className="testimonial__name">{t.name}</span>
                      <span className="testimonial__role">{t.role} · {t.company}</span>
                    </div>
                    <span className="testimonial__source">{t.source}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
