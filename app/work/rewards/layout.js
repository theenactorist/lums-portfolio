import JsonLd from '../../components/JsonLd';
import { pageMetadata, pageSchema } from '../../../lib/seo';

// Unlisted until Olumide approves it: no caseStudies entry, so the metadata and schema are built here.
// pageMetadata adds “ | Lums” to the title.
const title = 'Carbon and Branch: growth design for rewards and referrals';
const description = 'How I designed two rewards programs to grow product use: six loyalty tiers at Carbon, and cashback and referral rewards at Branch.';
const path = '/work/rewards';

export const metadata = pageMetadata({ title, description, path, type: 'article', noindex: true });

export default function CaseStudyLayout({ children }) {
  return <><JsonLd data={pageSchema({ path, name: title, description })} />{children}</>;
}
