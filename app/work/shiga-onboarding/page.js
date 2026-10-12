import Link from 'next/link';
import Image from 'next/image';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import CaseStudyAnimation from '../../components/CaseStudyAnimation';
import EvidenceImage from './EvidenceImage';
import EntaDemo from './EntaDemo';
import DeliverGallery from './DeliverGallery';
import '../../components/case-studies/shell-compat.css';
import '../ai-copywriting/reference-fonts.css';
import './shiga-shell.css';
import styles from './page.module.css';

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'discovery', label: 'Where onboarding lost people' },
  { id: 'decisions', label: 'Access around intent' },
  { id: 'exploration', label: 'From flow to interface' },
  { id: 'prototype', label: 'Explore the prototype' },
  { id: 'delivery', label: 'Handoff & product screens' },
  { id: 'outcomes', label: 'What changed' },
  { id: 'learnings', label: 'What I learned' },
];

function Evidence({ file, alt, caption, width, height, flow = false }) {
  return (
    <figure className={`${styles.evidence} ${flow ? styles.flowEvidence : ''}`}>
      <EvidenceImage src={`/work/shiga-onboarding/${file}.png`} alt={alt} width={width} height={height} sizes="(max-width: 767px) 90vw, (max-width: 991px) 80vw, 744px" className={styles.evidenceImage} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function ShigaOnboardingCaseStudy() {
  return (
    <main id="shiga-case" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span>Shiga · ENTA</span></nav>
            <h1>Cutting time to value with passkey-led onboarding</h1>
            <div className={styles.intro}><p>Redesigning ENTA’s individual onboarding around passkeys and feature-based verification, so users can reach their wallet before unlocking fiat services.</p></div>
          </div>
          <CaseStudyAnimation src="/work/shiga-onboarding/cover.gif" poster="/work/shiga-onboarding/cover-poster.png" width={720} height={720} alt="ENTA brand montage featuring merchandise, campaign graphics and the app icon" label="ENTA brand animation" priority className={styles.heroEvidence} style={{ aspectRatio: 'auto' }} />
        </header>
        <div className={styles.articleLayout}>
          <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" /></aside>
          <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" /></details>
          <article className={styles.article}>
            <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
              <div className={styles.overviewLabel}>At a glance</div>
              <h2>The first task should lead to the wallet, with verification tied to what comes next.</h2>
              <div className={styles.overviewLayout}>
                <dl className={styles.facts}>
                  <div><dt>Company</dt><dd>Shiga Digital<br /><a href="https://www.shiga.io/" target="_blank" rel="noopener noreferrer">Visit Shiga <span aria-hidden="true">↗</span></a></dd></div>
                  <div><dt>Industry</dt><dd>Fintech, cryptocurrency</dd></div>
                  <div><dt>Role</dt><dd>Product Designer<br />UX writing</dd></div>
                  <div><dt>Tools</dt><dd className={styles.tools}><span><Image src="/work/ai-copywriting/tools/claude.svg" width={20} height={20} alt="" />Claude Design</span>, <span><Image src="/work/ai-copywriting/tools/figma.svg" width={20} height={20} alt="" />Figma</span></dd></div>
                  <div><dt>Team</dt><dd>1 product designer, 1 product manager, 3 engineers</dd></div>
                  <div><dt>Period</dt><dd>Q1 2026 · 1-week sprint</dd></div>
                </dl>
                <div className={styles.overviewCopy}>
                  <p>ENTA brings crypto and fiat services into one wallet. Its individual onboarding asked people to complete identity verification before they could see the product.</p>
                  <h3>Impact TLDR:</h3>
                  <ul>
                    <li>I redesigned the onboarding flow and UX writing around passkeys.</li>
                    <li>The new structure separated crypto-only access from ENTA features that require identity verification.</li>
                    <li>Dashboard states explained what was available, what was locked and how to unlock it.</li>
                  </ul>
                  <a className={styles.resultLink} href="#prototype">Explore the prototype <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </section>

            <section className={styles.section} id="discovery" tabIndex={-1}>
              <h2>Where onboarding lost people</h2>
              <div className={styles.prose}>
                <p>The previous journey put email and password, profile setup and know-your-customer verification (KYC) ahead of the dashboard. People could leave during verification without ever seeing send, receive or swap.</p>
                <p>A funnel review with engineering followed sign-up through to the first transaction. Support tickets added the language behind the drop-off: fatigue and confusion before people had moved money. Conversations with product, engineering and compliance helped clarify which actions needed verification.</p>
                <p>Crypto-only users wanted to move stablecoins. People using both crypto and fiat needed a route to additional services. Asking both groups to complete the same front-loaded journey hid the distinction between their needs.</p>
                <div className={styles.findings}>
                  <h3>The problem was the order of the journey</h3>
                  <dl>
                    <div><dt>Product value arrived too late</dt><dd>The dashboard sat behind identity verification, leaving little context for why users should continue.</dd></div>
                    <div><dt>Different intentions met the same gate</dt><dd>Crypto-only access and fiat features were treated as a single onboarding requirement.</dd></div>
                    <div><dt>Authentication needed its own rethink</dt><dd>A competitive review of Rabby, Rainbow, Phantom and Fuse informed the exploration of passkeys, device choice and recovery.</dd></div>
                  </dl>
                </div>
              </div>
            </section>

            <section className={styles.section} id="decisions" tabIndex={-1}>
              <h2>Organise access around what the user needs</h2>
              <div className={styles.prose}>
                <p>I rebuilt the individual flow around an email profile, passkey registration and entry to the dashboard. Identity verification then appeared in the context of the feature a person wanted to use.</p>
                <div className={styles.findings}>
                  <h3>Two access paths in ENTA</h3>
                  <dl>
                    <div><dt>Crypto-only access</dt><dd>The proposed profile gives users access to stablecoin send, receive and swap without completing ENTA’s identity-verification upgrade first.</dd></div>
                    <div><dt>Crypto and fiat access</dt><dd>Fiat onramp, offramp, conversion and higher limits remain visible with locked states that explain the verification required to use them.</dd></div>
                  </dl>
                </div>
                <p>The dashboard needed to work before, during and after verification. Each locked action had to explain the value of the upgrade clearly enough for users to make an informed next move.</p>
                <h3>Account type and device choice shape the route</h3>
                <p>The flow map connects individual and business entry points with mobile and desktop passkey paths. It makes the device handoff, wallet creation and business-workspace setup visible as parts of the authentication journey.</p>
                <Evidence file="user-flow" width={4168} height={7392} flow alt="ENTA user-flow diagram branching between individual and corporate accounts, mobile and desktop, email magic links, and phone or device passkeys" caption="The authentication flow maps account and device choices through to a wallet or business workspace. Select the diagram to enlarge it." />
              </div>
            </section>

            <section className={styles.section} id="exploration" tabIndex={-1}>
              <h2>From flow decisions to interface details</h2>
              <div className={styles.prose}>
                <p>The one-week sprint called for early feedback on the flow. I used Claude Design to explore and refine prototypes, with Figma carrying the design and handoff work.</p>
                <p>Two moments needed particular care: explaining a locked action before asking for verification, and helping users choose where to create their passkey. The first makes the next step relevant; the second connects sign-up with returning on another device.</p>
                <Evidence file="claude-ideation-1" width={3110} height={1968} alt="Claude Design workspace showing an earlier ENTA sign-up prototype, scenario controls and implementation discussion" caption="An earlier sign-up exploration in Claude Design, including controls for trying different states." />
                <Evidence file="claude-ideation-2" width={3108} height={1970} alt="Claude Design workspace showing an ENTA sign-in exploration and feedback referencing the Figma design" caption="Feedback connects the prototype’s typography, spacing and visual details with the Figma design." />
              </div>
            </section>

            <section className={styles.section} id="prototype" tabIndex={-1}>
              <h2>Explore the onboarding and wallet prototypes</h2>
              <div className={styles.prose}>
                <p>Switch between individual and business entry points and the wallet dashboards. These later prototype views show the wider ENTA experience alongside the individual onboarding work.</p>
                <p className={styles.prototypeNote}>The demo uses mock data and simulated passkeys. Individual sign-up reaches email confirmation; the individual dashboard opens the separate Tier 2 prototype.</p>
              </div>
              <EntaDemo />
            </section>

            <section className={styles.section} id="delivery" tabIndex={-1}>
              <h2>Handoff and product screens</h2>
              <div className={styles.prose}>
                <p>The handoff brought the linked flows together in Figma for engineering. Copy review ran alongside design QA, with attention to the passkey setup moment and the dashboard’s verification states.</p>
                <p>The selected screens below cover individual sign-up and wallet access, plus business account selection, passkey setup and verification. Open any screen to inspect it at full resolution.</p>
              </div>
              <DeliverGallery />
            </section>

            <section className={styles.section} id="outcomes" tabIndex={-1}>
              <h2>What changed</h2>
              <div className={styles.prose}>
                <p>The design brought the wallet earlier in the individual journey. Passkey-led authentication replaced the password-led structure, while the dashboard explained which actions were ready and which needed verification.</p>
                <p>The earlier case study reports under one minute to the dashboard for crypto-only users, and under four minutes through KYC for crypto-and-fiat users. It does not document how those timings were established.</p>
                <p>The useful shift was a clear path from an available action to an optional upgrade. Users could see the feature they were working towards, rather than completing setup without knowing what came next.</p>
              </div>
            </section>

            <section className={styles.section} id="learnings" tabIndex={-1}>
              <h2>What I learned</h2>
              <div className={styles.prose}>
                <h3>Define the first useful moment</h3>
                <p>Completing every setup step is not the same as reaching value. Starting with the user’s first useful action makes it easier to decide which requirements belong upfront and which belong in the product.</p>
                <h3>Make the upgrade worth understanding</h3>
                <p>A locked feature is still part of the experience. Its label and explanation should help users understand the benefit and the work required to unlock it.</p>
                <h3>Design authentication beyond sign-up</h3>
                <p>The passkey decision extends into device changes, return visits and recovery. Those paths need to be considered together so a shorter first journey does not create confusion later.</p>
              </div>
              <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/carbon">Unifying Carbon’s banking experience across Android and iOS <span aria-hidden="true">↗</span></Link></nav>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
