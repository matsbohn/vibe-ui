import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    // Auto-wrap any prop starting with "on" + uppercase letter with an action
    // handler — no extra package required, works with Storybook v10.
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    label: 'Button',
  },
};

// ── All variants — mirrors the Figma component set layout ──────────────────
// Hover and Focus states are CSS-native (: hover / :focus-visible).
// Primary hover:   opacity 0.88  ·  Secondary hover: accent-subtle bg + accent border
// Focus:           2px accent outline, offset 2px
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary"   label="Primary"   />
      <Button variant="secondary" label="Secondary" />
      <Button variant="disabled"  label="Disabled"  />
    </div>
  ),
};
