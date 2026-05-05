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

const researchInputs = {
  columns: ['Method', 'Who was involved', 'What I wanted to learn'],
  rows: [
    ['1:1 conversations', 'PMs, researchers, designers', 'How teams were already using AI and where outputs failed'],
    ['Slack DMs', 'PMs, researchers, designers', 'Specific pain points from day-to-day copy and workflow use'],
    ['Copywriting poll', 'Full product team', 'Which AI tools people used for rewriting copy'],
    ['Product-wide reviews', 'PMs, designers, researchers, stakeholders', 'Whether the proposed systems matched real team needs'],
    ['FigJam voting', 'Product team', 'Which illustration direction felt most aligned with Branch'],
    ['Direct tool testing', 'PMs, designers, developers', 'Whether the workflows were useful in real work'],
  ],
};

const discoveries = {
  columns: ['Finding', 'What it meant', 'Design response'],
  rows: [
    ['AI adoption already existed', 'The team did not need convincing to try AI', 'Focus on governance, not novelty'],
    ['Outputs lacked product truth', 'AI could reference unavailable products or wrong service states', 'Add product and market rules'],
    ['Market language differed', 'The same copy could feel natural in one country and wrong in another', 'Add market-specific terminology'],
    ['Brand voice was inconsistent', 'Outputs sounded polished but not like Branch', 'Encode brand voice rules'],
    ['Component context was missing', 'CTAs, titles, descriptions, errors, empty states, and toasts needed different treatment', 'Add component-level copy rules'],
    ['Prototypes felt generic', 'Claude could prototype, but not in Branch UX patterns', 'Map prompts to Neem components and Branch screen patterns'],
    ['Illustration styles were fragmented', 'Screens used mixed visual languages', 'Align the team on one reusable illustration system'],
  ],
};

const copyExamples = {
  columns: ['Product area', 'Component', 'Before', 'After', 'What improved'],
  emphasisColumn: 3,
  mutedColumn: 2,
  rows: [
    ['Onboarding', 'Screen title', 'Verify your mobile number', 'Enter your mobile number', 'Clearer task framing'],
    ['Onboarding', 'Input label', 'Phone Number', 'Mobile number', 'Better India-market terminology'],
    ['Onboarding', 'Input label', 'Email ID', 'Email address', 'More universal and easier to understand'],
    ['OTP', 'Error message', 'Unfortunately, the provided code does not match. Please try again.', 'Incorrect OTP. Please try again.', 'Shorter, clearer, less formal'],
    ['KYC', 'CTA', 'Proceed', 'Continue', 'More natural progression cue'],
    ['Repayment', 'Section title', 'Repayment History', 'Payment history', 'Simpler and easier to scan'],
  ],
};

const copyIterations = {
  columns: ['Version', 'What changed', 'Why it changed'],
  rows: [
    ['v1', 'Created the first rule system across brand, markets, components, heuristics, and material mapping', 'Establish a baseline for structured copy generation'],
    ['v2', 'Expanded market and component coverage', 'Early outputs still missed product and market context'],
    ['v3', 'Strengthened brand and lint logic', 'Improve consistency in tone, casing, and formatting'],
    ['v4', 'Refined heuristics and constraints', 'Make outputs more reliable across ambiguous product moments'],
    ['v5', 'Rebalanced rules to reduce over-correction', 'Some guardrails needed to be relaxed so copy could still feel natural'],
    ['v6', 'Added operating guide and stronger workflow structure', 'Make the system easier to use and repeat across teams'],
    ['v7', 'Tightened final rule logic across brand, market, lint, and component files', 'Stabilise the system after testing and feedback'],
  ],
};

const illustrationIterations = {
  columns: ['Version', 'What changed', 'Why it changed'],
  rows: [
    ['v1', 'Established the first Branch illustration rules, materials, and manifest', 'Create a consistent baseline'],
    ['v2', 'Refined early style rules and material handling', 'Improve alignment with Branch preferred visual direction'],
    ['v3', 'Added stronger instructions and more detailed rules', 'Reduce inconsistent outputs across prompts'],
    ['v4', 'Improved system structure and usage guidance', 'Make generation more repeatable'],
    ['v5', 'Expanded rule sophistication and prompt control', 'Improve quality, consistency, and production readiness'],
    ['v6', 'Tightened final system prompt, rules, materials, and manifest', 'Stabilise output for team use and rollout'],
  ],
};

