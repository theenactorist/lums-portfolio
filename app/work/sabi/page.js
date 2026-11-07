import Link from '../../components/SiteLink';
import Image from 'next/image';
import SabiContents from './SabiContents';
import SabiHeroMedia from './SabiHeroMedia';
import SabiBody from './SabiBody';
import { title } from './caseStudyContent';
import '../../components/case-studies/shell-compat.css';
import '../ai-copywriting/reference-fonts.css';
import './sabi-shell.css';
import styles from './page.module.css';
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon';

export default function SabiCaseStudy() {
  return (
    <main id="sabi-case" className={styles.page}>
      <div className="case-shell">
        <header className="case-header">
          <div className="hero-copy">
            <nav className="case-breadcrumb" aria-label="Breadcrumb">
              <Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span>Sabi</span>
            </nav>
            <h1>{title}</h1>
            <div className="intro-copy"><p>Connecting supplier order and inventory management, logistics operations, and driver delivery workflows in one platform.</p></div>
          </div>
          <SabiHeroMedia />
        </header>
        <div className="article-layout">
          <SabiContents />
          <article className="case-article">
            <section className="case-section case-overview" id="overview" tabIndex={-1}>
              <div className="overview-label">At a glance</div>
              <h2>The goal was to connect commerce and delivery: help suppliers manage orders, logistics partners oversee fulfilment and drivers complete deliveries.</h2>
              <div className="overview-layout">
                <dl className="project-facts">
                  <div><dt>Company</dt><dd>Sabi<br /><a href="https://www.sabi.am/" target="_blank" rel="noopener noreferrer"><LinkArrowLabel>Visit Sabi</LinkArrowLabel><span className="sr-only"> (opens in a new tab)</span></a></dd></div>
                  <div><dt>Industry</dt><dd>Logistics, E-commerce</dd></div>
                  <div><dt>Role</dt><dd>Product Design</dd></div>
                  <div><dt>Tools</dt><dd className="overview-tools"><span className="overview-tool"><Image src="/work/ai-copywriting/tools/figma.svg" width={20} height={20} alt="" aria-hidden="true" />Figma</span></dd></div>
                  <div><dt>Period</dt><dd>2021–2022</dd></div>
                  <div><dt>Duration</dt><dd>2 months</dd></div>
                </dl>
                <div className="overview-copy">
                  <p>Sabi’s ecosystem supports the sourcing and distribution of goods across FMCG, electronics and textiles. Each part of that chain needs a different view of the work: incoming orders, delivery requests or the next pickup and drop-off.</p>
                  <h3>Project TLDR:</h3>
                  <ul className="overview-tldr">
                    <li>My role focused on the e-commerce and delivery applications.</li>
                    <li>The documented suite includes a logistics platform, a driver app and a supplier platform across web and mobile.</li>
                    <li>Research included competitive analysis, literature review, user interviews and prototype usability testing.</li>
                  </ul>
                  <a className="overview-result-link" href="#logistics">Explore the product designs</a>
                </div>
              </div>
            </section>
            <SabiBody />
          </article>
        </div>
      </div>
    </main>
  );
}
