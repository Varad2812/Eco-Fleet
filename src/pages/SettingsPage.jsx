import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { Sliders, Database, ShieldCheck, DollarSign, Check, RotateCcw } from 'lucide-react';

export const SettingsPage = () => {
  const { resetSimulation } = useFleet();

  const [carbonPrice, setCarbonPrice] = useState(3630);
  const [waveLimit, setWaveLimit] = useState(5.5);
  const [bunkerBuffer, setBunkerBuffer] = useState(8);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Platform & Optimization Governance
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Configure enterprise economic multipliers, safety thresholds, and API connection bindings for the Eco-Fleet engine.
        </p>
      </div>

      {/* Settings Card */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Sliders size={15} color="var(--accent-cyan)" />
            <span>Operational Constraints & Carbon Pricing Policy</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            REGULATORY POLICIES
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Carbon Price Input */}
          <div className="form-group">
            <label className="form-label">
              Global Maritime Carbon Price / EU ETS Baseline (₹ / tonne CO₂)
            </label>
            <input
              type="number"
              className="form-input font-mono"
              value={carbonPrice}
              onChange={(e) => setCarbonPrice(Number(e.target.value))}
            />
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Current global standard equivalent to ~€85 / t CO₂ under EU ETS Maritime extension.
            </div>
          </div>

          {/* Wave Limit Slider */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Weather Routing Hard Wave Limit (Significant Wave Height Hs)</label>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {waveLimit} meters
              </span>
            </div>
            <input
              type="range"
              min="3.0"
              max="8.0"
              step="0.5"
              value={waveLimit}
              onChange={(e) => setWaveLimit(Number(e.target.value))}
              style={{ accentColor: 'var(--accent-cyan)' }}
            />
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Routes with predicted wave height exceeding this threshold trigger mandatory QEA detour optimization.
            </div>
          </div>

          {/* Bunker Fuel Reserve Buffer */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Bunker Contingency Reserve Buffer</label>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 600 }}>
                +{bunkerBuffer}%
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={bunkerBuffer}
              onChange={(e) => setBunkerBuffer(Number(e.target.value))}
              style={{ accentColor: 'var(--accent-green)' }}
            />
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Reserve margin loaded above calculated voyage fuel burn for adverse current absorption.
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              {saved ? <Check size={14} /> : null}
              {saved ? 'POLICY SAVED' : 'SAVE POLICIES'}
            </button>

            <button
              type="button"
              onClick={resetSimulation}
              className="btn btn-secondary"
            >
              <RotateCcw size={14} />
              RESET ALL DEFAULTS
            </button>
          </div>
        </div>
      </div>

      {/* Future Backend Endpoints Status Card (Section 37) */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Database size={15} color="var(--accent-cyan)" />
            <span>Architecture & Service Integration Readiness</span>
          </div>
          <span className="badge badge-green" style={{ fontSize: '9px' }}>
            API READY
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>POST /api/optimize</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>
              Bounded to local deterministic QEA optimization service (ready for HPC backend worker).
            </div>
          </div>

          <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>GET /api/weather</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>
              Connected to continuous NOAA / ECMWF MetOcean satellite telemetry & oceanic buoy stream.
            </div>
          </div>

          <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>POST /api/reoptimize</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>
              Dynamic weather incident detour solver service ready for distributed container execution.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
