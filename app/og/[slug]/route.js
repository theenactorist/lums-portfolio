import { portfolioImage } from '../../../lib/og-image';
import { caseStudies } from '../../../lib/seo';
export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ id }) => ({ slug: id })); }
export async function GET(_request, { params }) {
  const { slug } = await params;
  const project = caseStudies.find(({ id }) => id === slug);
  if (!project) return new Response('Image not found', { status: 404 });
  return portfolioImage(project);
}
