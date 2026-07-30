'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../components/PageTransition'
import ZoomableImage from '../../components/ZoomableImage'
import styles from './pulse.module.css'

const SDK_URL = 'https://pulse-gbp-demo.vercel.app/#demo'
const DASHBOARD_URL = 'https://pulse-gbp-demo.vercel.app/app?demo=admin'
const DOCS_URL = 'https://docs.pulseshiga.io/'

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

const sourceDocuments = {
  prompt: {
    label: 'Prompt.md',
    file: 'MASTER-BUILD-PROMPT.md',
    content: `# Master build prompt — Pulse Partner SaaS

Use the following prompt to recreate the Pulse Partner SaaS prototype represented by this repository.

You are a senior product designer, growth product manager, and master front-end engineer. Build a high-fidelity, fully functional React prototype of the Pulse Partner SaaS for the seeded partner PiggyVest.

This is an enterprise financial-operations product. Think through the user experience and information architecture before composing each screen. The result must feel calm, exact, accountable, and production-ready—not like a generic AI-generated dashboard.

## Source-of-truth order

1. Inspect the existing repository and preserve working functionality.
2. Read PRODUCT.md for product boundaries.
3. Read DESIGN.md for the final dashboard design rules.
4. Inspect the checkout SDK in src/App.jsx and reuse it rather than recreating it.`,
  },
  design: {
    label: 'Design.md',
    file: 'DESIGN.md',
    content: `# Pulse Partner Dashboard Design System

This document is the source of truth for the authenticated Partner Dashboard. It complements the detailed checkout SDK geometry.

## Product character

Pulse is an enterprise payment-operations product. It should feel calm, exact, accountable, and ready for production. The interface is not a token-price dashboard and not a collection of decorative cards. It helps PiggyVest reconcile the path from an on-chain payment to an NGN or USD disbursement.

Use the patterns common to strong enterprise dashboard references:

• Keep the partner identity and current environment globally visible.
• Put high-frequency navigation in a stable left rail.
• Use tables for credentials, webhooks, transactions, team members, sessions, and audit history.
• Pair list views with focused detail or inspector views.
• Prefer one clear operational report over a wall of unrelated cards.`,
  },
}

function SourceDialog({ triggerLabel, initialDocument = 'prompt' }) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const tabRefs = useRef({})
  const [activeDocument, setActiveDocument] = useState(initialDocument)
  const documentKeys = Object.keys(sourceDocuments)
  const active = sourceDocuments[activeDocument]

  const open = () => {
    setActiveDocument(initialDocument)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const dialog = dialogRef.current
    const restoreFocus = () => triggerRef.current?.focus()
    dialog?.addEventListener('close', restoreFocus)
    return () => dialog?.removeEventListener('close', restoreFocus)
  }, [])

  const handleTabKeyDown = (event, key) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const index = documentKeys.indexOf(key)
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? documentKeys.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + documentKeys.length) % documentKeys.length
    const nextKey = documentKeys[nextIndex]
    setActiveDocument(nextKey)
    tabRefs.current[nextKey]?.focus()
  }

  return (
    <>
      <button ref={triggerRef} type="button" className={styles.sourceTrigger} onClick={open}>
        <span>{triggerLabel}</span>
        <ArrowIcon />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.sourceDialog}
        aria-labelledby="pulse-source-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) close()
        }}
      >
        <div className={styles.dialogPanel}>
          <header className={styles.dialogHeader}>
            <div>
              <span>Master prompts</span>
              <h3 id="pulse-source-title">The source documents used for the React build</h3>
            </div>
            <button type="button" onClick={close} aria-label="Close source document">×</button>
          </header>

          <div className={styles.documentTabs} role="tablist" aria-label="Source documents">
            {Object.entries(sourceDocuments).map(([key, document]) => (
              <button
                type="button"
                role="tab"
                id={`pulse-source-tab-${key}`}
                aria-controls="pulse-source-panel"
                aria-selected={activeDocument === key}
                tabIndex={activeDocument === key ? 0 : -1}
                className={activeDocument === key ? styles.activeTab : styles.tab}
                ref={(element) => { tabRefs.current[key] = element }}
                onClick={() => setActiveDocument(key)}
                onKeyDown={(event) => handleTabKeyDown(event, key)}
                key={key}
              >
                {document.label}
              </button>
            ))}
          </div>

          <div
            id="pulse-source-panel"
            role="tabpanel"
            aria-labelledby={`pulse-source-tab-${activeDocument}`}
            className={styles.documentPanel}
          >
            <div className={styles.documentMeta}>
              <span>{active.file}</span>
              <span>Selectable text · source excerpt</span>
            </div>
            <pre tabIndex="0"><code>{active.content}</code></pre>
          </div>

          <footer className={styles.dialogFooter}>
            {activeDocument === 'design' ? (
              <a href="/work/pulse/docs/DESIGN.md" target="_blank" rel="noreferrer">
                View full DESIGN.md <ExternalIcon />
              </a>
            ) : <span />}
            <button type="button" onClick={close}>Done</button>
          </footer>
        </div>
      </dialog>
    </>
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
        sizes="(max-width: 900px) 100vw, 50vw"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function PrototypeFrame({ variant }) {
  const [loaded, setLoaded] = useState(false)
  const isSdk = variant === 'sdk'
  const src = isSdk ? SDK_URL : DASHBOARD_URL
  const label = isSdk ? 'Embedded Checkout SDK' : 'Partner Operations Dashboard'

  return (
    <div className={styles.prototypeShell}>
      <header>
        <div>
          <span>Interactive prototype</span>
          <strong>{label}</strong>
        </div>
        <a href={src} target="_blank" rel="noreferrer">
          Open full prototype <ExternalIcon />
        </a>
      </header>
      <div className={styles.prototypeViewport}>
        {!loaded && <span className={styles.loading}>Loading the working prototype…</span>}
        <iframe
          src={src}
          title={`Interactive Pulse ${label}`}
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <footer>
        <span><i /> Working coded prototype</span>
        <span>Synthetic demo data</span>
      </footer>
    </div>
  )
}

