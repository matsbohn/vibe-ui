import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import './WeatherDashboard.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { StatCard } from '../components/StatCard/StatCard';
import { DataTable } from '../components/DataTable/DataTable';
import type { Column } from '../components/DataTable/DataTable';
import { Badge } from '../components/Badge/Badge';
import type { BadgeVariant } from '../components/Badge/Badge';
import { Alert } from '../components/Alert/Alert';
import { Avatar } from '../components/Avatar/Avatar';
import { Tag } from '../components/Tag/Tag';
import { Toast } from '../components/Toast/Toast';
import { Modal } from '../components/Modal/Modal';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Button } from '../components/Button/Button';

// ─── City definitions ─────────────────────────────────────────────────────────
interface City { name: string; lat: number; lon: number; region: string }

const CITIES: City[] = [
  { name: 'Oslo',      lat: 59.9139, lon: 10.7522, region: 'East Norway' },
  { name: 'Bergen',    lat: 60.3913, lon: 5.3221,  region: 'West Norway' },
  { name: 'Trondheim', lat: 63.4305, lon: 10.3951, region: 'Central Norway' },
  { name: 'Stavanger', lat: 58.9700, lon: 5.7331,  region: 'SW Norway' },
  { name: 'Tromsø',    lat: 69.6489, lon: 18.9551, region: 'Northern Norway' },
];

// ─── Weather types ─────────────────────────────────────────────────────────────
interface HourForecast {
  time: string;
  temp: number;
  windMs: number;
  precipMm: number;
  conditionLabel: string;
  badgeVariant: BadgeVariant;
}

export interface CityWeather {
  name: string;
  region: string;
  temp: number;
  windMs: number;
  precipMm: number;
  humidity: number;
  conditionLabel: string;
  badgeVariant: BadgeVariant;
  isStorm: boolean;
  forecast: HourForecast[];
}

