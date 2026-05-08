import './WeatherHero.css';
import { weatherIconUrl } from '../../pages/WeatherDashboard';

export interface WeatherHeroProps {
  /** Country / region label, e.g. "🇳🇴 Norway" */
  country?: string;
  /** Formatted date string, e.g. "8 May 2026" */
  date?: string;
  /** Average temperature across shown cities (°C) */
  avgTemp: number;
  /** Number of cities included in the average */
  cityCount: number;
  /** Current condition label, e.g. "Partly Cloudy" */
  condition: string;
  /** Maximum wind speed in m/s */
  maxWind: number;
  /** Total precipitation in mm */
  precipitation: number;
}

function fmt(n: number, decimals = 1): string {
  return n.toFixed(decimals);
}

/** Hero banner displayed at the top of the weather dashboard.
 *  Figma node: 172-25 (WeatherHero/Default)
 *  Icons: Basmilius weather-icons (fill/svg) via raw.githubusercontent.com
 */
export function WeatherHero({
  country       = '🇳🇴 Norway',
  date,
  avgTemp,
  cityCount,
  condition,
  maxWind,
  precipitation,
}: WeatherHeroProps) {
  const heroDate = date ?? new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="weather-hero">
      <div className="weather-hero__left">
        <p className="weather-hero__eyebrow">{country} · {heroDate}</p>
        <p className="weather-hero__temp">{fmt(avgTemp)}°C</p>
        <p className="weather-hero__subtitle">
          Avg across {cityCount} {cityCount === 1 ? 'city' : 'cities'} · {condition}
        </p>
        <div className="weather-hero__meta">
          <div className="weather-hero__meta-item">
            <span className="weather-hero__meta-label">Max Wind</span>
            <span className="weather-hero__meta-value">{fmt(maxWind)} m/s</span>
          </div>
          <div className="weather-hero__meta-item">
            <span className="weather-hero__meta-label">Precipitation</span>
            <span className="weather-hero__meta-value">{fmt(precipitation, 1)} mm</span>
          </div>
          <div className="weather-hero__meta-item">
            <span className="weather-hero__meta-label">Cities</span>
            <span className="weather-hero__meta-value">{cityCount}</span>
          </div>
        </div>
      </div>
      <img
        className="weather-hero__icon"
        src={weatherIconUrl(condition)}
        alt={condition}
      />
    </div>
  );
}
