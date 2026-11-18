import Link from '../../components/SiteLink'
import Image from 'next/image'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import Timeline from '../../components/CaseStudyTimeline'
import './agile-shell.css'
import ZoomableImage from '../pulse/PulseImage'
import HeroMedia from './HeroMedia'
import SystemDiagram from './SystemDiagram'
import PathDiagram from './PathDiagram'
import styles from './agile.module.css'
import { heliumHeadline } from '../../data/productionHomeProjects'

// Copy: HANDOVER.md “T15 copy” (approved by Olumide, 18 Nov 2026). Unlisted until he approves the page.
const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'start', label: 'Where it started' },
  { id: 'system', label: 'The system' },
  { id: 'path', label: 'Documentation to production' },
  { id: 'quality', label: 'Quality in the loop' },
  { id: 'changed', label: 'What changed' },
  { id: 'teach', label: 'What I’d teach' },
  { id: 'next', label: 'What’s next' },
]

const caseStudyLink = (href) => <Link className={styles.inlineLink} href={href}>Read the case study</Link>

const origins = [
  { label: 'Oct 2025 to Feb 2026', title: 'Branch AI workflows', text: <>Illustration, UX writing and design-system prototyping, each with Branch’s rules and a person’s review. {caseStudyLink('/work/branch-ai')}</> },
  { label: 'Jun to Oct 2026', title: 'Helium’s code layer', text: <>A design system agents can build with, from Figma variables to React. {caseStudyLink('/work/helium')}</> },
  { label: 'Jul 2026', title: 'Pulse’s first build', text: <>Five working days, on Helium’s components. {caseStudyLink('/work/pulse')}</> },
  { label: 'Sept to Nov 2026', title: 'The Enta prototypes', text: 'Home and wallets, Multisig, Payment links and Move money in one live app.' },
  { label: 'Oct to Nov 2026', title: 'EntaPOS', text: 'The same loop, plus design QA of Engineering’s build.' },
]

const path = [
  ['Documentation', 'I write the PRD and keep Helium current: 48 components, 13 UX patterns with Do and Don’t rules, and six decision records that settle the defaults. The Payment links PRD reached v2.1 after 83 revisions, and Multisig’s carries 20 acceptance scenarios. Pulse’s master build prompt names its sources in order, so the agent knows which one wins when two disagree.'],
  ['Agents draft in Figma', 'Screens are drawn with Helium’s own components. When there’s a real choice, the options sit side by side: two concepts for wallet recovery, three picker styles for one product.'],
  ['I review in Figma', 'I make the call and write down why. Recovery got the progress ring. Every feature got one picker style.'],
  ['Agents detail the handoff', 'They add the specs and annotations and move finished frames to Ready for Dev. About 4,000 Helium bindings across three Figma files mean the frames use Helium’s variables instead of loose values. Boards are arranged by flow with figma-section-layout, a skill I wrote for it.'],
  ['The prototype carries the interactions', 'Every state and transition is coded and live on Vercel, on desktop and phone. Phone frames sit beside every desktop frame in Figma, 94 in Payments alone.'],
  ['QA against production', 'Once Engineering ships, the prototype becomes the reference. Agents capture the production screens and compare them with the prototype and Figma, and the findings come back to Figma as corrections. On EntaPOS, that was 59 captures and 39 findings, drawn on Production vs Design Review boards in eleven batches.'],
]

