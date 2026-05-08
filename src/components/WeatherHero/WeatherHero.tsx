import './WeatherHero.css';
import { weatherIconUrl } from '../../pages/WeatherDashboard';

export interface WeatherHeroProps {
  /** Country / city label shown in the eyebrow, e.g. "🇳🇴 Oslo" */
  country?: string;
  /** Formatted date string — defaults to today */
  date?: string;
  /** City-centre temperature (°C) */
  temp: number;
  /** Number of areas in the selected city */
  areaCount: number;
  /** Current condition label, e.g. "Partly Cloudy" */
  condition: string;
}

function fmt(n: number, decimals = 1): string {
  return n.toFixed(decimals);
}

/** Hero banner at the top of the weather dashboard.
 *  Figma node: 172-25 (WeatherHero/Default)
 *  Shows city-centre temperature and condition only — wind/precip/humidity
 *  are already displayed in the stat cards directly below.
 */
export function WeatherHero({
  country    = '🇳🇴 Norway',
  date,
  temp,
  areaCount,
  condition,
}: WeatherHeroProps) {
  const heroDate = date ?? new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="weather-hero">
      <div className="weather-hero__left">
        <p className="weather-hero__eyebrow">{country} · {heroDate}</p>
        <p className="weather-hero__temp">{fmt(temp)}°C</p>
        <p className="weather-hero__subtitle">
          {condition} · {areaCount} {areaCount === 1 ? 'area' : 'areas'}
        </p>
      </div>
      <img
        className="weather-hero__icon"
        src={weatherIconUrl(condition)}
        alt={condition}
      />
    </div>
  );
}