const teamChanges = {
  columns: ['Area', 'Before', 'After'],
  rows: [
    ['AI usage', 'Individual use of ChatGPT, Claude, and Gemini', 'Shared AI workflows with Branch-specific rules'],
    ['Copywriting', 'Manual rewrites and repeated review cycles', 'Market-aware copy generation and audit workflow'],
    ['Illustration', 'Mixed styles across product surfaces', 'Unified illustration direction with reusable generation rules'],
    ['Prototyping', 'PRDs reviewed mostly as written documents', 'Interactive prototypes used for earlier stakeholder feedback'],
    ['Review', 'Subjective feedback and repeated corrections', 'Clearer guardrails, quality checks, and approval points'],
    ['Team enablement', 'AI value depended on individual prompting skill', 'PMs, designers, and researchers had reusable systems'],
  ],
};

function DataTable({ columns, rows, caption, emphasisColumn, mutedColumn }) {
  return (
    <div className="cs-data-table" role="region" aria-label={caption}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${columns[index]}`}
                  data-label={columns[index]}
                  className={[
                    index === emphasisColumn ? 'cs-data-table__strong' : '',
                    index === mutedColumn ? 'cs-data-table__muted' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseImage({ src, alt, width = 1672, height = 941, caption, priority = false }) {
  return (
    <motion.div className="cs-feature__gallery cs-feature__gallery--single" {...fadeUp}>
      <figure className="cs-feature__figure">
        <ZoomableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="cs-feature__image"
        />
      </figure>
      {caption && (
        <div className="cs-feature__footer">
          <p className="cs-feature__caption">{caption}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function BranchAICaseStudy() {
  return (
    <PageTransition>
      <main className="cs-page">
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

        <section className="cs-hero">
          <div className="container cs-hero__container">
            <motion.div
              className="cs-hero__grid"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cs-hero__text">
                <h1 className="cs-hero__title">Three AIs, One Design System</h1>
                <p className="cs-hero__subtitle">
                  How I turned scattered AI use into governed product workflows for
                  illustration, copywriting, and prototyping across{' '}
                  <a href="https://branch.co" target="_blank" rel="noopener noreferrer" className="cs-inline-link">
                    Branch International
                  </a>&apos;s product team.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/branch-ai/three-ai-workflows.jpg"
                  alt="Three governed AI workflows across illustration, copywriting, and prototyping"
                  width={1672}
                  height={941}
                  priority
                  className="cs-hero__cover-image"
                />
              </figure>
            </motion.div>
          </div>
        </section>

        <section className="cs-meta-section">
          <div className="container cs-wide-container">
            <motion.div className="cs-meta" {...fadeUp}>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Role</span>
                <span className="cs-meta__value">Product Designer</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Scope</span>
                <span className="cs-meta__value">AI workflows, UX writing, prototyping</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Markets</span>
                <span className="cs-meta__value">India, Kenya, Nigeria</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Core users</span>
                <span className="cs-meta__value cs-meta__value--stack">
                  5 designers<br />
                  4 UX researchers<br />
                  15 product managers
                </span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Research inputs</span>
                <span className="cs-meta__value">1:1s, Slack, reviews, FigJam, testing</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Tooling</span>
                <span className="cs-meta__value">ChatGPT, Claude, Figma MCP, JSON rules</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Summary</span></div>
              <div className="cs-prose__content">
                <p>
                  Branch&apos;s product team works across India, Kenya, and Nigeria, supporting
                  areas such as onboarding, KYC, loans, repayments, rewards, account
                  management, customer support, risk, and operations.
                </p>
                <p>
                  AI was already entering the team&apos;s workflow. In a product-team poll I ran,
                  everyone responded, and the results showed that AI was already being used for
                  copywriting: 65% used ChatGPT, 20% used Claude, and others used Gemini.
                </p>
                <p>
                  The issue was not adoption. The issue was reliability. Generic tools could
                  produce fast outputs, but those outputs often lacked Branch&apos;s product
                  reality, market nuance, brand voice, component context, and design-system
                  logic.
                </p>
                <p>
                  Branch did not need AI experiments. It needed governed AI workflows for
                  product work.
                </p>
              </div>
            </motion.div>

            <motion.div className="cs-impact-grid" {...fadeUp}>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">Team input</span>
                <strong>50+ people consulted</strong>
                <p>Input came through 1:1s, Slack DMs, product reviews, presentations, FigJam voting, and direct testing.</p>
              </div>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">Copy audit</span>
                <strong>4,390 components audited</strong>
                <p>Across 530 screens, with 1,778 copy changes implemented.</p>
              </div>
              <div className="cs-impact-card">
                <span className="cs-impact-card__label">PRD evaluation</span>
                <strong>About 30%</strong>
                <p>Directional reduction in evaluation time based on general PM feedback.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>The Opportunity</span></div>
              <div className="cs-prose__content">
                <p>
                  Across Branch, PMs, designers, and researchers were already using ChatGPT,
                  Claude, and Gemini to rewrite copy, explore flows, and create early ideas.
                  But every person brought their own prompt, context, and quality bar.
                </p>
                <p>
                  Generic AI tools did not know which products existed in each market. They did
                  not understand how copy should change between a button, screen title, error
                  message, banner, toast, or form description. They also did not know how
                  Branch&apos;s product should sound.
                </p>
                <p>
                  The opportunity was to move from loose personal productivity to governed
                  workflows that made AI more useful, consistent, and safe for real product
                  work.
                </p>
              </div>
            </motion.div>

            <CaseImage
              src="/work/branch-ai/ai-before-after-workflows.jpg"
              alt="Shift from scattered AI use to governed product workflows"
              caption="The opportunity was not to introduce AI. The team was already using it. The opportunity was to make AI outputs reliable enough for real product work."
            />
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Research</span></div>
              <div className="cs-prose__content">
                <h2>Research Inputs</h2>
                <p>
                  I used lightweight research methods because the work was internal and moving
                  quickly. The goal was to understand real AI use, not theoretical interest.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <DataTable {...researchInputs} caption="Research inputs" />
              <div className="cs-poll-callout">
                <div>
                  <span>Copywriting poll result</span>
                  <strong>65% ChatGPT · 20% Claude · others Gemini</strong>
                </div>
                <p>
                  Adoption was already happening. The problem was that every person was
                  bringing their own prompt, context, and quality bar.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Discovery</span></div>
              <div className="cs-prose__content">
                <h2>What I Discovered</h2>
                <p>
                  The research changed the brief. The team did not need to be convinced to use
                  AI. It needed governance, context, and clearer review points.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <DataTable {...discoveries} caption="What I discovered" />
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Strategy</span></div>
              <div className="cs-prose__content">
                <h2>The Strategic Decision</h2>
                <p>
                  At first, the obvious answer looked like better prompts. But the deeper issue
                  was governance. People already had access to AI tools. What they did not have
                  was a shared system that understood Branch&apos;s products, markets, design
                  language, and quality bar.
                </p>
                <p>
                  I treated each workflow like an internal product: define the user and use
                  case, understand failure points, encode product rules, create reusable
                  workflows, test with real team members, turn repeated feedback into system
                  constraints, and keep humans in control of final approval.
                </p>
              </div>
            </motion.div>

            <CaseImage
              src="/work/branch-ai/ai-human-oversight-loop.jpg"
              alt="Human oversight loop for governed Branch AI workflows"
              caption="Human judgement stayed central. The AI workflows helped teams start closer to the right answer."
            />
          </div>
        </section>

        <section className="container">
          <motion.div className="cs-divider" {...fadeUp}>
            The Three Governed Workflows
          </motion.div>
        </section>

        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 01 - Illustration GPT</h2>
              <p className="cs-feature__intro">
                Creating one visual language for Branch product illustrations.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                The issue was not just speed. It was visual consistency. Branch&apos;s existing
                illustration set had grown across different needs and contributors. Some
                screens used 3D-style assets, others used line illustrations, and some used
                softer Notion-like visuals. Individually, some assets worked. Together, they
                did not feel like one product system.
              </p>
              <p className="cs-feature__body">
                The first challenge was not generating images. It was helping the team align
                on what Branch illustration style should become.
              </p>

              <CaseImage
                src="/work/branch-ai/different-illustration-directions.png"
                alt="Mixed illustration styles moving toward a unified Branch visual system"
                width={2036}
                height={1812}
                caption="The problem was not just illustration speed. It was alignment. Branch needed one visual language that could scale across markets and product surfaces."
              />

              <h3 className="cs-feature__deliverables-label">What I designed</h3>
              <p className="cs-feature__body">
                I created an Illustration GPT that could generate Branch-aligned product
                illustrations using structured rules for colour balance, material treatment,
                lighting, perspective, product relevance, reusable composition, output
                quality, and market adaptability.
              </p>
              <p className="cs-feature__body">
                The goal was not to create random AI illustrations. The goal was to create a
                repeatable illustration system that could support product surfaces across
                India, Kenya, and Nigeria.
              </p>

              <CaseImage
                src="/work/branch-ai/illustration-gpt-architecture.png"
                alt="Illustration GPT architecture"
                caption="The Illustration GPT translated subjective style preferences into reusable rules for colour, material, lighting, perspective, and product relevance."
              />

              <h3 className="cs-feature__deliverables-label">Team alignment and iteration</h3>
              <p className="cs-feature__body">
                To converge on a style, I ran three public review sessions where I presented
                multiple illustration directions to the product team. I also ran a FigJam vote
                so designers, PMs, researchers, and stakeholders could compare options and
                express preferences.
              </p>
              <p className="cs-feature__body">
                Repeated feedback became a system rule. Isolated preferences were noted but
                not over-weighted. This helped move the team from subjective opinions to
                shared visual principles.
              </p>

              <h3 className="cs-feature__deliverables-label">Six Major Versions of Illustration System Refinement</h3>
              <p className="cs-feature__body">
                The illustration system evolved through repeated review, testing, and
                constraint tuning. The main work was finding the right level of strictness:
                enough to create consistency, but flexible enough to support different product
                moments.
              </p>
              <DataTable {...illustrationIterations} caption="Illustration GPT iteration history" />
              <p className="cs-feature__body">
                In practice, the iterations focused on colour balance, material realism, visual
                weight, lighting, background treatment, perspective, and how much freedom the
                GPT should have when interpreting a brief.
              </p>

              <div className="cs-feature__gallery cs-feature__gallery--split-even cs-feature__gallery--wide cs-feature__gallery--equal-height">
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/branch-ai/illust-solution-1.jpg"
                    alt="Branch illustration system output"
                    width={2367}
                    height={1692}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <figure className="cs-feature__figure cs-feature__figure--fill">
                  <ZoomableImage
                    src="/work/branch-ai/illust-solution-2.jpg"
                    alt="Branch illustration system output set"
                    width={2367}
                    height={1692}
                    className="cs-feature__image cs-feature__image--cover"
                  />
                </figure>
                <div className="cs-feature__footer" style={{ gridColumn: '1 / -1' }}>
                  <p className="cs-feature__caption">
                    Around 40 illustrations were created across markets. All sets are ready, with about 60% live in the app.
                  </p>
                </div>
              </div>

              <div className="cs-status-card">
                <span className="cs-status-card__label">Result</span>
                <p>
                  All illustration sets are ready. About 60% are live in the app, with the
                  remaining rollout dependent on engineering bandwidth. The system reduced
                  design review back-and-forth because new work started from clearer style
                  rules and stronger shared alignment.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 02 - Copywriting AI</h2>
              <p className="cs-feature__intro">
                Turning individual prompting into a market-aware copy workflow.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                People were already using AI to write and rewrite product copy. The issue was
                that generic AI did not understand Branch deeply enough. It could produce
                clean English, but it often missed product truth, market nuance, brand voice,
                or component context.
              </p>
              <p className="cs-feature__body">
                A suggestion could reference a product that did not exist in a market, use
                terminology that felt unfamiliar to customers in that country, write a CTA
                like a paragraph, or ignore casing rules, character limits, and
                component-specific behaviour.
              </p>

              <h3 className="cs-feature__deliverables-label">What I designed</h3>
              <p className="cs-feature__body">
                I built a copywriting system using versioned JSON rule files and operating
                guides across brand voice, market terminology, product rules, component
                rules, heuristics, lint rules, material maps, and workflow guidance.
              </p>
              <p className="cs-feature__body">
                The system helped the team write, rewrite, and audit product copy against
                Branch&apos;s product reality.
              </p>

              <h3 className="cs-feature__deliverables-label">Before and After: Turning Generic Copy Into Product-Ready Microcopy</h3>
              <p className="cs-feature__body">
                To test the system, I audited real product surfaces and compared existing copy
                against Branch&apos;s market, brand, component, and UX writing rules. The goal
                was not to make copy sound nicer. It was to make each string clearer, more
                contextual, and more appropriate for the product moment.
              </p>
              <DataTable {...copyExamples} caption="Before and after copy rewrite examples" />

              <CaseImage
                src="/work/branch-ai/copywriting-ai-architecture.png"
                alt="Copywriting AI architecture"
                width={1681}
                height={936}
                caption="The Copywriting AI moved the team from loose rewriting prompts to structured copy generation and audit logic."
              />

              <h3 className="cs-feature__deliverables-label">Seven Iterations of Guardrail Tuning</h3>
              <p className="cs-feature__body">
                The Copywriting AI evolved through seven versions. Each version adjusted how
                strict or flexible the system should be across brand voice, component rules,
                market language, linting, and product context. The work was less about adding
                features and more about tuning the rules until the system could produce useful
                copy without becoming rigid or generic.
              </p>
              <DataTable {...copyIterations} caption="Copywriting AI iteration history" />
              <p className="cs-feature__body">
                Across versions, the work moved from &quot;rewrite this copy&quot; to
                &quot;rewrite, audit, and validate this copy against Branch&apos;s product
                reality.&quot;
              </p>

              <h3 className="cs-feature__deliverables-label">Copy AI impact</h3>
              <p className="cs-feature__body">
                The copywriting workflow supported 530 reviewed screens, 4,390 audited
                components, and 1,778 implemented changes across onboarding, KYC, loan,
                account, repayment, rewards, and support flows.
              </p>

              <CaseImage
                src="/work/branch-ai/branch-copy-ai-impact.png"
                alt="Branch Copy AI Impact report"
                caption="Cross-market totals include audited India workbook data and directional estimates for Kenya and Nigeria."
              />

              <div className="cs-status-card">
                <span className="cs-status-card__label">Result</span>
                <p>
                  Copywriting became more reliable through Branch-specific product, market,
                  component, brand, and lint rules. The workflow reduced design-review
                  back-and-forth because first drafts started closer to Branch&apos;s product
                  reality.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Initiative 03 - Neem DS Prototyper</h2>
              <p className="cs-feature__intro">
                Helping PMs evaluate PRDs through interactive prototypes.
              </p>

              <h3 className="cs-feature__deliverables-label">Problem</h3>
              <p className="cs-feature__body">
                PMs could already use Claude to create rough prototypes, but the outputs did
                not understand Branch&apos;s UX patterns. Claude could generate a screen, but it
                did not know how Branch structured flows, how Neem components were used, what
                screen patterns were acceptable, or how product ideas typically moved through
                the app experience.
              </p>
              <p className="cs-feature__body">
                That made the prototypes useful as rough sketches, but weak as alignment
                tools. The opportunity was to make prototyping faster without making it
                generic.
              </p>

              <h3 className="cs-feature__deliverables-label">What I designed</h3>
              <p className="cs-feature__body">
                I created a prototyping workflow that helped PMs move from PRD or product idea
                to an interactive prototype using Branch&apos;s design-system logic. The workflow
                connected PRD input, Claude Skill interpretation, Figma MCP context, Neem
                component mapping, token-compliant React prototypes, stakeholder review, and
                PRD refinement before high-fidelity design.
              </p>

              <CaseImage
                src="/work/branch-ai/prd-to-prototype-workflow.jpg"
                alt="PRD to prototype workflow"
                caption="The biggest value was not replacing design. It gave PMs a faster way to test product thinking, collect stakeholder feedback, and improve PRDs before high-fidelity design."
              />

              <CaseImage
                src="/work/branch-ai/prototyping-ai-architecture-v2.jpg"
                alt="Prototyping AI architecture"
                caption="The prototyping workflow helped Claude generate outputs that better reflected Branch UX patterns and Neem design-system rules."
              />

              <div className="cs-status-card">
                <span className="cs-status-card__label">Result</span>
                <p>
                  The Neem DS Prototyper reduced PRD evaluation time by about 30%, based on
                  general feedback from PMs. The tool was tested directly by PMs, designers,
                  and developers. The biggest shift was not only speed: stakeholders could
                  respond to interactive prototypes earlier, before work moved into
                  high-fidelity design.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Feedback</span></div>
              <div className="cs-prose__content">
                <h2>Testing and Feedback Loops</h2>
                <p>
                  I tested the workflows with the people who would actually use them:
                  designers, PMs, UX researchers, and developers. Feedback came through 1:1
                  conversations, Slack DMs, product-wide presentations, show-and-tell sessions,
                  FigJam voting, and direct tool testing.
                </p>
                <p>
                  Each tool had a different feedback loop. Illustration GPT focused on visual
                  alignment with designers and the wider product team. Copywriting AI was
                  tested broadly because designers, PMs, and UX researchers all wrote copy.
                  Neem DS Prototyper was tested by PMs, designers, and developers to check
                  whether prototypes were useful for PRD evaluation and stakeholder feedback.
                </p>
                <p>
                  The feedback helped separate novelty from usefulness. If a tool only
                  produced impressive outputs, it was not enough. It had to reduce real
                  workflow friction.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Outcomes</span></div>
              <div className="cs-prose__content">
                <h2>What Changed Across the Product Team</h2>
                <p>
                  The work helped Branch move from scattered AI experimentation to governed
                  AI-assisted product work.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <DataTable {...teamChanges} caption="What changed across the product team" />
            </motion.div>
          </div>
        </section>

        <section className="cs-learnings section">
          <div className="container">
            <motion.div className="cs-learnings__inner" {...fadeUp}>
              <h2 className="cs-learnings__title">What I Learned</h2>
              <ul className="cs-learnings__list">
                <li>
                  <strong>AI quality depends on context, not just model capability:</strong>{' '}
                  The same AI tool can produce weak or useful output depending on the rules,
                  examples, constraints, and product knowledge it receives.
                </li>
                <li>
                  <strong>Guardrails need tuning:</strong> Too few guardrails produced generic
                  outputs. Too many made the system rigid. The work was finding the right
                  balance between consistency and flexibility.
                </li>
                <li>
                  <strong>Internal AI tools need product thinking:</strong> A useful workflow
                  needs clear users, repeated problems, feedback loops, usage patterns,
                  constraints, and success criteria.
                </li>
                <li>
                  <strong>Human review still matters:</strong> The goal was not to remove
                  human judgement. It was to help teams start closer to the right answer,
                  reduce repeated corrections, and spend more time on higher-quality
                  decisions.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label"><span>Final Framing</span></div>
              <div className="cs-prose__content">
                <p>
                  The real contribution was not just creating three AI tools. It was designing
                  product-team infrastructure that made AI more useful, more consistent, and
                  more aligned with Branch&apos;s product reality.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

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
                Shiga - Cutting Time to Value with a Passkey-Led Onboarding
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
