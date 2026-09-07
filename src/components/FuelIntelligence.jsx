import React from 'react';
import { useFleet } from '../context/FleetContext';
import { FUELS } from '../data/fuels';
import { Fuel, Sparkles, Check, AlertCircle } from 'lucide-react';

export const FuelIntelligence = () => {
  const { config, updateConfig, plan } = useFleet();

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <Fuel size={15} color="var(--accent-cyan)" />
          <span>Fuel Intelligence & Alternative Decarbonization Matrix</span>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
          WELL-TO-WAKE EVALUATION
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '12px'
      }}>
        {FUELS.map((fuel) => {
          const isSelected = config.fuelId === fuel.id;

          return (
            <div
              key={fuel.id}
              onClick={() => updateConfig({ fuelId: fuel.id })}
              style={{
                padding: '14px 14px',
                backgroundColor: isSelected ? 'var(--accent-cyan-dim)' : 'var(--bg-inset)',
                border: isSelected ? '1px solid var(--border-bright)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isSelected ? 'var(--shadow-card)' : 'none'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)'
                  }}>
                    {fuel.shortName}
                  </span>

                  {isSelected ? (
                    <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '2px 5px' }}>
                      <Check size={10} /> SELECTED
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      color: fuel.availability === "HIGH" || fuel.availability === "UNIVERSAL" ? "var(--accent-green)" : "var(--accent-amber)"
                    }}>
                      {fuel.availability}
                    </span>
                  )}
                </div>

                {/* Price & WtW */}
                <div style={{
                  padding: '6px 8px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Index Price:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>₹{fuel.pricePerTonne.toLocaleString()}/t</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>WtW CO₂e:</span>
                    <span style={{ color: fuel.wtwEmissions < 1.0 ? 'var(--accent-green)' : 'var(--accent-amber)', fontWeight: 600 }}>
                      {fuel.wtwEmissions} t/t
                    </span>
                  </div>
                </div>

                {/* Recommendation Pill */}
                <div style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: fuel.color,
                  fontWeight: 600,
                  marginBottom: '4px'
                }}>
                  ★ {fuel.recommendation}
                </div>

                <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {fuel.bestFor}
                </div>
              </div>

              {/* Footer Specs */}
              <div style={{
                marginTop: '12px',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-dim)'
              }}>
                <span>Energy: {fuel.energyDensity} MJ/kg</span>
                <span>Cargo Imp: {fuel.cargoVolumePenalty}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
