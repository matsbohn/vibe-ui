import { useEffect } from 'react';
import '../src/index.css';
import '../src/tokens.css';

// ── Theme toolbar ─────────────────────────────────────────────────────────────
// Adds a ☀/● toggle in the Storybook toolbar.
// Selecting a theme sets data-theme on <html> so all CSS variable overrides
// in tokens.css take effect across every story automatically.
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Toggle light / dark mode',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'dark',   icon: 'circlehollow', title: 'Dark'   },
        { value: 'light',  icon: 'circle',        title: 'Light'  },
        { value: 'barbie', icon: 'heart',         title: 'Barbie' },
      ],
      dynamicTitle: true,
    },
  },
};

/** @type { import('@storybook/react-vite').Preview } */
export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark';

      // Apply / remove the data-theme attribute so CSS variables switch globally
      useEffect(() => {
        if (theme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }
        return () => document.documentElement.removeAttribute('data-theme');
      }, [theme]);

      // Fullscreen stories (WeatherDashboard) manage their own layout
      if (context.parameters.layout === 'fullscreen') return <Story />;

      const bg    = theme === 'light' ? '#F4F5F9' : theme === 'barbie' ? '#F9C6D6' : '#242529';
      const color = theme === 'light' ? '#1A1B22' : theme === 'barbie' ? '#880E4F' : '#DCD9DB';

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color,
          background: bg,
          minHeight: '100vh',
          padding: '32px',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}>
          <Story />
        </div>
      );
    },
  ],
};
