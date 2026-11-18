import styles from './agile.module.css'

// [path] figure, drawn from `diagrams/flow-mockup.png` (wide) and `diagrams/flow-phone-mockup.png` (640 px and under),
// T15 V2. Five equal boxes on one grid: who, then the step, then its line, on the same baselines in every box. Olumide's
// two boxes take the Warm Rust tint. One line style and one arrowhead for the four arrows, the three stage brackets and
// the QA loop. No caption (Olumide, 18 Nov 2026). Colours come from the page's tokens through the CSS classes; the SVGs
// are hidden from assistive technology and the list under them carries the same content as text.
const steps = [
  { who: 'Me', title: ['Documentation'], line: ['Components, UX', 'patterns, PRDs'], phoneLine: 'Components, UX patterns, PRDs', mine: true },
  { who: 'Claude', title: ['Drafts in Figma'], line: ['Screens built with', 'Helium components'], phoneLine: 'Screens built with Helium components' },
  { who: 'Me', title: ['Review in Figma'], line: ['I edit and make', 'the call'], phoneLine: 'I edit and make the call', mine: true },
  { who: 'Claude', title: ['Handoff detailing'], line: ['Specs, bindings,', 'Ready for Dev'], phoneLine: 'Specs, bindings, Ready for Dev' },
  { who: 'Claude', title: ['Prototype'], line: ['Every state and', 'interaction, live'], phoneLine: 'Every state and interaction, live' },
]
const stages = [
  { name: 'Define', from: 0, to: 0 },
  { name: 'Develop', from: 1, to: 2 },
  { name: 'Deliver', from: 3, to: 4 },
]
const loopLabel = 'QA against production: findings come back to my review'
const REVIEW = 2
const PROTOTYPE = 4

// A filled arrowhead with its tip at (x, y), pointing right, left, up or down.
function head(x, y, dir, size = 9, half = 4.5) {
  const points = {
    right: [[x, y], [x - size, y - half], [x - size, y + half]],
    left: [[x, y], [x + size, y - half], [x + size, y + half]],
    up: [[x, y], [x - half, y + size], [x + half, y + size]],
    down: [[x, y], [x - half, y - size], [x + half, y - size]],
  }[dir]
  return <polygon className={styles.flowHead} points={points.map((p) => p.join(',')).join(' ')} />
}

function Box({ x, y, width, height, step, pad, base, title }) {
  return (
    <g>
      <rect className={step.mine ? styles.flowBoxMine : styles.flowBox} x={x} y={y} width={width} height={height} rx={title.radius} />
      <text className={styles.flowWho} x={x + pad} y={y + base.who} fontSize={title.who}>{step.who}</text>
      <text className={styles.flowTitle} x={x + pad} y={y + base.title} fontSize={title.title}>{step.title[0]}</text>
      {title.lines.map((text, i) => (
        <text key={text} className={styles.flowText} x={x + pad} y={y + base.line + i * base.lineGap} fontSize={title.line}>{text}</text>
      ))}
    </g>
  )
}

