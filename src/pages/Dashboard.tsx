import './Dashboard.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { StatCard } from '../components/StatCard/StatCard';
import { Badge, BadgeVariant } from '../components/Badge/Badge';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';

// ─── Component library metadata ──────────────────────────────────────────────
interface ComponentMeta {
  name: string;
  variants: number;
  stories: number;
  figmaNodeId: string;
}

const COMPONENTS: ComponentMeta[] = [
  { name: 'Alert',      variants: 4, stories: 6, figmaNodeId: '53-35' },
  { name: 'Avatar',     variants: 3, stories: 4, figmaNodeId: '49-13' },
  { name: 'Badge',      variants: 5, stories: 6, figmaNodeId: '48-17' },
  { name: 'Breadcrumb', variants: 1, stories: 3, figmaNodeId: '62-13' },
  { name: 'Button',     variants: 3, stories: 3, figmaNodeId: '59-13' },
  { name: 'DataTable',  variants: 1, stories: 2, figmaNodeId: '68-7'  },
  { name: 'Dropdown',   variants: 2, stories: 3, figmaNodeId: '63-25' },
  { name: 'Modal',      variants: 1, stories: 3, figmaNodeId: '67-7'  },
  { name: 'Sidebar',    variants: 2, stories: 2, figmaNodeId: '71-12' },
  { name: 'StatCard',   variants: 3, stories: 5, figmaNodeId: '44-19' },
  { name: 'Tag',        variants: 2, stories: 3, figmaNodeId: '50-13' },
  { name: 'Toast',      variants: 4, stories: 6, figmaNodeId: '57-19' },
  { name: 'Topbar',     variants: 1, stories: 3, figmaNodeId: '71-7'  },
];

// ─── Activity feed ────────────────────────────────────────────────────────────
type ActivityType = 'feature' | 'update' | 'fix';

interface ActivityItem {
  date: string;
  message: string;
  type: ActivityType;
}

const ACTIVITY: ActivityItem[] = [
  { date: 'Apr 8, 2026', message: 'Rebuilt all 13 Figma components from React source to match exactly', type: 'update' },
  { date: 'Apr 8, 2026', message: 'Added Figma Code Connect for all 13 components', type: 'feature' },
  { date: 'Apr 8, 2026', message: 'StatCard rebuilt from exact Figma MCP specs', type: 'fix' },
  { date: 'Apr 7, 2026', message: 'DataTable: added white-space nowrap and min-width story decorator', type: 'fix' },
  { date: 'Apr 6, 2026', message: 'Added 12 dashboard components with full Storybook stories', type: 'feature' },
  { date: 'Apr 5, 2026', message: 'Set up design token system in src/tokens.css', type: 'feature' },
];

const ACTIVITY_VARIANT: Record<ActivityType, BadgeVariant> = {
  feature: 'default',
  update:  'info',
  fix:     'warning',
};

// ─── Derived stats ─────────────────────────────────────────────────────────────
const TOTAL_STORIES  = COMPONENTS.reduce((sum, c) => sum + c.stories, 0);
const AVG_STORIES    = (TOTAL_STORIES / COMPONENTS.length).toFixed(1);
const TOTAL_VARIANTS = COMPONENTS.reduce((sum, c) => sum + c.variants, 0);

// ─── Component ────────────────────────────────────────────────────────────────
export function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar
        items={[
          { label: 'Dashboard', icon: '⊞', href: '#', active: true },
          { label: 'Components', icon: '◈', href: '#' },
          { label: 'Tokens', icon: '◉', href: '#' },
          { label: 'Settings', icon: '◌', href: '#' },
        ]}
      />

      <div className="dashboard__main">
        <Topbar title="Component Library" />

        <div className="dashboard__content">
          <Breadcrumb items={[{ label: 'vibe-ui', href: '#' }, { label: 'Dashboard' }]} />

          <h1 className="dashboard__heading">Dashboard</h1>

          {/* ── Summary stats ── */}
          <div className="dashboard__stats">
            <StatCard label="Total Components" value={COMPONENTS.length} />
            <StatCard label="Total Stories" value={TOTAL_STORIES} trend="up" trendLabel="+49 this sprint" />
            <StatCard label="Total Variants" value={TOTAL_VARIANTS} />
            <StatCard label="Figma Connected" value={`${COMPONENTS.length} / ${COMPONENTS.length}`} trend="up" trendLabel="100% coverage" />
          </div>

          {/* ── Component grid ── */}
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Components</h2>
            <div className="dashboard__grid">
              {COMPONENTS.map((comp) => (
                <div key={comp.name} className="component-card">
                  <div className="component-card__header">
                    <span className="component-card__name">{comp.name}</span>
                    <Badge label="stable" variant="success" />
                  </div>
                  <div className="component-card__meta">
                    <div className="component-card__stat">
                      <span className="component-card__stat-label">Variants</span>
                      <span className="component-card__stat-value">{comp.variants}</span>
                    </div>
                    <div className="component-card__stat">
                      <span className="component-card__stat-label">Stories</span>
                      <span className="component-card__stat-value">{comp.stories}</span>
                    </div>
                  </div>
                  <span className="component-card__node">#{comp.figmaNodeId}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Activity feed ── */}
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Recent Activity</h2>
            <div className="activity-feed">
              {ACTIVITY.map((item, i) => (
                <div key={i} className="activity-item">
                  <Badge label={item.type} variant={ACTIVITY_VARIANT[item.type]} />
                  <span className="activity-item__message">{item.message}</span>
                  <span className="activity-item__date">{item.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
