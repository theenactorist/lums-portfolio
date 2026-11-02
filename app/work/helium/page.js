import Link from '../../components/SiteLink'
import Image from 'next/image'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import './helium-shell.css'
import ZoomableImage from '../pulse/PulseImage'
import HeroMedia from './HeroMedia'
import HeliumThemeExample from './HeliumThemeExample'
import styles from './helium.module.css'
import { pulseHeadline } from '../../data/productionHomeProjects'

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'why', label: 'Why Helium changed' },
  { id: 'foundation', label: 'Helium 1.0 to 2.0' },
  { id: 'layers', label: 'What Helium is made of' },
  { id: 'thread', label: 'Why buttons stay active' },
  { id: 'money', label: 'Wallet components' },
  { id: 'adoption', label: 'Who uses Helium' },
  { id: 'quality', label: 'How I keep it reliable' },
  { id: 'learnings', label: 'Learnings & next steps' },
]

const stats = [
  ['48', 'components'],
  ['4', 'themes'],
  ['311', 'colour tokens per theme'],
  ['100+', 'error messages'],
]

const timeline = [
  ['Nov 2025', 'Error copy had no standard', 'Messages were long and formal, and some showed system terms such as “Payment Order Not Found”.'],
  ['Jan 2026', 'Mobile needed tokens', 'I handed engineering 263 colour tokens, type, spacing and radius as one-off theme files for Android and iOS.'],
  ['Mar 2026', 'Live screens didn’t match the design', 'QA logged mixed casing across the send flows and a label that read “Ban account”.'],
  ['Apr 2026', 'Mobile had to match web', 'The mobile revamp needed tokens in code, a component library and a clear list of where mobile should match web and where it shouldn’t.'],
  ['Jun 2026', 'Enta added Business accounts', 'Business users needed their own colours, in light and dark, without a second set of components.'],
  ['Jul 2026', 'Prototypes took too long', 'Every prototype rebuilt the same controls, so a coded component library became a design priority for the quarter.'],
]

const comparison = [
  ['Where it lives', 'Figma', 'Figma, code and a public Storybook'],
  ['Who uses it', 'Designers', 'Designers, engineers and AI coding agents'],
  ['How it gets into code', 'Rebuilt by eye from specs', 'Tokens and components built from Figma and linked back to it'],
  ['Behaviour and copy', 'Not covered', '13 UX patterns, 6 decision records and an error message library'],
]

const layers = [
  ['Figma variables', 'Primitive colours feed semantic tokens. Four modes cover Enta’s Individual and Business users, each in light and dark. Each mode has 311 colour tokens, up from 263 before Business accounts arrived.'],
  ['Figma components', 'Each Figma component has a description and a link to its Storybook page, so designers can jump straight to the code.'],
  ['Tokens in code', 'Style Dictionary turns the Figma export into 639 CSS variables, typed TypeScript and starter files for iOS and Android. Components only use tokens, never raw values.'],
  ['React components', '48 components, each built to match its Figma component. Figma properties become React props, and a manifest links each component back to Figma, since our Figma plan doesn’t include Code Connect.'],
  ['Storybook', 'A public Storybook documents every component with 300+ stories and a theme switcher for all four modes.'],
  ['UX patterns and decisions', '13 patterns and 6 decision records explain how things behave: when to validate a form, when to show a skeleton, where back navigation goes.'],
  ['UX writing', 'Error messages follow one formula: say what happened, then how to fix it. The library has 100+ messages across sign-up, verification and payments.'],
]

const steps = [
  ['Decision', 'Primary buttons stay active', 'A disabled button fails silently: people can’t tell what’s wrong or why nothing happens. So the form checks itself when they tap.', '(Decision record 0005)'],
  ['Pattern', 'Errors show on submit', 'Errors appear under the field on submit, clear on the next edit, and values stay when people go back.', '(UX patterns 04 and 05)'],
  ['Copy', 'The message says how to fix it', '“Password must be at least 8 characters.”'],
  ['Figma', 'Every input has an error state', 'An error border, a space for the message and an error focus ring.'],
  ['Code', 'All form fields share one component', 'Input, Textarea and InputDropdown use the same Field component. Pass it an error, and it replaces the hint and is read out by screen readers through aria-describedby.'],
  ['Storybook', 'You can see it in every theme', 'Storybook shows the error state for every input, in all four themes.'],
]

