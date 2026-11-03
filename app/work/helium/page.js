import Link from '../../components/SiteLink'
import Image from 'next/image'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import './helium-shell.css'
import ZoomableImage from '../pulse/PulseImage'
import HeroMedia from './HeroMedia'
import HeliumThemeExample from './HeliumThemeExample'
import TypeSpecimen from './TypeSpecimen'
import styles from './helium.module.css'
import { pulseHeadline } from '../../data/productionHomeProjects'

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'goal', label: 'The goal' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'variables', label: 'Variables & modes' },
  { id: 'components', label: 'Components' },
  { id: 'code', label: 'Figma to code' },
  { id: 'behaviour', label: 'Behaviour' },
  { id: 'writing', label: 'UX writing' },
  { id: 'adoption', label: 'Who uses Helium' },
  { id: 'quality', label: 'Quality' },
  { id: 'next', label: 'What’s next' },
]

const foundations = [
  ['Typefaces', 'Instrument Sans for the interface. It’s open source on Google Fonts, so it works on web, iOS and Android without licensing. One variable family covers weights from 400 to 700, enough for every level of hierarchy, and its tabular figures keep amounts lined up in tables. For wallet addresses, transaction IDs and verification codes, I used IBM Plex Mono. People copy and check these character by character, and Plex Mono’s serifed I, tailed l, flagged 1 and dotted zero mean nobody mistakes one for another.'],
  ['Colour', 'The blue comes from Enta’s brand. One blue isn’t enough for an interface, so it’s a full ramp, with lighter and darker steps for hover, pressed, focus and text on brand. Error, warning and success have their own ramps, 13 accent ramps cover tags, avatars and charts, and separate grey ramps keep contrast right in light and dark.'],
  ['Type scale', 'Eleven sizes from 12 to 72px. Text sizes from 12 to 20px handle the interface, and display sizes from 24 to 72px handle headings. Each size has its own line height, and emphasis comes from weight, not colour.'],
  ['Spacing', 'An 8-point grid. Most screen sizes divide by 8, so layouts scale cleanly across screen densities on iOS and Android, and designers and engineers choose from the same short list of numbers instead of guessing. Most steps are multiples of 8; smaller 4px steps, and 2 and 6px for the tightest spots, handle the space inside components.'],
  ['Radius', 'From 2px for small details to fully rounded for pills and avatars.'],
]

// bg-brand-solid in Helium's token files (packages/tokens/tokens/color/*.json): code syntax from
// com.figma.codeSyntax, primitive from com.figma.aliasData, value from $value.hex. Checked 3 November 2026.
const codeSyntax = [
  ['Web', 'var(--color-background-bg-brand-solid)'],
  ['iOS', 'HeliumColors.background.bgBrandSolid'],
  ['Android', 'HeliumColors.background.bgBrandSolid'],
]

const modeValues = [
  ['Individual light', 'Brand 600', '#175CD3'],
  ['Individual dark', 'Brand 600', '#175CD3'],
  ['Business light', 'Neutral 900', '#171717'],
  ['Business dark', 'Neutral 700', '#404040'],
]

const levels = [
  { level: 'Atom', src: 'figma-atom-button', width: 810, height: 680, alt: 'Helium Button in Figma, primary and secondary in four sizes and their states' },
  { level: 'Molecule', src: 'figma-molecule-input', width: 344, height: 332, alt: 'Helium input field in Figma, with its label, hint and error message' },
  { level: 'Organism', src: 'figma-organism-sidebar', width: 265, height: 420, alt: 'Helium sidebar navigation in Figma' },
]

// Trimmed from Helium's packages/react/src/components/Button/Button.figma.json. Lines marked … are cut.
const figmaJson = `{
  "component": "Button",
  "figma": {
    "fileKey": "6JDUb53AbMLtIJPanHJUfP",
    "nodeId": "3287:427074",
    …
  },
  "propMap": {
    "hierarchy": {
      "figmaProperty": "Hierarchy",
      "values": {
        "Primary": "primary",
        "Secondary": "secondary",
        …
      }
    },
    "size": {
      "figmaProperty": "Size",
      "values": { "sm": "sm", "md": "md", "lg": "lg", … }
    },
    …
  },
  "status": "linked"
}`

// Quoted exactly from Helium's AGENTS.md (lines 26 to 28, 131 and 252). Lines marked … are cut.
const agentsRules = `- **Look before you build.** Find the Figma node and the existing component
  (§7) before writing markup. Reuse a public component rather than restyling
  one. Don't invent what Figma doesn't have.
…
- Use only \`--helium-*\` tokens and component-local custom properties. No hex. Use raw px only for off-scale Figma measurements, and comment each one.
…
- **Look it up first.** Before building any UI, find the Figma node in \`docs/figma-to-code.md\` or \`figma-manifest.json\`, and use the existing component in place of new markup.`

