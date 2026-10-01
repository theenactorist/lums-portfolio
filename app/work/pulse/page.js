'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../components/PageTransition'
import ZoomableImage from '../../components/ZoomableImage'
import { CheckoutTrigger, DocumentTrigger } from './PulseDialogs'
import ProductEvolutionSection from './ProductEvolutionSection'
import styles from './pulse.module.css'

const DASHBOARD_URL = 'https://pulse-staging-seven.vercel.app/app?embed=1&theme=light'
const DOCS_URL = 'https://docs.pulseshiga.io/'
const STORYBOOK_URL = 'https://helium-design-system-storybook.vercel.app/?path=/docs/components-button--docs'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
}

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
        sizes="280px"
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
        Current repository examples. PRODUCT.md opens the complete BUILD_PROMPT.md.
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
        <footer><span>Simulated payment</span></footer>
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
      <PrototypeFrame />
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
    label: 'Developer Experience',
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

export default function PulseCaseStudy() {
  return (
    <PageTransition mode="fade">
      <main className={`cs-page ${styles.page}`}>
        <nav className="cs-breadcrumb" aria-label="Breadcrumb">
          <div className="container cs-wide-container">
            <ol className="cs-breadcrumb__list">
              <li className="cs-breadcrumb__item">
                <Link href="/work" className="cs-breadcrumb__link">Work</Link>
              </li>
              <li className="cs-breadcrumb__sep" aria-hidden="true">/</li>
              <li className="cs-breadcrumb__item cs-breadcrumb__item--current" aria-current="page">Pulse</li>
            </ol>
          </div>
        </nav>

        <section className={`cs-hero ${styles.hero}`}>
          <div className="container cs-hero__container">
            <div className={styles.heroGrid}>
              <motion.div className={styles.heroCopy} {...reveal}>
                <h1 className="cs-hero__title">Pulse: Embedded Crypto Payments</h1>
                <p className={styles.heroLead}>
                  I designed and built the frontend for a B2B payments platform that
                  helps businesses accept crypto and settle in fiat.
                </p>
              </motion.div>
              <motion.div className={styles.heroMedia} {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                <div className={styles.heroDashboard}>
                  <ZoomableImage
                    src="/work/pulse/hero-dashboard-isolated.png"
                    alt="Pulse transactions dashboard"
                    width={1640}
                    height={1034}
                    priority
                    sizes="(max-width: 1180px) 90vw, 52vw"
                  />
                </div>
                <div className={styles.heroSdk}>
                  <ZoomableImage
                    src="/work/pulse/hero-sdk-isolated.png"
                    alt="Pulse embedded checkout SDK asset selection"
                    width={636}
                    height={959}
                    priority
                    sizes="(max-width: 1180px) 30vw, 18vw"
                  />
                </div>
                <div className={styles.heroDeveloper}>
                  <ZoomableImage
                    src="/work/pulse/hero-developer-isolated.png"
                    alt="Pulse developer API request example"
                    width={940}
                    height={512}
                    priority
                    sizes="(max-width: 1180px) 45vw, 26vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="cs-meta-section">
          <div className="container cs-wide-container">
            <motion.div className={styles.metaGrid} {...reveal}>
              <div><span>My role</span><strong>Product design + React frontend delivery</strong></div>
              <div><span>Team</span><strong>Product, Engineering, Business Development</strong></div>
              <div><span>Timeframe</span><strong>First build: July 2026 · five working days</strong></div>
              <div><span>Industry</span><strong>Fintech, Web3</strong></div>
              <div><span>Platform</span><strong>Web, B2B, SaaS</strong></div>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.contextSection}`}>
          <div className="container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Context</span>
              <h2>Turning Shiga’s payment capabilities into a partner product</h2>
              <p>
                Shiga, Pulse’s parent company, already offered on-ramp, off-ramp and payments
                through its consumer product, Enta. Pulse brought those capabilities
                together for businesses: checkout for their customers, operations for
                their teams and integration tools for their developers.
              </p>
            </motion.div>
            <motion.div className={styles.productFlow} {...reveal}>
              <article>
                <span>01</span>
                <h3>Partner integrates Pulse</h3>
                <p>Through the API on mobile or the SDK on web.</p>
              </article>
              <ArrowIcon />
              <article>
                <span>02</span>
                <h3>Customer pays</h3>
                <p>Customers pay inside the partner’s product. Later product capability: USDC, USDT or BTC on 20+ networks.</p>
              </article>
              <ArrowIcon />
              <article>
                <span>03</span>
                <h3>Settle and track payments</h3>
                <p>Pulse converts the payment to fiat and settles to the partner’s account. Partner teams monitor payments and settlements.</p>
              </article>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.personaSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Product model</span>
              <h2>Four roles across one payment journey</h2>
            </motion.div>
            <motion.div className={styles.personaLayout} {...reveal}>
              <div className={styles.personas}>
                <article>
                  <Image src="/work/pulse/icons/admin.svg" alt="" width={42} height={42} />
                  <div><h3>Admin</h3><p>Set up the team, settings and operational access.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/developer.svg" alt="" width={42} height={42} />
                  <div><h3>Developer</h3><p>Configure API keys, webhooks and test/live integrations.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/viewer.svg" alt="" width={42} height={42} />
                  <div><h3>Viewer / Operations</h3><p>View transactions, payment status and performance with read-only access.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/customer.svg" alt="" width={42} height={42} />
                  <div><h3>Customer</h3><p>Pay inside the partner’s product through embedded checkout.</p></div>
                </article>
              </div>
              <div className={styles.surfaces} aria-label="Pulse product surfaces">
                <div><Image src="/work/pulse/surfaces/partner-dashboard.svg" alt="" width={240} height={130} /><span>Partner Operations Dashboard</span></div>
                <div><Image src="/work/pulse/surfaces/developer-experience.svg" alt="" width={240} height={130} /><span>Developer Integration Portal</span></div>
                <div><Image src="/work/pulse/surfaces/sdk.svg" alt="" width={240} height={130} /><span>Embedded Checkout SDK</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.constraintSection}`}>
          <div className="container">
            <motion.div className={styles.constraintGrid} {...reveal}>
              <div>
                <span className={styles.sectionLabel}>Constraint</span>
                <h2>Five working days to show Pulse working</h2>
              </div>
              <div className={styles.constraintCopy}>
                <p>
                  Business Development found the prospective partner, Piggyvest, managed
                  the relationship and arranged Friday’s evaluation.
                </p>
                <p>
                  The evaluation focused on Piggyvest’s investment use case: accepting a
                  payment inside the partner’s product and giving its team visibility.
                </p>
                <p>
                  My PM and I protected three jobs for the demo: complete a payment,
                  understand its status and see how to integrate.
                </p>
                <p>
                  Checkout, the partner dashboard and developer guidance had to support
                  the same evaluation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.discoverySection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.discoveryHeader} {...reveal}>
              <div>
                <span className={styles.sectionLabel}>Discovery</span>
                <h2>Partner clarification narrowed the scope</h2>
              </div>
              <p>I used the direct partner conversation, Business Development context, payment knowledge and Engineering’s API constraints to define the jobs and initial role model before prompting Codex.</p>
            </motion.div>
            <motion.div className={styles.discoveryGrid} {...reveal}>
              <article><span>1</span><h3>Pay inside the partner’s product</h3><p>I chose embedded checkout: API on mobile, SDK on web.</p></article>
              <article><span>2</span><h3>Understand each payment</h3><p>I prioritised transaction monitoring and admin access controls.</p></article>
              <article><span>3</span><h3>Know how to integrate</h3><p>I included docs, webhooks and API reference for the demo.</p></article>
            </motion.div>
            <div className={styles.optimisedFor}>
              <span>How the scope developed</span>
              <p><strong>Known at the start</strong>Partners needed embedded payments, operational visibility and a clear integration path.</p>
              <p><strong>Decided for the demo</strong>I defined the initial roles and permissions. We deferred self-serve onboarding.</p>
              <p><strong>Learned afterward</strong>Partners later requested clearer payment failure reasons.</p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.decisionSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Decision</span>
              <h2>I handed over the frontend in React</h2>
            </motion.div>
            <motion.div className={styles.deliveryCompare} {...reveal}>
              <div>
                <span>A separate build handoff</span>
                <ol>
                  <li>High-fidelity Figma screens</li>
                  <li>Frontend implementation after handoff</li>
                  <li>API integration</li>
                </ol>
              </div>
              <div>
                <span>The route I took</span>
                <ol>
                  <li>Helium React components and Storybook</li>
                  <li>Codex builds, followed by my review and design QA</li>
                  <li>Reviewed React code ready for API integration</li>
                </ol>
              </div>
            </motion.div>
            <div className={styles.sectionDetail}>
              <h3 className={styles.sectionLabel}>The trade-offs</h3>
              <div className={`${styles.discoveryGrid} ${styles.tradeoffGrid}`}>
                <article>
                  <span>Ownership</span>
                  <h3>I took on the build and design QA</h3>
                  <p>The team could review a working React frontend. That also made me responsible for checking its behaviour before handing the code to Engineering.</p>
                </article>
                <article>
                  <span>Scope</span>
                  <h3>Self-serve onboarding could wait</h3>
                  <p>We deferred it to protect checkout, operations and integration for Friday’s evaluation. Partners would still need help getting set up.</p>
                </article>
                <article>
                  <span>Reuse</span>
                  <h3>Mintlify kept docs within reach</h3>
                  <p>I used Shiga’s existing documentation structure instead of building a custom site. That left time for test credentials, API requests and payment-event guidance.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="ai-workflow" className={`section ${styles.contextSection}`}>
          <div className="container cs-wide-container">
            <div className={styles.sectionHeader}>
              <span>AI workflow</span>
              <h2>How I built Pulse with Codex</h2>
              <p>I set the product structure and behaviour. Codex built in smaller steps; I reviewed the output and directed the next changes.</p>
            </div>
            <div className={`${styles.nextFlow} ${styles.workflowFlow}`} aria-label="Build and review workflow">
              {[
                ['I prepared the context', 'Product priorities, Figma flows, written behaviour and states, mapped to existing Helium React components.'],
                ['Codex planned and built', 'The React frontend was assembled in smaller implementation steps, so I could review each part as it took shape.'],
                ['I reviewed and corrected', 'I checked the behaviour and directed corrections into the next build. Product, Business Development and Engineering reviewed the working flow.'],
                ['Engineering integrated', 'I handed over the reviewed React code. Frontend engineers connected the backend APIs; testing and iteration continued.'],
              ].map(([title, description], index, items) => (
                <div key={title}>
                  <span>
                    <span className={styles.workflowNumber}>{index + 1}</span>
                    <strong>{title}</strong>
                    <span className={styles.futureBody}>{description}</span>
                  </span>
                  {index < items.length - 1 && <ArrowIcon />}
                </div>
              ))}
            </div>
            <div className={styles.sectionDetail}>
              <h3 className={styles.sectionLabel}>What I corrected in review</h3>
              <div className={`${styles.promptGrid} ${styles.reviewGrid}`}>
                <article>
                  <h4>Table headers needed sorting</h4>
                  <p>Codex missed this interaction. I added sorting to the table headers.</p>
                </article>
                <article>
                  <h4>The table data needed simplifying</h4>
                  <p>I condensed the data to simplify the table and directed the correction into the next build.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="design-system" className={`section ${styles.personaSection}`}>
          <div className="container cs-wide-container">
            <div className={styles.sectionHeader}>
              <span>Design system</span>
              <h2>Helium made the design reusable in code</h2>
              <p>I converted the Figma system into React components and documented them in Storybook. Design, Codex and Engineering could work from the same reference.</p>
            </div>
            <div className={styles.constraintGrid}>
              <div className={styles.solutionStack}>
                <div className={styles.prototypeShell}>
                  <header>
                    <div><span>Component reference</span><strong>Helium in Storybook</strong></div>
                    <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">Explore Storybook <ExternalIcon /></a>
                  </header>
                </div>
                <div className={styles.evidenceRow} role="group" aria-label="Helium component screenshot" tabIndex={0}>
                  <ProductImage
                    src="/work/pulse/helium-component.png"
                    alt="Helium React button component with hierarchy, size and state controls in Storybook"
                    width={1440}
                    height={900}
                    caption="The Button component and its variants in Storybook."
                  />
                </div>
              </div>
              <div className={styles.constraintCopy}>
                <p><strong>Figma properties became React props.</strong> The Button mapping defined hierarchy and size, along with default, hover, focus and disabled states.</p>
                <p><strong>The same component was reused in Pulse.</strong> Reusing established patterns gave me time to design and QA the product’s flows and features.</p>
                <pre className={styles.componentExample} aria-label="Helium Button usage"><code>{"import { Button } from '@helium/react'\n\n<Button>Invite member</Button>"}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.solutionSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Solution</span>
              <h2>The working frontend across Pulse’s product surfaces</h2>
              <p>Explore the current product and source documents below. These examples have developed beyond the first five-day demo.</p>
            </motion.div>
            <motion.div {...reveal}>
              <SolutionTabs />
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.outcomeSection}`}>
          <div className="container">
            <motion.div {...reveal}>
              <span className={styles.sectionLabel}>Outcome</span>
              <h2>The demo helped secure Piggyvest as a partner.</h2>
              <p className={styles.supportingCopy}>
                The five-day build gave the partner enough confidence to move forward.
              </p>
              <div className={`${styles.productFlow} ${styles.deliveryTimeline}`} aria-label="The final three days of the original build">
                <article>
                  <span>Day 3</span>
                  <h3>Frontend ready for review</h3>
                  <p>I reviewed the working frontend with the team and iterated on their feedback.</p>
                </article>
                <ArrowIcon />
                <article>
                  <span>Day 4</span>
                  <h3>Connected to backend APIs</h3>
                  <p>Frontend developers connected the APIs. More end-to-end tests followed.</p>
                </article>
                <ArrowIcon />
                <article>
                  <span>Day 5</span>
                  <h3>Testing and demo day</h3>
                  <p>We continued testing and presented the integrated product to the partner.</p>
                </article>
              </div>
            </motion.div>
          </div>
        </section>

        <ProductEvolutionSection />

        <section className={`section ${styles.nextSection}`}>
          <div className="container">
            <motion.div {...reveal}>
              <span className={styles.sectionLabel}>Next</span>
              <h2>Where I’d take Pulse next</h2>
              <p className={styles.supportingCopy}>
                Checkout, operations and developer docs now work together, with Helium
                providing reusable UI components. As more partners join, I’d build on
                that work in four areas.
              </p>
              <div className={styles.nextFlow} aria-label="Priorities for the next iteration">
                {[
                  ['Test the next iteration with each role', 'Research setup, payment confidence and failure handling with partner operators, developers and customers.'],
                  ['Measure where partners need help', 'Track integration time, payment completion and exception-resolution time to guide the next release.'],
                  ['Make partner onboarding repeatable', 'Build the self-serve setup deferred for the first demo, using partner onboarding to identify where help is needed.'],
                  ['Support new use cases through one SDK', 'Test which differences belong in partner configuration and which payment behaviours should stay shared.'],
                ].map(([title, description], index, items) => (
                  <div key={title}>
                    <span><strong>{title}</strong><span className={styles.futureBody}>{description}</span></span>
                    {index < items.length - 1 && <ArrowIcon />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cs-next">
          <div className="container">
            <motion.div className="cs-next__row" {...reveal}>
              <span className="cs-next__label">Next case study</span>
              <Link href="/work/shiga-onboarding" className="cs-next__link">
                Cutting time to value with a passkey-led onboarding
                <ArrowIcon />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
