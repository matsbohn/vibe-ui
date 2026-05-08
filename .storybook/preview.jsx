import { useEffect } from 'react';
import '../src/index.css';
import '../src/tokens.css';

/** @type { import('@storybook/react-vite').Preview } */
export default {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        showName: true,
      },
    },
  },

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
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

      if (context.parameters.layout === 'fullscreen') return <Story />;

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color: 'var(--text-primary)',
          background: 'var(--background)',
          minHeight: '100vh',
          padding: '32px',
        }}>
          <Story />
        </div>
      );
    },
  ],
};
