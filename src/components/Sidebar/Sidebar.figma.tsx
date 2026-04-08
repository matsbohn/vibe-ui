import figma from '@figma/code-connect';
import { Sidebar } from './Sidebar';

figma.connect(
  Sidebar,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=71-12',
  {
    props: {
      collapsed: figma.boolean('collapsed'),
    },
    example: ({ collapsed }) => (
      <Sidebar
        collapsed={collapsed}
        logo={<span style={{ fontWeight: 700, color: 'var(--accent)' }}>vibe-ui</span>}
        items={[
          { label: 'Dashboard', icon: '⊞', href: '/', active: true },
          { label: 'Analytics', icon: '◈', href: '/analytics' },
          { label: 'Users', icon: '◉', href: '/users', badge: '12' },
          { label: 'Settings', icon: '◎', href: '/settings' },
        ]}
      />
    ),
  }
);
