import Link from 'next/link';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import ZoomableImage from '../../components/ZoomableImage';

const phases = [
  { id: 'the-missing-layer', label: 'The missing layer' },
  { id: 'finding-a-visual-language', label: 'Finding a visual language' },
  { id: 'from-assets-to-a-system', label: 'From assets to a system' },
  { id: 'making-consistency-enforceable', label: 'Making consistency enforceable' },
  { id: 'what-shipped', label: 'What shipped' },
];

const systemVersions = [
  {
    version: 'Iteration 1',
    title: 'Establish the render contract',
    description: 'The first version fixed the camera, lighting, transparent output, material recognition, and material-realism gate. A visual preference became an initial production contract.',
  },
  {
    version: 'Iteration 2',
    title: 'Expand the material language',
    description: 'Natural materials and stronger failure exclusions were added. The system learned that identifying a surface was only useful when it also knew how that surface should behave and what it must not become.',
  },
  {
    version: 'Iteration 3',
    title: 'Separate the system into layers',
    description: 'Instructions, structured ideation, reproducibility fields, and material guardrails were separated. Routing, visual rules, and material recipes stopped competing as duplicated sources of authority.',
  },
  {
    version: 'Iteration 4',
    title: 'Make the system governable',
    description: 'Precedence, provenance, compatibility, and a one-question clarification policy were introduced. A render could be traced to the file versions and settings that produced it.',
  },
  {
    version: 'Iteration 5',
    title: 'Turn colour into a system',
    description: 'Approved hex values became defined roles, surface-area targets, contextual limits, part assignments, and ratio validation. The system moved from having the right colours to using them in the right hierarchy.',
  },
  {
    version: 'Iteration 6',
    title: 'Make validation mandatory',
    description: 'Pre-delivery colour validation became required. Outputs outside the accepted allocation were corrected and rerendered before human review for meaning and final selection.',
  },
];

const systemLayers = [
  {
    number: '01',
    title: 'Instructions',
    role: 'The system contract',
    filename: 'system_prompt_v1.6.md',
    language: 'Markdown',
    description: 'Routes the request, applies the non-negotiables, and controls when the system should ideate, render, validate, or ask a question.',
    code: `IDEA SCOUT (when no image attached)
1. Propose 8-10 ideas across: Product hardware, UI-on-device,
   Payment/fintech, Compliance/KYC, Support/ops,
   Abstract brand, Seasonal/Travel
2. Each idea: Title (≤7 words), one-line story, camera,
   lighting, parts list, color assignments, candidate materials
3. User picks 1-3 ideas → render

MATERIAL ASSIGNMENT
- Segment parts → apply part_defaults → apply domain_overrides
- Apply color_system (hierarchy → part_type → area)
- Stylize ALL materials to 60/25/10/5 palette

Guardrails:
- Glass panels → Blue content
- Paper → Grey with Navy print
- Rubber → Navy (not black)`,
  },
  {
    number: '02',
    title: 'Manifest',
    role: 'The operating map',
    filename: 'illustration_gpt_manifest_v1.6.json',
    language: 'JSON',
    description: 'Points to the authoritative knowledge files and defines the default output contract used by every render.',
    code: `"render_defaults": {
  "lighting": "From rules_branch_v1.6.json style profile",
  "camera_view": "From rules_branch_v1.6.json style profile",
  "aspect_ratio": "1:1",
  "resolution_min": "2048x2048",
  "resolution": "4096x4096",
  "background": "transparent-with-soft-ground-shadow",
  "output_format": "PNG",
  "alpha_required": true,
  "seed": "auto",
  "variant_count": 1,
  "export_naming": "branch_modular_icons/<slug>_v{version}_{resolution}_s{seed}_{style}.png",
  "sampler": "auto",
  "steps": "auto"
}`,
  },
  {
    number: '03',
    title: 'Rules',
    role: 'The visual system',
    filename: 'rules_branch_v1.6.json',
    language: 'JSON',
    description: 'Defines the palette boundaries and the constraints that stop colour and rendering decisions from drifting.',
    code: `"constraints": {
  "no_pure_black": {
    "forbidden": "#000000",
    "reason": "Maintains controlled aesthetic"
  },
  "no_pure_white": {
    "forbidden": "#FFFFFF",
    "reason": "Maintains controlled aesthetic"
  },
  "saturation_ceiling": {
    "max_percent": 70,
    "reason": "Prevents accents from overpowering the palette"
  },
  "contextual_budget": {
    "max_percent": 5,
    "reason": "Keeps contextual colors subordinate to core palette"
  }
}`,
  },
  {
    number: '04',
    title: 'Materials',
    role: 'The surface recipes',
    filename: 'materials_branch_v1.6.json',
    language: 'JSON',
    description: 'Turns a material into physical properties, prompting language, exclusions, and an approved colour treatment.',
    code: `"polycarbonate_matte": {
  "pbr": {
    "metalness": 0.0,
    "roughness": 0.45,
    "specular": 0.25,
    "ior": 1.58
  },
  "prompt": {
    "positive": [
      "matte polycarbonate shell",
      "soft microtexture"
    ],
    "negative": [
      "gloss coat",
      "brushed metal"
    ]
  },
  "stylization": {
    "primary_color": "grey",
    "primary_hex": "#D9D9D9",
    "accent_color": "blue",
    "accent_hex": "#187BC2",
    "notes": "Bodies in Grey; buttons/accents in Blue"
  }
}`,
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

function highlightJsonLine(line, lineIndex) {
  const tokens = [];
  const tokenPattern = /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?)|\b(true|false|null)\b|([{}\[\],:])/g;
  let cursor = 0;
  let match;
  let tokenIndex = 0;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > cursor) tokens.push(line.slice(cursor, match.index));

    let className = 'syntax-punctuation';
    if (match[1]) className = 'syntax-key';
    if (match[2]) className = 'syntax-string';
    if (match[3]) className = 'syntax-number';
    if (match[4]) className = 'syntax-literal';

    tokens.push(
      <span className={className} key={`${lineIndex}-${tokenIndex}`}>
        {match[0]}
      </span>,
    );
    cursor = tokenPattern.lastIndex;
    tokenIndex += 1;
  }

  if (cursor < line.length) tokens.push(line.slice(cursor));
  return tokens;
}

