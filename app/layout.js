import Script from "next/script";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import { AudioProvider } from "./components/AudioContext";

export const metadata = {
  metadataBase: new URL('https://olumideolusesi.com'),
  title: {
    default: "Lums - Product Designer | Olumide Olusesi",
    template: "%s | Lums",
  },
  description:
    "Lums (Olumide Olusesi) is a Senior Product Designer based in Ontario, Canada. Currently at Shiga Digital, previously at Branch International, Carbon, and UBA. Specializing in fintech, digital banking, and user-centered design.",
  keywords: [
    "product designer",
    "UX designer",
    "Olumide Olusesi",
    "Lums",
    "fintech design",
    "portfolio",
    "Ontario Canada",
  ],
  openGraph: {
    title: {
      default: "Lums - Product Designer | Olumide Olusesi",
      template: "%s | Lums",
    },
    description:
      "Senior Product Designer crafting intuitive digital experiences. Currently at Shiga Digital.",
    type: "website",
    locale: "en_CA",
    url: "https://olumideolusesi.com",
    siteName: "Lums Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lums - Product Designer",
    description: "Senior Product Designer crafting intuitive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
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
        <AudioProvider>
          <ThemeProvider>
            <Nav />
            {children}
            <Footer />
          </ThemeProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
