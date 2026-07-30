export const metadata = {
  title: 'Pulse: Embedded Crypto Payments',
  description:
    'Removing a design-to-engineering bottleneck to deliver a working proof of concept in five days.',
  openGraph: {
    title: 'Pulse: Embedded Crypto Payments',
    description:
      'A product design and front-end development case study spanning embedded checkout, partner operations, and developer integration.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/pulse',
    images: [
      {
        url: '/work/pulse/thumbnail.png',
        width: 2048,
        height: 1293,
        alt: 'Pulse embedded checkout and partner operations product',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse: Embedded Crypto Payments',
    description:
      'Removing a design-to-engineering bottleneck to deliver a working proof of concept in five days.',
    images: ['/work/pulse/thumbnail.png'],
  },
}

export default function PulseLayout({ children }) {
  return children
}
