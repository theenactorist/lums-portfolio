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

export default function BranchAICaseStudy() {
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
                  Three AIs, One Design System
                </h1>
                <p className="cs-hero__subtitle">
                  How I engineered three AI-powered tools that transformed how{' '}
                  <a href="https://branch.co" target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Branch International
                  </a>&apos;s
                  product team creates illustrations, writes copy, and prototypes
                  - scaling creative output across India, Kenya, and Nigeria.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/branch-ai/cover.jpg"
                  alt="Branch AI Initiatives - three converging AI tools"
                  width={2400}
                  height={1200}
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
                <span className="cs-meta__value">AI UX Designer</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Duration</span>
                <span className="cs-meta__value">Oct 2024 - Mar 2026</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Industry</span>
                <span className="cs-meta__value">Fintech, AI Tools</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">For</span>
                <span className="cs-meta__value">Branch International</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Team</span>
                <span className="cs-meta__value cs-meta__value--stack">
                  5 × product designers<br />
                  ~25 × product managers &amp; UX researchers
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== THE OPPORTUNITY ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>The Opportunity</span></div>
              <div className="cs-prose__content">
                <p>
                  Branch International operates across three markets - India, Kenya, and Nigeria. The organisation features
                  a product team of around 25 product managers and UX researchers working across distinct domains:
                  Lending (Africa, India), Payments (Africa, India), KYC (Africa, India), Growth, Marketing, and Risk, Loan Operations
                  and Customer Support. This massive operation was supported by a 5-person design team distributed globally.
                  The team was spending significant hours on repetitive creative tasks: manually sourcing and editing stock illustrations
                  to match brand guidelines, writing and rewriting microcopy across three market variants,
                  and building prototypes from scratch for every initiative.
                </p>
                <p>
                  I identified three high-impact opportunities where AI could serve as a force
                  multiplier - not replacing designers, but giving them exoskeletons that amplified
                  their output while enforcing brand consistency automatically.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== OVERVIEW - THREE INITIATIVES ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/overview.jpg"
                    alt="Three AI initiatives overview - Illustration GPT, Copywriting AI, Prototyping AI"
                    width={2400}
                    height={800}
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
            The Three Initiatives
          </motion.div>
        </section>

        {/* ============================================================
            INITIATIVE 1 - ILLUSTRATION GPT
            ============================================================ */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 01 - Illustration GPT</h2>
              <p className="cs-feature__intro">
                Brand-consistent visual generation at scale.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                The design team relied on generic stock illustrations that never matched
                Branch&apos;s visual identity. Every illustration required manual editing -
                colour correction, background removal, style consistency checks. Across three
                markets producing marketing materials weekly, this created a significant
                bottleneck. Generating a consistent illustration style using Gen AI is
                deceptively hard - it&apos;s subjective, it&apos;s iterative, the feedback
                never stops, and the models literally hallucinate.
              </p>

              <h3 className="cs-feature__deliverables-label">Design Thinking</h3>
              <p className="cs-feature__body">
                I approached this as a design systems problem, not a prompt engineering problem.
                Instead of writing clever one-off prompts, I engineered a structured instruction
                architecture with three interlocking JSON files:
              </p>
              <ul className="cs-feature__list">
                <li>
                  <strong>manifest.json</strong> - Governs the GPT&apos;s behaviour: defaults,
                  pipeline steps, quality gates, naming conventions, and automatic re-render
                  logic.
                </li>
                <li>
                  <strong>rules.json</strong> - The brand&apos;s visual DNA: camera angles
                  (45° isometric), lighting (soft top-left studio), shape language (rounded
                  rectangles, clean edges), and a strict 60/25/10/5 colour system -
                  Grey (#D9D9D9, 60%), Blue (#187BC2, 25%), Navy (#19355E, 10%),
                  Contextual (5%).
                </li>
                <li>
                  <strong>materials.json</strong> - A material library defining how every
                  surface should render: polished steel gets mirror highlights, glass gets
                  Fresnel edges, rubber stays matte. No toy plastic, no clay renders.
                </li>
              </ul>
              <p className="cs-feature__body">
                The system evolved through 6 major versions (v1.0 → v1.6), each iteration
                tightening constraints based on output analysis. Over 500 iterations were
                executed to deliver a set of 30 illustrations for India, which then scaled to
                African markets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Illustration GPT - Architecture Diagram */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h3 className="cs-feature__deliverables-label">System Architecture</h3>
              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/illust-arch.jpg"
                    alt="Illustration GPT system architecture - manifest, rules, and materials flowing into GPT engine"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <h3 className="cs-feature__deliverables-label">Solution</h3>
              <p className="cs-feature__body">
                The final system (v1.6) is a ChatGPT Custom GPT that takes an uploaded device
                photo or text brief, segments the image into functional parts (screen, body,
                buttons, etc.), auto-assigns materials from the brand palette, and generates
                4096×4096 transparent PNGs with soft ground shadows. A pre-delivery validation
                gate checks colour ratios before output - ensuring the 60/25/10/5 split is
                maintained within ±10% tolerance.
              </p>
              <p className="cs-feature__body">
                An &quot;Idea Scout&quot; mode proposes 8-10 illustration concepts when no
                image is provided, spanning product hardware vignettes, UI-on-device scenes,
                payment moments, and abstract brand objects. The illustrations are ready for
                handoff and scheduled for implementation in Q2 2026.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Illustration GPT - Sample Outputs */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/illust-before.jpg"
                    alt="Before and after - stock illustration vs. Illustration GPT output"
                    width={2400}
                    height={1200}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/illust-grid.jpg"
                    alt="Grid of Illustration GPT sample outputs"
                    width={2400}
                    height={1600}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            INITIATIVE 2 - COPYWRITING AI
            ============================================================ */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 02 - Copywriting AI</h2>
              <p className="cs-feature__intro">
                Production-ready microcopy across 3 markets.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                Branch operates in India, Kenya, and Nigeria - each with distinct regulatory
                requirements, currency formats, and terminology conventions.
                &quot;Savings&quot; in Kenya becomes &quot;investments&quot; in Nigeria.
                &quot;Phone number&quot; in Africa becomes &quot;Mobile number&quot; in India.
                A single toast message might need three different versions. Designers and PMs
                were spending significant time manually checking compliance and rewriting
                copy per market.
              </p>

              <h3 className="cs-feature__deliverables-label">Design Thinking</h3>
              <p className="cs-feature__body">
                I decomposed the copywriting challenge into structured rule sets, each encoded
                as a versioned JSON that the AI could reason against:
              </p>
              <ul className="cs-feature__list">
                <li>
                  <strong>brand.json</strong> - Voice principles: concise, conversational,
                  empathetic, mobile-native.
                </li>
                <li>
                  <strong>components.json</strong> - Per-component rules: character limits,
                  casing conventions (Title Case for buttons, Sentence case for banners),
                  punctuation rules (no exclamation marks in toasts).
                </li>
                <li>
                  <strong>markets.json</strong> - Market-specific terminology, currency
                  formatting (₹ lakh system vs ₦ standard), and compliance requirements.
                </li>
                <li>
                  <strong>heuristics.json</strong> - Fallback logic for ambiguous component
                  identification and material-to-Branch term normalisation.
                </li>
                <li>
                  <strong>lint-rules.json</strong> - Quality gates that catch common mistakes
                  automatically: &quot;Send OTP&quot; → &quot;Get OTP&quot;, removing
                  leading zeros, fixing casing violations.
                </li>
              </ul>
              <p className="cs-feature__body">
                The system evolved from Claude Projects (v1-v7 as structured JSONs) to
                Claude Skills - a pivotal transition. Projects locked the AI to a single
                workspace and user. Skills made the same intelligence available across the
                entire product team - more people, more chats, more adoption. The AI-written
                copy is already live in India and being written for African markets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Copywriting AI - Modes & Markets */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h3 className="cs-feature__deliverables-label">Solution - Three Operating Modes</h3>
              <ul className="cs-feature__list">
                <li>
                  <strong>Write</strong> - Generates 5 production-ready copy options from a brief.
                  Anti-hallucination safeguards ensure the AI never copies examples verbatim - it
                  learns patterns, not words.
                </li>
                <li>
                  <strong>Rewrite</strong> - Takes existing copy and aligns it to brand voice +
                  market rules. A positive-framing filter automatically rewrites negations
                  (&quot;Don&apos;t forget to verify&quot; → &quot;Remember to verify&quot;).
                </li>
                <li>
                  <strong>Audit</strong> - Validates pasted copy against all rules and flags
                  violations, suggesting the exact fix for each issue.
                </li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/copy-modes.jpg"
                    alt="Copywriting AI three modes - Write, Rewrite, Audit"
                    width={2400}
                    height={1200}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/copy-markets.jpg"
                    alt="Copywriting AI market switching - India, Kenya, Nigeria"
                    width={2400}
                    height={800}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <p className="cs-feature__body">
                The system was pushed from &quot;works well - 95% accurate&quot; to
                &quot;works perfectly - 99% accurate.&quot; That last 4% - the hardest
                to close - is where the real craft lives.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            INITIATIVE 3 - PROTOTYPING AI
            ============================================================ */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 03 - Neem DS Prototyper</h2>
              <p className="cs-feature__intro">
                From PRD to prototype in under 2 minutes.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                Branch&apos;s Neem Design System contained 30+ components with strict
                token-based styling - all values via <code>--neem-</code> CSS custom
                properties. Building a single prototype screen took significant effort.
                But the real bottleneck wasn&apos;t design handoff - it was communication.
                Product managers needed to rapidly communicate initiatives to stakeholders in
                customer support, risk management, and loan collections. The real win for the
                Prototyping AI was that prototyping using Claude came <em>first</em> to help product
                managers get alignment and valuable feedback from stakeholders, allowing them to iterate
                the PRD to its final version. Only thereafter does it go to the designer to design
                the high-fidelity screens and hand off to engineering and QA.
              </p>

              <h3 className="cs-feature__deliverables-label">Design Thinking</h3>
              <p className="cs-feature__body">
                I connected Claude directly to Branch&apos;s Figma design system via the
                Figma MCP (Model Context Protocol), then authored a comprehensive Claude
                Skill that:
              </p>
              <ul className="cs-feature__list">
                <li>
                  Maps every Figma node to its Neem component equivalent using a lookup table
                  of 30+ components.
                </li>
                <li>
                  Loads component resources lazily - only what&apos;s needed per screen - to
                  stay under a 2-minute build target.
                </li>
                <li>
                  Follows a strict 5-step workflow: Parse Input → Fetch from Figma MCP →
                  Identify Components → Implement in React + CSS → Validate against
                  screenshot.
                </li>
                <li>
                  Enforces absolute rules: no Tailwind, no third-party libraries, no
                  hardcoded values, mobile-first (375px viewport).
                </li>
              </ul>
              <p className="cs-feature__body">
                The skill includes 62 pre-built component files (JSX + CSS), screen
                composition rules for all 6 Branch app screen types, and a complete Lucide
                icon mapping table.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Prototyping AI - Pipeline & Before/After */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h3 className="cs-feature__deliverables-label">Solution</h3>
              <p className="cs-feature__body">
                A Claude Skill that transforms a Figma URL or text description into a
                pixel-perfect, token-compliant React prototype. It takes a Figma screenshot
                via MCP, reads design context and variable definitions, matches UI elements
                to Neem components, and generates complete React + plain CSS code using
                only <code>--neem-</code> design tokens.
              </p>
              <p className="cs-feature__body">
                A PRD-to-prototype workflow that would&apos;ve taken three weeks now takes
                three days to hand off. Thrown as a vague problem, it returns a precise
                solution.
              </p>

              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide">
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/proto-pipeline.jpg"
                    alt="Prototyping AI pipeline - Figma to Claude MCP to validated React prototype"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/proto-compare.jpg"
                    alt="Before and after - Figma design to generated React prototype"
                    width={2400}
                    height={1200}
                    className="cs-feature__image"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== KUDOS / RECOGNITION ===== */}
        <section className="cs-award section">
          <div className="container">
            <motion.div className="cs-award__card" {...fadeUp}>
              <span className="cs-award__eyebrow">#kudos</span>
              <blockquote className="cs-award__quote">
                &ldquo;Lums is not a pixel pusher. He is an AI-native builder with a
                designer&apos;s eye and a PM&apos;s brain - and that combination is exactly
                what product teams need to stay relevant in 2026. Beyond the work - he is
                a generous collaborator, a fun teammate, and someone who makes the people
                around him better. It is a pleasure to have you on the team. Cheers, buddy.
                You have re-defined &lsquo;That&apos;s so cool!&rsquo;&rdquo;
              </blockquote>
              <div className="cs-award__attribution">
                <Image
                  src="/work/branch-ai/deovrat-avatar.jpg"
                  alt="Deovrat Dwivedi"
                  width={56}
                  height={56}
                  className="cs-award__avatar"
                />
                <div className="cs-award__person">
                  <span className="cs-award__name">Deovrat Dwivedi</span>
                  <span className="cs-award__role">Design Lead · Branch International</span>
                </div>
              </div>

              <div className="cs-award__screenshot" style={{ marginTop: '3rem', borderRadius: '8px', overflow: 'hidden' }}>
                <ZoomableImage
                  src="/work/branch-ai/kudos.jpeg"
                  alt="Deovrat Dwivedi's full kudos message on Slack for the AI initiatives"
                  width={1200}
                  height={1000}
                  className="cs-feature__image"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DETAILED KUDOS PER INITIATIVE ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>What Deo Said</span></div>
              <div className="cs-prose__content">
                <p>
                  <strong>On Illustration GPT:</strong> &ldquo;A masterclass in patience and
                  precision. He ran 500+ iterations to deliver a set of 30 illustrations for
                  India, then scaled the same system to Africa markets. Not once did he treat
                  the iterations and rework as a setback. He treated it as the job.&rdquo;
                </p>
                <p>
                  <strong>On Copywriting Skill:</strong> &ldquo;Started as an idea for a
                  custom GPT and evolved into a Claude skill now usable across the product
                  team and markets. He pushed it from &lsquo;works well - 95% accurate&rsquo;
                  to &lsquo;works perfectly - 99% accurate.&rsquo; That last 4% - the hardest
                  to close - is exactly where he shines.&rdquo;
                </p>
                <p>
                  <strong>On Neem DS Prototyper:</strong> &ldquo;Might be his sharpest yet.
                  A PRD to prototype that would&apos;ve taken three weeks now takes three days
                  to hand off. Thrown to him as a vague problem. Returned as a precise
                  solution. Yet again!&rdquo;
                </p>
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
                Five takeaways from building AI tools for creative teams.
              </p>
              <ul className="cs-learnings__list">
                <li>
                  <strong>From Projects to Skills - democratising access:</strong> The shift
                  from Claude Projects to Claude Skills was transformative. Projects locked the
                  AI to a single workspace and user. Skills made the same intelligence
                  available across the entire team - more people, more chats, more adoption.
                  Distribution matters as much as capability.
                </li>
                <li>
                  <strong>Each LLM is a specialist, not a generalist:</strong> ChatGPT excels
                  at image generation - particularly transparent alpha PNGs with
                  material-accurate rendering. Claude dominates the design-engineering
                  handshake - structured outputs, connectors, and Canvas collaboration.
                  Gemini leads in multimodal comprehension - reading and writing across sound,
                  video, images, and text simultaneously. The best results come from
                  orchestrating across models, not picking one.
                </li>
                <li>
                  <strong>AI output quality is a function of input quality:</strong> These
                  tools are exoskeletons for a SEAL agent - tremendous amplifiers of human
                  intent. But garbage in, garbage out still applies. The cleaner and more
                  structured the input, the better the processing. AI can even be used to
                  clean and organise data <em>before</em> the primary generation step - a
                  meta-loop that compounds quality.
                </li>
                <li>
                  <strong>Plan before executing - the lighthouse principle:</strong> Every
                  successful implementation started with an architectural drawing - a clear
                  plan that served as the lighthouse agents and sub-agents kept crawling back
                  to. Without it, iterations multiply and quality degrades. With it, every
                  version answers the question: &ldquo;Have we reached the goal?&rdquo;
                </li>
                <li>
                  <strong>Embrace empathy in abstract feedback:</strong> Receiving feedback on
                  an abstract undertaking like AI illustration required me to lean into
                  empathy as a designer. Feedback was often subjective - everyone had a
                  personal preference, especially on the visual outputs. The way I solved
                  this was finding a line of best fit across all feedback. If something was
                  confirmed by more than one reviewer, it made its way to my iteration
                  checklist. Individual taste is valid; converging taste is signal.
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
                Carbon - Revamping Home Screen Experience
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
