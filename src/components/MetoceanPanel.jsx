import React from 'react';
import { useFleet } from '../context/FleetContext';
import { 
  Wind, 
  Waves, 
  Compass, 
  Eye, 
  Thermometer, 
  Gauge, 
  AlertTriangle, 
  Radio,
  Clock
} from 'lucide-react';

export const MetoceanPanel = () => {
  const { currentWeather, snapshotIndex, weatherCountdown } = useFleet();

  const progressPct = ((30 - weatherCountdown) / 30) * 100;

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <Waves size={15} color="var(--accent-cyan)" />
          <span>Live MetOcean Telemetry (NOAA / ECMWF Satellite Stream)</span>
        </div>

        {/* Live Weather Feed Status & Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '2px 6px' }}>
            <span className="status-dot cyan pulse" />
            SATELLITE DOWNLINK
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            color: 'var(--text-secondary)'
          }}>
            {currentWeather.label}
          </span>
        </div>
      </div>

      {/* Countdown Progress Bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginBottom: '4px'
        }}>
          <span>NEXT SATELLITE UPDATE IN:</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {weatherCountdown}s
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '3px',
          backgroundColor: 'var(--border-subtle)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPct}%`,
            height: '100%',
            backgroundColor: 'var(--accent-cyan)',
            transition: 'width 1s linear'
          }} />
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px'
      }}>
        {/* Wind Speed & Direction */}
        <div style={{
          padding: '10px',
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            <span>WIND VECTOR</span>
            <Wind size={12} color="var(--accent-cyan)" />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {currentWeather.windSpeedKn} <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>kn</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Compass size={10} />
            <span>{currentWeather.windDirection} ({currentWeather.windDirectionDeg}°)</span>
          </div>
        </div>

        {/* Significant Wave Height & Direction */}
        <div style={{
          padding: '10px',
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            <span>SIGNIFICANT WAVES</span>
            <Waves size={12} color="var(--accent-marine)" />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: currentWeather.waveHeightM > 3.0 ? 'var(--accent-amber)' : 'var(--text-primary)'
          }}>
            {currentWeather.waveHeightM} <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-marine)' }}>m (Hs)</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Compass size={10} />
            <span>{currentWeather.waveDirection} • {currentWeather.swellPeriodSec}s</span>
          </div>
        </div>

        {/* Ocean Surface Current */}
        <div style={{
          padding: '10px',
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            <span>OCEAN CURRENT</span>
            <Compass size={12} color="var(--accent-green)" />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {currentWeather.currentKn} <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>kn</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}>
            Drift: {currentWeather.currentDirection} ({currentWeather.currentDirectionDeg}°)
          </div>
        </div>

        {/* Sea State */}
        <div style={{
          padding: '10px',
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            <span>DOUGLAS SEA STATE</span>
            <Gauge size={12} color="var(--accent-cyan)" />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 700,
            color: currentWeather.seaStateCode >= 5 ? 'var(--accent-amber)' : 'var(--accent-cyan)'
          }}>
            {currentWeather.seaState}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}>
            Scale Grade: {currentWeather.seaStateCode}/9
          </div>
        </div>

        {/* Visibility */}
        <div style={{
          padding: '10px',
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            <span>OPTICAL VISIBILITY</span>
            <Eye size={12} color="var(--text-secondary)" />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {currentWeather.visibilityNm} <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>nm</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}>
            Barometer: {currentWeather.barometerHpa} hPa
          </div>
        </div>
      </div>

      {/* Advisory Note */}
      <div style={{
        marginTop: '10px',
        padding: '6px 10px',
        backgroundColor: 'var(--accent-cyan-dim)',
        borderLeft: '2px solid var(--accent-cyan)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        color: 'var(--text-secondary)'
      }}>
        <strong style={{ color: 'var(--accent-cyan)' }}>METOCEAN ADVISORY:</strong> {currentWeather.advisory}
      </div>
    </div>
  );
};
