import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    children: 'Are you sure you want to delete this record? This action cannot be undone.',
    onClose: () => {},
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: 'Delete Record',
    children: 'This will permanently remove the entry from your database.',
    onClose: () => {},
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ padding: '7px 16px', background: 'transparent', border: '1px solid #5F6067', color: '#DCD9DB', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Cancel
        </button>
        <button style={{ padding: '7px 16px', background: '#F06060', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          Delete
        </button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{ padding: '8px 16px', background: '#A3A7F6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          Open Modal
        </button>
        <Modal open={open} title="Hello World" onClose={() => setOpen(false)}>
          <p style={{ margin: 0 }}>This modal was opened interactively. Click outside or × to close.</p>
        </Modal>
      </div>
    );
  },
};
