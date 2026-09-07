import React from 'react';
import { useFleet } from '../context/FleetContext';
import { Award, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

export const CIICard = () => {
  const { plan } = useFleet();
  const { cii, ciiRating, ciiStatus, vessel } = plan;

  const grades = [
    { grade: "A", range: "CII ≤ 5.8", label: "Superior", color: "#00e5a3" },
    { grade: "B", range: "5.8 < CII ≤ 7.5", label: "Compliant", color: "#38bdf8" },
    { grade: "C", range: "7.5 < CII ≤ 8.4", label: "Acceptable", color: "#fbbf24" },
    { grade: "D", range: "8.4 < CII ≤ 9.2", label: "Corrective Plan Req.", color: "#f97316" },
    { grade: "E", range: "CII > 9.2", label: "Non-Compliant", color: "#ef4444" }
  ];

  const isCompliant = ciiRating === "A" || ciiRating === "B" || ciiRating === "C";

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <Award size={15} color="var(--accent-cyan)" />
          <span>IMO CII Carbon Intensity Compliance</span>
        </div>
        <span className={`badge ${isCompliant ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '9px' }}>
          {isCompliant ? <ShieldCheck size={11} /> : <AlertTriangle size={11} />}
          {ciiStatus}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        alignItems: 'center'
      }}>
        {/* Left: Rating and Big Score */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px',
          backgroundColor: 'rgba(5, 12, 22, 0.65)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: ciiRating === 'A' ? 'rgba(0, 229, 163, 0.2)' : ciiRating === 'B' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            border: `2px solid ${ciiRating === 'A' ? '#00e5a3' : ciiRating === 'B' ? '#38bdf8' : '#f59e0b'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 800,
            color: '#ffffff',
            boxShadow: `0 0 20px ${ciiRating === 'A' ? '#00e5a333' : '#38bdf833'}`
          }}>
            {ciiRating}
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              PROJECTED VOYAGE CII
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
              {cii} <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>gCO₂ / (DWT•nm)</span>
            </div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Vessel Baseline: {vessel.ciiBaseline} • Target: {vessel.ciiTarget}
            </div>
          </div>
        </div>

        {/* Right: Scaled Bands A to E */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            color: 'var(--text-muted)',
            marginBottom: '8px'
          }}>
            IMO MARPOL ANNEX VI RATING SPECTRUM:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '6px'
          }}>
            {grades.map((g) => {
              const isActive = g.grade === ciiRating;

              return (
                <div
                  key={g.grade}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? `${g.color}28` : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? `1.5px solid ${g.color}` : '1px solid var(--border-subtle)',
                    textAlign: 'center',
                    boxShadow: isActive ? `0 0 12px ${g.color}55` : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: isActive ? '#ffffff' : g.color
                  }}>
                    {g.grade}
                  </div>
                  <div style={{
                    fontSize: '8.5px',
                    fontFamily: 'var(--font-mono)',
                    color: isActive ? '#ffffff' : 'var(--text-dim)',
                    marginTop: '2px'
                  }}>
                    {g.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: '8px',
            fontSize: '10.5px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Info size={12} color="var(--accent-cyan)" />
            <span>Plan remains strictly constrained within the configured CII operating threshold.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