// ─── Table row type ────────────────────────────────────────────────────────────
interface WeatherRow extends Record<string, unknown> {
  city: string;
  region: string;
  temp: number;
  wind: number;
  precip: number;
  humidity: number;
  conditionLabel: string;
  badgeVariant: BadgeVariant;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function parseCondition(code: string): { label: string; variant: BadgeVariant } {
  const c = (code ?? '').toLowerCase();
  if (c.startsWith('clearsky') || c.startsWith('fair'))      return { label: 'Clear',        variant: 'success' };
  if (c.startsWith('partlycloudy'))                           return { label: 'Partly Cloudy', variant: 'default' };
  if (c === 'cloudy')                                         return { label: 'Cloudy',        variant: 'default' };
  if (c === 'fog')                                            return { label: 'Fog',           variant: 'default' };
  if (c.includes('thunder'))                                  return { label: 'Thunder',       variant: 'error'   };
  if (c.includes('heavysnow') || c.includes('heavysleet'))   return { label: 'Heavy Snow',    variant: 'error'   };
  if (c.includes('snow'))                                     return { label: 'Snow',          variant: 'info'    };
  if (c.includes('sleet'))                                    return { label: 'Sleet',         variant: 'warning' };
  if (c.includes('heavyrain'))                                return { label: 'Heavy Rain',    variant: 'warning' };
  if (c.includes('rain'))                                     return { label: 'Rain',          variant: 'info'    };
  return { label: 'Mixed', variant: 'default' };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchCity(city: City): Promise<CityWeather> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${city.lat}&lon=${city.lon}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'vibe-ui/1.0 https://github.com/matsbohn/vibe-ui' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${city.name}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = await res.json();
  const series = json.properties.timeseries;
  const cur = series[0];
  const inst = cur.data.instant.details;
  const next1h = cur.data.next_1_hours;
  const next6h = cur.data.next_6_hours;
  const symbolCode: string = next1h?.summary?.symbol_code ?? next6h?.summary?.symbol_code ?? 'cloudy';
  const { label, variant } = parseCondition(symbolCode);

  const forecast: HourForecast[] = series.slice(0, 12).map((s: any) => {
    const sc = s.data.next_1_hours?.summary?.symbol_code ?? '';
    const { label: fl, variant: fv } = parseCondition(sc);
    return {
      time: s.time,
      temp: s.data.instant.details.air_temperature,
      windMs: s.data.instant.details.wind_speed,
      precipMm: s.data.next_1_hours?.details?.precipitation_amount ?? 0,
      conditionLabel: fl,
      badgeVariant: fv,
    };
  });

  return {
    name: city.name,
    region: city.region,
    temp: inst.air_temperature,
    windMs: inst.wind_speed,
    precipMm: next6h?.details?.precipitation_amount ?? 0,
    humidity: inst.relative_humidity,
    conditionLabel: label,
    badgeVariant: variant,
    isStorm: inst.wind_speed > 15 || symbolCode.includes('thunder'),
    forecast,
  };
}

function fmt(n: number, decimals = 1): string {
  return n.toFixed(decimals);
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
}

// ─── Mock data (used in stories / when fetch is unavailable) ──────────────────
export const MOCK_WEATHER: CityWeather[] = [
  { name: 'Oslo',      region: 'East Norway',     temp: 12.3, windMs: 4.2,  precipMm: 0,   humidity: 68, conditionLabel: 'Partly Cloudy', badgeVariant: 'default', isStorm: false,
    forecast: [] },
  { name: 'Bergen',    region: 'West Norway',     temp: 9.1,  windMs: 11.5, precipMm: 8.4, humidity: 89, conditionLabel: 'Rain',          badgeVariant: 'info',    isStorm: false,
    forecast: [] },
  { name: 'Trondheim', region: 'Central Norway',  temp: 6.8,  windMs: 6.3,  precipMm: 2.1, humidity: 75, conditionLabel: 'Cloudy',        badgeVariant: 'default', isStorm: false,
    forecast: [] },
  { name: 'Stavanger', region: 'SW Norway',       temp: 11.0, windMs: 16.2, precipMm: 3.6, humidity: 80, conditionLabel: 'Heavy Rain',    badgeVariant: 'warning', isStorm: true,
    forecast: [] },
  { name: 'Tromsø',    region: 'Northern Norway', temp: -1.4, windMs: 8.7,  precipMm: 5.0, humidity: 72, conditionLabel: 'Snow',          badgeVariant: 'info',    isStorm: false,
    forecast: [] },
];

// ─── Component ────────────────────────────────────────────────────────────────
export interface WeatherDashboardProps {
  /** Bypass live API — useful in Storybook and tests */
  _testData?: CityWeather[];
}

export function WeatherDashboard({ _testData }: WeatherDashboardProps = {}) {
  const [theme, setTheme]                 = useTheme();
  const [data, setData]                   = useState<CityWeather[]>(_testData ?? []);
  const [loading, setLoading]             = useState(!_testData);
  const [error, setError]                 = useState<string | null>(null);
  const [selectedCity, setSelectedCity]   = useState<CityWeather | null>(null);
  const [toast, setToast]                 = useState<{ message: string; variant: 'success' | 'error' } | null>(null);
  const [focusCity, setFocusCity]         = useState('');
  const [activeCities, setActiveCities]   = useState<string[]>(CITIES.map((c) => c.name));
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [sidebarActive, setSidebarActive] = useState('Overview');

  // ── Data fetch ──────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    if (_testData) return;
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(CITIES.map(fetchCity));
      setData(results);
      setToast({ message: 'Weather data updated successfully', variant: 'success' });
      setTimeout(() => setToast(null), 4000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load weather data';
      setError(msg);
      setToast({ message: msg, variant: 'error' });
      setTimeout(() => setToast(null), 6000);
    } finally {
      setLoading(false);
    }
  }, [_testData]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── When focusCity dropdown changes, open modal ────────────────────────────
  useEffect(() => {
    if (!focusCity) return;
    const city = data.find((d) => d.name === focusCity) ?? null;
    setSelectedCity(city);
  }, [focusCity, data]);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const filtered    = data.filter((d) => activeCities.includes(d.name));
  const stormCities = filtered.filter((d) => d.isStorm);
  const avgTemp     = filtered.length ? filtered.reduce((s, d) => s + d.temp, 0) / filtered.length : 0;
  const maxWind     = filtered.length ? Math.max(...filtered.map((d) => d.windMs)) : 0;
  const totalPrecip = filtered.reduce((s, d) => s + d.precipMm, 0);

