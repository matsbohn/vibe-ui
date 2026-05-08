import './Sidebar.css';
import { ReactNode } from 'react';

export interface SidebarItem {
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  badge?: string;
}

export interface SidebarProps {
  logo?: ReactNode;
  items: SidebarItem[];
  footer?: ReactNode;
  collapsed?: boolean;
  /** Called with the item label when a nav item is clicked */
  onItemClick?: (label: string) => void;
}

export function Sidebar({ logo, items, footer, collapsed = false, onItemClick }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {logo && <div className="sidebar__logo">{logo}</div>}
      <nav className="sidebar__nav" aria-label="Main navigation">
        <ul className="sidebar__list">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.href ?? '#'}
                className={`sidebar__item ${item.active ? 'sidebar__item--active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
                onClick={onItemClick ? (e) => { e.preventDefault(); onItemClick(item.label); } : undefined}
              >
                {item.icon && <span className="sidebar__icon">{item.icon}</span>}
                {!collapsed && <span className="sidebar__label">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="sidebar__badge">{item.badge}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {footer && !collapsed && <div className="sidebar__footer">{footer}</div>}
    </aside>
  );
}
