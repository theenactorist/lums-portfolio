import Link from 'next/link';
import ZoomableImage from '../../components/case-studies/ZoomableImage';
import PrototypeViewer from './PrototypeViewer';
import { logisticsPrototype, driverPrototype } from './caseStudyContent';
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon';

export default function SabiBody() {
  return (
    <>
      <section className="case-section" id="challenge" tabIndex={-1}>
        <h2>One supply chain, several ways of working</h2>
        <div className="section-copy">
          <p>For African SME merchants, delays, inventory problems and limited supply-chain visibility make restocking and delivery difficult. The challenge was to support commerce and distribution through a connected digital platform, with tools that fit the people doing the work.</p>
          <p>Merchants need access to goods. Suppliers need to process orders and manage stock. Logistics partners need to coordinate fulfilment, and drivers need the details to carry out each delivery. The platform brings these different responsibilities into the same ecosystem.</p>
          <p>The wider platform brief also included financial services tailored to African SMEs alongside supply-chain management.</p>
          <div className="coverage-grid">
            <div className="coverage-item"><h3>Commerce and inventory</h3><ul><li>Restocking for SME merchants</li><li>Product catalogues, prices and stock for suppliers</li><li>Incoming orders and processing status</li></ul></div>
            <div className="coverage-item"><h3>Fulfilment and delivery</h3><ul><li>Requests and schedules for logistics partners</li><li>Trips, vehicles, payments and driver teams</li><li>Pickup, drop-off and delivery details for drivers</li></ul></div>
          </div>
          <figure className="evidence-figure">
            <ZoomableImage src="/work/sabi/Navigating Complexity_ Revolutionizing Supply Chain Logistics for African SMEs.jpg" alt="Original Sabi mockup collage showing supplier dashboards and the driver trip interface" width={1768} height={1024} sizes="(max-width: 767px) 90vw, 800px" />
            <figcaption>The supplier and driver interfaces within Sabi’s wider commerce and delivery ecosystem.</figcaption>
          </figure>
        </div>
      </section>

      <section className="case-section" id="research" tabIndex={-1}>
        <h2>Understanding the people behind the orders</h2>
        <div className="section-copy">
          <p>The research focused on the African SME market and the existing processes of warehouse staff, supplier personnel and logistics partners. Competitive and literature reviews complemented interviews and testing of early prototypes.</p>
          <dl className="research-rows">
            <div><dt>Competitive analysis</dt><dd>Reviewing TradeDepot, Omnibiz, Tajir and MarketForce helped map the competitive landscape and consider familiar patterns that users might bring from other products.</dd></div>
            <div><dt>Literature review</dt><dd>Industry articles provided context on supply-chain and logistics challenges in Africa, helping challenge assumptions about the market.</dd></div>
            <div><dt>User interviews</dt><dd>Warehouse staff, supplier personnel and logistics partners described their existing processes. The research considered their language and the relationship between the interface and their real work.</dd></div>
            <div><dt>Usability testing</dt><dd>Early prototypes were tested with supplier personnel and logistics partners to identify navigation and functionality issues, with attention to user control and recovery.</dd></div>
          </dl>
        </div>
      </section>

      <section className="case-section" id="logistics" tabIndex={-1}>
        <h2>A view of the operation for logistics partners</h2>
        <div className="section-copy">
          <p>The logistics platform supports fulfilment oversight and day-to-day operations. Its dashboard brings pending requests and trip information into view, alongside the tools for managing vehicles, payments and drivers.</p>
          <h3>From a request to an active trip</h3>
          <p>Sabi Feed separates assigned requests from the general feed. The desktop design shows pickup and drop-off information beside accept and reject actions; the mobile view carries the request feed and trip summary into a smaller screen.</p>
          <figure className="evidence-figure">
            <div className="logistics-gallery">
              <ZoomableImage src="/work/sabi/logistics-desktop.png" alt="Logistics desktop dashboard with assigned and general requests, accept and reject actions, pickup and drop-off details, and trip analytics" width={971} height={994} sizes="(max-width: 767px) 85vw, 560px" />
              <ZoomableImage src="/work/sabi/logistics-mobile.png" alt="Logistics mobile dashboard showing the Sabi request feed and trip summary" width={283} height={569} sizes="(max-width: 767px) 220px, 180px" />
            </div>
            <figcaption>Desktop and mobile views of the logistics dashboard. Values shown are mockup content.</figcaption>
          </figure>
          <h3>Tools for the wider operation</h3>
          <ul className="feature-list">
            <li><strong>Dashboard</strong><span>Important logistics metrics in one view.</span></li>
            <li><strong>Sabi Feed</strong><span>Pending logistics requests awaiting action.</span></li>
            <li><strong>Trips</strong><span>Trip monitoring and schedules.</span></li>
            <li><strong>Vehicles</strong><span>Vehicle tracking and monitoring.</span></li>
            <li><strong>Reports</strong><span>An overview of activities.</span></li>
            <li><strong>Finance</strong><span>Payment tracking.</span></li>
            <li><strong>Team</strong><span>Viewing and managing drivers.</span></li>
          </ul>
          <PrototypeViewer href={logisticsPrototype} title="Logistics prototype">View logistics prototype</PrototypeViewer>
        </div>
      </section>

      <section className="case-section" id="drivers" tabIndex={-1}>
        <h2>Making the next delivery actionable for drivers</h2>
        <div className="section-copy">
          <p>Logistics partners can give their drivers access to the driver app. The app provides delivery and cost information, pickup status, drop-off details and navigation, alongside a profile and trip history.</p>
          <p>The screens below show three parts of that workflow: returning money or products, carrying out a trip and reviewing the driver’s profile.</p>
          <figure className="evidence-figure driver-figure">
            <div className="driver-gallery">
              <div><ZoomableImage src="/work/sabi/driver-1.png" alt="Driver home screen with return-money and return-product tabs, collection amounts by drop-off and a payment action" width={425} height={853} sizes="(max-width: 600px) 220px, 240px" /><h3>Collections and returns</h3><p>Expected and collected amounts are shown against each drop-off, with money and product returns available from Home.</p></div>
              <div><ZoomableImage src="/work/sabi/driver-2.png" alt="Driver trip screen with pickup and drop-off states, customer and address details, directions and delivery items" width={425} height={853} sizes="(max-width: 600px) 220px, 240px" /><h3>Pickup and drop-off</h3><p>Trip details bring the location, customer, delivery items and route action together at the point of delivery.</p></div>
              <div><ZoomableImage src="/work/sabi/driver-3.png" alt="Driver profile with completed, partial and failed trip counts, personal details and assigned vehicle" width={425} height={853} sizes="(max-width: 600px) 220px, 240px" /><h3>Profile and trip history</h3><p>The profile provides driver details, past-trip status and the assigned vehicle.</p></div>
            </div>
            <figcaption>Original driver-app mockups. Screen values and details are illustrative.</figcaption>
          </figure>
          <PrototypeViewer href={driverPrototype} title="Driver prototype">View driver prototype</PrototypeViewer>
        </div>
      </section>

      <section className="case-section" id="suppliers" tabIndex={-1}>
        <h2>Helping suppliers manage demand and stock</h2>
        <div className="section-copy">
          <p>The supplier platform supports inventory, product-catalogue management and orders from Sabi’s demand channels. Suppliers can see incoming demand, follow the status of assigned orders and manage product prices, details and stock.</p>
          <figure className="evidence-figure">
            <ZoomableImage src="/work/sabi/suppliers.png" alt="Supplier dashboard showing sales and warehouse metrics, incoming order requests, order status, products and sales performance" width={1457} height={1076} sizes="(max-width: 767px) 90vw, 800px" />
            <figcaption>The supplier dashboard brings business metrics and incoming orders into the same view. Values shown are mockup content.</figcaption>
          </figure>
          <ul className="feature-list">
            <li><strong>Dashboard</strong><span>A snapshot of business metrics.</span></li>
            <li><strong>Sabi Feed</strong><span>Products ordered by customers and awaiting processing.</span></li>
            <li><strong>Orders</strong><span>Assigned orders and their status.</span></li>
            <li><strong>Inventory</strong><span>Product prices, details and available stock.</span></li>
          </ul>
        </div>
      </section>

      <section className="case-section" id="context" tabIndex={-1}>
        <h2>The company context behind the platform</h2>
        <div className="section-copy">
          <p>The original case study included the following figures to describe Sabi’s company and platform scale. They provide historical business context, rather than outcomes measured for this design engagement.</p>
          <figure className="company-metrics">
            <dl><div><dt>175,000</dt><dd>Merchants (2021)</dd></div><div><dt>$200m</dt><dd>Annualised GMV run rate (2021)</dd></div><div><dt>$38m</dt><dd>Series B funding (2023)</dd></div></dl>
            <figcaption>Sources: <a href="https://techcrunch.com/2021/11/25/rensource-spinoff-sabi-closes-6m-bridge-round-expands-b2b-retail-platform-outside-nigeria/" target="_blank" rel="noopener noreferrer">2021 platform figures</a> and <a href="https://www.pymnts.com/news/investment-tracker/2023/sabi-raises-38-million-dollars-b2b-marketplace-serving-african-retailers/" target="_blank" rel="noopener noreferrer">2023 funding report</a>.</figcaption>
          </figure>
          <p>The evidence for this project is the connected set of product designs and prototypes shown above. The original case does not record project-specific changes in delivery time, inventory accuracy or order completion.</p>
        </div>
      </section>

      <section className="case-section" id="learnings" tabIndex={-1}>
        <h2>Keep each person’s task clear</h2>
        <div className="section-copy">
          <p>My main takeaway was the importance of simplicity. A supply-chain platform can contain many capabilities, but each interface needs to focus on the core tasks of the person using it.</p>
          <p>For suppliers, that means orders and inventory. For logistics partners, it means requests, trips and operational oversight. For drivers, it means pickup, drop-off and delivery details. The value of the connected system depends on making those individual responsibilities understandable.</p>
          <p>A second takeaway was to stay open to changing requirements and user expectations as the product evolves.</p>
        </div>
      </section>
      <div className="next-case"><span>Next case study</span><Link href="/work/uba"><span><LinkArrowLabel>Taking an enterprise HR platform from concept to production</LinkArrowLabel></span></Link></div>
    </>
  );
}
