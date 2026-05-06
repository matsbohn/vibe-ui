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
