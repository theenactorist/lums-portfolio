import Link from '../../components/SiteLink';
import Image from 'next/image';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import CaseStudyAnimation from '../../components/CaseStudyAnimation';
import ZoomableImage from '../../components/case-studies/ZoomableImage';
import '../../components/case-studies/shell-compat.css';
import '../ai-copywriting/reference-fonts.css';
import './carbon-shell.css';
import styles from './page.module.css';
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon';

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'research', label: 'What customers needed' },
  { id: 'decisions', label: 'One experience, two platforms' },
  { id: 'exploration', label: 'Exploration & usability testing' },
  { id: 'experience', label: 'The redesigned home screen' },
  { id: 'delivery', label: 'Engineering handoff & QA' },
  { id: 'results', label: 'Results & recognition' },
  { id: 'learnings', label: 'What I learned' },
];

function Evidence({ file, alt, caption, width = 3464, height = 1840 }) {
  return (
    <figure className={styles.evidence}>
      <ZoomableImage src={`/work/carbon/${file}.jpg`} alt={alt} width={width} height={height} sizes="(max-width: 767px) 90vw, (max-width: 991px) 80vw, 744px" className={styles.evidenceImage} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function CarbonCaseStudy() {
  return (
    <main id="carbon-case" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span>Carbon</span></nav>
            <h1>Unifying Carbon’s banking experience across Android and iOS</h1>
            <div className={styles.intro}><p>Redesigning the home screen to prioritise credit and everyday actions, improve balance privacy, and bring both mobile platforms into one consistent experience.</p></div>
          </div>
          <CaseStudyAnimation src="/work/carbon/cover.gif" poster="/work/carbon/cover-poster.png" alt="Carbon release animation showing the refreshed mobile banking experience" label="Carbon overview animation" priority className={styles.heroEvidence} />
        </header>
        <div className={styles.articleLayout}>
          <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></aside>
          <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></details>
          <article className={styles.article}>
            <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
              <div className={styles.overviewLabel}>At a glance</div>
              <h2>Customers saw two different versions of Carbon, depending on their phone.</h2>
              <div className={styles.overviewLayout}>
                <dl className={styles.facts}>
                  <div><dt>Company</dt><dd>Carbon<br /><a href="https://www.getcarbon.co/" target="_blank" rel="noopener noreferrer"><LinkArrowLabel>Visit Carbon</LinkArrowLabel><span className={styles.srOnly}> (opens in a new tab)</span></a></dd></div>
                  <div><dt>Industry</dt><dd>Fintech, B2C banking</dd></div>
                  <div><dt>Role</dt><dd>Product Designer<br />User research</dd></div>
                  <div><dt>Team</dt><dd>1 product manager<br />3 product designers<br />6 engineers<br />1 product marketer<br />1 QA engineer</dd></div>
                  <div><dt>Period</dt><dd>February 2023 · 4 weeks</dd></div>
                </dl>
                <div className={styles.overviewCopy}>
                  <p>Carbon is a credit-led digital bank in Nigeria with more than four million customers. Its services span loans, payments, investments and personal money management.</p>
                  <h3>Impact TLDR:</h3>
                  <ul>
                    <li>I contributed product design and user research as part of the three-designer team.</li>
                    <li>The release brought Android and iOS together through a shared design system and a clearer home screen.</li>
                    <li>Recorded team outcomes included an <strong>81% increase in customer satisfaction</strong>, a <strong>25% increase in registrations</strong> and <strong>10% dormant-account reactivation</strong>.</li>
                  </ul>
                  <a className={styles.resultLink} href="#results">Results and recognition</a>
                </div>
              </div>
            </section>
            <section className={styles.section} id="research" tabIndex={-1}>
              <h2>What customers needed from the home screen</h2>
              <div className={styles.prose}>
                <p>The home screen was crowded, and its hierarchy made the loan product harder to find. Data analysis identified credit as customers’ most important need, but the interface did not give it a clear enough place.</p>
                <p>Support tickets and app-store reviews exposed another problem: customers asked whether Carbon had two different applications. Android and iOS looked and behaved differently, so changing phones also meant learning a different interface.</p>
                <p>Discovery brought together user interviews, competitive analysis and literature review to understand those needs. The design priorities became clearer access to credit, a familiar experience on either platform and more control over visible balances.</p>
                <Evidence file="solution-1" width={1732} height={1801} alt="Old Carbon iOS and Android home screens, showing different layouts, typography and navigation" caption="The previous iOS and Android interfaces. The differences went beyond appearance: the same banking tasks occupied different places on each home screen." />
              </div>
            </section>
            <section className={styles.section} id="decisions" tabIndex={-1}>
              <h2>One experience, two platforms</h2>
              <div className={styles.prose}>
                <p>The redesign used Carbon’s Hydrogen Design System to bring the two platforms into one visual language. The information architecture put credit and everyday banking actions into clearer, more consistent locations.</p>
                <div className={styles.findings}>
                  <h3>Three decisions shaped the direction</h3>
                  <dl>
                    <div><dt>Give credit a dedicated home</dt><dd>A persistent Loans tab grouped loan applications, loan history and credit education. Cards moved into Quick Access alongside other everyday actions.</dd></div>
                    <div><dt>Make the interface familiar on either phone</dt><dd>Shared typography, icons and components replaced the separate Android and iOS treatments.</dd></div>
                    <div><dt>Let customers choose what others can see</dt><dd>Balance hiding extended across account, loan and savings views. Hiding the account balance also concealed transaction figures.</dd></div>
                  </dl>
                </div>
                <Evidence file="solution-2" width={1696} height={1802} alt="New harmonized Carbon home screen with annotations for the Hydrogen Design System, Loans navigation, consistent fonts and icons, and hidden balances" caption="The documented direction connects hierarchy, platform consistency and balance privacy in one home-screen system." />
              </div>
            </section>
            <section className={styles.section} id="exploration" tabIndex={-1}>
              <h2>Exploration and usability testing</h2>
              <div className={styles.prose}>
                <p>Four explorations compared different arrangements of the balance area, credit entry points, Quick Access and transaction history. They show the hierarchy choices behind the final interface.</p>
                <Evidence file="develop-main" alt="Four Carbon home-screen explorations labelled Ideation 1, Ideation 2, Ideation 3 and Ideation 4" caption="The four recorded explorations, shown together so their balance, action and navigation treatments can be compared." />
                <h3>A Loans tab still needed to be noticed</h3>
                <p>The archived usability conclusions show that participants found loans through the cards but overlooked the bottom tab. Moving a feature into persistent navigation did not, by itself, make that route visible enough.</p>
                <p>The notes also raised concerns about trust, USSD access and referrals. Those findings broadened the conversation beyond the visual redesign to how customers understood and recommended Carbon.</p>
                <div className={styles.evidencePair}>
                  <Evidence file="develop-1" width={1702} height={1840} alt="Carbon usability-testing report contents, created by Olumide Olusesi, covering objectives, methods, tasks and conclusions" caption="The archived usability report documents the study’s structure. It is visibly dated October 2022." />
                  <Evidence file="develop-2" width={1702} height={1840} alt="Usability-test conclusions noting that participants found loans through cards and overlooked the bottom tab, alongside trust, USSD and referral concerns" caption="The conclusions preserve the navigation finding and the wider concerns raised during testing." />
                </div>
              </div>
            </section>
            <section className={styles.section} id="experience" tabIndex={-1}>
              <h2>The redesigned home screen</h2>
              <div className={styles.prose}>
                <p>The final experience brings the balance, money actions, credit offers, Quick Access and transactions into a shared hierarchy. Customers can hide sensitive figures while keeping their everyday actions available.</p>
                <figure className={styles.evidence}>
                  <CaseStudyAnimation src="/work/carbon/solution-3.gif" poster="/work/carbon/solution-3-poster.png" alt="Animated presentation of the redesigned Carbon home screen and its banking features" label="Carbon home screen animation" className={styles.bodyAnimation} style={{ aspectRatio: 'auto' }} />
                  <figcaption>The original animation presents the refreshed home screen and its banking features.</figcaption>
                </figure>
                <p><a href="https://youtu.be/62txB2xvgMY?si=Qwv2uB6Cul8MkfeJ" target="_blank" rel="noopener noreferrer"><LinkArrowLabel>Watch Carbon’s feature launch video</LinkArrowLabel><span className={styles.srOnly}> (opens in a new tab)</span></a></p>
              </div>
            </section>
            <section className={styles.section} id="delivery" tabIndex={-1}>
              <h2>Engineering handoff and implementation QA</h2>
              <div className={styles.prose}>
                <p>Comparing production with the prototype made implementation details visible. The review annotated balance visibility when returning from Savings, button padding and text alignment, completed-transaction history and the orientation of the Account icon.</p>
                <Evidence file="deliver-1" alt="Production and prototype comparison with engineering QA notes about balance privacy, button padding, transaction history and Account navigation icons" caption="The production-versus-prototype checkpoint records specific issues for engineering to resolve." />
                <p>The in-app announcement explained the changes in terms of customers’ existing habits: choose what stays hidden, find Cards in Quick Access and use Loans in the bottom navigation. It made the new information architecture visible during the transition.</p>
                <Evidence file="deliver-2" alt="Carbon’s in-app feature announcement explaining hidden balances and transaction figures, Cards in Quick Access, and Loans in bottom navigation" caption="The feature announcement introduces the new navigation and privacy controls inside the app." />
              </div>
            </section>
            <section className={styles.section} id="results" tabIndex={-1}>
              <h2>Results and recognition</h2>
              <div className={styles.prose}>
                <p>The project recorded increases in customer satisfaction and registrations, alongside dormant-account reactivation. These are outcomes of the team’s release.</p>
                <figure className={styles.metrics}>
                  <dl>
                    <div><dt>81%</dt><dd>Increase in customer satisfaction</dd></div>
                    <div><dt>25%</dt><dd>Increase in user registrations</dd></div>
                    <div><dt>10%</dt><dd>Dormant accounts reactivated during the release month</dd></div>
                  </dl>
                  <figcaption>The original project record supplies these outcomes without the underlying analytics or measurement method.</figcaption>
                </figure>
                <p>Captured release feedback includes customers recognising the design team and asking for further features, including dark mode and a referral link.</p>
                <Evidence file="solution-4" alt="Captured Carbon release feedback with a CEO team-recognition post, customer praise, new-look and update-preference polls, and requests for dark mode and a referral link" caption="Customer reactions and release polls. The new-look poll shown here is separate from the recorded satisfaction increase above." />
                <blockquote className={styles.quote}>
                  <p>“I&apos;m really proud of what the @get_carbon team are delivering and this new design change of the Carbon app is just one of the many new changes that are coming. Our mission is not just to change the way you bank, but change your life by banking with us!”</p>
                  <footer><Image src="/work/carbon/testimonial-avatar.png" alt="Chijioke Dozie" width={56} height={56} /><div><strong>Chijioke Dozie</strong><br />CEO, Carbon · recognising the team’s release</div></footer>
                </blockquote>
              </div>
            </section>
            <section className={styles.section} id="learnings" tabIndex={-1}>
              <h2>What I learned</h2>
              <div className={styles.prose}>
                <h3>Listen before the public release</h3>
                <p>Customer conversations help test whether a simpler screen is also easier to use. The overlooked Loans tab is a reminder to check how people find a feature, even when its location seems clear in the design.</p>
                <h3>Trust is part of everyday interaction</h3>
                <p>Balance privacy and a familiar interface matter alongside access to banking features. A cleaner visual system supports that experience, while customer feedback reveals the concerns the interface alone cannot address.</p>
              </div>
              <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/sabi"><LinkArrowLabel>Designing a multi-role commerce and delivery platform for Sabi</LinkArrowLabel></Link></nav>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
