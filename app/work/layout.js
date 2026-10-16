import { pageMetadata } from '../../lib/seo';

const description = "Explore seven product design case studies by Olumide Olusesi across payments, onboarding, mobile banking, AI tools, commerce and enterprise software.";
export const metadata = pageMetadata({ title: "Selected work", description, path: '/work' });
export default function PageLayout({ children }) {
  return children;
}
