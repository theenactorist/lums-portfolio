'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import styles from './pulse-dialogs.module.css'

const PULSE_DOCUMENTS = {
  product: { label: 'PRODUCT.md', src: '/work/pulse/docs/MASTER-BUILD-PROMPT.md', sourceLabel: 'BUILD_PROMPT.md' },
  design: { label: 'DESIGN.md', src: '/work/pulse/docs/DESIGN.md', sourceLabel: 'DESIGN.md' },
}

function subscribeTheme(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
const getServerTheme = () => 'light'

function NativeDialog({ children, title, variant = 'document', onDismiss, triggerRef }) {
  const dialogRef = useRef(null)
  const backdropPointerRef = useRef(false)
  const titleId = useId()

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const returnTarget = triggerRef.current || document.activeElement
    const scrollPosition = { x: window.scrollX, y: window.scrollY }
    const previous = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPadding: document.body.style.paddingRight,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyLeft: document.body.style.left,
      bodyWidth: document.body.style.width,
    }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.y}px`
    document.body.style.left = `-${scrollPosition.x}px`
    document.body.style.width = '100%'
    if (scrollbar > 0) document.body.style.paddingRight = `${padding + scrollbar}px`
    dialog.showModal()
    dialog.querySelector('[data-dialog-initial-focus]')?.focus({ preventScroll: true })

    return () => {
      if (dialog.open) dialog.close()
      document.documentElement.style.overflow = previous.htmlOverflow
      document.body.style.overflow = previous.bodyOverflow
      document.body.style.paddingRight = previous.bodyPadding
      document.body.style.position = previous.bodyPosition
      document.body.style.top = previous.bodyTop
      document.body.style.left = previous.bodyLeft
      document.body.style.width = previous.bodyWidth
      window.scrollTo({ left: scrollPosition.x, top: scrollPosition.y, behavior: 'instant' })
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true })
    }
  }, [triggerRef])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${styles[`${variant}Dialog`] || ''}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
      onClose={(event) => {
        if (!event.currentTarget.open) onDismiss()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || event.defaultPrevented) return
        const dialog = event.currentTarget
        const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')]
          .filter((element) => element.tabIndex >= 0 && element.getClientRects().length && !element.closest('[inert], [hidden], [aria-hidden="true"]'))
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus({ preventScroll: true })
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus({ preventScroll: true })
        }
      }}
      onPointerDown={(event) => {
        backdropPointerRef.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropPointerRef.current) onDismiss()
        backdropPointerRef.current = false
      }}
    >
      {variant === 'checkout' ? (
        <h2 id={titleId} className={styles.srOnly}>{title}</h2>
      ) : (
        <header className={styles.header}>
          <h2 id={titleId}>{title}</h2>
          <button type="button" data-dialog-initial-focus onClick={onDismiss} className={styles.control}>
            Close
          </button>
        </header>
      )}
      {children}
    </dialog>,
    document.body,
  )
}

function DocumentDialog({ documentKey, onDismiss, triggerRef }) {
  const document = PULSE_DOCUMENTS[documentKey]
  const [result, setResult] = useState({ status: 'loading', text: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch(document.src, { cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('Document request failed')
        const text = await response.text()
        if (!controller.signal.aborted) setResult({ status: 'ready', text })
      } catch (error) {
        if (error.name !== 'AbortError' && !controller.signal.aborted) {
          setResult({ status: 'error', text: '' })
        }
      }
    }
    load()
    return () => controller.abort()
  }, [document.src, attempt])

  return (
    <NativeDialog title={document.label} onDismiss={onDismiss} triggerRef={triggerRef}>
      <div className={styles.documentBody} data-document-body>
        <p className={styles.source}>
          Full document from{' '}
          <a href={document.src} target="_blank" rel="noreferrer">{document.sourceLabel}</a>.
        </p>
        {result.status === 'loading' && <p role="status">Loading document…</p>}
        {result.status === 'error' && (
          <div className={styles.loadState}>
            <p role="alert">The document could not be loaded.</p>
            <button type="button" className={styles.control} onClick={() => {
              setResult({ status: 'loading', text: '' })
              setAttempt((value) => value + 1)
            }}>Try again</button>
          </div>
        )}
        {result.status === 'ready' && <pre tabIndex={0} aria-label={`${document.label} source`} className={styles.documentText}>{result.text}</pre>}
      </div>
    </NativeDialog>
  )
}

export function DocumentTrigger({ documentKey, children, className = '' }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dismiss = useCallback(() => setOpen(false), [])
  const document = PULSE_DOCUMENTS[documentKey]

  return (
    <>
      <button ref={triggerRef} type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        {children || `Read ${document.label}`}
      </button>
      {open && <DocumentDialog documentKey={documentKey} onDismiss={dismiss} triggerRef={triggerRef} />}
    </>
  )
}

function CheckoutDialog({ onDismiss, triggerRef }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)
  const [Checkout, setCheckout] = useState(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    let active = true
    import('./vendor/pulse-checkout/PulseCheckoutPreview').then((module) => {
      if (active) setCheckout(() => module.PulseCheckoutPreview)
    }).catch(() => {
      if (active) setError(true)
    })
    return () => { active = false }
  }, [attempt])

  useEffect(() => {
    if (!Checkout) return
    const frame = requestAnimationFrame(() => {
      containerRef.current?.querySelector('[aria-label="Close checkout"]')?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [Checkout])

  return (
    <NativeDialog title="Embedded checkout" variant="checkout" onDismiss={onDismiss} triggerRef={triggerRef}>
      <div ref={containerRef} className={styles.checkoutContainer}>
        {Checkout ? <Checkout onClose={onDismiss} theme={theme} /> : (
          <div className={styles.checkoutLoading}>
            <button type="button" data-dialog-initial-focus className={styles.control} onClick={onDismiss} aria-label="Close checkout">Close</button>
            <p role={error ? 'alert' : 'status'}>{error ? 'The checkout could not be loaded.' : 'Loading checkout…'}</p>
            {error && <button type="button" className={styles.control} onClick={() => {
              setError(false)
              setAttempt((value) => value + 1)
            }}>Try again</button>}
          </div>
        )}
      </div>
    </NativeDialog>
  )
}

export function CheckoutTrigger({ children, className = '' }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dismiss = useCallback(() => setOpen(false), [])
  return (
    <>
      <button ref={triggerRef} type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        {children || 'Try the interactive checkout'}
      </button>
      {open && <CheckoutDialog onDismiss={dismiss} triggerRef={triggerRef} />}
    </>
  )
}

