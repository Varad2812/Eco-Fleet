import React from 'react';
import { useFleet } from '../context/FleetContext';
import { Terminal, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const EventFeed = () => {
  const { events } = useFleet();

  return (
    <div className="q-card">
      <div className="q-card-header">
        <div className="q-card-title">
          <Terminal size={15} color="var(--accent-cyan)" />
          <span>Operations Event Stream (Live Telemetry Log)</span>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
          REAL-TIME AUDIT
        </span>
      </div>

      <div style={{
        maxHeight: '160px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        paddingRight: '4px'
      }}>
        {events.map((evt) => {
          let badgeColor = "var(--text-secondary)";
          let Icon = Info;

          if (evt.type === 'success') {
            badgeColor = "var(--accent-green)";
            Icon = CheckCircle2;
          } else if (evt.type === 'warning') {
            badgeColor = "var(--accent-amber)";
            Icon = AlertTriangle;
          } else if (evt.type === 'danger') {
            badgeColor = "var(--accent-red)";
            Icon = AlertCircle;
          } else if (evt.type === 'accent') {
            badgeColor = "var(--accent-cyan)";
            Icon = Terminal;
          }

          return (
            <div
              key={evt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.3
              }}
            >
              <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontSize: '10px' }}>
                [{evt.time}]
              </span>

              <Icon size={12} color={badgeColor} style={{ flexShrink: 0 }} />

              <span style={{ color: evt.type === 'danger' ? 'var(--accent-red)' : evt.type === 'warning' ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                {evt.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
