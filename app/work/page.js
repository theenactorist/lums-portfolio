'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import JsonLd from '../components/JsonLd';
import { productionHomeProjects } from '../data/productionHomeProjects';
import { absoluteUrl, caseStudies, pageCopy, pageSchema } from '../../lib/seo';

const schema = {
  ...pageSchema({
    path: '/work',
    name: 'Selected work by Olumide Olusesi',
    description: pageCopy.work.description,
    type: 'CollectionPage',
  }),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: caseStudies.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(project.path),
      name: project.title,
    })),
  },
};

/* ============================================
   All Projects Data
   ============================================ */
const allProjects = productionHomeProjects.map((project) => ({
  ...project,
  thumbnail: project.image,
  tags: project.attributes,
  role: project.companyLogoAlt,
  period: 'Case study',
  color: '#171717',
}));

export default function WorkPage() {
  return (
    <PageTransition>
      <JsonLd data={schema} />
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
                {pageCopy.work.intro}
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
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.imageAlt}
                          fill
                          sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="work-page__card-placeholder">
                          <span>{project.title}</span>
                        </div>
                      )}
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
