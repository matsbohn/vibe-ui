import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';

const options = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'All time', value: 'all' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = { args: { options, placeholder: 'Select period…' } };
export const WithValue: Story = { args: { options, value: '30d' } };

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Dropdown options={options} placeholder="Select period…" value={val} onChange={setVal} />;
  },
};
