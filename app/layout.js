import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import { AudioProvider } from "./components/AudioContext";

export const metadata = {
  title: "Lums — Product Designer | Olumide Olusesi",
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
    title: "Lums — Product Designer | Olumide Olusesi",
    description:
      "Senior Product Designer crafting intuitive digital experiences. Currently at Shiga Digital.",
    type: "website",
    locale: "en_CA",
    url: "https://olumideolusesi.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lums — Product Designer",
    description:
      "Senior Product Designer crafting intuitive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
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
