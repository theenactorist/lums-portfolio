'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import AskLums from './components/home/AskLums';
import LogoTicker from './components/home/LogoTicker';
import TechText from './components/home/TechText';
import AboutLanyard from './components/home/AboutLanyard';
import TorontoBackdrop from './components/home/TorontoBackdrop';
import PageTransition from './components/PageTransition';
import SiteLink from './components/SiteLink';
import { homeWorkGroups, productionHomeProjects } from './data/productionHomeProjects';
import { homeAboutLeadParts } from './data/profile';
import { designSkills } from './data/designSkills';
import styles from './home.module.css';

const career = [
  {
    period: 'May 2024–Present',
    company: 'Shiga Onchain Banking',
    role: 'Product Design Engineer',
    description:
      'As Shiga’s founding designer, I lead product strategy, UX/UI and visual design across ENTA, Pulse and a POS product in development, aligning roadmaps and engineering through delivery. This work helped secure Tether investment, Telegram funding for TON integration and Visa accelerator support.',
    tags: ['Crypto banking', 'SaaS', 'B2B / B2C', 'AI prototyping'],
  },
  {
    period: 'Oct 2024–Mar 2026',
    company: 'Branch International',
    role: 'Senior Product Designer',
    description:
      'I designed onboarding, lending, payments and growth experiences across markets. I also strengthened design systems, Figma versioning and engineering handoff, introducing AI workflows for writing, illustration and prototyping.',
    tags: ['Digital lending', 'Mobile banking', 'Multi-market', 'AI workflows'],
  },
  {
    period: 'Jun 2022–Oct 2024',
    company: 'Carbon Finance',
    role: 'Product Designer',
    description:
      'I led Carbon Business from concept to launch, coordinating a five-person team on the business banking and lending product. My work also spanned consumer banking on iOS and Android, design systems and a 120+ member beta community that helped cut external research costs by 25%.',
    tags: ['Business banking', 'Consumer banking', 'Growth'],
  },
  {
    period: 'Nov 2019–Jun 2022',
    company: 'United Bank for Africa',
    role: 'Product Designer',
    description:
      'I designed HR automation for 10,000+ employees and contributed to mobile banking, ATM and physical banking kiosk experiences. My work combined research, workflow design, prototyping and testing to simplify services for employees and banking customers.',
    tags: ['Enterprise', 'HR tech', 'Digital banking'],
  },
  {
    period: 'Project engagement',
    company: 'Sabi',
    role: 'Product design',
    description:
      'I designed supplier, logistics and driver experiences across web and mobile, connecting ordering and inventory with fulfilment and delivery. Research and prototype testing shaped tools around each role’s work: managing stock, coordinating trips and completing pickups and drop-offs.',
    tags: ['B2B commerce', 'Logistics'],
    project: true,
  },
];

const capabilityIcons = {
  'ux-ui': {
    paths: ['M3 20h5v-5h5v-5h6V4', 'm15 8 4-4 4 4'],
  },
  'design-systems': {
    paths: ['M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z', 'M12 3v18M3 12h18'],
  },
  'ai-product-design': {
    paths: ['m11 4 2.4 6.6L20 13l-6.6 2.4L11 22l-2.4-6.6L2 13l6.6-2.4Z', 'M20 2v4m-2-2h4'],
  },
  'ux-research': {
    paths: ['M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z', 'm15 15 6 6'],
  },
  prototyping: {
    paths: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM3 8h18', 'm9 12-3 3 3 3m6-6 3 3-3 3'],
  },
  'ux-writing': {
    paths: ['M9 3h6v6H9ZM2 15h6v6H2Zm14 0h6v6h-6Z', 'M12 9v3H5v3m7-3h7v3'],
  },
};

const capabilities = designSkills.map((skill) => ({
  ...skill,
  paths: capabilityIcons[skill.id].paths,
}));

