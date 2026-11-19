// Verified against the live Home cards on 17 September 2026.
// Includes the owner's subsequent Home copy, tags, and Pulse thumbnail updates.
// The owner approved CopyGPT as the fourth card on 11 October 2026.
// The owner approved Helium as the second card, after Pulse, on 3 November 2026.
// The owner approved the rewards case study (Carbon and Branch) as the fifth card, after Carbon, on 6 November 2026.
// The owner asked for Carbon's and Branch's logos side by side on that card on 6 November 2026 (companyLogos, Home only);
// companyName gives /work and the share image both companies. Cards without companyLogos show their single companyLogo.
// Card tags (attributes) trimmed to at most three on 6 November 2026: no “Shipped” (all of them are) and none that repeat the Home group.
// The owner asked for four tags on Carbon (adding Fintech) and Shiga onboarding (adding B2B) on 7 November 2026.
// The Agile AI-driven design case study (Cowork, T16, 18 November 2026) is listed third, after Helium, and first in
// “Design systems and AI-driven design” on Home; its title is the page's H1 (agileHeadline).
// The owner renamed that group from “Design systems and AI tools” on 18 November 2026 (title and intro as written).
// The owner retitled Pulse as a zero-to-one SaaS case on 18 November 2026: pulseHeadline, its card line and tags (no AI Tools).
// Other cards retain their verified production destinations and order.
export const pulseHeadline = 'Zero to One: Designing a Payments SaaS';
export const heliumHeadline = 'Design System Engineering: Owning Helium from Figma Library to Production Code';
export const agileHeadline = 'Agile AI-Driven Design: Design Judgment, Written for Agents';
export const rewardsHeadline = 'Designing Rewards for Growth at Carbon and Branch: Loyalty Tiers, Cashback and Referrals';

