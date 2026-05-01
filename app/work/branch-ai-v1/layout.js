export const metadata = {
  title: 'Three AIs, One Design System - Branch International',
  description:
    'How Olumide engineered three AI-powered tools (Illustration GPT, Copywriting AI, Prototyping AI) that transformed creative output for Branch International across India, Kenya, and Nigeria.',
  openGraph: {
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Case study: Engineering three AI-powered tools that transformed how a 25-person product team creates illustrations, writes copy, and prototypes across 3 markets.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/branch-ai',
    images: [
      {
        url: '/work/branch-ai/cover.jpg',
        width: 2400,
        height: 1200,
        alt: 'Three AIs, One Design System - Branch International case study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Engineering three AI-powered tools that transformed creative output across India, Kenya, and Nigeria.',
    images: ['/work/branch-ai/cover.jpg'],
  },
};

export default function BranchAILayout({ children }) {
  return children;
}
