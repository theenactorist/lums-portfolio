import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: "Archived Branch AI case study",
  description: 'An archived portfolio case study by Olumide Olusesi. Explore the current version from the selected work page.',
  path: '/work/branch-ai-v1',
  noindex: true,
});

export default function ArchiveLayout({ children }) { return children; }