const rewrites = [
  ['“Password must comprise a minimum of 8 characters.”', '“Password must be at least 8 characters.”'],
  ['“Kindly rectify the errors indicated above prior to proceeding.”', '“Some fields have errors. Fix them to continue.”'],
  ['“This email is already registered. Kindly log in or utilize an alternative email address.”', '“This email may already be registered. Log in or reset your password.”', 'Doesn’t confirm that an account exists.'],
  ['“Payment Order Not Found”', '“Payment session has expired. Go back and start again.”', 'No internal terms in front of users.'],
]

const walletComponents = [
  { name: 'SwapCard', line: 'What you send and what arrives, with thousands separators, long amounts that shrink to fit, and a mobile layout.', src: 'swapcard-business-dark', width: 782, height: 632, maxWidth: 300, alt: 'Helium SwapCard in the Business dark theme' },
  { name: 'TokenAvatar', line: 'A coin with its network badge, so the same coin on two networks never looks the same.', src: 'tokenavatar-pairs', width: 224, height: 160, maxWidth: 168, alt: 'Helium TokenAvatar pairs showing coins with their network badges' },
  { name: 'WalletCard', line: 'Balances by asset, with a hide option that masks every amount, including the converted total.', src: 'walletcard', width: 1600, height: 642, maxWidth: 800, alt: 'Helium WalletCard with balances by asset' },
  { name: 'Timeline', line: 'Transaction and approval history that makes it clear what has settled and what is still pending.', src: 'timeline-approval-trail', width: 976, height: 438, maxWidth: 488, alt: 'Helium Timeline showing an approval trail' },
  { name: 'Asset libraries', line: '519 currencies, 235 flags, 99 company logos, 39 payment methods and 232 integration logos, exported from Figma so prototypes never wait on assets.', src: 'currency-crypto', width: 1704, height: 192, maxWidth: 852, alt: 'Helium currency icons for crypto assets' },
]

const adoption = [
  ['Pulse', 'Pulse’s console imports Helium’s React components, icons and tokens directly. Its embedded checkout follows Helium with a few local changes. The first build took five working days in July 2026.', { href: '/work/pulse', label: 'Read the Pulse case study' }],
  ['Enta prototypes', 'The onboarding and multisig prototypes use built copies of Helium instead of styling their own controls.'],
  ['Mobile engineering', 'The mobile team is bringing Helium’s tokens and core components into the Enta app.'],
  ['Design tools', 'Helium is set up in Claude Design for the team, and I removed the makeshift copies.'],
  ['AI coding agents', 'A shared AGENTS.md tells agents to reuse Helium components before writing new ones, and how to match Figma to code.'],
]

const nextSteps = [
  ['Add automated tests', 'Today, quality depends on type checks, the audit and visual snapshots. Component tests would catch behaviour bugs earlier.'],
  ['Finish native theming', 'iOS and Android get the core tokens and the light theme. Dark and Business modes come next.'],
  ['Retest muted text contrast', 'A few muted text colours fall below 4.5:1 in some themes. We kept them as a shared decision; I’d test them with users and fix them in the tokens.'],
  ['Move the error copy into Helium', 'The message library lives in a spreadsheet. As a UX pattern in the repo, it would sit next to the components that use it.'],
  ['Publish the packages', 'Products use local copies of Helium today. A private package registry would make each update a simple version bump.'],
  ['Ship dark mode in Enta', 'The tokens are ready. Turning dark mode on in the app is next, with engineering.'],
]

