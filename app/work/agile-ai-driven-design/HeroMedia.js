'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ZoomableImage from '../pulse/PulseImage'
import styles from './agile.module.css'

// T15 V4: Google's device art (Android Device Art Generator, Pixelbook Go landscape and Pixel 5 portrait, back layers
// only, no shadow or glare) with screens recaptured from enta-one.vercel.app, demo bar hidden. Each screen sits under
// its device at the generator's offset; the laptop is at full size and the phone in front over its lower left. One
// transparent image, so it sits on the hero surface in both themes.
export default function HeroMedia() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <ZoomableImage src="/work/agile-ai-driven-design/hero-pixel.webp" alt="The Enta prototype on a Pixelbook Go and a Pixel 5: a payment link’s details on the laptop and a Multisig request on the phone" width={2493} height={1707} priority sizes="(max-width: 767px) 85vw, (max-width: 1479px) 560px, 740px" />
    </motion.div>
  )
}
