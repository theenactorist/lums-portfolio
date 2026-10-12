const title = 'Cutting time to value with passkey-led onboarding';
const description = 'Redesigning ENTA’s individual onboarding around passkeys and feature-based verification, so users can reach their wallet before unlocking fiat services.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    url: 'https://olumideolusesi.com/work/shiga-onboarding',
    images: [{ url: '/work/shiga-onboarding/thumbnail.jpg', width: 2048, height: 1186, alt: 'ENTA onboarding and wallet design' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/work/shiga-onboarding/thumbnail.jpg'] },
};

export default function ShigaOnboardingLayout({ children }) {
  return children;
}