const testimonials = [
  {
    name: 'Deovrat Dwivedi',
    role: 'Design Team Lead',
    company: 'Branch',
    linkedin: 'https://www.linkedin.com/in/deovratdwivedi14/',
    quote:
      "Lums is not a pixel pusher. He is an AI-native builder with a designer's eye and a PM's brain — and that combination is exactly what product teams need to stay relevant in 2026. He specialises in taking an abstract problem, dissecting it surgically, and creating something better than what you imagined. Beyond the work — he is a generous collaborator, a fun teammate, and someone who makes the people around him better.",
  },
  {
    name: 'Duncan',
    role: 'Product Designer',
    company: 'Branch',
    linkedin: 'https://www.linkedin.com/in/duncangichu/',
    quote:
      'From being your onboarding buddy to someone who shaped how I think about AI and automation — you inspired a whole new way of approaching problems and possibilities.',
  },
  {
    name: 'Annmercy',
    role: 'UX Researcher',
    company: 'Branch',
    linkedin: 'https://www.linkedin.com/in/annmercywairimu/',
    quote:
      'One of the fiercest AI champs at work. Impeccable work that made our experience easier. Such a valuable addition to the product team.',
  },
  {
    name: 'Fortunate Nneji',
    role: 'Product Manager',
    company: 'Sabi',
    linkedin: 'https://www.linkedin.com/in/fortunate-nneji/',
    quote:
      'Consistently impressed with his design skills, team leadership, and ability to make complex projects feel effortless. He would be an asset to any organization.',
  },
  {
    name: 'Tonye Boham',
    role: 'Head, HR Group Shared Service',
    company: 'UBA',
    linkedin: 'https://www.linkedin.com/in/tonyeboham/',
    quote:
      'Your immense contribution towards the delivery of the HR automation platform is a sterling achievement — borne out of your dedication, result-oriented approach, and willingness to go the extra mile to ensure delivery of all envisioned and ad-hoc requirements of the platform.',
  },
  {
    name: 'Chijioke Dozie',
    role: 'Chief Executive Officer',
    company: 'Carbon',
    linkedin: 'https://www.linkedin.com/in/chijiokedozie/',
    quote:
      "I'm really proud of what the @get_carbon team are delivering and this new design change of the Carbon app is just one of the many new changes that are coming. Our mission is not just to change the way you bank, but change your life by banking with us!",
  },
  {
    name: 'Rachael Aluko',
    role: 'Senior Product Designer',
    company: 'UBA',
    linkedin: 'https://www.linkedin.com/in/rachael-aluko/',
    quote:
      'Olumide consistently made well-informed design decisions that were backed strongly by research, data, and design processes, making it difficult for stakeholders to say no. His ability to communicate ideas and solutions in a way that commands attention is remarkable.',
  },
  {
    name: 'Eniayo',
    role: 'Product Manager',
    company: 'Branch',
    linkedin: 'https://www.linkedin.com/in/eniayo/',
    quote:
      "You're one of those people who make work feel easy — reliable, thoughtful, and just always on top of things.",
  },
  {
    name: 'Simon Julius',
    role: 'Frontend Engineer',
    company: 'Carbon',
    linkedin: 'https://www.linkedin.com/in/simon-julius-1429bb1b6/',
    quote:
      'I love the dedication Olumide puts into his work — how he carries the developer along when making designs, and how he takes responsibility while creating user-centric designs.',
  },
  {
    name: 'Emike Okoyomoh',
    role: 'Product Designer',
    company: 'Sabi',
    linkedin: 'https://www.linkedin.com/in/emike-okoyomoh/',
    quote:
      'His unique wealth of design experience and flexibility made him a valuable asset. He excels at his core — product design — but also contributes beyond scope, taking initiative to mentor junior designers.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' },
};

function ArrowIcon({ direction = 'right' }) {
  const points = direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6';

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.8 2.5 12.9 9l6.6 2.1-6.6 2.1-2.1 6.6-2.1-6.6-6.6-2.1L8.7 9l2.1-6.5Z" />
      <path d="m18.5 2 .7 2.2 2.3.8-2.3.8-.7 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </svg>
  );
}