function highlightMarkdownLine(line, lineIndex) {
  if (/^[A-Z][A-Z\s]+(?:\s\([^)]*\))?$/.test(line)) {
    return <span className="syntax-heading">{line}</span>;
  }

  const tokens = [];
  const tokenPattern = /(^\s*(?:\d+\.|-))|(→|≤)|(#(?:[0-9A-Fa-f]{6}))/g;
  let cursor = 0;
  let match;
  let tokenIndex = 0;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > cursor) tokens.push(line.slice(cursor, match.index));
    const className = match[1] ? 'syntax-marker' : match[2] ? 'syntax-operator' : 'syntax-colour';
    tokens.push(
      <span className={className} key={`${lineIndex}-${tokenIndex}`}>
        {match[0]}
      </span>,
    );
    cursor = tokenPattern.lastIndex;
    tokenIndex += 1;
  }

  if (cursor < line.length) tokens.push(line.slice(cursor));
  return tokens;
}

function HighlightedCode({ code, language }) {
  return (
    <code>
      {code.split('\n').map((line, lineIndex) => (
        <span className="syntax-line" key={`${language}-${lineIndex}`}>
          {language === 'JSON' ? highlightJsonLine(line, lineIndex) : highlightMarkdownLine(line, lineIndex)}
        </span>
      ))}
    </code>
  );
}

