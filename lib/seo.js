import { productionHomeProjects } from '../app/data/productionHomeProjects';

export const site = {
  url: 'https://olumideolusesi.com',
  name: 'Olumide Olusesi',
  alternateName: 'Lums',
  title: 'Olumide Olusesi — Product Design Engineer',
  description: 'Olumide Olusesi (Lums) is a product design engineer based in Toronto. Explore work across fintech, AI tools, design systems and complex platforms.',
  portrait: '/home/about/olumide-profile.png',
  profiles: ['https://www.linkedin.com/in/olumideolusesi/', 'https://adplist.org/mentors/olumide-olusesi'],
};

const searchTitles = {
  pulse: 'Pulse: from Figma to a working payment product',
  'shiga-onboarding': 'ENTA: passkey-led onboarding',
  carbon: 'Carbon: unifying mobile banking',
  'ai-copywriting': 'Branch: an AI UX writing system',
  'branch-ai': 'Branch: AI tools for product design',
  sabi: 'Sabi: commerce and delivery platform',
  uba: 'UBA: an enterprise HR platform',
};

export const caseStudies = productionHomeProjects.map((project) => ({ ...project, path: `/work/${project.id}`, searchTitle: searchTitles[project.id] }));
export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;

export function pageMetadata({ title, description, path, image = '/og', imageAlt, type = 'website', noindex = false }) {
  const socialTitle = title === site.title ? title : `${title} | ${site.name}`;
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
  title: { absolute: `Page not found | ${site.name}` },
  description: 'This page could not be found. Return to Olumide Olusesi’s portfolio or explore selected product design work.',
  alternates: { canonical: null },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { title: `Page not found | ${site.name}`, url: null },
};

export function caseStudyMetadata(id) {
  const project = caseStudies.find((item) => item.id === id);
  return pageMetadata({ title: project.searchTitle, description: project.description, path: project.path, image: `/og/${project.id}`, imageAlt: `${project.title} — ${project.imageAlt}`, type: 'article' });
}

export const siteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', '@id': absoluteUrl('/#person'), name: site.name, alternateName: site.alternateName, url: absoluteUrl('/'), image: absoluteUrl(site.portrait), jobTitle: 'Product Design Engineer', description: site.description, homeLocation: { '@type': 'Place', name: 'Toronto, Canada' }, sameAs: site.profiles },
    { '@type': 'WebSite', '@id': absoluteUrl('/#website'), url: absoluteUrl('/'), name: site.name, alternateName: 'Lums Portfolio', description: site.description, inLanguage: 'en-CA', publisher: { '@id': absoluteUrl('/#person') }, about: { '@id': absoluteUrl('/#person') } },
  ],
};

export function pageSchema({ path, name, description, type = 'WebPage' }) {
  return { '@context': 'https://schema.org', '@type': type, '@id': absoluteUrl(`${path}#webpage`), url: absoluteUrl(path), name, description, inLanguage: 'en-CA', isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': absoluteUrl('/#person') } };
}

export function caseStudySchema(id) {
  const project = caseStudies.find((item) => item.id === id);
  return {
    ...pageSchema({ path: project.path, name: project.title, description: project.description }),
    mainEntity: { '@type': 'CreativeWork', '@id': absoluteUrl(`${project.path}#case-study`), name: project.title, description: project.description, url: absoluteUrl(project.path), genre: 'Product design case study', image: { '@type': 'ImageObject', url: absoluteUrl(project.image), caption: project.imageAlt }, author: { '@id': absoluteUrl('/#person') } },
  };
}
