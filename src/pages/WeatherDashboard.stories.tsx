import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { WeatherDashboard, MOCK_WEATHER } from './WeatherDashboard';

const meta: Meta<typeof WeatherDashboard> = {
  title: 'Pages/WeatherDashboard',
  component: WeatherDashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WeatherDashboard>;

/** Live data from the Met.no API — requires network access */
export const LiveData: Story = {};

/** Stable mock data for visual testing — no network required */
export const MockData: Story = {
  args: {
    _testData: MOCK_WEATHER,
  },
};

/** Storm scenario: Stavanger has wind > 15 m/s — shows warning Alert */
export const StormWarning: Story = {
  args: {
    _testData: MOCK_WEATHER.map((c) =>
      c.name === 'Bergen'
        ? { ...c, windMs: 18.5, conditionLabel: 'Thunder', badgeVariant: 'error', isStorm: true }
        : c
    ),
  },
};

/** Light mode — all cities in clear summer conditions */
export const LightMode: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        return () => document.documentElement.removeAttribute('data-theme');
      }, []);
      return <Story />;
    },
  ],
  parameters: {
    backgrounds: { default: 'light' },
  },
  args: {
    _testData: MOCK_WEATHER.map((c) => ({
      ...c,
      temp: c.temp + 12,
      windMs: 3.2,
      precipMm: 0,
      conditionLabel: 'Clear',
      badgeVariant: 'success' as const,
      isStorm: false,
    })),
  },
};

/** All cities in clear, warm conditions */
export const SummerDay: Story = {
  args: {
    _testData: MOCK_WEATHER.map((c) => ({
      ...c,
      temp: c.temp + 15,
      windMs: 2.1,
      precipMm: 0,
      conditionLabel: 'Clear',
      badgeVariant: 'success' as const,
      isStorm: false,
    })),
  },
};
