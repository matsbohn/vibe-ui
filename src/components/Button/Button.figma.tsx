import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=59-13',
  {
    props: {
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
        disabled: 'disabled',
      }),
      label: figma.string('label'),
    },
    example: ({ variant, label }) => (
      <Button variant={variant} label={label} />
    ),
  }
);