  // ── Table columns ──────────────────────────────────────────────────────────
  const columns: Column<WeatherRow>[] = [
    { key: 'city',          header: 'City',         width: '110px' },
    { key: 'region',        header: 'Region',        width: '130px' },
    { key: 'temp',          header: 'Temp (°C)',     width: '90px',
      render: (v) => `${fmt(v as number)}°` },
    { key: 'wind',          header: 'Wind (m/s)',    width: '90px',
      render: (v) => `${fmt(v as number)}` },
    { key: 'precip',        header: 'Precip 6h',    width: '90px',
      render: (v) => `${fmt(v as number)} mm` },
    { key: 'humidity',      header: 'Humidity',      width: '80px',
      render: (v) => `${fmt(v as number, 0)}%` },
    { key: 'conditionLabel', header: 'Condition',
      render: (v, row) => (
        <Badge label={v as string} variant={row.badgeVariant as BadgeVariant} />
      ) },
    { key: 'city', header: '',  width: '80px',
      render: (_, row) => (
        <Button
          label="Details"
          variant="secondary"
          onClick={() => setSelectedCity(data.find((d) => d.name === row.city) ?? null)}
        />
      ) },
  ];

  const tableRows: WeatherRow[] = filtered.map((d) => ({
    city: d.name,
    region: d.region,
    temp: d.temp,
    wind: d.windMs,
    precip: d.precipMm,
    humidity: d.humidity,
    conditionLabel: d.conditionLabel,
    badgeVariant: d.badgeVariant,
  }));

  // ── Topbar right slot ───────────────────────────────────────────────────────
  const topbarRight: ReactNode = (
    <div className="wd-topbar-right">
      <Dropdown
        options={[
          { label: '☀ Light', value: 'light' },
          { label: '☾ Dark',  value: 'dark'  },
        ]}
        value={theme}
        onChange={(v) => setTheme(v as import('../hooks/useTheme').Theme)}
      />
      <Button label="↻ Refresh" variant="secondary" onClick={fetchAll} />
      <Dropdown
        options={[
          { label: 'Focus city…', value: '' },
          ...CITIES.map((c) => ({ label: c.name, value: c.name })),
        ]}
        value={focusCity}
        onChange={(v) => setFocusCity(v)}
        placeholder="Focus city…"
      />
      <Avatar initials="MN" size="sm" alt="Mats Nørbech" />
    </div>
  );

  // ── Modal forecast table ───────────────────────────────────────────────────
  interface ForecastRow extends Record<string, unknown> {
    time: string; temp: number; wind: number; precip: number;
    conditionLabel: string; badgeVariant: BadgeVariant;
  }
  const forecastCols: Column<ForecastRow>[] = [
    { key: 'time',          header: 'Time',      width: '60px' },
    { key: 'temp',          header: 'Temp',      width: '70px', render: (v) => `${fmt(v as number)}°` },
    { key: 'wind',          header: 'Wind m/s',  width: '80px', render: (v) => fmt(v as number) },
    { key: 'precip',        header: 'Precip mm', width: '80px', render: (v) => fmt(v as number) },
    { key: 'conditionLabel', header: 'Condition',
      render: (v, row) => <Badge label={v as string} variant={row.badgeVariant as BadgeVariant} /> },
  ];
  const forecastRows: ForecastRow[] = (selectedCity?.forecast ?? []).map((h) => ({
    time: fmtTime(h.time),
    temp: h.temp,
    wind: h.windMs,
    precip: h.precipMm,
    conditionLabel: h.conditionLabel,
    badgeVariant: h.badgeVariant,
  }));

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="wd">

      {/* ── Sidebar ── */}
      <Sidebar
        logo={<span className="wd-logo">🌤 vibe-ui</span>}
        items={[
          { label: 'Overview',  icon: '⊞', href: '#', active: sidebarActive === 'Overview',  badge: stormCities.length > 0 ? String(stormCities.length) : undefined },
          { label: 'Forecast',  icon: '◈', href: '#', active: sidebarActive === 'Forecast' },
          { label: 'Alerts',    icon: '⚠', href: '#', active: sidebarActive === 'Alerts',   badge: stormCities.length > 0 ? String(stormCities.length) : undefined },
          { label: 'Settings',  icon: '◌', href: '#', active: sidebarActive === 'Settings' },
        ]}
        footer={
          <div className="wd-sidebar-footer">
            <Avatar initials="MN" size="sm" />
            <span className="wd-sidebar-user">Mats Nørbech</span>
          </div>
        }
      />

      <div className="wd__main">

        {/* ── Topbar ── */}
        <Topbar title="🇳🇴 Norwegian Weather" right={topbarRight} />

        <div className="wd__content">

