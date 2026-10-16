import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('sabi');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('sabi')} />{children}</>;
}
