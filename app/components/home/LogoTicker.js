'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const logos = [
  {
    name: 'Shiga',
    slug: 'Shiga',
    url: 'https://shiga.io/',
    // Shiga's v2 brand mark is drawn on its own 278 by 77 canvas.
    source: { width: 278, height: 77 },
    bounds: { x: 0, y: 0, width: 278, height: 77 },
  },
  {
    name: 'Branch',
    slug: 'Branch',
    url: 'https://branch.co/',
    bounds: { x: 0, y: 4, width: 107, height: 40 },
  },
  {
    name: 'Carbon',
    slug: 'Carbon',
    url: 'https://www.getcarbon.co/',
    bounds: { x: 0, y: 11, width: 107, height: 27 },
  },
  {
    name: 'Sabi',
    slug: 'Sabi',
    url: 'https://sabi.am/',
    bounds: { x: 0, y: 10, width: 107, height: 28 },
  },
  {
    name: 'UBA',
    slug: 'UBA',
    url: 'https://www.ubagroup.com/',
    bounds: { x: 20, y: 8, width: 67, height: 32 },
  },
  {
    name: 'Africa Prudential',
    slug: 'AfricaPrudential',
    url: 'https://www.africaprudential.com/',
    bounds: { x: 0, y: 15, width: 107, height: 17 },
  },
  {
    name: 'Wole Olanipekun',
    slug: 'WoleOlanipekun',
    url: 'http://woleolanipekun.com/',
    bounds: { x: 1, y: 18, width: 106, height: 12 },
  },
  {
    name: 'Fiverr',
    slug: 'Fiverr',
    url: 'http://fiverr.com/',
    bounds: { x: 0, y: 7, width: 107, height: 34 },
  },
  {
    name: 'Airtel',
    slug: 'Airtel',
    url: 'https://www.airtel.africa/',
    bounds: { x: 0, y: 11, width: 107, height: 27 },
  },
  {
    name: 'FCMB',
    slug: 'FCMB',
    url: 'https://fcmb.com/',
    bounds: { x: 37, y: 8, width: 33, height: 33 },
  },
  {
    name: 'First Trust',
    slug: 'FirstTrust',
    url: 'https://www.ftmortgagebankplc.com/',
    bounds: { x: 0, y: 10, width: 107, height: 28 },
  },
  {
    name: 'Providus Bank',
    slug: 'ProvidusBank',
    url: 'https://www.providusbank.com/',
    bounds: { x: 19, y: 9, width: 68, height: 30 },
  },
];

const allLogos = [...logos, ...logos];
const defaultSource = { width: 107, height: 48 };
const maximumLogoHeight = 26;

function getLogoCropStyle({ bounds, source = defaultSource }) {
  const scale = Math.min(1, maximumLogoHeight / bounds.height);

  return {
    '--logo-crop-width': `${bounds.width * scale}px`,
    '--logo-crop-height': `${bounds.height * scale}px`,
    '--logo-source-width': `${source.width * scale}px`,
    '--logo-source-height': `${source.height * scale}px`,
    '--logo-offset-x': `${bounds.x * scale * -1}px`,
    '--logo-offset-y': `${bounds.y * scale * -1}px`,
  };
}

export default function LogoTicker() {
  const { theme } = useTheme();
  const prefix = theme === 'dark' ? 'Dark_mode' : 'Light_mode';
  const tickerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(ticker);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="logo-ticker"
      aria-label="Selected companies and clients"
      data-visible={isVisible}
      ref={tickerRef}
    >
      <div className="logo-ticker__track-wrapper">
        <div className="logo-ticker__track">
          {allLogos.map((logo, index) => {
            const isDuplicate = index >= logos.length;
            return (
              <a
                key={`${logo.slug}-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="logo-ticker__item"
                aria-label={isDuplicate ? undefined : logo.name}
                aria-hidden={isDuplicate ? 'true' : undefined}
                style={getLogoCropStyle(logo)}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                <Image
                  src={`/logos/${theme === 'dark' ? 'dark' : 'light'}/${prefix}-${logo.slug}.svg`}
                  alt={isDuplicate ? '' : logo.name}
                  width={(logo.source ?? defaultSource).width}
                  height={(logo.source ?? defaultSource).height}
                  className="logo-ticker__img"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
