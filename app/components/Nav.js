'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import MusicToggle from './MusicToggle';

const navLinks = [
  { href: '/#featured-work', label: 'Selected work' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Résumé' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="main-nav" aria-label="Primary">
      <div className="nav__inner">
        <Link href="/" className="nav__logo" id="nav-logo" aria-label="Lums home">
          Lums<span aria-hidden="true">*</span>
        </Link>

        <div className="nav__links" id="nav-links">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label} className="nav__link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav__right">
          <a className="nav__contact-cta" href="mailto:consistentolusesi@gmail.com">
            Let’s talk
          </a>
          <button
            className="nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="theme-toggle"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
              </svg>
            )}
          </button>
          <MusicToggle />
        </div>

        <button
          className={`nav__hamburger ${mobileOpen ? 'nav__hamburger--open' : ''}`}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          id="nav-hamburger"
        >
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="nav__mobile-menu nav__mobile-menu--open" id="mobile-navigation">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              className="nav__mobile-link"
              onClick={() => setMobileOpen(false)}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
          <a className="nav__mobile-link" href="mailto:consistentolusesi@gmail.com">Let’s talk</a>
        </div>
      ) : null}
    </nav>
  );
}
