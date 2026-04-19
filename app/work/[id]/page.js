'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import PageTransition from '../../components/PageTransition';

/* ============================================
   Project Data — Full Case Studies
   ============================================ */
const projectData = {
  carbon: {
    title: 'Revamping Home Screen Experience',
    subtitle: 'Reimagining the core banking experience for millions of users.',
    client: 'Carbon',
    discipline: 'Product Design, UX Research',
    timeline: 'Jun 2022 — Oct 2024',
    role: 'Product Designer',
    tools: 'Figma, Maze, Hotjar, Miro',
    color: '#1a1a2e',
    sections: [
      {
        label: 'Summary',
        content: 'Carbon is one of Africa\'s leading digital banks, serving millions of users across the continent. The home screen is the first touchpoint users see when they open the app — and it wasn\'t performing. Users struggled to find key features, engagement was declining, and the information architecture needed a complete rethink.',
      },
      {
        label: 'Challenge',
        content: 'The existing home screen was cluttered with too many features competing for attention. Key actions like sending money, paying bills, and checking account balances were buried under unnecessary complexity. User research revealed that 67% of users couldn\'t find the feature they needed within 3 seconds.',
      },
      {
        label: 'Process',
        content: 'I led the full design process: user research (15 interviews + 2000-respondent survey), competitive analysis of 8 digital banks, information architecture audit, and iterative prototyping. We ran 3 rounds of usability testing with 40 participants before arriving at the final design.',
      },
      {
        label: 'Solution',
        content: 'The redesigned home screen introduced a personalized, action-first layout. Key stats and quick actions are immediately visible. A smart "For You" section surfaces relevant features based on usage patterns. The new IA reduced cognitive load by 40% and organized features into clear, scannable categories.',
      },
      {
        label: 'Impact',
        content: 'After launch, we measured a 34% increase in feature discoverability, 22% improvement in task completion rate, and a 15% increase in daily active users engaging with the home screen. The NPS score improved from 32 to 48.',
      },
    ],
  },
  sabi: {
    title: 'Revolutionizing Supply Chain Logistics',
    subtitle: 'Building Africa\'s B2B marketplace for SME supply chains.',
    client: 'Sabi',
    discipline: 'Product Design, Systems Design',
    timeline: '2021 — 2022',
    role: 'Senior Product Designer',
    tools: 'Figma, FigJam, Notion, Jira',
    color: '#1e1e28',
    sections: [
      {
        label: 'Summary',
        content: 'Sabi is a B2B commerce platform connecting manufacturers, distributors, and retailers across Africa. The platform handles logistics, inventory, and payments for thousands of small and medium enterprises navigating complex supply chains.',
      },
      {
        label: 'Challenge',
        content: 'SME operators were abandoning the platform due to complicated onboarding, unclear pricing, and a logistics tracking system that required constant manual updates. The goal was to reduce friction and build trust with users who were often new to digital commerce tools.',
      },
      {
        label: 'Process',
        content: 'I embedded with field agents and store owners across Lagos markets to understand their workflows firsthand. This ethnographic research informed a ground-up redesign of the order flow, introducing real-time tracking and a simplified pricing calculator.',
      },
      {
        label: 'Solution',
        content: 'Redesigned the entire order-to-delivery experience with a focus on progressive disclosure. New users see a simplified view that expands as they become more comfortable. Real-time GPS tracking replaced manual status updates. The pricing model became transparent with a visual cost breakdown.',
      },
      {
        label: 'Impact',
        content: 'Onboarding completion increased by 45%. Order placement time decreased from 8 minutes to 3 minutes. Platform retention improved by 28% over the following quarter.',
      },
    ],
  },
  uba: {
    title: 'HR Management System',
    subtitle: 'From concept to production: serving 20,000+ employees across 20 countries.',
    client: 'United Bank for Africa',
    discipline: 'Product Design, Enterprise UX',
    timeline: 'Nov 2019 — Jun 2022',
    role: 'Product Designer',
    tools: 'Figma, Sketch, Adobe XD, Jira',
    color: '#141422',
    sections: [
      {
        label: 'Summary',
        content: 'UBA is the largest pan-African bank, operating in 20 countries with over 20,000 employees. Their HR processes were fragmented across multiple legacy systems, spreadsheets, and manual workflows. I was tasked with designing a unified HR management platform from scratch.',
      },
      {
        label: 'Challenge',
        content: 'Employees across 20 countries had different HR needs, local regulations, and language requirements. Leave management, performance reviews, benefits administration, and employee records were scattered across disconnected systems. HR teams spent 40% of their time on manual data reconciliation.',
      },
      {
        label: 'Process',
        content: 'I started with a comprehensive stakeholder mapping exercise (48 stakeholders across 6 countries), followed by a systems audit of existing tools. I created a modular design system that could adapt to different country-specific requirements while maintaining a consistent user experience.',
      },
      {
        label: 'Solution',
        content: 'A comprehensive, role-based HR platform with modules for employee self-service, leave management, performance tracking, payroll integration, and reporting dashboards. The design system included 200+ components supporting 3 languages and country-specific variations.',
      },
      {
        label: 'Impact',
        content: 'The platform consolidated 7 separate systems into one. HR processing time decreased by 60%. Employee self-service adoption reached 85% within 6 months. The system successfully scaled across all 20 UBA operating countries.',
      },
    ],
  },
};

