import { instrumentSans, plexMono } from './fonts'
import styles from './helium.module.css'

const weights = [['Regular', 400], ['Medium', 500], ['SemiBold', 600], ['Bold', 700]]

// Each card is set entirely in its own typeface. No caption under the pair (T1b F1).
export default function TypeCards() {
  return (
    <figure className={`${styles.figure} ${styles.typeFigure}`}>
      <div className={styles.typeCards}>
        <div className={`${styles.typeCard} ${instrumentSans.className}`} data-type-card="Instrument Sans">
          <span className={styles.typeLabel}>Interface</span>
          <p className={styles.typeTitle}>Instrument Sans</p>
          <p className={styles.typeAa} aria-hidden="true">Aa</p>
          <dl className={styles.typeWeights}>
            {weights.map(([name, weight]) => (
              <div key={weight}><dt>{name} {weight}</dt><dd style={{ fontWeight: weight }}>Send money</dd></div>
            ))}
          </dl>
          <p className={styles.typeAlphabet}>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
          <p className={styles.typeRow} data-glyph-row>I l 1 O 0</p>
          <p className={styles.typeRow} data-glyph-row data-signs>$ £ € ¥ ¢</p>
          <p className={styles.typeText}>Open source on Google Fonts, so it works on web, iOS and Android without licensing. One variable family covers weights from 400 to 700, enough for every level of hierarchy. It has the dollar, pound, euro and yen signs, but not the naira, cedi, bitcoin or tether signs.</p>
        </div>
        <div className={`${styles.typeCard} ${plexMono.className}`} data-type-card="IBM Plex Mono">
          <span className={styles.typeLabel}>Numbers, addresses and codes</span>
          <p className={styles.typeTitle}>IBM Plex Mono</p>
          <p className={styles.typeAa} aria-hidden="true">Aa</p>
          <div className={styles.typeSamples} data-glyph-row>
            <p>₦250,000.00</p>
            <p>1,250.00 USD₮</p>
            <p>0x7a3f…b91c</p>
          </div>
          <p className={styles.typeRow} data-glyph-row>I l 1 O 0</p>
          <p className={styles.typeRow} data-glyph-row data-signs>$ £ € ¥ ₦ ₵ ₿ ₮</p>
          <p className={styles.typeText}>People copy and check amounts, wallet addresses, transaction IDs and verification codes character by character. Plex Mono’s serifed I, tailed l, flagged 1 and dotted zero mean nobody mistakes one for another. Every character is the same width, so amounts line up in columns, and it has the naira, cedi and bitcoin signs and the ₮ in USD₮.</p>
        </div>
      </div>
    </figure>
  )
}
