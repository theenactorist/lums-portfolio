import Wire from './Wire'
import styles from './agile.module.css'

const steps = [
  { title: 'Documentation', text: 'PRDs, Helium, UX patterns, decision records', mine: true },
  { title: 'Agents draft', text: 'Screens in Figma with Helium components' },
  { title: 'I review in Figma', text: 'Make the call, write down why', mine: true },
  { title: 'Handoff detailing', text: 'Specs, bindings, Ready for Dev' },
  { title: 'Prototype', text: 'Every state, live on Vercel' },
  { title: 'QA against production', text: 'Findings go back to Figma' },
]

// [path]: six steps in two rows of three (a column on narrow screens), the turn from the first row to the second,
// and QA's return to my review drawn on the right. A role="list" carries the order (the connector pieces between the items are hidden, so it can’t be an <ol>).
export default function PathDiagram() {
  const step = (index) => {
    const { title, text, mine } = steps[index]
    return (
      <div role="listitem" className={`${styles.node} ${mine ? styles.mine : ''} ${styles[`p${index + 1}`]}`}>
        <strong>{title}{mine && <span className={styles.srOnly}>, my step</span>}</strong><small>{text}</small>
      </div>
    )
  }
  return (
    <figure className={`${styles.figure} ${styles.diagram}`}>
      <div role="list" className={styles.path} aria-label="From documentation to production">
        {step(0)}
        <Wire className={`${styles.flowArrow} ${styles.a12}`} />
        {step(1)}
        <Wire className={`${styles.flowArrow} ${styles.a23}`} />
        {step(2)}
        <Wire className={`${styles.turnA} ${styles.vToY} ${styles.hToX}`} />
        <Wire className={`${styles.turnB} ${styles.hFull}`} />
        <Wire className={`${styles.turnC} ${styles.hFromX} ${styles.vFromY} ${styles.headDown}`} />
        <Wire className={`${styles.flowArrow} ${styles.a34}`} />
        {step(3)}
        <Wire className={`${styles.flowArrow} ${styles.a45}`} />
        {step(4)}
        <Wire className={`${styles.flowArrow} ${styles.a56}`} />
        {step(5)}
        <Wire className={`${styles.loopTop} ${styles.hToX} ${styles.vFromY} ${styles.headLeft}`} />
        <Wire className={`${styles.loopMid} ${styles.vFull}`} />
        <Wire className={`${styles.loopBottom} ${styles.hToX} ${styles.vToY}`} />
      </div>
      <p className={styles.pathReturn}>QA findings come back to my review in Figma.</p>
      <figcaption>Six steps from documentation to production. QA findings loop back to my review in Figma.</figcaption>
    </figure>
  )
}
