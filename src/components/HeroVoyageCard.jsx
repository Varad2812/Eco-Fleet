import React from 'react';
import { useFleet } from '../context/FleetContext';
import { 
  Zap, 
  CloudRain, 
  ArrowRight, 
  Ship, 
  Clock, 
  Fuel, 
  Gauge,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const HeroVoyageCard = () => {
  const { 
    plan, 
    stormState, 
    runOptimization, 
    isOptimizing, 
    setIsStormModalOpen 
  } = useFleet();

  const { vessel, sourcePort, destPort, speed, etaDate, fuel, service, isDisrupted } = plan;
  const isStormActive = stormState.intensity !== 'none';

  return (
    <div className="q-card" style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-medium)',
      padding: '16px 20px',
      position: 'relative'
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Vessel and Route Title */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '6px'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase'
            }}>
              VOYAGE DISPATCH STATUS
            </span>

            {isStormActive ? (
              <span className="badge badge-red pulse">
                <AlertTriangle size={11} />
                {stormState.activeScenario.statusBadge.toUpperCase()}
              </span>
            ) : (
              <span className="badge badge-green">
                <CheckCircle2 size={11} />
                OPTIMAL PLAN CONFIRMED
              </span>
            )}
          </div>

          {/* Primary Route Headline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-sans)',
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.01em'
          }}>
            <span>{vessel.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
              <span>{sourcePort.name}</span>
              <ArrowRight size={16} color="var(--accent-cyan)" />
              <span>{destPort.name}</span>
            </div>
          </div>

          {/* Subtitle Telemetry */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Gauge size={13} color="var(--accent-cyan)" />
              <span>Speed: <strong style={{ color: 'var(--text-primary)' }}>{speed} kn</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} color="var(--accent-green)" />
              <span>ETA: <strong style={{ color: 'var(--text-primary)' }}>{etaDate}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Fuel size={13} color="var(--accent-marine)" />
              <span>Bunker: <strong style={{ color: 'var(--text-primary)' }}>{fuel.name}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <SlidersHorizontal size={13} color="var(--accent-amber)" />
              <span>Profile: <strong style={{ color: 'var(--text-primary)' }}>{service.name}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={runOptimization}
            disabled={isOptimizing}
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '12px' }}
          >
            <Zap size={15} fill="currentColor" />
            {isOptimizing ? 'SOLVING QEA PLAN...' : 'RUN OPTIMIZATION'}
          </button>

          <button
            onClick={() => setIsStormModalOpen(true)}
            className={`btn ${isStormActive ? 'btn-danger' : 'btn-secondary'}`}
            style={{ padding: '9px 18px', fontSize: '12px' }}
          >
            <CloudRain size={15} />
            {isStormActive ? 'STORM RADAR (ALERT)' : 'SIMULATE DISRUPTION'}
          </button>
        </div>
      </div>
    </div>
  );
};
