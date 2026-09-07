import React from 'react';
import { useFleet } from '../context/FleetContext';
import { HelpCircle, BarChart2, CheckCircle2 } from 'lucide-react';

export const ExplainabilityCard = () => {
  const { plan } = useFleet();
  const { explainabilityDrivers, explainabilityReasons } = plan;

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <HelpCircle size={15} color="var(--accent-cyan)" />
          <span>Why This Plan? (Predictive Drivers)</span>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
          SHAP-STYLE EXPLANATION
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {/* Left: SHAP-Style Importance Bars */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginBottom: '10px'
          }}>
            DECISION FEATURE ATTRIBUTION WEIGHTS:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {explainabilityDrivers.map((driver, idx) => (
              <div key={idx}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  marginBottom: '3px'
                }}>
                  <span style={{ color: '#ffffff' }}>{driver.factor}</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{driver.impact}</span>
                </div>

                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${driver.score}%`,
                    height: '100%',
                    background: idx === 0 
                      ? 'linear-gradient(90deg, #00f0ff 0%, #0284c7 100%)' 
                      : 'linear-gradient(90deg, #38bdf8 0%, #00e5a3 100%)',
                    borderRadius: '3px'
                  }} />
                </div>

                <div style={{
                  fontSize: '9.5px',
                  color: 'var(--text-muted)',
                  marginTop: '2px'
                }}>
                  {driver.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ranked Operational Reasons */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginBottom: '10px'
          }}>
            RANKED OPTIMIZATION RATIONALE:
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px 14px',
            backgroundColor: 'rgba(5, 12, 22, 0.65)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)'
          }}>
            {explainabilityReasons.map((reason, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={13} color="var(--accent-green)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
