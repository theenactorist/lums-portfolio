import { instrumentSans } from './fonts'
import styles from './helium.module.css'

// Component colors/Components/Buttons/Primary/button-primary-bg in Helium's packages/tokens/tokens/color/*.json:
// code syntax from com.figma.codeSyntax, primitive from com.figma.aliasData, value from $value.hex. Checked 3 November 2026.
const codeSyntax = [
  ['Web', 'var(--color-components-buttons-primary-button-primary-bg)'],
  ['iOS', 'HeliumColors.components.buttons.primary.buttonPrimaryBg'],
  ['Android', 'HeliumColors.components.buttons.primary.buttonPrimaryBg'],
]

const modeValues = [
  ['Individual light', 'Brand 600', '#175CD3'],
  ['Individual dark', 'Brand 600', '#175CD3'],
  ['Business light', 'Neutral 900', '#171717'],
  ['Business dark', 'Neutral 700', '#404040'],
]

// Three layers, one inside the other, told apart by fill and spacing. The button is drawn from Helium's
// tokens (Individual light): bg #175CD3, fg #FFFFFF, radius-md 8px, md padding 10 by 14, text-sm 14/20 semibold.
export default function VariableLayers() {
  return (
    <figure className={styles.figure}>
      <div className={`${styles.layer} ${styles.layerComponent}`} data-layer="component">
        <span className={styles.figureLabel}>Component</span>
        <p className={styles.layerTitle}>Button, Hierarchy: Primary</p>
        <span className={`${styles.layerButton} ${instrumentSans.className}`} aria-hidden="true">Button CTA</span>
        <span className={styles.srOnly}>A primary button labelled Button CTA, in Brand 600 blue.</span>
        <code className={styles.layerCode}>{'<Button hierarchy="primary">'}</code>

        <div className={`${styles.layer} ${styles.layerVariable}`} data-layer="component-variable">
          <span className={styles.figureLabel}>Component variable</span>
          <p className={styles.layerTitle}><code>button-primary-bg</code></p>
          <dl className={styles.layerRows}>
            {codeSyntax.map(([platform, name]) => <div key={platform}><dt>{platform}</dt><dd><code>{name}</code></dd></div>)}
          </dl>
          <dl className={styles.layerRows}>
            {modeValues.map(([mode, primitive, hex]) => (
              <div key={mode}><dt>{mode}</dt><dd><span className={styles.swatch} style={{ background: hex }} aria-hidden="true" />{primitive} <code>{hex}</code></dd></div>
            ))}
          </dl>

          <div className={`${styles.layer} ${styles.layerPrimitive}`} data-layer="primitive">
            <span className={styles.figureLabel}>Primitive</span>
            <p className={styles.layerTitle}><code>Brand/600</code></p>
            <p className={styles.layerValue}><span className={styles.primitiveSwatch} style={{ background: '#175CD3' }} aria-hidden="true" /><code>#175CD3</code></p>
          </div>
        </div>
      </div>
      <figcaption>How the primary button gets its colour. Read from the inside out: a raw value, the variable that names its job, and the component that uses it.</figcaption>
    </figure>
  )
}
