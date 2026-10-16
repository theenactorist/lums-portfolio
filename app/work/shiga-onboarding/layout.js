import JsonLd from '../../components/JsonLd';
import { caseStudyMetadata, caseStudySchema } from '../../../lib/seo';

export const metadata = caseStudyMetadata('shiga-onboarding');

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={caseStudySchema('shiga-onboarding')} />{children}</>;
}
