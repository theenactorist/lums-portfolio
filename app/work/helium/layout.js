import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('helium');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('helium')} />{children}</>;
}
