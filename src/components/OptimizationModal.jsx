import React from 'react';
import { useFleet } from '../context/FleetContext';
import { Cpu, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

const STAGES = [
  "Checking metocean wave & wind constraints",
  "Verifying vessel hydrodynamic hull envelope",
  "Calculating multi-fuel thermodynamic burn curves",
  "Generating candidate geodesic nautical routes",
  "Enforcing IMO CII operational rating constraints",
  "Executing Quantum-Inspired Evolutionary Algorithm (QEA)"
];

export const OptimizationModal = () => {
  const { isOptimizing, optStage, plan } = useFleet();

  if (!isOptimizing) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(11, 20, 36, 0.9)'
        }}>
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
            <Cpu size={18} className="pulse" />
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.04em'
            }}>
              QEA VOYAGE OPTIMIZATION SOLVER
            </h2>
            <div style={{ fontSize: '10.5px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              Evaluating Multi-Objective Energy, Schedule & CII Space
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            SOLVER CONVERGENCE PIPELINE:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {STAGES.map((text, idx) => {
              const isCompleted = optStage > idx;
              const isCurrent = optStage === idx;

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
                      color: isCompleted ? '#ffffff' : isCurrent ? 'var(--accent-cyan)' : 'var(--text-dim)',
                      fontWeight: isCurrent ? 600 : 400
                    }}>
                      {text}
                    </span>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: isCompleted ? 'var(--accent-green)' : isCurrent ? 'var(--accent-cyan)' : 'var(--text-dim)'
                  }}>
                    {isCompleted ? '✓ VERIFIED' : isCurrent ? 'PROCESSING...' : 'PENDING'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '10px' }}>
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(optStage / STAGES.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff 0%, #00e5a3 100%)',
                transition: 'width 0.35s ease'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