          {/* ── Breadcrumb ── */}
          <Breadcrumb items={[{ label: 'Norway', href: '#' }, { label: 'Weather Dashboard' }]} />

          {/* ── Storm alerts ── */}
          {stormCities
            .filter((c) => !dismissedAlerts.includes(c.name))
            .map((c) => (
              <Alert
                key={c.name}
                variant="warning"
                title={`Storm warning — ${c.name}`}
                message={`Wind speed ${fmt(c.windMs)} m/s · ${c.conditionLabel}. Exercise caution.`}
                onClose={() => setDismissedAlerts((prev) => [...prev, c.name])}
              />
            ))}

          {/* ── Error state ── */}
          {error && (
            <Alert
              variant="error"
              title="Failed to load weather data"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          {/* ── Stat cards ── */}
          <div className="wd__stats">
            <StatCard
              label="Avg Temperature"
              value={loading ? '—' : `${fmt(avgTemp)}°C`}
              trend={avgTemp > 0 ? 'up' : 'down'}
              trendLabel={avgTemp > 0 ? 'Above freezing' : 'Below freezing'}
            />
            <StatCard
              label="Max Wind Speed"
              value={loading ? '—' : `${fmt(maxWind)} m/s`}
              trend={maxWind > 10 ? 'down' : 'neutral'}
              trendLabel={maxWind > 10 ? 'Strong winds' : 'Calm conditions'}
            />
            <StatCard
              label="Total Precipitation"
              value={loading ? '—' : `${fmt(totalPrecip)} mm`}
              trend={totalPrecip > 5 ? 'down' : 'neutral'}
              trendLabel="Next 6 hours"
            />
            <StatCard
              label="Active Alerts"
              value={stormCities.length}
              trend={stormCities.length > 0 ? 'down' : 'up'}
              trendLabel={stormCities.length > 0 ? 'Storm conditions' : 'All clear'}
            />
          </div>

          {/* ── Filter row ── */}
          <div className="wd__filter-row">
            <span className="wd__filter-label">Showing cities:</span>
            <div className="wd__tags">
              {CITIES.map((c) => {
                const isActive = activeCities.includes(c.name);
                return isActive ? (
                  <Tag
                    key={c.name}
                    label={c.name}
                    onRemove={() =>
                      setActiveCities((prev) =>
                        prev.length > 1 ? prev.filter((n) => n !== c.name) : prev
                      )
                    }
                  />
                ) : (
                  <button
                    key={c.name}
                    className="wd__add-city"
                    onClick={() => setActiveCities((prev) => [...prev, c.name])}
                  >
                    + {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── City comparison table ── */}
          <section className="wd__section">
            <h2 className="wd__section-title">City Comparison</h2>
            <DataTable<WeatherRow>
              columns={columns}
              rows={loading ? [] : tableRows}
              emptyMessage={loading ? 'Loading weather data…' : 'No cities selected'}
            />
          </section>

        </div>{/* /wd__content */}
      </div>{/* /wd__main */}

      {/* ── Toast (fixed) ── */}
      {toast && (
        <div className="wd__toast-container">
          <Toast
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {/* ── Detail modal ── */}
      <Modal
        open={!!selectedCity}
        title={selectedCity ? `${selectedCity.name} — 12-hour Forecast` : ''}
        onClose={() => { setSelectedCity(null); setFocusCity(''); }}
        footer={
          <div className="wd__modal-footer">
            <div className="wd__modal-meta">
              <Badge label={selectedCity?.conditionLabel ?? ''} variant={selectedCity?.badgeVariant ?? 'default'} />
              <span className="wd__modal-temp">{selectedCity ? `${fmt(selectedCity.temp)}°C` : ''}</span>
              <span className="wd__modal-wind">{selectedCity ? `${fmt(selectedCity.windMs)} m/s wind` : ''}</span>
              <span className="wd__modal-humidity">{selectedCity ? `${fmt(selectedCity.humidity, 0)}% humidity` : ''}</span>
            </div>
            <Button label="Close" variant="secondary" onClick={() => { setSelectedCity(null); setFocusCity(''); }} />
          </div>
        }
      >
        {selectedCity?.forecast?.length ? (
          <DataTable<ForecastRow>
            columns={forecastCols}
            rows={forecastRows}
            emptyMessage="No forecast available"
          />
        ) : (
          <p className="wd__modal-no-forecast">Detailed forecast not available for this view.</p>
        )}
      </Modal>

    </div>
  );
}
