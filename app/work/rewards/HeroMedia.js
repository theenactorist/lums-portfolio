'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ZoomableImage from '../pulse/PulseImage'
import styles from './rewards.module.css'

// The hero frame from Figma (T4, 1982:1210), exported at 2x: Carbon's Tier 3 screen beside Branch's Rewards tab.
export default function HeroMedia() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <ZoomableImage src="/work/rewards/hero.webp" alt="Carbon’s tiers screen showing Tier 3 benefits, beside Branch’s Rewards tab with a cashback balance and an invite card" width={3200} height={2000} priority sizes="(max-width: 767px) 85vw, (max-width: 1479px) 720px, 640px" />
    </motion.div>
  )
}
