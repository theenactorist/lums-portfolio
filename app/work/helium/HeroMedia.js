'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ZoomableImage from '../pulse/PulseImage'
import styles from './helium.module.css'

export default function HeroMedia() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <div className={styles.heroBase}>
        <ZoomableImage src="/work/helium/figma-helium-2-thumbnail.webp" alt="Helium 2.0 cover in Figma" width={1200} height={675} priority sizes="(max-width: 767px) 85vw, 550px" />
      </div>
      <div className={styles.heroDocs}>
        <ZoomableImage src="/work/helium/storybook-button-docs.webp" alt="Helium Button documentation in Storybook, with its props and states" width={1600} height={1000} priority sizes="(max-width: 767px) 55vw, 340px" />
      </div>
    </motion.div>
  )
}
