import React from 'react';
import { useFleet } from '../context/FleetContext';
import { 
  DollarSign, 
  Fuel, 
  Cloud, 
  Award, 
  Clock, 
  Navigation, 
  TrendingDown, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export const KPICards = () => {
  const { plan, stormState } = useFleet();
  const isStormActive = stormState.intensity !== 'none';

  const cards = [
    {
      id: "cost",
      label: "TOTAL VOYAGE COST",
      value: `₹${plan.totalCost.toLocaleString()}`,
      unit: "INR",
      comparison: `↓ 11.7% vs unoptimized baseline`,
      isPositive: true,
      icon: DollarSign,
      color: "var(--accent-cyan)",
      subtext: `Bunker: ₹${plan.fuelCost.toLocaleString()} • Carbon: ₹${plan.carbonCost.toLocaleString()}`
    },
    {
      id: "fuel",
      label: "FUEL CONSUMPTION",
      value: `${plan.fuelConsumption.toLocaleString()}`,
      unit: "tonnes",
      comparison: `↓ 11.8% vs standard burn`,
      isPositive: true,
      icon: Fuel,
      color: "var(--accent-marine)",
      subtext: `${plan.fuel.shortName} • Energy: ${plan.fuel.energyDensity} MJ/kg`
    },
    {
      id: "emissions",
      label: "CO₂ EMISSIONS",
      value: `${plan.co2.toLocaleString()}`,
      unit: "tonnes CO₂",
      comparison: `↓ ${plan.co2ReductionPct}% vs baseline`,
      isPositive: true,
      icon: Cloud,
      color: "var(--accent-green)",
      subtext: `WtW Intensity: ${plan.fuel.wtwEmissions} t/t fuel`
    },
    {
      id: "cii",
      label: "PREDICTED IMO CII",
      value: `${plan.cii}`,
      unit: `RATING [ ${plan.ciiRating} ]`,
      comparison: `IMO 2026 Compliant`,
      isPositive: plan.ciiRating === "A" || plan.ciiRating === "B",
      icon: Award,
      color: plan.ciiRating === "A" ? "#10b981" : plan.ciiRating === "B" ? "#0284c7" : "#d97706",
      subtext: `Status: ${plan.ciiStatus}`
    },
    {
      id: "eta",
      label: "PROJECTED ETA",
      value: plan.etaDate.split(',')[0],
      unit: plan.etaDate.split(',')[1] || "14:20 UTC",
      comparison: isStormActive && plan.storm.etaDelayHours > 0 ? `+${Math.round(plan.storm.etaDelayHours * 60)} min weather delay` : "On Schedule",
      isPositive: !isStormActive,
      icon: Clock,
      color: isStormActive ? "var(--accent-amber)" : "var(--accent-green)",
      subtext: `Transit: ${Math.round(plan.etaDurationHours)} hrs @ ${plan.speed} kn`
    },
    {
      id: "distance",
      label: "VOYAGE DISTANCE",
      value: `${plan.distance.toLocaleString()}`,
      unit: "nautical miles",
      comparison: `Optimal oceanic geodesics`,
      isPositive: true,
      icon: Navigation,
      color: "var(--text-secondary)",
      subtext: `${plan.sourcePort.name} → ${plan.destPort.name}`
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px'
    }}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="q-card"
            style={{
              padding: '14px 14px',
              borderLeft: `3px solid ${card.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '112px'
            }}
          >
            {/* Top header line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--text-muted)'
              }}>
                {card.label}
              </span>
              <Icon size={14} color={card.color} />
            </div>

            {/* Main Value and Unit */}
            <div style={{ margin: '6px 0' }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '6px'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1
                }}>
                  {card.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: card.color,
                  fontWeight: 600
                }}>
                  {card.unit}
                </span>
              </div>
            </div>

            {/* Comparison vs baseline footer */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10.5px',
                fontFamily: 'var(--font-mono)',
                color: card.isPositive ? 'var(--accent-green)' : 'var(--accent-amber)'
              }}>
                {card.isPositive ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                <span>{card.comparison}</span>
              </div>

              <div style={{
                fontSize: '9.5px',
                color: 'var(--text-dim)',
                marginTop: '3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
