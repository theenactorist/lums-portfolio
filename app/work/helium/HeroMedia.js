'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ZoomableImage from '../pulse/PulseImage'
import styles from './helium.module.css'

export default function HeroMedia() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <div className={styles.heroBase}>
        <ZoomableImage src="/work/helium/storybook-button-docs.webp" alt="Helium Button documentation in Storybook, with its props and states" width={1600} height={1000} priority sizes="(max-width: 767px) 85vw, 550px" />
      </div>
      <div className={styles.heroSwap}>
        <ZoomableImage src="/work/helium/swapcard-business-dark.webp" alt="Helium SwapCard in the Business dark theme" width={782} height={632} priority sizes="(max-width: 767px) 40vw, 230px" />
      </div>
      <div className={styles.heroTokens}>
        <ZoomableImage src="/work/helium/tokenavatar-pairs.webp" alt="Helium TokenAvatar pairs showing coins with their network badges" width={224} height={160} priority sizes="(max-width: 767px) 24vw, 130px" />
      </div>
    </motion.div>
  )
}
