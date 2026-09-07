export const FUELS = [
  {
    id: "LNG",
    name: "LNG (Liquefied Natural Gas)",
    shortName: "LNG",
    pricePerTonne: 58200, // in INR (equivalent to ~$700/t)
    priceUSD: 698,
    energyDensity: 49.2, // MJ/kg
    emissionsFactor: 2.75, // t CO2 / t fuel (tank-to-wake)
    wtwEmissions: 3.12, // t CO2e / t fuel (well-to-wake)
    availability: "HIGH",
    availabilityScore: 92,
    cargoVolumePenalty: "+8%", // Cryogenic tank footprint
    ciiComplianceBonus: "+18%",
    recommendation: "OPTIMAL COMMODITY",
    bestFor: "Deep-sea long haul with dual-fuel infrastructure",
    color: "#38bdf8",
    badge: "LOW SOx / -24% CO₂"
  },
  {
    id: "Methanol",
    name: "Bio/Green Methanol (e-CH₃OH)",
    shortName: "Methanol",
    pricePerTonne: 68400, // ~$820/t
    priceUSD: 820,
    energyDensity: 19.9, // MJ/kg
    emissionsFactor: 1.38,
    wtwEmissions: 0.45, // Net-zero potential with green synthesis
    availability: "EXPANDING",
    availabilityScore: 78,
    cargoVolumePenalty: "+12%",
    ciiComplianceBonus: "+42%",
    recommendation: "BEST GREEN BALANCE",
    bestFor: "Strict IMO 2030 CII target routes & green corridors",
    color: "#10b981",
    badge: "IMO 2030 READY"
  },
  {
    id: "Ammonia",
    name: "Green Ammonia (NH₃)",
    shortName: "Ammonia",
    pricePerTonne: 79500, // ~$950/t
    priceUSD: 955,
    energyDensity: 18.6, // MJ/kg
    emissionsFactor: 0.00, // Zero direct carbon burn
    wtwEmissions: 0.28,
    availability: "LIMITED",
    availabilityScore: 42,
    cargoVolumePenalty: "+18%",
    ciiComplianceBonus: "+65%",
    recommendation: "NET-ZERO PIONEER",
    bestFor: "Dedicated zero-emission coastal and green bunker lanes",
    color: "#8b5cf6",
    badge: "ZERO CARBON DIRECT"
  },
  {
    id: "Hydrogen",
    name: "Liquid Hydrogen (LH₂)",
    shortName: "Hydrogen",
    pricePerTonne: 112000, // ~$1340/t
    priceUSD: 1345,
    energyDensity: 120.0, // MJ/kg (high gravimetric, low volumetric)
    emissionsFactor: 0.00,
    wtwEmissions: 0.15,
    availability: "PILOT",
    availabilityScore: 28,
    cargoVolumePenalty: "+26%",
    ciiComplianceBonus: "+80%",
    recommendation: "DEEP DECARB PILOT",
    bestFor: "Next-gen zero-emission feeder & demonstration runs",
    color: "#38bdf8",
    badge: "CLEAN PROPULSION"
  },
  {
    id: "VLSFO",
    name: "VLSFO (Very Low Sulfur Fuel Oil 0.5% S)",
    shortName: "VLSFO",
    pricePerTonne: 46200, // ~$550/t
    priceUSD: 554,
    energyDensity: 41.2, // MJ/kg
    emissionsFactor: 3.11,
    wtwEmissions: 3.58,
    availability: "UNIVERSAL",
    availabilityScore: 99,
    cargoVolumePenalty: "0%",
    ciiComplianceBonus: "-12%",
    recommendation: "HIGH CARBON RISK",
    bestFor: "Legacy bunkering; subject to EU ETS & CII penalties",
    color: "#f59e0b",
    badge: "CII SURCHARGE PENALTY"
  }
];

export const getFuelById = (id) => {
  return FUELS.find((f) => f.id.toLowerCase() === (id || "").toLowerCase()) || FUELS[0];
};
