import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import styles from './helium.module.css'

// Helium's two typefaces, loaded for this specimen only (packages/tokens/tokens/scale/typography.json).
const instrumentSans = Instrument_Sans({ subsets: ['latin'], display: 'swap' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '400', display: 'swap' })

const faces = [
  { name: 'Instrument Sans', className: instrumentSans.className },
  { name: 'IBM Plex Mono', className: plexMono.className },
]

export default function TypeSpecimen() {
  return (
    <figure className={styles.figure}>
      <div className={styles.specimen}>
        {faces.map((face) => (
          <div key={face.name} data-specimen={face.name}>
            <span className={styles.figureLabel}>{face.name}</span>
            <p className={face.className}>I l 1 O 0</p>
          </div>
        ))}
      </div>
      <figcaption>In Instrument Sans, capital I and lowercase l are both plain strokes. In IBM Plex Mono, every one of these characters is different.</figcaption>
    </figure>
  )
}
