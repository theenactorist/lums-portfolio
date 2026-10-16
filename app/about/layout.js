import JsonLd from '../components/JsonLd';
import { absoluteUrl, pageMetadata, pageSchema } from '../../lib/seo';

const description = "Meet Olumide Olusesi (Lums), a Toronto-based product design engineer working across fintech, AI tools and complex platforms. Background, approach and interests.";
export const metadata = pageMetadata({ title: "About", description, path: '/about' });
const schema = { ...pageSchema({ path: '/about', name: 'About Olumide Olusesi', description, type: 'ProfilePage' }), mainEntity: { '@id': absoluteUrl('/#person') } };

export default function PageLayout({ children }) {
  return <><JsonLd data={schema} />{children}</>;
}
