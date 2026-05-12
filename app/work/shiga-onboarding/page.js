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

const SHIGA_LINK = 'https://www.shiga.io/';

export default function ShigaOnboardingCaseStudy() {
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
                  Cutting Time to Value with a Passkey-Led Onboarding
                </h1>
                <p className="cs-hero__subtitle">
                  <a href={SHIGA_LINK} target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Shiga
                  </a>{' '}
                  is a cryptocurrency payments fintech building three connected products:
                  ENTA, a consumer wallet for sending, receiving, and converting crypto and
                  fiat; FORGE, a corporate banking platform for business accounts; and a
                  Telegram Mini-app that brings the same primitives into a chat-native
                  surface. The company is backed by Tether and is a member of the Visa
                  Accelerator program.
                </p>
                <p className="cs-hero__subtitle" style={{ marginTop: 'var(--space-sm)' }}>
                  This case study covers the individual onboarding flow. The business
                  onboarding has its own case study, since the constraints, persona, and KYC
                  weight are different.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/shiga-onboarding/cover.gif"
                  alt="ENTA brand slideshow"
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
                <span className="cs-meta__value">Product design, UX writing</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Duration</span>
                <span className="cs-meta__value">Q1 2026 · 1 week</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Industry</span>
                <span className="cs-meta__value">Fintech, Cryptocurrency, B2C</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">For</span>
                <span className="cs-meta__value">Shiga Digital</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Team</span>
                <span className="cs-meta__value cs-meta__value--stack">
                  1 × product designer<br />
                  1 × product manager<br />
                  3 × engineers
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
                  The old flow asked users to do too much before they saw the product. Sign
                  up with email and password, complete a profile, finish KYC, then land on
                  the dashboard. Users were churning inside KYC, before ever seeing send,
                  receive, or swap. The funnel review with engineering confirmed it: a
                  meaningful share of new accounts never made it past identity verification.
                  Support tickets carried the same message in plainer language, with users
                  describing fatigue and confusion before they had ever moved a dollar.
                </p>
                <p>
                  There were two problems sitting on top of each other. The authentication
                  primitive was old-fashioned for the category. Wallets like Rabby, Rainbow,
                  Phantom, and Fuse have been moving to passkeys, both for the security model
                  (no password to phish, no seed phrase to lose) and for the recovery story.
                  Shiga&apos;s email and password flow looked behind the curve to the audience
                  it was trying to win. The second problem was structural. KYC sat between the
                  user and the product, even though most of what KYC unlocks (fiat onramp,
                  offramp, currency conversion) is not what a user wants on day one.
                  Stablecoin send, receive, and swap can all run on a self-custodial profile
                  with no identity check. The flow was treating regulated and unregulated
                  features as one gate, when they are two.
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
                  I rebuilt the flow around two ideas. Sign-in becomes a passkey. KYC moves
                  out of the front door and onto the dashboard.
                </p>
                <p>
                  A new user creates a profile with their email, registers a passkey, and
                  lands on the dashboard. From there, send, receive, and swap of stablecoins
                  are immediately available. The features that need KYC (fiat onramp, offramp,
                  conversion, higher limits) are present in the dashboard but visually locked,
                  with a small affordance that explains what each one does and what completing
                  identity verification will unlock. The dashboard, not the onboarding flow,
                  carries the compliance nudge. Users meet the product first, then meet the
                  KYC requirements in the context of the specific feature they want to use.
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
                <span className="cs-metrics__value">&lt;1 min</span>
                <span className="cs-metrics__label">Crypto-only user reaches the dashboard</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">&lt;4 min</span>
                <span className="cs-metrics__label">Crypto &amp; fiat user completes KYC and reaches value</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">Clearer</span>
                <span className="cs-metrics__label">Goal-driven KYC framing, tied to the feature it unlocks</span>
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
                <li>Funnel review with engineering, sign-up to first transaction</li>
                <li>Support ticket audit for onboarding-related complaints</li>
                <li>Competitive scan of authentication and onboarding patterns in Rabby, Rainbow, Phantom, and Fuse</li>
                <li>Stakeholder interviews with product, engineering, and compliance</li>
              </ul>

              <h3 className="cs-feature__deliverables-label">Key findings</h3>
              <p className="cs-feature__body">
                The drop-off was not a UX detail problem; it was a sequencing problem. Users
                were leaving because the product was withholding value behind a compliance
                step that, for a meaningful slice of users, was not even necessary on day one.
                Crypto-native users wanted to move stablecoins. Crypto and fiat users wanted
                ramps but were willing to invest in KYC if they understood what they were
                getting. Treating both groups as the same flow made both worse. Competitive
                teardown showed the wallet category had already moved on from passwords.
                Passkeys had become the default among the wallets serious users compare Shiga
                against.
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
                <li>Persona-aware flow split: crypto-only vs crypto and fiat</li>
                <li>Authentication primitive change: passkey replaces password</li>
                <li>Feature accessibility map: what is available pre-KYC, what requires it, and what the upgrade path looks like</li>
              </ul>

              <h3 className="cs-feature__deliverables-label">Focus area</h3>
              <ul className="cs-feature__list">
                <li>A passwordless sign-up that lands the user on the dashboard within a minute</li>
                <li>A dashboard that shows the full product surface from day one, with locked states for features that require KYC</li>
                <li>KYC framed by the value it unlocks, not as an abstract compliance step</li>
                <li>A clean upgrade path so the same dashboard works before, during, and after verification</li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px' }}>
                  <ZoomableImage
                    src="/work/shiga-onboarding/user-flow.png"
                    alt="User flow diagram for passkey-led onboarding"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">User flow diagram</p>
                </div>
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

              <p className="cs-feature__body">
                I ideated end-to-end flows in Claude Design to move fast and pull stakeholder
                feedback in early, then promoted the strongest path into Figma for high
                fidelity. Working in a one-week sprint with a product manager and three
                engineers meant the design needed to be defensible by the second day, so most
                of the iteration happened on the flow shape rather than on individual screens.
              </p>
              <p className="cs-feature__body">
                The design decisions that mattered most were the locked-state pattern on the
                dashboard and the passkey enrolment moment. The locked state had to advertise
                the feature without baiting and switching the user, so each locked tile shows
                the action verb (Buy crypto, Convert, Withdraw to bank) with a short note on
                what completing KYC unlocks. The passkey enrolment had to handle device
                transfer and recovery cleanly enough that a user signing up on mobile and
                returning on web did not feel locked out of their own account.
              </p>

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/shiga-onboarding/claude-ideation-1.png"
                    alt="Claude Design ideation — first round of flow exploration"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">Claude Design ideation — round 1</p>
                </div>
              </div>

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/shiga-onboarding/claude-ideation-2.png"
                    alt="Claude Design ideation — second round of flow exploration"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">Claude Design ideation — round 2</p>
                </div>
              </div>

              {/* Interactive Prototype */}
              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>
                Interactive Prototype
              </h3>
              <p className="cs-feature__body">
                Clickable prototype from the Claude Design ideation stage. Tap through to
                feel the flow.
              </p>
              <div
                className="cs-feature__gallery cs-feature__gallery--single cs-feature__gallery--wide"
                style={{ marginTop: 'var(--space-lg)' }}
              >
                <figure className="cs-feature__figure">
                  <iframe
                    src="/work/shiga-onboarding/prototype-v2/prototype.html"
                    width="100%"
                    height="800"
                    title="ENTA clickable prototype from Claude Design ideation"
                    loading="lazy"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      background: '#0a0a14',
                    }}
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">Interactive prototype — Claude Design ideation v2</p>
                </div>
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

              <p className="cs-feature__body">
                The redesign shipped at the end of the one-week sprint. Engineering picked up
                the work via a single Figma file with linked flows for both personas, and the
                QA cycle ran in parallel with copy review.
              </p>

              {/* Sign-up and Passkey setup */}
              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide cs-feature__gallery--equal-height" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/sign-up-landing.jpg"
                    alt="Sign-up landing page"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/passkey-setup-desktop.jpg"
                    alt="Passkey setup on desktop"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
              </div>

              {/* Mac passkey and Sign in */}
              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide cs-feature__gallery--equal-height" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/passkey-setup-mac.jpg"
                    alt="Mac passkey dialog during setup"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/sign-in-passkey.jpg"
                    alt="User taps sign in with passkey"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
              </div>

              {/* Home screen states */}
              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/shiga-onboarding/home-individual.jpg"
                    alt="First-time home screen — individual user"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">First-time home screen — individual user</p>
                </div>
              </div>

              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide cs-feature__gallery--equal-height" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/home-verification-hold.jpg"
                    alt="First-time home screen — verification on hold"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/shiga-onboarding/home-tier2-unlocked.jpg"
                    alt="First-time home screen — Tier 2 unlocked"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
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
                  <strong>Time to value beats completion rate at the top of the funnel.</strong>{' '}
                  A user who sees the product in 60 seconds and verifies later is worth more
                  than a user who completes KYC and never logs in again. The right metric for
                  early onboarding is not &quot;did they finish what we asked of them,&quot;
                  it is &quot;did they reach value.&quot;
                </li>
                <li>
                  <strong>Passkey is a category signal as much as a security feature.</strong>{' '}
                  Picking the same authentication primitive as Rabby, Rainbow, Phantom, and
                  Fuse mattered for trust before the user ever touched the product. The
                  category had moved; staying on passwords was its own message.
                </li>
                <li>
                  <strong>Compliance can live in the product, not in front of it.</strong>{' '}
                  The dashboard carrying the KYC nudge, with each locked feature explaining
                  the trade, did more to drive verification than a forced flow ever did. Users
                  who chose to verify did so because they wanted the feature on the other side,
                  not because we asked them to.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ===== NEXT CASE STUDY ===== */}
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
              <Link href="/work/carbon" className="cs-next__link">
                Carbon — Revamping Home Screen Experience
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
