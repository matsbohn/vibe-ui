import { useEffect } from 'react';
import '../src/index.css';
import '../src/tokens.css';

// ── Theme toolbar ─────────────────────────────────────────────────────────────
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Toggle light / dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', icon: 'circle',        title: 'Light' },
        { value: 'dark',  icon: 'circlehollow',  title: 'Dark'  },
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
      const theme = context.globals.theme ?? 'light';

      useEffect(() => {
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        return () => document.documentElement.removeAttribute('data-theme');
      }, [theme]);

      if (context.parameters.layout === 'fullscreen') return <Story />;

      const bg    = theme === 'dark' ? '#242529' : '#F4F5F9';
      const color = theme === 'dark' ? '#DCD9DB' : '#1A1B22';

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
