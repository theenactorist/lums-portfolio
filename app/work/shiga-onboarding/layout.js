export const metadata = {
  title: 'Cutting Time to Value with a Passkey-Led Onboarding - Shiga ENTA',
  description:
    'How Olumide rebuilt ENTA\'s individual onboarding around passkeys and deferred KYC, getting crypto-only users to the dashboard in under a minute.',
  openGraph: {
    title: 'Cutting Time to Value with a Passkey-Led Onboarding - Shiga ENTA',
    description:
      'Case study: Rebuilding a crypto wallet\'s sign-up around passkeys and deferred KYC to cut time-to-value from minutes to under 60 seconds.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/shiga-onboarding',
    images: [
      {
        url: '/work/shiga-onboarding/thumbnail.jpg',
        width: 2400,
        height: 1200,
        alt: 'Cutting Time to Value with a Passkey-Led Onboarding - Shiga ENTA case study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cutting Time to Value with a Passkey-Led Onboarding - Shiga ENTA',
    description:
      'Rebuilding a crypto wallet\'s onboarding around passkeys and deferred KYC.',
    images: ['/work/shiga-onboarding/thumbnail.jpg'],
  },
};

export default function ShigaOnboardingLayout({ children }) {
  return children;
}
