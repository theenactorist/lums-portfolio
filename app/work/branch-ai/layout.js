export const metadata = {
  title: 'Turning Fragmented AI Use Into Consistent Product Outputs at Branch',
  description:
    'How Olumide built reusable workflows for on-brand illustrations, market-aware product copy, and Neem-based prototypes for Branch’s product teams.',
  openGraph: {
    title: 'Turning Fragmented AI Use Into Consistent Product Outputs at Branch',
    description:
      'A product-systems case study covering Illustration GPT, CopyGPT, and the Neem DS Prototyper at Branch International.',
    type: 'article',
    url: 'https://olumideolusesi.com/work/branch-ai',
    images: [
      {
        url: '/work/branch-ai/cover.jpg',
        width: 1768,
        height: 1024,
        alt: 'Illustration GPT, CopyGPT, and Neem DS Prototyper workflows created for Branch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turning Fragmented AI Use Into Consistent Product Outputs at Branch',
    description:
      'Reusable workflows for on-brand illustrations, market-aware product copy, and Neem-based prototypes.',
    images: ['/work/branch-ai/cover.jpg'],
  },
};

export default function BranchAILayout({ children }) {
  return children;
}
