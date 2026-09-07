import React, { useState, useMemo, useRef } from 'react';
import { useFleet } from '../context/FleetContext';
import { PORTS } from '../data/ports';
import { 
  CloudRain, 
  Wind, 
  AlertCircle, 
  Ship as ShipIcon, 
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowRightLeft,
  Compass,
  Navigation
} from 'lucide-react';

// Helper to interpolate position and angle along points array given progress (0..1)
// Direction 'reverse' flips bearing 180° so the ship points bow-first towards departure
function getShipCoordinates(points, progress, direction = 'forward') {
  if (!points || points.length < 2) return { x: 500, y: 250, angle: 0 };
  
  // Calculate cumulative segment lengths
  let totalLength = 0;
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const len = Math.hypot(dx, dy);
    segments.push({ p1: points[i], p2: points[i + 1], length: len, dx, dy });
    totalLength += len;
  }

  const targetDist = progress * totalLength;
  let accumulated = 0;

  for (let seg of segments) {
    if (accumulated + seg.length >= targetDist) {
      const segFraction = (targetDist - accumulated) / (seg.length || 1);
      const x = seg.p1[0] + seg.dx * segFraction;
      const y = seg.p1[1] + seg.dy * segFraction;
      let angle = (Math.atan2(seg.dy, seg.dx) * 180) / Math.PI;
      if (direction === 'reverse') {
        angle = (angle + 180) % 360;
      }
      return { x, y, angle };
    }
    accumulated += seg.length;
  }

  const last = points[points.length - 1];
  const secondLast = points[points.length - 2];
  let angle = (Math.atan2(last[1] - secondLast[1], last[0] - secondLast[0]) * 180) / Math.PI;
  if (direction === 'reverse') {
    angle = (angle + 180) % 360;
  }
  return { x: last[0], y: last[1], angle };
}

