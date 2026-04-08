import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>,
  ],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const items = [
  { label: 'Dashboard', icon: '⊞', href: '/', active: true },
  { label: 'Analytics', icon: '◈', href: '/analytics' },
  { label: 'Users', icon: '◉', href: '/users', badge: '12' },
  { label: 'Settings', icon: '◎', href: '/settings' },
];

export const Default: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '16px', color: '#A3A7F6' }}>vibe-ui</span>,
    items,
    footer: <Avatar initials="MB" size="sm" />,
  },
};

export const Collapsed: Story = {
  args: { items, collapsed: true },
};
