import React from 'react';
import { useFleet } from '../context/FleetContext';
import { RotateCcw, CheckCircle2, Loader2, ArrowRight, ShieldCheck, X } from 'lucide-react';

const REOPT_STAGES = [
  "Weather anomaly detected & boundary vector computed",
  "Dynamic hydrodynamic fuel consumption model updated",
  "Nautical route slamming & parametric roll risk evaluated",
  "Deep-water southern candidate detour corridors generated",
  "IMO CII operational threshold strictly validated",
  "New optimal storm-avoidance voyage plan selected"
];

export const ReoptimizationModal = () => {
  const { 
    isReoptimizing, 
    reoptStage, 
    isReoptModalOpen, 
    setIsReoptModalOpen, 
    comparison, 
    plan 
  } = useFleet();

  if (!isReoptModalOpen) return null;

  const isFinished = !isReoptimizing;

  const original = comparison.original || plan;
  const reopt = comparison.reoptimized || plan;

  return (
    <div className="modal-overlay" onClick={() => !isReoptimizing && setIsReoptModalOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        {/* Header */}
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
              backgroundColor: 'rgba(0, 240, 255, 0.18)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <RotateCcw size={18} className={isReoptimizing ? "pulse" : ""} />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em'
              }}>
                DYNAMIC RE-OPTIMIZATION ENGINE
              </h2>
              <div style={{ fontSize: '10.5px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                Automated Incident Recovery & Real-Time Weather Rerouting
              </div>
            </div>
          </div>

          {!isReoptimizing && (
            <button
              onClick={() => setIsReoptModalOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isReoptimizing ? (
            /* Animated Verification Pipeline */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                DISRUPTION RE-ROUTING PIPELINE:
              </div>

              {REOPT_STAGES.map((text, idx) => {
                const isCompleted = reoptStage > idx;
                const isCurrent = reoptStage === idx;

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isCurrent ? 'rgba(0, 240, 255, 0.08)' : isCompleted ? 'rgba(0, 229, 163, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      border: isCurrent ? '1px solid var(--border-bright)' : isCompleted ? '1px solid rgba(0, 229, 163, 0.3)' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {isCompleted ? (
                        <CheckCircle2 size={14} color="var(--accent-green)" />
                      ) : isCurrent ? (
                        <Loader2 size={14} color="var(--accent-cyan)" className="pulse" />
                      ) : (
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid var(--text-dim)' }} />
                      )}
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        color: isCompleted ? '#ffffff' : isCurrent ? 'var(--accent-cyan)' : 'var(--text-dim)'
                      }}>
                        {text}
                      </span>
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      color: isCompleted ? 'var(--accent-green)' : isCurrent ? 'var(--accent-cyan)' : 'var(--text-dim)'
                    }}>
                      {isCompleted ? '✓ VERIFIED' : isCurrent ? 'PROCESSING...' : 'WAITING'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Finished: Before vs After Disruption Comparison Table */
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'rgba(0, 229, 163, 0.12)',
                border: '1px solid rgba(0, 229, 163, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px'
              }}>
                <ShieldCheck size={16} color="var(--accent-green)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: '#ffffff' }}>
                  <strong>OPTIMAL DETOUR GENERATED:</strong> Severe wave region safely bypassed with minimum fuel penalty.
                </span>
              </div>

              {/* Comparison Table */}
              <div style={{
                backgroundColor: 'rgba(5, 12, 22, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left' }}>METRIC</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>ORIGINAL PLAN</th>
                      <th style={{ padding: '10px 14px', textAlign: 'center' }}></th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--accent-cyan)' }}>RE-OPTIMIZED DETOUR</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>DELTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '9px 14px', color: '#ffffff' }}>Fuel Consumption</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right' }}>{original.fuelConsumption} t</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text-dim)' }}><ArrowRight size={12} /></td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-cyan)', fontWeight: 600 }}>{reopt.fuelConsumption} t</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-amber)' }}>+{reopt.fuelConsumption - original.fuelConsumption} t (+{reopt.storm.fuelImpactPct}%)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '9px 14px', color: '#ffffff' }}>Total Cost</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right' }}>₹{original.totalCost.toLocaleString()}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text-dim)' }}><ArrowRight size={12} /></td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-cyan)', fontWeight: 600 }}>₹{reopt.totalCost.toLocaleString()}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-amber)' }}>+₹{(reopt.totalCost - original.totalCost).toLocaleString()}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '9px 14px', color: '#ffffff' }}>CO₂ Emissions</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right' }}>{original.co2} t</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text-dim)' }}><ArrowRight size={12} /></td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-cyan)', fontWeight: 600 }}>{reopt.co2} t</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-amber)' }}>+{reopt.co2 - original.co2} t</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '9px 14px', color: '#ffffff' }}>Operating Speed</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right' }}>{original.speed} kn</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text-dim)' }}><ArrowRight size={12} /></td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-cyan)', fontWeight: 600 }}>{reopt.speed} kn</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{reopt.speed - original.speed} kn</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '9px 14px', color: '#ffffff' }}>CII Rating</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right' }}>{original.cii} (Rating {original.ciiRating})</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text-dim)' }}><ArrowRight size={12} /></td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-green)', fontWeight: 600 }}>{reopt.cii} (Rating {reopt.ciiRating})</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--accent-green)' }}>COMPLIANT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          background: 'rgba(11, 20, 36, 0.9)'
        }}>
          <button
            onClick={() => setIsReoptModalOpen(false)}
            className="btn btn-primary"
            disabled={isReoptimizing}
          >
            {isReoptimizing ? 'COMPUTING RE-ROUTE...' : 'CONFIRM & APPLY NEW ROUTE'}
          </button>
        </div>
      </div>
    </div>
  );
};
