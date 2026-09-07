import React from 'react';
import { useFleet } from '../context/FleetContext';
import { Play, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

const DEMO_STEPS = [
  {
    step: 1,
    title: "1. VOYAGE INGESTION & CONFIGURATION",
    script: "“Eco-Fleet ingests vessel hydrodynamics, cargo displacement, multi-fuel thermodynamics, and route constraints into a unified state space.”",
    action: "Select Ocean Pioneer • Jebel Ali → Singapore • LNG • Standard"
  },
  {
    step: 2,
    title: "2. QUANTUM-INSPIRED OPTIMIZATION (QEA)",
    script: "“Running QEA evaluates billions of speed, weather, and waypoint permutations in seconds to find the global Pareto-optimal voyage.”",
    action: "Review optimal speed (16.2 kn), ETA, 11.8% fuel savings, and CII rating B."
  },
  {
    step: 3,
    title: "3. METOCEAN REAL-TIME TELEMETRY",
    script: "“Live MetOcean satellite feeds stream oceanic wave, wind, and surface current telemetry along the active shipping corridor.”",
    action: "Observe live wave height gauges and continuous satellite sync."
  },
  {
    step: 4,
    title: "4. DISRUPTION DETECTION & STRESS TEST",
    script: "“Simulate a sudden severe cyclone developing directly over the planned shipping lane in the Arabian Sea.”",
    action: "Severe storm cell (6.4m waves) intersects the route. System triggers critical alert."
  },
  {
    step: 5,
    title: "5. DYNAMIC RE-OPTIMIZATION",
    script: "“Rather than manual shore recalculations, Eco-Fleet autonomously triggers dynamic re-optimization to formulate a safe detour.”",
    action: "Observe 6-stage re-optimization pipeline executing in real-time."
  },
  {
    step: 6,
    title: "6. BEFORE vs AFTER DISRUPTION SAVINGS",
    script: "“Inspect the Before vs Disrupted vs Re-Optimized comparison table. Notice how CII compliance is rigorously maintained.”",
    action: "Old route displayed in amber, new cyan detour activated with ship transitioning.”"
  },
  {
    step: 7,
    title: "7. CLASSICAL vs QUANTUM BENCHMARK",
    script: "“Finally, show the algorithmic performance comparison proving 17x faster convergence over classical MILP and lower MAE with QINN.”",
    action: "Review solver benchmarks, constraint violation scores, and runtime graphs."
  }
];

export const DemoTourBanner = () => {
  const { demoMode, demoStep, nextDemoStep, stopDemo } = useFleet();

  if (!demoMode || demoStep === 0) return null;

  const current = DEMO_STEPS[demoStep - 1] || DEMO_STEPS[0];

  return (
    <div style={{
      backgroundColor: 'rgba(11, 22, 42, 0.95)',
      borderBottom: '1px solid var(--accent-cyan)',
      boxShadow: '0 4px 25px rgba(0, 240, 255, 0.25)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      zIndex: 15,
      animation: 'slideDown 0.25s ease'
    }}>
      {/* Left: Step Info & Operational Walkthrough Script */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          backgroundColor: 'rgba(0, 240, 255, 0.15)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--accent-cyan)',
          fontWeight: 700,
          whiteSpace: 'nowrap'
        }}>
          <Sparkles size={13} />
          <span>OPERATIONAL WALKTHROUGH • STEP {demoStep} OF 7</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff'
          }}>
            {current.title}
          </div>
          <div style={{
            fontSize: '11.5px',
            color: '#cbd5e1',
            fontStyle: 'italic'
          }}>
            {current.script}
          </div>
        </div>
      </div>

      {/* Right: Next Step and Exit Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={nextDemoStep}
          className="btn btn-primary"
          style={{ padding: '6px 14px', fontSize: '11px' }}
        >
          <span>{demoStep === 7 ? 'FINISH WALKTHROUGH' : 'NEXT STEP'}</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={stopDemo}
          className="btn btn-secondary"
          style={{ padding: '6px 8px' }}
          title="Exit Walkthrough"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
