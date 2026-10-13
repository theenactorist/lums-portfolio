export const metadata = {
  title: 'From Figma to a Working Payment Product in Five Days',
  description:
    'Designing and building the React frontend for a B2B payments platform, with a first partner demo in five working days.',
  openGraph: {
    title: 'From Figma to a Working Payment Product in Five Days',
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
    title: 'From Figma to a Working Payment Product in Five Days',
    description:
      'Designing and building the React frontend for a B2B payments platform, with a first partner demo in five working days.',
    images: ['/work/pulse/thumbnail.png'],
  },
}

export default function PulseLayout({ children }) {
  return children
}
