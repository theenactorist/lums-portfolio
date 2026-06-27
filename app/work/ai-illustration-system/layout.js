export const metadata = {
  title: 'Building an AI Illustration System for Consistent, On-Brand Product Visuals at Branch',
  description:
    'How Olumide built a reusable AI illustration system for consistent, on-brand product visuals at Branch.',
  openGraph: {
    title: 'Building an AI Illustration System for Consistent, On-Brand Product Visuals at Branch',
    description:
      'A product-design case study about visual direction, reusable rules, iteration, and human review.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/ai-illustration-system',
    images: [
      {
        url: '/work/branch-ai/illust-grid.jpg',
        width: 1024,
        height: 1024,
        alt: 'A set of consistent Branch product illustrations created through the shared illustration system',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building an AI Illustration System for Consistent, On-Brand Product Visuals at Branch',
    description:
      'A product-design case study about building a reusable illustration system with AI and human review.',
    images: ['/work/branch-ai/illust-grid.jpg'],
  },
};

export default function AIIllustrationSystemLayout({ children }) {
  return children;
}
