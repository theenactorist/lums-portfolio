'use client';

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useSyncExternalStore } from 'react';
import { readSavedTheme, resolveTheme, saveTheme, themeForTime } from '../../../lib/theme';

// The theme lives on <html data-theme>, written before the first paint by the inline script in
// app/layout.js (lib/theme.js has the rule). This provider reads it from there instead of picking
// its own, and renders from the first render, so the page under it is built once.
//
// theme: 'light' or 'dark'. themeSaved: true when the visitor picked it with the toggle.
// mounted: false only while the server-rendered page hydrates, before the theme can be read;
// anything that must match the visitor's theme (logo files, the Toronto scene) waits for it.
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {}, themeSaved: false, mounted: false });

export function useTheme() {
  return useContext(ThemeContext);
}

const THEME_CHANGE = 'lums-theme-change';

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener(THEME_CHANGE, onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener(THEME_CHANGE, onChange);
  };
}

// A string, so React can compare snapshots by value.
function getSnapshot() {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  return `${theme}:${readSavedTheme() ? 'saved' : 'auto'}`;
}

const getServerSnapshot = () => null;

export default function ThemeProvider({ children }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = snapshot !== null;
  const theme = mounted ? snapshot.split(':')[0] : 'light';
  const themeSaved = mounted && snapshot.endsWith(':saved');

  // When React renders a page on the client instead of hydrating it (the missing-page route
  // streams Next's error shell first), it clears <html>'s attributes, including the one the
  // inline script wrote. Put it back before the browser paints.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    if (current !== 'light' && current !== 'dark') root.setAttribute('data-theme', resolveTheme());
  }, []);

  // With no saved choice, check the clock again only when the tab comes back into view, so the
  // colours never change while someone is reading.
  useEffect(() => {
    const recheck = () => {
      if (document.visibilityState !== 'visible' || readSavedTheme()) return;
      const next = themeForTime(new Date());
      if (document.documentElement.getAttribute('data-theme') !== next) {
        document.documentElement.setAttribute('data-theme', next);
      }
    };
    document.addEventListener('visibilitychange', recheck);
    return () => document.removeEventListener('visibilitychange', recheck);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    // Also covers the case where only the saved flag changed.
    window.dispatchEvent(new Event(THEME_CHANGE));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, themeSaved, mounted }), [theme, toggleTheme, themeSaved, mounted]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
