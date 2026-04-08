import figma from '@figma/code-connect';
import { Toast } from './Toast';

figma.connect(
  Toast,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=57-19',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
      }),
      message: figma.string('message'),
    },
    example: ({ variant, message }) => (
      <Toast variant={variant} message={message} />
    ),
  }
);
