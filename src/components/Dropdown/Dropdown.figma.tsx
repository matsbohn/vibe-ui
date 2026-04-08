import figma from '@figma/code-connect';
import { Dropdown } from './Dropdown';

figma.connect(
  Dropdown,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=63-25',
  {
    props: {
      open: figma.boolean('Open'),
    },
    example: ({ open: _open }) => (
      <Dropdown
        options={[
          { label: 'Last 7 days', value: '7d' },
          { label: 'Last 30 days', value: '30d' },
          { label: 'Last 90 days', value: '90d' },
          { label: 'All time', value: 'all' },
        ]}
        placeholder="Select period…"
      />
    ),
  }
);
