import { pageCopy, pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({ ...pageCopy.work, path: '/work' });
export default function PageLayout({ children }) {
  return children;
}
