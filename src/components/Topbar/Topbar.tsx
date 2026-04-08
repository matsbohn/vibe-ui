import './Topbar.css';
import { ReactNode } from 'react';

export interface TopbarProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
}

export function Topbar({ title, left, right }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        {left ?? (title && <span className="topbar__title">{title}</span>)}
      </div>
      {right && <div className="topbar__right">{right}</div>}
    </header>
  );
}
