import { productionHomeProjects, pulseHeadline } from '../app/data/productionHomeProjects';
import { profile, profileLocation } from '../app/data/profile';

export const site = {
  url: 'https://olumideolusesi.com',
  name: profile.name,
  alternateName: profile.alternateName,
  brand: profile.alternateName,
  title: `${profile.alternateName} | ${profile.role}`,
  description: `${profile.name} (${profile.alternateName}) is a ${profile.seniorRole.toLowerCase()} and ${profile.role.toLowerCase()} in ${profileLocation}, working across AI tools, design systems and fintech.`,
  portrait: '/home/about/olumide-profile.png',
  profiles: ['https://www.linkedin.com/in/olumideolusesi/', 'https://adplist.org/mentors/olumide-olusesi'],
};

export const pageCopy = {
  resume: {
    title: `Résumé: ${profile.seniorRole}`,
    description: `Experience, skills and résumé for ${profile.name}, a ${profile.seniorRole.toLowerCase()} based in ${profileLocation}, across fintech, SaaS and enterprise software.`,
  },
  work: {
    title: 'Product design case studies',
    description: `Explore ${profile.name}’s work in AI product design, digital banking UX, SaaS, B2B commerce and enterprise platforms, with interactive prototypes.`,
    intro: 'Product design across AI tools, digital banking, SaaS, B2B commerce and enterprise software, with interactive prototypes and working builds.',
  },
};

const searchTitles = {
  pulse: pulseHeadline,
  'shiga-onboarding': 'ENTA: passkey-led onboarding',
  carbon: 'Carbon: mobile banking UX and design systems',
  'ai-copywriting': 'Branch: an AI UX writing system',
  'branch-ai': 'Branch: AI tools for product design',
  sabi: 'Sabi: B2B commerce and logistics UX',
  uba: 'UBA: enterprise UX for HR workflows',
};

const searchDescriptions = {
  pulse: 'A five-day payments prototype connecting product strategy, AI prototyping, Figma, React and a coded design system, from checkout to developer tools.',
  carbon: 'UX research, interaction design and design systems for Carbon’s iOS and Android banking home, shaped through usability testing and engineering collaboration.',
  uba: 'Enterprise UX for UBA’s HCMConnect HR platform, connecting research, workflow design, interactive prototypes, usability testing and engineering handoff.',
};

export const caseStudies = productionHomeProjects.map((project) => ({ ...project, path: `/work/${project.id}`, searchTitle: searchTitles[project.id], searchDescription: searchDescriptions[project.id] ?? project.description }));
export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;

// Page titles use the Lums brand and a vertical bar; personal identity stays in site.name.
export const pageTitle = (title) => title === site.title ? title : `${title} | ${site.brand}`;

export function pageMetadata({ title, description, path, image = '/og', imageAlt, type = 'website', noindex = false }) {
  const socialTitle = pageTitle(title);
  const socialImage = { url: image, width: 1200, height: 630, alt: imageAlt ?? `${site.name} (Lums), product design engineer in Toronto` };
  return {
    title: { absolute: socialTitle }, description,
    alternates: { canonical: path },
    openGraph: { title: socialTitle, description, url: path, siteName: `${site.name} (Lums)`, locale: 'en_CA', type, images: [socialImage] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [socialImage] },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  };
}

export const notFoundMetadata = {
  title: { absolute: pageTitle('Page not found') },
  description: 'This page could not be found. Return to Olumide Olusesi’s portfolio or explore selected product design work.',
  alternates: { canonical: null },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { title: pageTitle('Page not found'), url: null },
  twitter: pageMetadata({ title: 'Page not found', description: site.description, path: '/' }).twitter,
};

export function caseStudyMetadata(id) {
  const project = caseStudies.find((item) => item.id === id);
  return pageMetadata({ title: project.searchTitle, description: project.searchDescription, path: project.path, image: `/og/${project.id}`, imageAlt: `${project.title} — ${project.imageAlt}`, type: 'article' });
}

export const siteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', '@id': absoluteUrl('/#person'), name: site.name, alternateName: site.alternateName, url: absoluteUrl('/'), image: absoluteUrl(site.portrait), jobTitle: profile.role, description: site.description, homeLocation: { '@type': 'Place', name: profileLocation }, sameAs: site.profiles },
    { '@type': 'WebSite', '@id': absoluteUrl('/#website'), url: absoluteUrl('/'), name: site.name, alternateName: 'Lums Portfolio', description: site.description, inLanguage: 'en-CA', publisher: { '@id': absoluteUrl('/#person') }, about: { '@id': absoluteUrl('/#person') } },
  ],
};

export function pageSchema({ path, name, description, type = 'WebPage' }) {
  return { '@context': 'https://schema.org', '@type': type, '@id': absoluteUrl(`${path}#webpage`), url: absoluteUrl(path), name, description, inLanguage: 'en-CA', isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': absoluteUrl('/#person') } };
}

export function caseStudySchema(id) {
  const project = caseStudies.find((item) => item.id === id);
  return {
    ...pageSchema({ path: project.path, name: project.title, description: project.searchDescription }),
    mainEntity: { '@type': 'CreativeWork', '@id': absoluteUrl(`${project.path}#case-study`), name: project.title, description: project.searchDescription, url: absoluteUrl(project.path), genre: 'Product design case study', image: { '@type': 'ImageObject', url: absoluteUrl(project.image), caption: project.imageAlt }, author: { '@id': absoluteUrl('/#person') } },
  };
}
