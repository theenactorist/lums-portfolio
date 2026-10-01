'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './pulse-dialogs.module.css'

const PULSE_DOCUMENTS = {
  product: { label: 'PRODUCT.md', src: '/work/pulse/docs/MASTER-BUILD-PROMPT.md', sourceLabel: 'BUILD_PROMPT.md' },
  design: { label: 'DESIGN.md', src: '/work/pulse/docs/DESIGN.md', sourceLabel: 'DESIGN.md' },
}

function NativeDialog({ children, title, variant = 'document', onDismiss, triggerRef }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const returnTarget = triggerRef.current || document.activeElement
    const previous = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPadding: document.body.style.paddingRight,
    }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${padding + scrollbar}px`
    dialog.showModal()
    dialog.querySelector('[data-dialog-initial-focus]')?.focus({ preventScroll: true })

    return () => {
      if (dialog.open) dialog.close()
      document.documentElement.style.overflow = previous.htmlOverflow
      document.body.style.overflow = previous.bodyOverflow
      document.body.style.paddingRight = previous.bodyPadding
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true })
    }
  }, [triggerRef])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${styles[`${variant}Dialog`] || ''}`}
      aria-labelledby={titleId}
      onClose={(event) => {
        if (!event.currentTarget.open) onDismiss()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || event.defaultPrevented) return
        const dialog = event.currentTarget
        const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')]
          .filter((element) => element.getClientRects().length && !element.closest('[inert]'))
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss()
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
        {result.status === 'ready' && <pre tabIndex={0} className={styles.documentText}>{result.text}</pre>}
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
        {Checkout ? <Checkout onClose={onDismiss} /> : (
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

