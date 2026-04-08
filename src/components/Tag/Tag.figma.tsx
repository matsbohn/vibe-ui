import figma from '@figma/code-connect';
import { Tag } from './Tag';

figma.connect(
  Tag,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=50-13',
  {
    props: {
      label: figma.string('label'),
    },
    example: ({ label }) => (
      <Tag label={label} />
    ),
  }
);
