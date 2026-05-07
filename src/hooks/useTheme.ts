import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'vibe-theme';

/**
 * Reads/writes the current theme.
 * - Persists to localStorage.
 * - Applies `data-theme="dark"` to <html> for dark mode;
 *   removes the attribute for light mode (default).
 */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // localStorage unavailable (e.g. SSR / Storybook iframe)
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return [theme, setThemeState];
}
