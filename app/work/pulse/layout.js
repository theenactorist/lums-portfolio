export const metadata = {
  title: 'Pulse: Embedded Crypto Payments',
  description:
    'Designing and building the React frontend for a B2B payments platform, with a first partner demo in five working days.',
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
      'Designing and building the React frontend for a B2B payments platform, with a first partner demo in five working days.',
    images: ['/work/pulse/thumbnail.png'],
  },
}

export default function PulseLayout({ children }) {
  return children
}
