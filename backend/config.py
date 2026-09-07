"""
Eco-Fleet Maritime Optimization Engine Configuration
Mathematical baselines, IMO MARPOL Annex VI regulatory coefficients, and QEA hyperparameters.
"""

from typing import Dict, Any

# ==============================================================================
# 1. QUANTUM-INSPIRED EVOLUTIONARY ALGORITHM (QEA) PARAMETERS
# ==============================================================================
QEA_CONFIG = {
    "qubit_population_size": 64,       # Qubit chromosome population
    "max_generations": 128,             # Convergence generation ceiling
    "crossover_probability": 0.85,      # Quantum gate interference rate
    "mutation_probability": 0.04,       # Quantum Pauli-X spin-flip probability
    "rotation_angle_table": {           # Dynamic lookup table for Δθ based on fitness
        "f_better": 0.035,              # Convergence step toward best individual (rad)
        "f_worse": -0.015,              # Repulsion step away from dominated individuals
        "zero_boundary": 0.000          # Stagnation boundary
    },
    "pareto_objectives": [
        "fuel_consumption_metric_tonnes",
        "total_expenditure_inr",
        "cii_penalty_score",
        "wave_slamming_risk_index"
    ]
}

# ==============================================================================
# 2. IMO CII REGULATORY BASELINES (Resolution MEPC.352(78))
# ==============================================================================
# Baseline AER reference curve parameters: CII_ref = a * (DWT)^(-c)
IMO_CII_BASELINES: Dict[str, Dict[str, float]] = {
    "Container Ship": {
        "a": 1984.0,
        "c": 0.489,
        "d1": 0.82,  # Rating A boundary
        "d2": 0.93,  # Rating B boundary
        "d3": 1.08,  # Rating C baseline
        "d4": 1.19   # Rating D/E boundary
    },
    "Bulk Carrier": {
        "a": 4745.0,
        "c": 0.622,
        "d1": 0.86,
        "d2": 0.94,
        "d3": 1.06,
        "d4": 1.18
    },
    "Oil Tanker": {
        "a": 5247.0,
        "c": 0.610,
        "d1": 0.82,
        "d2": 0.93,
        "d3": 1.08,
        "d4": 1.19
    },
    "Gas Carrier": {
        "a": 8112.0,
        "c": 0.640,
        "d1": 0.85,
        "d2": 0.95,
        "d3": 1.06,
        "d4": 1.15
    }
}

# Annual reduction factors relative to 2019 baseline (MARPOL Annex VI reg 28)
IMO_ANNUAL_REDUCTION_FACTORS: Dict[int, float] = {
    2023: 0.05,  # 5% reduction
    2024: 0.07,  # 7% reduction
    2025: 0.09,  # 9% reduction
    2026: 0.11,  # 11% reduction (current evaluation year)
    2027: 0.13,  # 13% reduction
    2028: 0.16,  # 16% reduction
    2029: 0.19,  # 19% reduction
    2030: 0.22   # 22% reduction (IMO 2030 Decarbonization Horizon)
}

# ==============================================================================
# 3. FUEL WELL-TO-WAKE (WtW) EMISSION & DENSITY COEFFICIENTS
# ==============================================================================
FUEL_SPECIFICATIONS: Dict[str, Dict[str, Any]] = {
    "LNG": {
        "cf_tonnes_co2_per_tonne_fuel": 2.750,
        "wtw_emissions_factor": 3.100,
        "lower_heating_value_mj_kg": 50.0,
        "density_kg_m3": 450.0,
        "base_cost_inr_per_tonne": 64800,
        "slip_methane_penalty_factor": 0.012
    },
    "Green Methanol": {
        "cf_tonnes_co2_per_tonne_fuel": 1.375,
        "wtw_emissions_factor": 0.450,
        "lower_heating_value_mj_kg": 19.9,
        "density_kg_m3": 792.0,
        "base_cost_inr_per_tonne": 92000,
        "slip_methane_penalty_factor": 0.000
    },
    "Green Ammonia": {
        "cf_tonnes_co2_per_tonne_fuel": 0.000,
        "wtw_emissions_factor": 0.180,
        "lower_heating_value_mj_kg": 18.6,
        "density_kg_m3": 682.0,
        "base_cost_inr_per_tonne": 105000,
        "slip_methane_penalty_factor": 0.000
    },
    "Liquid Hydrogen": {
        "cf_tonnes_co2_per_tonne_fuel": 0.000,
        "wtw_emissions_factor": 0.080,
        "lower_heating_value_mj_kg": 120.0,
        "density_kg_m3": 71.0,
        "base_cost_inr_per_tonne": 185000,
        "slip_methane_penalty_factor": 0.000
    },
    "VLSFO": {
        "cf_tonnes_co2_per_tonne_fuel": 3.114,
        "wtw_emissions_factor": 3.580,
        "lower_heating_value_mj_kg": 40.2,
        "density_kg_m3": 890.0,
        "base_cost_inr_per_tonne": 56000,
        "slip_methane_penalty_factor": 0.000
    }
}

# ==============================================================================
# 4. NAVAL HYDRODYNAMICS CONSTANTS (Holtrop-Mennen empirical parameters)
# ==============================================================================
HYDRODYNAMICS_CONSTANTS = {
    "seawater_density_kg_m3": 1025.0,
    "kinematic_viscosity_m2_s": 1.188e-6,
    "gravity_acceleration_m_s2": 9.80665,
    "form_factor_k1_default": 0.14,
    "aerodynamic_drag_coefficient_cd": 0.85,
    "air_density_kg_m3": 1.225,
    "max_slamming_wave_height_meters": 5.5
}
