import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: 'Default', variant: 'default' } };
export const Success: Story = { args: { label: 'Active', variant: 'success' } };
export const Warning: Story = { args: { label: 'Pending', variant: 'warning' } };
export const Error: Story = { args: { label: 'Failed', variant: 'error' } };
export const Info: Story = { args: { label: 'Info', variant: 'info' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge label="Default" variant="default" />
      <Badge label="Active" variant="success" />
      <Badge label="Pending" variant="warning" />
      <Badge label="Failed" variant="error" />
      <Badge label="Info" variant="info" />
    </div>
  ),
};
