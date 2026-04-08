import figma from '@figma/code-connect';
import { Breadcrumb } from './Breadcrumb';

figma.connect(
  Breadcrumb,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=62-13',
  {
    example: () => (
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Settings', href: '/settings' },
          { label: 'Profile' },
        ]}
      />
    ),
  }
);
