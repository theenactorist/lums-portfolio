import Image from 'next/image'
import ZoomableImage from '../../components/ZoomableImage'
import pageStyles from './pulse.module.css'
import styles from './product-evolution.module.css'

const partners = [
  { name: 'Piggyvest', logo: 'piggyvest.svg', width: 192, height: 37, status: 'Onboarded', complete: true },
  { name: '247Bet', logo: '247bet.svg', width: 200, height: 38, status: 'Onboarding', complete: false },
  { name: 'Sayswitch', logo: 'sayswitch.svg', width: 137.007, height: 33.1995, status: 'Onboarding', complete: false },
]

function StatusIcon({ complete }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      {complete ? <path d="m8 12 2.5 2.5L16 9" /> : <path d="M12 7v5l3 2" />}
    </svg>
  )
}

export default function ProductEvolutionSection() {
  return (
    <section className={`section ${pageStyles.constraintSection} ${styles.section}`} aria-labelledby="pulse-evolution-title">
      <div className="container">
        <div className={pageStyles.sectionHeader}>
          <span>Product evolution</span>
          <h2 id="pulse-evolution-title">Pulse continued beyond the first partner demo</h2>
        </div>
        <div className={`${pageStyles.constraintGrid} ${styles.grid}`}>
          <div className={styles.website}>
            <h3>I designed and built the Pulse website</h3>
            <p>Complete on staging, awaiting public launch.</p>
            <a className={`${pageStyles.docsLink} ${styles.websiteLink}`} href="https://pulse-staging-seven.vercel.app/" target="_blank" rel="noreferrer">
              Explore Pulse website
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </a>
            <figure className={styles.thumbnail}>
              <ZoomableImage
                src="/work/pulse/website-current.png"
                alt="Pulse website showing the product overview and payment features"
                width={2668}
                height={1878}
                sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 900px) 440px, 40vw"
              />
              <figcaption>Pulse website · staging</figcaption>
            </figure>
          </div>
          <div className={styles.partners}>
            <div className={styles.partnerHeading}>
              <h3>Partner progress</h3>
              <p>As of <time dateTime="2026-09-14">14 September 2026</time></p>
            </div>
            <ul className={styles.partnerList}>
              {partners.map((partner) => (
                <li key={partner.name}>
                  <span className={styles.logoPlate}>
                    <Image src={`/work/pulse/logos/${partner.logo}`} alt={partner.name} width={partner.width} height={partner.height} />
                  </span>
                  <span className={styles.status}>
                    <StatusIcon complete={partner.complete} />
                    {partner.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
