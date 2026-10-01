'use client'

/* eslint-disable @next/next/no-img-element -- The maintained SDK uses exact local currency SVGs. */
// Extracted faithfully from Pulse/src/App.jsx; see README.md for adapter changes.
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { PulseLogo } from './PulseLogo'
import './fonts.css'

const NETWORKS = {
  arbitrum: { name: 'Arbitrum', icon: 'arbitrum', feeMinor: 7200, rateFactor: 1, confirmations: 3 },
  base: { name: 'Base', icon: 'base', feeMinor: 10700, rateFactor: 1, confirmations: 3 },
  celo: { name: 'Celo', icon: 'celo', feeMinor: 6100, rateFactor: 1, confirmations: 3 },
  ethereum: { name: 'Ethereum', icon: 'ethereum', feeMinor: 12500, rateFactor: 1, confirmations: 12 },
  optimism: { name: 'Optimism', icon: 'optimism', feeMinor: 6800, rateFactor: 1, confirmations: 3 },
  polygon: { name: 'Polygon', icon: 'polygon', feeMinor: 6400, rateFactor: 1, confirmations: 4 },
  plasma: { name: 'Plasma', icon: 'plasma', feeMinor: 5900, rateFactor: 1, confirmations: 3 },
  bitcoin: { name: 'Bitcoin network', icon: 'bitcoin', feeMinor: 8500, rateFactor: 1, confirmations: 2 },
  spark: { name: 'Spark network', icon: 'spark', feeMinor: 4200, rateFactor: 1, confirmations: 1 },
}

const ASSETS = {
  USDT: { name: 'Tether', icon: 'usdt', precision: 6, rate: 1470, networks: ['arbitrum', 'base', 'celo', 'ethereum', 'optimism', 'polygon', 'plasma'] },
  USDC: { name: 'USD Coin', icon: 'usdc', precision: 6, rate: 1470, networks: ['arbitrum', 'base', 'celo', 'ethereum', 'optimism', 'polygon'] },
  BTC: { name: 'Bitcoin', icon: 'btc', precision: 8, rate: 158000000, networks: ['bitcoin', 'spark'] },
  XAUT: { name: 'Tether Gold', icon: 'xaut', precision: 6, rate: 4872000, networks: ['arbitrum', 'ethereum', 'polygon', 'plasma'] },
}

const DISPLAY_SYMBOLS = { USDT: 'USD₮', XAUT: 'XAU₮' }

const displaySymbol = (symbol) => DISPLAY_SYMBOLS[symbol] || symbol

const resolveSdkSizePreset = (requestedPreset) => {
  if (requestedPreset === 'legacy' || requestedPreset === 'standard') return requestedPreset
  try { return new URLSearchParams(window.location.search).get('sdk-size') === 'legacy' ? 'legacy' : 'standard' }
  catch { return 'standard' }
}

const DESTINATIONS = {
  arbitrum: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  base: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  celo: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  ethereum: { address: '0x7A6e4C2b9D1f8E3a5B0c6F4d2A9e1C7b5D8f3A0e' },
  optimism: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  polygon: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  plasma: { address: '0x5A2e4D7c9B1f6E3a8C0d2F4b7A9e1C3d5F8a6B0c' },
  bitcoin: { address: 'bc1qpulse7w4tch9f3gm2xq8vr6nk1ay5sd7cb4en9m' },
  spark: { address: 'sp1qpulse7w4tch9f3gm2xq8vr6nk1ay5sd7cb4en9m' },
}

const ORDER = (() => {
  const minorUnits = 100000000
  const amountMajor = minorUnits / 100
  return {
    id: 'DTB-8X4J2',
    product: 'Dangote T-Bill',
    amountMinorUnits: minorUnits,
    amountMajor,
    fiatAmount: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amountMajor),
    quoteTtlSeconds: 600,
  }
})()

const PARTNER = { logoText: 'Northstar', accentColor: '#635BFF', cornerRadius: 28 }

const IDEATIONS = ['1', '2', '3', '4'].map((number) => ({
  key: `ideation-${number}`,
  label: `Ideation ${number}`,
  demoLabel: `Ideation ${number} Demo`,
  h2: 'Pay with Crypto',
  blurb: 'Embed a secure and fast SDK into your app to receive payment using USD₮, USDC, XAU₮ or Bitcoin with a wallet address and amount-ready QR. Pulse watches the address automatically.',
}))

const routeParts = (routeId) => {
  const [symbol, networkId] = String(routeId || '').split(':')
  return { symbol, networkId }
}

const validRoute = (routeId) => {
  const { symbol, networkId } = routeParts(routeId)
  return Boolean(ASSETS[symbol]?.networks.includes(networkId) && NETWORKS[networkId])
}

const routeData = (cs) => {
  if (!cs?.routeId || !validRoute(cs.routeId)) return null
  const { symbol, networkId } = routeParts(cs.routeId)
  return { symbol, networkId, asset: ASSETS[symbol], network: NETWORKS[networkId] }
}

const ceilDivide = (n, d) => (n + d - 1n) / d

function formatTokenUnits(units, precision) {
  if (!precision) return units.toString()
  const raw = units.toString().padStart(precision + 1, '0')
  const whole = raw.slice(0, -precision)
  const fraction = raw.slice(-precision).replace(/0+$/, '')
  return fraction ? `${whole}.${fraction}` : whole
}

