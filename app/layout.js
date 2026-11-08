import Script from "next/script";
import { Google_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./home-shell.css";
import SiteShell from "./components/home/SiteShell";
import { AudioProvider } from "./components/AudioContext";
import JsonLd from './components/JsonLd';
import { pageMetadata, site, siteIdentity } from '../lib/seo';
import { themeInitScript } from '../lib/theme';

// Self-hosted at build time, so pages make no request to Google for fonts.
// Google Sans loads as its variable font, which covers every weight from 400 to 700
// (the case studies use 450, 550 and 650 as well as the four standard weights).
const googleSans = Google_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-google-sans",
});

// Monospace is for code, file names and the existing technical labels.
const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  ...pageMetadata({ title: site.title, description: site.description, path: '/' }),
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.brand}` },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
};

export default function RootLayout({ children }) {
  return (
    // data-theme is written by the inline script before the first paint (lib/theme.js), so the
    // server sends none and React leaves the attribute alone.
    <html lang="en" className={`${googleSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S7J6MXCNLB"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-S7J6MXCNLB');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xtv8ld35sq");
            `,
          }}
        />
      </head>
      <body>
        <JsonLd data={siteIdentity} />
        <AudioProvider>
          <SiteShell>{children}</SiteShell>
        </AudioProvider>
      </body>
    </html>
  );
}
