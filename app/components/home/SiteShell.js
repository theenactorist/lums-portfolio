'use client';

import { usePathname } from 'next/navigation';
import ProductionNav from '../Nav';
import ProductionFooter from '../Footer';
import ProductionThemeProvider from '../ThemeProvider';
import HomeNav from './Nav';
import HomeFooter from './Footer';
import HomeThemeProvider from './ThemeProvider';
import styles from '../../layout.module.css';

const legacyRoutes = new Set(['/about', '/work', '/work/branch-ai-v1', '/work/branch-ai-original-v1', '/work/shiga-onboarding-v1']);

// Published cases and missing pages use the current identity.
// Explicitly retained legacy routes keep their existing presentation.
export default function SiteShell({ children }) {
  const pathname = usePathname();

  if (legacyRoutes.has(pathname)) {
    return (
      <ProductionThemeProvider>
        <ProductionNav />
        {children}
        <ProductionFooter />
      </ProductionThemeProvider>
    );
  }

  return (
    <HomeThemeProvider>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <HomeNav />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <HomeFooter />
    </HomeThemeProvider>
  );
}
