'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// themeSaved: true once the visitor has picked a theme with the toggle (saved in localStorage).
// mounted: false until the provider has read the saved theme. The provider swaps in after
// one frame and the page under it mounts again, so media can wait for this to load once.
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {}, themeSaved: false, mounted: false });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem('lums-theme-2');
      const initial = saved ?? 'light';
      setTheme(initial);
      setThemeSaved(saved !== null);
      setMounted(true);
      document.documentElement.setAttribute('data-theme', initial);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeSaved(true);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lums-theme-2', next);
  };

  // Prevent flash of wrong theme
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeSaved, mounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}
