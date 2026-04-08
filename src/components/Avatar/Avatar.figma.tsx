import figma from '@figma/code-connect';
import { Avatar } from './Avatar';

figma.connect(
  Avatar,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=49-13',
  {
    props: {
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      initials: figma.string('initials'),
    },
    example: ({ size, initials }) => (
      <Avatar size={size} initials={initials} />
    ),
  }
);
