import JsonLd from '../../components/JsonLd';
import { pageMetadata, pageSchema } from '../../../lib/seo';

// Unlisted until approved: no caseStudies entry, so the metadata and schema are built here.
const title = 'Helium: design system engineering from Figma to production code';
const description = 'How Olumide built Helium, Shiga’s design system, so designers, engineers and AI coding agents build Enta and Pulse from the same foundations, components and rules.';
const path = '/work/helium';

export const metadata = pageMetadata({ title, description, path, type: 'article', noindex: true });

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={pageSchema({ path, name: title, description })} />{children}</>;
}
