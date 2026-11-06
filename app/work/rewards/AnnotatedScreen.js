'use client'

import { useState } from 'react'
import ZoomableImage from '../pulse/PulseImage'
import styles from './rewards.module.css'

// T5 V5: a screen with its numbered list beside it (under it on phones). Each step's number sits in the gutter just
// left of the screen, centred on its region's row, so it never covers the app's own UI and reads in both themes.
// Hovering or focusing a step (tapping focuses it on touch) draws a highlight around its region; it's the only stroke,
// and it's only rendered while a step is active. The list is plain text for screen readers; the markers and the
// highlight are aria-hidden. Regions come from annotations.js (T4a's regions.json).
export default function AnnotatedScreen({ screen, sizes = '(max-width: 767px) 70vw, 280px' }) {
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const active = hovered ?? focused

  return (
    <div className={styles.annotated} data-active={active === null ? undefined : active + 1}>
      <div className={styles.annotatedScreen}>
        <ZoomableImage src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={sizes} />
        <div className={styles.annotatedOverlay} aria-hidden="true">
          {screen.steps.map((step, index) => {
            const box = step.boxes[0]
            return (
              <span
                key={step.title}
                className={styles.marker}
                data-step={index + 1}
                data-active={active === index ? 'true' : undefined}
                style={{ top: `${(box.y + box.height / 2) * 100}%` }}
              >
                {index + 1}
              </span>
            )
          })}
          {active !== null && screen.steps[active].boxes.map((box) => (
            <span
              key={`${box.x}-${box.y}`}
              className={styles.highlight}
              data-step={active + 1}
              style={{ left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%` }}
            />
          ))}
        </div>
      </div>
      <ol className={styles.steps} aria-label={screen.label} onPointerLeave={() => setHovered(null)}>
        {screen.steps.map((step, index) => (
          <li
            key={step.title}
            tabIndex={0}
            data-step={index + 1}
            data-active={active === index ? 'true' : undefined}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(index) }}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
          >
            <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
            <span className={styles.stepBody}><strong>{step.title}</strong> {step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
