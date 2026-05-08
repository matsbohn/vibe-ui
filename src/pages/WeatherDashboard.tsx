import { useState, useEffect, useCallback, ReactNode } from 'react';
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
import { Toast } from '../components/Toast/Toast';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { WeatherHero } from '../components/WeatherHero/WeatherHero';

// ─── City + area definitions ───────────────────────────────────────────────────
interface Area { name: string; lat: number; lon: number }
interface CityDef { name: string; region: string; areas: Area[] }

const CITY_DEFS: CityDef[] = [
  {
    name: 'Oslo', region: 'East Norway',
    areas: [
      { name: 'City Centre',  lat: 59.9139, lon: 10.7522 },
      { name: 'Grünerløkka', lat: 59.9201, lon: 10.7609 },
      { name: 'Holmenkollen', lat: 59.9627, lon: 10.6657 },
      { name: 'Bærum',        lat: 59.9041, lon: 10.5527 },
      { name: 'Groruddalen',  lat: 59.9396, lon: 10.8558 },
    ],
  },
  {
    name: 'Bergen', region: 'West Norway',
    areas: [
      { name: 'City Centre', lat: 60.3913, lon: 5.3221 },
      { name: 'Fana',        lat: 60.3007, lon: 5.3421 },
      { name: 'Åsane',       lat: 60.4659, lon: 5.3202 },
      { name: 'Laksevåg',    lat: 60.3889, lon: 5.2633 },
    ],
  },
  {
    name: 'Trondheim', region: 'Central Norway',
    areas: [
      { name: 'City Centre', lat: 63.4305, lon: 10.3951 },
      { name: 'Heimdal',     lat: 63.3596, lon: 10.3680 },
      { name: 'Ranheim',     lat: 63.4540, lon: 10.5139 },
      { name: 'Tiller',      lat: 63.3743, lon: 10.3957 },
    ],
  },
  {
    name: 'Stavanger', region: 'SW Norway',
    areas: [
      { name: 'City Centre', lat: 58.9700, lon: 5.7331 },
      { name: 'Forus',       lat: 58.8981, lon: 5.7305 },
      { name: 'Madla',       lat: 58.9652, lon: 5.6638 },
      { name: 'Hundvåg',     lat: 59.0055, lon: 5.7720 },
    ],
  },
  {
    name: 'Tromsø', region: 'Northern Norway',
    areas: [
      { name: 'City Centre', lat: 69.6489, lon: 18.9551 },
      { name: 'Tromsdalen',  lat: 69.6379, lon: 19.0104 },
      { name: 'Kvaløya',     lat: 69.6905, lon: 18.8199 },
    ],
  },
];

// ─── Weather types ─────────────────────────────────────────────────────────────
interface HourForecast {
  time: string; temp: number; windMs: number; precipMm: number;
  conditionLabel: string; badgeVariant: BadgeVariant;
}

export interface AreaWeather {
  name: string;
  temp: number; windMs: number; precipMm: number; humidity: number;
  conditionLabel: string; badgeVariant: BadgeVariant;
  isStorm: boolean; forecast: HourForecast[];
}

// ─── Icon mapping (Basmilius weather-icons, fill/svg) ─────────────────────────
const ICON_BASE = 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg';
const WEATHER_ICONS: Record<string, string> = {
  'Clear':         'clear-day',
  'Partly Cloudy': 'partly-cloudy-day',
  'Cloudy':        'cloudy',
  'Fog':           'fog',
  'Rain':          'rain',
  'Heavy Rain':    'extreme-rain',
  'Snow':          'snow',
  'Heavy Snow':    'extreme-snow',
  'Sleet':         'sleet',
  'Thunder':       'thunderstorms',
  'Mixed':         'partly-cloudy-day',
};

export function weatherIconUrl(condition: string): string {
  return `${ICON_BASE}/${WEATHER_ICONS[condition] ?? 'partly-cloudy-day'}.svg`;
}