function MasterPromptsPanel() {
  return (
    <div className={styles.promptGrid}>
      <article>
        <span>Prompt.md</span>
        <h3># Master build prompt — Pulse Partner SaaS</h3>
        <p>
          Build a high-fidelity, fully functional React prototype of the Pulse Partner
          SaaS for the seeded partner PiggyVest.
        </p>
        <SourceDialog triggerLabel="Read Prompt.md excerpt" initialDocument="prompt" />
      </article>
      <article>
        <span>Design.md</span>
        <h3># Pulse Partner Dashboard Design System</h3>
        <p>
          The source of truth for an authenticated partner dashboard that feels calm,
          exact, accountable, and ready for production.
        </p>
        <SourceDialog triggerLabel="Read Design.md" initialDocument="design" />
      </article>
    </div>
  )
}

function CheckoutPanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.solutionIntro}>
        <span>Embedded checkout SDK</span>
        <h3>Asset and network selection, followed by clear payment details.</h3>
      </div>
      <div className={styles.mediaPair}>
        <ProductImage
          src="/work/pulse/sdk-payment-details.jpg"
          alt="Pulse checkout showing crypto asset, network, payment amount, and address"
          caption="Embedded checkout SDK · payment details"
        />
        <ProductImage
          src="/work/pulse/sdk-cancellation-reasons.jpg"
          alt="Pulse checkout showing payment detection and cancellation reasons"
          caption="Checkout states and edge cases"
        />
      </div>
      <PrototypeFrame variant="sdk" />
    </div>
  )
}

