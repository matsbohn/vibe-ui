import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Design System/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: '640px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DataTable>;

type User = { name: string; email: string; role: string; status: string };

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
  { key: 'role' as const, header: 'Role' },
  {
    key: 'status' as const,
    header: 'Status',
    render: (val: unknown) => {
      const v = val as User['status'];
      return <Badge label={v} variant={v === 'Active' ? 'success' : v === 'Pending' ? 'warning' : 'error'} />;
    },
  },
];

const rows: User[] = [
  { name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
  { name: 'Carol Jones', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Dan Park', email: 'dan@example.com', role: 'Editor', status: 'Active' },
];

export const Default: Story = { args: { columns, rows } };
export const Empty: Story = { args: { columns, rows: [], emptyMessage: 'No users found.' } };
