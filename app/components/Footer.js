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
            <p className="footer__tagline">Let&apos;s build something great together.</p>
            <p className="footer__tagline footer__tagline--sub">
              Open to new opportunities, collaborations, and interesting conversations.
            </p>
            <div className="footer__cta-links">
              <a href="tel:+12369758435" className="footer__cta-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
                </svg>
                Get in touch
              </a>
              <a href="https://www.linkedin.com/in/olumideolusesi/" target="_blank" rel="noopener noreferrer" className="footer__cta-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
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
