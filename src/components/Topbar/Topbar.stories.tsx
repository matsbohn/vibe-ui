import type { Meta, StoryObj } from '@storybook/react';
import { Topbar } from './Topbar';
import { Avatar } from '../Avatar/Avatar';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Topbar> = {
  title: 'Design System/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 0 }}><Story /></div>],
  parameters: { backgrounds: { default: 'surface' } },
};
export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  args: { title: 'Dashboard' },
};

export const WithBreadcrumb: Story = {
  args: {
    left: (
      <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Analytics' }]} />
    ),
    right: <Avatar initials="MB" size="sm" />,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Users',
    right: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Badge label="Beta" variant="default" />
        <Avatar initials="AC" size="sm" />
      </div>
    ),
  },
};
