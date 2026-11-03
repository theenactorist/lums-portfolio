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

// Phosphor's ArrowElbowDownRight (regular weight, @phosphor-icons/react 2.1.10, the version Helium's icons use).
function TurnArrow() {
  return (
    <svg className={styles.turnArrow} viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z" />
    </svg>
  )
}

// Three layers on the figure's one surface, nested as lists: each layer is a step further in, with a turn arrow
// before its label. The button is drawn from Helium's tokens (Individual light): bg #175CD3, fg #FFFFFF,
// radius-md 8px, md padding 10 by 14, text-sm 14/20 semibold.
export default function VariableLayers() {
  return (
    <figure className={`${styles.figure} ${styles.layersFigure}`}>
      <ul className={styles.layers}>
        <li className={styles.layer} data-layer="component">
          <span className={styles.figureLabel}>Component</span>
          <p className={styles.layerTitle}>Button, Hierarchy: Primary</p>
          <span className={`${styles.layerButton} ${instrumentSans.className}`} aria-hidden="true">Button CTA</span>
          <span className={styles.srOnly}>A primary button labelled Button CTA, in Brand 600 blue.</span>
          <code className={styles.layerCode}>{'<Button hierarchy="primary">'}</code>

          <ul className={styles.layers}>
            <li className={`${styles.layer} ${styles.layerNested}`} data-layer="component-variable">
              <span className={styles.figureLabel}><TurnArrow />Component variable</span>
              <p className={styles.layerTitle}><code>button-primary-bg</code></p>
              <dl className={styles.layerRows}>
                {codeSyntax.map(([platform, name]) => <div key={platform}><dt>{platform}</dt><dd><code>{name}</code></dd></div>)}
              </dl>
              <dl className={styles.layerRows}>
                {modeValues.map(([mode, primitive, hex]) => (
                  <div key={mode}><dt>{mode}</dt><dd><span className={styles.swatch} style={{ background: hex }} aria-hidden="true" />{primitive} <code>{hex}</code></dd></div>
                ))}
              </dl>

              <ul className={styles.layers}>
                <li className={`${styles.layer} ${styles.layerNested}`} data-layer="primitive">
                  <span className={styles.figureLabel}><TurnArrow />Primitive</span>
                  <p className={styles.layerTitle}><code>Brand/600</code></p>
                  <p className={styles.layerValue}><span className={styles.primitiveSwatch} style={{ background: '#175CD3' }} aria-hidden="true" /><code>#175CD3</code></p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <figcaption>How the primary button gets its colour. Read from the bottom up: a raw value, the variable that names its job, and the component that uses it.</figcaption>
    </figure>
  )
}
