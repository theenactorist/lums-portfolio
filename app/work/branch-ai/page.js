import Link from 'next/link';
import Image from 'next/image';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import ZoomableImage from '../../components/case-studies/ZoomableImage';
import '../ai-copywriting/reference-fonts.css';
import './branch-shell.css';
import styles from './page.module.css';

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'research', label: 'Understanding existing AI use' },
  { id: 'illustration', label: 'Illustration GPT' },
  { id: 'copywriting', label: 'CopyGPT' },
  { id: 'prototyping', label: 'Neem DS Prototyper' },
  { id: 'review', label: 'Feedback and human review' },
  { id: 'results', label: 'Outcomes and recognition' },
  { id: 'learnings', label: 'What I learned' },
];
const illustrationVersions = [
  ['v1', 'Render contract', 'Camera, lighting, transparency, material recognition and a material-realism gate.'],
  ['v2', 'Material coverage', 'More material definitions for different product illustrations.'],
  ['v3', 'Four separate layers', 'Instructions, manifest, rules and materials became distinct references.'],
  ['v4', 'Governance', 'Rule precedence and version traceability made changes easier to follow.'],
  ['v5', 'Colour roles and ratios', 'The design team’s 60/25/10/5 colour structure became part of the rules.'],
  ['v6', 'Pre-delivery colour checks', 'Instructions required a colour check and rerendering when the output missed the rules.'],
];
const copyVersions = [
  ['v1', 'Initial references', 'Defined 30 component types, with 12 populated in the first files.'],
  ['v2', 'Rule precedence', 'Added explicit precedence and seven lint checks.'],
  ['v3', 'Principles and markets', 'Linked rules to brand principles and consolidated market references.'],
  ['v4', 'Text-position coverage', 'Covered component text positions, structured limits and context inference.'],
  ['v5', 'More natural alternatives', 'Relaxed hard minimums and ordered the suggested alternatives.'],
  ['v6', 'Naming and guidance', 'Refined naming, expanded to 15 lint checks and added the operating guide.'],
  ['v7', 'Alignment and validation', 'Aligned List text positions, covered 45 positions and defined 30 lint checks, including anti-verbatim checks.'],
];
function Evidence({ file, alt, caption, width = 1672, height = 941 }) {
  return <figure className={styles.evidence}><ZoomableImage src={`/work/branch-ai/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 767px) 90vw, (max-width: 991px) 80vw, 744px" className={styles.evidenceImage} /><figcaption>{caption}</figcaption></figure>;
}
function EvidenceTable({ caption, columns, rows }) {
  return <div className={styles.tableEvidence}><table><caption>{caption}</caption><thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={columns[index]} data-label={columns[index]}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
function Workflow({ title, note, steps }) {
  return <figure className={styles.workflow}><h3>{title}</h3><ol>{steps.map(step => <li key={step.title}><strong>{step.title}</strong><p>{step.body}</p></li>)}</ol><figcaption>{note}</figcaption></figure>;
}
function Tool({ name, file }) {
  return <span className={styles.tool}><Image src={`/work/ai-copywriting/tools/${file}.svg`} alt="" width={20} height={20} className={file === 'chatgpt' ? styles.chatgptLogo : undefined} />{name}</span>;
}
function SourceExcerpt({ title, file, code, caption }) {
  return <figure className={styles.sourceExcerpt}><h3>{title}</h3><div className={styles.sourceFile}>{file} · original source excerpt</div><pre><code>{code}</code></pre><figcaption>{caption}</figcaption></figure>;
}

export default function BranchAICaseStudy() {
  return (
    <main id="branch-case" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span>Branch</span></nav>
            <h1>Building AI tools for consistent product design</h1>
            <div className={styles.intro}><p>Creating reusable illustration, UX writing and Neem prototyping workflows for Branch’s product team, grounded in brand, market and component rules with human review.</p></div>
          </div>
          <figure className={styles.heroEvidence}>
            <ZoomableImage src="/work/branch-ai/branch-shared-system-thumbnail.png" alt="Generated cover concept showing Branch illustration, reviewed UX copy and a schematic Neem prototype connected by shared visual rules" width={1672} height={941} priority sizes="(max-width: 767px) 90vw, 530px" className={styles.evidenceImage} />
            <figcaption>Generated cover artwork showing the three workflows and a schematic prototype. Original project evidence appears below.</figcaption>
          </figure>
        </header>
        <div className={styles.articleLayout}>
          <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" /></aside>
          <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" /></details>
          <article className={styles.article}>
            <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
              <div className={styles.overviewLabel}>At a glance</div>
              <h2>AI was already part of the team’s work. Branch context and quality standards were missing.</h2>
              <div className={styles.overviewLayout}>
                <dl className={styles.facts}>
                  <div><dt>Company</dt><dd><Image src="/home/work-logos/branch.svg" alt="Branch" width={88} height={26} className={styles.companyLogo} /><span className={styles.companyName}>Branch International</span><a href="https://branch.co" target="_blank" rel="noopener noreferrer">Visit Branch <span aria-hidden="true">↗</span></a></dd></div>
                  <div><dt>Role</dt><dd>Product Designer, AI Systems</dd></div>
                  <div><dt>Core users</dt><dd>5 designers, 4 UX researchers, 15 product managers</dd></div>
                  <div><dt>Markets</dt><dd>India, Kenya, Nigeria</dd></div>
                  <div><dt>Programme period</dt><dd>October 2025–February 2026</dd></div>
                  <div><dt>Tools</dt><dd className={styles.tools}><Tool name="ChatGPT" file="chatgpt" /><span>, </span><Tool name="Claude" file="claude" /><span>, </span><Tool name="Figma Make" file="figma" /></dd></div>
                </dl>
                <div className={styles.overviewCopy}>
                  <p>I built the core systems behind three AI workflows, working with the design team to translate Branch’s product, market and visual rules into tools the wider team could reuse.</p>
                  <h3>Impact TLDR:</h3>
                  <ul>
                    <li><strong>Illustration GPT:</strong> a shared visual direction, refined through six versions. The illustration rollout is live across all product markets.</li>
                    <li><strong>CopyGPT:</strong> Branch-specific UX writing guidance supported <strong>1,778 copy changes</strong> implemented by the product team.</li>
                    <li><strong>Neem DS Prototyper:</strong> interactive prototypes helped PMs make PRD feedback more concrete before high-fidelity design.</li>
                  </ul>
                  <p className={styles.qualification}>Cross-market copy totals include audited India data and directional estimates for Kenya and Nigeria. PM feedback suggested about a 30% reduction in PRD evaluation time; this was not a timed study.</p>
                  <a className={styles.resultLink} href="#results">Outcomes and recognition <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </section>
            <section className={styles.section} id="research" tabIndex={-1}>
              <h2>Understanding how the team already used AI</h2>
              <div className={styles.prose}>
                <p>Branch’s product team works across India, Kenya and Nigeria, supporting onboarding, identity verification, loans, repayments, rewards, accounts and support. Generic AI tools could produce convincing work without understanding which products existed in a market or how Branch communicated with customers.</p>
                <p>A product-team poll reported that 65% used ChatGPT, 20% used Claude and others used Gemini. Conversations and real output reviews helped me understand where individual prompting broke down.</p>
                <EvidenceTable caption="Research inputs and the questions they helped answer" columns={['Input', 'What it helped us understand']} rows={[
                  ['1:1 conversations and Slack DMs', 'How PMs, designers and researchers used AI, and where everyday copy and workflow outputs failed.'],
                  ['Product reviews and presentations', 'Whether the proposed rules and workflows matched the team’s product needs.'],
                  ['Illustration reviews and FigJam voting', 'Which visual direction felt like Branch. Arushi ran the vote; I led three public review sessions.'],
                  ['Direct tool testing', 'Whether designers, PMs, researchers and developers could use the workflows in real work.'],
                ]} />
                <div className={styles.findings}>
                  <h3>Repeated failures became requirements</h3>
                  <dl>
                    <div><dt>Product and market context</dt><dd>Copy could name an unavailable product or use unfamiliar local terminology. The workflow needed explicit product rules and market references.</dd></div>
                    <div><dt>Voice and component context</dt><dd>A polished sentence could still be wrong for a CTA, error or empty state. Brand principles needed to work alongside component constraints.</dd></div>
                    <div><dt>A shared visual language</dt><dd>Illustrations used different styles across product surfaces. The team needed reusable rules for colour, materials, lighting and composition.</dd></div>
                    <div><dt>Branch interaction patterns</dt><dd>Generic Claude prototypes did not understand Neem components or Branch screen patterns. Prototyping needed design-system context and review.</dd></div>
                  </dl>
                </div>
                <p>I treated each workflow as an internal product: identify its users, document its failure modes, define rules, test outputs and keep an approval point before product use.</p>
                <details className={styles.disclosure}><summary>Original programme overview</summary><Evidence file="three-ai-workflows.jpg" alt="Historical Branch programme diagram showing illustration, copywriting and Neem prototyping workflows" caption="Original conceptual programme diagram, preserved for context. Its timing, high-fidelity and team-size wording is historical summary language, rather than current measurement or recorded product output. The approved scope and qualified outcomes are stated in this case." /></details>
              </div>
            </section>
            <section className={styles.section} id="illustration" tabIndex={-1}>
              <h2>Illustration GPT: turning a visual direction into a reusable system</h2>
              <div className={styles.prose}>
                <p>Other designers and I identified the consistency problem. Product screens mixed flat, outlined and dimensional illustrations, making new assets another round of sourcing and style decisions.</p>
                <Evidence file="different-illustration-directions.png" width={2036} height={1812} alt="Eight original Branch product screens with different illustration styles across loans, email, investments, identity verification and rewards" caption="The original product screens show the mixed illustration directions the team was trying to bring together." />
                <p>I explored the direction with Arushi. Her FigJam vote, my three public review sessions and the design team’s quality review helped turn preferences into a shared visual direction. The design team defined the colour system, including the 60/25/10/5 structure.</p>
                <h3>Four layers made the direction repeatable</h3>
                <p>I wrote the system instructions and JSON rules, built the manifest and material catalogue, and designed and implemented the render pipeline. Render Mode started from a reference image; Ideation Mode proposed concepts from a brief before rendering the selected idea. Both used the same pipeline.</p>
                <div className={styles.findings}>
                  <h3>The Illustration GPT references</h3>
                  <dl>
                    <div><dt>Instructions</dt><dd>How to interpret a brief, choose a mode, generate an illustration and review the result.</dd></div>
                    <div><dt>Manifest</dt><dd>Which reference files and versions the system should use together.</dd></div>
                    <div><dt>Rules</dt><dd>The shared colour, composition, camera, lighting and background constraints.</dd></div>
                    <div><dt>Materials</dt><dd>Reference definitions for consistent material appearance and realism.</dd></div>
                  </dl>
                </div>
                <SourceExcerpt title="Style decisions became explicit instructions" file="system_prompt_v1.6.md" code={'- Shape: rounded rectangles, square buttons, clean edges, subtle chamfers\n- Lighting: soft top-left studio, neutral white balance, diffused highlights\n- Camera: 45° isometric, mild perspective, 35mm, centered, never crop\n- Composition: single object centered; modular = floating grid with even gaps\n- Background: TRUE TRANSPARENT alpha + soft ground shadow only'} caption="The original v6 prompt documents the camera, lighting, composition and background decisions behind the illustration language. This excerpt describes instructions, rather than an independent visual-quality measurement." />
                <p>The material-realism gate could request up to two rerenders before escalating to a person. More than 500 image-generation iterations were completed, often 10–15 for a final illustration. The design team reviewed quality and made the final selection.</p>
                <details className={styles.disclosure}><summary>Six versions of illustration refinement</summary><div className={styles.disclosureBody}><EvidenceTable caption="Documented Illustration GPT file iterations" columns={['Version', 'Focus', 'What changed']} rows={illustrationVersions} /><p className={styles.qualification}>These are documented system versions. They do not establish six production releases or six separate testing rounds.</p></div></details>
                <h3>The resulting illustration language</h3>
                <div className={styles.evidencePair}>
                  <Evidence file="illust-solution-1.jpg" width={2367} height={1692} alt="Original Branch illustration export showing identity, OTP, support, email, due date, biometrics, PIN and success illustrations" caption="Identity, support and account moments in the shared illustration language." />
                  <Evidence file="illust-solution-2.jpg" width={2367} height={1692} alt="Original Branch illustration export showing loan application states, rewards, investments, loans, wallets and an hourglass" caption="Product and status illustrations selected and reviewed by the design team." />
                </div>
                <p>The rollout is now live across all product markets. Clearer style rules eased illustration sourcing and reduced repeated visual corrections; the project does not provide a measured time-saving figure.</p>
              </div>
            </section>
            <section className={styles.section} id="copywriting" tabIndex={-1}>
              <h2>CopyGPT: giving every team a shared basis for UX writing</h2>
              <div className={styles.prose}>
                <p>Colleagues used Gemini, ChatGPT, Claude, Perplexity and Google Search to create copy. They had Branch’s brand principles, but no shared base of product and component guidance governing those outputs. Reviewing one line could consume 20 minutes of a design-review session. This is an owner-reported example of the problem.</p>
                <p>The goal was to standardise UX writing in Branch’s voice, with consistent tone, casing and product and market context. I owned the project from discovery through implementation, with substantial help from colleagues.</p>
                <p>Other designers collected and cleaned feature documentation for their markets. The team collectively defined component guardrails, while I owned lint and version tuning. That context became the reference material behind the workflow.</p>
                <Workflow title="From individual prompts to reviewed product copy" note="A summary of the documented workflow. Validation steps are instructions followed by the LLM, rather than a separate deterministic validator." steps={[
                  { title: 'Identify the screen and component', body: 'Use the request and available screen context to recognise the product moment and text position.' },
                  { title: 'Select Branch references', body: 'Apply market requirements, component rules, brand defaults and fallback guidance in that order.' },
                  { title: 'Generate, check and revise', body: 'Instruct the LLM to review its suggestions against length, casing, terminology, punctuation and other lint rules.' },
                  { title: 'Review in the implementation tracker', body: 'The team reviews original and proposed copy with rationale. Engineers implement the approved changes, then update the tracker.' },
                ]} />
                <h3>Seven file iterations, followed by Skill packaging</h3>
                <p>The prototype moved from a ChatGPT Custom GPT to a Claude Project and then a Claude Skill. The team judged Claude stronger for this writing task. The final internal harness was Claude Chat with the Skill enabled.</p>
                <details className={styles.disclosure}><summary>What changed from v1 to v7</summary><div className={styles.disclosureBody}><EvidenceTable caption="Documented CopyGPT reference-file iterations" columns={['Version', 'Focus', 'What changed']} rows={copyVersions} /><p className={styles.qualification}>Seven version folders prove file iterations, rather than seven successful releases or measured improvement after each change. The v7 operating guide and JSONs preceded the later Skill package.</p></div></details>
                <h3>Small copy changes made the next action clearer</h3>
                <EvidenceTable caption="Implemented India tracker examples" columns={['Product moment', 'Original', 'Implemented']} rows={[
                  ['The next tap opens the camera', 'Continue', 'Start Camera'],
                  ['Requesting an authentication code', 'Send OTP', 'Get OTP'],
                  ['PAN verification, empty field', 'Step 2 of 5: Verify PAN', 'Step 2 of 5: Enter PAN'],
                  ['PAN verification, already filled', 'Step 2 of 5: Verify PAN', 'Step 2 of 5: Confirm PAN'],
                ]} />
                <p>The same original PAN instruction needed different wording depending on the screen state. The tracker records implemented changes; it does not establish which version generated each historical rewrite.</p>
                <p>I collaborated with one product manager and one engineer from each market for implementation. Original copy, proposed copy and rationale went into a shared Google Sheet, with human review before engineering changes.</p>
                <div className={styles.caseLink}><h3>Explore the full CopyGPT case</h3><p>The separate UX-writing case covers the product dataset, component rules, v7 processing sequence, detailed tracker evidence and visitor chat.</p><Link href="/work/ai-copywriting">How I standardised UX writing at Branch <span aria-hidden="true">↗</span></Link></div>
              </div>
            </section>
            <section className={styles.section} id="prototyping" tabIndex={-1}>
              <h2>Neem DS Prototyper: making PRD feedback concrete earlier</h2>
              <div className={styles.prose}>
                <p>PMs could already use Claude to make rough prototypes. Those outputs did not understand Branch’s UX patterns: how screens were structured, which Neem components to use or how a product idea should move through the app.</p>
                <p>I created a workflow connecting PRD input, Claude Skill interpretation, Figma MCP context, Neem component mapping, token-compliant React prototypes, stakeholder review and PRD refinement. Neem is Branch’s design system.</p>
                <Workflow title="A PRD becomes something stakeholders can try" note="Reconstructed from the approved project record and Neem Skill. React and token compliance describe the instructed prototype workflow; they are not evidence of a production release or a measured compliance score." steps={[
                  { title: 'Start with the PRD or screen description', body: 'Make the product intent and expected interactions explicit before generating a screen.' },
                  { title: 'Bring in Branch design context', body: 'Use the Claude Skill and Figma MCP context to identify relevant Neem components, tokens and screen patterns.' },
                  { title: 'Map the interface to Neem', body: 'Follow component substitution and token rules when producing the React prototype.' },
                  { title: 'Review the interaction with stakeholders', body: 'PMs, designers and developers try the prototype and give feedback on the product thinking.' },
                  { title: 'Refine the PRD before high-fidelity design', body: 'Use concrete interaction feedback to improve the requirements and identify remaining questions.' },
                ]} />
                <h3>Design-system knowledge lived in the Skill</h3>
                <p>The Claude Skill carried component decision guides, token definitions, screen composition rules and component JSX and CSS. A Figma-linked request could bring in a screenshot, design context and variable definitions; a screen description followed a separate path. References were loaded for the components needed in that screen.</p>
                <SourceExcerpt title="Map an interface element to a Neem component" file="claude-skill/SKILL.md" code={'- Button → `ButtonStack`\n- Text/heading block → `TextBlock` (pick variant from decision guide)\n- Input → `TextField` / `ChatTextField` / `PasscodeField` / `SearchField`\n- Progress bar → `LinearProgressIndicator` or `StepIndicator`\n- Screen header → `TopAppBar` (pick variant from decision guide)'} caption="These exact substitution rules show how the prototype was instructed to use Branch components. Variant choice and screen context still had to be checked." />
                <SourceExcerpt title="Use shared tokens in the component’s CSS" file="claude-skill/resources/buttons.md" code={'.btn--primary {\n  background-color: var(--neem-surface-primary);\n  color: var(--neem-text-on-primary);\n  border-radius: var(--neem-radius-medium);\n}\n.btn--primary:hover:not(:disabled) { opacity: 0.88; }'} caption="The original ButtonStack reference uses Neem tokens for colour and shape, alongside interaction-state styling. This is a source excerpt, rather than a recorded generated response or a live prototype." />
                <p>PMs, designers and developers tested the workflow. General PM feedback suggested about a 30% reduction in PRD evaluation time. This is directional feedback rather than a timed comparison.</p>
                <p>The practical value was earlier alignment: stakeholders could respond to an interaction alongside the written requirements, before the team invested in high-fidelity design.</p>
              </div>
            </section>
            <section className={styles.section} id="review" tabIndex={-1}>
              <h2>Human review stayed inside every workflow</h2>
              <div className={styles.prose}>
                <p>Each workflow had a different quality question. Illustration reviews checked visual alignment and material treatment. Copy reviews checked product truth, market language and the component’s purpose. Prototyping reviews checked whether the interaction helped evaluate the PRD.</p>
                <EvidenceTable caption="Review responsibilities across the three workflows" columns={['Workflow', 'System support', 'Human decision']} rows={[
                  ['Illustration GPT', 'Reusable style rules and rerender instructions', 'The design team reviewed output quality and selected the final assets.'],
                  ['CopyGPT', 'Product, market, brand and component references, with lint instructions', 'The team reviewed suggested changes; engineers implemented copy that passed review.'],
                  ['Neem DS Prototyper', 'Neem component and token guidance for React prototypes', 'PMs, designers and developers tested the interaction and refined the PRD.'],
                ]} />
                <p>Deovrat’s one-to-one check-ins helped keep the work aligned with the objective. Conversations, show-and-tell sessions and direct testing gave me a way to tune the systems around real work.</p>
              </div>
            </section>
            <section className={styles.section} id="results" tabIndex={-1}>
              <h2>Outcomes and recognition</h2>
              <div className={styles.prose}>
                <p>The programme moved the team from individual prompting toward shared, Branch-specific AI workflows. Its contribution was reusable context, clearer quality checks and a more consistent starting point for product work.</p>
                <figure className={styles.metrics}>
                  <dl><div><dt>530</dt><dd>Screen-flow appearances reviewed</dd></div><div><dt>4,390</dt><dd>UI component instances audited</dd></div><div><dt>1,778</dt><dd>Copy changes implemented by the product team</dd></div></dl>
                  <figcaption>CopyGPT cross-market summary: India totals were audited; Kenya and Nigeria figures include directional estimates. These are instance counts, rather than unique screens or unique strings.</figcaption>
                </figure>
                <p>Illustration rollout is live in all product markets. Copywriting turnaround improved directionally. For the Neem DS Prototyper, general PM feedback suggested about a 30% reduction in PRD evaluation time. The available record does not establish numerical adoption or accuracy results.</p>
                <blockquote className={styles.quote}><p>“He is an AI-native builder with a designer’s eye and a PM’s brain.”</p><footer><span className={styles.avatar} aria-hidden="true">DD</span><div><strong>Deovrat Dwivedi</strong><br />Design Lead, Branch International</div></footer></blockquote>
                <details className={styles.disclosure}><summary>Original recognition message</summary><Evidence file="kudos.jpeg" width={1536} height={1456} alt="Original Slack recognition from Deovrat Dwivedi for Olumide’s Branch AI work" caption="Historical recognition message. Its embedded accuracy and timing claims are superseded; use the qualified outcome record above. The approved quotation is reproduced separately." /></details>
              </div>
            </section>
            <section className={styles.section} id="learnings" tabIndex={-1}>
              <h2>What I learned</h2>
              <div className={styles.prose}>
                <h3>Useful AI starts with the team’s context</h3><p>The workflows became more useful when they understood a real product moment, local terminology, component constraints and visual rules. Building that reference material required collaboration and documentation.</p>
                <h3>Guardrails need tuning</h3><p>Too little guidance left outputs generic. Overly strict rules could make them rigid. Iterating the references, testing outputs and cleaning inconsistent component names mattered as much as choosing a model.</p>
                <h3>Reuse still needs human judgement</h3><p>A shared workflow helps teams start closer to an appropriate answer. Designers, engineers and PMs still decide whether an illustration, string or prototype fits the product before it moves forward.</p>
              </div>
              <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/shiga-onboarding">Cutting time to value with Shiga’s passkey-led onboarding <span aria-hidden="true">↗</span></Link></nav>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
