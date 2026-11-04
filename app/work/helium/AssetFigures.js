import Image from 'next/image'
import styles from './helium.module.css'

// Coin and pair art copied unchanged from Helium's packages/react/src/components/Currency/assets/.
const src = (name) => `/work/helium/tokens/${name}.svg`

// TokenAvatar ported from Helium's TokenAvatar/TokenAvatar.module.css: same mask, 50% badge and position.
function TokenAvatar({ coin, network, size }) {
  return (
    <span className={styles.tokenAvatar} style={{ '--token-avatar-size': `${size}px` }} aria-hidden="true">
      <span className={`${styles.tokenCoin} ${network ? styles.tokenNotched : ''}`}><Image src={src(coin)} alt="" width={size} height={size} /></span>
      {network && <span className={styles.tokenNetwork}><Image src={src(network)} alt="" width={size / 2} height={size / 2} /></span>}
    </span>
  )
}

const assets = [
  ['USD₮ on Optimism', 'usdt', 'opt'],
  ['USDC on Base', 'usdc', 'base'],
  ['ETH on Arbitrum', 'eth', 'arb'],
  ['BTC', 'btc'],
]

// Each pair file draws the starting currency in the top-left half (“From”) and the target in the bottom-right (“To”).
const pairs = [
  ['GBP → USDC', 'gbp-to-usdc'],
  ['USD₮ → NGN', 'usdt-to-ngn'],
  ['EUR → GBP', 'eur-to-gbp'],
  ['USDC → USD₮', 'usdc-to-usdt'],
]

export function TokenAvatarFigure() {
  return (
    <figure className={styles.figure} data-figure="token-avatars">
      <ul className={styles.tokenRow}>
        {assets.map(([label, coin, network]) => (
          <li key={label}><TokenAvatar coin={coin} network={network} size={48} /><span>{label}</span></li>
        ))}
      </ul>
      <ul className={styles.tokenRow}>
        {[20, 32, 48, 64].map((size) => (
          <li key={size}><TokenAvatar coin="usdt" network="opt" size={size} /><span>{size}px</span></li>
        ))}
      </ul>
      <figcaption>TokenAvatar: USD₮ on Optimism, USDC on Base, ETH on Arbitrum, and BTC on its own. The badge, the cut-out and the gap scale together at every size.</figcaption>
    </figure>
  )
}

export function ConversionPairFigure() {
  return (
    <figure className={styles.figure} data-figure="conversion-pairs">
      <ul className={styles.tokenRow}>
        {pairs.map(([label, name]) => (
          <li key={name}><Image src={src(name)} alt="" width={48} height={48} aria-hidden="true" /><span>{label}</span></li>
        ))}
      </ul>
      <figcaption>Conversion pairs, read from the currency you start with to the one you end up with. The diagonal split keeps a conversion from ever looking like an asset on a network.</figcaption>
    </figure>
  )
}
