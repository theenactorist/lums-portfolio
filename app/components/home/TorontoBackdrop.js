'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { createTorontoRenderer, TORONTO_DURATION } from '../../../lib/torontoRenderer';

// Day or night scene: it follows the page theme (Olumide, 7 Nov 2026), light is day and dark is
// night. The theme itself comes from the visitor's saved choice or their clock (lib/theme.js).
const SCENE_FADE_MS = 1000;

// enabled: Home turns it on once the hero poster has loaded, so the scene's images don't
// share a slow connection with the first paint. The canvas stays hidden until it's ready.
export default function TorontoBackdrop({ videoRef, className, setPlaybackPreference, enabled = true }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const seekTimeRef = useRef(null);
  const foregroundRef = useRef(true);
  const [ready, setReady] = useState(false);
  const [contextGeneration, setContextGeneration] = useState(0);
  const { theme, toggleTheme, themeSaved, mounted: themeKnown } = useTheme();
  const themeRef = useRef(theme);
  const savedRef = useRef(themeSaved);
  const toggleRef = useRef(toggleTheme);
  // Scene mix: 0 is day, 1 is night. The target comes from the page theme (or a
  // review override); the mix fades to it when the theme changes.
  const sceneMixRef = useRef(null);
  const sceneTargetRef = useRef(null);
  const sceneOverrideRef = useRef(null);
  const fadeRef = useRef(null);
  const renderRef = useRef(() => {});

  const updateScene = useCallback((instant = false) => {
    const target = sceneOverrideRef.current ?? (themeRef.current === 'dark' ? 1 : 0);
    if (target === sceneTargetRef.current && (!instant || sceneMixRef.current === target)) return;
    sceneTargetRef.current = target;
    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    fadeRef.current = null;
    const from = sceneMixRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || from === null || reduceMotion) {
      sceneMixRef.current = target;
      renderRef.current();
      return;
    }
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / SCENE_FADE_MS);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2;
      sceneMixRef.current = from + (target - from) * eased;
      renderRef.current();
      fadeRef.current = progress < 1 ? requestAnimationFrame(step) : null;
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  // The first decision waits for the real theme and is instant, so a dark page never fades in
  // from a day scene; later theme changes (the toggle) fade.
  useEffect(() => {
    themeRef.current = theme;
    savedRef.current = themeSaved;
    toggleRef.current = toggleTheme;
    if (themeKnown) updateScene(sceneMixRef.current === null);
  }, [theme, themeSaved, toggleTheme, themeKnown, updateScene]);

  useEffect(() => () => {
    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    fadeRef.current = null;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !enabled) return undefined;
    let active = true;
    let renderer;
    const initialization = new AbortController();

    const render = (mediaTime) => renderer?.renderAt(
      seekTimeRef.current ?? mediaTime ?? video.currentTime,
      sceneMixRef.current ?? 0, { foreground: foregroundRef.current });
    renderRef.current = () => render();
    const frame = (_now, metadata) => {
      if (!active) return;
      render(metadata?.mediaTime);
      frameRef.current = video.requestVideoFrameCallback(frame);
    };
    const refresh = () => render();
    const refreshVisible = () => { if (document.visibilityState === 'visible') render(); };
    const contextLost = event => {
      event.preventDefault();
      setReady(false);
    };
    const contextRestored = () => setContextGeneration(value => value + 1);
    canvas.addEventListener('webglcontextlost', contextLost);
    canvas.addEventListener('webglcontextrestored', contextRestored);

    createTorontoRenderer(canvas, {
      video,
      matteUrl: '/_toronto/foreground-alpha-v3.png',
      nightFloorUrl: '/_toronto/night-floor-v5.webp?v=5-mask-fixes',
      floorProtectionUrl: '/_toronto/protected-objects-v5.png?v=5-mask-fixes',
      floorRugProtectionUrl: '/_toronto/protected-rug-v5.png?v=5-mask-fixes',
      signal: initialization.signal,
      dynamic: {
        url: '/_toronto/dynamic-alpha-atlas-v5.png?v=5-mask-fixes',
        rect: [820, 692, 350, 94], columns: 8, rows: 31,
        floorRect: [835, 856, 256, 24], floorChannel: 'green',
      },
    }).then((instance) => {
      if (!active) { instance.dispose(); return; }
      renderer = instance;
      rendererRef.current = instance;
      render();
      setReady(true);
      if (video.requestVideoFrameCallback) frameRef.current = video.requestVideoFrameCallback(frame);
      video.addEventListener('loadeddata', refresh);
      video.addEventListener('seeked', refresh);
      video.addEventListener('timeupdate', refresh);
      video.addEventListener('pause', refresh);
      video.addEventListener('playing', refresh);
      document.addEventListener('visibilitychange', refreshVisible);
      window.addEventListener('pageshow', refresh);

      // Review interface for local checks only (seek, scene, capture, pixel comparisons).
      // Production builds drop it; rendering and floor protection are the same in both.
      if (process.env.NODE_ENV !== 'production') {
        const seek = async (seconds, options = {}) => {
          setPlaybackPreference('pause');
          video.pause();
          seekTimeRef.current = Number(seconds);
          foregroundRef.current = options.foreground !== false;
          const target = ((Number(seconds) % TORONTO_DURATION) + TORONTO_DURATION) % TORONTO_DURATION;
          if (video.readyState < 1) {
            await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }));
          }
          if (Math.abs(video.currentTime - target) > 0.000001) {
            await new Promise(resolve => {
              video.addEventListener('seeked', resolve, { once: true });
              video.currentTime = target;
            });
          }
          render();
          return { time: seconds, sourceTime: video.currentTime, theme: themeRef.current, scene: sceneMixRef.current };
        };
        const api = {
          duration: TORONTO_DURATION,
          seek,
          // Changes the page theme through the site's toggle (a saved choice).
          setTheme(next) {
            if (next !== 'light' && next !== 'dark') throw new Error('Theme must be light or dark.');
            if (themeRef.current !== next) toggleRef.current();
            themeRef.current = next;
            savedRef.current = true;
            updateScene(true);
          },
          // Drives the scene directly, independent of the page theme. null returns
          // the scene to the page theme.
          setScene(next, { instant = true } = {}) {
            if (next !== null && next !== 'day' && next !== 'night') throw new Error('Scene must be day, night or null.');
            sceneOverrideRef.current = next === null ? null : next === 'night' ? 1 : 0;
            updateScene(instant);
          },
          pause() {
            setPlaybackPreference('pause');
            video.pause();
            seekTimeRef.current = video.currentTime;
            render();
          },
          play() {
            foregroundRef.current = true;
            seekTimeRef.current = null;
            setPlaybackPreference('play');
            return video.play();
          },
          getState() {
            return { ready: true, theme: themeRef.current, themeSaved: savedRef.current,
              scene: sceneMixRef.current, sceneTarget: sceneTargetRef.current,
              sceneSource: sceneOverrideRef.current !== null ? 'review' : 'page theme',
              time: seekTimeRef.current ?? video.currentTime,
              sourceTime: video.currentTime, paused: video.paused, width: canvas.width, height: canvas.height,
              foreground: foregroundRef.current };
          },
          capture() { render(); return canvas.toDataURL('image/png'); },
          compareRetainedForeground() {
            const prior = seekTimeRef.current ?? video.currentTime;
            try {
              renderer.renderAt(prior, 'light', { foreground: true });
              return { testedTheme: 'light', ...renderer.compareRetainedForeground(),
                intentionalException: 'The authorized night-only floor reflection cleanup is excluded from this light-theme preservation check.' };
            } finally {
              renderer.renderAt(prior, sceneMixRef.current ?? 0, { foreground: foregroundRef.current });
            }
          },
          compareProtectedNight() {
            const prior = seekTimeRef.current ?? video.currentTime;
            try {
              renderer.renderAt(prior, 'dark', { foreground: true });
              return renderer.compareProtectedNight(prior);
            } finally {
              renderer.renderAt(prior, sceneMixRef.current ?? 0, { foreground: foregroundRef.current });
            }
          },
          compareOutdoorLoop() {
            const prior = seekTimeRef.current ?? video.currentTime;
            const samples = {};
            const compare = (first, second) => {
              let changed = 0, maximum = 0, totalDifference = 0;
              for (let i = 0; i < first.length; i += 1) {
                const difference = Math.abs(first[i] - second[i]);
                if (difference) changed += 1;
                maximum = Math.max(maximum, difference);
                totalDifference += difference;
              }
              return { changedChannels: changed, maximumChannelDifference: maximum,
                meanAbsoluteChannelDifference: totalDifference / first.length,
                comparedChannels: first.length };
            };
            try {
              for (const mode of ['light', 'dark']) {
                renderer.renderAt(0, mode, { foreground: false });
                const first = renderer.readPixels();
                const at = time => {
                  renderer.renderAt(time, mode, { foreground: false });
                  return compare(first, renderer.readPixels());
                };
                samples[mode] = {
                  exactLoop: { seconds: [0, TORONTO_DURATION], ...at(TORONTO_DURATION) },
                  quarterCycleMotion: { seconds: [0, TORONTO_DURATION / 4], ...at(TORONTO_DURATION / 4) },
                  finalFrameToStart: { seconds: [0, TORONTO_DURATION - 1 / 24], ...at(TORONTO_DURATION - 1 / 24) },
                  firstAdjacentFrame: { seconds: [0, 1 / 24], ...at(1 / 24) },
                };
              }
            } finally {
              renderer.renderAt(prior, sceneMixRef.current ?? 0, { foreground: foregroundRef.current });
            }
            return samples;
          },
        };
        window.__torontoPreview = api;
      }
    }).catch(error => {
      if (!active || error.name === 'AbortError') return;
      // Without WebGL or an image, the canvas stays hidden and the original video shows.
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
        window.__torontoPreview = { error: error.message };
      }
    });

    const onPlay = () => { seekTimeRef.current = null; foregroundRef.current = true; };
    const onHfSeek = event => {
      seekTimeRef.current = event.detail.time;
      render();
    };
    video.addEventListener('play', onPlay);
    if (process.env.NODE_ENV !== 'production') window.addEventListener('hf-seek', onHfSeek);
    return () => {
      active = false;
      initialization.abort();
      if (frameRef.current !== null && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameRef.current);
      for (const event of ['loadeddata', 'seeked', 'timeupdate', 'pause', 'playing']) video.removeEventListener(event, refresh);
      document.removeEventListener('visibilitychange', refreshVisible);
      window.removeEventListener('pageshow', refresh);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      video.removeEventListener('play', onPlay);
      if (process.env.NODE_ENV !== 'production') window.removeEventListener('hf-seek', onHfSeek);
      renderer?.dispose();
      rendererRef.current = null;
      renderRef.current = () => {};
      if (process.env.NODE_ENV !== 'production') delete window.__torontoPreview;
    };
  }, [videoRef, setPlaybackPreference, contextGeneration, updateScene, enabled]);

  return <canvas ref={canvasRef} className={className} data-toronto-composite="true"
    data-ready={ready} aria-hidden="true" style={{ opacity: ready ? 1 : 0 }} />;
}
