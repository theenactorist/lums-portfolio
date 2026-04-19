'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CobeGlobe = dynamic(() => import('./components/CobeGlobe'), { ssr: false });

export default function NotFound() {
  return (
    <main className="cosmic-404">
      {/* CSS-based parallax starfield */}
      <div className="cosmic-starfield" />

      <div className="cosmic-404__inner">
        {/* Header 4 [Globe] 4 Structure */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'nowrap' }}>
          <motion.h1 
            className="cosmic-404__code"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            4
          </motion.h1>

          <motion.div
            className="cosmic-404__globe-wrap"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CobeGlobe />
          </motion.div>

          <motion.h1 
            className="cosmic-404__code"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            4
          </motion.h1>
        </div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
        >
          <h2 className="cosmic-404__headline">Signal Lost</h2>
          <p className="cosmic-404__sub">
            Unlike the Artemis II crew, it seems you're completely lost in space. 
            The coordinates you entered don't exist in our known universe.
          </p>

          <Link href="/" className="cosmic-404__cta">
            Return to Base
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
