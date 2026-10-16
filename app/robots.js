import { absoluteUrl } from '../lib/seo';

export default function robots() {
  // This existing public-crawl policy includes search crawlers such as OAI-SearchBot.
  // Search and model-training policies are separate; no training preference is changed.
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: absoluteUrl('/sitemap.xml') };
}
