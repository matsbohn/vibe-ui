import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Alert',
  component: Alert,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const InfoAlert: Story = {
  args: { variant: 'info', title: 'Heads up', message: 'This action will affect all users in the organisation.' },
};
export const SuccessAlert: Story = {
  args: { variant: 'success', title: 'Changes saved', message: 'Your settings have been updated successfully.' },
};
export const WarningAlert: Story = {
  args: { variant: 'warning', title: 'Approaching limit', message: "You've used 90% of your monthly quota." },
};
export const ErrorAlert: Story = {
  args: { variant: 'error', title: 'Request failed', message: 'Unable to connect to the server. Please try again.' },
};
export const Dismissible: Story = {
  args: { variant: 'info', message: 'Click the × to dismiss this alert.', onClose: () => {} },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
      <Alert variant="info" title="Info" message="An informational message." />
      <Alert variant="success" title="Success" message="Operation completed." />
      <Alert variant="warning" title="Warning" message="Proceed with caution." />
      <Alert variant="error" title="Error" message="Something went wrong." />
    </div>
  ),
};
