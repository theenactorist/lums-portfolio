'use client';

import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import OrbitalSkills from '../components/OrbitalSkills';

/* ============================================
   Animation Variants
   ============================================ */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true },
};

/* ============================================
   About Page (Lums Style)
   ============================================ */
export default function About() {
  return (
    <PageTransition>
      <main className="about-page">
        {/* ===== INTRO HERO (60/40 Split) ===== */}
        <section className="about-lums-intro section" id="about-intro">
          <div className="container">
            <div className="about-lums-hero__grid">
              {/* Left Content */}
              <motion.div className="about-lums-hero__text" {...fadeUp}>
                <h1 className="about-lums-hero__headline">
                  I don&apos;t just ship features. I design products people <span className="about-lums-hero__italic">actually</span> love.
                </h1>
                <p className="about-lums-hero__sub">
                  Most people call me Lums, a Senior Product Designer with 8+ years shipping across multiple markets. I build with AI and think in systems.
                </p>
              </motion.div>

              {/* Right Content (Orbital Skills) */}
              <motion.div
                className="about-lums-hero__portrait-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <OrbitalSkills />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== MY STORY ===== */}
        <section className="about-lums-story section" id="my-story">
          <div className="container">
            <motion.div className="about-lums-story__content" {...fadeUp}>
              <h2 className="about-lums-section-title">My Story</h2>
              
              <div className="about-lums-prose">
                <p>
                  I started out studying Civil Engineering, then made a deliberate pivot into design.
                  Turns out, the systems thinking that helps you calculate load on a bridge is the
                  exact same muscle that helps you architect a checkout flow. I spent three years at
                  agencies doing visual and motion work before I realised I didn&apos;t just want
                  things to look good. I wanted to solve the logic underneath.
                </p>
                <p>
                  Since then I&apos;ve designed across multiple markets and continents, with 5M+ people
                  using things I helped build. I mentor on ADPList (1,200+ minutes in), vibe-code
                  full-stack apps with AI, and I&apos;m currently deep in <em>Org Design for Design
                  Orgs</em>. My colleagues will tell you two things about me: I care obsessively about
                  the work, and I have a laugh you can hear from two floors up. Data is music to me.
                  The only thing that keeps me genuinely humble is how fast AI design tools are
                  shipping. By the time you finish reading this, there&apos;s probably a new model to try.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== DESIGN PROCESS & PHILOSOPHIES ===== */}
        <section className="about-lums-philosophy section" id="philosophy">
          <div className="container">
            <motion.div className="about-lums-philosophy__content" {...fadeUp}>
              <h2 className="about-lums-section-title">Design Philosophy</h2>
              
              <div className="about-lums-prose">
                <p>
                  I don't believe in rigid frameworks that stall momentum. Instead, I focus on shipping value safely and quickly. Here is how I think about building products:
                </p>
                <ul className="about-lums-list">
                  <li><strong>Design isn't just screens, it's systems:</strong> I don't stop at the UI. I love digging into how components connect, scale, and behave across an entire ecosystem.</li>
                  <li><strong>AI amplifies craft, it doesn't replace it:</strong> I leverage AI to handle the heavy lifting of zero-to-one exploration, giving me the mental space to obsess over human nuance, product strategy, and visual polish.</li>
                  <li><strong>Iterate while the paint is still wet:</strong> I believe in putting ideas in front of users fast. We learn exponentially more from a broken prototype in a user's hands than a perfect file on a canvas.</li>
                  <li><strong>Carry the engineers along:</strong> A design only matters if it ships. I design with the backend in mind, writing clear documentation and obsessing over clean handoffs so developers actually enjoy building what we design.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== THINGS I LOVE ===== */}
        <section className="about-lums-loves section" id="things-i-love">
          <div className="container">
            <motion.div className="about-lums-loves__header" {...fadeUp}>
              <h2 className="about-lums-section-title">Things I Love</h2>
            </motion.div>

            <motion.div 
              className="about-lums-loves__grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.div className="about-lums-loves__card" variants={staggerItem}>
                <div className="about-lums-loves__icon">🌱</div>
                <h3 className="about-lums-loves__title">Mentorship</h3>
                <p className="about-lums-loves__desc">
                  I believe deeply in lifting as you climb. Between ADPList and Beyond Theory, I have spent over 1,200 minutes across 40+ sessions guiding junior designers through portfolio reviews, career transitions, and navigating fintech UX. 
                </p>
              </motion.div>

              <motion.div className="about-lums-loves__card" variants={staggerItem}>
                <div className="about-lums-loves__icon">🎥</div>
                <h3 className="about-lums-loves__title">Directing Livestreams</h3>
                <p className="about-lums-loves__desc">
                  When I step away from pushing pixels on a canvas, you will often find me directing live streams as a volunteer. It flexes a completely different type of creative focus, spatial awareness, and real-time execution.
                </p>
              </motion.div>

              <motion.div className="about-lums-loves__card" variants={staggerItem}>
                <div className="about-lums-loves__icon">⚡</div>
                <h3 className="about-lums-loves__title">Vibecoding</h3>
                <p className="about-lums-loves__desc">
                  I am a passionate AI-native builder. I build full-stack, production-ready applications through AI pair programming (like exactly what you are reading right now). A designer who understands how things are built, builds markedly better things.
                </p>
              </motion.div>

              <motion.div className="about-lums-loves__card" variants={staggerItem}>
                <div className="about-lums-loves__icon">📚</div>
                <h3 className="about-lums-loves__title">Continuous Learning</h3>
                <p className="about-lums-loves__desc">
                  I dedicate at least 1 hour every single day to studying design trends. Currently, I'm deeply reading <em>Org Design for Design Orgs</em> and heavily researching Generative UI patterns for AI-forward products.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
