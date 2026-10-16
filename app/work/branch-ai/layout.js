import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('branch-ai');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('branch-ai')} />{children}</>;
}
