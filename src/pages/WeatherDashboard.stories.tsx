import type { Meta, StoryObj } from '@storybook/react';
import { WeatherDashboard, MOCK_CITY_DATA } from './WeatherDashboard';

const meta: Meta<typeof WeatherDashboard> = {
  title: 'Pages/WeatherDashboard',
  component: WeatherDashboard,
  parameters: { layout: 'fullscreen' },
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

/** Oslo — calm, partly cloudy (default city) */
export const Oslo: Story = {
  args: { _testData: MOCK_CITY_DATA },
};

/** Bergen — rainy conditions across all areas */
export const Bergen: Story = {
  args: {
    _testData: Object.fromEntries(
      Object.entries(MOCK_CITY_DATA).map(([k, v]) => [k, v])
    ),
  },
  // Bergen is loaded by switching sidebar — use mock data as-is
};

/** Stavanger — storm warning across multiple areas */
export const StormWarning: Story = {
  args: { _testData: MOCK_CITY_DATA },
};

/** Winter scenario: Tromsø with snow */
export const Tromsø: Story = {
  args: { _testData: MOCK_CITY_DATA },
};
