'use client';

import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

/* ============================================
   Experience Timeline Data
   ============================================ */
const experience = [
  {
    company: 'Shiga Digital',
    role: 'Founding Product Designer',
    period: 'May 2024 — Present',
    location: 'Remote',
    description: 'Helped the startup secure funding rounds of over $2.5M and partnerships from Tether, Telegram, and Visa. Led product design for a digital asset platform, shaping the future of cross-border payments and crypto infrastructure across Africa, Middle East, and Europe.',
    tags: ['Fintech', 'Crypto', 'Stablecoin', 'B2C & B2B', 'Web App', 'Mobile App', 'Mini-apps'],
    current: true,
  },
  {
    company: 'Branch International',
    role: 'Senior Product Designer',
    period: 'Oct 2024 — Mar 2026',
    location: 'Remote',
    description: 'Designed lending and financial inclusion products serving millions of users across the US, Kenya, India, and emerging markets. Redefined AI-native design by creating innovations like the Illustrations GPT, Copywriting Skill, and Neem DS prototyper.',
    tags: ['Lending', 'Cards', 'Savings', 'KYC', 'AI Innovation', 'Emerging Markets'],
    current: false,
  },
  {
    company: 'Carbon',
    role: 'Product Designer',
    period: 'Jun 2022 — Oct 2024',
    location: 'Lagos, Nigeria',
    description: 'Revamped the home screen experience for one of Africa\'s leading digital banks. Worked across mobile and web products.',
    tags: ['Digital Banking', 'Mobile', 'UX Research'],
    current: false,
  },
  {
    company: 'Sabi',
    role: 'Senior Product Designer',
    period: '2021 — 2022',
    location: 'Lagos, Nigeria',
    description: 'Revolutionized supply chain logistics for African SMEs through intuitive B2B marketplace design.',
    tags: ['B2B', 'Logistics', 'Marketplace', 'E-commerce'],
    current: false,
  },
  {
    company: 'United Bank for Africa',
    role: 'Product Designer',
    period: 'Nov 2019 — Jun 2022',
    location: 'Lagos, Nigeria',
    description: 'Designed an HR management system from concept to production serving 20,000+ employees across 20 African countries.',
    tags: ['Enterprise', 'HR Tech', 'Web App'],
    current: false,
  },
  {
    company: 'Africa Prudential',
    role: 'UI/UX Designer',
    period: '2019 — 2020',
    location: 'Lagos, Nigeria',
    description: 'Designed digital products for one of Nigeria\'s leading registrar and investor services companies.',
    tags: ['Finance', 'Enterprise'],
    current: false,
  },
  {
    company: 'Boughview Innovations',
    role: 'UI Designer',
    period: '2017 — 2019',
    location: 'Lagos, Nigeria',
    description: 'Started career journey in UI design, building digital products and honing visual design craft.',
    tags: ['UI Design', 'Startup'],
    current: false,
  },
];

/* ============================================
   Stats
   ============================================ */
const stats = [
  { label: 'Years of Experience', value: '7+' },
  { label: 'Products Shipped', value: '20+' },
  { label: 'Users Impacted', value: '5M+' },
  { label: 'Mentorship Minutes', value: '1200+' },
];

/* ============================================
   Tools
   ============================================ */
const tools = [
  { name: 'Figma', category: 'Design' },
  { name: 'Framer', category: 'Design' },
  { name: 'Principle', category: 'Prototyping' },
  { name: 'ProtoPie', category: 'Prototyping' },
  { name: 'Maze', category: 'Research' },
  { name: 'Hotjar', category: 'Research' },
  { name: 'Notion', category: 'PM' },
  { name: 'Jira', category: 'PM' },
  { name: 'Linear', category: 'PM' },
  { name: 'Miro', category: 'Collaboration' },
  { name: 'FigJam', category: 'Collaboration' },
  { name: 'Lottie', category: 'Animation' },
  { name: 'After Effects', category: 'Animation' },
  { name: 'VS Code', category: 'Vibe Coding' },
  { name: 'Claude AI', category: 'Vibe Coding' },
  { name: 'Next.js', category: 'Vibe Coding' },
];

/* ============================================
   Vibe-Coded Projects
   ============================================ */