export const productionHomeProjects = [
  {
    id: 'pulse',
    title: pulseHeadline,
    description: 'Taking an embedded crypto payments idea to a working B2B product: checkout for customers, operations for partner teams and tools for developers.',
    attributes: ['Web 3', 'SaaS', 'B2B'],
    image: '/home/live-work/pulse-layered.png',
    imageAlt: 'Pulse payment dashboard with embedded crypto checkout and developer API code',
    href: 'https://olumideolusesi.com/work/pulse',
    companyLogo: '/home/work-logos/shiga.svg',
    companyLogoAlt: 'Shiga',
    companyLogoWidth: 1047,
    companyLogoHeight: 291,
  },
  {
    id: 'helium',
    title: heliumHeadline,
    description: 'Building Shiga’s design system across the Figma library and production React, so designers, engineers and AI coding agents can build Enta and Pulse from the same foundations.',
    attributes: ['Design Systems', 'AI Tools'],
    image: '/home/live-work/helium-layered.png',
    imageAlt: 'Helium’s Figma library cover with its Storybook Button documentation',
    href: 'https://olumideolusesi.com/work/helium',
    companyLogo: '/home/work-logos/shiga.svg',
    companyLogoAlt: 'Shiga',
    companyLogoWidth: 1047,
    companyLogoHeight: 291,
  },
  {
    id: 'agile-ai-driven-design',
    title: agileHeadline,
    description: 'How I design and prototype Shiga’s products with AI agents, from documentation and Figma to live prototypes Engineering builds from, with QA against production.',
    attributes: ['AI Tools', 'Prototyping'],
    image: '/home/live-work/agile-layered.png',
    imageAlt: 'The Enta prototype on a Pixelbook Go and a Pixel 5: a payment link’s details on the laptop and a Multisig request on the phone',
    href: 'https://olumideolusesi.com/work/agile-ai-driven-design',
    companyLogo: '/home/work-logos/shiga.svg',
    companyLogoAlt: 'Shiga',
    companyLogoWidth: 1047,
    companyLogoHeight: 291,
  },
  {
    id: 'shiga-onboarding',
    title: 'Cutting time to value with passkey-led onboarding',
    description: 'Redesigning ENTA’s individual onboarding around passkeys and feature-based verification, so users can reach their wallet before unlocking fiat services.',
    attributes: ['Fintech', 'Crypto', 'B2C', 'B2B'],
    image: '/home/live-work/shiga-onboarding.jpg',
    imageAlt: 'Cutting time to value with passkey-led onboarding',
    href: 'https://olumideolusesi.com/work/shiga-onboarding',
    companyLogo: '/home/work-logos/shiga.svg',
    companyLogoAlt: 'Shiga',
    companyLogoWidth: 1047,
    companyLogoHeight: 291,
  },
  {
    id: 'carbon',
    title: 'Unifying Carbon’s banking experience across Android and iOS',
    description: 'Redesigning the home screen to prioritise credit and everyday actions, improve balance privacy, and bring both mobile platforms into one consistent experience.',
    attributes: ['Design Systems', 'B2C', 'Mobile', 'Fintech'],
    image: '/home/live-work/carbon.jpg',
    imageAlt: 'Unifying Carbon’s banking experience across Android and iOS',
    href: 'https://olumideolusesi.com/work/carbon',
    companyLogo: '/home/work-logos/carbon.svg',
    companyLogoAlt: 'Carbon',
    companyLogoWidth: 125,
    companyLogoHeight: 31,
  },
  {
    id: 'rewards',
    title: rewardsHeadline,
    description: 'Designing two rewards programs that got customers using their accounts: six loyalty tiers at Carbon, and cashback and referral rewards at Branch.',
    attributes: ['Growth', 'Fintech', 'Mobile'],
    image: '/home/live-work/rewards-earned.jpg',
    imageAlt: 'Generated rewards cover concept showing Carbon’s Tier 4, 5 and 6 badges beside a Branch ticket with 2% cashback and a ₦1,250 sample rewards balance',
    href: 'https://olumideolusesi.com/work/rewards',
    companyName: 'Carbon and Branch',
    companyLogo: '/home/work-logos/branch.svg',
    companyLogoAlt: 'Branch',
    companyLogoWidth: 106,
    companyLogoHeight: 39,
    companyLogos: [
      { src: '/home/work-logos/carbon.svg', alt: 'Carbon', width: 125, height: 31 },
      { src: '/home/work-logos/branch.svg', alt: 'Branch', width: 106, height: 39 },
    ],
  },
  {
    id: 'ai-copywriting',
    title: 'Building Branch’s AI UX Writing System',
    description: 'I packaged Branch’s brand principles, product context and design-system rules as an agent skill, so every team’s AI workflows produced consistent, on-brand UX writing by default.',
    attributes: ['AI Tools', 'Internal Tools'],
    image: '/home/live-work/ai-writing-guide.jpg',
    imageAlt: 'Generated cover concept of a navy Branch UX Writing System guide with Brand, Context and Components tabs',
    href: '/work/ai-copywriting',
    companyLogo: '/home/work-logos/branch.svg',
    companyLogoAlt: 'Branch',
    companyLogoWidth: 106,
    companyLogoHeight: 39,
  },
  {
    id: 'branch-ai',
    title: 'Building AI tools for consistent product design',
    description: 'Creating reusable illustration, UX writing and Neem prototyping workflows for Branch’s product team, grounded in brand, market and component rules with human review.',
    attributes: ['AI Automation', 'Internal Tools'],
    image: '/work/branch-ai/branch-shared-system-thumbnail.png',
    imageAlt: 'Generated Branch cover concept showing illustration assets, a UX copy comparison and a schematic Neem prototype',
    href: '/work/branch-ai',
    companyLogo: '/home/work-logos/branch.svg',
    companyLogoAlt: 'Branch',
    companyLogoWidth: 106,
    companyLogoHeight: 39,
  },
  {
    id: 'sabi',
    title: 'Designing a multi-role commerce and delivery platform for Sabi',
    description: 'Connecting supplier order and inventory management, logistics operations, and driver delivery workflows in one platform.',
    attributes: ['B2B2C', 'Ecommerce', 'Logistics'],
    image: '/home/live-work/sabi.jpg',
    imageAlt: "Sabi's Supply Chain Logistics Solution for African SMEs",
    href: 'https://olumideolusesi.com/work/sabi',
    companyLogo: '/home/work-logos/sabi.svg',
    companyLogoAlt: 'Sabi',
    companyLogoWidth: 104,
    companyLogoHeight: 27,
  },
  {
    id: 'uba',
    title: 'Taking an enterprise HR platform from concept to production',
    description: 'Designing UBA’s HCMConnect HR platform for 10,000+ employees, from discovery and connected workflows to testing and engineering handoff.',
    attributes: ['Enterprise', 'Web'],
    image: '/home/live-work/uba.jpg',
    imageAlt: "UBA's Human Resource Management System",
    href: 'https://olumideolusesi.com/work/uba',
    companyLogo: '/home/work-logos/uba.svg',
    companyLogoAlt: 'UBA',
    companyLogoWidth: 757,
    companyLogoHeight: 256,
  },
];

// The owner grouped the Home cards by kind of work on 6 November 2026 (heading and intro approved as written; no group numbers, 6 November 2026).
// Home only: /work, the share images and the case-study pages keep reading productionHomeProjects in its order.
// Every project id belongs to exactly one group (scripts/tests/home-work-groups.test.mjs).
export const homeWorkGroups = [
  {
    id: 'new-products',
    title: 'Building new products',
    intro: 'From an idea to a product people use.',
    projectIds: ['pulse', 'sabi', 'uba'],
  },
  {
    id: 'design-systems-ai',
    title: 'Design systems and AI-driven design',
    intro: 'Foundations and AI workflows that help teams move fast and keep the quality high.',
    projectIds: ['agile-ai-driven-design', 'helium', 'ai-copywriting', 'branch-ai'],
  },
  {
    id: 'growth-retention',
    title: 'Growth and retention',
    intro: 'Getting customers through the door and using what they signed up for.',
    projectIds: ['shiga-onboarding', 'carbon', 'rewards'],
  },
];
