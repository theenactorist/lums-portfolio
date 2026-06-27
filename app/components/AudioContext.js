'use client';

import { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';

const AudioCtx = createContext(null);

const INTERACTIVE = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL']);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicRef = useRef(null);
  const clickRef = useRef(null);
  const isPlayingRef = useRef(false);

  const initAudio = useCallback(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio('/audio/music.mp3');
      musicRef.current.loop = true;
      musicRef.current.volume = 0.5;
    }
    if (!clickRef.current) {
      clickRef.current = new Audio('/audio/ui-click.wav');
      clickRef.current.volume = 0.3;
    }
  }, []);

  const playClick = useCallback(() => {
    if (!isPlayingRef.current) return;
    initAudio();
    clickRef.current.currentTime = 0;
    clickRef.current.play().catch(() => {});
  }, [initAudio]);

  // Global hover listener — fires once per interactive element entry (not on every child re-enter)
  useEffect(() => {
    const SELECTOR = 'a, button, [role="button"], input, select, textarea, label';
    const handleMouseOver = (e) => {
      if (!isPlayingRef.current) return;
      const el = e.target.closest(SELECTOR);
      if (!el) return;
      const from = e.relatedTarget?.closest(SELECTOR);
      if (from === el) return;
      playClick();
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [playClick]);

  const toggleMusic = () => {
    initAudio();
    clickRef.current.currentTime = 0;
    clickRef.current.play().catch(() => {});

    if (isPlayingRef.current) {
      musicRef.current.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      musicRef.current.play().catch(() => {});
      isPlayingRef.current = true;
      setIsPlaying(true);
    }
  };

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleMusic, playClick }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
