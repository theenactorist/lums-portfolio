import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'

// Helium's two typefaces (packages/tokens/tokens/scale/typography.json), loaded for this page's figures only.
// Instrument Sans is a variable font, so one file covers 400 to 700. Plex Mono needs latin-ext for ₦, ₵, ₿ and ₮.
export const instrumentSans = Instrument_Sans({ subsets: ['latin'], display: 'swap' })
export const plexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '600'], display: 'swap' })
