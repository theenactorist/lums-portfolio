import { absoluteUrl, caseStudies } from '../lib/seo';

export default function sitemap() {
  // Omit lastModified until a real content revision date is available.
  return ['/', '/work', '/resume', ...caseStudies.map(({ path }) => path)].map((path) => ({ url: absoluteUrl(path) }));
}
