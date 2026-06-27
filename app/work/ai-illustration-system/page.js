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

const systemVersions = [
  {
    version: 'v1',
    change: 'Locked the camera, lighting, output, material recognition, and the first realism gate.',
    value: 'Created the first repeatable production contract.',
  },
  {
    version: 'v2',
    change: 'Added natural-material handling and stronger failure exclusions.',
    value: 'Expanded the range of scenes the system could describe.',
  },
  {
    version: 'v3',
    change: 'Separated instructions, tightened material selection, and added reproducibility fields.',
    value: 'Reduced duplicated rules and made failures easier to trace.',
  },
  {
    version: 'v4',
    change: 'Added precedence, provenance, version compatibility, and stricter interaction behaviour.',
    value: 'Stopped runtime requests and duplicated defaults from weakening the rules.',
  },
  {
    version: 'v5',
    change: 'Introduced colour roles, ratios, part assignments, and ratio validation.',
    value: 'Addressed the largest source of library-wide drift.',
  },
  {
    version: 'v6',
    change: 'Made pre-delivery colour validation mandatory.',
    value: 'Turned colour guidance into a release gate.',
  },
];

function CaseStudyFigure({ src, alt, width, height, caption, sizes = '100vw' }) {
  return (
    <figure className="cs-feature__figure illustration-figure">
      <ZoomableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="illustration-figure__image"
      />
      {caption ? <figcaption className="cs-feature__caption">{caption}</figcaption> : null}
    </figure>
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
              <p className="cs-hero__eyebrow">Branch International · AI illustration system</p>
              <h1 className="cs-hero__title">
                Building an AI illustration system for consistent, on-brand product visuals at Branch
              </h1>
              <p className="cs-hero__subtitle">
                I translated a team-defined visual direction into a Custom GPT that could turn natural-language briefs into reusable product illustrations, while keeping people responsible for meaning and final quality.
              </p>
            </div>

            <figure className="cs-hero__cover">
              <ZoomableImage
                src="/work/branch-ai/illust-grid.jpg"
                alt="A cohesive set of isometric Branch product illustrations using the same camera, colour, material, and lighting language"
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

      <section className="cs-meta-section" aria-label="Case study details">
        <div className="container cs-wide-container">
          <dl className="cs-meta">
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Role</dt>
              <dd className="cs-meta__value">Product Designer, AI Systems</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Initiative</dt>
              <dd className="cs-meta__value">Oct 2025 to Feb 2026</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Collaboration</dt>
              <dd className="cs-meta__value">Design, product, research</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Tools</dt>
              <dd className="cs-meta__value">ChatGPT, FigJam, Figma</dd>
            </div>
            <div className="cs-meta__item">
              <dt className="cs-meta__label">Outcome</dt>
              <dd className="cs-meta__value">Live across product markets</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cs-prose illustration-overview" aria-labelledby="overview-title">
        <div className="container">
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p className="cs-prose__label">Overview</p>
              <h2 id="overview-title">Branch needed the next illustration to feel like it belonged.</h2>
              <p>
                Branch did not need another way to generate a single attractive image. It needed a way to create the next illustration, and the one after that, without losing the visual language of the product.
              </p>
              <p>
                I worked with the design team to define that language, then built the system that could apply it repeatedly. I wrote the instructions and JSON rules, built the manifest, material catalogue, and render pipeline, and generated and refined the outputs through six major versions.
              </p>
              <p>
                The design team defined the colour system and retained final quality review. Arushi and I explored the visual direction, and she ran the FigJam vote.
              </p>
            </div>
          </div>

          <div className="cs-impact-grid" aria-label="Project evidence">
            <article className="cs-impact-card">
              <span className="cs-impact-card__label">System</span>
              <strong>6</strong>
              <p>Major documented versions</p>
            </article>
            <article className="cs-impact-card">
              <span className="cs-impact-card__label">Testing</span>
              <strong>500+</strong>
              <p>Image-generation iterations</p>
            </article>
            <article className="cs-impact-card">
              <span className="cs-impact-card__label">Quality gate</span>
              <strong>2×</strong>
              <p>Automatic rerenders before human escalation</p>
            </article>
          </div>
        </div>
      </section>

      <CaseStudyProgressRail phases={phases} />

      <section id="the-problem" className="cs-prose section cs-anchor-section" aria-labelledby="the-problem-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>The problem</span>
            <h2 id="the-problem-title">One design system. Several illustration languages.</h2>
            <p>The interface was becoming more coherent, but the artwork still changed from screen to screen.</p>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                The work began as an extension of Branch&apos;s Neem Design System migration. Some illustrations used heavy strokes. Others relied on soft shading or detailed characters. Angles and layouts shifted. A few images were highly detailed while others were extremely simple.
              </p>
              <p>
                Each image could work alone, but together they did not feel like one product. The inconsistency also made the library difficult to extend because every request reopened the same decisions about style, colour, perspective, and level of detail.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/different-illustration-directions.png"
              alt="Eight Branch app screens showing different illustration styles, character treatments, colours, and levels of detail"
              width={2036}
              height={1812}
              caption="The interface used several illustration styles, from dense character scenes to simple object graphics. The issue was visible across strokes, shading, perspective, and complexity."
            />
          </div>

          <div className="cs-issue-grid" aria-label="Why the illustration library needed to change">
            <article>
              <span>01</span>
              <h3>Visual drift</h3>
              <p>Strokes, shading, character details, viewing angles, and layouts changed between screens.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Uneven complexity</h3>
              <p>Some scenes were highly detailed while others were too simple to feel related.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Limited scalability</h3>
              <p>Every new request required the team to reinterpret the visual language from the beginning.</p>
            </article>
          </div>

          <blockquote className="cs-case-pullquote">
            I was not designing a set of illustrations. I was designing the system that could keep producing them.
          </blockquote>
        </div>
      </section>

      <section id="defining-consistency" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="defining-consistency-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Defining consistency</span>
            <h2 id="defining-consistency-title">We aligned on the visual language before automating it.</h2>
            <p>A system could only be as coherent as the decisions encoded inside it.</p>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                Other designers and I first identified the consistency problem. Arushi and I explored visual directions, I led three open review sessions, and Arushi ran the FigJam vote.
              </p>
              <p>
                The selected direction used rounded 3D objects to describe the core action. It gave us enough realism to make materials and actions recognisable without the visual density of character-led scenes.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illust-before.jpg"
              alt="A colourful hand-drawn phone beside a controlled isometric 3D phone"
              width={1024}
              height={1024}
              caption="Two ends of the exploration: a loose expressive treatment and the more controlled, object-led 3D direction."
            />
          </div>

          <div className="cs-issue-grid" aria-label="Principles behind the selected direction">
            <article>
              <span>01</span>
              <h3>Object-led</h3>
              <p>Reduced dependence on skin depiction across markets and focused attention on the product action.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Restrained colour</h3>
              <p>A smaller palette made new illustrations easier to extend as one recognisable family.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Rounded forms</h3>
              <p>Soft geometry made financial actions feel more welcoming while preserving clarity.</p>
            </article>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Colour needed a job, not just a hex value.</h3>
              <p>
                The design team defined a 60/25/10/5 structure. The ratio told the model which surfaces each colour belonged to and how much visual space it could occupy.
              </p>
            </div>
          </div>

          <figure className="illustration-colour-system" aria-labelledby="colour-system-caption">
            <div className="illustration-colour-system__bar" aria-hidden="true">
              <span className="is-grey" />
              <span className="is-blue" />
              <span className="is-navy" />
              <span className="is-contextual" />
            </div>
            <figcaption id="colour-system-caption" className="illustration-colour-system__legend">
              <span><b>60%</b> Grey for primary forms</span>
              <span><b>25%</b> Blue for interaction</span>
              <span><b>10%</b> Navy for anchors</span>
              <span><b>5%</b> Contextual states</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="choosing-a-direction" className="cs-prose section cs-anchor-section" aria-labelledby="choosing-a-direction-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Choosing a direction</span>
            <h2 id="choosing-a-direction-title">I tested three shortcuts before proposing a system.</h2>
            <p>The fastest-looking options solved an immediate asset, but not the next request.</p>
          </div>

          <div className="cs-issue-grid illustration-decision-grid" aria-label="Approaches explored before the Custom GPT">
            <article>
              <span>01</span>
              <h3>Buy an illustration pack</h3>
              <p>A stock library could look consistent quickly, but it would not extend Neem or give Branch reusable visual rules.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Image plus JSON</h3>
              <p>A detailed specification added control but created a separate maintenance burden for every illustration.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Image to image</h3>
              <p>Retexturing a reference still allowed materials, colour balance, and camera treatment to drift.</p>
            </article>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">The stronger idea was to make the rules reusable.</h3>
              <p>
                I proposed a Custom GPT that colleagues could brief in natural language. Instead of asking every person to rebuild the visual context, the system would supply it.
              </p>
              <p>
                In the tools I evaluated, Claude did not give me the raster control I needed, while Gemini Nano Banana did not meet the transparent-alpha requirement. ChatGPT combined image generation, transparent-background output, and a Custom GPT interface that could carry the shared rules.
              </p>
            </div>
          </div>

          <aside className="cs-status-card" aria-label="Selected approach">
            <span className="cs-status-card__label">Selected approach</span>
            <p>
              A Custom GPT with natural-language input, reusable knowledge files, explicit visual rules, and a quality pipeline that escalated final judgment to people.
            </p>
          </aside>
        </div>
      </section>

      <section id="building-the-system" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="building-the-system-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Building the system</span>
            <h2 id="building-the-system-title">I structured it like a design system with an AI renderer.</h2>
            <p>Each layer had one job, one source of truth, and a clear place to absorb feedback.</p>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illustration-gpt-architecture.png"
              alt="Illustration system architecture showing flexible inputs, intelligent processing, stylisation, quality gates, and a standardised output"
              width={1672}
              height={941}
              caption="Reference images and natural-language briefs entered the same processor. The system assigned parts and materials, applied the colour logic, validated the render, and prepared a consistent PNG for review."
            />
          </div>

          <ol className="cs-system-steps" aria-label="Four layers of the illustration system">
            <li><span>01</span><p><strong>Instructions</strong> controlled behaviour, selected ideation or render mode, and locked the non-negotiables.</p></li>
            <li><span>02</span><p><strong>Manifest</strong> orchestrated the sequence and pointed to the correct knowledge files.</p></li>
            <li><span>03</span><p><strong>Rules</strong> defined colour, camera, lighting, composition, prompt contracts, and thresholds.</p></li>
            <li><span>04</span><p><strong>Materials</strong> described surface recipes, required tokens, and failure patterns to block.</p></li>
          </ol>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Two ways in, one quality pipeline.</h3>
              <p>
                Ideation Mode turned a natural-language need into structured concepts. Render Mode used a reference image to identify parts and materials. Both then moved through the same sequence: interpret, assign, colour, generate, validate, and deliver for review.
              </p>
              <p>
                The material-realism gate checked whether surfaces behaved as intended. If metal looked like plastic or rubber became glossy, the system added targeted corrections and rerendered. It could try twice before escalating to a person.
              </p>
            </div>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">What kept breaking</h3>
              <ul className="cs-numbered-list">
                <li>Brand colours drifted between generations.</li>
                <li>Correct colours appeared in the wrong proportions.</li>
                <li>Related states changed lighting, material sheen, or colour balance.</li>
                <li>Surfaces defaulted to chrome, photorealism, generic plastic, or clay.</li>
                <li>Camera angle, centring, shadows, and lighting shifted.</li>
              </ul>
              <p className="cs-turning-line">
                Repeated feedback became a rule. The goal was to make every failure teach the system something reusable.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illust-iteration.jpg"
              alt="A large review board showing many illustration variants across product tasks and states"
              width={6971}
              height={6237}
              caption="The review board shows how one product request could produce several materially different outputs. Feedback from these comparisons tightened the rules in the next version."
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Six versions made the rules enforceable.</h3>
              <p>
                The system passed through more than 500 image-generation iterations, often 10 to 15 for a final illustration. The volume was not about chasing a lucky result. It was how I found the failures that were repeatable enough to become rules.
              </p>
            </div>
          </div>

          <div className="cs-data-table" tabIndex="0" role="region" aria-label="Illustration system version changes">
            <table>
              <thead>
                <tr>
                  <th scope="col">Version</th>
                  <th scope="col">What changed</th>
                  <th scope="col">What improved</th>
                </tr>
              </thead>
              <tbody>
                {systemVersions.map((item) => (
                  <tr key={item.version}>
                    <td>{item.version}</td>
                    <td>{item.change}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="what-changed" className="cs-prose section cs-anchor-section" aria-labelledby="what-changed-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>What changed</span>
            <h2 id="what-changed-title">The team gained a system, not a folder of finished assets.</h2>
            <p>The repeatable context moved into the workflow. Meaning and final quality stayed with people.</p>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                The illustration system is now live across Branch product markets. It gives colleagues a shared starting point for new product visuals and gives reviewers a clearer standard for deciding what belongs in the library.
              </p>
              <p>
                I generated and refined the illustrations. The design team owned quality review and final selection. The Custom GPT carried the repeatable rules, while people still decided what each illustration should communicate and whether it was right for the product moment.
              </p>
            </div>
          </div>

          <div className="illustration-output-grid">
            <CaseStudyFigure
              src="/work/branch-ai/illust-solution-1.jpg"
              alt="Nine Branch illustrations for identity, customer support, email, repayment, biometric login, and status feedback"
              width={2367}
              height={1692}
              caption="A shared camera, restrained palette, and object-led language created a recognisable family across different jobs."
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <CaseStudyFigure
              src="/work/branch-ai/illust-solution-2.jpg"
              alt="Nine Branch illustrations covering loan states, rewards, investments, loans, wallet, success, and waiting"
              width={2367}
              height={1692}
              caption="Contextual colours remained available for state and meaning while the core grey, blue, and navy system stayed dominant."
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">What I learned</h3>
              <p>
                I started this project without knowing whether I could make the idea work. I knew I was comfortable with complex problems, so I relied on the design process: understand the need, explore alternatives, build a small system, test it, and let evidence shape the next version.
              </p>
              <p>
                Research gave me the first direction. Feedback from product managers, UX researchers, and designers gave the system more clarity as I moved forward.
              </p>
              <ol className="cs-numbered-list">
                <li>AI systems improve when context, constraints, and failure conditions are explicit.</li>
                <li>Human judgment is part of the architecture, especially for meaning, inclusivity, and final quality.</li>
                <li>Complex AI work becomes manageable when it is modular, like design-system primitives, tokens, components, and patterns.</li>
                <li>A good system does not remove iteration. It makes each iteration teach the next one.</li>
              </ol>
            </div>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Where I would take it next</h3>
              <ul className="cs-detail-list">
                <li>Convert selected raster illustrations into SVGs and motion-ready assets.</li>
                <li>Extend controlled access to marketing and other teams for presentations and internal projects.</li>
                <li>Package the same instruction and validation logic for another image-generation harness, such as a Codex skill.</li>
                <li>Add a critique layer before human review.</li>
                <li>Improve related-state generation so geometry, lighting, and materials remain even closer across a family.</li>
              </ul>
            </div>
          </div>

          <blockquote className="cs-case-pullquote illustration-closing-quote">
            The system should carry Branch&apos;s standards. People should continue to carry the story.
          </blockquote>
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
