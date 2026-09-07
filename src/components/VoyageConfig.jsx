import React from 'react';
import { useFleet } from '../context/FleetContext';
import { VESSELS } from '../data/vessels';
import { PORTS } from '../data/ports';
import { FUELS } from '../data/fuels';
import { SERVICE_PROFILES } from '../data/services';
import { Sliders, Ship, MapPin, Fuel, Calendar, Package, ArrowRightLeft } from 'lucide-react';

export const VoyageConfig = () => {
  const { config, updateConfig, plan, isOptimizing } = useFleet();

  const currentVessel = VESSELS.find(v => v.id === config.vesselId) || VESSELS[0];
  const currentFuel = FUELS.find(f => f.id === config.fuelId) || FUELS[0];
  const currentService = SERVICE_PROFILES.find(s => s.id === config.serviceId) || SERVICE_PROFILES[0];

  // Swap ports helper
  const handleSwapPorts = () => {
    updateConfig({
      sourceId: config.destId,
      destId: config.sourceId
    });
  };

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <Sliders size={15} color="var(--accent-cyan)" />
          <span>Voyage Configuration Engine</span>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>
          QEA PARAMETER MATRIX
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {/* Vessel Selector */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Ship size={12} color="var(--accent-cyan)" />
            <span>Vessel Assignment</span>
          </label>
          <select
            className="form-select font-mono"
            value={config.vesselId}
            onChange={(e) => updateConfig({ vesselId: e.target.value })}
            disabled={isOptimizing}
          >
            {VESSELS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.category} • {v.capacity})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Max {currentVessel.maxSpeed} kn • Base Burn: {currentVessel.baseFuelRate} t/d • CII: {currentVessel.ciiBaseline}
          </div>
        </div>

        {/* Source Port */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} color="var(--accent-green)" />
            <span>Departure Port (Origin)</span>
          </label>
          <select
            className="form-select font-mono"
            value={config.sourceId}
            onChange={(e) => updateConfig({ sourceId: e.target.value })}
            disabled={isOptimizing}
          >
            {PORTS.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === config.destId}>
                {p.name} ({p.country})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Turnaround: {PORTS.find(p => p.id === config.sourceId)?.turnaroundHours}h • Congestion: Low
          </div>
        </div>

        {/* Swap Ports Quick Button */}
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '16px' }}>
          <button
            type="button"
            onClick={handleSwapPorts}
            className="btn btn-secondary"
            title="Swap Origin and Destination"
            style={{ width: '100%', height: '36px', padding: '0 8px' }}
          >
            <ArrowRightLeft size={14} />
            <span style={{ fontSize: '11px' }}>REVERSE ROUTE</span>
          </button>
        </div>

        {/* Destination Port */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} color="var(--accent-cyan)" />
            <span>Destination Port (Discharge)</span>
          </label>
          <select
            className="form-select font-mono"
            value={config.destId}
            onChange={(e) => updateConfig({ destId: e.target.value })}
            disabled={isOptimizing}
          >
            {PORTS.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === config.sourceId}>
                {p.name} ({p.country})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Berth Draft: {PORTS.find(p => p.id === config.destId)?.draftLimit} • Direct Channel
          </div>
        </div>

        {/* Marine Fuel Selection */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Fuel size={12} color="var(--accent-marine)" />
            <span>Marine Fuel Profile</span>
          </label>
          <select
            className="form-select font-mono"
            value={config.fuelId}
            onChange={(e) => updateConfig({ fuelId: e.target.value })}
            disabled={isOptimizing}
          >
            {FUELS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.shortName} (₹{f.pricePerTonne.toLocaleString()}/t • WtW: {f.wtwEmissions})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '10px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {currentFuel.badge} • Availability: {currentFuel.availability}
          </div>
        </div>

        {/* Service Profile */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sliders size={12} color="var(--accent-amber)" />
            <span>Charter Service Profile</span>
          </label>
          <select
            className="form-select font-mono"
            value={config.serviceId}
            onChange={(e) => updateConfig({ serviceId: e.target.value })}
            disabled={isOptimizing}
          >
            {SERVICE_PROFILES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.targetSpeedKn} kn • {s.badge})
              </option>
            ))}
          </select>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {currentService.description}
          </div>
        </div>

        {/* Cargo Tonnage Input & Slider */}
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Package size={12} color="var(--accent-cyan)" />
              <span>Payload Cargo Displacement</span>
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {config.cargoTonnes.toLocaleString()} MT
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <input
              type="range"
              min="5000"
              max={currentVessel.cargoMax || 50000}
              step="500"
              value={config.cargoTonnes}
              onChange={(e) => updateConfig({ cargoTonnes: Number(e.target.value) })}
              disabled={isOptimizing}
              style={{
                flex: 1,
                accentColor: 'var(--accent-cyan)',
                height: '4px',
                cursor: 'pointer'
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)'
            }}>
              <span>Max: {(currentVessel.cargoMax || 45000).toLocaleString()} t</span>
            </div>
          </div>
        </div>

        {/* Departure Date/Time */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={12} color="var(--accent-cyan)" />
            <span>Simulated Departure Time</span>
          </label>
          <input
            type="datetime-local"
            className="form-input font-mono"
            value={config.departureDate}
            onChange={(e) => updateConfig({ departureDate: e.target.value })}
            disabled={isOptimizing}
          />
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Scheduled Port Clearance Window
          </div>
        </div>
      </div>
    </div>
  );
};
