'use client'

import { useRef, useState } from 'react'
import Link from '../../components/SiteLink'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import '../ai-copywriting/reference-fonts.css'
import './pulse-shell.css'
import ZoomableImage from './PulseImage'
import { CheckoutTrigger, DocumentTrigger } from './PulseDialogs'
import ProductEvolutionSection from './ProductEvolutionSection'
import PulseDashboard from './PulseDashboard'
import HeliumButtonExample from './HeliumButtonExample'
import styles from './pulse.module.css'
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon'
import { pulseHeadline } from '../../data/productionHomeProjects'

const DASHBOARD_URL = 'https://pulse-staging-seven.vercel.app/app?embed=1&theme=light'
const DOCS_URL = 'https://docs.pulseshiga.io/'
const STORYBOOK_URL = 'https://helium-design-system-storybook.vercel.app/?path=/docs/components-button--docs'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

function ProductImage({ src, alt, caption, width = 1280, height = 720 }) {
  return (
    <figure className={styles.productImage}>
      <ZoomableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 767px) 85vw, 380px"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function PrototypeFrame({
  src = DASHBOARD_URL,
  label = 'Partner Operations Dashboard',
  linkLabel = 'Explore partner dashboard',
  overline = 'Interactive prototype',
  caption = 'Synthetic demo data',
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={styles.prototypeShell}>
      <header>
        <div>
          <span>{overline}</span>
          <strong>{label}</strong>
        </div>
        <a href={src} target="_blank" rel="noreferrer">
          {linkLabel} <ExternalIcon />
        </a>
      </header>
      <div className={styles.prototypeViewport}>
        {!loaded && <span className={styles.loading}>Loading {label.toLowerCase()}…</span>}
        <iframe
          src={src}
          title={`Interactive Pulse ${label}`}
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {caption && <footer><span>{caption}</span></footer>}
    </div>
  )
}

function MasterPromptsPanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.promptGrid}>
        <article>
          <span>PRODUCT.md</span>
          <h3>The product brief for the build</h3>
          <p>
            The brief defined a frontend prototype and role permissions. For example,
            developers could access transactions, API keys, webhooks and their profile,
            with read-only access to customization.
          </p>
          <DocumentTrigger documentKey="product" className={styles.sourceTrigger}>
            <span>Read PRODUCT.md</span><ArrowIcon />
          </DocumentTrigger>
        </article>
        <article>
          <span>DESIGN.md</span>
          <h3>Components and behaviour</h3>
          <p>
            Use @helium/react before creating a local control. Define how controls
            work: sorting applies to the complete filtered dataset before pagination.
          </p>
          <DocumentTrigger documentKey="design" className={styles.sourceTrigger}>
            <span>Read DESIGN.md</span><ArrowIcon />
          </DocumentTrigger>
        </article>
      </div>
      <p className={styles.supportingCopy}>
        These are later repository examples, not a record of everything shipped in the first five days. PRODUCT.md opens the complete BUILD_PROMPT.md.
      </p>
    </div>
  )
}

function CheckoutPanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.solutionIntro}>
        <span>Embedded checkout SDK</span>
        <h3>Make the transfer details clear</h3>
        <p className={styles.supportingCopy}>
          The partner already sets the fiat amount. I kept checkout short and made
          the transfer details explicit.
        </p>
      </div>
      <div className={styles.prototypeShell}>
        <header>
          <div>
            <span>Interactive prototype</span>
            <strong>Embedded Checkout SDK</strong>
          </div>
          <CheckoutTrigger className={styles.docsLink}>
            Try the interactive checkout <ArrowIcon />
          </CheckoutTrigger>
        </header>
      </div>
      <div className={styles.evidenceRow} role="group" aria-label="Checkout screenshots" tabIndex={0}>
        <ProductImage
          src="/work/pulse/checkout-selected.png"
          alt="Pulse checkout with the asset and network selected"
          width={760}
          height={1200}
          caption="The button repeats the asset and network so customers can check their choice."
        />
        <ProductImage
          src="/work/pulse/checkout-transfer.png"
          alt="Pulse transfer instructions showing the amount, network, address and copy controls"
          width={760}
          height={1200}
          caption="Amount, network and address stay together, with copy controls and a network warning."
        />
        <ProductImage
          src="/work/pulse/checkout-detected.png"
          alt="Pulse acknowledging payment arrival while network confirmation is pending"
          width={760}
          height={1200}
          caption="Payment detected acknowledges arrival while the transfer is still confirming."
        />
      </div>
    </div>
  )
}

function OperationsPanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.solutionIntro}>
        <span>Partner operations</span>
        <h3>A back office for three partner roles</h3>
        <p className={styles.supportingCopy}>
          I mapped partner jobs to the navigation. Later feedback called for clearer
          payment failure reasons.
        </p>
      </div>
      <PulseDashboard src={DASHBOARD_URL} />
      <div className={styles.evidenceRow} role="group" aria-label="Partner dashboard screenshots" tabIndex={0}>
        <ProductImage
          src="/work/pulse/dashboard-performance.png"
          alt="Pulse partner dashboard business performance view"
          caption="Operations / Viewer: track payments and settlements."
        />
        <ProductImage
          src="/work/pulse/dashboard-transactions.png"
          alt="Pulse partner dashboard transactions view"
          caption="Find a transaction, trace the payment and inspect its status."
        />
        <ProductImage
          src="/work/pulse/dashboard-team.png"
          alt="Pulse partner dashboard team management view"
          caption="Admin: manage team access, customization and settings."
        />
        <ProductImage
          src="/work/pulse/dashboard-api-keys.png"
          alt="Pulse partner dashboard API credentials view"
          caption="Developer: configure API keys, webhooks and integrations."
        />
      </div>
    </div>
  )
}

function DeveloperExperiencePanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.solutionIntro}>
        <span>Developer experience</span>
        <h3>Developers needed a clear route to integration</h3>
        <p className={styles.supportingCopy}>
          The docs covered test credentials, API requests and payment events.
          I reused Shiga’s Mintlify setup to focus on the guidance and save the
          time needed for a custom documentation build.
        </p>
      </div>
      <PrototypeFrame
        src={DOCS_URL}
        label="Developer Documentation"
        linkLabel="View developer docs"
        overline="Integration guides and API reference"
        caption={null}
      />
      <div className={styles.evidenceRow} role="group" aria-label="Developer documentation screenshots" tabIndex={0}>
        <ProductImage
          src="/work/pulse/developer-quickstart.png"
          alt="Pulse developer quickstart with test credentials and an API request example"
          width={1560}
          height={1024}
          caption="Quickstart and API requests."
        />
        <ProductImage
          src="/work/pulse/developer-events.png"
          alt="Pulse payment events and webhook sequence documentation"
          width={1560}
          height={1024}
          caption="Payment events and webhook sequence."
        />
      </div>
    </div>
  )
}

const solutionPanels = {
  prompts: {
    label: 'Master Prompts',
    render: <MasterPromptsPanel />,
  },
  sdk: {
    label: 'Embedded Checkout SDK',
    render: <CheckoutPanel />,
  },
  operations: {
    label: 'Partner Operations Dashboard',
    render: <OperationsPanel />,
  },
  developer: {
    label: 'Developer Documentation',
    render: <DeveloperExperiencePanel />,
  },
}

