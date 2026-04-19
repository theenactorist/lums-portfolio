'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const USERFLOW_LINK = 'https://whimsical.com/5nev8riqfkvT6UJvL7hYH7';
const SKETCHES_LINK = 'https://whimsical.com/hr-sanctions-userflows-5FB17bJA29mCUEUzw7HQFD@AhRp651J2qBSxRy6kQZC3FAEX';
const WIREFRAMES_LINK = 'https://whimsical.com/hr-sanctions-wireframes-EpmyxbnscnxDPuBBuKPdhS@AhRp651J2qVi9nHELRqnUVjYb';
const HCM_LINK = 'https://hcmconnect.ubagroup.com/';
const UBA_LINK = 'https://www.ubagroup.com/';

export default function UBACaseStudy() {
  return (
    <PageTransition>
      <main className="cs-page">
        {/* ===== BREADCRUMB ===== */}
        <nav className="cs-breadcrumb" aria-label="Breadcrumb">
          <div className="container cs-wide-container">
            <ol className="cs-breadcrumb__list">
              <li className="cs-breadcrumb__item">
                <Link href="/" className="cs-breadcrumb__link">Home</Link>
              </li>
              <li className="cs-breadcrumb__sep" aria-hidden="true">&gt;</li>
              <li className="cs-breadcrumb__item cs-breadcrumb__item--current" aria-current="page">
                Case Study
              </li>
            </ol>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section className="cs-hero">
          <div className="container cs-hero__container">
            <motion.div
              className="cs-hero__grid"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cs-hero__text">
                <h1 className="cs-hero__title">
                  Concept to Production: Human Resource Management System
                </h1>
                <p className="cs-hero__subtitle">
                  With a 72-year history,{' '}
                  <a href={UBA_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    United Bank of Africa (UBA)
                  </a>{' '}
                  is one of the leading and most recognized banking brands to originate from
                  Sub-Sahara Africa. UBA has growing operations in 20 African countries, the UK
                  and USA, and a rep. office in France providing corporate, commercial, SME,
                  consumer and personal (retail) banking services to more than 25 million
                  customers.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <Image
                  src="/work/uba/cover.gif"
                  alt="UBA Human Resource Management System interface"
                  width={1200}
                  height={675}
                  unoptimized
                  priority
                  className="cs-hero__cover-image"
                />
              </figure>
            </motion.div>
          </div>
        </section>

        {/* ===== META GRID ===== */}
        <section className="cs-meta-section">
          <div className="container cs-wide-container">
            <motion.div className="cs-meta" {...fadeUp}>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Role</span>
                <span className="cs-meta__value">Product Design</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Duration</span>
                <span className="cs-meta__value">Jan 2020 · 12 months</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Industry</span>
                <span className="cs-meta__value">Web app, Enterprise, HR-tech</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">For</span>
                <span className="cs-meta__value">UBA</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Team</span>
                <span className="cs-meta__value cs-meta__value--stack">
                  3 × product designers<br />
                  16 × engineers<br />
                  1 × solution architect<br />
                  2 × QA engineers
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== CHALLENGE ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Challenge</span></div>
              <div className="cs-prose__content">
                <p>
                  The existing employee management process posed significant challenges. HR
                  business partners were inundated with daily requests from a workforce of over
                  10,000 employees, all of which had to be processed manually. This manual
                  approach not only led to delays but also increased the risk of errors, creating
                  bottlenecks in HR operations.
                </p>
                <p>
                  Covid-19 came and in response to the pandemic, stringent preventive measures,
                  including social distancing, compelled the entire organization to shift to
                  remote work. This was an unprecedented challenge, as the organization had not
                  previously operated remotely. The impact of this shift became starkly apparent
                  as employees and HR partners found themselves operating remotely, away from
                  their usual work locations containing vital files and documents necessary for
                  HR operations.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SOLUTION & IMPACT ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Solution &amp; Impact</span></div>
              <div className="cs-prose__content">
                <p>
                  The introduction of{' '}
                  <a href={HCM_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Human Capital Management (HCM)
                  </a>{' '}
                  automation, codenamed HCMConnect, marked a pivotal moment. It emerged as the
                  central pillar of innovation, significantly enhancing the experience of employee
                  management for human resource business partners.
                </p>
                <p>
                  Moreover, its implementation acted as a catalyst for increased demand for
                  automation in various operational processes. This ripple effect led to
                  substantial savings of $80,000 per month by replacing costly third-party
                  enterprise applications with more efficient in-house solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== METRICS ===== */}
        <section className="cs-metrics-section section">
          <div className="container">
            <motion.div className="cs-metrics cs-metrics--two" {...fadeUp}>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">$80,000</span>
                <span className="cs-metrics__label">Savings on monthly license</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">50%</span>
                <span className="cs-metrics__label">Increase in automation demand</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SOLUTION IMAGES GALLERY ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                {[1, 2, 3, 4].map((n) => (
                  <figure key={n} className="cs-feature__figure">
                    <Image
                      src={`/work/uba/solution-${n}.jpg`}
                      alt={`HCMConnect interface screen ${n}`}
                      width={2048}
                      height={1280}
                      className="cs-feature__image"
                    />
                  </figure>
                ))}
              </div>
              <p className="cs-feature__caption">
                HCMConnect — the in-house HCM automation platform
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== DIVIDER ===== */}
        <section className="container">
          <motion.div className="cs-divider" {...fadeUp}>
            Behind the Scenes
          </motion.div>
        </section>

        {/* ===== DISCOVERY ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Discovery</h2>
              <p className="cs-feature__intro">
                Insight into the problem, researching employees and human resource business
                partners and understanding their needs.
              </p>

              <h3 className="cs-feature__deliverables-label">Activities</h3>
              <ul className="cs-feature__list">
                <li>User interviews</li>
                <li>Literature review</li>
              </ul>

              <h3 className="cs-feature__deliverables-label">Key findings</h3>
              <ul className="cs-feature__list">
                <li>
                  <strong>Manual processing:</strong> The majority of employee requests are
                  currently handled through manual processes, relying on paper forms and Microsoft
                  Office tools like Excel and Word. Communication and approvals are primarily
                  managed through email, which often leads to lengthy and disorganized threads,
                  making it challenging to track and respond effectively.
                </li>
                <li>
                  <strong>Disjointed &amp; dispersed data sources:</strong> A significant portion
                  of requests — leading to substantial backlogs for HR business partners and
                  employees — are related to inquiries such as leave entitlement and payslip
                  details. This data is often scattered across various sources, making it
                  difficult to access and provide timely responses.
                </li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/discovery.jpg"
                    alt="Discovery research synthesis"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DEFINE ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Define</h2>
              <p className="cs-feature__intro">
                Narrowing the focus, crystallizing the problem.
              </p>

              <h3 className="cs-feature__deliverables-label">Activities</h3>
              <ul className="cs-feature__list">
                <li>Information architecture</li>
              </ul>

              <h3 className="cs-feature__deliverables-label">Focus area</h3>
              <ul className="cs-feature__list">
                <li>Implementation of a new design system to harmonize both visual and engineering efforts.</li>
                <li>Improvement on the hierarchy of consuming content on the home screen to put focus on user needs.</li>
                <li>Security feature in hiding balances to protect customers from prying eyes.</li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/define.jpg"
                    alt="Information architecture and definition"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DEVELOP ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Develop</h2>
              <p className="cs-feature__intro">Working on potential solutions.</p>

              {/* User flows */}
              <h3 className="cs-feature__subtitle">User flows</h3>
              <p className="cs-feature__body">
                Navigating through uncharted waters, user flows proved invaluable in visualizing
                user journeys and ideating on processes as they initiated and transitioned
                between different user groups, including employees, managers, and administrators.
                It provided a comprehensive view of the entire process, allowing us to identify
                gaps and opportunities for improvement. These insights facilitated productive
                discussions with the engineering team, particularly on the backend, enabling the
                development of APIs that significantly accelerated product delivery timelines.
              </p>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/userflow.jpg"
                    alt="User flow diagrams"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
              <div className="cs-feature__footer">
                <span aria-hidden="true" />
                <a href={USERFLOW_LINK} target="_blank" rel="noopener noreferrer" className="cs-feature__cta">
                  View user flow
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Sketches */}
              <h3 className="cs-feature__subtitle">Sketches</h3>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/sketches.jpg"
                    alt="Early sketches"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
              <div className="cs-feature__footer">
                <span aria-hidden="true" />
                <a href={SKETCHES_LINK} target="_blank" rel="noopener noreferrer" className="cs-feature__cta">
                  View sketches
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Wireframes */}
              <h3 className="cs-feature__subtitle">Wireframes</h3>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/wireframes.jpg"
                    alt="Wireframes"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
              <div className="cs-feature__footer">
                <span aria-hidden="true" />
                <a href={WIREFRAMES_LINK} target="_blank" rel="noopener noreferrer" className="cs-feature__cta">
                  View wireframes
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* High fidelity mockups */}
              <h3 className="cs-feature__subtitle">High-fidelity mockups</h3>
              <div className="cs-feature__gallery cs-feature__gallery--split-even">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/hifi-1.jpg"
                    alt="High-fidelity mockup 1"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/hifi-2.jpg"
                    alt="High-fidelity mockup 2"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              {/* Usability testing */}
              <h3 className="cs-feature__subtitle">Usability testing</h3>
              <p className="cs-feature__body">
                During the development process, a thorough usability testing approach was
                implemented. Following the completion of prototyping for each module, we conducted
                reviews with employees and staff administrators via Teams. This iterative testing
                process involved an average of 2–3 sessions with the HR team and select staff
                employees for each module before granting sign-off for implementation.
              </p>
              <p className="cs-feature__body">
                Some testing sessions led to valuable iterations, ultimately contributing to a
                more user-friendly and effective final product.
              </p>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/testing.jpg"
                    alt="Usability testing documentation"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DELIVER ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Deliver</h2>
              <p className="cs-feature__intro">
                Finalizing the solutions that work and developer handoff.
              </p>

              <h3 className="cs-feature__subtitle">Final designs</h3>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                {['final-1', 'final-2', 'final-3'].map((name, i) => (
                  <figure key={name} className="cs-feature__figure">
                    <Image
                      src={`/work/uba/${name}.jpg`}
                      alt={`Final design ${i + 1}`}
                      width={2048}
                      height={1280}
                      className="cs-feature__image"
                    />
                  </figure>
                ))}
              </div>

              <h3 className="cs-feature__subtitle">Handoff</h3>
              <ul className="cs-feature__list">
                <li>Arranged in flows</li>
                <li>Use of connectors to aid developer&apos;s comprehension</li>
                <li>Use of notes for additional context and explanation</li>
              </ul>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/uba/handoff.jpg"
                    alt="Developer handoff documentation"
                    width={2048}
                    height={1280}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== AWARD / TESTIMONIAL ===== */}
        <section className="cs-award section">
          <div className="container">
            <motion.div className="cs-award__card" {...fadeUp}>
              <span className="cs-award__eyebrow">
                Excellent Project Delivery Award ⭐⭐⭐⭐⭐
              </span>
              <blockquote className="cs-award__quote">
                &ldquo;This letter serves to commend you for your immense contribution towards the
                delivery of the HR automation platform which is currently live and in use. This is
                a sterling achievement borne out of your dedication, result-oriented approach and
                willingness to go the extra mile to ensure delivery of all envisioned and ad-hoc
                requirements of the platform. You are therefore issued a LETTER OF
                COMMENDATION.&rdquo;
              </blockquote>
              <div className="cs-award__attribution">
                <Image
                  src="/work/uba/testimonial-avatar.jpg"
                  alt="Tonye Boham"
                  width={56}
                  height={56}
                  className="cs-award__avatar"
                />
                <div className="cs-award__person">
                  <span className="cs-award__name">Tonye Boham</span>
                  <span className="cs-award__role">Head, HR Group Shared Service · UBA Group</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== NEXT CASE STUDY (subtle) ===== */}
        <section className="cs-next">
          <div className="container">
            <motion.div
              className="cs-next__row"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="cs-next__label">Next case study</span>
              <Link href="/work/sabi" className="cs-next__link">
                Sabi — Revolutionizing Supply Chain Logistics
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
