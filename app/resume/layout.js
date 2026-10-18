import JsonLd from '../components/JsonLd';
import { absoluteUrl, pageCopy, pageMetadata, pageSchema } from '../../lib/seo';

const { title, description } = pageCopy.resume;
export const metadata = pageMetadata({ title, description, path: '/resume' });
const schema = { ...pageSchema({ path: '/resume', name: 'Olumide Olusesi’s résumé', description }), mainEntity: { '@id': absoluteUrl('/#person') } };

export default function PageLayout({ children }) {
  return <><JsonLd data={schema} />{children}</>;
}
