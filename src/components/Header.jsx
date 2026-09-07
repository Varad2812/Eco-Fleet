import React, { useState, useEffect } from 'react';
import { useFleet } from '../context/FleetContext';
import { 
  Clock, 
  Activity, 
  UserCheck, 
  Play, 
  RotateCcw, 
  Zap, 
  AlertTriangle,
  Radio,
  Sun,
  Moon
} from 'lucide-react';

export const Header = () => {
  const { 
    stormState, 
    startDemo, 
    resetSimulation, 
    demoMode, 
    demoStep, 
    nextDemoStep, 
    weatherCountdown,
    snapshotIndex,
    theme,
    toggleTheme
  } = useFleet();

  const [utcTime, setUtcTime] = useState('');

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toUTCString().replace('GMT', 'UTC');
      setUtcTime(str);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isStormActive = stormState.intensity !== 'none';

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      zIndex: 10
    }}>
      {/* Title & Live Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ECO-FLEET COMMAND CENTER
            <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '2px 6px' }}>
              <span className="status-dot cyan pulse" />
              LIVE SIMULATION
            </span>
          </h1>
        </div>

        {/* Global telemetry quick metrics */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          paddingLeft: '16px',
          borderLeft: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>●</span>
            <span><strong>06</strong> VESSELS</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: 'var(--accent-green)' }}>●</span>
            <span><strong>06</strong> TRUNK ROUTES</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: isStormActive ? 'var(--accent-red)' : 'var(--accent-cyan)' }}>●</span>
            <span>METOCEAN SATELLITE FEED ({weatherCountdown}s)</span>
          </div>
        </div>
      </div>

      {/* Action Controls & Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* UTC Clock */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 10px',
          backgroundColor: 'var(--bg-inset)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--accent-cyan)'
        }}>
          <Clock size={12} />
          <span>{utcTime || "SYNCING UTC..."}</span>
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          title={theme === 'light' ? "Switch to Tactical Night Watch Dark Mode" : "Switch to Executive Light Mode"}
          style={{ padding: '6px 11px', fontSize: '11px', gap: '6px' }}
        >
          {theme === 'light' ? (
            <>
              <Moon size={12} color="var(--accent-cyan)" />
              <span>DARK</span>
            </>
          ) : (
            <>
              <Sun size={12} color="var(--accent-amber)" />
              <span>LIGHT</span>
            </>
          )}
        </button>

        {/* Reset Simulation button */}
        <button
          onClick={resetSimulation}
          className="btn btn-secondary"
          title="Reset voyage and clear weather disruptions"
          style={{ padding: '6px 10px', fontSize: '11px' }}
        >
          <RotateCcw size={13} />
          RESET
        </button>

        {/* Executive Walkthrough Tour button */}
        {!demoMode ? (
          <button
            onClick={startDemo}
            className="btn btn-primary"
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            <Play size={13} fill="currentColor" />
            EXECUTIVE WALKTHROUGH
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={nextDemoStep}
              className="btn btn-accent"
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              <Zap size={13} />
              NEXT STEP ({demoStep}/7)
            </button>
          </div>
        )}

        {/* Operator Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingLeft: '10px',
          borderLeft: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-inset)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}>
            <UserCheck size={14} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Fleet Operations</div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COMMAND ROLE</div>
          </div>
        </div>
      </div>
    </header>
  );
};
