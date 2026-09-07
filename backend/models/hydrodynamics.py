"""
Hydrodynamic Vessel Resistance & Fuel Consumption Engine
Implements Holtrop-Mennen empirical resistance formulation and added wave resistance.
"""

import math
from typing import Dict, Any, Tuple
from backend.config import HYDRODYNAMICS_CONSTANTS

class HydrodynamicSolver:
    """
    Naval Architectural Holtrop-Mennen Resistance & Propulsion Solver.
    """
    def __init__(
        self,
        length_bp: float = 265.0,
        beam: float = 43.0,
        draft: float = 14.5,
        displacement_m3: float = 78500.0,
        prismatic_coeff_cp: float = 0.68,
        block_coeff_cb: float = 0.72
    ):
        self.L = length_bp
        self.B = beam
        self.T = draft
        self.nabla = displacement_m3
        self.Cp = prismatic_coeff_cp
        self.Cb = block_coeff_cb
        self.rho = HYDRODYNAMICS_CONSTANTS["seawater_density_kg_m3"]
        self.nu = HYDRODYNAMICS_CONSTANTS["kinematic_viscosity_m2_s"]
        self.g = HYDRODYNAMICS_CONSTANTS["gravity_acceleration_m_s2"]
        
        # Wetted surface area estimation (Mumford formula)
        self.S = 1.7 * self.L * self.T + (self.Cb * self.B * self.L)

    def calculate_frictional_resistance(self, speed_ms: float) -> Tuple[float, float]:
        """
        ITTC-1957 Friction Line:
        Cf = 0.075 / (log10(Re) - 2)^2
        Rf = 0.5 * rho * S * V^2 * Cf
        """
        if speed_ms <= 0:
            return 0.0, 0.0
        reynolds_nr = (speed_ms * self.L) / self.nu
        log_re = math.log10(max(reynolds_nr, 1e5))
        cf = 0.075 / ((log_re - 2.0)**2)
        rf = 0.5 * self.rho * self.S * (speed_ms**2) * cf
        return rf / 1000.0, cf  # Return kN and coeff

    def calculate_wave_making_resistance(self, speed_ms: float) -> float:
        """
        Holtrop-Mennen Wave Resistance:
        Rw = c1 * c2 * c5 * nabla * rho * g * exp{ m1 * Fn^d + m4 * cos(lambda * Fn^-2) }
        """
        froude_nr = speed_ms / math.sqrt(self.g * self.L)
        if froude_nr <= 0.01:
            return 0.0
        
        # Empirical form parameters
        c1 = 2223105.0 * (self.Cb**3.7861) * ((self.T / self.B)**1.0796) * ((90.0 - 18.0)**(-1.3756))
        m1 = 0.0140407 * (self.L / self.T) - 1.75254 * (self.nabla**(1/3) / self.L) - 4.79323 * (self.B / self.L) - 8.0798
        d = -0.9
        rw = c1 * self.nabla * self.rho * self.g * 1e-6 * math.exp(m1 * (froude_nr**d))
        return max(0.0, rw)

    def calculate_added_wave_resistance(self, speed_ms: float, wave_height_hs: float, peak_period_tp: float) -> float:
        """
        Added Resistance in Irregular Waves (Raw) using integrated JONSWAP spectrum:
        Raw = 2 * int S(omega) * (Raw/zeta^2) d_omega
        """
        if wave_height_hs <= 0.2:
            return 0.0
        
        # Simplified STAWAVE-2 empirical approximation for sea trial corrections
        omega_p = (2.0 * math.pi) / max(peak_period_tp, 4.0)
        wavelength_lambda = (self.g * (peak_period_tp**2)) / (2.0 * math.pi)
        tuning_ratio = self.L / max(wavelength_lambda, 1.0)
        
        # Transfer function peak near tuning ratio = 1.0
        raw_coeff = 0.65 * math.exp(-0.5 * ((tuning_ratio - 1.0) / 0.35)**2)
        raw_kn = 0.5 * self.rho * self.g * (wave_height_hs / 2.0)**2 * self.B * math.sqrt(self.B / self.L) * raw_coeff / 1000.0
        return max(0.0, raw_kn)

    def solve_total_resistance(
        self,
        speed_knots: float,
        wave_height_hs: float = 2.0,
        peak_period_tp: float = 8.0,
        wind_speed_knots: float = 15.0
    ) -> Dict[str, Any]:
        """
        Total resistance balance:
        Rt = Rf * (1 + k1) + Rw + Raw + Rwind
        """
        speed_ms = speed_knots * 0.514444
        k1 = HYDRODYNAMICS_CONSTANTS["form_factor_k1_default"]

        rf, cf = self.calculate_frictional_resistance(speed_ms)
        rw = self.calculate_wave_making_resistance(speed_ms)
        raw = self.calculate_added_wave_resistance(speed_ms, wave_height_hs, peak_period_tp)
        
        # Wind resistance (Blendermann method)
        air_rho = HYDRODYNAMICS_CONSTANTS["air_density_kg_m3"]
        v_wind_ms = wind_speed_knots * 0.514444
        rel_wind_v = speed_ms + v_wind_ms * 0.7
        frontal_area = self.B * 22.0  # Transverse wind area
        cd_wind = HYDRODYNAMICS_CONSTANTS["aerodynamic_drag_coefficient_cd"]
        r_wind = 0.5 * air_rho * (rel_wind_v**2) * frontal_area * cd_wind / 1000.0

        rt_total = (rf * (1.0 + k1)) + rw + raw + r_wind
        
        # Propulsion Power & Fuel Burn
        effective_power_pe_kw = rt_total * speed_ms
        quasi_propulsive_efficiency_eta = 0.68  # Hull * Propeller * Relative rotative efficiency
        brake_power_pb_kw = effective_power_pe_kw / quasi_propulsive_efficiency_eta
        
        # Specific Fuel Oil Consumption (SFOC) curve (g/kWh)
        load_fraction = min(1.0, max(0.2, brake_power_pb_kw / 28000.0))
        sfoc_g_kwh = 165.0 + 35.0 * ((load_fraction - 0.75)**2)  # Optimal at 75% MCR
        fuel_rate_tonnes_per_hour = (brake_power_pb_kw * sfoc_g_kwh * 1e-6)

        return {
            "speed_knots": speed_knots,
            "frictional_resistance_kn": round(rf, 1),
            "wave_making_resistance_kn": round(rw, 1),
            "added_wave_resistance_kn": round(raw, 1),
            "aerodynamic_drag_kn": round(r_wind, 1),
            "total_resistance_kn": round(rt_total, 1),
            "brake_power_kw": round(brake_power_pb_kw, 0),
            "engine_load_pct": round(load_fraction * 100, 1),
            "fuel_rate_tonnes_per_hour": round(fuel_rate_tonnes_per_hour, 3)
        }
