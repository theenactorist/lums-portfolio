import styles from './agile.module.css'

// One connector piece: a line segment or two and, optionally, an arrowhead. The classes come from agile.module.css.
export default function Wire({ className, label, children }) {
  return (
    <div className={`${styles.wire} ${className}`} aria-hidden="true">
      {label && <span className={styles.wireLabel}>{label}</span>}
      <span className={styles.head} />
      {children}
    </div>
  )
}
