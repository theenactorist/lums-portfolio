'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ZoomableImage from '../pulse/PulseImage'
import styles from './agile.module.css'

// Prototype captures at 2x from the Enta prototype's own build (demo bar hidden): a payment link's details drawer on
// desktop, with a single Multisig request on a phone over it, laid out like the Helium hero. The phone shows its top
// two thirds in the hero; the viewer opens the whole capture.
export default function HeroMedia() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <div className={styles.heroBase}>
        <ZoomableImage src="/work/agile-ai-driven-design/prototype-desk-link.webp" alt="A payment link’s details drawer in the Enta prototype, over the list of payment links" width={2880} height={1800} priority sizes="(max-width: 767px) 85vw, 550px" />
      </div>
      <div className={styles.heroPhone}>
        <ZoomableImage src="/work/agile-ai-driven-design/prototype-phone-request.webp" alt="A single Multisig request on a phone, with its approval trail" width={780} height={1688} priority sizes="(max-width: 767px) 30vw, 200px" />
      </div>
    </motion.div>
  )
}