// Figma exports (read-only, scale 2): Multisig Requests 19143:129941 (hDTGMIGGN5IedwXue9wSYi) and the Lagos city tour
// link details sheet 24800:41191 (GO6scykq7gsmaGxIq41y8I). Prototype captures at 2x from the Enta prototype's build.
const compareRows = [
  {
    phones: false,
    items: [
      { label: 'Figma', src: 'figma-desk-request', width: 2880, height: 2048, alt: 'A Multisig request on the Requests page in Figma, with its approval trail open' },
      { label: 'Prototype', src: 'prototype-desk-request', width: 2880, height: 1800, alt: 'A Multisig request on the Requests page in the Enta prototype, with its approval trail open' },
    ],
  },
  {
    phones: true,
    items: [
      { label: 'Figma', src: 'figma-phone-link', width: 750, height: 1624, alt: 'The Lagos city tour payment link’s details sheet on a phone in Figma' },
      { label: 'Prototype', src: 'prototype-phone-link', width: 780, height: 1688, alt: 'The Lagos city tour payment link’s details sheet on a phone in the Enta prototype' },
    ],
  },
]

// Quoted as “T15 copy” gives them, from the dated rules in Product Features' AGENTS.md.
const agentsRules = `- One picker look, every build (Olumide, 17 Oct): every picker sheet on a phone is Helium List Child rows. One library, shared/picker; no feature restyles it.
- Dates in lists and tables (Olumide, 19 Oct): every row that shows a day reads “Today”, “Yesterday”, then “16 Sept”.
- Payment link addresses in the prototype (Olumide, 11 Nov): a link’s address is the prototype’s own, so it always opens the payer page. Figma keeps the production address.`

const changes = [
  { label: '16 to 20 Sept', title: 'Multisig', text: 'First pass built to the PRD in one day; first deploy four days later.' },
  { label: '22 to 24 Sept', title: 'Payment links', text: 'PRD drafted, then a working prototype two days later.' },
  { label: '10 to 20 Oct', title: 'Phone versions', text: 'Three features designed in Figma and built for phones.' },
  { label: '10 Oct to 3 Nov', title: 'EntaPOS', text: 'Eight prototype releases.' },
  { label: '3 to 13 Nov', title: 'Move money', text: 'Seven of nine routes live by 7 Nov; all nine by 13 Nov.' },
]

