import Wire from './Wire'
import styles from './agile.module.css'

// [system]: Me, the planner agent and two builder agents, with the reports coming back and AGENTS.md under every task.
// Wide: one row with the return underneath. Narrow: a column, with the return drawn up the right side.
// Every label is real text in reading order; the connector pieces are hidden from assistive technology. The return
// text is written twice, once per layout; only one is displayed, so it's read once.
export default function SystemDiagram() {
  const returnText = 'Reports come back with screenshots beside the Figma frames. Nothing goes live on Vercel until I approve it.'
  return (
    <figure className={`${styles.figure} ${styles.diagram}`}>
      <div className={styles.system}>
        <div className={`${styles.node} ${styles.mine} ${styles.sysMe}`}><span className={styles.kicker}>Me</span><strong>Decide and approve</strong><small>Brief, review every screen, approve before release</small></div>
        <Wire className={`${styles.flowArrow} ${styles.sysBrief}`} label="brief" />
        <div className={`${styles.node} ${styles.sysPlanner}`}><span className={styles.kicker}>Planner agent</span><strong>Claude Cowork</strong><small>Writes each task, checks every report, keeps the tracker</small></div>
        <Wire className={`${styles.flowArrow} ${styles.sysTasks}`} label="tasks" />
        <div className={`${styles.builders} ${styles.sysBuilders}`}>
          <div className={styles.node}><span className={styles.kicker}>Builder agent</span><strong>Figma</strong><small>Claude Code with Figma’s MCP server</small></div>
          <div className={styles.node}><span className={styles.kicker}>Builder agent</span><strong>Code</strong><small>Claude Code; the only one touching git</small></div>
        </div>
        <Wire className={`${styles.sysReturn} ${styles.sysReturnStart} ${styles.vToY} ${styles.hToX}`} />
        <div className={`${styles.sysReturn} ${styles.sysReturnMid} ${styles.wire} ${styles.hFull}`}><p className={styles.returnText}>{returnText}</p></div>
        <Wire className={`${styles.sysReturn} ${styles.sysReturnEnd} ${styles.hFromX} ${styles.vToY} ${styles.headUp}`} />
        <Wire className={`${styles.sysLoop} ${styles.sysLoopTop} ${styles.hToX} ${styles.vFromY} ${styles.headLeft}`} />
        <Wire className={`${styles.sysLoop} ${styles.sysLoopMid} ${styles.vFull}`} />
        <Wire className={`${styles.sysLoop} ${styles.sysLoopBottom} ${styles.hToX} ${styles.vToY}`} />
        <div className={`${styles.stackOnly} ${styles.sysReturnStack}`}><p className={styles.returnText}>{returnText}</p></div>
        <div className={`${styles.rulesBar} ${styles.sysFoot}`}><strong>AGENTS.md</strong><span>About 40 dated rules, each from one of my corrections. Every task starts here.</span></div>
      </div>
      <figcaption>Me, a planner agent and two builder agents. Nothing goes live without my approval.</figcaption>
    </figure>
  )
}
