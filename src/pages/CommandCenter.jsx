import React from 'react';
import { useFleet } from '../context/FleetContext';
import { HeroVoyageCard } from '../components/HeroVoyageCard';
import { VoyageConfig } from '../components/VoyageConfig';
import { RouteMap } from '../components/RouteMap';
import { KPICards } from '../components/KPICards';
import { ReoptimizationAuditCard } from '../components/ReoptimizationAuditCard';
import { MetoceanPanel } from '../components/MetoceanPanel';
import { ExplainabilityCard } from '../components/ExplainabilityCard';
import { FuelIntelligence } from '../components/FuelIntelligence';
import { CIICard } from '../components/CIICard';
import { EmissionsAndCost } from '../components/EmissionsAndCost';
import { EventFeed } from '../components/EventFeed';

export const CommandCenter = () => {
  const { stormState, comparison } = useFleet();
  const isStormActive = stormState.intensity !== 'none';
  const hasReoptComparison = Boolean(comparison.reoptimized || isStormActive);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Hero Active Voyage Dispatch Card */}
      <HeroVoyageCard />

      {/* Main Visual Display: Interactive Maritime Map */}
      <RouteMap height={500} />

      {/* Dynamic Re-Optimization Variance Card: Displays Previous Best Route vs Re-Optimized Plan */}
      {hasReoptComparison && <ReoptimizationAuditCard />}

      {/* Primary KPI Metrics Grid */}
      <KPICards />

      {/* Voyage Configuration Panel */}
      <VoyageConfig />

      {/* MetOcean Live Telemetry & Satellite Feed */}
      <MetoceanPanel />

      {/* Explainability / SHAP Predictive Drivers */}
      <ExplainabilityCard />

      {/* IMO CII Compliance Card */}
      <CIICard />

      {/* Alternative Fuel Intelligence */}
      <FuelIntelligence />

      {/* Expenditure and Emissions Audit */}
      <EmissionsAndCost />

      {/* Operations Live Stream Feed */}
      <EventFeed />
    </div>
  );
};
