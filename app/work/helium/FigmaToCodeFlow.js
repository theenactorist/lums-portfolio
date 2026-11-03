import Timeline from './Timeline'
import styles from './helium.module.css'

const steps = [
  { title: 'Figma component', text: 'Variables and properties, such as Hierarchy: Primary.' },
  { title: 'AI coding agent', text: 'Reads the design through Figma’s MCP server, with each variable’s code name.', note: 'AGENTS.md: reuse components, use tokens.' },
  { title: 'React component', text: 'Built with Helium’s tokens. Figma properties become props.' },
  { title: 'My review', text: 'Checked against Figma in the browser before it counts as done.' },
  { title: 'Link file and manifest', text: 'Records the Figma node and how each property maps to a prop.' },
  { title: 'Storybook', text: 'Docs, all four modes and the Figma design beside the code. Chromatic checks every story, and each Figma component links back to its Storybook page.' },
]

// One line with a bullet per step, the same timeline as the work in progress list (plain bullets, no status).
// The ordered list is the text alternative: each step in order.
export default function FigmaToCodeFlow() {
  return (
    <figure className={`${styles.figure} ${styles.flowFigure}`}>
      <Timeline items={steps} label="From Figma to Storybook, step by step" className={styles.flow} />
      <figcaption>Every component takes the same path from Figma to Storybook, and Storybook links back to Figma, so you can start from either end.</figcaption>
    </figure>
  )
}
