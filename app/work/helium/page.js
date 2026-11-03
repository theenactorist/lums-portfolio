import Link from '../../components/SiteLink'
import Image from 'next/image'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import './helium-shell.css'
import ZoomableImage from '../pulse/PulseImage'
import HeroMedia from './HeroMedia'
import HeliumThemeExample from './HeliumThemeExample'
import TypeCards from './TypeCards'
import ColourRamps from './ColourRamps'
import VariableLayers from './VariableLayers'
import { TokenAvatarFigure, ConversionPairFigure } from './AssetFigures'
import FigmaToCodeFlow from './FigmaToCodeFlow'
import styles from './helium.module.css'
import { pulseHeadline } from '../../data/productionHomeProjects'

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'goal', label: 'The goal' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'variables', label: 'Variables' },
  { id: 'themes', label: 'Themes' },
  { id: 'components', label: 'Components' },
  { id: 'assets', label: 'Assets & networks' },
  { id: 'code', label: 'Figma to code' },
  { id: 'behaviour', label: 'Behaviour' },
  { id: 'writing', label: 'UX writing' },
  { id: 'adoption', label: 'Who uses Helium' },
  { id: 'quality', label: 'Quality' },
  { id: 'next', label: 'In progress' },
]

const foundations = [
  ['Typefaces', 'Two typefaces, each with its own job: Instrument Sans for the interface, and IBM Plex Mono as the number font for amounts, wallet addresses, transaction IDs and verification codes.', null, <TypeCards key="type" />],
  ['Colour', 'The blue comes from Enta’s brand. One blue isn’t enough for an interface, so it’s a full ramp, with lighter and darker steps for hover, pressed, focus and text on brand. Error, warning and success have their own ramps, 13 accent ramps cover tags, avatars and charts, and separate grey ramps keep contrast right in light and dark. Text has to meet WCAG AA contrast, 4.5:1, or 3:1 for large text, and the semantic variables are tuned so that holds in each of the four themes. Colour is never the only signal either: an error also gets an icon and a message, not just red. The brand, grey and status ramps are below.', null, <ColourRamps key="ramps" />],
  ['Type scale', 'Eleven sizes from 12 to 72px. Text sizes from 12 to 20px handle the interface, and display sizes from 24 to 72px handle headings. Each size has its own line height, and emphasis comes from weight, not colour.'],
  ['Spacing', 'An 8-point grid. Most screen sizes divide by 8, so layouts scale cleanly across screen densities on iOS and Android, and designers and engineers choose from the same short list of numbers instead of guessing. Most steps are multiples of 8; smaller 4px steps, and 2 and 6px for the tightest spots, handle the space inside components.'],
  ['Radius', 'From 2px for small details to fully rounded for pills and avatars.'],
]

const levels = [
  { level: 'Atom', src: 'figma-atom-button', width: 810, height: 680, alt: 'Helium Button in Figma, primary and secondary in four sizes and their states' },
  { level: 'Molecule', src: 'figma-molecule-input', width: 344, height: 332, alt: 'Helium input field in Figma, with its label, hint and error message' },
  { level: 'Organism', src: 'figma-sidebar-individual', width: 265, height: 600, alt: 'Helium sidebar navigation in Figma, with the Enta logo, the account switcher and the menu from Home to Support' },
]

// SidebarNavigation from the live Storybook at 2x: individual-tier-1 in light and dark, business-tier-1 in the Business modes.
const themeTiles = [
  { id: 'light', label: 'Individual light', alt: 'Helium sidebar in the Individual light theme: blue Enta logo and a blue active Home item on white' },
  { id: 'dark', label: 'Individual dark', alt: 'Helium sidebar in the Individual dark theme: Enta logo and menu on a dark navy background' },
  { id: 'business-light', label: 'Business light', alt: 'Helium sidebar in the Business light theme: neutral Enta logo with the Business caption, in greys on white' },
  { id: 'business-dark', label: 'Business dark', alt: 'Helium sidebar in the Business dark theme: white Enta logo with the Business caption, in neutrals on near black' },
]

