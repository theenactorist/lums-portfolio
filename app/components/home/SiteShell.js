'use client';

import { usePathname } from 'next/navigation';
import FragmentRecovery from '../FragmentRecovery';
import ProductionNav from '../Nav';
import ProductionFooter from '../Footer';
import HomeNav from './Nav';
import HomeFooter from './Footer';
import ThemeProvider from './ThemeProvider';
import styles from '../../layout.module.css';

const legacyRoutes = new Set(['/work', '/work/branch-ai-v1', '/work/branch-ai-original-v1', '/work/shiga-onboarding-v1']);

// Published cases and missing pages use the current identity.
// Explicitly retained legacy routes keep their existing presentation.
// One theme provider for every route, so the theme rule is the same everywhere.
export default function SiteShell({ children }) {
  const pathname = usePathname();

  return (
    <ThemeProvider>
      {legacyRoutes.has(pathname) ? (
        <>
          <FragmentRecovery />
          <ProductionNav />
          {children}
          <ProductionFooter />
        </>
      ) : (
        <>
          <FragmentRecovery />
          <a className={styles.skipLink} href="#main-content">
            Skip to content
          </a>
          <HomeNav />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <HomeFooter />
        </>
      )}
    </ThemeProvider>
  );
}
