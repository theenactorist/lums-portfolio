'use client'

import { useId, useState, useSyncExternalStore } from 'react'
import styles from './HeliumThemeExample.module.css'

const STORYBOOK = 'https://helium-design-system-storybook.vercel.app'
const THEMES = [
  { id: 'light', label: 'Individual light' },
  { id: 'dark', label: 'Individual dark' },
  { id: 'business-light', label: 'Business light' },
  { id: 'business-dark', label: 'Business dark' },
]

// The iframe is only created after hydration: a server-rendered iframe can finish loading before
// React attaches onLoad, which would leave the loading state up for good.
const subscribeMount = () => () => {}

const snippetFor = (theme) => theme === 'light'
  ? '<!-- Individual light is the default: no attribute -->\n<html>'
  : `<html data-theme="${theme}">`

// The canvas renders Helium's own Storybook story; no Helium component or style is recreated here.
// Story ids were checked against the Storybook index.json on 2 November 2026.
export default function HeliumThemeExample({ storyId, componentName, label, title, helper, caption, height = 340, mobileHeight = height }) {
  const [theme, setTheme] = useState('light')
  const [loaded, setLoaded] = useState(false)
  const mounted = useSyncExternalStore(subscribeMount, () => true, () => false)
  const previewId = useId()
  const titleId = useId()
  const current = THEMES.find((item) => item.id === theme)
  const canvasUrl = `${STORYBOOK}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`
  const storyUrl = `${STORYBOOK}/?path=/story/${storyId}&globals=theme:${theme}`

  const choose = (id) => {
    if (id === theme) return
    setLoaded(false)
    setTheme(id)
  }

  return (
    <section className={styles.example} aria-labelledby={titleId} data-helium-theme-example={storyId}>
      <header className={styles.header}>
        <div>
          <span className={styles.context}>{label}</span>
          <h3 id={titleId}>{title}</h3>
          {helper && <p className={styles.helper}>{helper}</p>}
        </div>
        <a href={storyUrl} target="_blank" rel="noreferrer" className={styles.sourceLink} data-storybook-link>
          View in Storybook
        </a>
      </header>

      <div className={styles.controls} role="group" aria-label={`${componentName} mode`}>
        {THEMES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={theme === item.id}
            aria-controls={previewId}
            data-theme-option={item.id}
            onClick={() => choose(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.content} id={previewId}>
        <div className={styles.canvas} style={{ '--canvas-height': `${height}px`, '--canvas-height-mobile': `${mobileHeight}px` }} aria-busy={!loaded}>
          {!loaded && <span className={styles.loading} role="status">Loading {current.label}…</span>}
          {mounted && <iframe
            key={canvasUrl}
            src={canvasUrl}
            title={`Helium ${componentName} in the ${current.label} mode`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            data-loaded={loaded}
          />}
        </div>
        <pre className={styles.code} aria-label={`HTML mode attribute for ${current.label}`}><code>{snippetFor(theme)}</code></pre>
      </div>

      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  )
}
