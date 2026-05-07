import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'barbie';

const STORAGE_KEY = 'vibe-theme';

const CYCLE: Theme[] = ['dark', 'light', 'barbie'];

/**
 * Reads/writes the current theme.
 * - Persists to localStorage.
 * - Applies `data-theme="<theme>"` to <html> for non-dark themes;
 *   removes the attribute for dark mode (default).
 */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'barbie') return stored;
    } catch {
      // localStorage unavailable (e.g. SSR / Storybook iframe)
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = () =>
    setTheme((t) => CYCLE[(CYCLE.indexOf(t) + 1) % CYCLE.length]);

  return [theme, toggle];
}