const versions = [
  { name: 'Helium 1.0', cover: 'figma-helium-1-thumbnail', page: 'figma-helium-1-buttons', pageHeight: 840 },
  { name: 'Helium 2.0', cover: 'figma-helium-2-thumbnail', page: 'figma-helium-2-buttons', pageHeight: 840 },
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

export default function HeliumCaseStudy() {
  return (
    <main id="helium-case" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span aria-current="page">Helium</span></nav>
          <h1>Design System Engineering: Owning Helium from Figma Library to Production Code</h1>
          <div className={styles.intro}><p>How I build and maintain Helium, Shiga’s design system, in both Figma and production React, so Enta and Pulse use the same tokens, components, patterns and copy.</p></div>
        </div>
        <HeroMedia />
      </header>
      <div className={styles.articleLayout}>
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" /></details>
        <article className={styles.article}>
          <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
            <div className={styles.overviewLabel}>At a glance</div>
            <h2>Helium only lived in Figma. Shiga’s products needed it in code.</h2>
            <div className={styles.overviewLayout}>
              <dl className={styles.facts}>
                <div><dt>Company</dt><dd>Shiga, Enta and Pulse’s parent company</dd></div>
                <div><dt>Industry & platform</dt><dd>Fintech, Web3, B2C, B2B, Web, Mobile, SaaS</dd></div>
                <div><dt>Role</dt><dd>Design system owner, Figma library + production React codebase</dd></div>
                <div><dt>Team</dt><dd>Product, Engineering</dd></div>
                <div><dt>Timeline</dt><dd>June to October 2026 (code layer)</dd></div>
                <div><dt>Tools</dt><dd className={styles.tools}><span><Image src="/work/ai-copywriting/tools/figma.svg" alt="" width={18} height={18} />Figma,</span> <span><Image src="/work/ai-copywriting/tools/claude.svg" alt="" width={18} height={18} />Claude Code,</span> <span>Helium React,</span> <span>Storybook,</span> <span>Style Dictionary,</span> <span>Chromatic</span></dd></div>
              </dl>
              <div className={styles.overviewCopy}>
                <p>Helium is Shiga’s design system. Version 1.0 was a style guide in Figma. With 2.0, I own both the Figma library and the production code, along with the docs, UX patterns and error copy.</p>
                <h3>Project TLDR:</h3>
                <ul>
                  <li>I design and maintain Helium in Figma and in production React, with themes for Enta’s Individual and Business users in light and dark mode, all documented in a public Storybook.</li>
                  <li>Helium also holds UX patterns, decision records and an error message library, so screens behave and read the same way across products.</li>
                  <li>Helium has 48 components, 4 themes and 300+ Storybook stories. Pulse’s first build, in July 2026, used Helium’s components and took five working days.</li>
                </ul>
                <a className={styles.resultLink} href="#adoption">See who uses Helium <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <ul className={styles.stats}>
              {stats.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}
            </ul>
          </section>

          <Section id="why" title="Why a Figma style guide wasn’t enough">
            <p>Helium 1.0 gave designers one place for colours, type and shared components. Engineers still rebuilt each screen from Figma links and screenshots, and nothing connected their code back to the design.</p>
            <p>That worked while Enta was one product on one platform. Over the next year, that changed:</p>
            <ol className={styles.timeline}>
              {timeline.map(([date, title, line]) => <li key={date}><span>{date}</span><div><h3>{title}</h3><p>{line}</p></div></li>)}
            </ol>
            <p>Each of these got fixed on its own. I wanted the fixes to live in Helium, so nobody had to solve the same problem twice.</p>
          </Section>

          <Section id="foundation" title="What changed from Helium 1.0 to 2.0">
            <p>Helium 2.0 is built on Untitled UI, a popular Figma kit. I kept that base and extended it for fintech and for Enta’s two types of users. The bigger change was taking Helium beyond Figma and into code.</p>
            <div className={styles.tableWrap}>
              <table className={styles.comparison}>
                <thead><tr><td /><th scope="col">Helium 1.0</th><th scope="col">Helium 2.0</th></tr></thead>
                <tbody>
                  {comparison.map(([row, before, after]) => <tr key={row}><th scope="row">{row}</th><td data-label="Helium 1.0">{before}</td><td data-label="Helium 2.0">{after}</td></tr>)}
                </tbody>
              </table>
            </div>
            <figure className={styles.versions}>
              <div className={styles.versionGrid}>
                {versions.map((version) => (
                  <div key={version.name}>
                    <span className={styles.versionName}>{version.name}</span>
                    <ZoomableImage src={`/work/helium/${version.cover}.webp`} alt={`${version.name} cover in Figma`} width={1200} height={675} sizes="(max-width: 767px) 85vw, 340px" />
                    <ZoomableImage src={`/work/helium/${version.page}.webp`} alt={`${version.name} Buttons page in Figma`} width={1400} height={version.pageHeight} sizes="(max-width: 767px) 85vw, 340px" />
                  </div>
                ))}
              </div>
              <figcaption>The cover and Buttons page from each version in Figma.</figcaption>
            </figure>
          </Section>

          <Section id="layers" title="What Helium is made of">
            <p>Everything visual starts from the Figma variables. Change a variable, and the token, the component and its Storybook page change with it. The UX patterns and error copy guide how things behave and what they say.</p>
            <ol className={styles.layers}>
              {layers.map(([name, line], index) => <li key={name}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{name}</h3><p>{line}</p></div></li>)}
            </ol>
            <HeliumThemeExample
              storyId="components-swapcard--swap-pair"
              componentName="SwapCard"
              label="Live from Helium’s Storybook"
              title="SwapCard in Enta’s four themes"
              helper="Switch between Individual and Business, light and dark. The component stays the same; only the tokens change."
              caption="Business swaps the brand blue and greys for neutrals. The component and its props stay the same."
              height={320}
            />
          </Section>

          <Section id="thread" title="Why Helium’s main buttons stay active">
            <p>Here’s how one decision, keeping primary buttons active, shows up in the patterns, the copy, Figma and the code.</p>
            <ol className={styles.steps}>
              {steps.map(([where, title, line, source], index) => (
                <li key={where}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <span className={styles.stepWhere}>{where}</span>
                    <h3>{title}</h3>
                    <p>{line}{source && <> <span className={styles.source}>{source}</span></>}</p>
                  </div>
                </li>
              ))}
            </ol>
            <HeliumThemeExample
              storyId="components-input--destructive-states"
              componentName="Input"
              label="Live from Helium’s Storybook"
              title="The Input error state in every theme"
              height={380}
              mobileHeight={440}
            />
            <h3>Rewriting 100+ error messages</h3>
            <p>The first draft of our error copy read like a policy document. I rewrote every message to say what happened and what to do next, in as few words as possible.</p>
            <ul className={styles.rewrites}>
              {rewrites.map(([before, after, note]) => (
                <li key={before}>
                  <div><span>Before</span><p>{before}</p></div>
                  <div><span>After</span><p>{after}</p></div>
                  {note && <div className={styles.note}><span>Note</span><p>{note}</p></div>}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="money" title="Components for moving money">
            <p>Untitled UI covers the basics, like buttons and inputs. A wallet needs more, so I added components for swaps, balances and transaction history.</p>
            <ul className={styles.walletGrid}>
              {walletComponents.map((item) => (
                <li key={item.name} className={item.width / item.height > 2 ? styles.walletWide : undefined}>
                  <div className={styles.walletImage}>
                    <div style={{ maxWidth: item.maxWidth }}>
                      <ZoomableImage src={`/work/helium/${item.src}.webp`} alt={item.alt} width={item.width} height={item.height} sizes={`(max-width: 767px) 85vw, ${item.maxWidth}px`} />
                    </div>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.line}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="adoption" title="Who uses Helium">
            <p>Here’s where Helium is used today:</p>
            <dl className={styles.adoption}>
              {adoption.map(([who, line, link]) => (
                <div key={who}>
                  <dt>{who}</dt>
                  <dd>{line}{link && <><br /><Link className={styles.inlineLink} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link></>}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="quality" title="How I keep Helium reliable">
            <p>I wrote the code with Claude Code. I owned the Figma library, the decisions, the reviews and the QA. Claude Code followed rules I wrote down, and nothing was done until I’d checked it against Figma in the browser.</p>
            <ul className={styles.checklist}>
              <li>Two reviewers audited the library and found 198 issues, 7 of them critical. I fixed 139 in one pass. The rest were resolved, turned down with a reason or logged as product decisions.</li>
              <li>Chromatic captures every story in all four themes, so a token change can’t quietly break a theme.</li>
              <li>I keep a list of settled decisions, like using one 2px focus ring everywhere, so we don’t reopen them.</li>
              <li>Every component has a Storybook docs page, written in plain language for designers and engineers.</li>
            </ul>
          </Section>

          <Section id="learnings" title="What I’d do next">
            <p>Here’s what I’d work on next:</p>
            <dl className={styles.nextPriorities}>
              {nextSteps.map(([title, line]) => <div key={title}><dt>{title}</dt><dd>{line}</dd></div>)}
            </dl>
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/pulse">{pulseHeadline} <span aria-hidden="true">↗</span></Link></nav>
        </article>
      </div>
    </main>
  )
}
