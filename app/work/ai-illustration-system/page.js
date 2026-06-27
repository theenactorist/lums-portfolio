import Link from 'next/link';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import ZoomableImage from '../../components/ZoomableImage';

const phases = [
  { id: 'the-problem', label: 'The problem' },
  { id: 'defining-consistency', label: 'Defining consistency' },
  { id: 'choosing-a-direction', label: 'Choosing a direction' },
  { id: 'building-the-system', label: 'Building the system' },
  { id: 'what-changed', label: 'What changed' },
];

function ContentChecklist({ items }) {
  return (
    <aside className="cs-scaffold-note" aria-label="Content needed for this section">
      <span className="cs-scaffold-note__label">Content needed</span>
      <ul className="cs-scaffold-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </aside>
  );
}

export default function AIIllustrationSystemCaseStudy() {
  return (
    <main className="cs-page branch-ai-case illustration-system-case">
      <nav className="cs-breadcrumb" aria-label="Breadcrumb">
        <div className="container cs-wide-container">
          <ol className="cs-breadcrumb__list">
            <li className="cs-breadcrumb__item">
              <Link href="/" className="cs-breadcrumb__link">Home</Link>
            </li>
            <li className="cs-breadcrumb__sep" aria-hidden="true">/</li>
            <li className="cs-breadcrumb__item">
              <Link href="/#featured-work" className="cs-breadcrumb__link">Selected work</Link>
            </li>
            <li className="cs-breadcrumb__sep" aria-hidden="true">/</li>
            <li className="cs-breadcrumb__item cs-breadcrumb__item--current" aria-current="page">
              AI illustration system
            </li>
          </ol>
        </div>
      </nav>

      <header className="cs-hero">
        <div className="container cs-hero__container">
          <div className="cs-hero__grid">
            <div className="cs-hero__text">
              <p className="cs-hero__eyebrow">Branch International · Structure draft</p>
              <h1 className="cs-hero__title">
                Building an AI illustration system for consistent, on-brand product visuals at Branch
              </h1>
              <p className="cs-hero__subtitle">
                The five-step narrative is ready. Detailed context, evidence, decisions, and final copy will follow the content review.
              </p>
            </div>

            <figure className="cs-hero__cover">
              <ZoomableImage
                src="/work/branch-ai/illust-grid.jpg"
                alt="A set of consistent Branch product illustrations created through the shared illustration system"
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
                className="cs-hero__cover-image"
              />
            </figure>
          </div>
        </div>
      </header>

      <section className="cs-meta-section" aria-label="Case study structure details">
        <div className="container cs-wide-container">
          <dl className="cs-meta">
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Role</dt>
              <dd className="cs-meta__value">Product Designer, AI Systems</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Organization</dt>
              <dd className="cs-meta__value">Branch International</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Focus</dt>
              <dd className="cs-meta__value">Illustration system</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Structure</dt>
              <dd className="cs-meta__value">Five narrative steps</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Next input</dt>
              <dd className="cs-meta__value">Project context and evidence</dd>
            </div>
          </dl>
        </div>
      </section>

      <CaseStudyProgressRail phases={phases} />

      <section id="the-problem" className="cs-prose section cs-anchor-section" aria-labelledby="the-problem-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>The problem</span>
            <h2 id="the-problem-title">Why did Branch need an illustration system?</h2>
            <p>Establish the people, stakes, evidence, and product consequences before introducing AI.</p>
          </div>
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <ContentChecklist items={[
                'The original product or business need for illustration.',
                'Who created, reviewed, requested, or depended on illustrations.',
                'Examples of the inconsistency problem and how the team recognised it.',
                'The effect on product quality, delivery speed, and brand trust.',
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section id="defining-consistency" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="defining-consistency-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Defining consistency</span>
            <h2 id="defining-consistency-title">What did consistent need to mean?</h2>
            <p>Define the visual language and success criteria without forcing every illustration to look identical.</p>
          </div>
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <ContentChecklist items={[
                'The visual qualities the team evaluated.',
                'The references, audits, or principles that shaped the definition.',
                'The non-negotiable rules and the areas where variation remained useful.',
                'How the team would recognise a successful output.',
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section id="choosing-a-direction" className="cs-prose section cs-anchor-section" aria-labelledby="choosing-a-direction-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Choosing a direction</span>
            <h2 id="choosing-a-direction-title">Which approach deserved to become the system?</h2>
            <p>Show the strongest options, the trade-offs, and the evidence behind the selected direction.</p>
          </div>
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <ContentChecklist items={[
                'The different visual or workflow approaches considered.',
                'The strongest abandoned direction and why it failed.',
                'How the review sessions and FigJam vote informed the decision.',
                'Why the selected direction gave the team the strongest foundation.',
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section id="building-the-system" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="building-the-system-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Building the system</span>
            <h2 id="building-the-system-title">How did a visual direction become reusable rules?</h2>
            <p>Explain the architecture, constraints, iterations, and human review that made the workflow dependable.</p>
          </div>

          <ol className="cs-system-steps" aria-label="Illustration system evidence areas">
            <li><span>01</span><p>Instructions and system behaviour.</p></li>
            <li><span>02</span><p>Manifest and operating logic.</p></li>
            <li><span>03</span><p>JSON rules and visual constraints.</p></li>
            <li><span>04</span><p>Material catalogue and surface recipes.</p></li>
            <li><span>05</span><p>Render pipeline and quality gates.</p></li>
            <li><span>06</span><p>Human review and rule refinement.</p></li>
          </ol>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <ContentChecklist items={[
                'The sequence in which the system was built.',
                'The hardest colour, material, camera, lighting, composition, and realism constraints.',
                'The six major versions and the failures that changed each version.',
                'How Render Mode and Ideation Mode entered one quality pipeline.',
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section id="what-changed" className="cs-prose section cs-anchor-section" aria-labelledby="what-changed-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>What changed</span>
            <h2 id="what-changed-title">What became different after the system shipped?</h2>
            <p>Close with representative outputs, evidence, ownership, limitations, and the most useful learning.</p>
          </div>
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <ContentChecklist items={[
                'The final workflow and the clearest before-and-after evidence.',
                'What became faster, clearer, or more consistent.',
                'How the system reached the product markets.',
                'What Olumide owned, what the team owned, and what remained unresolved.',
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section className="cs-next" aria-label="Back to selected work">
        <div className="container">
          <Link href="/#featured-work" className="cs-back-link">Back to selected work</Link>
        </div>
      </section>
    </main>
  );
}
