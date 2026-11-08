'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '../SiteLink';
import BrandMark from '../BrandMark';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import MusicToggle from '../MusicToggle';
import styles from './Nav.module.css';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#featured-work', label: 'Selected Work' },
  { href: '/#career', label: 'Career' },
];

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

// Both icons are in the markup and CSS shows the one for <html data-theme>, so the icon is right
// from the first paint, before the page hydrates (home-shell.css).
function ThemeIcon() {
  return (
    <>
      <svg className="nav__theme-icon nav__theme-icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <svg className="nav__theme-icon nav__theme-icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
      </svg>
    </>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [darkScrollSurface, setDarkScrollSurface] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileFirstLinkRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hero can be replaced during a route render or live preview update.
      const hero = pathname === '/' ? document.querySelector('.theme2-home #hero') : null;
      setScrolled(window.scrollY > 20);
      setOverHero(Boolean(
        hero && navRef.current
        && hero.getBoundingClientRect().bottom > navRef.current.getBoundingClientRect().bottom
      ));
      const viewportMiddle = window.innerHeight / 2;
      setDarkScrollSurface(pathname === '/' && ['hero', 'about', 'career'].some((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportMiddle && bounds.bottom > viewportMiddle;
      }));
    };
    handleScroll();
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = mobileMenuRef.current;
    if (!dialog) return undefined;

    const handleClose = () => {
      setMobileOpen(false);
      hamburgerRef.current?.focus();
    };

    dialog.addEventListener('close', handleClose);

    if (mobileOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => mobileFirstLinkRef.current?.focus());
    } else if (!mobileOpen && dialog.open) {
      dialog.close();
    }

    return () => dialog.removeEventListener('close', handleClose);
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      data-compact={pathname === '/' && scrolled}
      data-over-hero={pathname === '/' && overHero}
      data-scrollbar-surface={pathname === '/' && darkScrollSurface ? 'dark' : undefined}
      id="main-nav"
      aria-label="Primary"
    >
      <div className="nav__inner">
        <BrandMark key={pathname} id="nav-logo" />

        <div className="nav__links" id="nav-links">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label} className="nav__link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav__right">
          <a className={`nav__contact-cta ${styles.emailLink}`} href="mailto:consistentolusesi@gmail.com" aria-label="Let’s have a chat by email">
            <EnvelopeIcon />
            <span>Let’s have a chat</span>
          </a>
          <button
            className="nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="theme-toggle"
          >
            <ThemeIcon />
          </button>
          <MusicToggle />
        </div>

        <button
          ref={hamburgerRef}
          className={`nav__hamburger ${styles.hamburger} ${mobileOpen ? 'nav__hamburger--open' : ''}`}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          id="nav-hamburger"
        >
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
        </button>
      </div>

      <dialog
        ref={mobileMenuRef}
        className="nav__mobile-menu"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        onCancel={() => setMobileOpen(false)}
      >
        <div className="nav__mobile-header">
          <BrandMark onHomeClick={() => setMobileOpen(false)} />
          <button className="nav__mobile-close" type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="nav__mobile-links">
          {navLinks.map((link, index) => (
            <Link
              ref={index === 0 ? mobileFirstLinkRef : undefined}
              href={link.href}
              className="nav__mobile-link"
              autoFocus={index === 0}
              onClick={() => setMobileOpen(false)}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
          <a className={`nav__mobile-link ${styles.emailLink}`} href="mailto:consistentolusesi@gmail.com" aria-label="Let’s have a chat by email" onClick={() => setMobileOpen(false)}>
            <EnvelopeIcon />
            <span>Let’s have a chat</span>
          </a>
        </div>

        <div className="nav__mobile-controls" aria-label="Display and audio controls">
          <button
            className="nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <ThemeIcon />
          </button>
          <MusicToggle />
        </div>
      </dialog>
    </nav>
  );
}