function weatherIcon(condition: string, size = 28) {
  return (
    <div className="wd__condition-icon-bg">
      <img className="wd__condition-icon" src={weatherIconUrl(condition)}
        alt={condition} width={size} height={size} />
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function parseCondition(code: string): { label: string; variant: BadgeVariant } {
  const c = (code ?? '').toLowerCase();
  if (c.startsWith('clearsky') || c.startsWith('fair'))      return { label: 'Clear',        variant: 'success'  };
  if (c.startsWith('partlycloudy'))                           return { label: 'Partly Cloudy', variant: 'default'  };
  if (c === 'cloudy')                                         return { label: 'Cloudy',        variant: 'default'  };
  if (c === 'fog')                                            return { label: 'Fog',           variant: 'default'  };
  if (c.includes('thunder'))                                  return { label: 'Thunder',       variant: 'error'    };
  if (c.includes('heavysnow') || c.includes('heavysleet'))   return { label: 'Heavy Snow',    variant: 'error'    };
  if (c.includes('snow'))                                     return { label: 'Snow',          variant: 'info'     };
  if (c.includes('sleet'))                                    return { label: 'Sleet',         variant: 'warning'  };
  if (c.includes('heavyrain'))                                return { label: 'Heavy Rain',    variant: 'warning'  };
  if (c.includes('rain'))                                     return { label: 'Rain',          variant: 'info'     };
  return { label: 'Mixed', variant: 'default' };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchArea(area: Area): Promise<AreaWeather> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${area.lat}&lon=${area.lon}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'vibe-ui/1.0 https://github.com/matsbohn/vibe-ui' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${area.name}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = await res.json();
  const series = json.properties.timeseries;
  const cur = series[0];
  const inst = cur.data.instant.details;
  const next1h = cur.data.next_1_hours;
  const next6h = cur.data.next_6_hours;
  const symbolCode: string = next1h?.summary?.symbol_code ?? next6h?.summary?.symbol_code ?? 'cloudy';
  const { label, variant } = parseCondition(symbolCode);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast: HourForecast[] = series.slice(0, 12).map((s: any) => {
    const sc = s.data.next_1_hours?.summary?.symbol_code ?? '';
    const { label: fl, variant: fv } = parseCondition(sc);
    return {
      time: s.time, temp: s.data.instant.details.air_temperature,
      windMs: s.data.instant.details.wind_speed,
      precipMm: s.data.next_1_hours?.details?.precipitation_amount ?? 0,
      conditionLabel: fl, badgeVariant: fv,
    };
  });

  return {
    name: area.name,
    temp: inst.air_temperature, windMs: inst.wind_speed,
    precipMm: next6h?.details?.precipitation_amount ?? 0,
    humidity: inst.relative_humidity,
    conditionLabel: label, badgeVariant: variant,
    isStorm: inst.wind_speed > 15 || symbolCode.includes('thunder'),
    forecast,
  };
}

function fmt(n: number, decimals = 1): string { return n.toFixed(decimals); }
function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
}

// ─── Mock data ────────────────────────────────────────────────────────────────
export const MOCK_CITY_DATA: Record<string, AreaWeather[]> = {
  Oslo: [
    { name: 'City Centre',  temp: 12.3, windMs: 4.2,  precipMm: 0,   humidity: 68, conditionLabel: 'Partly Cloudy', badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Grünerløkka', temp: 12.1, windMs: 3.8,  precipMm: 0,   humidity: 70, conditionLabel: 'Partly Cloudy', badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Holmenkollen', temp: 9.4,  windMs: 7.1,  precipMm: 0.2, humidity: 75, conditionLabel: 'Cloudy',        badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Bærum',        temp: 11.8, windMs: 3.5,  precipMm: 0,   humidity: 65, conditionLabel: 'Clear',         badgeVariant: 'success', isStorm: false, forecast: [] },
    { name: 'Groruddalen',  temp: 12.6, windMs: 2.9,  precipMm: 0,   humidity: 72, conditionLabel: 'Partly Cloudy', badgeVariant: 'default', isStorm: false, forecast: [] },
  ],
  Bergen: [
    { name: 'City Centre', temp: 9.1,  windMs: 11.5, precipMm: 8.4, humidity: 89, conditionLabel: 'Rain',      badgeVariant: 'info',    isStorm: false, forecast: [] },
    { name: 'Fana',        temp: 8.8,  windMs: 9.2,  precipMm: 6.1, humidity: 87, conditionLabel: 'Rain',      badgeVariant: 'info',    isStorm: false, forecast: [] },
    { name: 'Åsane',       temp: 9.4,  windMs: 13.1, precipMm: 9.8, humidity: 91, conditionLabel: 'Heavy Rain', badgeVariant: 'warning', isStorm: false, forecast: [] },
    { name: 'Laksevåg',    temp: 9.0,  windMs: 12.0, precipMm: 7.9, humidity: 90, conditionLabel: 'Rain',      badgeVariant: 'info',    isStorm: false, forecast: [] },
  ],
  Trondheim: [
    { name: 'City Centre', temp: 6.8, windMs: 6.3, precipMm: 2.1, humidity: 75, conditionLabel: 'Cloudy',        badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Heimdal',     temp: 6.2, windMs: 5.8, precipMm: 1.8, humidity: 78, conditionLabel: 'Cloudy',        badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Ranheim',     temp: 7.1, windMs: 7.4, precipMm: 2.4, humidity: 73, conditionLabel: 'Partly Cloudy', badgeVariant: 'default', isStorm: false, forecast: [] },
    { name: 'Tiller',      temp: 6.5, windMs: 5.1, precipMm: 1.5, humidity: 76, conditionLabel: 'Cloudy',        badgeVariant: 'default', isStorm: false, forecast: [] },
  ],
  Stavanger: [
    { name: 'City Centre', temp: 11.0, windMs: 16.2, precipMm: 3.6, humidity: 80, conditionLabel: 'Heavy Rain', badgeVariant: 'warning', isStorm: true,  forecast: [] },
    { name: 'Forus',       temp: 10.8, windMs: 15.8, precipMm: 4.1, humidity: 82, conditionLabel: 'Heavy Rain', badgeVariant: 'warning', isStorm: true,  forecast: [] },
    { name: 'Madla',       temp: 11.2, windMs: 17.5, precipMm: 2.8, humidity: 79, conditionLabel: 'Heavy Rain', badgeVariant: 'warning', isStorm: true,  forecast: [] },
    { name: 'Hundvåg',     temp: 10.9, windMs: 14.9, precipMm: 3.9, humidity: 81, conditionLabel: 'Rain',       badgeVariant: 'info',    isStorm: false, forecast: [] },
  ],
  Tromsø: [
    { name: 'City Centre', temp: -1.4, windMs: 8.7, precipMm: 5.0, humidity: 72, conditionLabel: 'Snow', badgeVariant: 'info', isStorm: false, forecast: [] },
    { name: 'Tromsdalen',  temp: -2.1, windMs: 7.2, precipMm: 4.2, humidity: 74, conditionLabel: 'Snow', badgeVariant: 'info', isStorm: false, forecast: [] },
    { name: 'Kvaløya',     temp: -0.8, windMs: 10.1, precipMm: 6.3, humidity: 71, conditionLabel: 'Snow', badgeVariant: 'info', isStorm: false, forecast: [] },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export interface WeatherDashboardProps {
  _testData?: Record<string, AreaWeather[]>;
}

export function WeatherDashboard({ _testData }: WeatherDashboardProps = {}) {
  const [selectedCity, setSelectedCity]     = useState<CityDef>(CITY_DEFS[0]);
  const [areaData, setAreaData]             = useState<AreaWeather[]>(_testData?.[CITY_DEFS[0].name] ?? []);
  const [loading, setLoading]               = useState(!_testData);
  const [error, setError]                   = useState<string | null>(null);
  const [selectedArea, setSelectedArea]     = useState<AreaWeather | null>(null);
  const [toast, setToast]                   = useState<{ message: string; variant: 'success' | 'error' } | null>(null);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  // ── Fetch all areas for the selected city ──────────────────────────────────
  const fetchCity = useCallback(async (city: CityDef) => {
    if (_testData) { setAreaData(_testData[city.name] ?? []); return; }
    setLoading(true);
    setError(null);
    setAreaData([]);
    try {
      const results = await Promise.all(city.areas.map(fetchArea));
      setAreaData(results);
      setToast({ message: `${city.name} weather updated`, variant: 'success' });
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

  useEffect(() => { fetchCity(selectedCity); }, [selectedCity, fetchCity]);

  // ── Derived from city centre (first area) ─────────────────────────────────
  const centre    = areaData[0];
  const stormAreas = areaData.filter(a => a.isStorm);
  const maxWind   = areaData.length ? Math.max(...areaData.map(a => a.windMs)) : 0;

  // ── Table ─────────────────────────────────────────────────────────────────
  interface AreaRow extends Record<string, unknown> {
    area: string; temp: number; wind: number; precip: number;
    humidity: number; conditionLabel: string; badgeVariant: BadgeVariant;
  }

  const columns: Column<AreaRow>[] = [
    { key: 'area',          header: 'Area',        width: '140px' },
    { key: 'temp',          header: 'Temp (°C)',   width: '90px',  render: (v) => `${fmt(v as number)}°` },
    { key: 'wind',          header: 'Wind (m/s)',  width: '90px',  render: (v) => `${fmt(v as number)}` },
    { key: 'precip',        header: 'Precip 6h',  width: '90px',  render: (v) => `${fmt(v as number)} mm` },
    { key: 'humidity',      header: 'Humidity',    width: '80px',  render: (v) => `${fmt(v as number, 0)}%` },
    { key: 'conditionLabel', header: 'Condition',
      render: (v) => (
        <div className="wd__condition-cell">
          {weatherIcon(v as string, 28)}
          <span className="wd__condition-label">{v as string}</span>
        </div>
      ),
    },
    { key: 'area', header: '', width: '80px',
      render: (_, row) => (
        <Button label="Details" variant="secondary"
          onClick={() => setSelectedArea(areaData.find(a => a.name === row.area) ?? null)} />
      ),
    },
  ];

  const tableRows: AreaRow[] = areaData.map(a => ({
    area: a.name, temp: a.temp, wind: a.windMs, precip: a.precipMm,
    humidity: a.humidity, conditionLabel: a.conditionLabel, badgeVariant: a.badgeVariant,
  }));

  // ── Sidebar city items ────────────────────────────────────────────────────
  const cityIcons: Record<string, string> = {
    Oslo: '⊞', Bergen: '◈', Trondheim: '◉', Stavanger: '◌', Tromsø: '❄',
  };

  // ── Topbar right ──────────────────────────────────────────────────────────
  const topbarRight: ReactNode = (
    <div className="wd-topbar-right">
      <Button label="↻ Refresh" variant="secondary" onClick={() => fetchCity(selectedCity)} />
      <Avatar initials="MN" size="sm" alt="Mats Nørbech" />
    </div>
  );

  // ── Forecast modal table ──────────────────────────────────────────────────
  interface ForecastRow extends Record<string, unknown> {
    time: string; temp: number; wind: number; precip: number;
    conditionLabel: string; badgeVariant: BadgeVariant;
  }
  const forecastCols: Column<ForecastRow>[] = [
    { key: 'time',          header: 'Time',      width: '60px' },
    { key: 'temp',          header: 'Temp',      width: '70px',  render: (v) => `${fmt(v as number)}°` },
    { key: 'wind',          header: 'Wind m/s',  width: '80px',  render: (v) => fmt(v as number) },
    { key: 'precip',        header: 'Precip mm', width: '80px',  render: (v) => fmt(v as number) },
    { key: 'conditionLabel', header: 'Condition',
      render: (v, row) => <Badge label={v as string} variant={row.badgeVariant as BadgeVariant} /> },
  ];
  const forecastRows: ForecastRow[] = (selectedArea?.forecast ?? []).map(h => ({
    time: fmtTime(h.time), temp: h.temp, wind: h.windMs, precip: h.precipMm,
    conditionLabel: h.conditionLabel, badgeVariant: h.badgeVariant,
  }));

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="wd">

      {/* ── Sidebar — city selector ── */}
      <Sidebar
        logo={<span className="wd-logo">🌤 vibe-ui</span>}
        items={CITY_DEFS.map(city => ({
          label: city.name,
          icon: cityIcons[city.name] ?? '⊞',
          href: '#',
          active: selectedCity.name === city.name,
          badge: stormAreas.length > 0 && selectedCity.name === city.name
            ? String(stormAreas.length) : undefined,
        }))}
        onItemClick={(label) => {
          const city = CITY_DEFS.find(c => c.name === label);
          if (city) { setSelectedCity(city); setDismissedAlerts([]); }
        }}
        footer={
          <div className="wd-sidebar-footer">
            <Avatar initials="MN" size="sm" />
            <span className="wd-sidebar-user">Mats Nørbech</span>
          </div>
        }
      />

      <div className="wd__main">
        <Topbar title={`🇳🇴 ${selectedCity.name} Weather`} right={topbarRight} />

        <div className="wd__content">
          <Breadcrumb items={[
            { label: 'Norway', href: '#' },
            { label: selectedCity.name, href: '#' },
            { label: 'Weather' },
          ]} />

          {/* ── Hero ── */}
          {!loading && centre && (
            <WeatherHero
              country={`🇳🇴 ${selectedCity.name}`}
              temp={centre.temp}
              areaCount={areaData.length}
              condition={centre.conditionLabel}
            />
          )}

          {/* ── Storm alerts ── */}
          {stormAreas
            .filter(a => !dismissedAlerts.includes(a.name))
            .map(a => (
              <Alert key={a.name} variant="warning"
                title={`Storm warning — ${a.name}`}
                message={`Wind speed ${fmt(a.windMs)} m/s · ${a.conditionLabel}. Exercise caution.`}
                onClose={() => setDismissedAlerts(prev => [...prev, a.name])} />
            ))}

          {error && (
            <Alert variant="error" title="Failed to load weather data"
              message={error} onClose={() => setError(null)} />
          )}

          {/* ── Stat cards — city centre conditions ── */}
          {centre && (
            <div className="wd__stats">
              <StatCard
                label="Temperature"
                value={loading ? '—' : `${fmt(centre.temp)}°C`}
                trend={centre.temp > 0 ? 'up' : 'down'}
                trendLabel={centre.temp > 0 ? 'Above freezing' : 'Below freezing'}
              />
              <StatCard
                label="Wind Speed"
                value={loading ? '—' : `${fmt(centre.windMs)} m/s`}
                trend={centre.windMs > 10 ? 'down' : 'neutral'}
                trendLabel={centre.windMs > 10 ? 'Strong winds' : 'Calm conditions'}
              />
              <StatCard
                label="Precipitation"
                value={loading ? '—' : `${fmt(centre.precipMm)} mm`}
                trend={centre.precipMm > 2 ? 'down' : 'neutral'}
                trendLabel="Next 6 hours"
              />
              <StatCard
                label="Humidity"
                value={loading ? '—' : `${fmt(centre.humidity, 0)}%`}
                trend={centre.humidity > 80 ? 'down' : 'neutral'}
                trendLabel={centre.humidity > 80 ? 'High humidity' : 'Comfortable'}
              />
            </div>
          )}

          {/* ── Area comparison table ── */}
          <section className="wd__section">
            <h2 className="wd__section-title">
              {selectedCity.name} — Area Comparison
            </h2>
            <DataTable<AreaRow>
              columns={columns}
              rows={loading ? [] : tableRows}
              emptyMessage={loading ? `Loading ${selectedCity.name} data…` : 'No data'}
            />
          </section>

        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="wd__toast-container">
          <Toast message={toast.message} variant={toast.variant}
            onClose={() => setToast(null)} />
        </div>
      )}

      {/* ── Area detail modal ── */}
      <Modal
        open={!!selectedArea}
        title={selectedArea ? `${selectedArea.name} — 12-hour Forecast` : ''}
        onClose={() => setSelectedArea(null)}
        footer={
          <div className="wd__modal-footer">
            <div className="wd__modal-meta">
              <Badge label={selectedArea?.conditionLabel ?? ''} variant={selectedArea?.badgeVariant ?? 'default'} />
              <span className="wd__modal-temp">{selectedArea ? `${fmt(selectedArea.temp)}°C` : ''}</span>
              <span className="wd__modal-wind">{selectedArea ? `${fmt(selectedArea.windMs)} m/s wind` : ''}</span>
              <span className="wd__modal-humidity">{selectedArea ? `${fmt(selectedArea.humidity, 0)}% humidity` : ''}</span>
            </div>
            <Button label="Close" variant="secondary" onClick={() => setSelectedArea(null)} />
          </div>
        }
      >
        {selectedArea?.forecast?.length ? (
          <DataTable<ForecastRow> columns={forecastCols} rows={forecastRows}
            emptyMessage="No forecast available" />
        ) : (
          <p className="wd__modal-no-forecast">Detailed forecast not available for this view.</p>
        )}
      </Modal>
    </div>
  );
}
