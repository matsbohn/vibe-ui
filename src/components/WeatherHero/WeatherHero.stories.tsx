import type { Meta, StoryObj } from '@storybook/react';
import { WeatherHero } from './WeatherHero';

// Figma node: 172-25 (WeatherHero/Default)

const meta: Meta<typeof WeatherHero> = {
  title: 'Design System/WeatherHero',
  component: WeatherHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    condition: {
      control: { type: 'select' },
      options: [
        'Clear', 'Partly Cloudy', 'Cloudy', 'Fog',
        'Rain', 'Heavy Rain', 'Snow', 'Heavy Snow',
        'Sleet', 'Thunder', 'Mixed',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeatherHero>;

// ── Default (mirrors Figma WeatherHero/Default) ────────────────────────────
export const Default: Story = {
  args: {
    country:       '🇳🇴 Norway',
    date:          '8 May 2026',
    avgTemp:       9.4,
    cityCount:     5,
    condition:     'Partly Cloudy',
    maxWind:       16.2,
    precipitation: 19.1,
  },
};

// ── Summer day ────────────────────────────────────────────────────────────
export const SummerDay: Story = {
  args: {
    country:       '🇳🇴 Norway',
    date:          '15 July 2026',
    avgTemp:       22.5,
    cityCount:     5,
    condition:     'Clear',
    maxWind:       3.2,
    precipitation: 0,
  },
};

// ── Storm conditions ──────────────────────────────────────────────────────
export const Storm: Story = {
  args: {
    country:       '🇳🇴 Norway',
    date:          '3 November 2026',
    avgTemp:       4.1,
    cityCount:     5,
    condition:     'Thunder',
    maxWind:       22.8,
    precipitation: 34.5,
  },
};

// ── Winter / snow ─────────────────────────────────────────────────────────
export const Winter: Story = {
  args: {
    country:       '🇳🇴 Norway',
    date:          '20 January 2026',
    avgTemp:       -4.2,
    cityCount:     5,
    condition:     'Snow',
    maxWind:       8.1,
    precipitation: 12.0,
  },
};

// ── Single city ───────────────────────────────────────────────────────────
export const SingleCity: Story = {
  args: {
    country:       '🇳🇴 Oslo',
    date:          '8 May 2026',
    avgTemp:       12.3,
    cityCount:     1,
    condition:     'Partly Cloudy',
    maxWind:       4.2,
    precipitation: 0,
  },
};
