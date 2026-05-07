import '../src/index.css';
import '../src/tokens.css';

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
      if (context.parameters.layout === 'fullscreen') return <Story />;

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color: '#1A1B22',
          background: '#F4F5F9',
          minHeight: '100vh',
          padding: '32px',
        }}>
          <Story />
        </div>
      );
    },
  ],
};