// Wide: one row of five boxes, the stage brackets above, the loop below with its label under it.
function WideFlow() {
  const width = 1000, gap = 26, boxW = (width - 4 * gap) / 5, top = 70, boxH = 152, pad = 15
  const base = { who: 34, title: 66, line: 100, lineGap: 23 }
  const x = (i) => i * (boxW + gap)
  const midY = top + boxH / 2
  const loopY = top + boxH + 44
  const reviewX = x(REVIEW) + boxW / 2
  const protoX = x(PROTOTYPE) + boxW / 2
  return (
    <svg className={styles.flowWide} viewBox={`0 0 ${width} ${loopY + 40}`} aria-hidden="true" focusable="false">
      {stages.map((stage) => {
        const left = x(stage.from), right = x(stage.to) + boxW
        return (
          <g key={stage.name}>
            <text className={styles.flowStage} x={(left + right) / 2} y={20} fontSize={17} textAnchor="middle">{stage.name}</text>
            <path className={styles.flowLine} d={`M${left} 48 V38 H${right} V48`} />
          </g>
        )
      })}
      {steps.map((step, i) => (
        <Box key={step.title[0]} x={x(i)} y={top} width={boxW} height={boxH} step={step} pad={pad} base={base} title={{ radius: 20, who: 15, title: 18, line: 16, lines: step.line }} />
      ))}
      {steps.slice(0, -1).map((step, i) => (
        <g key={`arrow-${step.title[0]}`}>
          <path className={styles.flowLine} d={`M${x(i) + boxW + 4} ${midY} H${x(i + 1) - 5}`} />
          {head(x(i + 1) - 4, midY, 'right')}
        </g>
      ))}
      <path className={styles.flowLine} d={`M${protoX} ${top + boxH + 8} V${loopY} H${reviewX} V${top + boxH + 16}`} />
      {head(reviewX, top + boxH + 7, 'up')}
      <text className={styles.flowText} x={(reviewX + protoX) / 2} y={loopY + 30} fontSize={16} textAnchor="middle">{loopLabel}</text>
    </svg>
  )
}

// Phone: the same five boxes stacked with equal gaps, each stage name above its first box, the loop on the right.
function PhoneFlow() {
  const width = 340, boxW = 296, boxH = 96, gap = 60, labelH = 28, pad = 18
  const base = { who: 28, title: 54, line: 78, lineGap: 0 }
  const stageAt = Object.fromEntries(stages.map((stage) => [stage.from, stage.name]))
  const y = (i) => labelH + i * (boxH + gap)
  const arrowX = boxW / 2
  const loopX = width - 10
  const reviewY = y(REVIEW) + boxH / 2
  const protoY = y(PROTOTYPE) + boxH / 2
  const bottom = y(PROTOTYPE) + boxH
  return (
    <svg className={styles.flowPhone} viewBox={`0 0 ${width} ${bottom + 62}`} aria-hidden="true" focusable="false">
      {steps.map((step, i) => (
        <g key={step.title[0]}>
          {stageAt[i] && <text className={styles.flowStage} x={0} y={i === 0 ? 16 : y(i) - gap / 2 + 5} fontSize={14}>{stageAt[i]}</text>}
          <Box x={0} y={y(i)} width={boxW} height={boxH} step={step} pad={pad} base={base} title={{ radius: 16, who: 13, title: 17, line: 14, lines: [step.phoneLine] }} />
          {i < steps.length - 1 && (
            <>
              <path className={styles.flowLine} d={`M${arrowX} ${y(i) + boxH + 8} V${y(i + 1) - 9}`} />
              {head(arrowX, y(i + 1) - 8, 'down')}
            </>
          )}
        </g>
      ))}
      <path className={styles.flowLine} d={`M${boxW + 6} ${protoY} H${loopX} V${reviewY} H${boxW + 15}`} />
      {head(boxW + 6, reviewY, 'left')}
      <text className={styles.flowText} x={0} y={bottom + 30} fontSize={14}>QA against production: findings come</text>
      <text className={styles.flowText} x={0} y={bottom + 50} fontSize={14}>back to my review</text>
    </svg>
  )
}

export default function FlowDiagram() {
  return (
    <figure className={`${styles.figure} ${styles.flowFigure}`}>
      <WideFlow />
      <PhoneFlow />
      <ol className={styles.srOnly} aria-label="From documentation to production, by double diamond stage">
        {steps.map((step, i) => {
          const stage = stages.find((s) => i >= s.from && i <= s.to)
          return <li key={step.title[0]}>{stage.name}. {step.who}: {step.title[0]}. {step.phoneLine}.</li>
        })}
        <li>{loopLabel}, from Prototype back to Review in Figma.</li>
      </ol>
    </figure>
  )
}
