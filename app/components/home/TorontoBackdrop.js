'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { createTorontoRenderer, TORONTO_DURATION } from '../../../lib/torontoRenderer';

export default function TorontoBackdrop({ videoRef, className, setPlaybackPreference }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const seekTimeRef = useRef(null);
  const foregroundRef = useRef(true);
  const [ready, setReady] = useState(false);
  const [contextGeneration, setContextGeneration] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const themeRef = useRef(theme);
  const toggleRef = useRef(toggleTheme);

  useEffect(() => {
    themeRef.current = theme;
    toggleRef.current = toggleTheme;
    rendererRef.current?.renderAt(seekTimeRef.current ?? videoRef.current?.currentTime ?? 0, theme,
      { foreground: foregroundRef.current });
  }, [theme, toggleTheme, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return undefined;
    let active = true;
    let renderer;
    const initialization = new AbortController();

    const render = (mediaTime) => renderer?.renderAt(
      seekTimeRef.current ?? mediaTime ?? video.currentTime,
      themeRef.current, { foreground: foregroundRef.current });
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
      matteUrl: '/_toronto/foreground-alpha-v2.png',
      nightFloorUrl: '/_toronto/night-floor-v4.png?v=4-edge-final',
      floorProtectionUrl: '/_toronto/protected-objects-v4.png?v=4-edge-final',
      floorRugProtectionUrl: '/_toronto/protected-rug-v4.png?v=4-edge-final',
      signal: initialization.signal,
      dynamic: {
        url: '/_toronto/dynamic-alpha-atlas.png',
        rect: [820, 692, 350, 94], columns: 8, rows: 31,
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
        return { time: seconds, sourceTime: video.currentTime, theme: themeRef.current };
      };
      const api = {
        duration: TORONTO_DURATION,
        seek,
        setTheme(next) {
          if (next !== 'light' && next !== 'dark') throw new Error('Theme must be light or dark.');
          if (themeRef.current !== next) toggleRef.current();
          themeRef.current = next;
          render();
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
          return { ready: true, theme: themeRef.current, time: seekTimeRef.current ?? video.currentTime,
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
            renderer.renderAt(prior, themeRef.current, { foreground: foregroundRef.current });
          }
        },
        compareProtectedNight() {
          const prior = seekTimeRef.current ?? video.currentTime;
          try {
            renderer.renderAt(prior, 'dark', { foreground: true });
            return renderer.compareProtectedNight(prior);
          } finally {
            renderer.renderAt(prior, themeRef.current, { foreground: foregroundRef.current });
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
            renderer.renderAt(prior, themeRef.current, { foreground: foregroundRef.current });
          }
          return samples;
        },
      };
      window.__torontoPreview = api;
    }).catch(error => {
      if (!active || error.name === 'AbortError') return;
      console.error(error);
      window.__torontoPreview = { error: error.message };
    });

    const onPlay = () => { seekTimeRef.current = null; foregroundRef.current = true; };
    const onHfSeek = event => {
      seekTimeRef.current = event.detail.time;
      render();
    };
    video.addEventListener('play', onPlay);
    window.addEventListener('hf-seek', onHfSeek);
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
      window.removeEventListener('hf-seek', onHfSeek);
      renderer?.dispose();
      rendererRef.current = null;
      delete window.__torontoPreview;
    };
  }, [videoRef, setPlaybackPreference, contextGeneration]);

  return <canvas ref={canvasRef} className={className} data-toronto-composite="true"
    data-ready={ready} aria-hidden="true" style={{ opacity: ready ? 1 : 0 }} />;
}