function quoteData(cs) {
  const route = routeData(cs)
  if (!route) return null
  const effectiveRate = route.asset.rate * route.network.rateFactor
  const feeNgn = route.network.feeMinor / 100
  const factorScale = 1_000_000
  const factorUnits = Math.round(route.network.rateFactor * factorScale)
  const tokenScale = 10n ** BigInt(route.asset.precision)
  const numerator = (BigInt(ORDER.amountMinorUnits) + BigInt(route.network.feeMinor)) * BigInt(factorScale) * tokenScale
  const denominator = 100n * BigInt(route.asset.rate) * BigInt(factorUnits)
  const amount = formatTokenUnits(ceilDivide(numerator, denominator), route.asset.precision)
  return {
    amount,
    numericAmount: Number(amount),
    feeNgn,
    rateLabel: `₦${effectiveRate.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  }
}

const destinationData = (cs) => {
  const route = routeData(cs)
  if (!route) return DESTINATIONS.base
  return DESTINATIONS[route.networkId] || DESTINATIONS.base
}

const networkDescriptor = (name) => (/\bnetwork$/i.test(name) ? name : `${name} network`)

const formatClock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

const I = (paths, vb = '0 0 24 24') => (
  <svg viewBox={vb} aria-hidden="true">{paths}</svg>
)

const IconSearch = () => I(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>)

const IconClose = () => I(<path d="m7 7 10 10M17 7 7 17" />)

const IconBack = () => I(<path d="m15 18-6-6 6-6" />)

const IconChevron = () => I(<path d="m7 10 5 5 5-5" />)

const IconCheck = () => I(<path d="m6.5 12.5 3.5 3.5 7.5-8" />)

const IconCopy = () => I(<><rect x="8" y="8" width="10" height="10" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>)

const HELIUM_CURRENCY_ASSETS = {
  usdt: '/work/pulse/checkout-assets/usdt.svg',
  usdc: '/work/pulse/checkout-assets/usdc.svg',
  btc: '/work/pulse/checkout-assets/btc.svg',
  xaut: '/work/pulse/checkout-assets/xaut.svg',
  arbitrum: '/work/pulse/checkout-assets/arb.svg',
  base: '/work/pulse/checkout-assets/base.svg',
  celo: '/work/pulse/checkout-assets/celo.svg',
  ethereum: '/work/pulse/checkout-assets/eth.svg',
  optimism: '/work/pulse/checkout-assets/opt.svg',
  polygon: '/work/pulse/checkout-assets/pol.svg',
  plasma: '/work/pulse/checkout-assets/xpl.svg',
}

function HeliumCurrency({ name, size = 32 }) {
  const src = HELIUM_CURRENCY_ASSETS[name]
  if (!src) return null
  return <img className="pulse-currency" src={src} width={size} height={size} alt="" aria-hidden="true" draggable="false" />
}

function Coin({ id, size = 34 }) {
  return <HeliumCurrency name={id} size={size} />
}

function Net({ id, size = 24 }) {
  if (id === 'bitcoin') return <HeliumCurrency name="btc" size={size} />
  if (id === 'spark') {
    return <svg className="pulse-currency" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#FFB020" /><path d="m18.5 4-9 13h6L13.5 28l9-15h-6l2-9Z" fill="#fff" /></svg>
  }
  return <HeliumCurrency name={id} size={size} />
}

function PseudoQR({ seed = 'pulse', size = 132 }) {
  const N = 25
  const bits = []
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7)
  const finderOn = (r, c) => {
    let rr = r, cc = c
    if (c >= N - 7) cc = c - (N - 7)
    if (r >= N - 7) rr = r - (N - 7)
    const inRing = rr === 0 || rr === 6 || cc === 0 || cc === 6
    const inCore = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
    return inRing || inCore
  }
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (finder(r, c)) bits.push(finderOn(r, c) ? [r, c] : null)
    else {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5
      bits.push(((h >>> 0) % 1000) / 1000 > 0.52 ? [r, c] : null)
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} aria-hidden="true" style={{ display: 'block' }}>
      <rect width={N} height={N} fill="#fff" />
      {bits.filter(Boolean).map(([r, c], i) => (
        <rect key={i} x={c + 0.06} y={r + 0.06} width={0.88} height={0.88} rx={0.18} fill="#0d0f14" />
      ))}
    </svg>
  )
}

const CSS_POPUP = `
/* Figma-matched SDK popup ------------------------------------------------- */
.pulse-popup{--pop-blue:var(--sdk-accent,#1570EF);--pop-button:var(--sdk-button,#175CD3);--pop-button-hover:var(--sdk-button-hover,#1849A9);--pop-radius:var(--sdk-radius,16px);--pop-bg:#FFFFFF;--pop-bg-secondary:#F9FAFB;--pop-bg-tertiary:#F2F4F7;--pop-border:#D0D5DD;--pop-ink:#101828;--pop-muted:#475467;--pop-faint:#667085;--pop-line:#E4E7EC;--pop-soft:#F9FAFB;--pop-footer:#F2F4F7;--pop-ease:cubic-bezier(.32,.72,0,1);position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:20px;background:rgba(3,5,9,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;visibility:hidden;transition:opacity 220ms var(--pop-ease),visibility 220ms step-end;color:var(--pop-ink);font-family:var(--sdk-font,"Instrument Sans",system-ui,sans-serif);}
.pulse-popup.is-visible{opacity:1;visibility:visible;transition:opacity 220ms var(--pop-ease),visibility 0ms step-start;}
.pulse-popup.is-embedded{position:relative;inset:auto;z-index:2;width:100%;height:100%;padding:0;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;opacity:1;visibility:visible;}
.pulse-popup *{box-sizing:border-box;}
.pulse-popup button,.pulse-popup input{font-family:inherit;}
.pulse-popup button{cursor:pointer;-webkit-tap-highlight-color:transparent;}
.pulse-currency{display:block;flex:0 0 auto;max-width:none;object-fit:contain;user-select:none;}
.pulse-popup .sr-only{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
.pulse-popup :focus-visible{outline:3px solid color-mix(in srgb,var(--pop-blue) 28%,transparent);outline-offset:2px;}
.pulse-popup__shell{position:relative;width:min(var(--pulse-sdk-width),calc(100vw - 28px));height:min(var(--pulse-sdk-height),calc(100dvh - 28px));min-height:520px;display:flex;flex-direction:column;overflow:hidden;border:0;border-radius:var(--pop-radius);background:var(--pop-footer);box-shadow:inset 0 0 0 1px var(--pop-line),0 32px 100px rgba(0,0,0,.46),0 5px 18px rgba(0,0,0,.18);transform:translateY(14px) scale(.985);opacity:0;transition:transform 280ms var(--pop-ease),opacity 180ms ease-out;}
.pulse-popup.is-visible .pulse-popup__shell{transform:translateY(0) scale(1);opacity:1;}
.pulse-popup.is-embedded .pulse-popup__shell{width:100%;height:100%;min-height:0;transform:none;opacity:1;box-shadow:inset 0 0 0 1px var(--pop-line),0 34px 90px rgba(0,0,0,.42),0 4px 16px rgba(0,0,0,.18);}
.pulse-popup__modal{position:relative;z-index:1;display:flex;flex:1 1 auto;min-height:0;flex-direction:column;overflow:hidden;border-radius:max(0px,calc(var(--pop-radius) - 1px));background:var(--pop-bg);}
.pulse-popup__header{position:relative;flex:0 0 64px;height:64px;}
.pulse-popup__progress{position:absolute;top:16px;left:50%;display:flex;align-items:center;gap:4px;transform:translateX(-50%);}
.pulse-popup__header.is-progress-only .pulse-popup__progress{top:30px;transform:translate(-50%,-50%);}
.pulse-popup__progress-dot{display:block;width:6px;height:4px;border-radius:999px;background:#e4e7ec;transition:width 250ms var(--pop-ease),background-color 250ms var(--pop-ease);}
.pulse-popup__progress-dot.is-past{background:#98a2b3;}
.pulse-popup__progress-dot.is-active{width:28px;background:var(--pop-blue);}
.pulse-popup__context{position:absolute;top:28px;left:50%;max-width:230px;display:flex;align-items:center;gap:6px;transform:translateX(-50%);color:#344054;font-size:13px;font-weight:500;line-height:20px;white-space:nowrap;overflow:hidden;}
.pulse-popup__context img{width:18px;height:18px;flex:0 0 auto;object-fit:contain;}
.pulse-popup__context-name{max-width:92px;overflow:hidden;color:var(--pop-ink);font-weight:650;text-overflow:ellipsis;}
.pulse-popup__context-separator{color:var(--pop-faint);font-style:normal;}
.pulse-popup__icon{position:absolute;top:12px;width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:8px;background:transparent;color:#8fa0b7;transition:background-color 140ms var(--pop-ease),color 140ms var(--pop-ease),transform 140ms var(--pop-ease),opacity 180ms var(--pop-ease);}
.pulse-popup__icon svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__icon:active{transform:scale(.92);}
.pulse-popup__close{right:11px;}
.pulse-popup__back{left:11px;animation:pop-back-in 180ms var(--pop-ease) both;}
.pulse-popup__viewport{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;}
.pulse-popup__screen{position:absolute;inset:0;display:flex;min-height:0;flex-direction:column;background:var(--pop-bg);animation:pop-screen-forward 260ms var(--pop-ease) both;}
.pulse-popup__screen.is-back{animation-name:pop-screen-back;}
.pulse-popup__scroll{flex:1 1 auto;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;padding:8px 24px 22px;scrollbar-width:thin;scrollbar-color:#c7ced8 transparent;}
.pulse-popup__scroll::-webkit-scrollbar{width:4px;}
.pulse-popup__scroll::-webkit-scrollbar-track{background:transparent;}
.pulse-popup__scroll::-webkit-scrollbar-thumb{border-radius:999px;background:#c7ced8;}
.pulse-popup h2.pulse-popup__title{min-height:56px;display:grid;place-items:center;margin:0 0 16px;text-align:center;color:var(--pop-ink);font-size:25px;line-height:32px;font-weight:720;letter-spacing:-.035em;}
.pulse-popup__search{height:40px;display:flex;align-items:center;gap:9px;padding:0 13px;border:1px solid var(--pop-border);border-radius:clamp(0px,calc(var(--pop-radius) - 8px),8px);background:var(--pop-bg);color:var(--pop-faint);transition:border-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease);}
.pulse-popup__search:focus-within{border-color:var(--pop-blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--pop-blue) 12%,transparent);}
.pulse-popup__search>svg{width:19px;height:19px;flex:0 0 auto;fill:none;stroke:#91a2b8;stroke-width:1.6;stroke-linecap:round;}
.pulse-popup__search input{min-width:0;width:100%;border:0;outline:0;background:transparent;color:var(--pop-ink);font-size:14px;}
.pulse-popup .pulse-popup__search input:focus-visible{outline:0;}
.pulse-popup__search input::placeholder{color:#74839a;opacity:1;}
.pulse-popup__search-clear{width:28px;height:28px;flex:0 0 auto;display:grid;place-items:center;margin-right:-7px;border:0;border-radius:7px;background:transparent;color:#74839a;opacity:0;pointer-events:none;transform:scale(.84);transition:opacity 140ms var(--pop-ease),transform 160ms var(--pop-ease),background-color 140ms var(--pop-ease),color 140ms var(--pop-ease);}
.pulse-popup__search-clear svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__search.has-value .pulse-popup__search-clear{opacity:1;pointer-events:auto;transform:scale(1);}
.pulse-popup__search-clear:active{transform:scale(.88)!important;}
.pulse-popup__assets{display:grid;gap:8px;margin-top:16px;}
.pulse-popup__asset{overflow:hidden;border-radius:clamp(0px,calc(var(--pop-radius) - 8px),8px);background:var(--pop-bg);transition:background-color 160ms var(--pop-ease),padding 180ms var(--pop-ease);}
.pulse-popup__asset.is-open{padding-top:4px;background:var(--pop-bg-secondary);}
.pulse-popup__asset-row{width:100%;height:60px;display:grid;grid-template-columns:40px minmax(0,1fr) 20px;align-items:center;gap:12px;padding:8px;border:0;border-radius:8px;background:transparent;color:var(--pop-ink);text-align:left;}
.pulse-popup__asset.is-open .pulse-popup__asset-row{padding-inline:16px;}
.pulse-popup__asset-copy{display:flex;min-width:0;flex-direction:column;line-height:1;}
.pulse-popup__asset-copy strong{font-size:16px;font-weight:600;line-height:24px;letter-spacing:0;}
.pulse-popup__asset-copy small{margin-top:0;color:var(--pop-muted);font-size:14px;line-height:20px;}
.pulse-popup__chevron{width:20px;height:20px;display:grid;place-items:center;justify-self:end;transition:transform 220ms var(--pop-ease);}
.pulse-popup__chevron svg{width:20px;height:20px;fill:none;stroke:#52637b;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__asset.is-open .pulse-popup__chevron{transform:rotate(180deg);}
.pulse-popup__network-reveal{display:grid;grid-template-rows:0fr;opacity:0;visibility:hidden;transition:grid-template-rows 260ms var(--pop-ease),opacity 180ms ease-out,visibility 0s linear 260ms;}
.pulse-popup__asset.is-open .pulse-popup__network-reveal{grid-template-rows:1fr;opacity:1;visibility:visible;transition:grid-template-rows 260ms var(--pop-ease),opacity 180ms ease-out,visibility 0s;}
.pulse-popup__network-clip{overflow:hidden;}
.pulse-popup__networks{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 16px 12px;}
.pulse-popup__network{height:36px;display:grid;grid-template-columns:16px minmax(0,1fr) 16px;align-items:center;gap:6px;padding:8px 12px;border:.5px solid var(--pop-line);border-radius:999px;background:var(--pop-bg);color:var(--pop-ink);text-align:left;transition:border-color 140ms var(--pop-ease),background-color 140ms var(--pop-ease),transform 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease);}
.pulse-popup__network>span{overflow:hidden;font-size:14px;font-weight:600;line-height:20px;text-overflow:ellipsis;white-space:nowrap;}
.pulse-popup__networks.is-long-labels .pulse-popup__network{grid-template-columns:16px minmax(0,1fr) 16px;gap:4px;padding-inline:8px;}
.pulse-popup__networks.is-long-labels .pulse-popup__network>span{font-size:10.5px;}
.pulse-popup__radio{width:16px;height:16px;border:1px solid var(--pop-border);border-radius:50%;background:var(--pop-bg);box-shadow:none;transition:border-color 140ms var(--pop-ease),background-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease);}
.pulse-popup__network.is-selected{border-width:2px;border-color:var(--pop-blue);box-shadow:none;}
.pulse-popup__network.is-selected .pulse-popup__radio{border:5px solid var(--pop-button);background:#fff;box-shadow:none;}
.pulse-popup__empty{padding:24px 0;color:var(--pop-muted);font-size:13px;text-align:center;}
.pulse-popup__dock{position:relative;z-index:3;flex:0 0 auto;border-top:0;background:var(--pop-bg);box-shadow:0 -1px 1px rgba(16,24,40,.05);animation:pop-dock 260ms var(--pop-ease) both;}
.pulse-popup__amount-row{height:56px;display:flex;align-items:center;justify-content:space-between;padding:16px 24px;color:var(--pop-muted);font-size:14px;line-height:20px;}
.pulse-popup__amount-row strong{color:var(--pop-ink);font-family:var(--sdk-font,"Instrument Sans",system-ui,sans-serif);font-size:16px;font-weight:600;line-height:24px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1,"lnum" 1;}
.pulse-popup__dock-actions{height:64px;padding:0 24px 16px;}
.pulse-popup__primary{width:100%;height:48px;display:flex;align-items:center;justify-content:center;gap:9px;border:0;border-radius:8px;background:var(--pop-button);color:#fff;font-size:14px;font-weight:600;line-height:20px;letter-spacing:0;box-shadow:none;transition:transform 120ms var(--pop-ease),background-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease),opacity 140ms var(--pop-ease);}
.pulse-popup__dock--quote .pulse-popup__dock-actions,.pulse-popup__dock--payment .pulse-popup__dock-actions{height:80px;padding-bottom:24px;}
.pulse-popup__dock--quote .pulse-popup__primary,.pulse-popup__dock--payment .pulse-popup__primary,.pulse-popup__status-action .pulse-popup__primary{height:56px;border-radius:999px;font-size:16px;font-weight:600;line-height:24px;box-shadow:0 1px 2px rgba(16,24,40,.05),inset 0 0 0 1px rgba(16,24,40,.18),inset 0 -2px 0 rgba(16,24,40,.05);}
.pulse-popup__primary:active{transform:scale(.975);box-shadow:none;}
.pulse-popup__primary:disabled{cursor:default;opacity:.76;}
.pulse-popup__watch{background:#f4f7fb;color:#345173;border:1px solid #dce5f1;box-shadow:none;}
.pulse-popup__screen--payment .pulse-popup__scroll{padding-top:8px;}
.pulse-popup__payment-head{display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px 0 0;text-align:center;}
.pulse-popup__payment-head>span{display:block;color:var(--pop-muted);font-size:14px;line-height:20px;}
.pulse-popup__payment-summary{display:flex;flex-direction:column;align-items:center;gap:2px;}
.pulse-popup__payment-amount{display:flex;align-items:center;justify-content:center;gap:16px;color:var(--pop-ink);}
.pulse-popup__payment-amount-main{display:flex;align-items:center;gap:8px;}
.pulse-popup__payment-amount strong{font-size:24px;line-height:32px;font-weight:600;letter-spacing:0;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1,"lnum" 1;white-space:nowrap;}
.pulse-popup__token-avatar{--token-avatar-size:24px;position:relative;display:inline-block;flex:0 0 auto;width:var(--token-avatar-size);height:var(--token-avatar-size);border-radius:50%;}
.pulse-popup__token-avatar-coin{position:absolute;inset:0;overflow:hidden;border-radius:50%;}
.pulse-popup__token-avatar-coin.is-notched{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M16 0C24.8366 0 32 7.16344 32 16C32 16.8747 31.928 17.7327 31.793 18.5693C30.076 16.1101 27.2268 14.5 24 14.5C18.7533 14.5 14.5 18.7533 14.5 24C14.5 27.2268 16.1101 30.076 18.5693 31.793C17.7327 31.928 16.8747 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0Z' fill='%23fff'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M16 0C24.8366 0 32 7.16344 32 16C32 16.8747 31.928 17.7327 31.793 18.5693C30.076 16.1101 27.2268 14.5 24 14.5C18.7533 14.5 14.5 18.7533 14.5 24C14.5 27.2268 16.1101 30.076 18.5693 31.793C17.7327 31.928 16.8747 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0Z' fill='%23fff'/%3E%3C/svg%3E");-webkit-mask-size:100%;mask-size:100%;}
.pulse-popup__token-avatar-coin>*{width:100%!important;height:100%!important;}
.pulse-popup__token-avatar-network{position:absolute;right:0;bottom:0;width:50%;height:50%;overflow:hidden;border-radius:50%;}
.pulse-popup__token-avatar-network>*{width:100%!important;height:100%!important;}
.pulse-popup__copy-icon{width:32px;height:32px;display:grid;place-items:center;border:0;border-radius:8px;background:transparent;color:#52637b;transition:background-color 140ms var(--pop-ease),transform 140ms var(--pop-ease);}
.pulse-popup__copy-icon svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__copy-icon:active{transform:scale(.92);}
.pulse-popup__toast{position:absolute;top:32px;right:32px;left:32px;z-index:7;min-height:44px;display:flex;align-items:center;overflow:hidden;touch-action:pan-x;border-radius:6px;background:#0C111D;color:#F5F5F6;box-shadow:0 4px 8px -2px rgba(16,24,40,.1),0 2px 4px -2px rgba(16,24,40,.06);animation:pop-toast-in 300ms ease-in-out both;}
.pulse-popup__toast.is-dragging{animation:none;transform:translateY(var(--toast-drag-y,0));transition:none;}
.pulse-popup__toast.is-exiting{pointer-events:none;animation:pop-toast-out 700ms ease-in-out both;}
.pulse-popup__toast-message{min-width:0;flex:1 1 auto;padding:12px 16px;font-size:14px;font-weight:500;line-height:20px;letter-spacing:0;white-space:nowrap;}
.pulse-popup__toast-close{position:relative;width:56px;height:44px;display:grid;flex:0 0 auto;place-items:center;padding:0;border:0;background:transparent;color:inherit;transition:transform 120ms var(--pop-ease);}
.pulse-popup__toast-close::before{content:"";position:absolute;inset:6px 12px;border-radius:8px;background:transparent;transition:background-color 140ms var(--pop-ease);}
.pulse-popup__toast-close svg{position:relative;z-index:1;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__toast-close:active{transform:scale(.94);}
.pulse-popup__network-label{display:block;margin-top:0;color:#475467;font-size:14px;font-weight:600;line-height:20px;}
.pulse-popup__separator{height:1px;margin:24px 0;background:repeating-linear-gradient(90deg,#dde3eb 0 5px,transparent 5px 9px);}
.pulse-popup__pay-card{height:131px;display:grid;grid-template-columns:160px 105px;justify-content:space-between;padding:12px;border-radius:clamp(0px,calc(var(--pop-radius) - 10px),10px);background:var(--pop-bg-secondary);}
.pulse-popup__address{min-width:0;padding-left:4px;display:flex;flex-direction:column;}
.pulse-popup__address>span{color:#344054;font-size:14px;font-weight:500;line-height:20px;}
.pulse-popup__address code{margin-top:8px;color:#344054;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;font-weight:400;line-height:20px;overflow-wrap:anywhere;white-space:pre-line;}
.pulse-popup__address .pulse-popup__copy-icon{width:20px;height:20px;margin-top:auto;margin-left:0;}
.pulse-popup__address .pulse-popup__copy-icon svg{width:20px;height:20px;}
.pulse-popup__qr{position:relative;width:105px;height:107px;display:grid;place-items:center;overflow:hidden;background:#fff;}
.pulse-popup__qr>svg:first-child{width:105px!important;height:105px!important;}
.pulse-popup__qr-token{position:absolute;inset:50% auto auto 50%;display:grid;place-items:center;width:28px;height:28px;transform:translate(-50%,-50%);border:2px solid #fff;border-radius:50%;background:#fff;}
.pulse-popup__guard{margin-top:12px;padding:8px;border-radius:6px;background:#fffaeb;text-align:center;color:#b54708;font-size:12px;line-height:18px;}
.pulse-popup__guard strong{display:block;font-weight:720;}
.pulse-popup__guard span{display:block;}
.pulse-popup__guard time{color:inherit;font-variant-numeric:tabular-nums;}
.pulse-popup__dock--payment{box-shadow:none;}
.pulse-popup__status{height:100%;display:flex;align-items:center;flex-direction:column;padding:40px 24px 8px;text-align:center;}
.pulse-popup__status h2{width:100%;height:56px;display:grid;flex:0 0 56px;place-items:center;margin:0;color:var(--pop-ink);font-size:24px;line-height:32px;font-weight:600;letter-spacing:0;}
.pulse-popup__loading{width:179px;display:inline-flex;align-items:center;flex-direction:column;gap:24px;margin-top:24px;}
.pulse-popup__loading-art{position:relative;display:inline-flex;width:72px;height:72px;}
.pulse-popup__loading-dots{width:72px;height:72px;animation:pop-dots 1s steps(12) infinite;}
.pulse-popup__loading-dot{fill:var(--pop-blue);}
.pulse-popup__loading-label{width:179px;color:#344054;font-size:16px;font-weight:400;line-height:24px;text-align:center;white-space:normal;}
.pulse-popup__status--complete{justify-content:center;padding-top:16px;padding-bottom:24px;}
.pulse-popup__status--complete h2{height:auto;min-height:32px;flex:0 0 auto;margin-top:22px;}
.pulse-popup__status--complete p{max-width:280px;margin:12px 0 0;color:#425269;font-size:16px;line-height:24px;}
.pulse-popup__success{width:70px;height:70px;display:grid;place-items:center;border-radius:50%;background:#edf8f0;color:#2f8d4d;animation:pop-success 320ms var(--pop-ease) both;}
.pulse-popup__success svg{width:32px;height:32px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__status-action{margin-top:auto;width:100%;}
.pulse-popup__footer{position:relative;z-index:0;flex:0 0 26px;height:26px;display:flex;align-items:center;justify-content:center;gap:4px;padding:4px 0;border-radius:0 0 15px 15px;background:var(--pop-footer);color:var(--pop-muted);font-size:12px;line-height:18px;}
.pulse-popup__footer strong{display:inline-flex;align-items:center;gap:4px;color:#344054;font-weight:700;}
.pulse-popup__spinner{width:15px;height:15px;border:2px solid #b9c9dc;border-top-color:#345f94;border-radius:50%;animation:pop-spin 800ms linear infinite;}
.pulse-popup__cancel-screen{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:52px 24px 8px;background:#fff;text-align:center;animation:pop-screen-forward 260ms var(--pop-ease) both;}
.pulse-popup__cancel-screen.is-back{animation-name:pop-screen-back;}
.pulse-popup__cancel-icon{width:64px;height:64px;display:grid;place-items:center;color:#dc6803;}
.pulse-popup__cancel-icon svg{width:64px;height:64px;fill:none;stroke:currentColor;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;}
.pulse-popup__cancel-screen h2{margin:0;color:var(--pop-ink);font-size:24px;line-height:32px;font-weight:600;letter-spacing:0;}
.pulse-popup__cancel-screen p{max-width:295px;margin:0;color:#344054;font-size:16px;line-height:24px;}
.pulse-popup__cancel-dock{position:relative;z-index:4;flex:0 0 auto;display:grid;gap:12px;padding:0 24px 24px;border-top:0;background:#fff;box-shadow:0 -1px 1px rgba(16,24,40,.05);animation:pop-dock 220ms var(--pop-ease) both;}
.pulse-popup__cancel-button{width:100%;height:48px;border-radius:8px;font-size:14px;font-weight:680;transition:transform 120ms var(--pop-ease),background-color 140ms var(--pop-ease),border-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease);}
.pulse-popup__cancel-button:active{transform:scale(.975);}
.pulse-popup__cancel-button--yes{border:1px solid #b42318;background:#d92d20;color:#fff;box-shadow:0 1px 2px rgba(16,24,40,.08),inset 0 0 0 1px rgba(16,24,40,.08),inset 0 -2px 0 rgba(16,24,40,.06);}
.pulse-popup__cancel-button--no{border:1px solid #d0d5dd;background:#fff;color:#344054;box-shadow:0 1px 2px rgba(16,24,40,.05);}
.pulse-popup__cancel-dock .pulse-popup__cancel-button{border-radius:999px;font-weight:600;}
.pulse-popup__cancel-dock .pulse-popup__cancel-button--yes{border:0;font-size:16px;line-height:24px;}
.pulse-popup__cancel-dock .pulse-popup__cancel-button--no{font-size:14px;line-height:20px;}
.pulse-popup__cancel-confirm-layer{position:absolute;inset:0;z-index:8;animation:pop-confirm-layer-in 220ms var(--pop-ease) both;}
.pulse-popup__cancel-confirm-backdrop{position:absolute;inset:0;border:0;background:rgba(12,17,29,.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.pulse-popup__cancel-confirm{position:absolute;right:16px;bottom:16px;left:16px;height:328px;overflow:hidden;border-radius:16px;background:var(--pop-bg);box-shadow:0 20px 24px -4px rgba(16,24,40,.08),0 8px 8px -4px rgba(16,24,40,.03);animation:pop-confirm-sheet-in 280ms var(--pop-ease) both;transition:height 280ms var(--pop-ease);}
.pulse-popup__cancel-confirm.has-other{height:380px;}
.pulse-popup__cancel-confirm-header{position:relative;height:64px;}
.pulse-popup__cancel-confirm-header .pulse-popup__icon{top:12px;right:12px;width:40px;height:40px;border-radius:8px;}
.pulse-popup__cancel-confirm-content{display:flex;flex-direction:column;gap:24px;padding:0 24px 24px;}
.pulse-popup__cancel-confirm h2{margin:0;color:var(--pop-ink);font-size:18px;font-weight:600;line-height:28px;letter-spacing:0;text-align:center;}
.pulse-popup__cancel-reasons{display:flex;min-width:0;flex-direction:column;gap:12px;margin:0;padding:0;border:0;}
.pulse-popup__cancel-reason{position:relative;display:flex;min-width:0;align-items:flex-start;gap:8px;color:#344054;font-size:14px;font-weight:500;line-height:20px;cursor:pointer;transition:color 140ms var(--pop-ease),opacity 120ms var(--pop-ease);}
.pulse-popup__cancel-reason:active{opacity:.72;}
.pulse-popup__cancel-radio{position:relative;width:16px;height:16px;flex:0 0 16px;margin-top:2px;border:1px solid var(--pop-border);border-radius:50%;background:var(--pop-bg);transition:border-color 140ms var(--pop-ease),background-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease),transform 140ms var(--pop-ease);}
.pulse-popup__cancel-reason input:checked+.pulse-popup__cancel-radio{border:0;background:var(--pop-button);}
.pulse-popup__cancel-reason input:checked+.pulse-popup__cancel-radio::after{content:"";position:absolute;inset:5px;border-radius:50%;background:#fff;}
.pulse-popup__cancel-reason input:focus-visible+.pulse-popup__cancel-radio{box-shadow:0 0 0 3px color-mix(in srgb,var(--pop-blue) 24%,transparent);}
.pulse-popup__cancel-reason-copy{min-width:0;flex:1;}
.pulse-popup__cancel-other{width:100%;height:40px;margin:0;padding:9px 14px;border:1px solid var(--pop-border);border-radius:8px;outline:0;background:var(--pop-bg);color:var(--pop-ink);font-size:14px;font-weight:400;line-height:20px;animation:pop-cancel-other-in 220ms var(--pop-ease) both;transition:border-color 140ms var(--pop-ease),box-shadow 140ms var(--pop-ease);}
.pulse-popup__cancel-other::placeholder{color:#667085;opacity:1;}
.pulse-popup__cancel-other:focus{border-color:var(--pop-blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--pop-blue) 14%,transparent);}
.pulse-popup__cancel-confirm .pulse-popup__cancel-button{flex:0 0 auto;border-radius:999px;font-size:14px;font-weight:600;line-height:20px;}
.pulse-popup__cancel-confirm .pulse-popup__cancel-button--yes{border:0;}
@media(hover:hover){
  .pulse-popup__icon:hover,.pulse-popup__copy-icon:hover{background:#f1f4f8;color:#34445b;}
  .pulse-popup__search:hover{border-color:#c7d0dd;}
  .pulse-popup__search-clear:hover{background:#edf1f6;color:#34445b;}
  .pulse-popup__asset:not(.is-open):hover{background:#fafbfc;}
  .pulse-popup__asset-row:hover .pulse-popup__chevron{transform:translateY(2px);}
  .pulse-popup__asset.is-open .pulse-popup__asset-row:hover .pulse-popup__chevron{transform:rotate(180deg) translateY(-2px);}
  .pulse-popup__network:hover{background:#f9fbfd;border-color:#cbd5e3;transform:translateY(-1px);}
  .pulse-popup__network.is-selected:hover{border-color:var(--pop-blue);}
  .pulse-popup__primary:not(:disabled):hover{background:var(--pop-button-hover);box-shadow:none;}
  .pulse-popup__toast-close:hover::before{background:rgba(255,255,255,.14);}
  .pulse-popup__cancel-button--yes:hover{background:#b42318;box-shadow:0 4px 12px rgba(217,45,32,.2);}
  .pulse-popup__cancel-button--no:hover{background:#f9fafb;border-color:#b8c0cc;}
  .pulse-popup__cancel-reason:hover{color:var(--pop-ink);}
  .pulse-popup__cancel-reason:hover .pulse-popup__cancel-radio{border-color:#98a2b3;transform:scale(1.04);}
}

/* SDK standard Helium dark theme ----------------------------------------- */
.pp[data-theme="dark"] .pulse-popup{--pop-blue:var(--sdk-accent,#1570EF);--pop-button:var(--sdk-button,#175CD3);--pop-button-hover:var(--sdk-button-hover,#1849A9);--pop-bg:#0C111D;--pop-bg-secondary:#161B26;--pop-bg-tertiary:#1F242F;--pop-border:#333741;--pop-ink:#F5F5F6;--pop-muted:#94969C;--pop-faint:#85888E;--pop-line:#1F242F;--pop-soft:#161B26;--pop-footer:#1F242F;color-scheme:dark;}
.pp[data-theme="light"] .pulse-popup{color-scheme:light;background:rgba(20,24,32,.38);}
.pp[data-theme="light"] .pulse-popup.is-embedded,.pp[data-theme="dark"] .pulse-popup.is-embedded{background:transparent;}
.pp[data-theme="dark"] .pulse-popup__shell{background:var(--pop-footer);box-shadow:inset 0 0 0 1px var(--pop-line),0 32px 100px rgba(0,0,0,.58),0 5px 18px rgba(0,0,0,.28);}
.pp[data-theme="dark"] .pulse-popup.is-embedded .pulse-popup__shell{box-shadow:inset 0 0 0 1px var(--pop-line),0 34px 90px rgba(0,0,0,.52),0 4px 16px rgba(0,0,0,.24);}
.pp[data-theme="dark"] .pulse-popup__modal,
.pp[data-theme="dark"] .pulse-popup__screen,
.pp[data-theme="dark"] .pulse-popup__cancel-screen,
.pp[data-theme="dark"] .pulse-popup__cancel-dock{background:var(--pop-bg);}
.pp[data-theme="dark"] .pulse-popup__progress-dot{background:#333741;}
.pp[data-theme="dark"] .pulse-popup__progress-dot.is-past{background:#667085;}
.pp[data-theme="dark"] .pulse-popup__progress-dot.is-active{background:var(--pop-blue);}
.pp[data-theme="dark"] .pulse-popup__context{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__icon{color:var(--pop-faint);}
.pp[data-theme="dark"] .pulse-popup__search{border-color:var(--pop-border);background:var(--pop-bg);color:var(--pop-faint);}
.pp[data-theme="dark"] .pulse-popup__search:focus-within{border-color:var(--pop-blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--pop-blue) 18%,transparent);}
.pp[data-theme="dark"] .pulse-popup__search svg{stroke:var(--pop-faint);}
.pp[data-theme="dark"] .pulse-popup__search input{color:var(--pop-ink);}
.pp[data-theme="dark"] .pulse-popup__search input::placeholder{color:var(--pop-faint);}
.pp[data-theme="dark"] .pulse-popup__search-clear{color:var(--pop-faint);}
.pp[data-theme="dark"] .pulse-popup__scroll{scrollbar-color:#333741 transparent;}
.pp[data-theme="dark"] .pulse-popup__scroll::-webkit-scrollbar-thumb{background:#333741;}
.pp[data-theme="dark"] .pulse-popup__asset{background:var(--pop-bg);}
.pp[data-theme="dark"] .pulse-popup__asset.is-open{background:var(--pop-bg-secondary);}
.pp[data-theme="dark"] .pulse-popup__chevron svg{stroke:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__network{border-color:var(--pop-border);background:var(--pop-bg);color:var(--pop-ink);}
.pp[data-theme="dark"] .pulse-popup__radio{border-color:var(--pop-border);background:var(--pop-bg);}
.pp[data-theme="dark"] .pulse-popup__network.is-selected{border-color:var(--pop-blue);box-shadow:inset 0 0 0 1px var(--pop-blue);}
.pp[data-theme="dark"] .pulse-popup__network.is-selected .pulse-popup__radio{border:5px solid var(--pop-button);background:#fff;}
.pp[data-theme="dark"] .pulse-popup__dock{border-color:transparent;background:var(--pop-bg);box-shadow:0 -1px 1px rgba(0,0,0,.38);}
.pp[data-theme="dark"] .pulse-popup__dock--payment{box-shadow:none;}
.pp[data-theme="dark"] .pulse-popup__amount-row{color:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__primary{background:var(--pop-button);color:#fff;box-shadow:none;}
.pp[data-theme="dark"] .pulse-popup__watch{border-color:var(--pop-border);background:var(--pop-bg-secondary);color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__copy-icon{color:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__toast{background:var(--pop-bg-secondary);color:#F5F5F6;box-shadow:none;}
.pp[data-theme="dark"] .pulse-popup__network-label{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__separator{background:repeating-linear-gradient(90deg,#333741 0 5px,transparent 5px 9px);}
.pp[data-theme="dark"] .pulse-popup__pay-card{background:var(--pop-bg-secondary);}
.pp[data-theme="dark"] .pulse-popup__address>span{color:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__address code{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__guard{background:#2B2416;color:#F5B95F;}
.pp[data-theme="dark"] .pulse-popup__loading-label,
.pp[data-theme="dark"] .pulse-popup__status--complete p{color:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__success{background:#173322;color:#70D494;}
.pp[data-theme="dark"] .pulse-popup__footer{background:var(--pop-footer);color:var(--pop-muted);}
.pp[data-theme="dark"] .pulse-popup__footer strong{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__spinner{border-color:#333741;border-top-color:var(--pop-blue);}
.pp[data-theme="dark"] .pulse-popup__cancel-screen p{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__cancel-dock{border-color:transparent;box-shadow:none;}
.pp[data-theme="dark"] .pulse-popup__cancel-button--no{border-color:var(--pop-border);background:var(--pop-bg-secondary);color:#CECFD2;box-shadow:none;}
.pp[data-theme="dark"] .pulse-popup__cancel-confirm{background:var(--pop-bg);box-shadow:0 24px 48px -12px rgba(0,0,0,.58);}
.pp[data-theme="dark"] .pulse-popup__cancel-reason{color:#CECFD2;}
.pp[data-theme="dark"] .pulse-popup__cancel-radio{border-color:var(--pop-border);background:var(--pop-bg);}
.pp[data-theme="dark"] .pulse-popup__cancel-reason input:checked+.pulse-popup__cancel-radio{border:0;background:var(--pop-button);}
.pp[data-theme="dark"] .pulse-popup__cancel-other{border-color:var(--pop-border);background:var(--pop-bg);color:var(--pop-ink);}
.pp[data-theme="dark"] .pulse-popup__cancel-other::placeholder{color:var(--pop-faint);}
@media(hover:hover){
  .pp[data-theme="dark"] .pulse-popup__icon:hover,.pp[data-theme="dark"] .pulse-popup__copy-icon:hover{background:var(--pop-bg-tertiary);color:var(--pop-ink);}
  .pp[data-theme="dark"] .pulse-popup__search:hover{border-color:#475467;}
  .pp[data-theme="dark"] .pulse-popup__search-clear:hover{background:var(--pop-bg-tertiary);color:var(--pop-ink);}
  .pp[data-theme="dark"] .pulse-popup__asset:not(.is-open):hover{background:var(--pop-bg-secondary);}
  .pp[data-theme="dark"] .pulse-popup__network:hover{background:var(--pop-bg-secondary);border-color:#475467;}
  .pp[data-theme="dark"] .pulse-popup__primary:not(:disabled):hover{background:var(--pop-button-hover);box-shadow:none;}
  .pp[data-theme="dark"] .pulse-popup__toast-close:hover::before{background:rgba(255,255,255,.14);}
  .pp[data-theme="dark"] .pulse-popup__cancel-button--no:hover{background:var(--pop-bg-tertiary);border-color:#475467;}
}
@media(max-height:620px){.pulse-popup{padding:8px;}.pulse-popup__shell{height:calc(100dvh - 16px);min-height:0;}.pulse-popup h2.pulse-popup__title{min-height:48px;}}
@keyframes pop-screen-forward{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;}}
@keyframes pop-screen-back{from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:none;}}
@keyframes pop-confirm-layer-in{from{opacity:0;}to{opacity:1;}}
@keyframes pop-confirm-sheet-in{from{opacity:0;transform:translateY(18px) scale(.985);}to{opacity:1;transform:none;}}
@keyframes pop-cancel-other-in{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:none;}}
@keyframes pop-dock{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@keyframes pop-back-in{from{opacity:0;transform:translateX(5px);}to{opacity:1;transform:none;}}
@keyframes pop-spin{to{transform:rotate(360deg);}}
@keyframes pop-dots{to{transform:rotate(360deg);}}
@keyframes pop-success{from{opacity:0;transform:scale(.82);}to{opacity:1;transform:scale(1);}}
@keyframes pop-toast-in{from{opacity:0;transform:translateY(-12px);}to{opacity:1;transform:none;}}
@keyframes pop-toast-out{from{opacity:1;transform:none;}to{opacity:0;transform:translateY(-12px);}}
@media(prefers-reduced-motion:reduce){.pulse-popup *{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
`

const POPUP_INITIAL_FLOW = { screen: 'assets', selectedAsset: null, expandedAsset: null, routeId: null, quoteExpiresAt: null, runId: 0 }

const TOAST_ENTER_MS = 300

const TOAST_HOLD_MS = 3500

const TOAST_EXIT_MS = 700

function PopupCopy({ value, label, successMessage, onCopied }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    let didCopy = false
    try {
      await navigator.clipboard.writeText(value)
      didCopy = true
    } catch {
      const fallback = document.createElement('textarea')
      fallback.value = value
      fallback.setAttribute('readonly', '')
      fallback.style.position = 'fixed'
      fallback.style.opacity = '0'
      document.body.appendChild(fallback)
      fallback.select()
      try { didCopy = document.execCommand('copy') } catch { didCopy = false }
      fallback.remove()
    }
    if (!didCopy) return
    setCopied(true)
    onCopied?.(successMessage)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button className="pulse-popup__copy-icon" type="button" onClick={copy} aria-label={copied ? `${label} copied` : `Copy ${label}`}>
      {copied ? <IconCheck /> : <IconCopy />}
    </button>
  )
}

function HeliumToast({ toast, onDismiss }) {
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)

  // Preserve the maintained SDK's reset timing when a new toast replaces the old one.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    dragStart.current = null
    setDragY(0)
    setDragging(false)
  }, [toast?.id])
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!toast) return null

  const beginSwipe = (event) => {
    if (toast.exiting || event.target.closest('button')) return
    dragStart.current = { pointerId: event.pointerId, y: event.clientY }
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const moveSwipe = (event) => {
    if (!dragStart.current || dragStart.current.pointerId !== event.pointerId || toast.exiting) return
    setDragY(Math.max(-64, Math.min(0, event.clientY - dragStart.current.y)))
  }
  const endSwipe = (event) => {
    if (!dragStart.current || dragStart.current.pointerId !== event.pointerId) return
    const shouldDismiss = dragY < -40
    dragStart.current = null
    setDragging(false)
    setDragY(0)
    if (shouldDismiss) onDismiss()
  }
  const cancelSwipe = () => {
    dragStart.current = null
    setDragging(false)
    setDragY(0)
  }

  return (
    <div
      className={`pulse-popup__toast ${toast.exiting ? 'is-exiting' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={dragging ? { '--toast-drag-y': `${dragY}px` } : undefined}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      onPointerDown={beginSwipe}
      onPointerMove={moveSwipe}
      onPointerUp={endSwipe}
      onPointerCancel={cancelSwipe}
      onLostPointerCapture={cancelSwipe}
    >
      <span className="pulse-popup__toast-message">{toast.message}</span>
      <button className="pulse-popup__toast-close" type="button" onClick={onDismiss} disabled={toast.exiting} aria-label={`Dismiss ${toast.message.toLocaleLowerCase()} notification`}><IconClose /></button>
    </div>
  )
}

function HeliumWizardSteps({ current, total = 3 }) {
  const safeTotal = Math.max(1, Math.round(total))
  const step = Math.min(safeTotal, Math.max(1, Math.round(current)))
  return (
    <div className="pulse-popup__progress" role="status" aria-label={`Step ${step} of ${safeTotal}`}>
      {Array.from({ length: safeTotal }, (_, index) => (
        <span
          className={`pulse-popup__progress-dot ${index + 1 === step ? 'is-active' : index + 1 < step ? 'is-past' : ''}`}
          key={index}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function HeliumLoadingIndicator({ label }) {
  const size = 72
  const stroke = 9
  const radius = (size - stroke) / 2
  const center = size / 2
  return (
    <div className="pulse-popup__loading" role="status" aria-label={typeof label === 'string' ? label : 'Loading'}>
      <span className="pulse-popup__loading-art" aria-hidden="true">
        <svg className="pulse-popup__loading-dots" viewBox={`0 0 ${size} ${size}`} fill="none">
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180)
            return (
              <circle
                className="pulse-popup__loading-dot"
                key={index}
                cx={center + radius * Math.cos(angle)}
                cy={center + radius * Math.sin(angle)}
                r={stroke / 2}
                opacity={Math.max(.12, 1 - index * .08)}
              />
            )
          })}
        </svg>
      </span>
      <span className="pulse-popup__loading-label">{label}</span>
    </div>
  )
}

function HeliumAlert({ title, children }) {
  return (
    <div className="pulse-popup__guard" role="alert">
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  )
}

function HeliumTokenAvatar({ coin, network, size = 24 }) {
  return (
    <span className="pulse-popup__token-avatar" style={{ '--token-avatar-size': `${size}px` }} aria-hidden="true">
      <span className={`pulse-popup__token-avatar-coin ${network ? 'is-notched' : ''}`}>{coin}</span>
      {network && <span className="pulse-popup__token-avatar-network">{network}</span>}
    </span>
  )
}

function PopupHeader({ step, canGoBack, showContext = true, onBack, onClose, closeRef, partnerName, logoSrc }) {
  return (
    <header className={`pulse-popup__header ${showContext ? '' : 'is-progress-only'}`}>
      {canGoBack && <button className="pulse-popup__icon pulse-popup__back" type="button" onClick={onBack} aria-label="Back"><IconBack /></button>}
      <HeliumWizardSteps current={step + 1} total={3} />
      {showContext && (
        <span className="pulse-popup__context">
          {logoSrc ? <img src={logoSrc} alt="" /> : null}
          <span className="pulse-popup__context-name">{partnerName}</span>
          <i className="pulse-popup__context-separator" aria-hidden="true">·</i>
          <span>{ORDER.fiatAmount}</span>
        </span>
      )}
      <button ref={closeRef} className="pulse-popup__icon pulse-popup__close" type="button" onClick={onClose} aria-label="Close checkout"><IconClose /></button>
    </header>
  )
}

const CANCEL_REASONS = [
  "I don't have the crypto to pay",
  "I'm not comfortable sending crypto",
  "I'd rather pay another way",
  'Something else',
]

function PopupCancel({ onConfirm, onContinue, closeRef, continueRef, confirmRef, idPrefix }) {
  return (
    <>
      <header className="pulse-popup__header">
        <button ref={closeRef} className="pulse-popup__icon pulse-popup__close" type="button" onClick={onContinue} aria-label="Close cancellation and continue payment"><IconClose /></button>
      </header>
      <div className="pulse-popup__viewport">
        <section className="pulse-popup__cancel-screen" aria-labelledby={`${idPrefix}-cancel-title`} aria-describedby={`${idPrefix}-cancel-description`}>
          <span className="pulse-popup__cancel-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="25" /><path d="M32 18.5v18M32 45h.01" /></svg>
          </span>
          <h2 id={`${idPrefix}-cancel-title`}>Cancel payment?</h2>
          <p id={`${idPrefix}-cancel-description`}>Your payment of {ORDER.fiatAmount} with crypto will not be processed</p>
        </section>
      </div>
      <div className="pulse-popup__cancel-dock">
        <button ref={confirmRef} className="pulse-popup__cancel-button pulse-popup__cancel-button--yes" type="button" onClick={onConfirm}>Yes, cancel</button>
        <button ref={continueRef} className="pulse-popup__cancel-button pulse-popup__cancel-button--no" type="button" onClick={onContinue}>No, continue</button>
      </div>
    </>
  )
}

function PopupCancelConfirmation({ reason, otherReason, onReasonChange, onOtherReasonChange, onBack, onConfirm, closeRef, otherRef, idPrefix }) {
  const showOther = reason === 'Something else'

  return (
    <div className="pulse-popup__cancel-confirm-layer">
      <div className="pulse-popup__cancel-confirm-backdrop" onMouseDown={onBack} aria-hidden="true" />
      <section className={`pulse-popup__cancel-confirm ${showOther ? 'has-other' : ''}`} role="dialog" aria-modal="true" aria-labelledby={`${idPrefix}-cancel-reason-title`} onMouseDown={(event) => event.stopPropagation()}>
        <header className="pulse-popup__cancel-confirm-header">
          <button ref={closeRef} className="pulse-popup__icon pulse-popup__close" type="button" onClick={onBack} aria-label="Close cancellation confirmation"><IconClose /></button>
        </header>
        <div className="pulse-popup__cancel-confirm-content">
          <h2 id={`${idPrefix}-cancel-reason-title`}>Mind telling us why?</h2>
          <fieldset className="pulse-popup__cancel-reasons">
            <legend className="sr-only">Reason for cancelling</legend>
            {CANCEL_REASONS.map((option) => (
              <label className="pulse-popup__cancel-reason" key={option}>
                <input className="sr-only" type="radio" name={`${idPrefix}-cancel-reason`} value={option} checked={reason === option} onChange={() => onReasonChange(option)} />
                <span className="pulse-popup__cancel-radio" aria-hidden="true" />
                <span className="pulse-popup__cancel-reason-copy">{option}</span>
              </label>
            ))}
            {showOther && <input ref={otherRef} className="pulse-popup__cancel-other" value={otherReason} onChange={(event) => onOtherReasonChange(event.target.value)} placeholder="Help us understand" aria-label="Other reason for cancelling" />}
          </fieldset>
          <button className="pulse-popup__cancel-button pulse-popup__cancel-button--yes" type="button" onClick={onConfirm}>Confirm cancellation</button>
        </div>
      </section>
    </div>
  )
}

function PopupStatus({ screen, amountLabel, onClose }) {
  const data = {
    detected: { title: 'Payment detected', body: `${amountLabel} arrived and is confirming...` },
    confirming: { title: 'Confirming payment', body: `${amountLabel} arrived and is confirming...` },
    screening: { title: 'Screening payment', body: `${amountLabel} is confirmed and completing security checks...` },
  }

  if (screen === 'complete') {
    return (
      <section className="pulse-popup__status pulse-popup__status--complete" aria-live="polite">
        <span className="pulse-popup__success"><IconCheck /></span>
        <h2>Payment complete</h2>
        <p>Your payment is complete. You can close this checkout.</p>
        <div className="pulse-popup__status-action"><button className="pulse-popup__primary" type="button" onClick={onClose}>Close</button></div>
      </section>
    )
  }

  const current = data[screen] || data.detected
  return (
    <section className="pulse-popup__status" aria-live="polite">
      <h2>{current.title}</h2>
      <HeliumLoadingIndicator label={current.body} />
    </section>
  )
}

function searchAssetsAndNetworks(rawQuery) {
  const query = rawQuery.trim().toLocaleLowerCase()
  const isNetworkQuery = query && Object.values(NETWORKS).some((network) => network.name.toLocaleLowerCase().includes(query))

  return Object.entries(ASSETS).flatMap(([symbol, asset]) => {
    if (!query) return [{ symbol, asset, networkIds: asset.networks }]

    const assetMatches = `${symbol} ${displaySymbol(symbol)} ${asset.name}`.toLocaleLowerCase().includes(query)
    const matchingNetworks = asset.networks.filter((networkId) => NETWORKS[networkId].name.toLocaleLowerCase().includes(query))
    if (isNetworkQuery) return matchingNetworks.length ? [{ symbol, asset, networkIds: matchingNetworks }] : []
    if (!assetMatches) return []

    return [{ symbol, asset, networkIds: asset.networks }]
  })
}

function DemoPopup({ open, concept, onClose, embedded = false, partnerName = PARTNER.logoText, logoSrc = '' }) {
  const popupId = useId().replace(/:/g, '')
  const active = embedded || open
  const [mounted, setMounted] = useState(active)
  const [visible, setVisible] = useState(false)
  const [flow, setFlow] = useState(POPUP_INITIAL_FLOW)
  const [query, setQuery] = useState('')
  const [direction, setDirection] = useState('forward')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelStep, setCancelStep] = useState('prompt')
  const [cancelReason, setCancelReason] = useState('')
  const [cancelOtherReason, setCancelOtherReason] = useState('')
  const [now, setNow] = useState(() => Date.now())
  const [toast, setToast] = useState(null)
  const closeRef = useRef(null)
  const searchRef = useRef(null)
  const continueRef = useRef(null)
  const cancelConfirmRef = useRef(null)
  const cancelReasonCloseRef = useRef(null)
  const cancelOtherRef = useRef(null)
  const cancelOpenRef = useRef(cancelOpen)
  const cancelStepRef = useRef(cancelStep)
  const flowScreenRef = useRef(flow.screen)
  const shellRef = useRef(null)
  const exitTimer = useRef(null)
  const toastIdRef = useRef(0)
  const toastHideTimer = useRef(null)
  const toastRemoveTimer = useRef(null)
  useLayoutEffect(() => {
    cancelOpenRef.current = cancelOpen
    cancelStepRef.current = cancelStep
    flowScreenRef.current = flow.screen
  }, [cancelOpen, cancelStep, flow.screen])

  const clearToastTimers = useCallback(() => {
    clearTimeout(toastHideTimer.current)
    clearTimeout(toastRemoveTimer.current)
  }, [])

  const dismissToast = useCallback(() => {
    clearTimeout(toastHideTimer.current)
    clearTimeout(toastRemoveTimer.current)
    setToast((current) => current ? { ...current, exiting: true } : current)
    toastRemoveTimer.current = setTimeout(() => setToast(null), TOAST_EXIT_MS)
  }, [])

  const showToast = useCallback((message) => {
    if (!message) return
    clearToastTimers()
    const id = ++toastIdRef.current
    setToast({ id, message, exiting: false })
    toastHideTimer.current = setTimeout(() => {
      setToast((current) => current?.id === id ? { ...current, exiting: true } : current)
      toastRemoveTimer.current = setTimeout(() => {
        setToast((current) => current?.id === id ? null : current)
      }, TOAST_EXIT_MS)
    }, TOAST_ENTER_MS + TOAST_HOLD_MS)
  }, [clearToastTimers])

  const route = flow.routeId ? routeData(flow) : null
  const q = route ? quoteData(flow) : null
  const amountLabel = route && q ? `${q.amount} ${displaySymbol(route.symbol)}` : ''
  const dockAmountLabel = route && q
    ? `${q.numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: route.symbol === 'BTC' ? 8 : 2 })} ${displaySymbol(route.symbol)}`
    : ''
  const progressStep = flow.screen === 'assets' ? 0 : flow.screen === 'payment' || flow.screen === 'expired' ? 1 : 2
  const canGoBack = false

  useEffect(() => clearToastTimers, [clearToastTimers])

  /* eslint-disable react-hooks/set-state-in-effect -- Retain the upstream activation and toast reset timing. */
  useEffect(() => {
    clearTimeout(exitTimer.current)
    clearToastTimers()
    setToast(null)
    let frame = 0
    if (active) {
      setMounted(true)
      setFlow(POPUP_INITIAL_FLOW)
      setQuery('')
      setDirection('forward')
      setCancelOpen(false)
      setCancelStep('prompt')
      setCancelReason('')
      setCancelOtherReason('')
      if (embedded) setVisible(true)
      else frame = requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      exitTimer.current = setTimeout(() => setMounted(false), 230)
    }
    return () => { cancelAnimationFrame(frame); clearTimeout(exitTimer.current) }
  }, [active, concept, embedded, clearToastTimers])

  useEffect(() => {
    if (flow.screen === 'payment' || flow.screen === 'expired') return
    clearToastTimers()
    setToast(null)
  }, [flow.screen, clearToastTimers])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!active || embedded) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const pageRoot = shellRef.current?.closest('.pp')
    const background = pageRoot ? Array.from(pageRoot.children).filter((node) => node !== shellRef.current?.closest('.pulse-popup') && node.tagName !== 'STYLE') : []
    const alreadyInert = background.map((node) => node.hasAttribute('inert'))
    const previousAriaHidden = background.map((node) => node.getAttribute('aria-hidden'))
    document.body.style.overflow = 'hidden'
    background.forEach((node) => { node.setAttribute('inert', ''); node.setAttribute('aria-hidden', 'true') })
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (cancelOpenRef.current && cancelStepRef.current === 'reason') {
          setCancelStep('prompt')
          requestAnimationFrame(() => cancelConfirmRef.current?.focus())
        }
        else if (cancelOpenRef.current) { setDirection('back'); setCancelOpen(false) }
        else if (flowScreenRef.current === 'complete') onClose()
        else { setDirection('forward'); setCancelOpen(true) }
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(shellRef.current?.querySelectorAll('button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])') || []).filter((element) => !element.closest('[inert]'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      background.forEach((node, index) => {
        if (!alreadyInert[index]) node.removeAttribute('inert')
        if (previousAriaHidden[index] == null) node.removeAttribute('aria-hidden')
        else node.setAttribute('aria-hidden', previousAriaHidden[index])
      })
      previousFocus?.focus?.()
    }
  }, [active, embedded, onClose])

  useEffect(() => {
    if (!active || !flow.runId || cancelOpen) return undefined
    const next = {
      confirming: [2200, 'detected'],
      detected: [2100, 'screening'],
      screening: [2100, 'complete'],
    }[flow.screen]
    if (!next) return undefined
    const [delay, screen] = next
    const timer = setTimeout(() => {
      setDirection('forward')
      setFlow((current) => current.runId === flow.runId ? { ...current, screen } : current)
    }, delay)
    return () => clearTimeout(timer)
  }, [active, cancelOpen, flow.runId, flow.screen])

  useEffect(() => {
    if (!active || cancelOpen || !flow.quoteExpiresAt || !['payment', 'expired'].includes(flow.screen)) return undefined
    const tick = () => {
      const next = Date.now()
      setNow(next)
      if (next >= flow.quoteExpiresAt) setFlow((current) => ({ ...current, screen: 'expired', runId: 0 }))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [active, cancelOpen, flow.quoteExpiresAt, flow.screen])

  useEffect(() => {
    if (!active || !cancelOpen) return undefined
    const frame = requestAnimationFrame(() => (cancelStep === 'reason' ? cancelReasonCloseRef.current : continueRef.current)?.focus())
    return () => cancelAnimationFrame(frame)
  }, [active, cancelOpen, cancelStep])

  if (!mounted) return null

  const selectAsset = (symbol) => {
    setFlow((current) => {
      const opening = current.expandedAsset !== symbol
      const keepRoute = routeParts(current.routeId).symbol === symbol
      return { ...current, selectedAsset: symbol, expandedAsset: opening ? symbol : null, routeId: keepRoute ? current.routeId : null }
    })
  }

  const selectRoute = (routeId) => {
    const { symbol } = routeParts(routeId)
    setFlow((current) => ({ ...current, selectedAsset: symbol, expandedAsset: symbol, routeId }))
  }

  const continueToPayment = () => {
    if (!route) return
    setDirection('forward')
    setNow(Date.now())
    setFlow((current) => ({ ...current, screen: 'payment', quoteExpiresAt: Date.now() + ORDER.quoteTtlSeconds * 1000, runId: 0 }))
  }

  const markPaymentSent = () => {
    setDirection('forward')
    setFlow((current) => ({ ...current, screen: 'confirming', quoteExpiresAt: null, runId: current.runId + 1 }))
  }

  const backToAssets = () => {
    setDirection('back')
    setFlow((current) => ({ ...current, screen: 'assets', quoteExpiresAt: null, runId: 0 }))
  }

  const restartQuote = () => {
    setDirection('back')
    setFlow((current) => ({ ...current, screen: 'assets', quoteExpiresAt: null, runId: 0 }))
  }

  const endDemo = () => {
    if (onClose) { onClose(); return }
    setFlow(POPUP_INITIAL_FLOW)
    setQuery('')
    setDirection('back')
    setCancelOpen(false)
    setCancelStep('prompt')
    setCancelReason('')
    setCancelOtherReason('')
  }

  const requestCancel = () => {
    if (flow.screen === 'complete') { endDemo(); return }
    setDirection('forward')
    setCancelStep('prompt')
    setCancelReason('')
    setCancelOtherReason('')
    setCancelOpen(true)
  }

  const continuePayment = () => {
    setDirection('back')
    setCancelOpen(false)
    setCancelStep('prompt')
    requestAnimationFrame(() => closeRef.current?.focus())
  }

  const clearSearch = () => {
    setQuery('')
    requestAnimationFrame(() => searchRef.current?.focus())
  }

  const confirmCancel = () => {
    setCancelStep('reason')
  }

  const closeCancelConfirmation = () => {
    setCancelStep('prompt')
    requestAnimationFrame(() => cancelConfirmRef.current?.focus())
  }

  const chooseCancelReason = (reason) => {
    setCancelReason(reason)
    if (reason !== 'Something else') setCancelOtherReason('')
    else requestAnimationFrame(() => cancelOtherRef.current?.focus())
  }

  const finishCancellation = () => {
    setCancelOpen(false)
    setCancelStep('prompt')
    endDemo()
  }

  const secondsLeft = flow.quoteExpiresAt ? Math.max(0, Math.ceil((flow.quoteExpiresAt - now) / 1000)) : ORDER.quoteTtlSeconds
  const searchResults = searchAssetsAndNetworks(query)
  const searching = Boolean(query.trim())

  let screenBody = null
  let dock = null

  if (flow.screen === 'assets') {
    screenBody = (
      <section className={`pulse-popup__screen ${direction === 'back' ? 'is-back' : ''}`} key="assets">
        <div className="pulse-popup__scroll">
          <h2 className="pulse-popup__title">Choose asset</h2>
          <div className={`pulse-popup__search ${query ? 'has-value' : ''}`}>
            <IconSearch />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape' && query) { event.preventDefault(); event.stopPropagation(); clearSearch() } }} aria-label="Search crypto or network" placeholder="Search crypto or network" />
            <button className="pulse-popup__search-clear" type="button" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch} aria-label="Clear search" aria-hidden={!query} tabIndex={query ? 0 : -1}><IconClose /></button>
          </div>
          <div className="pulse-popup__assets">
            {searchResults.map(({ symbol, asset, networkIds }) => {
              const expanded = searching || flow.expandedAsset === symbol
              return (
                <article className={`pulse-popup__asset ${expanded ? 'is-open' : ''}`} key={symbol}>
                  <button className="pulse-popup__asset-row" type="button" onClick={() => { if (searching) setQuery(''); selectAsset(symbol) }} aria-expanded={expanded}>
                    <Coin id={asset.icon} size={40} />
                    <span className="pulse-popup__asset-copy"><strong>{displaySymbol(symbol)}</strong><small>{expanded ? 'Select a network' : asset.name}</small></span>
                    <span className="pulse-popup__chevron"><IconChevron /></span>
                  </button>
                  <div className="pulse-popup__network-reveal" aria-hidden={!expanded} inert={expanded ? undefined : true}>
                    <div className="pulse-popup__network-clip">
                      <div className={`pulse-popup__networks ${symbol === 'BTC' ? 'is-long-labels' : ''}`} role="group" aria-label={`Choose a network for ${displaySymbol(symbol)}`}>
                        {networkIds.map((networkId) => {
                          const id = `${symbol}:${networkId}`
                          const selected = flow.routeId === id
                          return (
                            <button className={`pulse-popup__network ${selected ? 'is-selected' : ''}`} key={id} type="button" onClick={() => selectRoute(id)} aria-pressed={selected}>
                              <Net id={NETWORKS[networkId].icon} size={16} /><span>{NETWORKS[networkId].name}</span><i className="pulse-popup__radio" />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
            {!searchResults.length && <p className="pulse-popup__empty">No enabled asset or network matches that search.</p>}
          </div>
        </div>
      </section>
    )
    if (route && q) {
      dock = (
        <div className="pulse-popup__dock pulse-popup__dock--quote" key={flow.routeId}>
          <div className="pulse-popup__amount-row"><span>Amount</span><strong>{dockAmountLabel}</strong></div>
          <div className="pulse-popup__dock-actions"><button className="pulse-popup__primary" type="button" onClick={continueToPayment}>Continue with {displaySymbol(route.symbol)} on {route.network.name}</button></div>
        </div>
      )
    }
  } else if (flow.screen === 'payment' || flow.screen === 'expired') {
    const dest = destinationData(flow)
    const addressPreview = `${dest.address.slice(0, 18)}\n${dest.address.slice(18, 24)}…${dest.address.slice(-6)}`
    screenBody = (
      <section className={`pulse-popup__screen pulse-popup__screen--payment ${direction === 'back' ? 'is-back' : ''}`} key={flow.screen}>
        <div className="pulse-popup__scroll">
          <div className="pulse-popup__payment-head">
            <span>Send exactly</span>
            <div className="pulse-popup__payment-summary">
              <div className="pulse-popup__payment-amount"><span className="pulse-popup__payment-amount-main"><HeliumTokenAvatar coin={<Coin id={route.asset.icon} size={24} />} network={<Net id={route.network.icon} size={12} />} /><strong>{amountLabel}</strong></span><PopupCopy value={q.amount} label="amount" successMessage="Amount copied" onCopied={showToast} /></div>
              <b className="pulse-popup__network-label">{networkDescriptor(route.network.name)}</b>
            </div>
          </div>
          <div className="pulse-popup__separator" />
          <div className="pulse-popup__pay-card">
            <div className="pulse-popup__address"><span>Address</span><code>{addressPreview}</code><PopupCopy value={dest.address} label="wallet address" successMessage="Wallet address copied" onCopied={showToast} /></div>
            <div className="pulse-popup__qr"><PseudoQR seed={`${dest.address}:${q.amount}`} size={105} /><span className="pulse-popup__qr-token"><HeliumTokenAvatar coin={<Coin id={route.asset.icon} size={24} />} network={<Net id={route.network.icon} size={12} />} size={24} /></span></div>
          </div>
          <HeliumAlert title={`Only send ${displaySymbol(route.symbol)} on ${route.network.name} to address`}>Valid for this payment only. Expires in <time>{formatClock(secondsLeft)}</time></HeliumAlert>
        </div>
      </section>
    )
    dock = flow.screen === 'expired'
      ? <div className="pulse-popup__dock"><div className="pulse-popup__dock-actions"><button className="pulse-popup__primary" type="button" onClick={restartQuote}>Create a new quote</button></div></div>
      : <div className="pulse-popup__dock pulse-popup__dock--payment"><div className="pulse-popup__dock-actions"><button className="pulse-popup__primary" type="button" onClick={markPaymentSent}>I have made payment</button></div></div>
  } else {
    screenBody = (
      <section className="pulse-popup__screen" key={flow.screen}>
        <PopupStatus screen={flow.screen} amountLabel={dockAmountLabel} networkName={route.network.name} onClose={endDemo} />
      </section>
    )
  }

  return (
    <div className={`pulse-popup ${visible ? 'is-visible' : ''} ${embedded ? 'is-embedded' : ''}`} onMouseDown={(event) => {
      if (embedded || event.target !== event.currentTarget) return
      if (!cancelOpen) requestCancel()
      else if (cancelStep === 'reason') closeCancelConfirmation()
      else continuePayment()
    }} aria-hidden={!visible}>
      <section className="pulse-popup__shell" ref={shellRef} role={embedded ? 'region' : 'dialog'} aria-modal={embedded ? undefined : true} aria-label={IDEATIONS.find((item) => item.key === concept)?.demoLabel || 'Pulse demo'}>
        <div className="pulse-popup__modal" inert={cancelStep === 'reason' ? true : undefined} aria-hidden={cancelStep === 'reason' || undefined}>
          {cancelOpen ? (
            <PopupCancel onConfirm={confirmCancel} onContinue={continuePayment} closeRef={closeRef} continueRef={continueRef} confirmRef={cancelConfirmRef} idPrefix={popupId} />
          ) : (
            <>
              <PopupHeader step={progressStep} canGoBack={canGoBack} showContext={flow.screen === 'assets'} onBack={backToAssets} onClose={requestCancel} closeRef={closeRef} partnerName={partnerName} logoSrc={logoSrc} />
              <div className="pulse-popup__viewport">{screenBody}</div>
              {dock}
            </>
          )}
        </div>
        <footer className="pulse-popup__footer">Powered by <strong><PulseLogo height={10} /></strong></footer>
        <HeliumToast toast={toast} onDismiss={dismissToast} />
        {cancelOpen && cancelStep === 'reason' && (
          <PopupCancelConfirmation reason={cancelReason} otherReason={cancelOtherReason} onReasonChange={chooseCancelReason} onOtherReasonChange={setCancelOtherReason} onBack={closeCancelConfirmation} onConfirm={finishCancellation} closeRef={cancelReasonCloseRef} otherRef={cancelOtherRef} idPrefix={popupId} />
        )}
      </section>
    </div>
  )
}

const CSS_EMBEDDED_PREVIEW = `
.pulse-sdk-preview.pp{
  --pulse-sdk-standard-width:380px;
  --pulse-sdk-standard-height:600px;
  --pulse-sdk-legacy-width:344px;
  --pulse-sdk-legacy-height:566px;
  --pulse-sdk-width:var(--pulse-sdk-standard-width);
  --pulse-sdk-height:var(--pulse-sdk-standard-height);
  position:relative;
  width:min(100%,var(--pulse-sdk-width));
  height:min(var(--pulse-sdk-height),var(--pulse-sdk-available-height,var(--pulse-sdk-height)));
  min-height:0;
  color-scheme:light;
  background:transparent;
  font-family:"Instrument Sans",system-ui,sans-serif;
}
.pulse-sdk-preview.pp[data-sdk-size="legacy"]{
  --pulse-sdk-width:var(--pulse-sdk-legacy-width);
  --pulse-sdk-height:var(--pulse-sdk-legacy-height);
}
.pulse-sdk-preview.pp[data-theme="dark"]{color-scheme:dark;}
`

export function PulseCheckoutPreview({
  onClose,
  theme = 'light',
  accent = '#1570EF',
  radius = 16,
  typeface = 'Instrument Sans',
  partnerName = 'PiggyVest',
  logoSrc = '',
  sdkSizePreset = 'standard',
} = {}) {
  const resolvedSdkSize = resolveSdkSizePreset(sdkSizePreset)
  const fontStacks = {
    'Instrument Sans': '"Instrument Sans",system-ui,sans-serif',
    'System UI': 'system-ui,-apple-system,"Segoe UI",sans-serif',
    Georgia: 'Georgia,"Times New Roman",serif',
  }
  const previewStyle = {
    '--sdk-accent': accent,
    '--sdk-button': accent,
    '--sdk-button-hover': 'color-mix(in srgb,var(--sdk-accent) 82%,black)',
    '--sdk-radius': `${Math.max(0, Math.min(24, Number(radius) || 0))}px`,
    '--sdk-font': fontStacks[typeface] || fontStacks['Instrument Sans'],
  }

  return (
    <div
      className="pp pulse-sdk-preview"
      data-theme={theme}
      data-sdk-size={resolvedSdkSize}
      style={previewStyle}
    >
      <style>{CSS_POPUP + CSS_EMBEDDED_PREVIEW}</style>
      <DemoPopup embedded open concept={IDEATIONS[0].key} onClose={onClose} partnerName={partnerName} logoSrc={logoSrc} />
    </div>
  )
}
