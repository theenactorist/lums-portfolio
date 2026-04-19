'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './AudioContext';

export default function MusicToggle() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isPlaying, toggleMusic } = useAudio();

  return (
    <div
      className="music-toggle"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className={`music-toggle__btn ${isPlaying ? 'music-toggle__btn--playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-toggle__bars">
          <span className={`music-toggle__bar ${isPlaying ? 'music-toggle__bar--anim' : ''}`} style={{ animationDelay: '0ms' }} />
          <span className={`music-toggle__bar ${isPlaying ? 'music-toggle__bar--anim' : ''}`} style={{ animationDelay: '150ms' }} />
          <span className={`music-toggle__bar ${isPlaying ? 'music-toggle__bar--anim' : ''}`} style={{ animationDelay: '80ms' }} />
          <span className={`music-toggle__bar ${isPlaying ? 'music-toggle__bar--anim' : ''}`} style={{ animationDelay: '220ms' }} />
        </span>
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="music-toggle__tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {isPlaying ? 'Now playing — click to pause' : 'Enjoy some music while you peruse'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
