import React from 'react';
import { useFleet } from '../context/FleetContext';
import { RouteMap } from '../components/RouteMap';
import { MetoceanPanel } from '../components/MetoceanPanel';
import { WEATHER_SNAPSHOTS } from '../data/weather';
import { CloudRain, Waves, Wind, Compass, Gauge, AlertTriangle, Radio } from 'lucide-react';

export const WeatherPage = () => {
  const { currentWeather, snapshotIndex, weatherCountdown, stormState, setIsStormModalOpen } = useFleet();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
            Metocean Telemetry & Oceanographic Risk
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            High-resolution hydrodynamic sea state forecasting, wave spectral energy, and real-time atmospheric cyclonic tracking.
          </p>
        </div>

        <button
          onClick={() => setIsStormModalOpen(true)}
          className="btn btn-danger"
        >
          <CloudRain size={14} />
          DISRUPTION RADAR SIMULATOR
        </button>
      </div>

      {/* Expanded Route Map with Weather Layers */}
      <RouteMap height={480} />

      {/* Live Metocean Active Telemetry Gauge */}
      <MetoceanPanel />

      {/* Global Oceanic Observation Array & Telemetry Stations */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Radio size={15} color="var(--accent-cyan)" />
            <span>Global Oceanic Observation Array • Active MetOcean Buoy & Satellite Sensors</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            SATELLITE DOWNLINK
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px'
        }}>
          {WEATHER_SNAPSHOTS.map((snap, idx) => {
            const isCurrent = idx === snapshotIndex;

            return (
              <div
                key={snap.id}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isCurrent ? 'rgba(0, 240, 255, 0.12)' : 'rgba(5, 12, 22, 0.65)',
                  border: isCurrent ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isCurrent ? '0 0 14px rgba(0, 240, 255, 0.3)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: isCurrent ? 'var(--accent-cyan)' : 'var(--text-muted)', fontWeight: isCurrent ? 700 : 500 }}>
                    {snap.label}
                  </span>
                  {isCurrent && (
                    <span className="badge badge-cyan pulse" style={{ padding: '1px 4px', fontSize: '8.5px' }}>
                      ACTIVE
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Wind:</span>
                  <span style={{ color: '#ffffff' }}>{snap.windSpeedKn} kn {snap.windDirection}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Waves (Hs):</span>
                  <span style={{ color: snap.waveHeightM > 3 ? 'var(--accent-amber)' : 'var(--accent-marine)', fontWeight: 600 }}>
                    {snap.waveHeightM} m
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current:</span>
                  <span style={{ color: '#ffffff' }}>{snap.currentKn} kn {snap.currentDirection}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sea State:</span>
                  <span style={{ color: snap.seaStateCode >= 5 ? '#f97316' : '#38bdf8' }}>{snap.seaState}</span>
                </div>

                <div style={{
                  fontSize: '9.5px',
                  color: 'var(--text-dim)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {snap.routeRiskIndex}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
