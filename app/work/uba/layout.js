export const metadata = {
  title: 'UBA — Human Resource Management System',
  description: 'From concept to production: designing an enterprise HR management system for 20,000+ employees across 20 African countries for United Bank for Africa.',
  openGraph: {
    title: 'UBA — Human Resource Management System | Lums',
    description: 'Designing an enterprise HR management system for 20,000+ employees across 20 African countries.',
    images: [{ url: '/work/uba/Concept to Production_ Human Resource Management System.jpg', width: 1200, height: 675, alt: 'UBA HR Management System' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UBA — Human Resource Management System | Lums',
    description: 'Designing an enterprise HR management system for 20,000+ employees across 20 African countries.',
  },
};

export default function UBALayout({ children }) {
  return children;
}
