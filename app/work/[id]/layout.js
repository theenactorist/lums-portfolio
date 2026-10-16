import { notFound } from 'next/navigation';
import { notFoundMetadata } from '../../../lib/seo';

export const metadata = notFoundMetadata;

// Published cases have explicit static routes. Unknown slugs are rejected
// on the server, with consistent error metadata and the branded 404.
export default function UnknownProjectLayout() { notFound(); }
