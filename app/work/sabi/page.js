'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const LOGISTICS_PROTOTYPE = 'https://www.figma.com/proto/bPPhujl82PmJOJBOmEiMEs/Logistics-Solution?type=design&node-id=4900-95694&t=3ox0XQa8OIhpdDr5-0&scaling=scale-down-width&starting-point-node-id=4900%3A95694&hide-ui=1';
const DRIVER_PROTOTYPE = 'https://www.figma.com/proto/bPPhujl82PmJOJBOmEiMEs/Logistics-Solution?type=design&node-id=6573-95612&t=3ox0XQa8OIhpdDr5-0&scaling=scale-down&starting-point-node-id=6573%3A95612&hide-ui=1';

export default function SabiCaseStudy() {
  return (
    <PageTransition>
      <main className="cs-page">
        {/* ===== HERO ===== */}
        <section className="project-hero" style={{ backgroundColor: '#1e1e28' }}>
          <div className="container">
            <motion.div
              className="project-hero__content"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="project-hero__client">Case Study · Sabi</span>
              <h1 className="project-hero__title">
                Navigating Complexity: Revolutionizing Supply Chain Logistics for African SMEs
              </h1>
              <p className="project-hero__subtitle">
                Sabi is Africa&apos;s leading provider of enabling infrastructure powering the
                distribution of goods and services. Founded with a solutions-oriented approach to
                solving commercial challenges, Sabi has grown to become a significant player in
                global supply chain services, focusing on the processes involved in the sourcing
                and distribution of physical goods and commodities across diverse markets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== META GRID ===== */}
        <section className="cs-meta-section section">
          <div className="container">
            <motion.div className="cs-meta" {...fadeUp}>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Role</span>
                <span className="cs-meta__value">Product Design</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Duration</span>
                <span className="cs-meta__value">2 months</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">Industry</span>
                <span className="cs-meta__value">Logistics, E-commerce</span>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">For</span>
                <span className="cs-meta__value">Sabi</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== COVER ===== */}
        <section className="cs-cover-section">
          <div className="container">
            <motion.figure className="cs-cover" {...fadeUp}>
              <Image
                src="/work/sabi/cover.gif"
                alt="Sabi product mockups showcasing logistics dashboard and mobile apps"
                width={1200}
                height={675}
                unoptimized
                priority
                className="cs-cover__image"
              />
            </motion.figure>
          </div>
        </section>

        {/* ===== CHALLENGE ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label">
                <span>Challenge</span>
              </div>
              <div className="cs-prose__content">
                <p>
                  Traditional logistics solutions often fail to address the unique demands of these
                  SME merchants, resulting in delays, inventory mismanagement, and a lack of
                  transparency in the supply chain.
                </p>
                <p>
                  The challenge lies in developing and implementing a scalable, robust digital
                  platform that provides holistic solutions for supply chain management and
                  integrates financial services tailored to the needs of African SMEs in the FMCG,
                  electronics, and textiles industries.
                </p>
                <p>
                  This platform must overcome the existing logistical bottlenecks, improve supply
                  chain visibility, facilitate easy access to restocking, ensure timely delivery of
                  goods, and enhance overall operational efficiency, thereby enabling these
                  businesses to thrive in a competitive global landscape.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SOLUTION & IMPACT ===== */}
        <section className="cs-prose section">
          <div className="container">
            <motion.div className="cs-prose__row" {...fadeUp}>
              <div className="cs-prose__label">
                <span>Solution &amp; Impact</span>
              </div>
              <div className="cs-prose__content">
                <p>
                  Sabi&apos;s digital ecosystem transforms supply chain and logistics for SMEs in
                  Africa, focusing on sectors like FMCG, electronics, and textiles. It integrates
                  an E-commerce app for merchants with platforms for suppliers, drivers, and
                  logistics management, streamlining procurement, inventory management, and
                  delivery. This approach enhances efficiency and simplifies transactions across
                  the supply chain. My role was to work on the e-commerce and delivery
                  applications.
                </p>
                <p>
                  The platform&apos;s impact is substantial, with over 175,000 merchants and $200
                  million in sales, reflecting its effectiveness in overcoming regional business
                  challenges. The recent $38 million funding further validates Sabi&apos;s
                  potential for growth and its role in boosting African SMEs&apos; competitiveness
                  and economic contribution.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== METRICS ===== */}
        <section className="cs-metrics-section section">
          <div className="container">
            <motion.div className="cs-metrics" {...fadeUp}>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">175,000</span>
                <span className="cs-metrics__label">Wholesalers &amp; retailers</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">$200m</span>
                <span className="cs-metrics__label">Value of goods sold</span>
              </div>
              <div className="cs-metrics__item">
                <span className="cs-metrics__value">$38m</span>
                <span className="cs-metrics__label">Series B funding</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DIVIDER ===== */}
        <section className="container">
          <motion.div className="cs-divider" {...fadeUp}>
            The Solutions
          </motion.div>
        </section>

        {/* ===== LOGISTICS PLATFORM ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Logistics platform</h2>
              <p className="cs-feature__intro">
                The logistics product feature enables the monitoring of fulfillment and operation
                processes and overall supply chain management for our partners. Our partners are
                provided with the following functionalities on their dashboard:
              </p>
              <h3 className="cs-feature__deliverables-label">Key deliverables</h3>
              <ul className="cs-feature__list">
                <li>A dashboard of important logistics metrics</li>
                <li>Sabi Feed — a feed of pending logistics requests</li>
                <li>Trips — monitoring trips and schedules</li>
                <li>Vehicles — tracking &amp; monitoring vehicles</li>
                <li>Reports — overview of all activities</li>
                <li>Finance — enables payment tracking</li>
                <li>Team — view and manage drivers</li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--split">
                <figure className="cs-feature__figure cs-feature__figure--portrait">
                  <Image
                    src="/work/sabi/logistics-mobile.png"
                    alt="Logistics platform mobile view"
                    width={283}
                    height={569}
                    className="cs-feature__image"
                  />
                </figure>
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/sabi/logistics-desktop.png"
                    alt="Logistics platform desktop dashboard"
                    width={971}
                    height={994}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <div className="cs-feature__footer">
                <p className="cs-feature__caption">
                  Mockups showing the UI of the Logistics web app
                </p>
                <a
                  href={LOGISTICS_PROTOTYPE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-feature__cta"
                >
                  View prototype
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DRIVER APP ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Driver app</h2>
              <p className="cs-feature__intro">
                The driver app enables our registered logistics partners to give access to their
                drivers and deliver items to our customers. The main functionalities provided by
                the application are:
              </p>
              <h3 className="cs-feature__deliverables-label">Key deliverables</h3>
              <ul className="cs-feature__list">
                <li>Dashboard — list of items to deliver and cost estimate</li>
                <li>Trips — pick-up status, drop-off details, and navigation</li>
                <li>Profile — bio-data and past trips</li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--trio">
                {['driver-1', 'driver-2', 'driver-3'].map((name, i) => (
                  <figure key={name} className="cs-feature__figure cs-feature__figure--portrait">
                    <Image
                      src={`/work/sabi/${name}.png`}
                      alt={`Driver app mobile screen ${i + 1}`}
                      width={425}
                      height={853}
                      className="cs-feature__image"
                    />
                  </figure>
                ))}
              </div>

              <div className="cs-feature__footer">
                <p className="cs-feature__caption">
                  Mockups showing the UI of Drivers&apos; mobile app
                </p>
                <a
                  href={DRIVER_PROTOTYPE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-feature__cta"
                >
                  View prototype
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SUPPLIERS PLATFORM ===== */}
        <section className="cs-feature section">
          <div className="container">
            <motion.div className="cs-feature__inner" {...fadeUp}>
              <h2 className="cs-feature__title">Suppliers platform</h2>
              <p className="cs-feature__intro">
                The supplier platform is used by Sabi Suppliers to manage their inventory, product
                catalog, and process orders from Sabi&apos;s demand channels. The main
                functionalities provided by the platform are:
              </p>
              <h3 className="cs-feature__deliverables-label">Key deliverables</h3>
              <ul className="cs-feature__list">
                <li>Dashboard — snapshot of important business metrics</li>
                <li>
                  Sabi Feed — feed of products ordered by Sabi&apos;s customers awaiting processing
                </li>
                <li>Orders — view the list of ordered products assigned to a supplier and their status</li>
                <li>Inventory — manage inventory (prices, details, stock)</li>
              </ul>

              <div className="cs-feature__gallery cs-feature__gallery--single">
                <figure className="cs-feature__figure">
                  <Image
                    src="/work/sabi/suppliers.png"
                    alt="Suppliers platform desktop dashboard"
                    width={1457}
                    height={1076}
                    className="cs-feature__image"
                  />
                </figure>
              </div>

              <div className="cs-feature__footer">
                <p className="cs-feature__caption">
                  Mockups showing the UI of the Suppliers platform
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DIVIDER ===== */}
        <section className="container">
          <motion.div className="cs-divider" {...fadeUp}>
            Behind the Scenes
          </motion.div>
        </section>

        {/* ===== RESEARCH ===== */}
        <section className="cs-research section">
          <div className="container">
            <motion.div className="cs-research__inner" {...fadeUp}>
              <h2 className="cs-research__title">Research</h2>
              <p className="cs-research__intro">
                To ensure the platform meets the unique needs of its users within the African SME
                landscape, research aimed to understand the existing market, user behaviors, and
                the challenges faced by merchants, suppliers, and logistics partners. The following
                types of UX research were conducted:
              </p>
              <div className="cs-research__grid">
                <div className="cs-research__item">
                  <h3 className="cs-research__item-label">Competitive analysis</h3>
                  <p>
                    Reviewing existing products like TradeDepot, Omnibiz, Tajir, and MarketForce
                    provided insights into the competitive landscape. This analysis helped identify
                    gaps in the market and opportunities for differentiation. Jakob&apos;s Law of
                    internet user experience was considered, emphasizing the importance of aligning
                    Sabi&apos;s platform with users&apos; expectations based on their experience
                    with other sites.
                  </p>
                </div>
                <div className="cs-research__item">
                  <h3 className="cs-research__item-label">Literature review</h3>
                  <p>
                    An extensive review of industry-related articles to understand the intricacies
                    of the supply chain and logistics sectors in Africa. This helped identify key
                    challenges and opportunities for innovation. The process was needed to
                    eliminate Confirmation Bias and avoid undervaluing information that contradicts
                    my beliefs.
                  </p>
                </div>
                <div className="cs-research__item">
                  <h3 className="cs-research__item-label">User interviews</h3>
                  <p>
                    Interviews with warehouse staff, supplier personnel, and logistics partners
                    were critical in understanding the existing processes and pinpointing
                    opportunities for automation and efficiency improvements. These insights were
                    analyzed through the lens of Nielsen&apos;s Usability Heuristic of &apos;Match
                    between system and the real world&apos;, ensuring the platform&apos;s design
                    speaks the users&apos; language.
                  </p>
                </div>
                <div className="cs-research__item">
                  <h3 className="cs-research__item-label">Usability testing</h3>
                  <p>
                    Early prototypes were tested with supplier personnel and logistics partners to
                    identify usability issues and areas for improvement. Testing was framed around
                    Nielsen&apos;s Heuristic of User Control and Freedom, allowing users to
                    experiment with the navigation and functionality, ensuring users never feel
                    lost or trapped within the app interface.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LEARNINGS ===== */}
        <section className="cs-learnings section">
          <div className="container">
            <motion.div className="cs-learnings__inner" {...fadeUp}>
              <h2 className="cs-learnings__title">Learnings</h2>
              <p className="cs-learnings__intro">
                Takeaways that underscore a growth process for me.
              </p>
              <ul className="cs-learnings__list">
                <li>
                  <strong>Simplicity in design:</strong> Striving for simplicity helps create more
                  intuitive and easy-to-use products. It&apos;s crucial to focus on core
                  functionalities that meet the primary needs of users, rather than overwhelming
                  them with features.
                </li>
                <li>
                  <strong>Adapting to change is crucial:</strong> In long-term projects, external
                  factors such as market trends, technology advancements, and regulatory changes
                  can impact product requirements and user expectations. Being flexible and open to
                  pivoting the product strategy is key to staying relevant.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ===== NEXT / BACK ===== */}
        <section className="project-next">
          <div className="container">
            <Link href="/work" className="project-next__link">
              <motion.div
                className="project-next__inner"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="project-next__label">Explore more</span>
                <h2 className="project-next__title">Back to work</h2>
                <div className="project-next__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
