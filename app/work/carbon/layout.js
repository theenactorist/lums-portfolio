export const metadata = {
  title: 'Carbon — Revamping Fintech Home Screen Experience',
  description: 'How a home screen redesign drove an 81% surge in customer satisfaction, 25% increase in user registrations, and reactivated 10% of dormant accounts for Carbon, Nigeria\'s leading digital bank.',
  openGraph: {
    title: 'Carbon — Revamping Fintech Home Screen Experience | Lums',
    description: 'How a home screen redesign drove an 81% surge in customer satisfaction and 25% increase in user registrations for Carbon.',
    images: [{ url: '/work/carbon/cover.gif', width: 1200, height: 675, alt: 'Carbon home screen redesign' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carbon — Revamping Fintech Home Screen Experience | Lums',
    description: 'How a home screen redesign drove an 81% surge in customer satisfaction for Carbon.',
    images: ['/work/carbon/cover.gif'],
  },
};

export default function CarbonLayout({ children }) {
  return children;
}
