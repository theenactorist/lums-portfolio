import JsonLd from '../../components/JsonLd';
import { pageMetadata, pageSchema } from '../../../lib/seo';

// Unlisted until approved: no caseStudies entry, so the metadata and schema are built here.
const title = 'Helium: design system engineering from Figma to production code';
const description = 'How Olumide builds and maintains Helium, Shiga’s design system, in both Figma and production React, so Enta and Pulse use the same tokens, components, UX patterns and copy.';
const path = '/work/helium';

export const metadata = pageMetadata({ title, description, path, type: 'article', noindex: true });

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={pageSchema({ path, name: title, description })} />{children}</>;
}
