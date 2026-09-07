import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { STORM_SCENARIOS, getStormScenario } from '../data/stormScenarios';
import { 
  CloudRain, 
  Wind, 
  Waves, 
  Compass, 
  Gauge, 
  AlertTriangle, 
  X, 
  Play, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';

export const StormSimulator = () => {
  const { 
    isStormModalOpen, 
    setIsStormModalOpen, 
    stormState, 
    simulateStorm 
  } = useFleet();

  const [selectedIntensity, setSelectedIntensity] = useState(stormState.intensity || "severe");
  const [radius, setRadius] = useState(stormState.radius || 95);
  const [direction, setDirection] = useState(stormState.direction || "NW");
  const [speed, setSpeed] = useState(stormState.speed || 18);

  if (!isStormModalOpen) return null;

  const scenario = getStormScenario(selectedIntensity);

  const handleApply = () => {
    simulateStorm(selectedIntensity, {
      radius: Number(radius),
      direction,
      speed: Number(speed)
    });
  };

  const intensityOptions = [
    { key: "none", label: "None", color: "#00e5a3", desc: "Nominal MetOcean" },
    { key: "low", label: "Low", color: "#fbbf24", desc: "Advisory Swell (<3.5m)" },
    { key: "moderate", label: "Moderate", color: "#f97316", desc: "Depression (4.5m)" },
    { key: "severe", label: "Severe", color: "#ef4444", desc: "Severe Cyclone (6.4m)" },
    { key: "extreme", label: "Extreme", color: "#d946ef", desc: "Super Cyclone (7.8m)" }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsStormModalOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(11, 20, 36, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f87171'
            }}>
              <CloudRain size={18} />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em'
              }}>
                WEATHER DISRUPTION SIMULATOR
              </h2>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                Hydrodynamic Storm Cell Injector & Route Risk Stress Test
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsStormModalOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Intensity Selector Buttons */}
          <div>
            <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              Select Disruption Severity
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px'
            }}>
              {intensityOptions.map((opt) => {
                const isSelected = selectedIntensity === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedIntensity(opt.key)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `2px solid ${opt.color}` : '1px solid var(--border-subtle)',
                      boxShadow: isSelected ? `0 0 14px ${opt.color}44` : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isSelected ? '#ffffff' : opt.color,
                      textTransform: 'uppercase'
                    }}>
                      {opt.label}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenario Details Preview Card */}
          <div style={{
            padding: '14px 16px',
            backgroundColor: 'rgba(5, 12, 22, 0.75)',
            border: `1px solid ${scenario.strokeColor || 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} color={scenario.strokeColor || '#00e5a3'} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>
                  {scenario.name}
                </span>
              </div>
              <span className="badge" style={{
                backgroundColor: `${scenario.badgeColor}22`,
                color: scenario.badgeColor,
                borderColor: `${scenario.badgeColor}66`
              }}>
                {scenario.statusBadge}
              </span>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {scenario.description}
            </p>

            {/* Quick Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px'
            }}>
              <div style={{ padding: '6px 8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>WAVE HEIGHT</div>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{scenario.waveHeightM} m</div>
              </div>
              <div style={{ padding: '6px 8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>PEAK GUSTS</div>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{scenario.windGustKn} kn</div>
              </div>
              <div style={{ padding: '6px 8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>BAROMETER</div>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{scenario.centralPressureHpa} hPa</div>
              </div>
              <div style={{ padding: '6px 8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>RE-OPT REQ?</div>
                <div style={{ color: scenario.rerouteRequired ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700 }}>
                  {scenario.rerouteRequired ? "YES (DETOUR)" : "NO (STABLE)"}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Sliders (Radius, Direction, Speed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span className="form-label">Storm Radius</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{radius * 3} nm</span>
              </div>
              <input
                type="range"
                min="40"
                max="140"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                style={{ accentColor: 'var(--accent-cyan)' }}
              />
            </div>

            <div className="form-group">
              <span className="form-label">Propagation Vector</span>
              <select
                className="form-select font-mono"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                style={{ padding: '6px 8px', fontSize: '11px' }}
              >
                <option value="NW">NW (315°)</option>
                <option value="WNW">WNW (295°)</option>
                <option value="W">W (270°)</option>
                <option value="NNW">NNW (335°)</option>
                <option value="N">N (000°)</option>
              </select>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span className="form-label">Movement Speed</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{speed} kn</span>
              </div>
              <input
                type="range"
                min="8"
                max="30"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                style={{ accentColor: 'var(--accent-cyan)' }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          background: 'rgba(11, 20, 36, 0.9)'
        }}>
          <button
            type="button"
            onClick={() => setIsStormModalOpen(false)}
            className="btn btn-secondary"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="btn btn-primary"
          >
            <Play size={13} fill="currentColor" />
            SIMULATE STORM
          </button>
        </div>
      </div>
    </div>
  );
};
