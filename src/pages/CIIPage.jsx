import React from 'react';
import { useFleet } from '../context/FleetContext';
import { CIICard } from '../components/CIICard';
import { FuelIntelligence } from '../components/FuelIntelligence';
import { VESSELS } from '../data/vessels';
import { Award, ShieldCheck, TrendingDown, AlertTriangle, Scale, Leaf } from 'lucide-react';

export const CIIPage = () => {
  const { plan } = useFleet();

  const regulatoryYears = [
    { year: "2023", reduction: "5%", baselineTarget: 8.2, status: "Passed" },
    { year: "2024", reduction: "7%", baselineTarget: 7.9, status: "Passed" },
    { year: "2025", reduction: "9%", baselineTarget: 7.6, status: "Current" },
    { year: "2026", reduction: "11%", baselineTarget: 7.3, status: "Targeted" },
    { year: "2028", reduction: "16%", baselineTarget: 6.7, status: "Planned" },
    { year: "2030", reduction: "22%", baselineTarget: 5.9, status: "IMO 2030 Goal" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
          IMO Decarbonization & Carbon Intensity Indicator (CII) Compliance
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Operational emissions monitoring under MARPOL Annex VI regulations. Eco-Fleet optimizes voyage profiles with strict mathematical CII constraints.
        </p>
      </div>

      {/* Active Voyage CII Card */}
      <CIICard />

      {/* Multi-Year IMO Trajectory Table */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Scale size={15} color="var(--accent-cyan)" />
            <span>IMO Decarbonization Reduction Factor Trajectory (2023 - 2030)</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            REGULATORY HORIZON
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px'
        }}>
          {regulatoryYears.map((ry) => {
            const isTarget = ry.year === "2026";

            return (
              <div
                key={ry.year}
                style={{
                  padding: '12px',
                  backgroundColor: isTarget ? 'rgba(0, 240, 255, 0.1)' : 'rgba(5, 12, 22, 0.65)',
                  border: isTarget ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: isTarget ? 'var(--accent-cyan)' : '#ffffff' }}>
                  {ry.year}
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 600, marginTop: '2px' }}>
                  -{ry.reduction}
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Target: {ry.baselineTarget} CII
                </div>
                <span className={`badge ${isTarget ? 'badge-cyan' : 'badge-green'}`} style={{ fontSize: '8.5px', marginTop: '6px' }}>
                  {ry.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet-wide CII Leaderboard Table */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Award size={15} color="var(--accent-cyan)" />
            <span>Fleet Vessels Operational CII Standings</span>
          </div>
          <span className="badge badge-green" style={{ fontSize: '9px' }}>
            FLEET COMPLIANCE: 100%
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>VESSEL</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>CATEGORY</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>DEADWEIGHT</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>CII BASELINE</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>CURRENT RATING</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {VESSELS.map((v) => (
                <tr key={v.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '10px 14px', color: '#ffffff', fontWeight: 600 }}>{v.name}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{v.category}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>{v.deadweight}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>{v.ciiBaseline}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: v.ciiRating === 'A' ? 'var(--accent-green)' : '#38bdf8' }}>
                    Rating {v.ciiRating}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span className="badge badge-green" style={{ fontSize: '9px' }}>
                      COMPLIANT
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alternative Fuels for CII Decarbonization */}
      <FuelIntelligence />
    </div>
  );
};
