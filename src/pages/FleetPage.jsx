import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { VESSELS } from '../data/vessels';
import { Ship, Navigation, Fuel, Award, Gauge, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const FleetPage = () => {
  const { config, updateConfig, setActivePage } = useFleet();
  const [filter, setFilter] = useState("ALL");
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0]);

  const filteredVessels = VESSELS.filter((v) => {
    if (filter === "ALL") return true;
    if (filter === "EN ROUTE") return v.availability === "EN ROUTE";
    if (filter === "AVAILABLE") return v.availability === "AVAILABLE";
    if (filter === "LOADING") return v.availability === "LOADING";
    return true;
  });

  const handleSelectVesselForDispatch = (vessel) => {
    updateConfig({ vesselId: vessel.id });
    setActivePage("command-center");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
            Fleet Telemetry & Vessel Tracking
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Real-time hydrodynamic monitoring, IMO CII compliance ratings, and operational status across the active commercial fleet.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {["ALL", "EN ROUTE", "AVAILABLE", "LOADING"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '5px 10px', fontSize: '10.5px' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Counters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        <div className="q-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>TOTAL FLEET ASSETS</div>
          <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff' }}>6 VESSELS</div>
          <div style={{ fontSize: '10px', color: 'var(--accent-cyan)' }}>100% AIS Connected</div>
        </div>

        <div className="q-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>TRANSOCEANIC TRANSIT</div>
          <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-cyan)' }}>3 UNDERWAY</div>
          <div style={{ fontSize: '10px', color: 'var(--accent-green)' }}>Zero Safety Incidents</div>
        </div>

        <div className="q-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PORT OPERATIONS</div>
          <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-amber)' }}>3 IN PORT</div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Berth Clearance Normal</div>
        </div>

        <div className="q-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CII COMPLIANCE RATE</div>
          <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-green)' }}>100% (A/B)</div>
          <div style={{ fontSize: '10px', color: 'var(--accent-green)' }}>IMO 2026 Ready</div>
        </div>
      </div>

      {/* Main Fleet Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '14px'
      }}>
        {filteredVessels.map((v) => {
          const isSelected = selectedVessel.id === v.id;
          const isActiveInConfig = config.vesselId === v.id;

          return (
            <div
              key={v.id}
              onClick={() => setSelectedVessel(v)}
              className={`q-card ${isActiveInConfig ? 'glow-cyan' : ''}`}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                border: isActiveInConfig ? '1.5px solid var(--accent-cyan)' : isSelected ? '1px solid var(--border-bright)' : '1px solid var(--border-subtle)'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Ship size={16} color="var(--accent-cyan)" />
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                        {v.name}
                      </h3>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {v.type} • {v.capacity}
                    </div>
                  </div>

                  <span className={`badge ${v.availability === 'EN ROUTE' ? 'badge-cyan' : v.availability === 'AVAILABLE' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '9.5px' }}>
                    {v.availability}
                  </span>
                </div>

                {/* Telemetry rows */}
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(5, 12, 22, 0.65)',
                  borderRadius: 'var(--radius-md)',
                  margin: '10px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>DWT:</span>
                    <span style={{ color: '#ffffff' }}>{v.deadweight}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Speed (Eco / Max):</span>
                    <span style={{ color: '#ffffff' }}>{v.economicalSpeed} / {v.maxSpeed} kn</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Base Fuel Rate:</span>
                    <span style={{ color: 'var(--accent-marine)' }}>{v.baseFuelRate} t/day</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>CII Baseline:</span>
                    <span style={{ color: v.ciiRating === 'A' ? 'var(--accent-green)' : '#38bdf8', fontWeight: 700 }}>
                      {v.ciiBaseline} (Rating {v.ciiRating})
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Current Port:</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{v.currentPort}</span>
                  </div>
                </div>

                {/* Bunker fuel tags */}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {v.fuelCompatibility.map((f) => (
                    <span key={f} style={{
                      fontSize: '9.5px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)'
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '8px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectVesselForDispatch(v);
                  }}
                  className={`btn ${isActiveInConfig ? 'btn-accent' : 'btn-primary'}`}
                  style={{ width: '100%', padding: '7px 0', fontSize: '11px' }}
                >
                  {isActiveInConfig ? 'CURRENTLY DISPATCHED' : 'ASSIGN TO VOYAGE OPTIMIZER'}
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
