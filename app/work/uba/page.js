import Link from '../../components/SiteLink';
import Image from 'next/image';
import ZoomableImage from '../../components/case-studies/ZoomableImage';
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail';
import AnimatedHero from './AnimatedHero';
import WhimsicalViewer from './WhimsicalViewer';
import '../../components/case-studies/shell-compat.css';
import '../ai-copywriting/reference-fonts.css';
import './uba-shell.css';
import styles from './page.module.css';

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'problem', label: 'Why HR needed a new platform' },
  { id: 'discovery', label: 'Discovery & priorities' },
  { id: 'workflows', label: 'Connecting the workflows' },
  { id: 'testing', label: 'Design & usability testing' },
  { id: 'delivery', label: 'From design to delivery' },
  { id: 'results', label: 'Results & recognition' },
];
const links = {
  uba: 'https://www.ubagroup.com/',
  hcm: 'https://hcmconnect.ubagroup.com/',
  userflow: 'https://whimsical.com/hr-sanctions-userflows-5FB17bJA29mCUEUzw7HQFD@AhRp651J2qBSxRy6kQZC3FAEX',
  wireframes: 'https://whimsical.com/hr-sanctions-wireframes-EpmyxbnscnxDPuBBuKPdhS@AhRp651J2qVi9nHELRqnUVjYb',
};
function ExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>;
}
function Evidence({ file, alt, caption, width = 3464, height = 1840, href, linkLabel }) {
  return (
    <figure className={styles.evidence}>
      <ZoomableImage src={`/work/uba/${file}.jpg`} alt={alt} width={width} height={height} sizes="(max-width: 991px) 90vw, 740px" className={styles.evidenceImage} />
      <figcaption>{caption}{linkLabel && <div className={styles.evidenceLink}><WhimsicalViewer href={href} label={linkLabel} title={{ userflow: 'User flow', sketches: 'Sketches', wireframes: 'Wireframes' }[file]} src={`/work/uba/${file}.jpg`} alt={alt} width={width} height={height} /></div>}</figcaption>
    </figure>
  );
}
export default function UBACaseStudy() {
  return (
    <main id="uba-case" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span>UBA</span></nav>
            <h1>Taking an enterprise HR platform from concept to production</h1>
            <div className={styles.intro}><p>I contributed to the design of HCMConnect, UBA’s in-house HR platform for 10,000+ employees, from discovery and connected workflows to prototypes, testing and engineering handoff.</p></div>
          </div>
          <AnimatedHero className={styles.heroEvidence} />
        </header>
        <div className={styles.articleLayout}>
          <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" /></aside>
          <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" /></details>
          <article className={styles.article}>
            <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
              <div className={styles.overviewLabel}>At a glance</div>
              <h2>The goal was to connect HR operations: give employees, managers and HR partners a shared platform for requests, approvals and employee information.</h2>
              <div className={styles.overviewLayout}>
                <dl className={styles.facts}>
                  <div><dt>Company</dt><dd>United Bank for Africa<br /><ExternalLink href={links.uba}>Visit UBA</ExternalLink></dd></div>
                  <div><dt>Industry</dt><dd>Banking, Enterprise HR</dd></div>
                  <div><dt>Role</dt><dd>Product Designer</dd></div>
                  <div><dt>Tools</dt><dd>Figma, Whimsical, Research, User Interview, Prototyping</dd></div>
                  <div><dt>Team</dt><dd>3 product designers, 16 engineers, 1 product manager, 2 QA engineers</dd></div>
                  <div><dt>Period</dt><dd>January 2020 · 12 months</dd></div>
                </dl>
                <div className={styles.overviewCopy}>
                  <p>HR requests depended on fragmented Salesforce processes, paper forms, spreadsheets and email. HCMConnect brought employee self-service, manager approvals and HR administration into an in-house platform.</p>
                  <h3>Impact TLDR:</h3>
                  <ul>
                    <li>I contributed to the enterprise HR platform’s design, working with the wider design and engineering team.</li>
                    <li>The platform served a workforce of <strong>10,000+ employees</strong> and improved HR efficiency by <strong>30%</strong>.</li>
                    <li>The wider move to in-house automation contributed to approximately <strong>$960K in annual enterprise licence savings</strong>.</li>
                  </ul>
                  <a className={styles.resultLink} href="#results">Results and recognition <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </section>
            <section className={styles.section} id="problem" tabIndex={-1}>
              <h2>Why HR needed a new platform</h2>
              <div className={styles.prose}>
                <p>HR business partners handled daily requests from more than 10,000 employees. Manual processing created delays, errors and backlogs. Even routine questions about leave entitlement or payslips required HR to find information spread across different sources.</p>
                <p>The shift to remote work during Covid-19 made those dependencies harder to manage. Employees and HR partners were away from the offices, files and documents they relied on to complete their work.</p>
                <p>HCMConnect became the shared place for employee management. The design had to connect the person making a request, the manager reviewing it and the administrator responsible for processing it.</p>
                <Evidence file="solution-1" alt="HCMConnect new-hire onboarding completion, with a next step to upload employment documents" caption="New-hire onboarding: a completed information step leads into document upload." />
                <Evidence file="solution-4" alt="HCMConnect course request approval with employee details, request information and approval actions" caption="Course request approval brings the employee, request details and decision into one view." />
                <Evidence file="solution-3" width={1702} alt="UBA first-day employee welcome email with a profile activation link" caption="An employee welcome email connects the first day at work with profile activation." />
              </div>
            </section>
            <section className={styles.section} id="discovery" tabIndex={-1}>
              <h2>Discovery and priorities</h2>
              <div className={styles.prose}>
                <p>Discovery combined interviews with employees and HR business partners with a literature review. We examined how requests were raised, how information was found and how approvals moved between people.</p>
                <div className={styles.findings}>
                  <h3>What the research revealed</h3>
                  <dl>
                    <div><dt>Requests were handled manually</dt><dd>Paper forms, Excel and Word carried the work. Email threads handled communication and approvals, making requests difficult to track.</dd></div>
                    <div><dt>Employee information was dispersed</dt><dd>Leave entitlement and payslip inquiries depended on data held in different places. Finding that information added to the backlog.</dd></div>
                  </dl>
                </div>
                <Evidence file="discovery" width={1702} alt="Microsoft Teams session reviewing HCMConnect requirements with the HR team" caption="Requirements review with the HR team over Microsoft Teams." />
                <h3>Define the platform around core HR needs</h3>
                <p>The information architecture grouped a broad set of HR modules by priority. Organisation design and core HR sat at the centre: structures, job descriptions, grades, the employee database, employee and manager self-service, and e-filing.</p>
                <p>Performance, personnel and talent management formed the next group. Payroll, recruitment, manpower planning, training and alumni services formed the outer group. The priority map gave the team a common view of the platform’s scope.</p>
                <Evidence file="define" width={1702} alt="Original HR module priority map, with organisation design and core HR at its centre" caption="The original priority map groups HR modules from the centre outward." />
              </div>
            </section>
            <section className={styles.section} id="workflows" tabIndex={-1}>
              <h2>Connecting the workflows</h2>
              <div className={styles.prose}>
                <p>User flows made the transitions between employees, managers and administrators visible. They helped us identify gaps, discuss the process with engineering and align the interface with the APIs needed to support it.</p>
                <Evidence file="userflow" alt="Original Whimsical flowcharts for HCMConnect HR sanctions and disciplinary-committee processes" caption="HR sanctions and disciplinary-committee flows connect the actions and decisions across roles." href={links.userflow} linkLabel="View user flow" />
                <h3>Explore the process before refining the interface</h3>
                <p>Sketches and wireframes let us work through the HR sanctions journey before moving into detailed mockups. These artifacts show how the workflow developed from early ideas into structured screens.</p>
                <Evidence file="sketches" alt="Early HCMConnect disciplinary-committee interface sketches in Whimsical" caption="Early sketches of the disciplinary-committee interface." linkLabel="View sketches" />
                <Evidence file="wireframes" alt="HCMConnect HR sanctions wireframes in Whimsical" caption="Wireframes translate the workflow into screens." href={links.wireframes} linkLabel="View wireframes" />
              </div>
            </section>
            <section className={styles.section} id="testing" tabIndex={-1}>
              <h2>Design and usability testing</h2>
              <div className={styles.prose}>
                <p>The high-fidelity designs developed the two connected sides of HCMConnect: employee self-service and HR administration. Employees needed to find information and raise requests; administrators needed the detail and controls to review and process them.</p>
                <Evidence file="hifi-2" alt="High-fidelity HCMConnect employee self-service screens, including leave requests and committee-sitting details" caption="Employee self-service mockups bring requests and employee information together." />
                <Evidence file="hifi-1" alt="High-fidelity HCMConnect HR administration and disciplinary-committee screens" caption="Administration mockups give HR a working view of requests and employee records." />
                <h3>Review each module with the people using it</h3>
                <p>After prototyping each module, we reviewed it with HR staff, administrators and selected employees over Microsoft Teams. Each module went through an average of two to three sessions before sign-off for implementation.</p>
                <p>Feedback from those sessions led to iterations before handoff. Testing remained part of the module-by-module delivery process.</p>
                <Evidence file="testing" alt="Original HCMConnect rewards and sanctions prototype review over Microsoft Teams" caption="A rewards and sanctions prototype review with the HR team." />
              </div>
            </section>
            <section className={styles.section} id="delivery" tabIndex={-1}>
              <h2>From design to delivery</h2>
              <div className={styles.prose}>
                <p>The final designs connected employee-facing journeys with the corresponding administrative work. Onboarding, recognition and course requests sat alongside request validation, appeals and other HR processes.</p>
                <Evidence file="final-1" alt="Final HCMConnect employee screens for recognition, onboarding and course request approval" caption="Final employee designs: recognition, onboarding and course request approval." />
                <Evidence file="final-3" alt="Final HCMConnect administration screens for appeals, appraisal and probation validation, and litigation requests" caption="Final administration designs: appeals, validation and litigation requests." />
                <Evidence file="final-2" alt="UBA notification designs for employee welcome, HR sanctions, a mood survey and a merchant claim reminder" caption="Employee and HR notifications, alongside a related UBA merchant-portal notice." />
                <h3>Make the handoff explain the journey</h3>
                <p>Handoff files were arranged in flows, with connectors showing how screens related to one another. Notes supplied additional context so engineers could understand the behaviour as well as the final interface.</p>
                <Evidence file="handoff" alt="HCMConnect engineering handoff showing connected annual-leave screens and notes" caption="Connected annual-leave screens and annotations in the engineering handoff." />
                <p><ExternalLink href={links.hcm}>Visit HCMConnect</ExternalLink></p>
                <details className={styles.disclosure}>
                  <summary>Related UBA communication design</summary>
                  <div><Evidence file="solution-2" width={1702} alt="UBA POS Merchant Portal claim reminder notice for a payment dispute" caption="A merchant-portal claim reminder from the wider UBA work." /></div>
                </details>
              </div>
            </section>
            <section className={styles.section} id="results" tabIndex={-1}>
              <h2>Results and recognition</h2>
              <div className={styles.prose}>
                <figure className={styles.metrics} aria-label="HR platform and in-house automation outcomes">
                  <dl><div><dt>30%</dt><dd>Improvement in HR efficiency</dd></div><div><dt>≈$960K</dt><dd>Annual enterprise licence savings</dd></div></dl>
                  <figcaption>The platform improved HR efficiency. The wider replacement of third-party enterprise applications with in-house automation contributed to the licence savings.</figcaption>
                </figure>
                <p>These were business outcomes of the team’s delivery. My contribution as a Product Designer covered understanding HR needs, workflow design, prototyping, testing and engineering handoff.</p>
                <h3>Excellent Project Delivery Award</h3>
                <blockquote className={styles.quote}>
                  <p>“This letter serves to commend you for your immense contribution towards the delivery of the HR automation platform which is currently live and in use. This is a sterling achievement borne out of your dedication, result-oriented approach and willingness to go the extra mile to ensure delivery of all envisioned and ad-hoc requirements of the platform. You are therefore issued a LETTER OF COMMENDATION.”</p>
                  <footer><Image src="/work/uba/testimonial-avatar.jpg" alt="" width={48} height={48} /><span><strong>Tonye Boham</strong><br />Head, HR Group Shared Service · UBA Group</span></footer>
                </blockquote>
              </div>
            </section>
            <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/carbon">Carbon — Revamping Fintech Home Screen Experience <span aria-hidden="true">→</span></Link></nav>
          </article>
        </div>
      </div>
    </main>
  );
}