function CareerCompanyTitle({ company }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h3
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.65 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.035,
          },
        },
      }}
    >
      {company.split(' ').map((word, index) => (
        <motion.span
          className={styles.careerWord}
          variants={{
            hidden: { opacity: 0, y: '0.42em' },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.18, ease: 'easeOut' },
            },
          }}
          key={`${word}-${index}`}
        >
          {word}
          {index < company.split(' ').length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </motion.h3>
  );
}

function Hero() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPreference, setPlaybackPreference] = useState('auto');
  const [videoFailed, setVideoFailed] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPlayback = () => {
      const wantsPlayback = playbackPreference === 'play' ||
        (playbackPreference === 'auto' && !motionPreference.matches);
      if (isVisible && document.visibilityState === 'visible' && wantsPlayback) {
        // An autoplay rejection leaves the poster and a working Play control.
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    motionPreference.addEventListener('change', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      motionPreference.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, [isVisible, playbackPreference, videoFailed]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.hero}
      data-visible={isVisible}
      id="hero"
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className={styles.heroBackdrop} aria-hidden="true">
        {videoFailed ? (
          <Image
            className={styles.heroImage}
            src="/home/hero/landing-diagonal-3-poster.webp"
            alt=""
            fill
            sizes="100vw"
          />
        ) : (
          <video
            className={styles.heroImage}
            ref={videoRef}
            src="/home/hero/landing-diagonal-3.mp4"
            poster="/home/hero/landing-diagonal-3-poster.webp"
            preload="auto"
            muted
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoFailed(true)}
          />
        )}
        {!videoFailed && (
          <TorontoBackdrop
            videoRef={videoRef}
            className={styles.heroImage}
            setPlaybackPreference={setPlaybackPreference}
          />
        )}
      </div>
      <div className={styles.frame}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Product sense × Design craft × AI</p>
          <h1 className={styles.heroTitle} id="hero-title">
            <span className={styles.heroTitleLine}>
              <TechText text="Product design engineer." boundsRef={heroRef} />
            </span>
          </h1>

          <div className={styles.heroLower}>
            <p className={styles.heroSummary}>
              Based in Toronto, I blend behavioural science, design and AI to create digital
              products that are useful and usable while delivering on business goals.
            </p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href="#featured-work"
              >
                View selected work
              </a>
              <a className={styles.textLink} href="#about">
                <span className={styles.heroAboutLabel}>About me</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <a className={styles.heroScrollCue} href="#about">
        <span className={styles.heroScrollLine} aria-hidden="true" />
        <span>Scroll</span>
      </a>
      {!videoFailed && (
        <button
          className={styles.heroVideoControl}
          type="button"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          onClick={() => {
            setPlaybackPreference(isPlaying ? 'pause' : 'play');
            if (isPlaying) videoRef.current?.pause();
            else videoRef.current?.play().catch(() => {});
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {isPlaying ? (
              <path d="M9 6v12m6-12v12" />
            ) : (
              <path d="m9 5 10 7-10 7z" fill="currentColor" strokeWidth="1" />
            )}
          </svg>
        </button>
      )}
    </section>
  );
}

function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (
      !project.href ||
      reduceMotion ||
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)').matches
    ) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.parentElement.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
    const pointerX = Math.max(0, Math.min(100, (x + 0.5) * 100));
    const pointerY = Math.max(0, Math.min(100, (y + 0.5) * 100));
    card.style.setProperty('--card-rotate-x', `${y * -10}deg`);
    card.style.setProperty('--card-rotate-y', `${x * 14}deg`);
    card.style.setProperty('--pointer-x', `${pointerX}%`);
    card.style.setProperty('--pointer-y', `${pointerY}%`);
    card.dataset.active = 'true';
  };

  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--card-rotate-x', '0deg');
    card.style.setProperty('--card-rotate-y', '0deg');
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
    delete card.dataset.active;
  };

  const content = (
    <>
      {project.href && <span className={styles.projectShimmer} aria-hidden="true" />}
      <div className={styles.projectMedia}>
        {project.compositeHero ? (
          <div className={styles.pulseHeroArtwork} role="img" aria-label={project.imageAlt}>
            <Image
              className={styles.pulseHeroDashboard}
              src={project.image}
              alt=""
              width={1640}
              height={1034}
              sizes="(max-width: 700px) 60vw, 36vw"
              loading="eager"
            />
            <Image
              className={styles.pulseHeroSdk}
              src="/work/pulse/hero-sdk-isolated.png"
              alt=""
              width={636}
              height={959}
              sizes="(max-width: 700px) 20vw, 12vw"
              loading="eager"
            />
            <Image
              className={styles.pulseHeroDeveloper}
              src="/work/pulse/hero-developer-isolated.png"
              alt=""
              width={940}
              height={512}
              sizes="(max-width: 700px) 30vw, 18vw"
              loading="eager"
            />
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={project.image.endsWith('.gif')}
          />
        )}
        {project.href && (
          <span className={styles.projectOpen} aria-hidden="true">↗</span>
        )}
      </div>
      <div className={styles.projectBody}>
        <div className={styles.projectMeta}>
          {project.companyLogos ? (
            <span className={styles.projectCompanyLogos}>
              {project.companyLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  className={styles.projectCompanyLogo}
                  data-company={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              ))}
            </span>
          ) : (
            <Image
              className={styles.projectCompanyLogo}
              data-company={project.companyLogoAlt}
              src={project.companyLogo}
              alt={project.companyLogoAlt}
              width={project.companyLogoWidth}
              height={project.companyLogoHeight}
            />
          )}
          {project.period && <span>{project.period}</span>}
        </div>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <ul className={styles.projectAttributes} aria-label="Project attributes" role="list">
          {project.attributes.map((attribute) => (
            <li key={attribute}>{attribute}</li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <motion.article
      {...reveal}
      className={styles.projectCardOuter}
      id={`project-${project.id}`}
    >
      <div
        className={styles.projectCard}
        data-actionable={project.href ? 'true' : undefined}
        ref={cardRef}
        onPointerEnter={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        onBlur={resetPointer}
      >
        {project.href ? (
          <Link className={styles.projectLink} href={project.href}>
            {content}
          </Link>
        ) : (
          <div className={styles.projectPreview}>{content}</div>
        )}
      </div>
    </motion.article>
  );
}

const projectsById = new Map(productionHomeProjects.map((project) => [project.id, project]));

function SelectedWork() {
  return (
    <section className={styles.work} id="featured-work" aria-labelledby="case-study-heading">
      <div className={styles.frame}>
        <h2 className={styles.workHeading} id="case-study-heading">Case Study</h2>
        <div className={styles.workGroups}>
          {homeWorkGroups.map((group) => {
            const headingId = `work-group-${group.id}-heading`;
            return (
              <section className={styles.workGroup} key={group.id} aria-labelledby={headingId}>
                <motion.header {...reveal} className={styles.workGroupHeader}>
                  <h3 className={styles.workGroupTitle} id={headingId}>{group.title}</h3>
                  <p className={styles.workGroupIntro}>{group.intro}</p>
                </motion.header>
                <div className={styles.projectGrid}>
                  {group.projectIds.map((id) => (
                    <ProjectCard key={id} project={projectsById.get(id)} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className={styles.aboutTransition}
      id="about"
      aria-labelledby="about-heading"
    >
      <AboutLanyard />
      <div className={styles.about}>
        <div className={`${styles.frame} ${styles.aboutFrame}`}>
          <div className={styles.aboutHeader}>
            <div className={styles.aboutLanyardSpace} aria-hidden="true" />
            <div className={styles.aboutProse}>
              <h2 id="about-heading">
                Hi, I’m Olumide (Lums). I design for millions, and for the few. And I build what
                I design.
              </h2>
              <div className={styles.aboutCopy}>
                <p>
                  {homeAboutLeadParts.map((part, index) => (
                    <Fragment key={index}>
                      {typeof part === 'string' ? part : (
                        <a
                          className={styles.aboutLink}
                          href={part.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {part.text}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </Fragment>
                  ))}
                </p>
                <p>
                  I&apos;m curious by default and collaborative by nature. I ask a lot of
                  questions, challenge assumptions and like working with people who bring
                  different perspectives to the table. These days, AI is also deeply embedded
                  in how I work, from research and ideation to prototyping, design systems and
                  production-ready builds. The goal is pretty simple: understand the problem,
                  make the work better, and get useful things shipped.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.aboutLogos}>
            <LogoTicker />
          </div>
          <Capabilities />
        </div>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className={styles.career} id="career" aria-labelledby="career-heading">
      <div className={styles.frame}>
        <motion.div {...reveal} className={styles.careerHeader}>
          <p className={styles.sectionKicker} key="label">Career overview</p>
          <h2 id="career-heading" key="heading">A path shaped by curiosity and the problems that asked more of me.</h2>
          <Link className={styles.inverseTextLink} href="/resume" key="resume">
            View résumé <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <ol className={styles.careerTimeline} aria-label="Career and project experience">
          {career.map((item) => (
            <li
              className={styles.careerEntry}
              key={`${item.company}-${item.period}`}
            >
              <span className={styles.careerMarker} aria-hidden="true" key="marker" />
              {item.project ? (
                <motion.p {...reveal} className={styles.careerDate} key="date">{item.period}</motion.p>
              ) : (
                <motion.time {...reveal} className={styles.careerDate} key="date">{item.period}</motion.time>
              )}
              <motion.div {...reveal} className={styles.careerDetails} key="details">
                <CareerCompanyTitle company={item.company} key="company" />
                <p className={styles.careerRole} key="role">{item.role}</p>
                <p className={styles.careerDescription} key="description">{item.description}</p>
                <ul className={styles.careerTags} aria-label={`${item.company} capabilities`} key="tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </motion.div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

function Capabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.capabilities} id="skills">
      <ul className={styles.capabilityGrid} aria-label="Capabilities">
        {capabilities.map((capability, index) => (
          <li className={styles.capabilityItem} key={capability.id}>
            <span className={styles.capabilityIcon} aria-hidden="true">
              <motion.svg
                viewBox="0 0 24 24"
                focusable="false"
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                {capability.paths.map((path) => (
                  <motion.path
                    d={path}
                    key={path}
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          duration: reduceMotion ? 0 : 0.6,
                          delay: reduceMotion ? 0 : index * 0.06,
                          ease: 'easeOut',
                        },
                      },
                    }}
                  />
                ))}
              </motion.svg>
            </span>
            <div>
              <h3>{capability.label}</h3>
              <p>{capability.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Recommendations() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const positionRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const scrollByCard = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector(`.${styles.recommendationCard}`);
    const step = card ? card.offsetWidth + 24 : 400;
    const half = row.scrollWidth / 2;
    let nextPosition = positionRef.current + (direction === 'next' ? step : -step);
    if (nextPosition < 0) nextPosition += half > 0 ? half : 0;
    if (half > 0 && nextPosition >= half) nextPosition -= half;
    positionRef.current = nextPosition;
    row.scrollLeft = nextPosition;
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row || reduceMotion) return undefined;

    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (section) observer.observe(section);

    let animationFrame;
    let lastTime = performance.now();
    const pixelsPerSecond = 42;

    const tick = (now) => {
      const elapsed = Math.min(now - lastTime, 50);
      lastTime = now;
      if (!pausedRef.current && visibleRef.current) {
        const half = row.scrollWidth / 2;
        if (half > 0) {
          positionRef.current += (pixelsPerSecond * elapsed) / 1000;
          if (positionRef.current >= half) positionRef.current -= half;
          row.scrollLeft = positionRef.current;
        }
      } else {
        positionRef.current = row.scrollLeft;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  const resumeAfterTouch = () => {
    window.setTimeout(() => {
      if (rowRef.current) positionRef.current = rowRef.current.scrollLeft;
      pausedRef.current = rowRef.current?.contains(document.activeElement) ?? false;
    }, 800);
  };

  return (
    <section
      className={styles.recommendations}
      id="recommendations"
      aria-labelledby="recommendations-heading"
      ref={sectionRef}
    >
      <div className={styles.frame}>
        <motion.div {...reveal} className={styles.recommendationsHeader}>
          <h2 id="recommendations-heading">Words from people I&apos;ve built with</h2>
          <div
            className={styles.recommendationControls}
            role="group"
            aria-label="Recommendation carousel controls"
          >
            <button
              type="button"
              aria-label="Previous recommendation"
              onClick={() => scrollByCard('previous')}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next recommendation"
              onClick={() => scrollByCard('next')}
            >
              <ArrowIcon />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        className={styles.recommendationViewport}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={(event) => {
          pausedRef.current = event.currentTarget.contains(document.activeElement);
        }}
        onFocus={() => {
          pausedRef.current = true;
        }}
        onBlur={(event) => {
          pausedRef.current = event.currentTarget.contains(event.relatedTarget)
            || event.currentTarget.matches(':hover');
        }}
        onTouchStart={() => {
          pausedRef.current = true;
        }}
        onTouchEnd={resumeAfterTouch}
        onTouchCancel={resumeAfterTouch}
      >
        <ul className={styles.recommendationRow} ref={rowRef}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <li
              className={styles.recommendationCard}
              aria-hidden={index >= testimonials.length ? 'true' : undefined}
              key={`${testimonial.name}-${index}`}
            >
              <span className={styles.quoteMark} aria-hidden="true">
                &ldquo;
              </span>
              <p>{testimonial.quote}</p>
              <a
                className={styles.recommendationAuthor}
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={index >= testimonials.length ? -1 : undefined}
                aria-label={`${testimonial.name}, ${testimonial.role} at ${testimonial.company}. LinkedIn (opens in a new tab)`}
              >
                <span className={styles.recommendationAvatar} aria-hidden="true">
                  {testimonial.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role} · {testimonial.company}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AskLumsShell() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const shellRef = useRef(null);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;
    const clearPlacement = () => {
      delete shell.dataset.placement;
      shell.style.removeProperty('--ask-launcher-top');
    };
    if (open) {
      clearPlacement();
      return undefined;
    }

    const launcher = launcherRef.current;
    const heading = document.getElementById('about-heading');
    if (!launcher || !heading) return undefined;
    const shortScreen = window.matchMedia('(max-width: 700px) and (max-height: 700px)');
    let restingBottom = 12;
    let blurFrame;

    const syncPlacement = () => {
      if (!shortScreen.matches) {
        clearPlacement();
        return;
      }
      // Keep a keyboard target steady until focus leaves it.
      if (launcher.matches(':focus-visible')) return;
      const bounds = heading.getBoundingClientRect();
      const height = launcher.offsetHeight;
      const restingTop = window.innerHeight - restingBottom - height;
      if (bounds.top < restingTop + height + 12 && bounds.bottom > restingTop - 12) {
        // The short-screen portrait reserve leaves this gap above the introduction.
        shell.style.setProperty('--ask-launcher-top', `${bounds.top - height - 12}px`);
        shell.dataset.placement = 'about-intro';
      } else {
        clearPlacement();
      }
    };
    const refreshPlacement = () => {
      clearPlacement();
      restingBottom = Number.parseFloat(window.getComputedStyle(shell).bottom) || 12;
      syncPlacement();
    };
    const syncAfterBlur = () => {
      cancelAnimationFrame(blurFrame);
      blurFrame = requestAnimationFrame(syncPlacement);
    };

    refreshPlacement();
    const observer = new ResizeObserver(syncPlacement);
    observer.observe(heading);
    window.addEventListener('scroll', syncPlacement, { passive: true });
    window.addEventListener('resize', refreshPlacement);
    shortScreen.addEventListener('change', refreshPlacement);
    launcher.addEventListener('blur', syncAfterBlur);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncPlacement);
      window.removeEventListener('resize', refreshPlacement);
      shortScreen.removeEventListener('change', refreshPlacement);
      launcher.removeEventListener('blur', syncAfterBlur);
      cancelAnimationFrame(blurFrame);
      clearPlacement();
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    // SVG backdrop refraction is a Chromium enhancement; other engines keep layered glass.
    const chromium = navigator.userAgentData?.brands?.some(({ brand }) => /Chromium|Chrome|Edge/.test(brand))
      || /Chrome|Chromium|Edg\//.test(navigator.userAgent);
    if (chromium && CSS.supports('backdrop-filter', 'url("#ask-lums-lens")')) {
      launcherRef.current?.setAttribute('data-lens', 'true');
    }
    const syncGlassVisibility = () => {
      launcherRef.current?.style.setProperty('--glass-play-state', document.hidden ? 'paused' : 'running');
    };
    syncGlassVisibility();
    document.addEventListener('visibilitychange', syncGlassVisibility);
    return () => document.removeEventListener('visibilitychange', syncGlassVisibility);
  }, [open]);

  const handleOpen = () => {
    // Mount and focus within the launch gesture so mobile keyboards can open too.
    flushSync(() => setOpen(true));
    inputRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handleEscape);

    const focusFrame = !open && wasOpenRef.current
      ? requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }))
      : null;
    wasOpenRef.current = open;

    return () => {
      window.removeEventListener('keydown', handleEscape);
      if (focusFrame !== null) cancelAnimationFrame(focusFrame);
    };
  }, [open]);

  return (
    <motion.div
      className={styles.askShell}
      ref={shellRef}
      data-open={open}
      layout={!reduceMotion}
      transition={{ layout: { duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' } }}
    >
      <svg className={styles.askLensDefinitions} aria-hidden="true" focusable="false">
        <defs>
          <filter id="ask-lums-lens" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage href="/images/ask-lums-lens-map.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="rim-map" />
            <feDisplacementMap in="SourceGraphic" in2="rim-map" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <AnimatePresence initial={false} mode="popLayout">
        {!open ? (
          <motion.button
            className={styles.askLauncher}
            type="button"
            ref={launcherRef}
            aria-haspopup="dialog"
            aria-expanded="false"
            onClick={handleOpen}
            key="ask-launcher"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.1, ease: 'easeOut' }}
          >
            <span className={styles.askLauncherGlow} aria-hidden="true" />
            <span className={styles.askLauncherBorder} aria-hidden="true" />
            <span className={styles.askLauncherMark} aria-hidden="true">
              <SparkleIcon />
            </span>
            <span>Ask Lums AI</span>
          </motion.button>
        ) : (
          <motion.section
            className={styles.askPanel}
            role="dialog"
            aria-modal="false"
            aria-labelledby="ask-lums-dialog-title"
            key="ask-panel"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0.48, scaleX: 0.285, scaleY: 0.18 }
            }
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0.36, scaleX: 0.285, scaleY: 0.18 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: '50% 100%' }}
          >
            <div className={styles.askPanelHeader}>
              <div className={styles.askIdentity}>
                <span className={styles.askPanelSparkle} aria-hidden="true">
                  <SparkleIcon />
                </span>
                <div>
                  <h2 id="ask-lums-dialog-title">Ask Lums AI</h2>
                  <p className={styles.askIntro}>
                    My AI doppelgänger, available 24/7 even when I&apos;m not.
                  </p>
                </div>
              </div>
              <button
                className={styles.askClose}
                type="button"
                aria-label="Close Ask Lums AI"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <AskLums inputRef={inputRef} />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <MotionConfig reducedMotion="user">
        <main className={`${styles.homePage} theme2-home`}>
          <Hero />
          <About />
          <SelectedWork />
          <Career />
          <Recommendations />
          <AskLumsShell />
        </main>
      </MotionConfig>
    </PageTransition>
  );
}
