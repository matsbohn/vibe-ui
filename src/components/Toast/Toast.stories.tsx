import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Design System/Toast',
  component: Toast,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = { args: { message: 'Operation completed.', variant: 'default' } };
export const Success: Story = { args: { message: 'Saved successfully.', variant: 'success' } };
export const Warning: Story = { args: { message: 'Quota almost reached.', variant: 'warning' } };
export const Error: Story = { args: { message: 'Failed to save changes.', variant: 'error' } };
export const Dismissible: Story = { args: { message: 'Click × to close.', variant: 'default', onClose: () => {} } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Toast message="Default notification." variant="default" />
      <Toast message="Saved successfully." variant="success" />
      <Toast message="Quota almost reached." variant="warning" />
      <Toast message="Failed to save changes." variant="error" />
    </div>
  ),
};
