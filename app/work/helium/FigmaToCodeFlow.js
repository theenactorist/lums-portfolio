import styles from './helium.module.css'

const steps = [
  ['Figma component', 'Variables and properties, such as Hierarchy: Primary.'],
  ['AI coding agent', 'Reads the design through Figma’s MCP server, with each variable’s code name.', 'AGENTS.md: reuse components, use tokens.'],
  ['React component', 'Built with Helium’s tokens. Figma properties become props.'],
  ['My review', 'Checked against Figma in the browser before it counts as done.'],
  ['Link file and manifest', 'Records the Figma node and how each property maps to a prop.'],
  ['Storybook', 'Docs, all four modes and the Figma design beside the code. Chromatic checks every story.'],
]

// The list is the text alternative: each step in order, then the link back. Arrows and the return line are
// drawn beside it and hidden from assistive tech. On narrow columns the return line becomes the last row.
export default function FigmaToCodeFlow() {
  const last = steps.length - 1
  return (
    <figure className={`${styles.figure} ${styles.flowFigure}`}>
      <ol className={styles.flow} aria-label="From Figma to Storybook, step by step">
        {steps.map(([title, text, note], index) => (
          <li key={title} className={styles.flowStep}>
            <div className={styles.flowNode}>
              <strong>{title}</strong>
              <p>{text}</p>
              {note && <p className={styles.flowNote}>{note}</p>}
            </div>
            <span
              className={`${styles.flowReturn} ${index === 0 ? styles.flowReturnFirst : index === last ? styles.flowReturnLast : ''}`}
              aria-hidden="true"
              data-connector
            >
              {index === 0 && <span className={styles.flowReturnHead} data-connector />}
              {index === 3 && <span className={styles.flowReturnLabel}>Each Figma component links back to its Storybook page.</span>}
            </span>
            {index < last && <span className={styles.flowArrow} aria-hidden="true" data-connector />}
          </li>
        ))}
        <li className={`${styles.flowStep} ${styles.flowBack}`}>
          <div className={styles.flowNode}><p><span aria-hidden="true">↑ </span>Links back to the Figma component</p></div>
        </li>
      </ol>
      <figcaption>Every component takes the same path from Figma to Storybook, and Storybook links back to Figma, so you can start from either end.</figcaption>
    </figure>
  )
}
