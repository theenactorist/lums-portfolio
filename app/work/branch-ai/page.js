import Link from 'next/link';
import PageTransition from '../../components/PageTransition';
import ZoomableImage from '../../components/ZoomableImage';

const phaseLinks = [
  ['phase-drift', 'Why AI outputs kept drifting'],
  ['phase-systems', 'Turning prompts into systems'],
  ['phase-workflows', 'Three workflows in practice'],
  ['phase-testing', 'Testing with the product team'],
  ['phase-outcomes', 'Outcomes and hindsight'],
];

function CaseImage({ src, alt, width, height, caption, priority = false }) {
  return (
    <figure className="cs-feature__gallery cs-feature__gallery--single">
      <div className="cs-feature__figure">
        <ZoomableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 960px"
          className="cs-feature__image"
        />
      </div>
      {caption ? <figcaption className="cs-feature__caption">{caption}</figcaption> : null}
    </figure>
  );
}

function SnapshotGrid({ items }) {
  return (
    <dl className="cs-initiative-snapshot">
      {items.map((item) => (
        <div className="cs-initiative-snapshot__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function OutcomeGrid({ items, label = 'Outcome snapshot' }) {
  return (
    <div className="cs-impact-grid" aria-label={label}>
      {items.map((item) => (
        <article className="cs-impact-card" key={item.label}>
          <span className="cs-impact-card__label">{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function DataTable({ columns, rows, caption }) {
  return (
    <div className="cs-data-table" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${columns[index]}`} data-label={columns[index]}>
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

export default function BranchAICaseStudy() {
  return (
    <PageTransition>
      <main className="cs-page branch-ai-case">
        <nav className="cs-breadcrumb" aria-label="Breadcrumb">
          <div className="container cs-wide-container">
            <ol className="cs-breadcrumb__list">
              <li className="cs-breadcrumb__item">
                <Link href="/" className="cs-breadcrumb__link">Home</Link>
              </li>
              <li className="cs-breadcrumb__sep" aria-hidden="true">/</li>
              <li className="cs-breadcrumb__item">
                <Link href="/work" className="cs-breadcrumb__link">Selected work</Link>
              </li>
              <li className="cs-breadcrumb__sep" aria-hidden="true">/</li>
              <li className="cs-breadcrumb__item cs-breadcrumb__item--current" aria-current="page">
                Branch AI
              </li>
            </ol>
          </div>
        </nav>

        <header className="cs-hero">
          <div className="container cs-hero__container">
            <div className="cs-hero__grid">
              <div className="cs-hero__text">
                <p className="cs-hero__eyebrow">Branch International · AI systems</p>
                <h1 className="cs-hero__title">
                  Turning fragmented AI use into consistent product outputs at Branch
                </h1>
                <p className="cs-hero__subtitle">
                  How I built reusable workflows for on-brand illustrations, market-aware
                  product copy, and Neem-based prototypes across India, Kenya, and Nigeria.
                </p>
              </div>

              <figure className="cs-hero__cover">
                <ZoomableImage
                  src="/work/branch-ai/cover.jpg"
                  alt="Overview of the Illustration GPT, CopyGPT, and Neem DS Prototyper workflows created for Branch’s product team"
                  width={1768}
                  height={1024}
                  priority
                  sizes="(max-width: 900px) 100vw, 52vw"
                  className="cs-hero__cover-image"
                />
              </figure>
            </div>
          </div>
        </header>

        <section className="cs-meta-section" aria-label="Project details">
          <div className="container cs-wide-container">
            <dl className="cs-meta">
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Role</dt>
                <dd className="cs-meta__value">Product Designer, AI Systems</dd>
              </div>
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Initiative</dt>
                <dd className="cs-meta__value">October 2025–February 2026</dd>
              </div>
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Product markets</dt>
                <dd className="cs-meta__value">India, Kenya, Nigeria</dd>
              </div>
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Core users</dt>
                <dd className="cs-meta__value cs-meta__value--stack">
                  5 designers<br />4 UX researchers<br />15 product managers
                </dd>
              </div>
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Team locations</dt>
                <dd className="cs-meta__value">Nigeria, Kenya, India, United States</dd>
              </div>
              <div className="cs-meta__item">
                <dt className="cs-meta__label">Tools</dt>
                <dd className="cs-meta__value">ChatGPT, Claude, Figma MCP, JSON rules</dd>
              </div>
            </dl>
          </div>
        </section>

        <nav className="cs-phase-nav" aria-label="Case study phases">
          <div className="container cs-wide-container cs-phase-nav__viewport" tabIndex={0}>
            <ol className="cs-phase-nav__list">
              {phaseLinks.map(([href, label], index) => (
                <li key={href}>
                  <a href={`#${href}`}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <section className="cs-prose section cs-tldr" aria-labelledby="branch-tldr">
          <div className="container">
            <div className="cs-prose__row">
              <div className="cs-prose__label"><span id="branch-tldr">Recruiter TLDR</span></div>
              <div className="cs-prose__content">
                <h2>The team did not need another prompt</h2>
                <p>
                  Branch’s product team was already using ChatGPT, Claude, and Gemini. The
                  problem was not access to AI. Every person brought different context,
                  prompts, and quality standards, so the outputs did not reliably reflect the
                  same products, markets, visual language, or design system.
                </p>
                <p>
                  I treated the opportunity as an internal-product problem. I built the core
                  systems behind three workflows for illustration, product copy, and
                  prototyping, while keeping team ownership visible. Designers helped frame
                  the illustration problem and defined the colour system. The product team
                  implemented approved copy changes. A product manager led CopyGPT rollout.
                </p>
                <ol className="cs-numbered-list">
                  <li><strong>Illustration GPT</strong> for consistent product illustrations.</li>
                  <li><strong>CopyGPT</strong> for product-, market-, component-, and lint-aware copy.</li>
                  <li><strong>Neem DS Prototyper</strong> for turning product requirements into interactive prototypes grounded in Branch patterns.</li>
                </ol>
              </div>
            </div>

            <OutcomeGrid
              items={[
                {
                  label: 'Illustration GPT',
                  value: '500+ iterations',
                  detail: 'The shared illustration system is live across all product markets.',
                },
                {
                  label: 'CopyGPT',
                  value: '530 screens reviewed',
                  detail: '4,390 components audited, 1,778 changes implemented, and human-reviewed accuracy moved from 95% to 99%.',
                },
                {
                  label: 'Neem DS Prototyper',
                  value: 'About 30% faster',
                  detail: 'Directional product-manager feedback on PRD evaluation time.',
                },
              ]}
            />
            <p className="cs-evidence-note">
              These are distinct outcomes—not one combined adoption or usage claim.
            </p>
          </div>
        </section>

        <section className="cs-prose section" aria-labelledby="changed-state">
          <div className="container">
            <div className="cs-prose__row">
              <div className="cs-prose__label"><span id="changed-state">The changed state</span></div>
              <div className="cs-prose__content">
                <h2>The outputs finally looked like one product</h2>
                <p>
                  The most visible change is in Branch’s illustrations. A shared visual system
                  is now live across India, Kenya, and Nigeria, giving the team a repeatable way
                  to create images that belong to the same product family.
                </p>
                <p>
                  But illustration was only one part of the programme. The same consistency
                  problem appeared in product copy and prototypes: AI could produce something
                  quickly, but it did not automatically know Branch’s products, market
                  language, component rules, or interaction patterns.
                </p>
                <p className="cs-turning-line">Speed was already available. Consistency was not.</p>
                <p>
                  The work became an initiative to turn individual AI use into three reusable
                  product workflows—each with encoded context, versioned rules, testing, and
                  human approval.
                </p>
              </div>
            </div>

            <CaseImage
              src="/work/branch-ai/illust-grid.jpg"
              alt="A set of Branch product illustrations generated through the shared illustration system"
              width={1024}
              height={1024}
              caption="One visible result of the wider programme: a repeatable illustration language now live across Branch product markets."
            />
          </div>
        </section>

        <section id="phase-drift" className="cs-prose section cs-anchor-section" aria-labelledby="phase-drift-title">
          <div className="container">
            <div className="cs-phase-heading">
              <span>Phase 01</span>
              <h2 id="phase-drift-title">Why AI outputs kept drifting</h2>
              <p>Fast outputs. Different versions of Branch.</p>
            </div>

            <div className="cs-prose__row">
              <div className="cs-prose__label"><span>Reliability, not adoption</span></div>
              <div className="cs-prose__content">
                <p>
                  A product-team poll confirmed that AI was already part of the work: 65% of
                  respondents used ChatGPT, 20% used Claude, and others used Gemini. Adoption
                  was not the constraint. Reliability was.
                </p>
                <p>
                  The failure looked different in each workflow, but the underlying issue was
                  the same. General-purpose AI did not carry enough Branch context to make a
                  dependable product decision.
                </p>
              </div>
            </div>

            <div className="cs-issue-grid">
              <article>
                <span>Illustration</span>
                <h3>Drift was immediately visible</h3>
                <p>
                  Generations varied in colour, materials, lighting, perspective, distribution,
                  and state treatment. Polished images still felt as if they belonged to
                  different products.
                </p>
              </article>
              <article>
                <span>Product copy</span>
                <h3>Polished could still be wrong</h3>
                <p>
                  Generic AI missed product truth, market terminology, Branch’s voice, and
                  component behaviour. A grammatically correct sentence could still fail the
                  interface.
                </p>
              </article>
              <article>
                <span>Prototyping</span>
                <h3>Generic prototypes missed the system</h3>
                <p>
                  Early outputs did not understand Neem components, Branch interaction
                  patterns, token constraints, or product-flow conventions.
                </p>
              </article>
            </div>

            <CaseImage
              src="/work/branch-ai/different-illustration-directions.png"
              alt="Early Branch illustration directions showing inconsistent colour, materials, lighting, and perspective"
              width={2036}
              height={1812}
              caption="Individual images could look polished while the set still felt fragmented. The team first needed to agree on one visual language."
            />

            <p className="cs-case-pullquote">
              Better prompts could improve one result. Branch needed systems that could improve
              the next result—for the next person, market, and release.
            </p>
          </div>
        </section>

        <section id="phase-systems" className="cs-prose section cs-anchor-section" aria-labelledby="phase-systems-title">
          <div className="container">
            <div className="cs-phase-heading">
              <span>Phase 02</span>
              <h2 id="phase-systems-title">Turning prompts into systems</h2>
              <p>The system became the product.</p>
            </div>

            <div className="cs-prose__row">
              <div className="cs-prose__label"><span>Internal-product framing</span></div>
              <div className="cs-prose__content">
                <p>
                  I reframed each workflow as an internal product with users, jobs, failure
                  modes, rules, tests, and approval points. Instead of asking people to rebuild
                  context inside every prompt, I focused on encoding that context once and
                  making it reusable.
                </p>
                <p>
                  Governance did not mean removing judgment. It meant deciding which context
                  should be repeatable and which decisions still needed a person.
                </p>
              </div>
            </div>

            <ol className="cs-system-steps" aria-label="Shared operating model">
              <li><span>01</span><p>Start with a product task or source input.</p></li>
              <li><span>02</span><p>Add Branch-specific product, market, visual, or design-system context.</p></li>
              <li><span>03</span><p>Apply explicit rules and constraints.</p></li>
              <li><span>04</span><p>Generate a reviewable output.</p></li>
              <li><span>05</span><p>Keep human judgment at the approval point.</p></li>
              <li><span>06</span><p>Turn repeated feedback into the next system version.</p></li>
            </ol>

            <div className="cs-prose__row cs-prose__row--spaced">
              <div className="cs-prose__label"><span>Ownership stayed visible</span></div>
              <div className="cs-prose__content">
                <ul className="cs-detail-list">
                  <li>Other designers helped identify the illustration-consistency problem.</li>
                  <li>Arushi and I explored the illustration direction; she ran the FigJam vote.</li>
                  <li>I led three public review sessions.</li>
                  <li>The design team defined the colour system and owned final illustration review and selection.</li>
                  <li>The team defined CopyGPT’s brand and market rules; I owned the component and lint rules and version tuning.</li>
                  <li>The product team implemented approved copy changes, and the product manager led rollout.</li>
                  <li>Product managers, designers, and developers tested the prototyping workflow.</li>
                  <li>Deovrat provided one-to-one check-ins that kept the work aligned with the objective.</li>
                </ul>
              </div>
            </div>

            <CaseImage
              src="/work/branch-ai/ai-human-oversight-loop.jpg"
              alt="Human-oversight loop showing how review informed new rules and later workflow versions"
              width={1672}
              height={941}
              caption="Human review was part of the architecture: repeated feedback became reusable context while final judgment stayed with the team."
            />
          </div>
        </section>

        <section id="phase-workflows" className="section cs-anchor-section" aria-labelledby="phase-workflows-title">
          <div className="container">
            <div className="cs-phase-heading">
              <span>Phase 03</span>
              <h2 id="phase-workflows-title">Three workflows in practice</h2>
              <p>One reliability problem, solved through three different systems.</p>
            </div>
          </div>

          <article className="cs-feature section" aria-labelledby="workflow-illustration">
            <div className="container">
              <div className="cs-feature__inner">
                <p className="cs-workflow-index">Workflow 01</p>
                <h3 id="workflow-illustration" className="cs-feature__title">Teaching AI a visual language</h3>
                <p className="cs-feature__intro">
                  The illustration work began by agreeing on what “consistent” should mean.
                </p>

                <SnapshotGrid
                  items={[
                    { label: 'Problem', value: 'Inconsistent illustration styles' },
                    { label: 'System versions', value: 'Six major versions' },
                    { label: 'Generation work', value: '500+ iterations' },
                    { label: 'Status', value: 'All product markets live' },
                  ]}
                />

                <div className="cs-feature-copy">
                  <h4>Aligning before automating</h4>
                  <p>
                    Arushi and I explored visual directions, I led three public review
                    sessions, and Arushi ran the FigJam vote. The design team defined a
                    60/25/10/5 colour structure for the selected direction.
                  </p>
                  <p>
                    This mattered because a generation system could only be as coherent as the
                    decisions encoded inside it. Automating an unresolved style would have
                    scaled the disagreement.
                  </p>

                  <h4>Separating the system into four responsibilities</h4>
                </div>

                <DataTable
                  caption="The four-layer Illustration GPT system"
                  columns={['Layer', 'Responsibility', 'Ownership']}
                  rows={[
                    ['Instructions', 'System behaviour and non-negotiable requirements', 'Written by Olumide'],
                    ['Manifest', 'Operating logic and routing', 'Built by Olumide'],
                    ['Rules', 'Style, colour, camera, and prompt contracts in JSON', 'JSON rules written by Olumide; colour system defined by the design team'],
                    ['Materials', 'Fifteen surface recipes for the visual language', 'Catalogue built by Olumide'],
                  ]}
                />

                <CaseImage
                  src="/work/branch-ai/illustration-gpt-architecture.png"
                  alt="Four-layer Illustration GPT architecture showing instructions, manifest, JSON rules, and a material catalogue feeding the render pipeline"
                  width={1672}
                  height={941}
                  caption="Separating behaviour, operating logic, style rules, and materials made recurring failures easier to isolate and convert into reusable constraints."
                />

                <div className="cs-feature-copy">
                  <h4>Two entry points, one quality pipeline</h4>
                  <p>
                    Render Mode started with a reference image. Ideation Mode started with a
                    structured concept. Both entered the same render pipeline, where an
                    implemented material-realism gate could rerender an output up to twice
                    before escalating it to a person.
                  </p>
                  <p>
                    The gate did not select the final illustration. It caught repeatable
                    failures before review, while the design team retained responsibility for
                    quality review and final selection.
                  </p>

                  <h4>Turning repeated failures into rules</h4>
                  <p>
                    The workflow progressed through six major versions and more than 500
                    image-generation iterations, often requiring 10–15 iterations for a final
                    illustration. I generated and refined the outputs. When colour, material,
                    lighting, camera, or composition drift appeared repeatedly, I converted
                    that feedback into a constraint or negative rule for the next version.
                  </p>
                  <p>
                    The goal was not to eliminate iteration. It was to make each round teach
                    the system something reusable.
                  </p>
                </div>

                <CaseImage
                  src="/work/branch-ai/illust-iteration.jpg"
                  alt="Illustration iterations showing how repeated visual failures were corrected before final team selection"
                  width={6971}
                  height={6237}
                  caption="More than 500 image-generation iterations helped turn recurring colour, material, camera, and composition problems into system rules."
                />

                <div className="cs-status-card">
                  <span className="cs-status-card__label">Result</span>
                  <p>
                    The resulting illustration system is now live across all Branch product
                    markets. An exact illustration total is intentionally excluded because the
                    available sources conflict.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="cs-feature section" aria-labelledby="workflow-copy">
            <div className="container">
              <div className="cs-feature__inner">
                <p className="cs-workflow-index">Workflow 02</p>
                <h3 id="workflow-copy" className="cs-feature__title">Turning product context into reusable copy rules</h3>
                <p className="cs-feature__intro">
                  The problem was not grammar. It was whether the copy was true for the product,
                  market, component, and moment.
                </p>

                <SnapshotGrid
                  items={[
                    { label: 'System versions', value: 'Seven versions' },
                    { label: 'Screens reviewed', value: '530' },
                    { label: 'Components audited', value: '4,390' },
                    { label: 'Changes implemented', value: '1,778' },
                  ]}
                />

                <div className="cs-feature-copy">
                  <p>
                    CopyGPT needed to work across brand voice, product terminology, market
                    rules, interface behaviour, character constraints, casing, heuristics, and
                    lint requirements.
                  </p>
                  <p>
                    The team defined the brand and market rules. I owned the component and lint
                    rules and tuned the system through seven documented versions.
                  </p>

                  <h4>Rules needed room to breathe</h4>
                  <p>
                    Under-specified rules allowed product and market context to drift.
                    Over-strict rules could flatten the writing or reject useful variation.
                    Human review revealed where a rule was missing, ambiguous, or too rigid;
                    that evidence then informed the next version.
                  </p>
                </div>

                <CaseImage
                  src="/work/branch-ai/copywriting-ai-architecture.png"
                  alt="CopyGPT architecture combining Branch brand, market, product, component, heuristic, and lint rules with human review"
                  width={1681}
                  height={936}
                  caption="The workflow evaluated whether copy was appropriate for the product moment—not only whether it sounded polished."
                />

                <div className="cs-feature-copy">
                  <h4>Measuring the review work</h4>
                  <p>
                    The workflow supported a review of 530 screens and an audit of 4,390
                    components. The product team implemented 1,778 copy changes.
                  </p>
                  <p>
                    India’s totals were audited. Figures for Kenya and Nigeria included
                    directional estimates, so the case preserves that limitation rather than
                    presenting every market number as equally precise.
                  </p>
                  <p>
                    Human review measured accuracy moving from 95% to 99%. The workflow also
                    reduced copywriting turnaround, although no approved quantified turnaround
                    figure is available. The product manager led rollout across India and
                    African markets. The screen and component audit was a team workflow, not my
                    sole output.
                  </p>
                </div>

                <CaseImage
                  src="/work/branch-ai/branch-copy-ai-impact.png"
                  alt="CopyGPT impact summary covering screens reviewed, components audited, changes implemented, and human-reviewed accuracy"
                  width={1672}
                  height={941}
                  caption="India totals were audited; Kenya and Nigeria included directional estimates. The product team implemented the approved changes."
                />
              </div>
            </div>
          </article>

          <article className="cs-feature section" aria-labelledby="workflow-prototype">
            <div className="container">
              <div className="cs-feature__inner">
                <p className="cs-workflow-index">Workflow 03</p>
                <h3 id="workflow-prototype" className="cs-feature__title">Making product requirements tangible sooner</h3>
                <p className="cs-feature__intro">
                  A prototype is only useful when people can trust its product and design-system
                  context.
                </p>

                <SnapshotGrid
                  items={[
                    { label: 'Input', value: 'PRD or product idea' },
                    { label: 'System context', value: 'Figma MCP and Neem' },
                    { label: 'Testers', value: 'PMs, designers, developers' },
                    { label: 'Directional impact', value: 'About 30% faster evaluation' },
                  ]}
                />

                <div className="cs-feature-copy">
                  <p>
                    Generic Claude prototypes could make a product idea visible, but they did
                    not reliably use Neem components or Branch UX patterns. That gap weakened
                    their value as tools for evaluating a product requirement.
                  </p>
                  <p>I created a workflow that moved through six connected stages:</p>
                  <ol className="cs-numbered-list">
                    <li>A product requirements document or product idea.</li>
                    <li>Claude Skill interpretation.</li>
                    <li>Figma MCP and Neem Design System context.</li>
                    <li>A token-compliant React prototype.</li>
                    <li>Stakeholder review of the interaction.</li>
                    <li>PRD refinement before high-fidelity design.</li>
                  </ol>
                  <p>
                    Instead of reacting only to written intent, stakeholders could respond to
                    what the proposed flow actually did.
                  </p>
                </div>

                <CaseImage
                  src="/work/branch-ai/prd-to-prototype-workflow.jpg"
                  alt="Workflow connecting a product requirements document to Claude interpretation, Figma MCP context, a Neem-aware React prototype, stakeholder review, and PRD refinement"
                  width={1672}
                  height={941}
                  caption="The workflow made product requirements interactive earlier, giving stakeholders something concrete to evaluate before high-fidelity design."
                />

                <div className="cs-status-card">
                  <span className="cs-status-card__label">Validation</span>
                  <p>
                    Product managers, designers, and developers tested the workflow.
                    Directional feedback from product managers suggested that interactive
                    prototypes reduced PRD evaluation time by about 30%. This was feedback
                    about evaluating and refining a requirement—not a measured production-speed
                    claim.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="phase-testing" className="cs-prose section cs-anchor-section" aria-labelledby="phase-testing-title">
          <div className="container">
            <div className="cs-phase-heading">
              <span>Phase 04</span>
              <h2 id="phase-testing-title">Testing with the product team</h2>
              <p>Governance did not remove judgment.</p>
            </div>

            <div className="cs-prose__row">
              <div className="cs-prose__label"><span>Human review by design</span></div>
              <div className="cs-prose__content">
                <p>
                  The workflows handled repeatable context, but people still made the
                  consequential decisions.
                </p>
                <p>
                  For illustrations, the system could check material realism and rerender
                  known failures; the design team still decided whether an image communicated
                  the right idea and belonged in the product.
                </p>
                <p>
                  For copy, rules could surface product, market, component, and lint issues;
                  people still judged clarity, tone, and the final change.
                </p>
                <p>
                  For prototypes, the workflow could apply Neem context and generate an
                  interaction; product managers, designers, developers, and stakeholders still
                  evaluated whether the product direction was worth pursuing.
                </p>
                <p className="cs-turning-line">Human review was not a fallback. It was part of the architecture.</p>
              </div>
            </div>

            <div className="cs-prose__row cs-prose__row--spaced">
              <div className="cs-prose__label"><span>Showing paths that did not work</span></div>
              <div className="cs-prose__content">
                <ul className="cs-detail-list">
                  <li>Compare illustration directions that drifted in colour, materials, camera, or consistency with the selected direction.</li>
                  <li>Show how repeated illustration failures became rules or negative constraints.</li>
                  <li>Contrast under-specified and over-strict CopyGPT results, then explain the rule change.</li>
                  <li>Compare a generic prototype with a later output using Neem patterns and tokens.</li>
                </ul>
                <p>
                  Each comparison explains what changed and why the abandoned path was not
                  strong enough, rather than presenting an exhaustive process archive.
                </p>
              </div>
            </div>

            <aside className="cs-award" aria-labelledby="recognition-title">
              <div className="cs-award__card">
                <span className="cs-award__eyebrow" id="recognition-title">Recognition</span>
                <blockquote className="cs-award__quote">
                  “He is an AI-native builder with a designer’s eye and a PM’s brain.”
                </blockquote>
                <div className="cs-award__attribution">
                  <div className="cs-award__avatar cs-award__avatar--initials" aria-hidden="true">DD</div>
                  <div className="cs-award__person">
                    <span className="cs-award__name">Deovrat Dwivedi</span>
                    <span className="cs-award__role">Design Lead · Branch International</span>
                  </div>
                </div>
                <p className="cs-evidence-note">Recognition of the work—not evidence for a product outcome.</p>
                <CaseImage
                  src="/work/branch-ai/kudos.jpeg"
                  alt="Slack recognition from Deovrat Dwivedi about Olumide’s work on the Branch AI initiatives"
                  width={1536}
                  height={1456}
                  caption="Deovrat’s recognition is presented separately from the case-study evidence and ownership record."
                />
              </div>
            </aside>
          </div>
        </section>

        <section id="phase-outcomes" className="cs-prose section cs-anchor-section" aria-labelledby="phase-outcomes-title">
          <div className="container">
            <div className="cs-phase-heading">
              <span>Phase 05</span>
              <h2 id="phase-outcomes-title">Outcomes and hindsight</h2>
              <p>Less dependence on each person reconstructing Branch context from scratch.</p>
            </div>

            <OutcomeGrid
              label="Branch AI outcomes"
              items={[
                {
                  label: 'Illustration GPT',
                  value: 'One shared visual system',
                  detail: 'Live across all product markets after six major versions and 500+ generation iterations; final review stayed with the design team.',
                },
                {
                  label: 'CopyGPT',
                  value: '1,778 changes implemented',
                  detail: '530 screens reviewed, 4,390 components audited, and human-reviewed accuracy moved from 95% to 99%.',
                },
                {
                  label: 'Neem DS Prototyper',
                  value: 'Requirements became interactive',
                  detail: 'Directional product-manager feedback suggested about 30% faster PRD evaluation.',
                },
              ]}
            />

            <div className="cs-prose__row cs-prose__row--spaced">
              <div className="cs-prose__label"><span>What I learned</span></div>
              <div className="cs-prose__content">
                <p>
                  The strongest AI workflow was rarely the one with the cleverest prompt. It
                  was the one with the clearest context architecture.
                </p>
                <p>
                  Guardrails also needed active tuning. Too little structure produced drift.
                  Too much made the output rigid. Versioning created a practical way to manage
                  that tension without pretending the rules were ever finished.
                </p>
                <p>
                  Most importantly, building internal AI tools required the same product
                  thinking as customer-facing work: understand the user, make failure visible,
                  test with real tasks, define ownership, and keep judgment at the right point
                  in the system.
                </p>
              </div>
            </div>

            <div className="cs-prose__row cs-prose__row--spaced">
              <div className="cs-prose__label"><span>Future potential</span></div>
              <div className="cs-prose__content">
                <p>
                  The illustration workflow could eventually support controlled
                  external-agency access. That remains future potential, not a shipped
                  capability or commitment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-next">
          <div className="container">
            <span className="cs-next__label">Next case study</span>
            <Link href="/work/shiga-onboarding" className="cs-next__link">
              Shiga — Cutting time to value with passkey-led onboarding
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/work" className="cs-back-link">Back to selected work</Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
