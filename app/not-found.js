import Link from 'next/link';
import styles from './not-found.module.css';
import homeStyles from './home.module.css';

export default function NotFound() {
  return (
    <main className={`${homeStyles.homePage} ${styles.page} theme2-home`}>
      <div className={styles.inner}>
        <div className={styles.frame} aria-hidden="true">
          <span className={styles.code}>404</span>
          <span className={styles.corner} /><span className={styles.corner} /><span className={styles.corner} /><span className={styles.corner} />
        </div>
        <div className={styles.content}>
          <h1>Page not found.</h1>
          <p>That link may be outdated, or the address may have a typo. The portfolio is still here.</p>
          <nav className={styles.actions} aria-label="Find your way back">
            <Link href="/work" className={styles.primary}>View selected work</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
