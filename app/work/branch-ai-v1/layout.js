export const metadata = {
  title: 'Three AIs, One Design System - Branch International',
  description:
    'How Olumide designed three AI-powered workflows that helped Branch International create brand-consistent illustrations, market-ready copy, and faster prototypes across India, Kenya, and Nigeria.',
  openGraph: {
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Case study: designing AI-powered workflows that helped a distributed product team move faster while preserving design-system rules, market context, and human review.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/branch-ai',
    images: [
      {
        url: '/work/branch-ai/workflows-overview.jpg',
        width: 1672,
        height: 941,
        alt: 'Three AI workflows connecting team bottlenecks to product outcomes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Designing AI-powered workflows for illustration, copy, and prototyping across India, Kenya, and Nigeria.',
    images: ['/work/branch-ai/workflows-overview.jpg'],
  },
};

export default function BranchAILayout({ children }) {
  return children;
}
