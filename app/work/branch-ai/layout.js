export const metadata = {
  title: 'Three AIs, One Design System - Branch International',
  description:
    'How Olumide turned scattered AI use into governed product workflows for illustration, copywriting, and prototyping across Branch International.',
  openGraph: {
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Case study: researching informal AI use and designing governed workflows with Branch product context, market rules, design-system logic, and human review.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/branch-ai',
    images: [
      {
        url: '/work/branch-ai/three-ai-workflows.jpg',
        width: 1672,
        height: 941,
        alt: 'Three governed AI workflows across illustration, copywriting, and prototyping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three AIs, One Design System - Branch International',
    description:
      'Turning scattered AI use into governed workflows for product work at Branch.',
    images: ['/work/branch-ai/three-ai-workflows.jpg'],
  },
};

export default function BranchAILayout({ children }) {
  return children;
}
