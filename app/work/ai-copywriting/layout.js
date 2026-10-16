import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('ai-copywriting');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('ai-copywriting')} />{children}</>;
}
