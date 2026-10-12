import { title } from './caseStudyContent';

const description = 'Connecting supplier order and inventory management, logistics operations, and driver delivery workflows in one platform.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    images: [{ url: '/work/sabi/Navigating Complexity_ Revolutionizing Supply Chain Logistics for African SMEs.jpg', width: 1768, height: 1024, alt: 'Original Sabi supplier and driver product mockups' }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function SabiLayout({ children }) {
  return children;
}
