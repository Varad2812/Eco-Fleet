import React from 'react';
import { useFleet } from '../context/FleetContext';
import { RouteMap } from '../components/RouteMap';
import { 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Fuel, 
  DollarSign, 
  Clock, 
  Cloud, 
  Award,
  Zap
} from 'lucide-react';

export const ReoptimizationPage = () => {
  const { 
    plan, 
    stormState, 
    comparison, 
    runReoptimization, 
    isReoptimizing, 
    setIsStormModalOpen 
  } = useFleet();

  const original = comparison.original || plan;
  const reopt = comparison.reoptimized || plan;
  const storm = stormState.activeScenario;
  const isStormActive = stormState.intensity !== 'none';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${isStormActive ? 'badge-red pulse' : 'badge-green'}`}>
              {isStormActive ? 'INCIDENT ACTIVE' : 'NOMINAL SAFETY'}
            </span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              CASUALTY & WEATHER RESPONSE ROOM
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            Dynamic Re-Optimization & Incident Recovery
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsStormModalOpen(true)}
            className="btn btn-secondary"
          >
            CHANGE DISRUPTION
          </button>

          <button
            onClick={runReoptimization}
            disabled={isReoptimizing}
            className="btn btn-primary"
          >
            <RotateCcw size={14} className={isReoptimizing ? "pulse" : ""} />
            {isReoptimizing ? 'EXECUTING RE-OPT...' : 'TRIGGER RE-OPTIMIZATION'}
          </button>
        </div>
      </div>

      {/* Disruption Incident Alert Banner */}
      <div style={{
        padding: '16px',
        backgroundColor: isStormActive ? 'var(--accent-red-dim)' : 'var(--accent-green-dim)',
        border: `1.5px solid ${isStormActive ? 'var(--accent-red)' : 'var(--accent-green)'}`,
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: isStormActive ? 'var(--accent-red-dim)' : 'var(--accent-green-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isStormActive ? 'var(--accent-red)' : 'var(--accent-green)'
          }}>
            {isStormActive ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}>
              {isStormActive ? `WEATHER EVENT: ${storm.name}` : "NOMINAL METOCEAN CONDITIONS"}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {storm.operationalAdvisory}
            </div>
          </div>
        </div>

        {isStormActive && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textAlign: 'right',
            flexShrink: 0
          }}>
            <div style={{ color: 'var(--accent-red)', fontWeight: 700 }}>WAVE: {storm.waveHeightM}m • GUSTS: {storm.windGustKn}kn</div>
            <div style={{ color: 'var(--text-muted)' }}>Vector: {storm.movementDirection} @ {storm.movementSpeedKn} kn</div>
          </div>
        )}
      </div>

      {/* Rerouted Map View */}
      <RouteMap height={460} />

      {/* Side-by-Side Before vs Disrupted vs Re-Optimized Breakdown */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <RotateCcw size={15} color="var(--accent-cyan)" />
            <span>Operational Variance Audit (Before vs Re-Optimized Detour)</span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            QEA AUDIT TRAIL
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {/* Fuel Variance Card */}
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-marine)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <Fuel size={13} />
              <span>FUEL CONSUMPTION</span>
            </div>
            <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              {reopt.fuelConsumption} t
            </div>
            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', marginTop: '2px' }}>
              +{reopt.fuelConsumption - original.fuelConsumption} t (+{reopt.storm.fuelImpactPct}%) vs nominal
            </div>
          </div>

          {/* Cost Variance Card */}
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <DollarSign size={13} />
              <span>TOTAL VOYAGE COST</span>
            </div>
            <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              ₹{reopt.totalCost.toLocaleString()}
            </div>
            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', marginTop: '2px' }}>
              +₹{(reopt.totalCost - original.totalCost).toLocaleString()} detour overhead
            </div>
          </div>

          {/* Schedule Impact Card */}
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <Clock size={13} />
              <span>SCHEDULE VARIANCE</span>
            </div>
            <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              +{Math.round(reopt.storm.etaDelayHours * 60)} min
            </div>
            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Arrival: {reopt.etaDate}
            </div>
          </div>

          {/* CII Rating Protection Card */}
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <Award size={13} />
              <span>IMO CII RATING</span>
            </div>
            <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-green)', marginTop: '6px' }}>
              Rating {reopt.ciiRating} ({reopt.cii})
            </div>
            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', marginTop: '2px' }}>
              Threshold Compliant (No Penalties)
            </div>
          </div>
        </div>

        {/* Operational Narrative Reason for Reroute */}
        <div style={{
          marginTop: '14px',
          padding: '12px 14px',
          backgroundColor: 'var(--bg-inset)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '3px solid var(--accent-cyan)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11.5px',
          lineHeight: 1.5,
          color: 'var(--text-secondary)'
        }}>
          <strong style={{ color: 'var(--text-primary)' }}>INCIDENT COMMAND SUMMARY:</strong> {isStormActive 
            ? `QEA autonomous re-optimization evaluated 1,420 alternate nautical nodes south of the storm front. Southern deep-water corridor diverts the vessel into 2.2m following seas, completely avoiding 6.4m wave crests and slamming pressures. Vessel safety, cargo integrity, and IMO CII compliance Rating ${reopt.ciiRating} are guaranteed.`
            : "No active meteorological disruptions registered on planned track. Vessel maintaining prime quantum-evaluated heading."}
        </div>
      </div>
    </div>
  );
};
