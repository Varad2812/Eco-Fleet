export const STORM_SCENARIOS = {
  none: {
    intensity: "None",
    name: "Nominal MetOcean (No Disruption)",
    statusText: "NO DISRUPTION DETECTED",
    statusBadge: "Nominal Safe",
    badgeColor: "#00e5a3",
    description: "Atmospheric and oceanic conditions are well within standard operational envelope.",
    stormX: 0,
    stormY: 0,
    radius: 0,
    windGustKn: 18,
    waveHeightM: 2.1,
    centralPressureHpa: 1013,
    movementDirection: "N/A",
    movementSpeedKn: 0,
    rerouteRequired: false,
    fuelImpactPct: 0.0,
    etaDelayHours: 0.0,
    costImpactPct: 0.0,
    co2ImpactPct: 0.0,
    operationalAdvisory: "Vessel proceeds on primary optimal quantum track without deviation."
  },
  low: {
    intensity: "Low",
    name: "Atmospheric Trough & Moderate Swell",
    statusText: "WEATHER WITHIN OPERATIONAL LIMITS",
    subText: "NO RE-OPTIMIZATION REQUIRED",
    statusBadge: "Advisory Alert",
    badgeColor: "#fbbf24",
    description: "Localized squall cluster with manageable wave heights. Ship remains on original route.",
    // Visual coordinates centered over Arabian Sea shipping lane
    stormX: 535,
    stormY: 325,
    radius: 45, // in SVG units (~120 nm)
    windGustKn: 28,
    waveHeightM: 3.2,
    centralPressureHpa: 1004,
    movementDirection: "NW (310°)",
    movementSpeedKn: 12,
    rerouteRequired: false,
    fuelImpactPct: 0.8,
    etaDelayHours: 0.2, // ~12 mins
    costImpactPct: 0.6,
    co2ImpactPct: 0.8,
    color: "#f59e0b",
    fillColor: "rgba(245, 158, 11, 0.22)",
    strokeColor: "#f59e0b",
    operationalAdvisory: "Engine speed governing maintains rpm stability; hydrodynamic margin absorbs minor added resistance."
  },
  moderate: {
    intensity: "Moderate",
    name: "Tropical Depression 03B",
    statusText: "MINOR ROUTE ADJUSTMENT RECOMMENDED",
    subText: "FUEL +2.4% • ETA +18 MIN",
    statusBadge: "Minor Detour",
    badgeColor: "#f97316",
    description: "Developing cyclonic depression with significant beam seas. Slight southerly dog-leg route adjustment.",
    stormX: 550,
    stormY: 345,
    radius: 70, // ~220 nm
    windGustKn: 38,
    waveHeightM: 4.6,
    centralPressureHpa: 994,
    movementDirection: "WNW (295°)",
    movementSpeedKn: 15,
    rerouteRequired: true,
    fuelImpactPct: 2.4,
    etaDelayHours: 0.3, // ~18 mins
    costImpactPct: 2.2,
    co2ImpactPct: 2.4,
    speedDeltaKn: -0.4,
    color: "#f97316",
    fillColor: "rgba(249, 115, 22, 0.26)",
    strokeColor: "#f97316",
    operationalAdvisory: "QEA introduces minor 18-mile southern curve to bypass 4.5m wave field and avoid engine overload."
  },
  severe: {
    intensity: "Severe",
    name: "Very Severe Cyclonic Storm 'MEGH'",
    statusText: "RE-OPTIMIZATION REQUIRED",
    subText: "SIGNIFICANT ROUTE DETOUR • AVOIDING 6.4m PEAK WAVES",
    statusBadge: "Critical Alert",
    badgeColor: "#ef4444",
    description: "Severe cyclone directly intersecting primary planned track. High risk of parametric rolling and hull stress.",
    stormX: 565,
    stormY: 360,
    radius: 95, // ~310 nm
    windGustKn: 54,
    waveHeightM: 6.4,
    centralPressureHpa: 978,
    movementDirection: "NW (320°)",
    movementSpeedKn: 18,
    rerouteRequired: true,
    fuelImpactPct: 6.8,
    etaDelayHours: 4.8, // ~4h 48m delay
    costImpactPct: 6.2,
    co2ImpactPct: 5.9,
    speedDeltaKn: -1.2,
    color: "#ef4444",
    fillColor: "rgba(239, 68, 68, 0.32)",
    strokeColor: "#ef4444",
    operationalAdvisory: "Old route disabled. Re-optimized deep-sea southern corridor executed. Fuel consumption increases by 6.8% to secure vessel safety."
  },
  extreme: {
    intensity: "Extreme",
    name: "Super Cyclonic Storm 'VARUNA'",
    statusText: "CRITICAL WEATHER DISRUPTION",
    subText: "MAJOR EMERGENCY DETOUR • ALTERNATIVE VOYAGE PLAN SELECTED",
    statusBadge: "Emergency Protocol",
    badgeColor: "#d946ef",
    description: "Violent category-5 equivalent super cyclone with hurricane-force gusts and mountainous 7.8m waves. Extreme diversion.",
    stormX: 575,
    stormY: 370,
    radius: 125, // ~400 nm
    windGustKn: 72,
    waveHeightM: 7.8,
    centralPressureHpa: 958,
    movementDirection: "WNW (285°)",
    movementSpeedKn: 22,
    rerouteRequired: true,
    fuelImpactPct: 12.5,
    etaDelayHours: 11.2, // ~11h 12m delay
    costImpactPct: 11.8,
    co2ImpactPct: 10.4,
    speedDeltaKn: -2.4,
    color: "#d946ef",
    fillColor: "rgba(217, 70, 239, 0.36)",
    strokeColor: "#d946ef",
    operationalAdvisory: "Complete tactical reroute into sub-equatorial shipping corridor. Speed throttled to 13.8 kn to protect cargo integrity."
  }
};

export const getStormScenario = (intensityKey) => {
  const key = (intensityKey || "none").toLowerCase();
  return STORM_SCENARIOS[key] || STORM_SCENARIOS.none;
};
