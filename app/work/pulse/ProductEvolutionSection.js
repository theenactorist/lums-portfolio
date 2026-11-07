import Image from 'next/image'
import ZoomableImage from './PulseImage'
import pageStyles from './pulse.module.css'
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon'


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
    <section className={pageStyles.section} id="evolution" tabIndex={-1} aria-labelledby="pulse-evolution-title">
      <h2 id="pulse-evolution-title">Pulse continued beyond the first partner demo</h2>
      <div className={pageStyles.prose}>
        <p>The website and partner progress below record the work beyond the July build. This is the historical project update from <time dateTime="2026-09-14">14 September 2026</time>.</p>
        <div className={pageStyles.evolutionGrid}>
          <div>
            <h3>I designed and built the Pulse website</h3>
            <p>At the recorded update, the website was complete on staging and awaiting public launch.</p>
            <a className={pageStyles.docsLink} href="https://pulse-staging-seven.vercel.app/" target="_blank" rel="noreferrer"><span><LinkArrowLabel>Explore Pulse website</LinkArrowLabel></span><span className={pageStyles.srOnly}> (opens in a new tab)</span></a>
            <figure className={pageStyles.websiteEvidence}>
              <ZoomableImage src="/work/pulse/website-current.png" alt="Pulse website showing the product overview and payment features" width={2668} height={1878} sizes="(max-width: 767px) 85vw, 400px" />
              <figcaption>Pulse website, staging at the recorded update.</figcaption>
            </figure>
          </div>
          <div>
            <h3>Partner progress</h3>
            <p>As of <time dateTime="2026-09-14">14 September 2026</time></p>
            <ul className={pageStyles.partnerList}>
              {partners.map((partner) => (
                <li key={partner.name}>
                  <span className={pageStyles.logoPlate}><Image src={`/work/pulse/logos/${partner.logo}`} alt={partner.name} width={partner.width} height={partner.height} /></span>
                  <span className={pageStyles.partnerStatus}><StatusIcon complete={partner.complete} />{partner.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
