'use client';

import Link from 'next/link';
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
                  How I designed three AI-powered workflows that helped{' '}
                  <a href="https://branch.co" target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Branch International
                  </a>&apos;s product team create brand-consistent illustrations,
                  market-ready copy, and faster prototypes across India, Kenya, and Nigeria.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/branch-ai/workflows-overview.jpg"
                  alt="Three AI workflows connecting team bottlenecks to product outcomes"
                  width={1672}
                  height={941}
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
                <span className="cs-meta__value">Oct 2025 - Feb 2026</span>
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
                <span className="cs-meta__label">Markets</span>
                <span className="cs-meta__value">India, Kenya, Nigeria</span>
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

        {/* ===== SUMMARY ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Summary</span></div>
              <div className="cs-prose__content">
                <p>
                  Branch&apos;s product team operated across multiple markets, product lines,
                  and regulatory contexts. A 5-person design team supported a much larger
                  group of product managers and UX researchers across lending, payments, KYC,
                  growth, marketing, risk, loan operations, and customer support.
                </p>
                <p>
                  I noticed the same pattern repeating across the team: designers and PMs were
                  spending valuable time on work that was important but repetitive - adapting
                  illustrations to brand rules, rewriting copy for different markets, and
                  creating early prototypes to explain product ideas.
                </p>
                <p>
                  I turned those bottlenecks into three AI-powered workflows: Illustration GPT
                  for brand-consistent visuals, Copywriting AI for market-ready product copy,
                  and Neem DS Prototyper for rapid design-system prototypes.
                </p>
                <p>
                  The result was not AI for novelty. It was AI constrained by Branch&apos;s
                  design system, product rules, market context, quality gates, and human
                  review loops.
                </p>
              </div>
            </motion.div>

            <motion.div className="cs-impact-grid" {...fadeUp}>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">Illustration</span>
                <strong>500+ iterations</strong>
                <p>30 India illustrations produced, with a system designed to scale to African markets.</p>
              </div>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">Copy</span>
                <strong>95% to 99%</strong>
                <p>Review-pass accuracy improved through audits against component, tone, and market rules.</p>
              </div>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">Prototyping</span>
                <strong>3 weeks to 3 days</strong>
                <p>PRD-to-prototype workflow compressed so teams could align earlier.</p>
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
                  Branch International operates across India, Kenya, and Nigeria. The product
                  team works across several domains, including lending, payments, KYC, growth,
                  marketing, risk, loan operations, and customer support.
                </p>
                <p>
                  A small design team was supporting around 25 PMs and UX researchers. That
                  meant designers were often pulled into repeated production-heavy tasks:
                  editing stock illustrations to match Branch&apos;s brand, rewriting product
                  copy across three market variants, and creating prototypes from scratch to
                  help PMs communicate product ideas.
                </p>
                <p>
                  These tasks were valuable, but they created avoidable drag. They slowed
                  exploration, increased inconsistency, and made it harder for the design
                  team to support the wider product organisation.
                </p>
              </div>
            </motion.div>

            <motion.div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-2xl)' }} {...fadeUp}>
              <figure className="cs-feature__figure">
                <ZoomableImage
                  src="/work/branch-ai/before-after.jpg"
                  alt="Before and after comparison of Branch AI workflows"
                  width={1672}
                  height={941}
                  className="cs-feature__image"
                />
              </figure>
            </motion.div>
          </div>
        </section>

        {/* ===== MY ROLE ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>My Role</span></div>
              <div className="cs-prose__content">
                <p>
                  I led the design and development of the AI workflow logic behind the three
                  initiatives. My role was to define where AI could help without removing
                  human judgment, then turn that into repeatable systems the team could use.
                </p>
                <ul>
                  <li>Identified repeated workflow bottlenecks across illustration, copy, and prototyping.</li>
                  <li>Designed the input, output, and review flow for each AI workflow.</li>
                  <li>Created structured rules, prompts, JSON systems, and quality gates.</li>
                  <li>Tested and refined outputs through repeated feedback cycles.</li>
                  <li>Translated subjective stakeholder feedback into system constraints.</li>
                  <li>Positioned AI as a collaborator inside Branch&apos;s design system, not a replacement for designers.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DESIGN PRINCIPLE ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Design Principle</span></div>
              <div className="cs-prose__content">
                <h2>AI Assists, Humans Decide</h2>
                <p>
                  The key principle across all three workflows was simple: AI could generate,
                  audit, and accelerate work, but final judgment stayed with designers and PMs.
                </p>
                <p>
                  I designed the tools with visible review points so outputs could be rejected,
                  revised, regenerated, or approved. The goal was not hidden automation. The
                  goal was faster work with clearer human control.
                </p>
                <p>
                  Each workflow solved a different problem, but they shared one operating
                  model: AI should work inside Branch&apos;s design system, product rules, market
                  constraints, and quality standards.
                </p>
              </div>
            </motion.div>

            <motion.div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-2xl)' }} {...fadeUp}>
              <figure className="cs-feature__figure">
                <ZoomableImage
                  src="/work/branch-ai/human-oversight.jpg"
                  alt="Human oversight loop for Branch AI workflows"
                  width={1672}
                  height={941}
                  className="cs-feature__image"
                />
              </figure>
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

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Problem</h3>
              <p className="cs-feature__body">
                Branch&apos;s design team relied on stock illustrations that rarely matched
                the brand&apos;s visual identity out of the box. Every illustration required
                manual work: colour correction, background removal, style alignment, lighting
                adjustments, brand consistency checks, and rework after stakeholder feedback.
                Across India, Kenya, and Nigeria, this became a recurring bottleneck.
              </p>
              <p className="cs-feature__body">
                Generative AI seemed useful, but it introduced a different problem: outputs
                were often inconsistent. A single prompt could produce attractive results, but
                not a repeatable illustration system. The challenge was not simply to generate
                illustrations. The challenge was to make AI generate illustrations that behaved
                like Branch&apos;s visual system.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Design Thinking</h3>
              <p className="cs-feature__body">
                I approached this as a design-system challenge, not a prompt-writing challenge.
                The key design decision was to stop treating AI output as one-off generation.
                I treated it like a design system: rules, materials, quality gates, and
                repeatable workflows.
              </p>
              <p className="cs-feature__body">
                Instead of writing clever one-off prompts, I structured the Illustration GPT
                around three interlocking instruction layers:
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
              
              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/illust-arch-v2.png"
                    alt="Illustration GPT system architecture - manifest, rules, and materials flowing into GPT engine"
                    width={2048}
                    height={1086}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">Illustration AI Architecture</p>
                </div>
              </div>

              <p className="cs-feature__body">
                The system evolved through 6 major versions (v1.0 to v1.6), each iteration
                tightening constraints based on output analysis. Over 500 iterations were
                executed to deliver a set of 30 illustrations for India, which then scaled to
                African markets.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Iterations and Ideation</h3>
              <p className="cs-feature__body">
                The most demanding part of this project was not the engineering — it was the
                feedback cycle. I ran multiple ideation rounds and presented batches of
                illustration concepts directly to the product team, design lead, and
                cross-functional stakeholders. Each round surfaced new subjective preferences:
                someone wanted warmer tones, another preferred cooler shadows, others pushed for
                more contextual scenes over pure product renders.
              </p>
              <p className="cs-feature__body">
                Rather than chasing individual opinions, I used each round of feedback as a
                signal-gathering exercise. If a critique was raised by more than one reviewer,
                it earned a spot on my iteration checklist. If it was isolated to a single
                preference, I filed it as context but held the line on the system rules. This
                discipline is what kept the 500+ iterations from becoming noise — every cycle
                had a clear question it was answering.
              </p>
              <p className="cs-feature__body">
                The output below represents one such ideation round: multiple style directions
                explored in parallel, each anchored to the same brand rules but probing
                different aesthetic interpretations — lighting intensity, shadow density, surface
                finish, and background treatment. Presenting these side-by-side gave the product
                team a concrete vocabulary for feedback, and gave me a faster path to convergence.
              </p>
              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/illust-iteration.jpg"
                    alt="Multiple illustration ideation directions presented to the Branch product team"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">Illustration style ideation round presented to stakeholders.</p>
                </div>
              </div>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Solution</h3>
              <p className="cs-feature__body">
                The final system (v1.6) is a ChatGPT Custom GPT that takes an uploaded device
                photo or text brief, segments the image into functional parts (screen, body,
                buttons, etc.), auto-assigns materials from the brand palette, and generates
                4096x4096 transparent PNGs with soft ground shadows. A pre-delivery validation
                gate checks colour ratios before output - ensuring the 60/25/10/5 split is
                maintained within ±10% tolerance.
              </p>
              <p className="cs-feature__body">
                In day-to-day use, a designer could upload a device photo or product object.
                The GPT would segment the object, assign materials, apply Branch visual rules,
                and return a transparent PNG for review. The designer could then reject, edit,
                regenerate, or approve the output.
              </p>
              <p className="cs-feature__body">
                An &quot;Idea Scout&quot; mode proposes 8-10 illustration concepts when no
                image is provided, spanning product hardware vignettes, UI-on-device scenes,
                payment moments, and abstract brand objects. The illustrations are ready for
                handoff and scheduled for implementation in Q2 2026.
              </p>

              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide cs-feature__gallery--equal-height">
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/branch-ai/illust-solution-1.jpg"
                    alt="Illustration GPT solution output 1"
                    width={2400}
                    height={1200}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/branch-ai/illust-solution-2.jpg"
                    alt="Illustration GPT solution output 2"
                    width={2400}
                    height={1600}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <div className="cs-feature__footer" style={{ gridColumn: '1 / -1' }}>
                  <p className="cs-feature__caption">Illustration Outputs</p>
                </div>
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

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Problem</h3>
              <p className="cs-feature__body">
                Branch operates in India, Kenya, and Nigeria - each with distinct regulatory
                requirements, currency formats, and terminology conventions.
                &quot;Savings&quot; in Kenya becomes &quot;investments&quot; in Nigeria.
                &quot;Phone number&quot; in Africa becomes &quot;Mobile number&quot; in India.
                A single toast message might need three different versions. Designers and PMs
                were spending significant time manually checking compliance and rewriting
                copy per market.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Design Thinking</h3>
              <p className="cs-feature__body">
                I decomposed the copywriting challenge into structured rule sets. The AI was
                not designed to &quot;write nice copy.&quot; It was designed to write,
                rewrite, and audit copy against Branch&apos;s product language, component rules,
                and market-specific constraints.
              </p>
              <p className="cs-feature__body">
                The system used versioned JSONs that the AI could reason against:
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
              
              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/designthinking-copywriting.png"
                    alt="AI Architecture for Copywriting"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">AI Architecture</p>
                </div>
              </div>

              <p className="cs-feature__body">
                The system evolved from Claude Projects (v1-v7 as structured JSONs) to
                Claude Skills - a pivotal transition. Projects locked the AI to a single
                workspace and user. Skills made the same intelligence available across the
                entire product team - more people, more chats, more adoption. The AI-written
                copy is already live in India and being written for African markets.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Solution - Three Operating Modes</h3>
              <p className="cs-feature__body">
                A PM or designer could paste rough copy, select a market and component type,
                then receive production-ready options or an audit report showing what needed
                to change. This separated generation from validation: the AI did not only
                create copy, it helped check copy quality.
              </p>
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

              <div className="cs-example-card">
                <span className="cs-example-card__label">Rewrite example</span>
                <p><strong>Input:</strong> Don&apos;t forget to verify your mobile number!</p>
                <p><strong>AI check:</strong> tone, punctuation, framing, and component fit.</p>
                <p><strong>Suggested rewrite:</strong> Verify your mobile number to continue.</p>
              </div>

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/copy-impact.jpg"
                    alt="Branch Copy AI Impact"
                    width={2400}
                    height={1200}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <p className="cs-feature__body" style={{ marginTop: 'var(--space-md)' }}>
                Through repeated audits against component copy rules, market terminology,
                casing, punctuation, compliance language, and reviewer acceptance, the system
                moved from roughly 95% rule compliance to 99% review-pass accuracy. Copy is
                already live in India and being adapted for African markets.
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
                From PRD to prototype in days.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Problem</h3>
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

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/prd-to-prototype.jpg"
                    alt="PRD to prototype workflow reduced from weeks to days"
                    width={1672}
                    height={941}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Design Thinking</h3>
              <p className="cs-feature__body">
                The goal was not to replace the designer&apos;s final work. The goal was to
                create a faster alignment tool so PMs could communicate ideas earlier, gather
                stakeholder feedback sooner, and refine the PRD before a designer invested
                time in high-fidelity design.
              </p>
              <p className="cs-feature__body">
                The prototyper worked by mapping product requirements to existing Neem Design
                System components instead of creating UI from scratch. I connected Claude
                directly to Branch&apos;s Figma design system via the
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
              
              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/prototyping-ai-architecture.jpg"
                    alt="Prototyping AI Architecture"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
                <div className="cs-feature__footer">
                  <p className="cs-feature__caption">AI Architecture</p>
                </div>
              </div>

              <p className="cs-feature__body">
                The skill includes 62 pre-built component files (JSX + CSS), screen
                composition rules for all 6 Branch app screen types, and a complete Lucide
                icon mapping table.
              </p>

              <h3 className="cs-feature__deliverables-label" style={{ marginTop: 'var(--space-xl)' }}>Solution</h3>
              <p className="cs-feature__body">
                A Claude Skill that transforms a Figma URL or text description into a
                pixel-perfect, token-compliant React prototype. It takes a Figma screenshot
                via MCP, reads design context and variable definitions, matches UI elements
                to Neem components, and generates complete React + plain CSS code using
                only <code>--neem-</code> design tokens.
              </p>
              <p className="cs-feature__body">
                In day-to-day use, a PM could share a PRD or product idea. The AI generated
                an early prototype using Neem Design System components, giving stakeholders
                something concrete to react to before high-fidelity design began.
              </p>
              <p className="cs-feature__body">
                A PRD-to-prototype workflow that could take around three weeks now takes
                around three days to hand off. The more important impact was not just speed.
                It changed when feedback could happen, making design work more focused and
                reducing the chance of late-stage rework.
              </p>

              <div className="cs-feature__gallery cs-feature__gallery--single" style={{ marginTop: 'var(--space-lg)' }}>
                <figure className="cs-feature__figure">
                  <ZoomableImage
                    src="/work/branch-ai/main-outputs-generated.jpg"
                    alt="Main outputs generated by Prototyping AI"
                    width={2400}
                    height={1400}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <div className="cs-status-card">
                <span className="cs-status-card__label">Status</span>
                <p>Built and validated for the PRD-to-prototype workflow.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== CROSS-INITIATIVE OUTCOMES ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>What Changed</span></div>
              <div className="cs-prose__content">
                <h2>Cross-Initiative Outcomes</h2>
                <p>
                  Across the three workflows, the project helped Branch move from repeated
                  manual production work to a more scalable operating model for design and
                  product collaboration.
                </p>
              </div>
            </motion.div>

            <motion.div className="cs-comparison-table" {...fadeUp}>
              <div className="cs-comparison-table__header">
                <span>Area</span>
                <span>Before</span>
                <span>After</span>
              </div>
              <div className="cs-comparison-table__row">
                <span>Illustration</span>
                <span>Manual stock illustration edits</span>
                <span>Brand-consistent AI illustration system</span>
              </div>
              <div className="cs-comparison-table__row">
                <span>Copy</span>
                <span>Manual rewrites across markets</span>
                <span>Market-aware copy assistant</span>
              </div>
              <div className="cs-comparison-table__row">
                <span>Prototyping</span>
                <span>Slow PRD-to-prototype cycles</span>
                <span>Faster design-system-based prototypes</span>
              </div>
              <div className="cs-comparison-table__row">
                <span>Review</span>
                <span>Subjective feedback loops</span>
                <span>Structured review rules and quality gates</span>
              </div>
              <div className="cs-comparison-table__row">
                <span>Control</span>
                <span>Manual production work</span>
                <span>AI acceleration with human approval</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== TRUST AND CONTROL ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Trust &amp; Control</span></div>
              <div className="cs-prose__content">
                <h2>Trust, Transparency, and User Control</h2>
                <p>
                  The strongest design decision across the project was keeping humans in
                  control. AI outputs can look polished while still being wrong, so each
                  workflow needed review and correction points.
                </p>
                <p>
                  I separated generation from validation: Illustration GPT checked colour,
                  material, and style consistency; Copywriting AI audited copy against
                  component and market rules; Neem DS Prototyper validated component usage
                  and token constraints.
                </p>
                <p>
                  The workflows were not hidden automation. Designers and PMs could inspect,
                  reject, edit, approve, or regenerate outputs. When feedback appeared more
                  than once, I converted it into a system rule so the workflows improved over
                  time.
                </p>
                <p>
                  AI helped reduce the cost of exploration. It did not own final judgment.
                  The more consequential the output, the more human control the workflow
                  needed.
                </p>
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
                &ldquo;He is an AI-native builder with a designer&apos;s eye and a PM&apos;s brain.&rdquo;
              </blockquote>
              <div className="cs-award__attribution">
                <div className="cs-award__avatar cs-award__avatar--initials" aria-hidden="true">
                  DD
                </div>
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
                  workflows amplified human intent, but garbage in, garbage out still
                  applies. The cleaner and more structured the input, the better the
                  processing. AI can also clean and organise data <em>before</em> the primary
                  generation step, which compounds quality.
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

        {/* ===== FINAL REFLECTION ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Reflection</span></div>
              <div className="cs-prose__content">
                <h2>Final Reflection</h2>
                <p>
                  This project changed how I think about AI in product design. The value of
                  AI is not just speed. Speed only matters when the output is useful,
                  reviewable, and aligned with the product system.
                </p>
                <p>
                  The work taught me that AI-powered workflows need the same level of design
                  thinking as user-facing products: clear user goals, clear constraints,
                  clear failure states, clear feedback loops, clear ownership, and clear
                  review points.
                </p>
                <p>
                  The goal was never to replace designers or PMs. It was to reduce repeated
                  production work so the team could spend more time on judgment, alignment,
                  and better product decisions.
                </p>
              </div>
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
              <Link href="/work/shiga-onboarding" className="cs-next__link">
                Shiga — Cutting Time to Value with a Passkey-Led Onboarding
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