const habits = [
  ['Write it down first', 'An agent only knows what’s on the page.'],
  ['Split planning from building', 'The agent doing the work shouldn’t be the only one checking it.'],
  ['Review against the design', 'Screenshots beside Figma frames, every time.'],
  ['Turn every correction into a rule', 'Then you only fix it once.'],
  ['Keep the decisions human', 'Agents propose options. I choose, and I approve what ships.'],
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

function Definitions({ items }) {
  return (
    <dl className={styles.definitions}>
      {items.map(([term, description]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function AgileCaseStudy() {
  return (
    <main id="agile-case" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span aria-current="page">Agile AI-driven design</span></nav>
          <h1>Agile AI-Driven Design: Design Judgment, Written for Agents</h1>
          <div className={styles.intro}><p>How I write my design judgment down so AI agents can design, build and check Shiga’s products with me, from documentation to production.</p></div>
        </div>
        <HeroMedia />
      </header>
      <div className={styles.articleLayout}>
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></details>
        <article className={styles.article}>
          <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
            <div className={styles.overviewLabel}>At a glance</div>
            <h2>Engineering built three Shiga products from prototypes I designed and built with AI agents.</h2>
            <div className={styles.overviewLayout}>
              <dl className={styles.facts}>
                <div><dt>Company</dt><dd>Shiga, Enta and Pulse’s parent company</dd></div>
                <div><dt>Industry & platform</dt><dd>Fintech, Web3, B2C, B2B, Web, Mobile web</dd></div>
                <div><dt>Role</dt><dd>Product design owner, directing AI agents in Figma and code</dd></div>
                <div><dt>Team</dt><dd>Product, Engineering</dd></div>
                <div><dt>Timeline</dt><dd>July to November 2026 at Shiga, building on AI work at Branch from October 2025</dd></div>
                <div><dt>Tools</dt><dd className={styles.tools}><span><Image src="/work/ai-copywriting/tools/claude.svg" alt="" width={18} height={18} />Claude Cowork,</span> <span><Image src="/work/ai-copywriting/tools/claude.svg" alt="" width={18} height={18} />Claude Code,</span> <span><Image src="/work/ai-copywriting/tools/chatgpt.svg" alt="" width={18} height={18} className={styles.openaiMark} />Codex,</span> <span><Image src="/work/ai-copywriting/tools/figma.svg" alt="" width={18} height={18} />Figma and its MCP server,</span> <span>Helium React,</span> <span>Vercel,</span> <span>GitHub,</span> <span>Mobbin</span></dd></div>
              </dl>
              <div className={styles.overviewCopy}>
                <p>I’m Shiga’s only product designer, and the product list keeps growing: wallets, Multisig approvals, payment links, Move money, a point-of-sale app and a partner dashboard. So I built a way of working where AI agents do the production work and I keep the judgment.</p>
                <p>That judgment lives in writing: Helium’s components and patterns, the PRDs, and about 40 rules that each started as one of my corrections. Agents read it before they touch Figma or code. I review what comes back.</p>
                <h3>Project TLDR:</h3>
                <ul>
                  <li>Engineering built Pulse, Multisig and Payment links in production from the prototypes.</li>
                  <li>Payment links went from PRD to a working prototype in two days.</li>
                  <li>One live Enta app joins four features, two account types and two layouts, reviewed screen by screen against Figma.</li>
                  <li>The same loop ran EntaPOS, and it’s packaged as a skill I reuse on new projects.</li>
                </ul>
                <a className={styles.resultLink} href="#changed">What changed</a>
              </div>
            </div>
          </section>

          <Section id="start" title="Branch taught me that AI output needs the team’s context">
            <p>At Branch, AI was already part of the product team’s work. Branch’s context wasn’t. Generic tools wrote copy naming products a market didn’t offer, and illustrations came out in clashing styles. I built shared workflows for illustration, UX writing and prototyping with Branch’s design system. Each one carried Branch’s rules, with a person approving the output.</p>
            <p>That’s where I learned what makes AI output usable. It needs the team’s own context going in and a person’s review coming out.</p>
            <p>At Shiga, I took the same idea further. I rebuilt Helium, Shiga’s design system, so agents could build with it: tokens, components, a Figma-to-code manifest and an AGENTS.md every agent reads first. Pulse’s first build used it and took five working days, with Codex writing the frontend. The Enta prototypes and EntaPOS came next. Here’s how it grew:</p>
            <Timeline items={origins} label="How the practice grew" className={styles.timeline} />
          </Section>

          <Section id="system" title="How I split the work with AI agents">
            <p>Every project runs on one loop. A planner agent in Claude Cowork turns my brief into tasks. Each task names the files to read and the Figma frames to match, and says how the result will be checked.</p>
            <p>Builder agents in Claude Code do the work. One draws in Figma through Figma’s MCP server. The other writes code, and it’s the only one allowed to touch git. Here’s the loop:</p>
            <SystemDiagram />
            <p>Every report comes back with screenshots beside the Figma frames they should match. The planner checks them first. Then I review each screen and approve it before anything goes live.</p>
            <p>When I correct something, it becomes a dated rule in the project’s AGENTS.md. Every later task starts from those rules, and the Enta prototypes have about 40 of them now.</p>
            <p className={styles.qualification}>If you know the BMAD Method, this will look familiar. BMAD splits AI work into roles, such as analyst, product manager, architect, developer and QA, and passes context between them in written stories. I built my loop independently. It shares BMAD’s spec-first, role-split idea, and it centres on Figma, Helium and visual QA against production.</p>
          </Section>

          <Section id="path" title="How a feature goes from documentation to production">
            <p>Here’s the path one feature takes. The highlighted steps are mine; agents do the rest.</p>
            <PathDiagram />
            <Definitions items={path} />
            <p>Here’s one Multisig request and one payment link in Figma and in the prototype:</p>
            <figure className={styles.figure}>
              <div className={styles.compare}>
                {compareRows.map((row) => (
                  <div key={row.phones ? 'phone' : 'desktop'} className={`${styles.compareRow} ${row.phones ? styles.comparePhones : ''}`}>
                    {row.items.map((item) => (
                      <div key={item.src}>
                        <span className={styles.figureLabel}>{item.label}</span>
                        <ZoomableImage src={`/work/agile-ai-driven-design/${item.src}.webp`} alt={item.alt} width={item.width} height={item.height} sizes={row.phones ? '(max-width: 767px) 40vw, 250px' : '(max-width: 767px) 85vw, 360px'} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <figcaption>The same screens in Figma and in the prototype, on desktop and on a phone.</figcaption>
            </figure>
          </Section>

          <Section id="quality" title="Every screen gets checked against its Figma frame">
            <p>Agents build fast, and they drift quietly. One product ended up with three picker styles, each nearly right:</p>
            <figure className={`${styles.figure} ${styles.picker}`}>
              <ZoomableImage src="/work/agile-ai-driven-design/pickers-3-styles.webp" alt="The same asset picker in three builds: Multisig, Payment links and Home, each with slightly different type and spacing" width={1221} height={956} sizes="(max-width: 767px) 85vw, 700px" />
              <figcaption>The same picker in three builds. The names differ in size and weight from one to the next.</figcaption>
            </figure>
            <p>I put them side by side, chose one and wrote a rule so every build uses that look.</p>
            <p>So review happens at every scale. Each task report puts screenshots beside the Figma frame. Bigger rounds go wider: a desktop review of 426 screenshots with 1,052 controls clicked, and a phone review of 274 screens. An alignment register of 129 rows compared Figma, Helium and the code, and I settled each difference once.</p>
            <p>Some problems only show up when you use the product. Testing Multisig myself, I found an approver blocked on payments over $5,000. The rule changed that week.</p>
            <p>The agents get things wrong, and I’d rather show that than hide it. A copied payment link once pointed at the real Enta address, so it opened a 404 instead of the prototype’s payment page. Now the prototype uses its own addresses, and that’s a rule too. My review stays in the loop for exactly this reason. Here are three of the rules, as the agents read them:</p>
            <figure className={styles.figure}>
              <span className={styles.figureLabel}>AGENTS.md</span>
              <pre className={styles.code}><code>{agentsRules}</code></pre>
              <figcaption>Three of the dated rules. Every rule started as one of my corrections.</figcaption>
            </figure>
          </Section>

          <Section id="changed" title="Engineering builds from the prototypes">
            <p>Engineering built Pulse, Multisig and Payment links in production from these prototypes. The Pulse demo helped secure Piggyvest as a partner.</p>
            <p>The team walks flows instead of reading them. In one app, a payer pays a link, and the payment lands in the merchant’s dashboard and on Home, with the same example people throughout.</p>
            <p>And the work moves faster. I design several screens in a day, where the same work used to take days. Payment links went from PRD to a working prototype in two days. Seven of Move money’s nine routes were live in the prototype within five days. Here’s how each one went:</p>
            <Timeline items={changes} label="How each feature went" className={styles.timeline} />
            <p className={styles.qualification}>The dates come from the project record. There’s no timed before-and-after study, so I don’t claim a percentage.</p>
          </Section>

          <Section id="teach" title="What I’d teach another designer">
            <p>These are the habits I’d pass on to any designer starting out with agents.</p>
            <Definitions items={habits} />
          </Section>

          <Section id="next" title="Where I’m taking it next">
            <p>Move money on phones is next for the Enta prototypes. And the workflow travels. It’s packaged as a skill, lums-build-toolkit, that sets up the same loop on a new project, with Figma or without it, and asks where the work deploys before anything ships.</p>
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/helium">{heliumHeadline}</Link></nav>
        </article>
      </div>
    </main>
  )
}
