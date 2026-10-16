import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('uba');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('uba')} />{children}</>;
}
