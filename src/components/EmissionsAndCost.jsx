import React from 'react';
import { useFleet } from '../context/FleetContext';
import { DollarSign, Cloud, PieChart, TrendingDown } from 'lucide-react';

export const EmissionsAndCost = () => {
  const { plan } = useFleet();
  const { 
    totalCost, 
    fuelCost, 
    carbonCost, 
    portCost, 
    demurrageRiskCost, 
    co2, 
    co2Baseline, 
    co2ReductionPct,
    fuel
  } = plan;

  const costBreakdown = [
    { label: "Bunker Fuel", amount: fuelCost, pct: Math.round((fuelCost / totalCost) * 100), color: "#00f0ff" },
    { label: "Carbon ETS / Levy", amount: carbonCost, pct: Math.round((carbonCost / totalCost) * 100), color: "#00e5a3" },
    { label: "Port & Canal Dues", amount: portCost, pct: Math.round((portCost / totalCost) * 100), color: "#38bdf8" },
    { label: "Demurrage Risk Reserve", amount: demurrageRiskCost, pct: Math.round((demurrageRiskCost / totalCost) * 100), color: "#f59e0b" }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '12px'
    }}>
      {/* Voyage Cost Breakdown Card */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <DollarSign size={15} color="var(--accent-cyan)" />
            <span>Voyage Expenditure Breakdown</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            ₹{totalCost.toLocaleString()} TOTAL
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div style={{
          width: '100%',
          height: '10px',
          borderRadius: '5px',
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }}>
          {costBreakdown.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: `${item.pct}%`,
                height: '100%',
                backgroundColor: item.color,
                transition: 'width 0.4s ease'
              }}
              title={`${item.label}: ₹${item.amount.toLocaleString()} (${item.pct}%)`}
            />
          ))}
        </div>

        {/* Breakdown Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {costBreakdown.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
                fontFamily: 'var(--font-mono)',
                padding: '4px 0',
                borderBottom: idx < costBreakdown.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: item.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{item.amount.toLocaleString()}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carbon & GHG Emissions Card */}
      <div className="q-card">
        <div className="q-card-header">
          <div className="q-card-title">
            <Cloud size={15} color="var(--accent-green)" />
            <span>Decarbonization & Emissions Audit</span>
          </div>
          <span className="badge badge-green" style={{ fontSize: '9px' }}>
            <TrendingDown size={10} /> -{co2ReductionPct}% CO₂
          </span>
        </div>

        {/* Baseline vs Optimized Visual Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Unoptimized Baseline Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Standard Baseline (VLSFO Standard Route):</span>
              <span style={{ color: 'var(--text-secondary)' }}>{co2Baseline.toLocaleString()} tonnes CO₂</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#64748b' }} />
            </div>
          </div>

          {/* QEA Optimized Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Eco-Fleet Quantum-Optimized Plan:</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{co2.toLocaleString()} tonnes CO₂</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.round((co2 / co2Baseline) * 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff 0%, #00e5a3 100%)'
              }} />
            </div>
          </div>

          {/* Environmental Metrics Quick Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            marginTop: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(5, 12, 22, 0.65)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>NET CO₂ SAVED</div>
              <div style={{ color: 'var(--accent-green)', fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                {(co2Baseline - co2).toLocaleString()} t
              </div>
            </div>

            <div style={{ padding: '8px', backgroundColor: 'rgba(5, 12, 22, 0.65)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>WELL-TO-WAKE FACTOR</div>
              <div style={{ color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>
                {fuel.wtwEmissions} t CO₂e / t
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
