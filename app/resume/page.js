'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Resume() {
  const paperRef = useRef(null);

  const handleDownloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf(paperRef.current, {
      margin: 0,
      filename: 'Olumide-Olusesi-Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <PageTransition>
      <main className="resume-page">
        {/* Action bar */}
        <motion.div
          className="resume-actions container"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="resume-actions__left">
            <h1 className="resume-actions__title">Resume</h1>
            <p className="resume-actions__sub">Olumide Olusesi — Senior Product Designer</p>
          </div>
          <div className="resume-actions__right">
            <button
              className="resume-btn resume-btn--ghost"
              onClick={() => window.print()}
              aria-label="Print resume"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print
            </button>
            <button
              className="resume-btn resume-btn--primary"
              onClick={handleDownloadPDF}
              aria-label="Download resume as PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Resume paper */}
        <motion.div
          className="resume-paper-wrap container"
          variants={fadeUp}
          initial="initial"
          animate="animate"
        >
          <div className="resume-paper" ref={paperRef}>

            {/* Header */}
            <div className="rp-header">
              <div className="rp-contact">
                <div><a href="tel:+12369758435">(236) 975-8435</a></div>
                <div><a href="mailto:consistentolusesi@gmail.com">consistentolusesi@gmail.com</a></div>
                <div><a href="https://linkedin.com/in/olumideolusesi" target="_blank" rel="noopener noreferrer">linkedin.com/in/olumideolusesi</a></div>
                <div><a href="https://olumideolusesi.com" target="_blank" rel="noopener noreferrer">olumideolusesi.com</a></div>
                <div>Greater Toronto Area, Ontario, Canada</div>
              </div>
              <div>
                <h1 className="rp-name">Olumide Olusesi</h1>
                <p className="rp-title">Senior Product Designer</p>
              </div>
            </div>

            {/* Profile Summary */}
            <h2 className="rp-section">Profile Summary</h2>
            <p className="rp-body">Senior Product Designer with 7+ years leading end-to-end UX, UI, and content design for fintech products across KYC, lending, payments, and enterprise platforms. Canadian permanent resident with expertise in multi-market product design (Nigeria, Kenya, India), scalable design systems, and AI-augmented design operations. Has independently built 5+ production-ready apps and plugins using AI workflows and tools. Proven cross-functional leader who has served as de facto product owner, shipping revenue-generating products from zero to market.</p>

            {/* Work Experience */}
            <h2 className="rp-section">Work Experience</h2>

            {/* Shiga */}
            <div className="rp-role-row">
              <span className="rp-role-title">Senior Product Designer (Consultant)</span>
              <span className="rp-period">May 2024 – Present</span>
            </div>
            <p className="rp-company"><a href="https://shiga.io/" target="_blank" rel="noopener noreferrer">Shiga Onchain Banking</a></p>
            <ul className="rp-list">
              <li>Translated founders' vision into a viable, investor-ready product across three platforms (ENTA consumer wallet, FORGE corporate banking, Telegram Mini-app), designing pitch decks, product strategy, and end-to-end experiences that contributed directly to securing $1.2M in funding from Tether and acceptance into the Visa Accelerator program.</li>
              <li>Architected Shiga's design system (Helium 2.0) from the ground up, establishing a scalable token library spanning 263 color variables, typography, spacing, and radius tokens across light and dark modes, and shipping production-ready theme files for Android, iOS, and web that unified the product's visual identity from a raw concept into a recognizable, cohesive brand.</li>
              <li>Simplified complex cryptocurrency payment flows (Swap, Onramp, Offramp, Currency Conversion) by reworking information architecture, restructuring navigation patterns, and rewriting 100+ error messages across 12 categories with clear recovery paths, reducing payment-related errors by an estimated 40% based on support ticket trends.</li>
              <li>Shipped a fully functional Telegram Mini-App POS, built with Gemini and Claude on the Antigravity IDE, enabling merchant onboarding, account creation, crypto and fiat payment acceptance, and stablecoin/fiat deposit and withdrawal within a single Telegram interface. The working proof of concept directly secured a funding round from Telegram (TON), validating Shiga's Web3 merchant commerce strategy.</li>
              <li>Identified new revenue opportunities through customer engagement and competitive research, then designed and prototyped Payment Links with dual crypto/fiat settlement, a shareable Rate Calculator, and a cryptocurrency invoice page, expanding Shiga's product surface beyond its core wallet offering.</li>
              <li>Collaborated with marketing and growth to design and build segmented email automation workflows in MailerLite covering onboarding (Nigeria, Global, Business), post-KYC activation, and win-back sequences, achieving a 73% open rate on the reactivation campaign and establishing Shiga's first structured lifecycle marketing engine.</li>
              <li>Spearheading a KYC flow redesign targeting higher completion rates by reducing verification friction and improving requirement communication, alongside implementing multi-factor Transaction Authentication (PIN, Passkey, Authenticator, Email OTP) for the platform's Security settings.</li>
            </ul>

            {/* Branch */}
            <div className="rp-role-row">
              <span className="rp-role-title">Senior Product Designer</span>
              <span className="rp-period">Oct 2024 – March 2026</span>
            </div>
            <p className="rp-company"><a href="https://branch.co/" target="_blank" rel="noopener noreferrer">Branch International Financial Services</a></p>
            <ul className="rp-list">
              <li>Led the migration of wallet, rewards, home screen, loan, and KYC modules across Kenya, India, and Nigeria from a legacy system to Branch's Neem Design System, achieving 100% visual and functional consistency across 5 product modules and modernizing the mobile experience for millions of users.</li>
              <li>Redesigned a core KYC onboarding flow with an OTP-based pre-fill system, increasing approval rates from 42% to 56%, eliminating manual data entry errors by 35%, and directly increasing downstream loan applications and disbursements.</li>
              <li>Built a suite of AI-powered design tools — a Claude-based prototyping skill, a UX copywriting system (CopyGPT), and an illustration generator — adopted 500+ times across 6 teams in 4 countries (Nigeria, Kenya, India, US), reducing copywriting turnaround and eliminating dependency on external illustration sourcing.</li>
              <li>Created and led adoption of a unified Figma information architecture, reducing designer and manager search time by 30% and improving version control across 200+ prototypes and hi-fi screens.</li>
              <li>Adapted the web design system from mobile using tokens and Code Connect, reducing design-to-delivery time by 20% and increasing UI consistency across 6 products.</li>
              <li>Designed customer-facing security features (masked balances, transaction history) and multi-variant onboarding experiments, balancing compliance with user experience to improve loan application rates.</li>
              <li>Extended design impact beyond product teams: designed an employee recognition badge system from scratch, created all visual assets for a hiring fair (social media campaigns, branded merch), and supported People Ops and Marketing on campaigns that unblocked stalled hiring pipelines.</li>
              <li>Led design operations through weekly design reviews, QA sessions with engineers, product roadmap planning, and cross-functional collaboration across 3 teams: Core Design, Product, and Marketing/People Ops.</li>
            </ul>

            {/* Carbon */}
            <div className="rp-role-row">
              <span className="rp-role-title">Product Designer</span>
              <span className="rp-period">Jun 2022 – Oct 2024</span>
            </div>
            <p className="rp-company"><a href="https://getcarbon.co/" target="_blank" rel="noopener noreferrer">Carbon Finance</a></p>
            <ul className="rp-list">
              <li>Owned product strategy and design for Carbon Business — the company's first B2B lending product for SME working capital (₦200k–₦10M). Led a cross-functional team of 5, writing PRDs, running sprints, and managing stakeholders end-to-end — eliminating the need for contract PM. Designed the full KYB flow (document uploads, credit assessment) with under-48-hour disbursement, shipping from zero to $500k CAD disbursed in 9 months.</li>
              <li>Led end-to-end design for onboarding, lending, payments, and cards products from discovery through delivery, improving feature adoption by 20%.</li>
              <li>Harmonized Android and iOS home screen experiences to address security pain points and design discrepancies, resulting in heightened customer trust, a 15% boost in organic referrals, and increased user acquisition.</li>
              <li>Founded and grew a Beta-Testing Community to 120+ participants, capturing qualitative and quantitative insights that reduced external research costs by 25% and deepened the product team's direct line to users.</li>
              <li>Conducted user interviews, usability tests, and competitive analysis, partnering with the data team to translate behavioral analytics into actionable design insights.</li>
              <li>Standardized design handoff through guidelines and component libraries, improving design-to-development velocity by 30% and reducing review cycles.</li>
            </ul>

            {/* UBA */}
            <div className="rp-role-row">
              <span className="rp-role-title">Product Designer</span>
              <span className="rp-period">Nov 2019 – Jun 2022</span>
            </div>
            <p className="rp-company"><a href="https://www.ubagroup.com/" target="_blank" rel="noopener noreferrer">United Bank for Africa (UBA) Group</a></p>
            <ul className="rp-list">
              <li>Designed user experiences for financial mobile apps, ATMs, and kiosk interfaces through wireframing, prototyping, and multi-round usability testing across form factors, improving user satisfaction by 15%.</li>
              <li>Led end-to-end design for an enterprise HR automation web app serving 10,000+ employees, replacing Salesforce-based workflows with a purpose-built platform — improving HR efficiency by 30% and saving the organization ~$960k annually in license fees.</li>
              <li>Created foundational design-system guides including component documentation, usage patterns, and design tokens, adopted across multiple teams through workshops and design reviews — boosting product consistency by 25% and reducing design rework.</li>
            </ul>

            {/* Skills Summary */}
            <h2 className="rp-section">Skills Summary</h2>
            <ul className="rp-list">
              <li><strong>Design Leadership:</strong> Design systems, cross-functional collaboration, design operations, AI workflow integration (Claude, Stitch, Gemini, NotebookLM, Antigravity), documentation &amp; writing, product roadmap planning, design critiques, engineering &amp; stakeholder alignment.</li>
              <li><strong>Core Design:</strong> End-to-end UX/UI (mobile iOS/Android, Web), prototyping (Figma, FigJam, Framer), interaction design, typography, design thinking.</li>
              <li><strong>Research &amp; Strategy:</strong> Usability testing, user research &amp; interviews, journey mapping, A/B testing, heuristic evaluation, analytics-informed iteration, competitive analysis.</li>
              <li><strong>Technical &amp; Delivery:</strong> Vibe coding, design QA, acceptance criteria, user stories.</li>
            </ul>

            {/* Education */}
            <h2 className="rp-section">Education</h2>
            <div className="rp-role-row">
              <span className="rp-role-title">B.Sc. Civil Engineering</span>
              <span className="rp-period">2017</span>
            </div>
            <p className="rp-company">Obafemi Awolowo University</p>

            {/* Certifications */}
            <h2 className="rp-section">Certifications &amp; Mentorship</h2>
            <div className="rp-role-row" style={{ marginTop: '6px' }}>
              <span className="rp-role-title">Information Technology Professional (ITP) Canada</span>
              <span className="rp-period">2025</span>
            </div>
            <p className="rp-company">ICTC-CTIC</p>

            <div className="rp-role-row" style={{ marginTop: '10px' }}>
              <span className="rp-role-title">AI in UX/UI Design</span>
              <span className="rp-period">2023</span>
            </div>
            <p className="rp-company">Uxcel</p>

            <div className="rp-role-row" style={{ marginTop: '10px' }}>
              <span className="rp-role-title">Design Mentor</span>
              <span className="rp-period">2023 – Present</span>
            </div>
            <p className="rp-company"><a href="https://adplist.org/" target="_blank" rel="noopener noreferrer">ADPList</a> — 1,200+ minutes of mentorship across 41+ sessions</p>

          </div>
        </motion.div>
      </main>
    </PageTransition>
  );
}
