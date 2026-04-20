'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import ZoomableImage from '../../components/ZoomableImage';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const CARBON_LINK = 'https://www.getcarbon.co/';
const LAUNCH_VIDEO_LINK = 'https://youtu.be/62txB2xvgMY?si=Qwv2uB6Cul8MkfeJ';
const INTELPOINT_LINK = 'https://intelpoint.co/report/the-nigerian-financial-services-market/';

export default function CarbonCaseStudy() {
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
                  Revamping Home Screen Experience for a Digital Bank
                </h1>
                <p className="cs-hero__subtitle">
                  <a href={CARBON_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Carbon
                  </a>{' '}
                  is the foremost credit-led digital bank in Nigeria and is a product that
                  empowers over 4 million customers with access to credit, simple payments
                  solutions, high-yield investment opportunities and easy-to-use tools for
                  personal financial management.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/carbon/cover.gif"
                  alt="Carbon home screen redesign"
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
                <span className="cs-meta__value">Product design, User research</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Duration</span>
                <span className="cs-meta__value">Feb 2023 · 4 weeks</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Industry</span>
                <span className="cs-meta__value">Fintech, B2C</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">For</span>
                <span className="cs-meta__value">Carbon</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Team</span>
                <span className="cs-meta__value cs-meta__value--stack">
                  1 × product manager<br />
                  3 × product designers<br />
                  6 × engineers<br />
                  1 × product marketer<br />
                  1 × QA engineer
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
                  The app&apos;s homescreen presented a significant challenge with its cluttered
                  interface, impeding user navigation and the use of the core essential
                  feature — the loan product. Notably, data analysis identified the loan product
                  as the most critical customer need, essentially representing the company&apos;s
                  foundation.
                </p>
                <p>
                  Additionally, a considerable disparity in user experience persisted between the
                  Android and iOS versions of the app, effectively treating them as separate
                  applications. This inconsistency forced users to grapple with a learning curve
                  when transitioning between different mobile devices.
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
                  The redesigned homescreen presents a harmonized, design-system-enhanced,
                  clutter-free interface, greatly improving user navigation and the accessibility
                  of essential features. To get a closer look at these changes, you can{' '}
                  <a href={LAUNCH_VIDEO_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    watch the feature launch video
                  </a>.
                </p>
                <p>
                  The combined impact of these enhancements was nothing short of impressive.
                  Customer satisfaction with the product soared by a remarkable 81%. This boost
                  had a cascading effect, driving organic referrals and resulting in a 25%
                  increase in user registrations. Furthermore, it reactivated 10% of dormant
                  accounts during the release month.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== METRICS ===== */}
        <section className="cs-metrics-section section">
          <div className="container">
            <motion.div className="cs-metrics" {...fadeUp}>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">81%</span>
                <span className="cs-metrics__label">Surge in customer satisfaction</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">25%</span>
                <span className="cs-metrics__label">Increase in user registrations</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">10%</span>
                <span className="cs-metrics__label">Reactivation of dormant accounts</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SOLUTION IMAGES GALLERY ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/solution-1.jpg"
                    alt="Carbon redesigned home screen"
                    width={1200}
                    height={1305}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/solution-2.jpg"
                    alt="Carbon redesigned home screen detail"
                    width={1200}
                    height={1305}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/solution-3.gif"
                    alt="Carbon home screen interaction"
                    width={2048}
                    height={1086}
                    unoptimized
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/solution-4.jpg"
                    alt="Carbon final mockup"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
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
                Insight into the problem, researching customers and understanding their needs.
              </p>

              <h3 className="cs-feature__deliverables-label">Activities</h3>
              <ul className="cs-feature__list">
                <li>Competitive analysis</li>
                <li>Literature review</li>
                <li>User interviews</li>
              </ul>

              <h3 className="cs-feature__deliverables-label">Key findings</h3>
              <p className="cs-feature__body">
                Support tickets and store reviews revealed concerns and queries from customers
                questioning whether Carbon had two different applications. Further investigation
                pointed to the cause: a disparity in the interfaces between Android and iOS.
                Based on the{' '}
                <a href={INTELPOINT_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                  Nigerian Financial Services Market survey
                </a>{' '}
                carried out by Intelpoint, security and safety of funds are the top factors
                people consider when choosing a banking or financial institution.
              </p>
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
            </motion.div>
          </div>
        </section>

        {/* ===== DEVELOP ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Develop</h2>
              <p className="cs-feature__intro">Working on potential solutions.</p>

              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/develop-main.jpg"
                    alt="Carbon design exploration"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/develop-1.jpg"
                    alt="Carbon design iteration"
                    width={1200}
                    height={1305}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/develop-2.jpg"
                    alt="Carbon design iteration"
                    width={1200}
                    height={1305}
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

              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/deliver-1.jpg"
                    alt="Carbon final design 1"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/carbon/deliver-2.jpg"
                    alt="Carbon final design 2"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== TESTIMONIAL ===== */}
        <section className="cs-award section">
          <div className="container">
            <motion.div className="cs-award__card" {...fadeUp}>
              <blockquote className="cs-award__quote">
                &ldquo;I&apos;m really proud of what the @get_carbon team are delivering and this
                new design change of the Carbon app is just one of the many new changes that are
                coming. Our mission is not just to change the way you bank, but change your life
                by banking with us!&rdquo;
              </blockquote>
              <div className="cs-award__attribution">
                <Image
                  src="/work/carbon/testimonial-avatar.png"
                  alt="Chijioke Dozie"
                  width={56}
                  height={56}
                  className="cs-award__avatar"
                />
                <div className="cs-award__person">
                  <span className="cs-award__name">Chijioke Dozie</span>
                  <span className="cs-award__role">CEO · Carbon</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LEARNINGS ===== */}
        <section className="cs-learnings section">
          <div className="container">
            <motion.div className="cs-learnings__inner" {...fadeUp}>
              <h2 className="cs-learnings__title">Learnings</h2>
              <p className="cs-learnings__intro">
                Takeaways that underscore a growth process for me.
              </p>
              <ul className="cs-learnings__list">
                <li>
                  <strong>Simplicity in design:</strong> Hear what a sample of your customers
                  think before a public release. Engaging directly with users early on helps
                  refine the product before it reaches the broader audience — ensuring the design
                  is both functional and user-friendly.
                </li>
                <li>
                  <strong>Building customer trust is a hack to growth:</strong> A significant
                  growth lever is enhancing customer trust. By creating a reliable and secure
                  user experience, it became easier for our customers to recommend Carbon to
                  others, naturally expanding our user base.
                </li>
                <li>
                  <strong>The impact of a clean UI:</strong> There&apos;s a tangible benefit to
                  designing a sleek, clutter-free interface — what&apos;s known as the aesthetic
                  usability effect. This not only made the app more appealing but also reinforced
                  trust, and trust brought growth.
                </li>
              </ul>
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