const behaviour = [
  ['Forms', 'Primary buttons stay clickable. When something is missing, tapping the button shows exactly what and where, right under the field, instead of a greyed-out button that gives no reason. The error clears as soon as the person edits the field, and what they typed stays if they go back.'],
  ['Loading', 'Skeletons for content that’s on its way. Spinners only for transactions the person is waiting to confirm.'],
  ['Menus', 'Clicking outside or pressing Escape closes them, and only one is open at a time.'],
  ['Navigation', 'Back retraces the person’s steps. Close returns them to the start of the section.'],
  ['Focus', 'One 2px focus ring across every component, for people using a keyboard.'],
  ['Motion', 'Toasts animate in over 300ms, stay for 3.5 seconds, leave over 700ms, and can be swiped away early.'],
]

const rewrites = [
  ['“Password must comprise a minimum of 8 characters.”', '“Password must be at least 8 characters.”'],
  ['“Kindly rectify the errors indicated above prior to proceeding.”', '“Some fields have errors. Fix them to continue.”'],
  ['“This email is already registered. Kindly log in or utilize an alternative email address.”', '“This email may already be registered. Log in or reset your password.”', 'Doesn’t confirm whether an account exists.'],
  ['“Payment Order Not Found”', '“Payment session has expired. Go back and start again.”', 'No internal system terms in front of users.'],
]

const adoption = [
  ['Pulse', 'Pulse’s console imports Helium’s React components, icons and tokens directly, and its embedded checkout follows Helium with a few local changes. The first build took five working days in July 2026.', { href: '/work/pulse', label: 'Read the Pulse case study' }],
  ['Enta prototypes', 'The onboarding and multisig prototypes use built copies of Helium instead of styling their own controls.'],
  ['Mobile engineering', 'The mobile team is bringing Helium’s tokens and core components into the Enta app.'],
  ['Design tools', 'Helium is set up in Claude Design for the team, and I removed the makeshift copies people had made.'],
  ['AI coding agents', 'Every agent working in a Helium-based repo starts from AGENTS.md and the manifest.'],
]

