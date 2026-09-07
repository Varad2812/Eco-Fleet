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
    <div className="q-card glow-cyan" style={{
      background: 'linear-gradient(135deg, rgba(13, 24, 46, 0.85) 0%, rgba(8, 14, 26, 0.9) 100%)',
      padding: '16px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: isStormActive ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

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
              letterSpacing: '0.08em',
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
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.02em'
          }}>
            <span>{vessel.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
              <span>{sourcePort.name}</span>
              <ArrowRight size={18} color="var(--accent-cyan)" />
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
              <span>Speed: <strong style={{ color: '#ffffff' }}>{speed} kn</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} color="var(--accent-green)" />
              <span>ETA: <strong style={{ color: '#ffffff' }}>{etaDate}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Fuel size={13} color="var(--accent-marine)" />
              <span>Bunker: <strong style={{ color: '#ffffff' }}>{fuel.name}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <SlidersHorizontal size={13} color="var(--accent-amber)" />
              <span>Profile: <strong style={{ color: '#ffffff' }}>{service.name}</strong></span>
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
