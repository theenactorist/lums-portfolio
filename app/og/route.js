import { portfolioImage } from '../../lib/og-image';
export const dynamic = 'force-static';
export function GET() { return portfolioImage(); }
