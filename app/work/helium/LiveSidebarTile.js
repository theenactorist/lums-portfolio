'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import styles from './helium.module.css'

const STORYBOOK = 'https://helium-design-system-storybook.vercel.app'
const FRAME_WIDTH = 265

// The iframe is only created after hydration, as in HeliumThemeExample: a server-rendered iframe can finish
// loading before React attaches onLoad.
const subscribeMount = () => () => {}

// Chrome fires `load` on an iframe even when the host can't be reached (it loads its own error page), so the
// tiles first check once that Storybook answers. Until it does, and if it never does, the screenshot stays.
let reachable = 'unknown'
let probe
const listeners = new Set()
function subscribeReachable(listener) {
  listeners.add(listener)
  if (!probe) {
    probe = fetch(`${STORYBOOK}/iframe.html`, { mode: 'no-cors', cache: 'no-store' })
      .then(() => 'ok', () => 'blocked')
      .then((result) => { reachable = result; listeners.forEach((fn) => fn()) })
  }
  return () => listeners.delete(listener)
}

// Helium's SidebarNavigation, live from the public Storybook. The iframe is the story's own frame (265 by 1024),
// seen through a 265 by 440 window that shows what the screenshot shows. In columns narrower than 265px the window
// and the iframe scale down together, so the crop stays the same. No Helium code or styles are copied in.
export default function LiveSidebarTile({ storyId, theme, label, title }) {
  const tileRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const mounted = useSyncExternalStore(subscribeMount, () => true, () => false)
  const status = useSyncExternalStore(subscribeReachable, () => reachable, () => 'unknown')

  useEffect(() => {
    const tile = tileRef.current
    if (!tile) return undefined
    const observer = new ResizeObserver(([entry]) => {
      tile.style.setProperty('--tile-scale', String(Math.min(1, entry.contentRect.width / FRAME_WIDTH)))
    })
    observer.observe(tile)
    return () => observer.disconnect()
  }, [])

  const src = `${STORYBOOK}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`

  return (
    <div data-theme-tile={theme}>
      <span className={styles.figureLabel}>{label}</span>
      <div ref={tileRef} className={styles.liveTile} data-live-tile={theme} data-loaded={loaded} aria-busy={status !== 'blocked' && !loaded}>
        <div className={styles.liveFrame}>
          <Image className={styles.livePoster} src={`/work/helium/storybook-sidebar-${theme}.webp`} alt="" width={530} height={880} sizes="265px" />
          {mounted && status === 'ok' && (
            <iframe
              src={src}
              title={title}
              width={FRAME_WIDTH}
              height={1024}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
