const title = 'Unifying Carbon’s banking experience across Android and iOS';
const description = 'Redesigning the home screen to prioritise credit and everyday actions, improve balance privacy, and bring both mobile platforms into one consistent experience.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: '/work/carbon/cover.gif', width: 960, height: 540, alt: 'Carbon mobile banking release animation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/work/carbon/cover.gif'],
  },
};

export default function CarbonLayout({ children }) {
  return children;
}
