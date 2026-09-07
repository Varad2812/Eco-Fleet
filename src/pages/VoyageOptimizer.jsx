import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { SERVICE_PROFILES } from '../data/services';
import { calculateVoyagePlan } from '../data/optimizationEngine';
import { RouteMap } from '../components/RouteMap';
import { VoyageConfig } from '../components/VoyageConfig';
import { Navigation, Check, ArrowRight, Zap, Award, Fuel, Clock, DollarSign } from 'lucide-react';

export const VoyageOptimizer = () => {
  const { config, updateConfig, plan, runOptimization } = useFleet();

  // Generate comparisons for 4 distinct service profiles using current vessel, ports, fuel
  const scenarios = SERVICE_PROFILES.slice(0, 4).map((service) => {
    const candidate = calculateVoyagePlan({
      ...config,
      serviceId: service.id
    });
    return { service, candidate };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Multi-Scenario Voyage Optimizer
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Compare QEA Pareto-optimal frontiers across service priority envelopes, fuel consumption curves, and delivery deadlines.
          </p>
        </div>

        <button
          onClick={runOptimization}
          className="btn btn-primary"
        >
          <Zap size={14} fill="currentColor" />
          RE-EVALUATE ALL CANDIDATES
        </button>
      </div>

      {/* Configuration Controls */}
      <VoyageConfig />

      {/* Route Map Preview */}
      <RouteMap height={320} />

      {/* Side-by-Side Candidate Scenarios Grid */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11.5px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          PARETO-OPTIMAL CANDIDATE STRATEGIES:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '14px'
        }}>
          {scenarios.map(({ service, candidate }) => {
            const isSelected = config.serviceId === service.id;

            return (
              <div
                key={service.id}
                className="q-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isSelected ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  padding: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {service.name}
                      </h3>
                      <div style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                        {service.badge}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                        <Check size={10} /> ACTIVE
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.35 }}>
                    {service.description}
                  </p>

                  {/* Metrics Table */}
                  <div style={{
                    backgroundColor: 'var(--bg-inset)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Target Speed:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{candidate.speed} kn</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Fuel Burn:</span>
                      <span style={{ color: 'var(--accent-marine)', fontWeight: 600 }}>{candidate.fuelConsumption} t</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>CO₂ Emissions:</span>
                      <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{candidate.co2} t</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Predicted CII:</span>
                      <span style={{ color: candidate.ciiRating === 'A' ? 'var(--accent-green)' : 'var(--accent-cyan)', fontWeight: 700 }}>
                        {candidate.cii} ({candidate.ciiRating})
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total Cost:</span>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>₹{candidate.totalCost.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Arrival ETA:</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '10px' }}>{candidate.etaDate}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <button
                    onClick={() => updateConfig({ serviceId: service.id })}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', padding: '7px 0', fontSize: '11px' }}
                  >
                    {isSelected ? 'CURRENTLY APPLIED' : 'APPLY THIS STRATEGY'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
