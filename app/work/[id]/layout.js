const seoData = {
  carbon: {
    title: 'Carbon',
    description: 'Revamping the core banking experience for millions of users.',
  },
  sabi: {
    title: 'Sabi',
    description: 'Building Africa\'s B2B marketplace for SME supply chains.',
  },
  uba: {
    title: 'United Bank for Africa (UBA)',
    description: 'From concept to production: HR Management serving 20,000+ employees.',
  },
  shiga: {
    title: 'Shiga Digital',
    description: 'Designing intuitive digital experiences at Shiga Digital.',
  },
  branch: {
    title: 'Branch International',
    description: 'Fintech product design for global financial access.',
  }
};

export async function generateMetadata({ params }) {
  // Await the params object (required in Next.js 14+)
  const resolvedParams = await params;
  const project = seoData[resolvedParams.id];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Lums`,
      description: project.description,
    },
    twitter: {
      title: `${project.title} | Lums`,
      description: project.description,
    }
  };
}

export default function ProjectLayout({ children }) {
  return children;
}
