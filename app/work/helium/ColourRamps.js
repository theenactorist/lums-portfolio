import styles from './helium.module.css'

// Brand, Gray (light mode) (labelled Grey, Canadian spelling) and the status ramps from Helium's packages/tokens/tokens/primitive/primitives.json
// ($value.hex of every step). Checked against the file on 3 November 2026.
const ramps = [
  ['Brand', [['25', '#F5FAFF'], ['50', '#EFF8FF'], ['100', '#D1E9FF'], ['200', '#B2DDFF'], ['300', '#53B1FD'], ['400', '#2E90FA'], ['500', '#1570EF'], ['600', '#175CD3'], ['700', '#1849A9'], ['800', '#194185'], ['900', '#102A56'], ['950', '#0E2243']]],
  ['Grey', [['25', '#FCFCFD'], ['50', '#F9FAFB'], ['100', '#F2F4F7'], ['200', '#E4E7EC'], ['300', '#D0D5DD'], ['400', '#98A2B3'], ['500', '#667085'], ['600', '#475467'], ['700', '#344054'], ['800', '#182230'], ['900', '#101828'], ['950', '#0C111D']]],
  ['Error', [['25', '#FFFBFA'], ['50', '#FEF3F2'], ['100', '#FEE4E2'], ['200', '#FECDCA'], ['300', '#FDA29B'], ['400', '#F97066'], ['500', '#F04438'], ['600', '#D92D20'], ['700', '#B42318'], ['800', '#912018'], ['900', '#7A271A'], ['950', '#55160C']]],
  ['Warning', [['25', '#FFFCF5'], ['50', '#FFFAEB'], ['100', '#FEF0C7'], ['200', '#FEDF89'], ['300', '#FEC84B'], ['400', '#FDB022'], ['500', '#F79009'], ['600', '#DC6803'], ['700', '#B54708'], ['800', '#93370D'], ['900', '#7A2E0D'], ['950', '#4E1D09']]],
  ['Success', [['25', '#F6FEF9'], ['50', '#ECFDF3'], ['100', '#DCFAE6'], ['200', '#AAEFC6'], ['300', '#75E0A7'], ['400', '#47CD89'], ['500', '#17B26A'], ['600', '#079455'], ['700', '#067647'], ['800', '#085D3A'], ['900', '#074D31'], ['950', '#053321']]],
]

// Text is tested in white and in the darkest grey, Gray (light mode) 950.
const WHITE = '#FFFFFF'
const DARKEST_GREY = '#0C111D'

// WCAG 2 relative luminance and contrast ratio.
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// The text colour that scores higher, and the label the Figma library uses: “AAA 7.65”, “AA 4.95” or the ratio alone.
export const rating = (hex) => {
  const onWhite = contrast(hex, WHITE)
  const onGrey = contrast(hex, DARKEST_GREY)
  const [text, ratio] = onWhite >= onGrey ? [WHITE, onWhite] : [DARKEST_GREY, onGrey]
  const level = ratio >= 7 ? 'AAA ' : ratio >= 4.5 ? 'AA ' : ''
  return { text, ratio, label: `${level}${ratio.toFixed(2)}` }
}

export default function ColourRamps() {
  return (
    <figure className={styles.figure}>
      <div className={styles.ramps}>
        {ramps.map(([name, steps]) => (
          <div key={name} className={styles.ramp}>
            <span className={styles.figureLabel}>{name}</span>
            <ol className={styles.rampSteps}>
              {steps.map(([step, hex]) => {
                const { text, label } = rating(hex)
                return (
                  <li key={step} data-ramp-step={`${name} ${step}`} data-hex={hex}>
                    <span className={styles.rampSwatch} style={{ background: hex, color: text }} data-text={text}>{label}</span>
                    <span className={styles.rampStep}>{step}</span>
                    <code className={styles.rampHex}>{hex}</code>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
      <figcaption>Helium’s brand, grey and status ramps. Each step shows its contrast ratio and WCAG rating, as it does in the Figma library, so it’s clear which steps can carry text.</figcaption>
    </figure>
  )
}
