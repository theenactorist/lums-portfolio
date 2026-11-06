import styles from './CaseStudyTimeline.module.css'

// One small timeline for case studies (Helium's Figma to code flow and work in progress, Rewards' quarterly review), after Spectrum UI's Agent Steps (built our own; its source is behind a login):
// a thin line joining a marker per item, the title beside its marker, the description under it.
// Without `status`, each marker is a plain bullet in the ink colour (the Figma to code flow). With it, an item
// in progress gets a solid Warm Rust dot and one that comes next a dashed circle, and the status is read out as
// text after the title. Markers are decoration only; the ordered list carries the order.
export default function CaseStudyTimeline({ items, label, className = '' }) {
  return (
    <ol className={`${styles.timeline} ${className}`} aria-label={label}>
      {items.map(({ title, status, text, note }) => (
        <li key={title} className={styles.timelineItem} data-status={status ? status.toLowerCase().replace(/\s+/g, '-') : undefined}>
          <span className={styles.timelineMarker} aria-hidden="true" />
          <div className={styles.timelineBody}>
            <p className={styles.timelineTitle}>
              {title}
              {status && <span className={styles.timelineStatus}>{status}</span>}
            </p>
            <p className={styles.timelineText}>{text}</p>
            {note && <p className={styles.timelineNote}>{note}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
