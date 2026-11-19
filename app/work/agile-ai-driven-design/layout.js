import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('agile-ai-driven-design');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('agile-ai-driven-design')} />{children}</>;
}