/* ============================================
   Animation helpers
   ============================================ */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/* ============================================
   Single Project Page — Jago Pang Structure
   ============================================ */
export default function ProjectPage({ params }) {
  const { id } = use(params);
  const project = projectData[id];

  if (!project) {
    notFound();
  }

  // Determine next project for navigation
  const projectIds = Object.keys(projectData);
  const currentIndex = projectIds.indexOf(id);
  const nextId = projectIds[(currentIndex + 1) % projectIds.length];
  const nextProject = projectData[nextId];

  return (
    <PageTransition>
      <main className="project-page">
        {/* ===== HERO ===== */}
        <section className="project-hero" style={{ backgroundColor: project.color }}>
          <div className="container">
            <motion.div
              className="project-hero__content"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="project-hero__client">{project.client}</span>
              <h1 className="project-hero__title">{project.title}</h1>
              <p className="project-hero__subtitle">{project.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* ===== METADATA GRID ===== */}
        <section className="project-meta section">
          <div className="container">
            <motion.div className="project-meta__grid" {...fadeUp}>
              <div className="project-meta__item">
                <span className="project-meta__label">Discipline</span>
                <span className="project-meta__value">{project.discipline}</span>
              </div>
              <div className="project-meta__item">
                <span className="project-meta__label">Timeline</span>
                <span className="project-meta__value">{project.timeline}</span>
              </div>
              <div className="project-meta__item">
                <span className="project-meta__label">For</span>
                <span className="project-meta__value">{project.client}</span>
              </div>
              <div className="project-meta__item">
                <span className="project-meta__label">Tools</span>
                <span className="project-meta__value">{project.tools}</span>
              </div>
              <div className="project-meta__item">
                <span className="project-meta__label">Role</span>
                <span className="project-meta__value">{project.role}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== BODY — 2 Column Asymmetric (30/70) ===== */}
        <section className="project-body section">
          <div className="container">
            {project.sections.map((section, i) => (
              <motion.div
                className="project-body__row"
                key={section.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="project-body__label">
                  <span>{section.label}</span>
                </div>
                <div className="project-body__content">
                  <p>{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== NEXT PROJECT ===== */}
        <section className="project-next">
          <div className="container">
            <Link href={`/work/${nextId}`} className="project-next__link" id="next-project">
              <motion.div
                className="project-next__inner"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="project-next__label">Next Project</span>
                <h2 className="project-next__title">{nextProject.title}</h2>
                <span className="project-next__client">{nextProject.client}</span>
                <div className="project-next__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
