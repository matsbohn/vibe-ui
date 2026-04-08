import figma from '@figma/code-connect';
import { Badge } from './Badge';

figma.connect(
  Badge,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=48-17',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
        Info: 'info',
      }),
      label: figma.string('label'),
    },
    example: ({ variant, label }) => (
      <Badge variant={variant} label={label} />
    ),
  }
);
