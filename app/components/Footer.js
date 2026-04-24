'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import BackgroundRipple from './BackgroundRipple';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="footer" id="footer">
      {/* Ripple grid background */}
      <div className="footer__ripple">
        <BackgroundRipple rows={6} cols={50} cellSize={56} />
      </div>

      <div className="container footer__content">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <Image
                src={theme === 'dark' ? '/lums-logo-dark.svg' : '/lums-logo-light.svg'}
                alt="Lums"
                width={80}
                height={31}
              />
            </div>
            <p className="footer__tagline footer__tagline--sub">
              Open to new opportunities, collaborations, and interesting conversations.
            </p>
            <div className="footer__cta-links">
              <a href="tel:+16476577810" className="footer__cta-link" aria-label="Phone">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
                </svg>
              </a>
              <a href="mailto:consistentolusesi@gmail.com" className="footer__cta-link" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/olumideolusesi/" target="_blank" rel="noopener noreferrer" className="footer__cta-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div>
              <h4 className="footer__col-title">Navigate</h4>
              <div className="footer__col-links">
                <Link href="/" className="footer__col-link" id="footer-work">Work</Link>
                <Link href="/about" className="footer__col-link" id="footer-about">About</Link>
                <Link href="/resume" className="footer__col-link" id="footer-resume">Resume</Link>
              </div>
            </div>

            <div>
              <h4 className="footer__col-title">Connect</h4>
              <div className="footer__col-links">
                <a
                  href="https://www.linkedin.com/in/olumideolusesi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__col-link"
                  id="footer-linkedin"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:consistentolusesi@gmail.com"
                  className="footer__col-link"
                  id="footer-email"
                >
                  Email
                </a>
                <a
                  href="https://adplist.org/mentors/olumide-olusesi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__col-link"
                  id="footer-adplist"
                >
                  ADPList
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {currentYear} Olumide Olusesi. All rights reserved.</span>
          <span>Designed & vibe-coded with 💛</span>
        </div>
        <div className="footer__easter-hint">
          🔲 Tap any grid cell 5× to unlock a fun fact about Lums
        </div>
      </div>
    </footer>
  );
}
