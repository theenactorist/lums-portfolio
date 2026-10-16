import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: "Original Branch AI case study archive",
  description: 'An archived portfolio case study by Olumide Olusesi. Explore the current version from the selected work page.',
  path: '/work/branch-ai-original-v1',
  noindex: true,
});

export default function ArchiveLayout({ children }) { return children; }
