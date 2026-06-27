'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem('lums-theme-2');
      const initial = saved ?? 'light';
      setTheme(initial);
      setMounted(true);
      document.documentElement.setAttribute('data-theme', initial);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lums-theme-2', next);
  };

  // Prevent flash of wrong theme
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
