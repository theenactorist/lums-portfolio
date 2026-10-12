'use client';

import { usePathname } from 'next/navigation';
import ProductionNav from '../Nav';
import ProductionFooter from '../Footer';
import ProductionThemeProvider from '../ThemeProvider';
import HomeNav from './Nav';
import HomeFooter from './Footer';
import HomeThemeProvider from './ThemeProvider';
import styles from '../../layout.module.css';

// Home and the approved CopyGPT, Sabi, UBA and Carbon cases use this shell; other routes keep theirs.
export default function SiteShell({ children }) {
  const pathname = usePathname();

  if (pathname !== '/' && pathname !== '/work/ai-copywriting' && pathname !== '/work/sabi' && pathname !== '/work/uba' && pathname !== '/work/carbon' && pathname !== '/work/shiga-onboarding') {
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
