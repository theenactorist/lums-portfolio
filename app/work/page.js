'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

/* ============================================
   All Projects Data
   ============================================ */
const allProjects = [
  {
    id: 'branch-ai',
    title: 'Three AIs, One Design System',
    description: 'Engineering AI tools that transformed how Branch\'s team creates illustrations, writes copy, and prototypes.',
    role: 'AI UX Designer',
    period: 'Oct 2024 - Mar 2026',
    tags: ['AI', 'Design Systems', 'Fintech'],
    category: 'product',
    color: '#0a1628',
  },
  {
    id: 'carbon',
    title: 'Carbon',
    description: 'Revamping the home screen experience for a leading digital bank.',
    role: 'Product Designer',
    period: 'Jun 2022 - Oct 2024',
    tags: ['Mobile', 'Fintech', 'UX Research'],
    category: 'product',
    color: '#1a1a2e',
  },
  {
    id: 'sabi',
    title: 'Sabi',
    description: 'Revolutionizing supply chain logistics for African SMEs.',
    role: 'Senior Product Designer',
    period: '2021 - 2022',
    tags: ['Web', 'B2B', 'Logistics'],
    category: 'product',
    color: '#1e1e28',
  },
  {
    id: 'uba',
    title: 'UBA',
    description: 'Concept to production: HR management system for 20,000+ employees.',
    role: 'Product Designer',
    period: 'Nov 2019 - Jun 2022',
    tags: ['Enterprise', 'Web App', 'HR Tech'],
    category: 'product',
    color: '#141422',
  },
  {
    id: 'shiga',
    title: 'Shiga Digital',
    description: 'Shaping the future of cross-border payments and crypto infrastructure.',
    role: 'Senior Product Designer',
    period: 'May 2024 - Present',
    tags: ['Fintech', 'Crypto', 'B2B'],
    category: 'product',
    color: '#161625',
  },
  {
    id: 'branch',
    title: 'Branch International',
    description: 'Designing lending and financial inclusion products for emerging markets.',
    role: 'Senior Product Designer',
    period: 'Oct 2024 - Mar 2026',
    tags: ['Lending', 'Mobile', 'Emerging Markets'],
    category: 'product',
    color: '#1a1a24',
  },
  {
    id: 'africa-prudential',
    title: 'Africa Prudential',
    description: 'Digital products for Nigeria\'s leading registrar and investor services.',
    role: 'UI/UX Designer',
    period: '2019 — 2020',
    tags: ['Finance', 'Enterprise'],
    category: 'product',
    color: '#171720',
  },
];

const categories = [
  { key: 'all', label: 'All Work' },
  { key: 'product', label: 'Product Design' },
  { key: 'vibe', label: 'Vibe-Coded' },
];

export default function WorkPage() {
  return (
    <PageTransition>
      <main>
        {/* ===== WORK HERO ===== */}
        <section className="work-page-hero section" id="work-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="work-page-hero__title">Work</h1>
              <p className="work-page-hero__subtitle">
                A curated collection of product design case studies and vibe-coded projects — 
                spanning fintech, digital banking, enterprise platforms, and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== PROJECT GRID — Asymmetric ===== */}
        <section className="work-page-grid section" id="work-grid">
          <div className="container">
            <div className="work-page__grid">
              {allProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className={`work-page__card ${i === 0 ? 'work-page__card--featured' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <Link
                    href={`/work/${project.id}`}
                    className="work-page__card-link"
                    id={`work-project-${project.id}`}
                  >
                    <div className="work-page__card-image" style={{ backgroundColor: project.color }}>
                      <div className="work-page__card-placeholder">
                        <span>{project.title}</span>
                      </div>
                      <div className="work-page__card-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7 7 17 7 17 17"/>
                        </svg>
                      </div>
                    </div>
                    <div className="work-page__card-info">
                      <div className="work-page__card-meta">
                        <span className="work-page__card-role">{project.role}</span>
                        <span className="work-page__card-period">{project.period}</span>
                      </div>
                      <h2 className="work-page__card-title">{project.title}</h2>
                      <p className="work-page__card-desc">{project.description}</p>
                      <div className="work-page__card-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="work-page__card-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
