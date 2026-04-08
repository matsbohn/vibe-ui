import figma from '@figma/code-connect';
import { Alert } from './Alert';

figma.connect(
  Alert,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=53-35',
  {
    props: {
      variant: figma.enum('Variant', {
        Info: 'info',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
      }),
      title: figma.string('title'),
      message: figma.string('message'),
    },
    example: ({ variant, title, message }) => (
      <Alert
        variant={variant}
        title={title}
        message={message}
      />
    ),
  }
);