// Convert points array to SVG path string with smooth polyline
function pointsToSvgPath(points) {
  if (!points || points.length === 0) return "";
  return points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? "M" : "L"} ${pt[0]} ${pt[1]}`;
  }, "");
}

export const RouteMap = ({ height = 480 }) => {
  const { 
    plan, 
    stormState, 
    shipProgress, 
    shipDirection = 'forward',
    toggleShipDirection,
    restartShipFromDestination,
    restartShipFromOrigin,
    setIsStormModalOpen, 
    runReoptimization,
    isReoptimizing,
    theme = 'light'
  } = useFleet();

  const isLight = theme === 'light';
  const oceanBg = isLight ? '#e0f2fe' : '#060c18';
  const landFill = isLight ? '#cbd5e1' : '#101c33';
  const landStroke = isLight ? '#94a3b8' : 'rgba(255, 255, 255, 0.14)';
  const gridStroke = isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.05)';
  const latLonStroke = isLight ? 'rgba(100, 116, 139, 0.3)' : 'rgba(56, 189, 248, 0.12)';
  const latLonText = isLight ? '#475569' : 'rgba(148, 163, 184, 0.45)';
  const seaLabelText = isLight ? 'rgba(3, 105, 161, 0.65)' : 'rgba(56, 189, 248, 0.35)';
  const panelBg = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.92)';

  const { route, sourcePort, destPort, vessel, speed } = plan;
  const storm = stormState.activeScenario;
  const isStormActive = stormState.intensity !== 'none';

  // --- Zoom & Pan Interactive State ---
  // Default zoom is 0.88 for a wider, comfortably zoomed-out maritime overview
  const [zoom, setZoom] = useState(0.88);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const zoomIn = () => setZoom(z => Math.min(2.4, +(z + 0.15).toFixed(2)));
  const zoomOut = () => setZoom(z => Math.max(0.52, +(z - 0.15).toFixed(2)));
  const resetView = () => {
    setZoom(0.88);
    setPan({ x: 0, y: 0 });
  };
  const toggleWidePanorama = () => {
    if (zoom <= 0.68) {
      setZoom(0.88);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(0.62);
      setPan({ x: 0, y: 0 });
    }
  };

  // Mouse wheel zoom over map
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(z => Math.min(2.4, +(z + 0.08).toFixed(2)));
    } else {
      setZoom(z => Math.max(0.52, +(z - 0.08).toFixed(2)));
    }
  };

  // Drag panning handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Compute dynamic viewBox with zoom and pan
  const baseWidth = 1060;
  const baseHeight = 520;
  const viewWidth = baseWidth / zoom;
  const viewHeight = baseHeight / zoom;
  const viewX = -pan.x + (baseWidth - viewWidth) / 2 - 30;
  const viewY = -pan.y + (baseHeight - viewHeight) / 2 - 10;
  const currentViewBox = `${viewX} ${viewY} ${viewWidth} ${viewHeight}`;

  // Determine active displayed route points based on disruption status
  const activePoints = useMemo(() => {
    if (!route) return [];
    if (!isStormActive || stormState.intensity === 'none' || stormState.intensity === 'low') {
      return route.optimizedPoints;
    }
    if (stormState.intensity === 'moderate') {
      return route.stormDetourModerate || route.optimizedPoints;
    }
    if (stormState.intensity === 'severe') {
      return route.stormDetourSevere || route.optimizedPoints;
    }
    if (stormState.intensity === 'extreme') {
      return route.stormDetourExtreme || route.optimizedPoints;
    }
    return route.optimizedPoints;
  }, [route, isStormActive, stormState.intensity]);

  // Compute current ship position and bearing (taking into account shipDirection)
  const shipPos = useMemo(() => {
    return getShipCoordinates(activePoints, shipProgress, shipDirection);
  }, [activePoints, shipProgress, shipDirection]);

  // SVG coordinate path strings
  const baselinePath = useMemo(() => pointsToSvgPath(route?.baselinePoints || []), [route]);
  const optimizedOriginalPath = useMemo(() => pointsToSvgPath(route?.optimizedPoints || []), [route]);
  const activeRoutePath = useMemo(() => pointsToSvgPath(activePoints), [activePoints]);

  return (
    <div 
      className="map-canvas-container" 
      ref={containerRef}
      style={{ 
        height: `${height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Left HUD Telemetry & Navigation Corridor */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '14px',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxWidth: '480px',
        pointerEvents: 'auto'
      }}>
        {/* Active Route & Vessel Telemetry Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 12px',
          background: panelBg,
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span className="status-dot green pulse" />
          <span>
            {sourcePort.name} → {destPort.name}
          </span>
          <span style={{ color: 'var(--accent-cyan)' }}>
            ({plan.distance.toLocaleString()} nm)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: 'var(--accent-green)' }}>
            {vessel.name} ({speed} kn)
          </span>
        </div>

        {/* Vessel Transit Heading & Direction Controller */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: panelBg,
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <Navigation 
            size={12} 
            color={shipDirection === 'reverse' ? 'var(--accent-amber)' : 'var(--accent-cyan)'} 
            style={{ transform: `rotate(${shipPos.angle - 45}deg)`, transition: 'transform 0.3s ease' }}
          />
          <span style={{ color: shipDirection === 'reverse' ? 'var(--accent-amber)' : 'var(--accent-cyan)' }}>
            {shipDirection === 'reverse' 
              ? `INBOUND: FROM ${destPort.name.toUpperCase()}` 
              : `OUTBOUND: FROM ${sourcePort.name.toUpperCase()}`}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <button
            onClick={(e) => { e.stopPropagation(); toggleShipDirection(); }}
            className="btn btn-secondary"
            style={{ padding: '2px 7px', fontSize: '9.5px', height: '20px' }}
            title="Switch vessel heading direction (Outbound vs Inbound)"
          >
            <ArrowRightLeft size={10} />
            Flip
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); restartShipFromDestination(); }}
            className="btn btn-secondary"
            style={{ padding: '2px 7px', fontSize: '9.5px', height: '20px' }}
            title="Place vessel at destination port to come from destination"
          >
            ↺ From Dest
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); restartShipFromOrigin(); }}
            className="btn btn-secondary"
            style={{ padding: '2px 7px', fontSize: '9.5px', height: '20px' }}
            title="Place vessel at departure origin port"
          >
            ↺ From Origin
          </button>
        </div>

        {/* Storm Disruption Warning Banner if active */}
        {isStormActive && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            background: isLight ? 'rgba(254, 226, 226, 0.95)' : (storm.fillColor || 'rgba(239, 68, 68, 0.28)'),
            border: `1px solid ${storm.strokeColor || 'var(--accent-red)'}`,
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: isLight ? '#991b1b' : '#ffffff',
            boxShadow: 'var(--shadow-card)'
          }}>
            <AlertCircle size={13} color={storm.strokeColor || 'var(--accent-red)'} />
            <span>
              DISRUPTION: <strong>{storm.intensity.toUpperCase()} METOCEAN</strong>
            </span>
            {storm.rerouteRequired && (
              <span className="badge badge-red pulse" style={{ padding: '1px 6px', fontSize: '9px' }}>
                DETOUR ACTIVE
              </span>
            )}
            <span style={{ color: isLight ? '#dc2626' : '#fca5a5', fontSize: '10px' }}>
              (Vessel Inbound from {destPort.name})
            </span>
          </div>
        )}
      </div>

      {/* Top Right Action Buttons: Disruption & Re-Optimization */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '14px',
        zIndex: 5,
        display: 'flex',
        gap: '8px',
        pointerEvents: 'auto'
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); setIsStormModalOpen(true); }}
          className={`btn ${isStormActive ? 'btn-danger' : 'btn-secondary'}`}
          style={{ padding: '6px 12px', fontSize: '11px' }}
        >
          <CloudRain size={13} />
          {isStormActive ? 'STORM SIMULATOR (ACTIVE)' : 'SIMULATE DISRUPTION'}
        </button>

        {isStormActive && storm.rerouteRequired && (
          <button
            onClick={(e) => { e.stopPropagation(); runReoptimization(); }}
            disabled={isReoptimizing}
            className="btn btn-primary pulse"
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            <Wind size={13} />
            {isReoptimizing ? 'RE-OPTIMIZING...' : 'RE-OPTIMIZE ROUTE'}
          </button>
        )}
      </div>

      {/* Bottom Right Floating Zoom & Panorama Toolbar */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '14px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 6px',
        background: panelBg,
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-dropdown)',
        pointerEvents: 'auto'
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); zoomIn(); }}
          className="btn btn-secondary"
          style={{ padding: '4px 8px', fontSize: '11px', minWidth: '28px', height: '28px' }}
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>

        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--accent-cyan)',
          padding: '0 6px',
          minWidth: '42px',
          textAlign: 'center',
          fontWeight: 600
        }}>
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); zoomOut(); }}
          className="btn btn-secondary"
          style={{ padding: '4px 8px', fontSize: '11px', minWidth: '28px', height: '28px' }}
          title="Zoom Out (Wider Panorama)"
        >
          <ZoomOut size={13} />
        </button>

        <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle)', margin: '0 2px' }} />

        <button
          onClick={(e) => { e.stopPropagation(); resetView(); }}
          className="btn btn-secondary"
          style={{ padding: '4px 8px', fontSize: '10.5px', height: '28px', gap: '4px' }}
          title="Reset Zoom & Pan"
        >
          <RotateCcw size={11} />
          Reset
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); toggleWidePanorama(); }}
          className={`btn ${zoom <= 0.68 ? 'btn-accent' : 'btn-secondary'}`}
          style={{ padding: '4px 8px', fontSize: '10.5px', height: '28px', gap: '4px' }}
          title="Toggle Wide World Panorama"
        >
          <Maximize2 size={11} />
          {zoom <= 0.68 ? '100%' : 'Wide'}
        </button>
      </div>

      {/* Bottom Left Map Legend & Pan Navigation Telemetry */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '14px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 14px',
        background: panelBg,
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-card)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '16px', height: '2px', backgroundColor: 'var(--accent-cyan)' }} />
          <span>{isStormActive ? 'Re-Optimized Green Corridor' : 'Active QEA Route'}</span>
        </div>

        {isStormActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', borderTop: '2px dashed #ea580c' }} />
            <span style={{ color: '#ea580c', fontWeight: 600 }}>Previous Best Route</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '16px', height: '2px', borderTop: '2px dashed #94a3b8' }} />
          <span>Baseline Track</span>
        </div>

        {isStormActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: storm.strokeColor || '#ef4444' }} />
            <span>Hazard Cell</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-primary)' }}>▲</span>
          <span>Bearing ({Math.round(shipPos.angle)}°)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
          <span>• Scroll to Zoom • Drag to Pan</span>
        </div>
      </div>

      {/* Main Scalable Maritime SVG Chart with Dynamic Zoom & Pan ViewBox */}
      <svg
        viewBox={currentViewBox}
        style={{ width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle Ocean Grid Pattern */}
          <pattern id="marineGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={gridStroke} strokeWidth="0.8" />
            <circle cx="50" cy="50" r="1" fill={gridStroke} />
          </pattern>

          {/* Cyan route glowing filter */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Storm cell radial gradient */}
          <radialGradient id="stormGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={storm.strokeColor || "#ef4444"} stopOpacity="0.48" />
            <stop offset="60%" stopColor={storm.strokeColor || "#ef4444"} stopOpacity="0.22" />
            <stop offset="100%" stopColor={storm.strokeColor || "#ef4444"} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Expansive Ocean Background (Generous margins for deep zoom-out capability) */}
        <rect x="-600" y="-350" width="2400" height="1300" fill={oceanBg} />
        <rect x="-600" y="-350" width="2400" height="1300" fill="url(#marineGrid)" />

        {/* Nautical Latitude Parallels (Equator, Tropic of Cancer, 40°N) */}
        <g stroke={latLonStroke} strokeWidth="0.8" strokeDasharray="4,6">
          <line x1="-600" y1="140" x2="1800" y2="140" />
          <line x1="-600" y1="265" x2="1800" y2="265" />
          <line x1="-600" y1="395" x2="1800" y2="395" />
        </g>
        <text x="-40" y="136" fill={latLonText} fontSize="8.5" fontFamily="var(--font-mono)">40°N PARALLEL</text>
        <text x="-40" y="261" fill={latLonText} fontSize="8.5" fontFamily="var(--font-mono)">23.5°N TROPIC OF CANCER</text>
        <text x="-40" y="391" fill={latLonText} fontSize="8.5" fontFamily="var(--font-mono)">0° EQUATORIAL SHIPPING LANE</text>

        {/* Nautical Longitude Meridians (0° Prime, 30°E, 60°E, 90°E, 120°E) */}
        <g stroke={latLonStroke} strokeWidth="0.8" strokeDasharray="3,8">
          <line x1="160" y1="-350" x2="160" y2="950" />
          <line x1="330" y1="-350" x2="330" y2="950" />
          <line x1="500" y1="-350" x2="500" y2="950" />
          <line x1="670" y1="-350" x2="670" y2="950" />
          <line x1="840" y1="-350" x2="840" y2="950" />
        </g>
        <text x="163" y="20" fill={latLonText} fontSize="8" fontFamily="var(--font-mono)">0° MERIDIAN</text>
        <text x="333" y="20" fill={latLonText} fontSize="8" fontFamily="var(--font-mono)">30°E</text>
        <text x="503" y="20" fill={latLonText} fontSize="8" fontFamily="var(--font-mono)">60°E</text>
        <text x="673" y="20" fill={latLonText} fontSize="8" fontFamily="var(--font-mono)">90°E</text>
        <text x="843" y="20" fill={latLonText} fontSize="8" fontFamily="var(--font-mono)">120°E</text>

        {/* Ambient Oceanic Bathymetric Labels */}
        <g fontFamily="var(--font-mono)">
          <text x="20" y="235" fill={seaLabelText} fontSize="10.5" letterSpacing="4">NORTH ATLANTIC OCEAN</text>
          <text x="180" y="228" fill={seaLabelText} fontSize="9" letterSpacing="3">MEDITERRANEAN SEA</text>
          <text x="345" y="325" fill={seaLabelText} fontSize="8" letterSpacing="2">RED SEA</text>
          <text x="445" y="300" fill={seaLabelText} fontSize="11" letterSpacing="3" fontWeight="600">ARABIAN SEA</text>
          <text x="480" y="445" fill={seaLabelText} fontSize="13" letterSpacing="6" fontWeight="700">INDIAN OCEAN</text>
          <text x="635" y="330" fill={seaLabelText} fontSize="10" letterSpacing="3">BAY OF BENGAL</text>
          <text x="735" y="330" fill={seaLabelText} fontSize="10" letterSpacing="3">SOUTH CHINA SEA</text>
          <text x="890" y="270" fill={seaLabelText} fontSize="10" letterSpacing="4">PACIFIC OCEAN</text>
        </g>

        {/* Ambient Oceanic Current Vectors */}
        <g opacity="0.2" stroke="#0284c7" strokeWidth="1" fill="none">
          <path d="M 400 320 Q 520 370 650 370 T 800 340" strokeDasharray="6,8" />
          <path d="M 380 340 Q 500 390 630 395 T 820 360" strokeDasharray="4,10" />
          <path d="M 120 250 Q 200 240 280 250 T 360 270" strokeDasharray="5,8" />
          <path d="M 460 410 Q 580 430 710 435" strokeDasharray="4,8" />
        </g>

        {/* ================= CONTINENTAL GEOGRAPHY ================= */}
        {/* Western Europe & Scandinavia */}
        <path
          d="M 60 70 L 90 90 L 140 85 L 180 100 L 210 90 L 230 110 L 220 140 L 190 145 L 170 160 L 150 180 L 130 185 L 115 150 L 95 120 L 70 100 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />
        {/* Scandinavia & Baltic */}
        <path
          d="M 180 60 L 220 40 L 250 55 L 240 90 L 215 95 L 195 85 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.1"
        />
        {/* British Isles */}
        <path
          d="M 120 105 L 135 110 L 140 130 L 125 140 L 115 125 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />

        {/* Iberian Peninsula & Mediterranean North */}
        <path
          d="M 95 195 L 135 195 L 155 220 L 140 250 L 110 245 L 90 220 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />

        {/* Africa & Red Sea Boundary (Carefully shaped for Suez, Red Sea and Bab-el-Mandeb navigation) */}
        <path
          d="M 70 260 L 110 260 L 160 265 L 240 270 L 314 262 L 320 280 L 332 300 L 350 330 L 368 350 L 360 410 L 340 470 L 280 470 L 210 400 L 140 330 L 70 320 L 60 280 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />

        {/* Arabian Peninsula (Carefully contoured so Jebel Ali and Strait of Hormuz are 100% open water) */}
        <path
          d="M 360 255 L 415 250 L 426 264 L 440 252 L 448 260 L 460 300 L 420 320 L 375 305 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />

        {/* Persian Gulf Coastline */}
        <path
          d="M 390 242 Q 418 246 430 260"
          fill="none"
          stroke={isLight ? "var(--accent-cyan)" : "rgba(56, 189, 248, 0.4)"}
          strokeWidth="1.6"
        />

        {/* Indian Subcontinent (Accurately shaped so Mumbai JNPT and Cape Comorin deep water lanes are clear) */}
        <path
          d="M 480 230 L 525 240 L 532 260 L 536 280 L 532 295 L 542 335 L 555 365 L 565 382 L 575 375 L 585 340 L 600 300 L 610 265 L 580 250 L 530 240 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />
        {/* Sri Lanka (Situated safely north of the deep Dondra Head shipping lane at y=406) */}
        <path
          d="M 576 376 L 586 376 L 586 394 L 576 394 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1"
        />

        {/* Southeast Asia & Indochina */}
        <path
          d="M 640 250 L 700 260 L 740 300 L 725 350 L 708 380 L 696 355 L 688 320 L 650 280 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />
        {/* Sumatra, Java & Borneo / Indonesian Archipelago (Malacca Strait channel cleanly open) */}
        <path
          d="M 655 398 L 710 422 L 780 440 L 800 435 L 750 410 L 675 396 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1"
        />
        <path
          d="M 730 365 L 770 365 L 785 395 L 745 400 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1"
        />

        {/* East Asia / China / Korea / Japan */}
        <path
          d="M 750 220 L 820 200 L 860 190 L 875 225 L 850 270 L 800 270 L 760 250 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1.2"
        />
        {/* Japanese Archipelago */}
        <path
          d="M 885 190 L 910 205 L 920 235 L 900 255 L 880 240 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1"
        />

        {/* Northern Coast of Australia */}
        <path
          d="M 760 485 L 840 470 L 900 480 L 920 520 L 760 520 Z"
          fill={landFill}
          stroke={landStroke}
          strokeWidth="1"
        />

        {/* ================= ROUTES ================= */}
        {/* Baseline Route (Subtle dashed gray line) */}
        {baselinePath && (
          <path
            d={baselinePath}
            fill="none"
            stroke="rgba(148, 163, 184, 0.4)"
            strokeWidth="1.8"
            strokeDasharray="5,6"
          />
        )}

        {/* If storm disruption is active: SHOW PREVIOUS BEST ROUTE in prominent glowing dashed orange/amber */}
        {isStormActive && (
          <g>
            {/* Ambient amber glow under previous track */}
            <path
              d={optimizedOriginalPath}
              fill="none"
              stroke="rgba(251, 146, 60, 0.35)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Sharp dashed previous route line */}
            <path
              d={optimizedOriginalPath}
              fill="none"
              stroke="#fb923c"
              strokeWidth="2.4"
              strokeDasharray="6,5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Active Route (Glowing cyan animated path) */}
        {activeRoutePath && (
          <>
            {/* Soft background glow */}
            <path
              d={activeRoutePath}
              fill="none"
              stroke="rgba(56, 189, 248, 0.22)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Sharp foreground route line with traveling animation */}
            <path
              d={activeRoutePath}
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="8,6"
              style={{
                animation: 'dashMove 20s linear infinite'
              }}
            />
          </>
        )}

        {/* ================= STORM WEATHER ZONE ================= */}
        {isStormActive && storm.radius > 0 && (
          <g>
            {/* Outer pulsating radar ring */}
            <circle
              cx={storm.stormX}
              cy={storm.stormY}
              r={storm.radius * 1.35}
              fill="none"
              stroke={storm.strokeColor || "#ef4444"}
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.5"
            >
              <animate attributeName="r" values={`${storm.radius};${storm.radius * 1.4};${storm.radius}`} dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Main storm gradient fill */}
            <circle
              cx={storm.stormX}
              cy={storm.stormY}
              r={storm.radius}
              fill="url(#stormGrad)"
              stroke={storm.strokeColor || "#ef4444"}
              strokeWidth="1.5"
            />

            {/* Inner intense eye */}
            <circle
              cx={storm.stormX}
              cy={storm.stormY}
              r={storm.radius * 0.35}
              fill={storm.fillColor}
              stroke={storm.strokeColor || "#ef4444"}
              strokeWidth="1.8"
            />

            {/* Rotating storm spiral wind arrows */}
            <g transform={`translate(${storm.stormX}, ${storm.stormY})`}>
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <path
                  d="M -20 -10 Q 0 -35 25 -15"
                  fill="none"
                  stroke={storm.strokeColor || "#ef4444"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 10 Q 0 35 -25 15"
                  fill="none"
                  stroke={storm.strokeColor || "#ef4444"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* Storm Center Label Badge */}
            <g transform={`translate(${storm.stormX + 10}, ${storm.stormY - storm.radius + 15})`}>
              <rect
                x="0"
                y="-18"
                width="135"
                height="34"
                rx="4"
                fill={panelBg}
                stroke={storm.strokeColor || "var(--accent-red)"}
                strokeWidth="1"
              />
              <text x="8" y="-4" fill={isLight ? "#0f172a" : "#ffffff"} fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="bold">
                {storm.name.toUpperCase()}
              </text>
              <text x="8" y="10" fill={storm.strokeColor || (isLight ? "#b91c1c" : "#ef4444")} fontSize="9" fontFamily="var(--font-mono)">
                Waves {storm.waveHeightM}m • Gusts {storm.windGustKn}kn
              </text>
            </g>
          </g>
        )}

        {/* ================= ALL GLOBAL PORTS ================= */}
        {PORTS.map((p) => {
          const isSource = p.id === sourcePort.id;
          const isDest = p.id === destPort.id;
          const isSelected = isSource || isDest;

          return (
            <g key={p.id} transform={`translate(${p.svgX}, ${p.svgY})`}>
              {/* Outer pulsing ring for selected ports */}
              {isSelected && (
                <circle
                  r="12"
                  fill="none"
                  stroke={isSource ? "var(--accent-green)" : "var(--accent-cyan)"}
                  strokeWidth="1.2"
                  opacity="0.8"
                >
                  <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Port Anchor Dot */}
              <circle
                r={isSelected ? 4.5 : 3}
                fill={isSource ? "var(--accent-green)" : isDest ? "var(--accent-cyan)" : (isLight ? "#64748b" : "rgba(148, 163, 184, 0.7)")}
                stroke={isLight ? "#ffffff" : "#060c18"}
                strokeWidth="1.5"
              />

              {/* Port Label */}
              <text
                x={p.svgX > 700 ? -8 : 8}
                y={p.svgY > 300 ? -8 : 12}
                textAnchor={p.svgX > 700 ? "end" : "start"}
                fill={isSelected ? (isLight ? "#0f172a" : "#ffffff") : (isLight ? "#334155" : "rgba(148, 163, 184, 0.7)")}
                fontFamily="var(--font-mono)"
                fontSize={isSelected ? "11" : "9.5"}
                fontWeight={isSelected ? "bold" : "normal"}
              >
                {p.name} {isSelected && (isSource ? "[DEP]" : "[ARR]")}
              </text>
            </g>
          );
        })}

        {/* ================= MOVING SHIP MARKER ================= */}
        {/* Oriented dynamically based on travel direction (forward or reverse from destination) */}
        <g transform={`translate(${shipPos.x}, ${shipPos.y})`}>
          {/* Hydrodynamic Wake Ripple Effect (flowing behind stern) */}
          <g transform={`rotate(${shipPos.angle + 180})`}>
            <path
              d="M 0 0 L -18 -8 M 0 0 L -18 8"
              stroke="var(--accent-cyan)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            >
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.2s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Heading Rotated Vessel Silhouette */}
          <g transform={`rotate(${shipPos.angle})`}>
            {/* Radar scanner wave sweep */}
            <circle r="16" fill="none" stroke="var(--accent-cyan)" opacity="0.3" strokeWidth="1" strokeDasharray="3,3" />

            {/* Naval Ship Contour */}
            <path
              d="M 12 0 L -4 6 L -8 4 L -8 -4 L -4 -6 Z"
              fill={shipDirection === 'reverse' ? 'var(--accent-amber)' : 'var(--accent-cyan)'}
              stroke="#ffffff"
              strokeWidth="1"
            />
            {/* Superstructure bridge */}
            <rect x="-4" y="-2" width="4" height="4" fill={isLight ? "#1e293b" : "#040a15"} />
          </g>

          {/* Ship Telemetry Tag on Map */}
          <g transform="translate(14, -16)">
            <rect
              x="0"
              y="-12"
              width="132"
              height="30"
              rx="4"
              fill={panelBg}
              stroke={shipDirection === 'reverse' ? 'var(--accent-amber)' : 'var(--border-medium)'}
              strokeWidth="1"
            />
            <text x="6" y="-2" fill={isLight ? "#0f172a" : "#ffffff"} fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
              {vessel.name} {shipDirection === 'reverse' ? '• INBOUND' : '• OUTBOUND'}
            </text>
            <text 
              x="6" 
              y="10" 
              fill={shipDirection === 'reverse' ? 'var(--accent-amber)' : 'var(--accent-cyan)'} 
              fontSize="8.5" 
              fontFamily="var(--font-mono)"
            >
              {speed} kn • {Math.round(shipPos.angle)}° T • {shipDirection === 'reverse' ? `From ${destPort.name}` : `To ${destPort.name}`}
            </text>
          </g>
        </g>
      </svg>

      <style>{`
        @keyframes dashMove {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};
