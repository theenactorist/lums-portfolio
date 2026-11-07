'use client'

import { useId, useState, useSyncExternalStore } from 'react'
import styles from './HeliumButtonExample.module.css'
import { LinkArrowLabel } from '../../components/ArrowUpRightIcon'

const STORYBOOK = 'https://helium-design-system-storybook.vercel.app'
const EXAMPLES = {
  primary: { label: 'Primary', hierarchy: 'primary', figmaHierarchy: 'Primary' },
  secondary: { label: 'Secondary', hierarchy: 'secondary', figmaHierarchy: 'Secondary' },
  disabled: { label: 'Disabled', hierarchy: 'primary', figmaHierarchy: 'Primary', disabled: true },
}

function subscribeTheme(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
const getServerTheme = () => 'light'

// The canvas renders Helium's maintained Button story; no Button implementation
// or styles are recreated here. Source identifiers and prop mappings were
// verified against Storybook index.json and Button.figma.json on 13 October 2026.
export default function HeliumButtonExample() {
  const [selection, setSelection] = useState('primary')
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)
  const previewId = useId()
  const titleId = useId()
  const example = EXAMPLES[selection]
  const storyId = `components-button--${selection}`
  const canvasUrl = `${STORYBOOK}/iframe.html?id=${storyId}&viewMode=story&args=size:lg&globals=theme:${theme}`
  const storyUrl = `${STORYBOOK}/?path=/story/${storyId}&args=size:lg&globals=theme:${theme}`
  const code = `import {
  Button,
} from '@helium/react';

<Button
  hierarchy="${example.hierarchy}"
  size="lg"${example.disabled ? '\n  disabled' : ''}
>
  Button CTA
</Button>`

  return (
    <section className={styles.example} aria-labelledby={titleId} data-helium-example>
      <header className={styles.header}>
        <div>
          <span className={styles.context}>Current Helium reference</span>
          <h3 id={titleId}>One Button, reusable props</h3>
        </div>
        <a href={storyUrl} target="_blank" rel="noreferrer" className={styles.sourceLink}>
          <LinkArrowLabel>View in Storybook</LinkArrowLabel><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </header>

      <div className={styles.controls} role="group" aria-label="Helium Button examples">
        {Object.entries(EXAMPLES).map(([key, item]) => (
          <button
            key={key}
            type="button"
            aria-pressed={selection === key}
            aria-controls={previewId}
            onClick={() => setSelection(key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.content} id={previewId}>
        <div className={styles.canvas}>
          <iframe
            src={canvasUrl}
            title={`Maintained Helium Button: ${example.label}, large size`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <pre className={styles.code} aria-label={`${example.label} Helium Button React usage`}><code>{code}</code></pre>
      </div>

      <p className={styles.mapping}>
        Figma’s “{example.figmaHierarchy}” hierarchy maps to <code>hierarchy=&quot;{example.hierarchy}&quot;</code>,
        and its “lg” size to <code>size=&quot;lg&quot;</code>.{' '}
        {example.disabled
          ? <>The Disabled state adds the <code>disabled</code> prop.</>
          : <>Hover and keyboard focus use the component’s CSS states.</>}
      </p>
      <p className={styles.caption}>Live canvas from the maintained Storybook. “Button CTA” is its example label.</p>
    </section>
  )
}
