import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Design System/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  // Match Figma canvas — dark background, no extra padding wrapping
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

// ── Individual variants (mirrors Figma Trend=Up / Down / Neutral) ──────────

export const TrendUp: Story = {
  name: 'Trend — Up',
  args: {
    label: 'Total Revenue',
    value: '$48,295',
    trend: 'up',
    trendLabel: '+12% vs last month',
  },
};

export const TrendDown: Story = {
  name: 'Trend — Down',
  args: {
    label: 'Churn Rate',
    value: '3.2%',
    trend: 'down',
    trendLabel: '-0.4% this week',
  },
};

export const TrendNeutral: Story = {
  name: 'Trend — Neutral',
  args: {
    label: 'Active Users',
    value: '1,284',
    trend: 'neutral',
    trendLabel: 'No change',
  },
};

export const NoTrend: Story = {
  name: 'No trend',
  args: {
    label: 'API Calls',
    value: '2.4M',
  },
};

// ── Grid — matches the Figma component set side-by-side layout ─────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <StatCard label="Total Revenue" value="$48,295" trend="up"      trendLabel="+12% vs last month" />
      <StatCard label="Churn Rate"    value="3.2%"    trend="down"    trendLabel="-0.4% this week"    />
      <StatCard label="Active Users"  value="1,284"   trend="neutral" trendLabel="No change"          />
      <StatCard label="API Calls"     value="2.4M"                                                    />
    </div>
  ),
};