function OperationsPanel() {
  return (
    <div className={styles.solutionStack}>
      <div className={styles.solutionIntro}>
        <span>Partner operations</span>
        <h3>Performance, transactions, team access, and API credentials.</h3>
      </div>
      <div className={styles.mediaPair}>
        <ProductImage
          src="/work/pulse/dashboard-performance.png"
          alt="Pulse partner dashboard business performance view"
          caption="Partner operations · business performance"
        />
        <ProductImage
          src="/work/pulse/dashboard-transactions.png"
          alt="Pulse partner dashboard transactions view"
          caption="Partner operations · transactions"
        />
        <ProductImage
          src="/work/pulse/dashboard-team.png"
          alt="Pulse partner dashboard team management view"
          caption="Partner operations · team"
        />
        <ProductImage
          src="/work/pulse/dashboard-api-keys.png"
          alt="Pulse partner dashboard API credentials view"
          caption="Partner operations · API credentials"
        />
      </div>
      <PrototypeFrame variant="operations" />
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
                  Removing a design-to-engineering bottleneck to deliver a working proof
                  of concept in five days.
                </p>
              </motion.div>
              <motion.div className={styles.heroMedia} {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                <ZoomableImage
                  src="/work/pulse/pulse-product.png"
                  alt="Pulse embedded checkout and partner operations product"
                  width={1280}
                  height={720}
                  priority
                  sizes="(max-width: 900px) 100vw, 56vw"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="cs-meta-section">
          <div className="container cs-wide-container">
            <motion.div className={styles.metaGrid} {...reveal}>
              <div><span>My role</span><strong>Product Designer &amp; Front-end Developer (Payments, SaaS)</strong></div>
              <div><span>Team</span><strong>Product Owner, Engineering, Business Development</strong></div>
              <div><span>Timeframe</span><strong>July 2026 · five working days</strong></div>
              <div><span>Industry</span><strong>Fintech, Web3</strong></div>
              <div><span>Platform</span><strong>Web, B2B, SaaS</strong></div>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.contextSection}`}>
          <div className="container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Context</span>
              <h2>Pulse as a SaaS product</h2>
              <p>
                It gives businesses the tools to integrate crypto payment checkout and the
                operational software to monitor payments, manage settlements and reconcile
                transactions.
              </p>
            </motion.div>
            <motion.div className={styles.productFlow} {...reveal}>
              <article>
                <span>01</span>
                <h3>Partner integrates Pulse</h3>
                <p>Through the SDK or API directly into mobile or web products.</p>
              </article>
              <ArrowIcon />
              <article>
                <span>02</span>
                <h3>Customer pays</h3>
                <p>USDC, USDT or BTC from 20+ networks.</p>
              </article>
              <ArrowIcon />
              <article>
                <span>03</span>
                <h3>Pulse in action</h3>
                <p>Crypto payment is converted to fiat, settlement is made to the account, and the user gets value.</p>
              </article>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.personaSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Product model</span>
              <h2>Four user personas across three product surfaces</h2>
            </motion.div>
            <motion.div className={styles.personaLayout} {...reveal}>
              <div className={styles.personas}>
                <article>
                  <Image src="/work/pulse/icons/admin.svg" alt="" width={42} height={42} />
                  <div><h3>Admin</h3><p>Manages the workspace, team, settings and operational access.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/developer.svg" alt="" width={42} height={42} />
                  <div><h3>Developer</h3><p>Works with API keys, webhooks, documentation and test environments.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/viewer.svg" alt="" width={42} height={42} />
                  <div><h3>Viewer</h3><p>Monitors transactions and performance without changing the system.</p></div>
                </article>
                <article>
                  <Image src="/work/pulse/icons/customer.svg" alt="" width={42} height={42} />
                  <div><h3>Customer</h3><p>Completes the embedded crypto checkout inside the product.</p></div>
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
                <h2>A partner wanted to see Pulse working in 5 days</h2>
              </div>
              <div className={styles.constraintCopy}>
                <p>
                  Piggyvest helps over 6 million customers achieve their financial goals by
                  helping them save and invest with ease.
                </p>
                <p>
                  Business Development identified the prospective partner, managed the
                  relationship and translated its interest into a Friday product evaluation.
                </p>
                <p>
                  Piggyvest needed to see the embedded checkout SDK and API working together,
                  supported by the Partner Operations Dashboard and Developer Integration Portal.
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
                <h2>The capabilities the partner prioritised</h2>
              </div>
              <p>Clarification sessions with Business Development and Engineering focused on one question: what are the most important features needed by the partner?</p>
            </motion.div>
            <motion.div className={styles.discoveryGrid} {...reveal}>
              <article><span>01</span><h3>Embedded checkout</h3><p>Customers could complete a crypto payment within Piggyvest&apos;s Android and iOS mobile apps.</p></article>
              <article><span>02</span><h3>Operational visibility</h3><p>A portal with roles for teams to monitor, investigate and reconcile transactions.</p></article>
              <article><span>03</span><h3>Integration clarity</h3><p>Documentation, webhooks and API reference for Piggyvest developers to integrate Pulse.</p></article>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.decisionSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Decision</span>
              <h2>Handoff the front-end in React directly from the design system</h2>
            </motion.div>
            <motion.div className={styles.deliveryCompare} {...reveal}>
              <div>
                <span>Instead of</span>
                <ol>
                  <li>Figma high-fidelity mockups</li>
                  <li>Conversion to front-end</li>
                  <li>Endpoint implementation</li>
                </ol>
              </div>
              <div>
                <span>I used</span>
                <ol>
                  <li>Helium Design system</li>
                  <li>Prompt and Codex for front-end implementation</li>
                  <li>Endpoint implementation</li>
                </ol>
              </div>
            </motion.div>
            <motion.div className={styles.optimisedFor} {...reveal}>
              <span>Optimised for</span>
              <p>Design-system components already existed in Storybook as React components.</p>
              <p>Rapid prototyping for review and immediate handoff.</p>
              <p>Build and iterate with AI using the Codex harness to hand off the different experiences.</p>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.solutionSection}`}>
          <div className="container cs-wide-container">
            <motion.div className={styles.sectionHeader} {...reveal}>
              <span>Solution</span>
              <h2>One working proof across the three product surfaces</h2>
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
              <h2>Five days later, the integrated SaaS proof helped secure the partner business.</h2>
              <div className={styles.outcomeList}>
                <p>The commercial deadline was met.</p>
                <p>The partner saw the SDK and API integration working together.</p>
                <p>The dashboard showed how the business would operate and reconcile payments.</p>
                <p>The frontend became the base for engineering integration rather than a disposable design prototype.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`section ${styles.nextSection}`}>
          <div className="container">
            <motion.div {...reveal}>
              <span className={styles.sectionLabel}>Next</span>
              <h2>Replace manual provisioning with onboarding + public launch</h2>
              <div className={styles.nextFlow}>
                {['Work email', 'KYB', 'Beneficial owners', 'Controlling-owner KYC', 'Passkey and recovery', 'Business approval'].map((step, index, items) => (
                  <div key={step}>
                    <span>{step}</span>
                    {index < items.length - 1 && <ArrowIcon />}
                  </div>
                ))}
              </div>
              <a className={styles.docsLink} href={DOCS_URL} target="_blank" rel="noreferrer">
                Explore the developer documentation <ExternalIcon />
              </a>
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