const themeAttributes = [
  ['Individual light', 'Individual', 'Light', null],
  ['Individual dark', 'Individual', 'Dark', 'data-theme="dark"'],
  ['Business light', 'Business', 'Light', 'data-theme="business-light"'],
  ['Business dark', 'Business', 'Dark', 'data-theme="business-dark"'],
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
  ['Forms', 'Primary buttons stay clickable. When something is missing, tapping the button shows exactly what and where, right under the field, instead of a greyed-out button that gives no reason. The error clears as soon as the person edits the field, and what they typed stays if they go back. Try it below.', null, (
    <HeliumThemeExample
      key="input"
      storyId="components-input--destructive-states"
      componentName="Input"
      label="Live from Helium’s Storybook"
      title="The form error state in all four modes"
      caption="Helium’s Input error states, live from Storybook: the red border, the message under the field and the error focus ring."
      height={380}
      mobileHeight={440}
    />
  )],
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
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

function Definitions({ items }) {
  return (
    <dl className={styles.definitions}>
      {items.map(([term, description, link, visual]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}{link && <><br /><Link className={styles.inlineLink} href={link.href}>{link.label}</Link></>}{visual}</dd>
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
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></details>
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
          </Section>

          <Section id="variables" title="Turning the foundations into variables">
            <p>I put every foundation into Figma variables, 1,608 of them, in three tiers. Primitives hold the raw values, like each step of the blue ramp. Semantic variables name what a value is for across the interface, like the colour of secondary text or a page background. Component variables name the part of a component they colour, like the background of a primary button. Semantic and component variables point to primitives, so a change to a primitive in Figma reaches every variable that points to it. Here’s how that works for the primary button.</p>
            <VariableLayers />
            <p>I used AI to test the naming and to generate the code side of each variable. 1,585 of them carry code syntax for Web, iOS and Android, and that part matters most for AI agents. When an agent reads a Helium design through Figma’s MCP server, it gets each variable’s code name, not just its hex value, so it reaches for the right token instead of hard-coding a colour. Helium’s Figma to code guide then maps those names to the library’s CSS variables. 1,298 variables are also scoped, so a radius only shows up where corners are set and a spacing value only where gaps are. The middle layer above shows the code names for the primary button’s background.</p>
          </Section>

          <Section id="themes" title="Designing themes for Individual and Business users">
            <p>Enta has two types of users, Individual and Business, and each can use the app in light or dark. That gives Helium four themes. Which type of user someone is depends on the version of the app they use; light or dark follows their device or their own choice.</p>
            <p>Individual keeps Enta’s blue. Business swaps the blue brand colours and the greys for neutrals, and uses a neutral version of the Enta logo with a Business caption. That makes it obvious which account you’re in, and gives business users a more understated, professional look. Here’s the app’s sidebar in each theme.</p>
            <figure className={styles.figure}>
              <div className={styles.themeGrid}>
                {themeTiles.map((tile) => (
                  <div key={tile.id} data-theme-tile={tile.id}>
                    <span className={styles.figureLabel}>{tile.label}</span>
                    <ZoomableImage src={`/work/helium/storybook-sidebar-${tile.id}.webp`} alt={tile.alt} width={530} height={880} sizes="(max-width: 767px) 42vw, 300px" />
                  </div>
                ))}
              </div>
              <figcaption>The same sidebar component in all four themes. Business drops the blue for neutrals, and the logo switches to the Business version.</figcaption>
            </figure>
            <p>Only colour changes between themes. Spacing, type and radius stay the same, and no component checks which theme it’s in: the same 311 colour tokens simply resolve to different values. Adding a theme means adding a mode to the variables, not rewriting components. An app sets its theme with one attribute on the page:</p>
            <div className={styles.tableWrap}>
              <table className={`${styles.table} ${styles.stacked}`}>
                <thead><tr><th scope="col">Theme</th><th scope="col">Users</th><th scope="col">Light or dark</th><th scope="col">Attribute</th></tr></thead>
                <tbody>
                  {themeAttributes.map(([theme, users, scheme, attribute]) => (
                    <tr key={theme}>
                      <th scope="row">{theme}</th>
                      <td data-label="Users">{users}</td>
                      <td data-label="Light or dark">{scheme}</td>
                      <td data-label="Attribute">{attribute ? <code>{attribute}</code> : 'none, it’s the default'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Try it on the button from the variables section.</p>
            <HeliumThemeExample
              storyId="components-button--states"
              componentName="Button"
              label="Live from Helium’s Storybook"
              title="The same button in all four modes"
              helper="Switch modes and watch the primary button go from blue in Individual to neutral in Business. An app picks the mode with one attribute on the page, shown under the preview."
              caption="Helium’s Button, live from Storybook. Between modes only the variables change; the component and its props stay the same."
              height={320}
            />
          </Section>

          <Section id="components" title="Building from the smallest pieces up">
            <p>I organised the components the way atomic design does. Atoms are the smallest parts, like a button, an input or a badge. Molecules combine atoms, like a form field with its label, hint and error message. Organisms are complete parts of a screen, like the sidebar that frames every page of the Enta web app, or a transactions table. Here’s one of each from the Figma library.</p>
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
              <figcaption>From smallest to largest: a button, a form field built from a label, an input and a message, and the sidebar built from many smaller parts.</figcaption>
            </figure>
            <p>I didn’t build all 48 at once. I started with what every Enta screen needs: buttons, form fields, tabs and the app shell. Then Helium grew with the product. Pulse needed tables, statuses and pagination. Enta’s money flows needed components a generic kit doesn’t have: a swap card for what you send and what arrives, a token avatar that shows a coin with its network, a wallet card with balances you can hide, and a timeline for transaction and approval history.</p>
            <p>Asset sets exported from Figma keep prototypes moving too: 519 currency icons, 235 flags, 99 company logos, 39 payment methods and 232 integration logos.</p>
          </Section>

          <Section id="assets" title="Showing assets, networks and conversions">
            <p>In a crypto wallet, a coin on its own isn’t enough information. USD₮ exists on several networks, and sending it on the wrong one can mean losing it. So Helium pairs icons in two ways, each with its own job.</p>
            <h3>An asset on its network</h3>
            <p>TokenAvatar shows an asset with the network it lives on. The network sits as a small badge in the bottom-right corner, and the coin is cut away around it, so the badge reads as a separate token rather than an overlap. Everything scales with the avatar’s size. Here are a few, with and without a network:</p>
            <TokenAvatarFigure />
            <h3>One currency into another</h3>
            <p>Conversions need a different picture, because nothing is sitting on anything. Helium draws them as one coin split on a diagonal: the currency you start with on one side, the one you end up with on the other. The same style covers every direction a payment can go: a currency into an asset, an asset into a currency, one currency into another, or one asset into another. Helium ships 22 of these pairs as ready-made art.</p>
            <ConversionPairFigure />
          </Section>

          <Section id="code" title="Connecting Figma to code">
            <p>Each component went from Figma to React the same way. An AI coding agent read the component in Figma and built it in React, using Helium’s tokens and never a raw value. Figma’s properties became the component’s props, so a designer’s “Hierarchy: Primary” is an engineer’s <code>hierarchy=&quot;primary&quot;</code>. I checked every component against Figma in the browser before it counted as done. Here’s the path every component takes.</p>
            <FigmaToCodeFlow />
            <p>Our Figma plan doesn’t include Code Connect, so I built the link myself. Each component has a small file that records its Figma node and how its properties map to props, and a script gathers them into one manifest. Each Figma component also links back to its Storybook page, so the connection works in both directions. Here’s Button’s file.</p>
            <figure className={styles.figure}>
              <span className={styles.figureLabel}>Button.figma.json</span>
              <pre className={styles.code}><code>{figmaJson}</code></pre>
              <figcaption>Button’s link file: where it lives in Figma, and how Figma’s Hierarchy and Size become its props.</figcaption>
            </figure>
            <p>Storybook is where everything gets checked. All 48 components are documented there with more than 300 stories, a switch for the four modes and the Figma design beside the code. Chromatic captures every story in every mode, so a change to a token can’t quietly break a theme. Here’s Button’s page.</p>
            <figure className={styles.figure}>
              <ZoomableImage src="/work/helium/storybook-button-docs.webp" alt="Helium Button documentation in Storybook, with its props and states" width={1600} height={1000} sizes="(max-width: 767px) 85vw, 760px" />
              <figcaption>Button in Storybook: how to import it, a playground to try it, and every prop.</figcaption>
            </figure>
            <p>For agents, the rules live in AGENTS.md: reuse a Helium component before writing new markup, use tokens instead of raw values, and look up how Figma maps to code in the manifest. Agents read it every time they work in the repo. These are the rules as agents read them.</p>
            <figure className={styles.figure}>
              <span className={styles.figureLabel}>AGENTS.md</span>
              <pre className={styles.code}><code>{agentsRules}</code></pre>
              <figcaption>From Helium’s AGENTS.md, which every agent reads before it writes code.</figcaption>
            </figure>
          </Section>

          <Section id="behaviour" title="Designing how components behave">
            <p>Consistent looks aren’t enough if components behave differently from screen to screen. I wrote 13 UX patterns that set how things work, and six decision records that explain the harder calls, so nobody has to reopen them.</p>
            <Definitions items={behaviour} />
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

          <Section id="next" title="Work in progress">
            <p>Helium is still growing. These are the parts I’m working on now:</p>
            <Definitions items={nextSteps} />
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/pulse">{pulseHeadline}</Link></nav>
        </article>
      </div>
    </main>
  )
}
