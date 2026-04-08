import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Design System/Tag',
  component: Tag,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { label: 'React' } };
export const Removable: Story = { args: { label: 'TypeScript', onRemove: () => {} } };

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      <Tag label="React" onRemove={() => {}} />
      <Tag label="TypeScript" onRemove={() => {}} />
      <Tag label="Vite" onRemove={() => {}} />
      <Tag label="Storybook" />
    </div>
  ),
};
