const title = 'Building AI tools for consistent product design';
const description = 'Creating reusable illustration, UX writing and Neem prototyping workflows for Branch’s product team, grounded in brand, market and component rules with human review.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    url: 'https://olumideolusesi.com/work/branch-ai',
    images: [{
      url: '/work/branch-ai/branch-shared-system-thumbnail.png',
      width: 1672,
      height: 941,
      alt: 'Generated cover concept for Branch illustration, UX writing and Neem prototyping workflows',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/work/branch-ai/branch-shared-system-thumbnail.png'],
  },
};

export default function BranchLayout({ children }) {
  return children;
}
