import type { Meta, StoryObj } from '@storybook/react';
import { WeatherHero } from './WeatherHero';

// Figma node: 172-25 (WeatherHero/Default)
// Shows city-centre temp + condition + area count only.
// Wind/precip/humidity live in the stat cards below — not duplicated here.

const meta: Meta<typeof WeatherHero> = {
  title: 'Design System/WeatherHero',
  component: WeatherHero,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    condition: {
      control: { type: 'select' },
      options: ['Clear', 'Partly Cloudy', 'Cloudy', 'Fog', 'Rain',
                'Heavy Rain', 'Snow', 'Heavy Snow', 'Sleet', 'Thunder', 'Mixed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeatherHero>;

export const Default: Story = {
  args: { country: '🇳🇴 Oslo', date: '8 May 2026', temp: 12.3, areaCount: 5, condition: 'Partly Cloudy' },
};

export const SummerDay: Story = {
  args: { country: '🇳🇴 Oslo', date: '15 July 2026', temp: 24.1, areaCount: 5, condition: 'Clear' },
};

export const Storm: Story = {
  args: { country: '🇳🇴 Stavanger', date: '3 November 2026', temp: 4.1, areaCount: 4, condition: 'Thunder' },
};

export const Winter: Story = {
  args: { country: '🇳🇴 Tromsø', date: '20 January 2026', temp: -4.2, areaCount: 3, condition: 'Snow' },
};

export const SingleArea: Story = {
  args: { country: '🇳🇴 Bergen', date: '8 May 2026', temp: 9.1, areaCount: 1, condition: 'Rain' },
};
