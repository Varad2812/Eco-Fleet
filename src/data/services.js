export const SERVICE_PROFILES = [
  {
    id: "Standard",
    name: "Standard Commercial",
    speedModifier: 1.0,
    costWeight: 0.35,
    emissionWeight: 0.35,
    scheduleWeight: 0.30,
    targetSpeedKn: 16.2,
    berthPriority: "Normal Window",
    demurrageRisk: "Standard (36h grace)",
    badge: "Balanced Optimization",
    description: "Equally balances bunker consumption, operational cost, and delivery schedule."
  },
  {
    id: "Express",
    name: "Express Priority",
    speedModifier: 1.18,
    costWeight: 0.20,
    emissionWeight: 0.15,
    scheduleWeight: 0.65,
    targetSpeedKn: 19.1,
    berthPriority: "Tier-1 Express Berth",
    demurrageRisk: "Zero-Tolerance Penalty",
    badge: "High-Speed Priority",
    description: "Optimizes for earliest ETA to meet high-value cargo or manufacturing line supply deadlines."
  },
  {
    id: "Eco Sailing",
    name: "Eco Sailing (Slow Steaming)",
    speedModifier: 0.85,
    costWeight: 0.45,
    emissionWeight: 0.45,
    scheduleWeight: 0.10,
    targetSpeedKn: 13.8,
    berthPriority: "Flexible Arrival",
    demurrageRisk: "Extended Buffer",
    badge: "Maximum Fuel Conservation",
    description: "Minimizes hydrodynamic resistance and engine load for lowest fuel consumption."
  },
  {
    id: "Priority Berth",
    name: "Priority Berth Window",
    speedModifier: 1.06,
    costWeight: 0.30,
    emissionWeight: 0.25,
    scheduleWeight: 0.45,
    targetSpeedKn: 17.2,
    berthPriority: "Reserved Port Window",
    demurrageRisk: "High Port Demurrage Offset",
    badge: "Demurrage Avoidance",
    description: "Calibrates speed specifically to hit designated zero-wait tide and port crane windows."
  },
  {
    id: "Flexible Window",
    name: "Flexible Window",
    speedModifier: 0.92,
    costWeight: 0.40,
    emissionWeight: 0.35,
    scheduleWeight: 0.25,
    targetSpeedKn: 14.9,
    berthPriority: "Float ±24 Hours",
    demurrageRisk: "Low",
    badge: "Weather-Responsive Speed",
    description: "Permits dynamic speed throttling to bypass peak wave zones without contractual fines."
  },
  {
    id: "Carbon Priority",
    name: "Carbon Priority (CII Grade A)",
    speedModifier: 0.88,
    costWeight: 0.25,
    emissionWeight: 0.65,
    scheduleWeight: 0.10,
    targetSpeedKn: 14.2,
    berthPriority: "Green Berth Incentive",
    demurrageRisk: "Low / Offset",
    badge: "Strict IMO Decarbonization",
    description: "Constrains operational profiles strictly below IMO CII threshold for optimal green ratings."
  }
];

export const getServiceById = (id) => {
  return SERVICE_PROFILES.find((s) => s.id.toLowerCase() === (id || "").toLowerCase()) || SERVICE_PROFILES[0];
};
