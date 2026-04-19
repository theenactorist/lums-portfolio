'use client';

import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const logos = [
  { name: 'Africa Prudential', slug: 'AfricaPrudential', url: 'https://www.africaprudential.com/' },
  { name: 'UBA',               slug: 'UBA',              url: 'https://www.ubagroup.com/' },
  { name: 'Carbon',            slug: 'Carbon',           url: 'https://www.getcarbon.co/' },
  { name: 'Branch',            slug: 'Branch',           url: 'https://branch.co/' },
  { name: 'Wole Olanipekun',   slug: 'WoleOlanipekun',  url: 'http://woleolanipekun.com/' },
  { name: 'Sabi',              slug: 'Sabi',             url: 'https://sabi.am/' },
  { name: 'Fiverr',            slug: 'Fiverr',           url: 'http://fiverr.com/' },
  { name: 'Shiga',             slug: 'Shiga',            url: 'https://shiga.io/' },
  { name: 'Airtel',            slug: 'Airtel',           url: 'https://www.airtel.africa/' },
  { name: 'FCMB',              slug: 'FCMB',             url: 'https://fcmb.com/' },
  { name: 'First Trust',       slug: 'FirstTrust',       url: 'https://www.ftmortgagebankplc.com/' },
  { name: 'Providus Bank',     slug: 'ProvidusBank',     url: 'https://www.providusbank.com/' },
];

const allLogos = [...logos, ...logos];

export default function LogoTicker() {
  const { theme } = useTheme();
  const prefix = theme === 'dark' ? 'Dark_mode' : 'Light_mode';

  return (
    <div className="logo-ticker">
      <p className="logo-ticker__label">Companies I&apos;ve worked with</p>
      <div className="logo-ticker__track-wrapper">
        <div className="logo-ticker__track">
          {allLogos.map((logo, i) => (
            <a
              key={i}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="logo-ticker__item"
              aria-label={logo.name}
            >
              <Image
                src={`/logos/${theme === 'dark' ? 'dark' : 'light'}/${prefix}-${logo.slug}.svg`}
                alt={logo.name}
                width={107}
                height={48}
                className="logo-ticker__img"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
