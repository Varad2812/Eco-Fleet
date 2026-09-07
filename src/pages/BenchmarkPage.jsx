import React from 'react';
import { BENCHMARK_DATA } from '../data/benchmark';
import { BarChart3, Cpu, Zap, Activity, Info, ShieldCheck } from 'lucide-react';

export const BenchmarkPage = () => {
  const { prediction, optimization, paretoMetrics, note, label, hardwareProfile } = BENCHMARK_DATA;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-cyan">
              {label}
            </span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              ALGORITHMIC CONVERGENCE & METRIC VALIDATION
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
            Classical vs Quantum-Inspired Benchmarks
          </h2>
        </div>

        <div style={{
          padding: '6px 12px',
          backgroundColor: 'rgba(5, 12, 22, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          color: 'var(--text-secondary)'
        }}>
          Cluster: {hardwareProfile}
        </div>
      </div>

      {/* Production Note Banner */}
      <div style={{
        padding: '10px 14px',
        backgroundColor: 'rgba(0, 240, 255, 0.06)',
        borderLeft: '3px solid var(--accent-cyan)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Info size={14} color="var(--accent-cyan)" />
        <span><strong>METHODOLOGY NOTE:</strong> {note}</span>
      </div>

      {/* 1. Weather-Aware Fuel Prediction Benchmark (XGBoost vs QINN) */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Cpu size={15} color="var(--accent-cyan)" />
            <span>1. Hydrodynamic Fuel Consumption Prediction (Classical ML vs QINN)</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            12,400 TEST SEGMENTS
          </span>
        </div>

        <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {prediction.subtitle}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>MODEL ARCHITECTURE</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>CATEGORY</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>MAE</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>RMSE</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>R² SCORE</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>INFERENCE LATENCY</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>GENERALIZATION NOTES</th>
              </tr>
            </thead>
            <tbody>
              {prediction.models.map((m, idx) => {
                const isQ = m.name.includes("QINN");

                return (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      backgroundColor: isQ ? 'rgba(0, 240, 255, 0.06)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '10px 14px', color: isQ ? 'var(--accent-cyan)' : '#ffffff', fontWeight: isQ ? 700 : 500 }}>
                      {m.name}
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{m.category}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: isQ ? 'var(--accent-green)' : '#ffffff' }}>{m.mae}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: isQ ? 'var(--accent-green)' : '#ffffff' }}>{m.rmse}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: isQ ? 'var(--accent-cyan)' : '#ffffff' }}>{m.r2}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{m.predictionRuntime}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '10.5px' }}>{m.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: 'rgba(0, 229, 163, 0.08)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '11px',
          color: 'var(--accent-green)',
          fontFamily: 'var(--font-mono)'
        }}>
          {prediction.comparisonSummary}
        </div>
      </div>

      {/* 2. Multi-Objective Combinatorial Optimization Benchmark (MILP vs QEA) */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Zap size={15} color="var(--accent-cyan)" />
            <span>2. Combinatorial Voyage Optimization (Classical MILP vs Genetic vs QEA)</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            10¹² COMBINATORIAL SPACE
          </span>
        </div>

        <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {optimization.subtitle}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>SOLVER ALGORITHM</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>PARADIGM</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>SOLUTION COST</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>CO₂ TONNES</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>SOLVER RUNTIME</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>CII VIOLATIONS</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>SCALABILITY PROFILE</th>
              </tr>
            </thead>
            <tbody>
              {optimization.solvers.map((s, idx) => {
                const isQ = s.name.includes("QEA");

                return (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      backgroundColor: isQ ? 'rgba(0, 240, 255, 0.06)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '10px 14px', color: isQ ? 'var(--accent-cyan)' : '#ffffff', fontWeight: isQ ? 700 : 500 }}>
                      {s.name}
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{s.type}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: isQ ? 'var(--accent-green)' : '#ffffff' }}>{s.solutionCostUSD}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: isQ ? 'var(--accent-green)' : '#ffffff' }}>{s.co2Tonnes}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: isQ ? 'var(--accent-cyan)' : '#ffffff' }}>{s.runtimeSec}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--accent-green)' }}>{s.constraintViolations}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '10.5px' }}>{s.scalabilityLimit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '11px',
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-mono)'
        }}>
          {optimization.comparisonSummary}
        </div>
      </div>
    </div>
  );
};
