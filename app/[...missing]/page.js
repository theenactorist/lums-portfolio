import { notFound } from 'next/navigation';
import { notFoundMetadata } from '../../lib/seo';

export const metadata = notFoundMetadata;
export default function MissingPage() { notFound(); }
