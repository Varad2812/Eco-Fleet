import React from 'react';
import { useFleet } from '../context/FleetContext';
import { 
  Compass, 
  Navigation, 
  Ship, 
  CloudRain, 
  RotateCcw, 
  Award, 
  BarChart3, 
  Sliders, 
  Radio, 
  Cpu,
  Layers
} from 'lucide-react';

const NAV_ITEMS = [
  { id: "command-center", label: "Command Center", icon: Compass, badge: "LIVE" },
  { id: "voyage-optimizer", label: "Voyage Optimizer", icon: Navigation },
  { id: "fleet", label: "Fleet Telemetry", icon: Ship, badge: "6 SHIPS" },
  { id: "weather", label: "Weather & Ocean", icon: CloudRain, badge: "30s" },
  { id: "reoptimization", label: "Re-Optimization", icon: RotateCcw },
  { id: "cii", label: "CII & Emissions", icon: Award },
  { id: "benchmark", label: "Benchmark", icon: BarChart3, badge: "QEA" },
  { id: "settings", label: "Settings", icon: Sliders }
];

export const Sidebar = () => {
  const { activePage, setActivePage, stormState } = useFleet();

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100%',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexShrink: 0,
      zIndex: 20
    }}>
      {/* Brand Header */}
      <div>
        <div style={{
          padding: '18px 16px 14px 16px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(0, 240, 255, 0.4)'
            }}>
              <Layers size={18} color="#050c18" strokeWidth={2.4} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
                lineHeight: 1.1
              }}>
                ECO-FLEET
              </div>
              <div style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: 'var(--accent-cyan)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Green Fleet Optimizer
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const isStormActive = item.id === 'reoptimization' && stormState.intensity !== 'none';

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive 
                    ? 'linear-gradient(90deg, rgba(0, 240, 255, 0.16) 0%, rgba(0, 240, 255, 0.04) 100%)' 
                    : 'transparent',
                  border: isActive ? '1px solid rgba(0, 240, 255, 0.35)' : '1px solid transparent',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span style={{
                    fontSize: '12.5px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.02em'
                  }}>
                    {item.label}
                  </span>
                </div>

                {isStormActive ? (
                  <span className="badge badge-red pulse" style={{ padding: '1px 5px', fontSize: '9px' }}>
                    ALERT
                  </span>
                ) : item.badge ? (
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    background: isActive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'
                  }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Simulated System Status Telemetry */}
      <div style={{
        padding: '14px 14px',
        margin: '10px',
        backgroundColor: 'rgba(5, 10, 18, 0.8)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          <Radio size={11} color="var(--accent-cyan)" />
          SYSTEM TELEMETRY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <span className="status-dot green pulse" />
            <span>QEA Solver: <strong style={{ color: '#4ade80' }}>ONLINE</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <span className="status-dot cyan pulse" />
            <span>Weather Feed: <strong style={{ color: '#38bdf8' }}>30s CYCLE</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <span className="status-dot green" />
            <span>Fleet Synced: <strong style={{ color: '#4ade80' }}>6/6 ACTIVE</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
