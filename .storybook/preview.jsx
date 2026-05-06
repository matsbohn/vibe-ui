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
      test: "todo"
    },

    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#242529' },
        { name: 'surface', value: '#373841' },
      ],
    },
  },

  decorators: [
    (Story, context) => {
      if (context.parameters.layout === 'fullscreen') {
        return <Story />;
      }
      return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#DCD9DB', background: '#242529', minHeight: '100vh', padding: '32px' }}>
          <Story />
        </div>
      );
    },
  ],
};