const nextSteps = [
  ['Add automated tests', 'Today, quality depends on type checks, the audit and visual snapshots. Component tests would catch behaviour bugs earlier.'],
  ['Finish native theming', 'iOS and Android get the core tokens and the light theme. Dark and Business modes come next.'],
  ['Retest muted text contrast', 'A few muted text colours fall below 4.5:1 in some modes. We kept them as a shared decision; I’d test them with users and fix them in the tokens.'],
  ['Move the error copy into Helium', 'The message library lives in a spreadsheet. As a UX pattern in the repo, it would sit next to the components that use it.'],
  ['Publish the packages', 'Products use local copies of Helium today. A private package registry would make each update a simple version bump.'],
  ['Ship dark mode in Enta', 'The tokens are ready. Turning dark mode on in the app is next, with engineering.'],
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

function Definitions({ items }) {
  return (
    <dl className={styles.definitions}>
      {items.map(([term, description, link]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}{link && <><br /><Link className={styles.inlineLink} href={link.href}>{link.label}</Link></>}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function HeliumCaseStudy() {
  return (
    <main id="helium-case" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span aria-current="page">Helium</span></nav>
          <h1>Design System Engineering: Owning Helium from Figma Library to Production Code</h1>
          <div className={styles.intro}><p>How I built Helium, Shiga’s design system, so designers, engineers and AI coding agents can all build Enta and Pulse from the same foundations, components and rules.</p></div>
        </div>
        <HeroMedia />
      </header>
      <div className={styles.articleLayout}>
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" /></details>
        <article className={styles.article}>
          <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
            <div className={styles.overviewLabel}>At a glance</div>
            <h2>Helium started as a style guide in Figma. I rebuilt it so people and AI agents could build with it.</h2>
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
                <p>Helium is Shiga’s design system, used across Enta and Pulse. I own it end to end: the foundations, the Figma library, the production React code and the rules that tell people and AI agents how to use it.</p>
                <h3>Project TLDR:</h3>
                <ul>
                  <li>I wanted more than consistent screens. I wanted a code layer that AI coding agents could build with, so their work matches the design as closely as an engineer’s.</li>
                  <li>I started with the foundations, turned them into 1,608 Figma variables with names ready for Web, iOS and Android, then built 48 components in Figma and React, linked to each other and documented in a public Storybook.</li>
                  <li>Pulse’s first build, in July 2026, used Helium’s components and took five working days.</li>
                </ul>
                <a className={styles.resultLink} href="#adoption">See who uses Helium</a>
              </div>
            </div>
          </section>

          <Section id="goal" title="What I wanted Helium to do">
            <p>Every design system is meant to help a team build consistently. That was the starting point for Helium too, but I had a second goal. AI coding agents were starting to write our front-end code, and left to themselves, each one invents its own colours, spacing and components. I wanted Helium to give agents a code layer to build with, so a screen comes out right whether a designer, an engineer or an agent builds it.</p>
            <p>Helium 1.0 couldn’t do that. It was a style guide in Figma. Designers had one place for colours, type and shared components, but engineers rebuilt every screen by eye from Figma links and screenshots. Nothing tied the code back to the design, so small differences crept in, like mixed casing and a label that read “Ban account” in our send flows.</p>
            <p>Helium 2.0 is built on Untitled UI, a widely used Figma kit. I kept that base and rebuilt everything on top of it, from the foundations up, so the same names run from Figma to code.</p>
          </Section>

          <Section id="foundations" title="Starting with the foundations">
            <p>Before any component, I settled the foundations every screen draws on: type, colour, size and space.</p>
            <Definitions items={foundations} />
            <TypeSpecimen />
            <figure className={styles.figure}>
              <ZoomableImage src="/work/helium/figma-colour-ramps.webp" alt="Helium colour ramps in Figma: grey for light and dark mode, brand, error, warning and success" width={1600} height={874} sizes="(max-width: 767px) 85vw, 760px" />
              <figcaption>Helium’s colour ramps in Figma.</figcaption>
            </figure>
          </Section>

          <Section id="variables" title="Turning the foundations into variables">
            <p>I put every foundation into Figma variables, 1,608 of them. Primitive variables hold the raw values, like each step of the blue ramp. Semantic variables name what a value is for, like the background of a primary button or the colour of secondary text, and point to a primitive. Designers and engineers work with the semantic names, so a change to a primitive reaches everything that uses it.</p>
            <p>I used AI to test the naming and to generate the code side of each variable. 1,585 of them carry code syntax for Web, iOS and Android, so every variable already has a name ready for each platform. 1,298 are also scoped, so a radius only shows up where corners are set and a spacing value only where gaps are.</p>
            <p>Then the modes. Enta has two types of users, Individual and Business, and each needs light and dark. That makes four modes, and each one resolves all 311 colour tokens. Business swaps the brand blue and greys for neutrals; spacing, type and radius stay the same.</p>
            <figure className={styles.figure}>
              <div className={styles.variable}>
                <code className={styles.variableName}>bg-brand-solid</code>
                <dl className={styles.syntax}>
                  {codeSyntax.map(([platform, name]) => <div key={platform}><dt>{platform}</dt><dd><code>{name}</code></dd></div>)}
                </dl>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th scope="col">Mode</th><th scope="col">Primitive</th><th scope="col">Value</th></tr></thead>
                    <tbody>
                      {modeValues.map(([mode, primitive, hex]) => (
                        <tr key={mode}>
                          <th scope="row">{mode}</th>
                          <td>{primitive}</td>
                          <td><span className={styles.swatch} style={{ background: hex }} aria-hidden="true" /><code>{hex}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption>One semantic variable, its code names and its value in each mode.</figcaption>
            </figure>
            <HeliumThemeExample
              storyId="components-swapcard--swap-pair"
              componentName="SwapCard"
              label="Live from Helium’s Storybook"
              title="SwapCard in all four modes"
              helper="Switch between Individual and Business, light and dark. The component stays the same; only the variables change."
              caption="Business swaps the brand blue and greys for neutrals. The component and its props stay the same."
              height={320}
            />
          </Section>

          <Section id="components" title="Building from the smallest pieces up">
            <p>I organised the components the way atomic design does. Atoms are the smallest parts, like a button, an input or a badge. Molecules combine atoms, like a form field with its label, hint and error message. Organisms are complete parts of a screen, like the sidebar that frames every Enta page or a transactions table.</p>
            <p>I didn’t build all 48 at once. I started with what every Enta screen needs: buttons, form fields, tabs and the app shell. Then Helium grew with the product. Pulse needed tables, statuses and pagination. Enta’s money flows needed components a generic kit doesn’t have: a swap card for what you send and what arrives, a token avatar that shows a coin with its network, a wallet card with balances you can hide, and a timeline for transaction and approval history.</p>
            <p>Asset sets exported from Figma keep prototypes moving too: 519 currency icons, 235 flags, 99 company logos, 39 payment methods and 232 integration logos.</p>
            <figure className={styles.figure}>
              <div className={styles.levels}>
                {levels.map((item) => (
                  <div key={item.level} className={styles[`level${item.level}`]}>
                    <span className={styles.figureLabel}>{item.level}</span>
                    <div className={styles.levelImage}>
                      <ZoomableImage src={`/work/helium/${item.src}.webp`} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 85vw, 400px" />
                    </div>
                  </div>
                ))}
              </div>
              <figcaption>An atom, a molecule and an organism from Helium’s Figma library: Button, the input field and the sidebar navigation.</figcaption>
            </figure>
          </Section>

          <Section id="code" title="Connecting Figma to code">
            <p>Each component went from Figma to React the same way. An AI coding agent read the component in Figma and built it in React, using Helium’s tokens and never a raw value. Figma’s properties became the component’s props, so a designer’s “Hierarchy: Primary” is an engineer’s <code>hierarchy=&quot;primary&quot;</code>. I checked every component against Figma in the browser before it counted as done.</p>
            <p>Our Figma plan doesn’t include Code Connect, so I built the link myself. Each component has a small file that records its Figma node and how its properties map to props, and a script gathers them into one manifest. Each Figma component also links back to its Storybook page, so the connection works in both directions.</p>
            <p>Storybook is where everything gets checked. All 48 components are documented there with more than 300 stories, a switch for the four modes and the Figma design beside the code. Chromatic captures every story in every mode, so a change to a token can’t quietly break a theme.</p>
            <p>For agents, the rules live in AGENTS.md: reuse a Helium component before writing new markup, use tokens instead of raw values, and look up how Figma maps to code in the manifest. Agents read it every time they work in the repo.</p>
            <figure className={styles.figure}>
              <div className={styles.excerpts}>
                <div><span className={styles.figureLabel}>Button.figma.json</span><pre className={styles.code}><code>{figmaJson}</code></pre></div>
                <div><span className={styles.figureLabel}>AGENTS.md</span><pre className={styles.code}><code>{agentsRules}</code></pre></div>
              </div>
              <figcaption>How Button in Figma maps to Button in code, and the rules agents follow.</figcaption>
            </figure>
            <figure className={styles.figure}>
              <ZoomableImage src="/work/helium/storybook-button-docs.webp" alt="Helium Button documentation in Storybook, with its props and states" width={1600} height={1000} sizes="(max-width: 767px) 85vw, 760px" />
              <figcaption>Button’s page in Storybook.</figcaption>
            </figure>
          </Section>

          <Section id="behaviour" title="Designing how components behave">
            <p>Consistent looks aren’t enough if components behave differently from screen to screen. I wrote 13 UX patterns that set how things work, and six decision records that explain the harder calls, so nobody has to reopen them.</p>
            <Definitions items={behaviour} />
            <HeliumThemeExample
              storyId="components-input--destructive-states"
              componentName="Input"
              label="Live from Helium’s Storybook"
              title="Form errors in all four modes"
              caption="Input error states, live from Helium’s Storybook."
              height={380}
              mobileHeight={440}
            />
          </Section>

          <Section id="writing" title="Writing the words into the system">
            <p>Words are part of the interface, so they’re part of Helium too. Every error message follows one formula: say what happened, then how to fix it. I rewrote more than 100 messages across sign-up, verification and payments. The first draft read like a policy document:</p>
            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.pairs}`}>
                <thead><tr><th scope="col">Before</th><th scope="col">After</th></tr></thead>
                <tbody>
                  {rewrites.map(([before, after, note]) => (
                    <tr key={before}>
                      <td data-label="Before">{before}</td>
                      <td data-label="After">{after}{note && <span className={styles.note}>Note: {note}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="adoption" title="Who uses Helium">
            <Definitions items={adoption} />
          </Section>

          <Section id="quality" title="How I keep Helium reliable">
            <p>I built the code layer with Claude Code. I owned the foundations, the Figma library, the decisions, the reviews and the QA. The agent wrote code to rules I set, and nothing counted as done until I had checked it against Figma in the browser.</p>
            <p>Two reviewers audited the library and found 198 issues, 7 of them critical. I fixed 139 in one pass; the rest were resolved, turned down with a reason, or logged as product decisions.</p>
            <p>Chromatic checks every story in all four modes, and a list of settled decisions keeps the system steady as it grows.</p>
          </Section>

          <Section id="next" title="What I’d do next">
            <Definitions items={nextSteps} />
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/pulse">{pulseHeadline}</Link></nav>
        </article>
      </div>
    </main>
  )
}
