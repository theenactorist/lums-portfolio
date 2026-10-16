import JsonLd from '../components/JsonLd';
import { absoluteUrl, pageMetadata, pageSchema } from '../../lib/seo';

const description = "Explore Olumide Olusesi’s product design experience across fintech, AI tools, digital banking and enterprise platforms, and download his résumé.";
export const metadata = pageMetadata({ title: "Résumé", description, path: '/resume' });
const schema = { ...pageSchema({ path: '/resume', name: 'Olumide Olusesi’s résumé', description }), mainEntity: { '@id': absoluteUrl('/#person') } };

export default function PageLayout({ children }) {
  return <><JsonLd data={schema} />{children}</>;
}
