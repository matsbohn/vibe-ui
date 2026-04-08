import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Design System/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ],
  },
};

export const Short: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Reports' },
    ],
  },
};

export const Deep: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'vibe-ui', href: '/projects/vibe-ui' },
      { label: 'Components', href: '/projects/vibe-ui/components' },
      { label: 'Button' },
    ],
  },
};
