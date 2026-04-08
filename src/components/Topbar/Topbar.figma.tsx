import figma from '@figma/code-connect';
import { Topbar } from './Topbar';

figma.connect(
  Topbar,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=71-7',
  {
    props: {
      title: figma.string('title'),
    },
    example: ({ title }) => (
      <Topbar title={title} />
    ),
  }
);