function SystemLayer({ layer }) {
  return (
    <article className="illustration-code-layer">
      <div className="illustration-code-layer__intro">
        <span className="illustration-code-layer__number">Layer {layer.number}</span>
        <div>
          <p className="illustration-code-layer__role">{layer.role}</p>
          <h3>{layer.title}</h3>
          <p>{layer.description}</p>
        </div>
      </div>

      <div className="illustration-code-window">
        <div className="illustration-code-window__bar">
          <span>{layer.filename}</span>
          <span>{layer.language} · verified v1.6 excerpt</span>
        </div>
        <pre tabIndex="0" aria-label={`${layer.title} code excerpt from ${layer.filename}`}>
          <HighlightedCode code={layer.code} language={layer.language} />
        </pre>
      </div>
    </article>
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
                Designing a reusable AI illustration workflow that used a Custom GPT to turn natural-language requests into consistent 3D illustrations for Branch&apos;s mobile products.
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
              <dt className="cs-meta__label">Illustration work</dt>
              <dd className="cs-meta__value">Dec 2025–Feb 2026</dd>
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
              <dd className="cs-meta__value">Illustrations shipped</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cs-prose illustration-overview" aria-labelledby="overview-title">
        <div className="container">
          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p className="cs-prose__label">Overview</p>
              <h2 id="overview-title">The product had one interface system and several illustration languages.</h2>
              <p>
                Branch had already invested in making its mobile product feel like one system. Neem, the company&apos;s internal design system, was created in Figma, translated into matching front-end components with engineers, and connected to code through Figma Code Connect. Existing screens across products and markets had been redesigned around the same components, colour tokens, and dark-theme support.
              </p>
              <p className="cs-turning-line">Illustrations were the exception.</p>
              <p>
                The design system standardised the Image and Illustration Blocks, but it did not govern the artwork placed inside them. When a new flow needed an illustration, designers often searched Google or Freepik and selected whatever worked for the immediate screen.
              </p>
              <p>
                That inconsistency weakened the wider migration and would become harder to correct as the app grew. The response was a Custom GPT that turned a natural-language request into a constrained product illustration, checked the output against shared visual rules, and returned it for human review.
              </p>
              <p>
                My role began with a question: could the team&apos;s chosen visual direction become a system another designer could use? The answer emerged through research, failed outputs, design QA, and feedback from product managers and researchers. Across six documented versions and more than 500 image-generation iterations, that work grew into instructions, JSON rules, a manifest, material catalogue, and render pipeline. The design team retained final quality review and selection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyProgressRail phases={phases} />

      <section id="the-missing-layer" className="cs-prose section cs-anchor-section" aria-labelledby="the-missing-layer-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>The missing layer</span>
            <h2 id="the-missing-layer-title">The interface had a system. The artwork inside it did not.</h2>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                Neem gave designers and engineers a shared way to build product screens. Its components controlled layout, behaviour, typography, colour, and theme. The illustration component controlled where an image appeared, but not what that image looked like.
              </p>
              <p>
                That gap became visible whenever a designer needed artwork for a feature or product state. One screen might use a detailed character scene, another a flat object, and another a heavily shaded graphic. Strokes, camera angles, colour balance, composition, and complexity changed from one request to the next.
              </p>
              <p>
                Each image could work on its own. Together, they made the product feel assembled from different visual systems.
              </p>
              <p>
                The cost went beyond appearance. Every request reopened decisions the design system was supposed to make reusable. As the app expanded, the illustration debt would expand with it.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/different-illustration-directions.png"
              alt="Eight Branch app screens showing different illustration styles, character treatments, colours, and levels of detail"
              width={2036}
              height={1812}
              caption="The surrounding interface followed Neem, while the illustrations varied in strokes, shading, character treatment, perspective, and complexity."
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">The brief changed from replacing images to defining a language.</h3>
              <p>
                A fixed asset library would solve only the screens already known. The real requirement was a method that another designer could use for a new feature, product state, or market without restarting the art direction.
              </p>
              <ol className="cs-numbered-list illustration-inline-questions">
                <li>What makes an illustration recognisably part of this product?</li>
                <li>How can those decisions survive the next generation request?</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="finding-a-visual-language" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="finding-a-visual-language-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Finding a visual language</span>
            <h2 id="finding-a-visual-language-title">Consistency had to be defined before it could be generated.</h2>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                The design team explored four broad directions: Notion-style line art, character-led cartoons, abstract geometric scenes, and object-led 3D. A FigJam vote and three wider review sessions helped compare them against the product rather than personal preference.
              </p>
              <p>
                Object-led 3D gave the strongest balance of clarity, inclusiveness, and repeatability. Keeping people out of the scene reduced dependence on skin depiction across different markets. Rounded objects felt welcoming, complemented Neem&apos;s visual direction, and kept attention on the product action. During the project, ChatGPT also reproduced this treatment more reliably than the other explored styles.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illust-before.jpg"
              alt="A colourful hand-drawn phone beside a controlled isometric 3D phone"
              width={1024}
              height={1024}
              caption="Four visual directions were compared before the system work began. The selected direction used rounded 3D objects to describe the core action without relying on character-led scenes."
            />
          </div>

          <div className="cs-issue-grid illustration-direction-principles" aria-label="Principles behind the selected direction">
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
              <h3 className="illustration-subheading">The visual direction became a set of fixed decisions.</h3>
              <p>
                The selected style was still too broad for reliable generation. It had to be described through variables that could be checked: object shape, camera, lighting, composition, background, material behaviour, colour role, and colour allocation.
              </p>
              <p>
                The design team defined a 60/25/10/5 colour structure. The ratios gave each colour a job. Approved hex values alone could not prevent a render from becoming mostly blue or placing contextual colours on the wrong surfaces.
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

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <p>
                Product-manager reviews exposed the same problem in other variables. Related illustrations changed camera angle, lighting, or material sheen. In some cases, the image was visually polished but did not communicate the intended product meaning clearly enough.
              </p>
              <p className="cs-turning-line">Those were not isolated mistakes. They were requirements the system had not captured yet.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="from-assets-to-a-system" className="cs-prose section cs-anchor-section" aria-labelledby="from-assets-to-a-system-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>From assets to a system</span>
            <h2 id="from-assets-to-a-system-title">Three quicker approaches still left the next request unsolved.</h2>
          </div>

          <div className="cs-issue-grid illustration-decision-grid" aria-label="Approaches explored before the Custom GPT">
            <article>
              <span>01</span>
              <h3>Purchase an illustration pack</h3>
              <p>A stock pack could create immediate visual consistency. It could not extend Neem, encode Branch&apos;s colour logic, or give the team control over how the language evolved.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Use one JSON specification per image</h3>
              <p>A detailed JSON prompt added control to one image. Maintaining a separate specification for every asset would create another library to update and another source of inconsistency.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Retexture one image from another</h3>
              <p>Repeated generations still changed materials, colour balance, camera treatment, and composition. The reference helped the current render without protecting the next one.</p>
            </article>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <p className="cs-turning-line">The reusable output had to be the rules, not the image.</p>
              <h3 className="illustration-subheading">A Custom GPT made those rules available at the point of creation.</h3>
              <p>
                ChatGPT was selected as the harness because it combined the required raster image generation, transparent-background output, reusable knowledge files, and a shareable Custom GPT interface. A colleague could describe the product moment in natural language while the system supplied the visual context they should not have to reconstruct.
              </p>
              <p>
                Ideation Mode turned a product need into several structured visual concepts before rendering. Render Mode accepted a reference image, identified its parts, and rebuilt it through the same visual system. Both modes entered one shared quality pipeline.
              </p>
            </div>
          </div>

          <aside className="cs-status-card" aria-label="Selected approach">
            <span className="cs-status-card__label">Selected approach</span>
            <p>
              A Custom GPT with natural-language input, reusable knowledge files, explicit visual rules, and a validation pipeline that returned final judgment to people.
            </p>
          </aside>
        </div>
      </section>

      <section id="making-consistency-enforceable" className="cs-prose section cs-anchor-section cs-section--warm" aria-labelledby="making-consistency-enforceable-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>Making consistency enforceable</span>
            <h2 id="making-consistency-enforceable-title">Every recurring failure needed a home in the system.</h2>
            <p>The architecture was organised like a design system. Each layer owned a different kind of decision, which made feedback easier to place and failures easier to trace.</p>
          </div>

          <div className="illustration-code-layers" aria-label="Four verified layers of the illustration system">
            {systemLayers.map((layer) => (
              <SystemLayer key={layer.number} layer={layer} />
            ))}
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illustration-gpt-architecture.png"
              alt="Illustration system architecture showing flexible inputs, intelligent processing, stylisation, quality gates, and a standardised output"
              width={1672}
              height={941}
              caption="The architecture separated input, processing, visual rules, quality checks, and output so that each failure could be corrected in the layer responsible for it."
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Two inputs entered one render and validation pipeline.</h3>
              <p>
                A natural-language request or reference image moved through the same sequence: interpret the request, segment the parts, assign materials, apply colour roles, generate, validate, and deliver for human review.
              </p>
              <p>
                The material-realism gate checked whether surfaces behaved as intended. When a failure was detected, the system added targeted corrections and rerendered up to twice before escalating to a person.
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
                The useful result was not the lucky render. It was the rule that reduced the chance of repeating the same failure.
              </p>
            </div>
          </div>

          <div className="illustration-figure--wide">
            <CaseStudyFigure
              src="/work/branch-ai/illust-iteration.jpg"
              alt="A large review board showing many illustration variants across product tasks and states"
              width={6971}
              height={6237}
              caption="Repeated comparisons exposed colour, camera, material, and interpretation failures. Design QA and review feedback determined which failures became system rules in the next version."
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">Six iterations turned feedback into governance.</h3>
              <p>
                More than 500 image-generation iterations exposed failure patterns that a small set of polished outputs would have hidden. A final illustration often took 10 to 15 generations.
              </p>
              <p>
                Four inputs shaped the versions: output analysis, design QA, product-manager reviews, and design-team feedback. Each recurring problem moved into the instruction, manifest, rule, material, or validation layer responsible for preventing it.
              </p>
            </div>
          </div>

          <div className="illustration-iterations" aria-label="Six documented system iterations">
            {systemVersions.map((item) => (
              <article className="illustration-iteration" key={item.version}>
                <p className="illustration-iteration__label">{item.version}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="what-shipped" className="cs-prose section cs-anchor-section" aria-labelledby="what-shipped-title">
        <div className="container">
          <div className="cs-phase-heading">
            <span>What shipped</span>
            <h2 id="what-shipped-title">The result was a reusable way to create and review illustrations.</h2>
          </div>

          <div className="cs-prose__row">
            <div className="cs-prose__content">
              <p>
                The finished workflow accepted a request or reference image, applied the same visual and material rules, validated the output, and handed the result to a person. The design team still decided whether the illustration communicated the right idea and belonged in the product.
              </p>
              <p>
                The resulting illustrations now appear in shipped production screens in the Branch mobile app across product markets. Employees responded positively to the vibrancy they added, while directional customer feedback indicated that the new illustrations were clearer to understand.
              </p>
            </div>
          </div>

          <div className="illustration-output-grid">
            <CaseStudyFigure
              src="/work/branch-ai/illust-solution-1.jpg"
              alt="Nine Branch illustrations for identity, customer support, email, repayment, biometric login, and status feedback"
              width={2367}
              height={1692}
              caption="A shared camera, restrained palette, material language, and object-led composition created one recognisable family across different product jobs and states."
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <CaseStudyFigure
              src="/work/branch-ai/illust-solution-2.jpg"
              alt="Nine Branch illustrations covering loan states, rewards, investments, loans, wallet, success, and waiting"
              width={2367}
              height={1692}
              caption="Contextual colours remained available for state and meaning while the core grey, blue, and navy roles stayed dominant."
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className="illustration-figure--wide illustration-recognition">
            <CaseStudyFigure
              src="/work/branch-ai/kudos.jpeg"
              alt="Recognition from design manager Deovrat Dwivedi describing the patience, precision, and iteration behind the Illustration GPT project"
              width={1439}
              height={1443}
              caption="Deovrat Dwivedi, the design manager for this work, recognised the patience, precision, and iteration behind the Illustration GPT project."
            />
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">What the work taught me</h3>
              <p>
                The project began without a guarantee that the idea could be made reliable. Research and design thinking made the uncertainty manageable: define one decision, test it, examine the failure, and move what was learned into the system.
              </p>
              <p>Three lessons stayed with me:</p>
              <ol className="cs-numbered-list">
                <li>AI systems improve when context, constraints, and failure conditions are explicit.</li>
                <li>Human judgment belongs inside the architecture, especially for meaning, inclusiveness, and final quality.</li>
                <li>Complex AI work becomes easier to build and debug when it is modular, like design-system primitives, tokens, components, and patterns.</li>
              </ol>
            </div>
          </div>

          <div className="cs-prose__row cs-prose__row--spaced">
            <div className="cs-prose__content">
              <h3 className="illustration-subheading">One useful next step</h3>
              <p>
                Convert selected raster outputs into SVG and motion-ready assets. The illustration system already governs how the visual language is created. Extending it into motion would let the same language support richer product feedback without reopening the art direction.
              </p>
            </div>
          </div>

          <blockquote className="cs-case-pullquote illustration-closing-quote">
            The workflow carries the repeatable decisions. People remain responsible for what each illustration means.
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
