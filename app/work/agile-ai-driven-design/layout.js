import JsonLd from '../../components/JsonLd';
import { pageMetadata, pageSchema } from '../../../lib/seo';

// Unlisted until Olumide approves it: no caseStudies entry, so the metadata and schema are built here.
// pageMetadata adds “ | Lums” to the title.
const title = 'Agile AI-driven design';
const description = 'How I design and prototype Shiga’s products with AI agents, from documentation and Figma to live prototypes Engineering builds from, with QA against production.';
const path = '/work/agile-ai-driven-design';

export const metadata = pageMetadata({ title, description, path, type: 'article', noindex: true });

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={pageSchema({ path, name: title, description })} />{children}</>;
}
