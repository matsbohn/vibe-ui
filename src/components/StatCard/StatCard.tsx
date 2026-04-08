import './StatCard.css';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  /** Metric name — displayed uppercase */
  label: string;
  /** Primary numeric value */
  value: string | number;
  /** Trend direction — controls arrow and colour */
  trend?: StatTrend;
  /** Trend description, e.g. "+12% vs last month" */
  trendLabel?: string;
}

const ARROW: Record<StatTrend, string> = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

export function StatCard({ label, value, trend, trendLabel }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {trend && trendLabel && (
        <p className={`stat-card__trend stat-card__trend--${trend}`}>
          {ARROW[trend]} {trendLabel}
        </p>
      )}
    </div>
  );
}
