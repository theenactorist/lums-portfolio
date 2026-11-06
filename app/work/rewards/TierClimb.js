'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import styles from './rewards.module.css'

// T5 V4: a customer climbing from Tier 1 to Tier 6, built from Carbon's own tier components (Figma, read-only SVG
// exports in public/work/rewards/tiers/): the “You're on TIER n” pills (1963:1549, 1545, 1529, 1533, 1537, 1541),
// the md hexagon badges (1963:1500 to 1525), and the progress states Completed (1963:1552), Current for each tier
// (1963:1606, 1600, 1576, 1582, 1588, 1594) and Locked (1963:1612).
// It starts at Tier 1 once the figure is half in view, steps up every 0.8s and stops on Tier 6 (4s in all), once per
// page view; Replay runs it again. Transform and opacity only. Reduced motion: Tier 3, no stepping, no Replay.
const tiers = [1, 2, 3, 4, 5, 6]
const STEP_MS = 800
const REDUCED_TIER = 3
// Each export's own size (its viewBox), so next/image keeps the proportions.
const pillWidths = { 1: 187, 2: 191, 3: 192, 4: 192, 5: 191, 6: 192 }
const currentHeights = { 1: 64, 2: 63, 3: 63, 4: 63, 5: 64, 6: 64 }

const reducedQuery = '(prefers-reduced-motion: reduce)'
const subscribe = (callback) => {
  const query = window.matchMedia(reducedQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getReduced = () => window.matchMedia(reducedQuery).matches
const getServerReduced = () => false

const ease = [0.16, 1, 0.3, 1]

export default function TierClimb() {
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5, once: true })
  const [tier, setTier] = useState(1)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (reduced || !inView) return undefined
    const timers = tiers.slice(1).map((next, index) => setTimeout(() => setTier(next), (index + 1) * STEP_MS))
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced, run])

  const shown = reduced ? REDUCED_TIER : tier
  const transition = reduced ? { duration: 0 } : { duration: 0.35, ease }
  const replay = () => {
    setTier(1)
    setRun((count) => count + 1)
  }

  return (
    <div ref={ref} className={styles.tierClimb} data-tier={shown}>
      <p className={styles.srOnly}>Carbon’s six tiers, from Tier 1 to Tier 6. In the progress row, the tiers a customer has passed are ticked, their tier is highlighted in its colour with “You” under it, and the tiers ahead are locked.</p>
      <div className={styles.badgePanel} aria-hidden="true">
        <div className={styles.tierPill}>
          {tiers.map((n) => (
            <motion.span key={n} className={styles.tierPillItem} initial={false} animate={{ opacity: n === shown ? 1 : 0, y: n === shown ? 0 : n < shown ? -6 : 6 }} transition={transition}>
              <Image src={`/work/rewards/tiers/pill-${n}.svg`} alt="" width={pillWidths[n]} height={32} />
            </motion.span>
          ))}
        </div>
        <ol className={styles.tierBadges}>
          {tiers.map((n) => (
            <motion.li key={n} initial={false} animate={{ opacity: n <= shown ? 1 : 0.3, scale: n === shown ? 1.15 : 1 }} transition={transition}>
              <Image src={`/work/rewards/tiers/badge-${n}.svg`} alt="" width={24} height={25} />
            </motion.li>
          ))}
        </ol>
        <ol className={styles.tierProgress}>
          {tiers.map((n) => {
            const state = n < shown ? 'completed' : n === shown ? 'current' : 'locked'
            return (
              <li key={n} className={styles.tierCell}>
                <motion.span className={styles.tierCompleted} initial={false} animate={{ opacity: state === 'completed' ? 1 : 0 }} transition={transition}>
                  <Image src="/work/rewards/tiers/completed.svg" alt="" width={30} height={29} />
                </motion.span>
                <motion.span className={styles.tierLocked} initial={false} animate={{ opacity: state === 'locked' ? 1 : 0 }} transition={transition}>
                  <Image src="/work/rewards/tiers/locked.svg" alt="" width={44} height={44} />
                </motion.span>
                <motion.span className={styles.tierCurrent} initial={false} animate={{ opacity: state === 'current' ? 1 : 0, scale: state === 'current' ? 1.08 : 0.9 }} transition={transition}>
                  <Image src={`/work/rewards/tiers/current-${n}.svg`} alt="" width={54} height={currentHeights[n]} />
                </motion.span>
              </li>
            )
          })}
        </ol>
      </div>
      {!reduced && <button type="button" className={styles.replay} onClick={replay}>Replay</button>}
    </div>
  )
}