function SolutionTabs() {
  const tabRefs = useRef({})
  const [active, setActive] = useState('prompts')
  const keys = Object.keys(solutionPanels)

  const handleKeyDown = (event, key) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const index = keys.indexOf(key)
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? keys.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + keys.length) % keys.length
    const nextKey = keys[nextIndex]
    setActive(nextKey)
    tabRefs.current[nextKey]?.focus()
  }

  return (
    <div className={styles.solutions}>
      <div className={styles.solutionTabs} role="tablist" aria-label="Pulse solution areas">
        {Object.entries(solutionPanels).map(([key, item]) => (
          <button
            type="button"
            role="tab"
            id={`pulse-solution-tab-${key}`}
            aria-controls="pulse-solution-panel"
            aria-selected={active === key}
            tabIndex={active === key ? 0 : -1}
            className={active === key ? styles.solutionTabActive : styles.solutionTab}
            ref={(element) => { tabRefs.current[key] = element }}
            onClick={() => setActive(key)}
            onKeyDown={(event) => handleKeyDown(event, key)}
            key={key}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="pulse-solution-panel"
        role="tabpanel"
        aria-labelledby={`pulse-solution-tab-${active}`}
        className={styles.solutionPanel}
      >
        {solutionPanels[active].render}
      </div>
    </div>
  )
}

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'brief', label: 'The brief & constraints' },
  { id: 'roles', label: 'Customer & partner roles' },
  { id: 'design-system', label: 'Figma to Helium React' },
  { id: 'ai-workflow', label: 'Implementation & review' },
  { id: 'surfaces', label: 'Checkout, operations & docs' },
  { id: 'outcome', label: 'Handoff & first-demo outcome' },
  { id: 'evolution', label: 'Beyond the first demo' },
  { id: 'learnings', label: 'Learnings & next steps' },
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

export default function PulseCaseStudy() {
  const reducedMotion = useReducedMotion()
  return (
    <main id="pulse-case" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span aria-current="page">Pulse</span></nav>
          <h1>{pulseHeadline}</h1>
          <div className={styles.intro}><p>Designing and building Pulse’s React frontend so a prospective partner could evaluate checkout, payment operations and developer integration in one working demo.</p></div>
        </div>
        <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
          <div className={styles.heroDashboard}>
            <ZoomableImage src="/work/pulse/hero-dashboard-isolated.png" alt="Pulse transactions dashboard" width={1640} height={1034} priority sizes="(max-width: 767px) 85vw, 550px" />
          </div>
          <div className={styles.heroSdk}><ZoomableImage src="/work/pulse/hero-sdk-isolated.png" alt="Pulse embedded checkout SDK asset selection" width={636} height={959} priority sizes="(max-width: 767px) 28vw, 180px" /></div>
          <div className={styles.heroDeveloper}><ZoomableImage src="/work/pulse/hero-developer-isolated.png" alt="Pulse developer API request example" width={940} height={512} priority sizes="(max-width: 767px) 42vw, 260px" /></div>
        </motion.div>
      </header>
      <div className={styles.articleLayout}>
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></details>
        <article className={styles.article}>
          <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
            <div className={styles.overviewLabel}>At a glance</div>
            <h2>Shiga had the payment capabilities. A prospective partner needed to see them working together.</h2>
            <div className={styles.overviewLayout}>
              <dl className={styles.facts}>
                <div><dt>Company</dt><dd>Shiga, Pulse’s parent company</dd></div>
                <div><dt>Industry & platform</dt><dd>Fintech, Web3, B2B, Web, SaaS</dd></div>
                <div><dt>Role</dt><dd>Product design + React frontend delivery</dd></div>
                <div><dt>Team</dt><dd>Product, Engineering, Business Development</dd></div>
                <div><dt>First build</dt><dd>July 2026, five working days</dd></div>
                <div><dt>Tools</dt><dd className={styles.tools}><span><Image src="/work/ai-copywriting/tools/figma.svg" alt="" width={18} height={18} />Figma,</span> <span><Image src="/work/ai-copywriting/tools/chatgpt.svg" alt="" width={18} height={18} className={styles.openaiMark} />Codex,</span> <span>Helium React,</span> <span>Storybook,</span> <span>Mintlify</span></dd></div>
              </dl>
              <div className={styles.overviewCopy}>
                <p>Pulse brought Shiga’s payment capabilities into a business product: checkout for customers, operations for partner teams and integration tools for developers.</p>
                <h3>Project TLDR:</h3>
                <ul>
                  <li>I designed and built the React frontend, using Helium components and AI-assisted implementation.</li>
                  <li>Engineering connected the backend APIs. The team tested and presented the integrated product on day five.</li>
                  <li>The recorded demo helped secure Piggyvest as a partner.</li>
                </ul>
                <a className={styles.resultLink} href="#outcome">Handoff and first-demo outcome</a>
              </div>
            </div>
          </section>
          <Section id="brief" title="Five working days to show Pulse working">
            <p>Shiga already offered on-ramp, off-ramp and payments through its consumer product, Enta. Pulse brought those capabilities together for businesses, helping them accept crypto and settle in fiat.</p>
            <p>Business Development found the prospective partner, Piggyvest, managed the relationship and arranged Friday’s evaluation. The evaluation focused on its investment use case: accepting a payment inside the partner’s product and giving its team visibility.</p>
            <p>My PM and I protected three jobs for the demo: complete a payment, understand its status and see how to integrate. Checkout, the partner dashboard and developer guidance had to support the same evaluation.</p>
            <div className={styles.findings}>
              <h3>Partner clarification narrowed the scope</h3>
              <dl>
                <div><dt>Known at the start</dt><dd>Partners needed embedded payments, operational visibility and a clear integration path. I used the partner conversation, Business Development context, payment knowledge and Engineering’s API constraints to define those jobs.</dd></div>
                <div><dt>Decided for the demo</dt><dd>I defined the initial roles and permissions. We deferred self-serve onboarding to protect Friday’s evaluation, so partners would still need help getting set up.</dd></div>
                <div><dt>Learned afterward</dt><dd>Partners later requested clearer payment failure reasons. That feedback belongs to the work beyond the first demo.</dd></div>
              </dl>
            </div>
          </Section>
          <Section id="roles" title="Four roles across one payment journey">
            <p>The customer pays inside the partner’s product. Pulse converts the payment to fiat and settles to the partner’s account, while the partner’s team monitors payments and settlements.</p>
            <div className={styles.roleEvidence}>
              <div className={styles.personas}>
                {[
                  ['admin', 'Admin', 'Set up the team, settings and operational access.'],
                  ['developer', 'Developer', 'Configure API keys, webhooks and test/live integrations.'],
                  ['viewer', 'Viewer / Operations', 'View transactions, payment status and performance with read-only access.'],
                  ['customer', 'Customer', 'Pay inside the partner’s product through embedded checkout.'],
                ].map(([icon, role, job]) => <div key={role}><Image src={`/work/pulse/icons/${icon}.svg`} alt="" width={42} height={42} /><div><h3>{role}</h3><p>{job}</p></div></div>)}
              </div>
              <div className={styles.surfaces} aria-label="Pulse product surfaces">
                {[
                  ['partner-dashboard', 'Partner Operations Dashboard'],
                  ['developer-experience', 'Developer Integration Portal'],
                  ['sdk', 'Embedded Checkout SDK'],
                ].map(([file, label]) => <div key={file}><Image src={`/work/pulse/surfaces/${file}.svg`} alt="" width={240} height={130} /><span>{label}</span></div>)}
              </div>
            </div>
            <p className={styles.qualification}>Later product capability included USDC, USDT or BTC on 20+ networks. This describes the evolved product, not the scope delivered in five days.</p>
          </Section>
          <Section id="design-system" title="Helium made the Figma design reusable in code">
            <p>I converted the Figma system into React components and documented them in Storybook. Design, Codex and Engineering could work from the same reference.</p>
            <p>Figma properties became React props. The Button mapping defined hierarchy and size, along with default, hover, focus and disabled states. Reusing established patterns gave me time to design and QA the product’s flows and features.</p>
            <figure className={styles.evidence}>
              <ZoomableImage src="/work/pulse/helium-component.png" alt="Helium React button component with hierarchy, size and state controls in Storybook" width={1440} height={900} sizes="(max-width: 767px) 85vw, 744px" />
              <figcaption>The Button component and its variants in Storybook.<a className={styles.evidenceLink} href={STORYBOOK_URL} target="_blank" rel="noreferrer"><LinkArrowLabel>Explore Storybook</LinkArrowLabel><span className={styles.srOnly}> (opens in a new tab)</span></a></figcaption>
            </figure>
            <HeliumButtonExample />
          </Section>
          <Section id="ai-workflow" title="AI-assisted implementation still needed design review">
            <p>I set the product structure and behaviour: product priorities, Figma flows, written states and the existing Helium React components. Codex assembled the frontend in smaller implementation steps so I could review each part as it took shape.</p>
            <p>Taking on the build also made me responsible for checking its behaviour before handing the code to Engineering. Product, Business Development and Engineering reviewed the working flow, and I directed corrections into the next build.</p>
            <figure className={styles.evidence}>
              <ZoomableImage src="/work/pulse/dashboard-transactions.png" alt="Pulse partner dashboard transactions view" width={1280} height={720} sizes="(max-width: 767px) 85vw, 744px" />
              <figcaption>The later transactions view shows the operational surface: find a transaction, trace the payment and inspect its status.</figcaption>
            </figure>
          </Section>
          <Section id="surfaces" title="Checkout, operations and docs supported the same evaluation">
            <p className={styles.qualification}>Explore the later product and repository examples below. These surfaces developed beyond the first five-day demo.</p>
            <SolutionTabs />
          </Section>
          <Section id="outcome" title="The demo helped secure Piggyvest as a partner">
            <p>I handed over reviewed React code for API integration. Frontend engineers connected the backend APIs; testing and iteration continued through the partner demonstration.</p>
            <ol className={styles.deliveryTimeline} aria-label="The final three days of the original build">
              <li><span>Day 3</span><div><h3>Frontend ready for review</h3><p>I reviewed the working frontend with the team and iterated on their feedback.</p></div></li>
              <li><span>Day 4</span><div><h3>Connected to backend APIs</h3><p>Frontend developers connected the APIs. More end-to-end tests followed.</p></div></li>
              <li><span>Day 5</span><div><h3>Testing and demo day</h3><p>We continued testing and presented the integrated product to the partner.</p></div></li>
            </ol>
            <p>The first build gave the partner a working product to evaluate. The recorded outcome was that the demo helped secure Piggyvest as a partner.</p>
          </Section>
          <ProductEvolutionSection />
          <Section id="learnings" title="Where I’d take Pulse next">
            <p>Reusing Helium gave me time to focus on product behaviour, but the working build still needed review and correction. Checkout, operations and developer guidance had to make sense together before the team could demonstrate the product.</p>
            <p>The recorded next-step priorities build on that work:</p>
            <dl className={styles.nextPriorities}>
              <div><dt>Test the next iteration with each role</dt><dd>Research setup, payment confidence and failure handling with partner operators, developers and customers.</dd></div>
              <div><dt>Measure where partners need help</dt><dd>Track integration time, payment completion and exception-resolution time to guide the next release.</dd></div>
              <div><dt>Make partner onboarding repeatable</dt><dd>Build the self-serve setup deferred for the first demo, using partner onboarding to identify where help is needed.</dd></div>
              <div><dt>Support new use cases through one SDK</dt><dd>Test which differences belong in partner configuration and which payment behaviours should stay shared.</dd></div>
            </dl>
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/shiga-onboarding"><LinkArrowLabel>Cutting time to value with a passkey-led onboarding</LinkArrowLabel></Link></nav>
        </article>
      </div>
    </main>
  )
}