const vibeProjects = [
  {
    name: 'Resume Engine',
    description: 'AI-powered resume & cover letter generator with ATS scoring.',
    tech: ['Next.js', 'Claude API', 'PostgreSQL'],
    status: 'Deployed',
  },
  {
    name: 'Shiga Telegram Bot',
    description: 'Crypto payment bot with wallet logic, KYC, and React mini app.',
    tech: ['Node.js', 'Grammy.js', 'React'],
    status: 'Deployed',
  },
  {
    name: 'Declutter',
    description: 'Personal e-commerce webapp for selling household items.',
    tech: ['React', 'Node.js', 'Express'],
    status: 'Deployed',
  },
  {
    name: 'AudioBox',
    description: 'Live audio broadcasting platform with visualizer and mixer.',
    tech: ['Next.js', 'React', 'WebRTC'],
    status: 'Deployed',
  },
  {
    name: 'This Portfolio',
    description: 'The very site you\'re viewing — designed and vibe-coded.',
    tech: ['Next.js', 'Framer Motion', 'CSS'],
    status: 'Live',
  },
];

/* ============================================
   Animation Variants
   ============================================ */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true },
};

/* ============================================
   About Page
   ============================================ */
export default function About() {
  return (
    <PageTransition>
      <main className="about-page">
        {/* ===== INTRO ===== */}
        <section className="about-intro section" id="about-intro">
          <div className="container">
            <motion.div className="about-intro__grid" {...fadeUp}>
              <div className="about-intro__text">
                <h1 className="about-intro__headline">
                  I design products people{' '}
                  <span className="about-intro__italic">actually</span>{' '}
                  love to use.
                </h1>
                <p className="about-intro__bio">
                  I'm Olumide Olusesi — but most people call me <strong>Lums</strong>.
                  I'm a Senior Product Designer with 7+ years of experience designing for fintech,
                  digital banking, and enterprise platforms across Africa and beyond.
                </p>
                <p className="about-intro__bio">
                  Currently at <strong>Shiga Digital</strong>, I'm shaping the future of
                  cross-border payments and crypto infrastructure. Before that, I helped
                  millions of users access financial services at Branch International, Carbon,
                  and UBA.
                </p>
                <p className="about-intro__bio">
                  When I'm not pushing pixels, I'm vibe-coding — building full-stack apps with
                  AI pair programming. I believe the best designers understand how things are built.
                </p>
              </div>
              <div className="about-intro__stats">
                {stats.map((stat, i) => (
                  <motion.div
                    className="stat-card"
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <span className="stat-card__value">{stat.value}</span>
                    <span className="stat-card__label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== EXPERIENCE TIMELINE ===== */}
        <section className="experience section" id="experience">
          <div className="container">
            <motion.h2 className="section-title" {...fadeUp}>
              Experience
            </motion.h2>
            <div className="timeline">
              {experience.map((exp, i) => (
                <motion.div
                  className={`timeline__item ${exp.current ? 'timeline__item--current' : ''}`}
                  key={exp.company}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  id={`exp-${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="timeline__dot" />
                  <div className="timeline__content">
                    <div className="timeline__header">
                      <div>
                        <h3 className="timeline__company">{exp.company}</h3>
                        <p className="timeline__role">{exp.role}</p>
                      </div>
                      <div className="timeline__meta">
                        <span className="timeline__period">{exp.period}</span>
                        {exp.current && <span className="timeline__badge">Current</span>}
                      </div>
                    </div>
                    <p className="timeline__desc">{exp.description}</p>
                    <div className="timeline__tags">
                      {exp.tags.map((tag) => (
                        <span className="timeline__tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TOOLS ===== */}
        <section className="tools section" id="tools">
          <div className="container">
            <motion.h2 className="section-title" {...fadeUp}>
              Tools & Tech
            </motion.h2>
            <motion.div
              className="tools__grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {tools.map((tool) => (
                <motion.div className="tool-chip" key={tool.name} {...staggerItem}>
                  <span className="tool-chip__name">{tool.name}</span>
                  <span className="tool-chip__category">{tool.category}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== VIBE-CODED PROJECTS ===== */}
        <section className="vibe section" id="vibe-coded">
          <div className="container">
            <motion.div className="vibe__header" {...fadeUp}>
              <h2 className="section-title">Vibe-Coded Apps</h2>
              <p className="vibe__subtitle">
                Full-stack applications built with AI pair programming — because the best designers know how to ship.
              </p>
            </motion.div>
            <div className="vibe__grid">
              {vibeProjects.map((project, i) => (
                <motion.div
                  className="vibe-card"
                  key={project.name}
                  initial={{ opacity: 0, y: 32, rotate: i % 2 === 0 ? -1 : 1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  id={`vibe-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="vibe-card__status">
                    <span className="vibe-card__dot" />
                    {project.status}
                  </div>
                  <h3 className="vibe-card__name">{project.name}</h3>
                  <p className="vibe-card__desc">{project.description}</p>
                  <div className="vibe-card__tech">
                    {project.tech.map((t) => (
                      <span className="vibe-card__tech-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="vibe-card__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    Built with AI
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
