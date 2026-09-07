"""
IMO Carbon Intensity Indicator (CII) & Decarbonization Trajectory Engine
Compliant with IMO Resolution MEPC.352(78), MEPC.353(78), and MEPC.354(78).
"""

import math
from typing import Dict, Any, Tuple
from backend.config import IMO_CII_BASELINES, IMO_ANNUAL_REDUCTION_FACTORS, FUEL_SPECIFICATIONS

class CIICalculator:
    """
    Maritime Decarbonization & Annual Efficiency Ratio (AER) Verification Engine.
    """
    def __init__(self, ship_type: str = "Container Ship", deadweight_dwt: float = 64800.0):
        self.ship_type = ship_type
        self.dwt = deadweight_dwt
        self.baseline_params = IMO_CII_BASELINES.get(ship_type, IMO_CII_BASELINES["Container Ship"])

    def calculate_reference_cii(self) -> float:
        """
        CII_ref = a * (DWT)^(-c)
        """
        a = self.baseline_params["a"]
        c = self.baseline_params["c"]
        return a * (self.dwt ** (-c))

    def calculate_required_cii(self, year: int = 2026) -> float:
        """
        CII_required = CII_ref * (1 - Z / 100)
        Where Z is the annual reduction factor relative to 2019 baseline.
        """
        cii_ref = self.calculate_reference_cii()
        reduction_factor = IMO_ANNUAL_REDUCTION_FACTORS.get(year, 0.11)
        return cii_ref * (1.0 - reduction_factor)

    def calculate_operational_aer(
        self,
        fuel_consumed_tonnes: float,
        distance_sailed_nm: float,
        fuel_type: str = "LNG"
    ) -> float:
        """
        Attained CII (AER - Annual Efficiency Ratio):
        AER = (Fuel_Consumed * Cf * 10^6) / (DWT * Distance_NM)
        Units: g CO2 / (DWT * nautical mile)
        """
        if distance_sailed_nm <= 0:
            return 0.0
        fuel_props = FUEL_SPECIFICATIONS.get(fuel_type, FUEL_SPECIFICATIONS["VLSFO"])
        cf = fuel_props["cf_tonnes_co2_per_tonne_fuel"]
        co2_tonnes = fuel_consumed_tonnes * cf
        aer = (co2_tonnes * 1e6) / (self.dwt * distance_sailed_nm)
        return aer

    def determine_cii_rating(self, attained_cii: float, year: int = 2026) -> Tuple[str, Dict[str, float]]:
        """
        Determine operational letter rating A, B, C, D, or E based on boundaries:
        Boundary_i = d_i * CII_required
        """
        req_cii = self.calculate_required_cii(year)
        d1 = self.baseline_params["d1"] * req_cii
        d2 = self.baseline_params["d2"] * req_cii
        d3 = self.baseline_params["d3"] * req_cii
        d4 = self.baseline_params["d4"] * req_cii

        boundaries = {
            "d1_superior_A": round(d1, 3),
            "d2_lower_B": round(d2, 3),
            "d3_upper_C": round(d3, 3),
            "d4_inferior_D_E": round(d4, 3),
            "target_required_cii": round(req_cii, 3)
        }

        if attained_cii <= d1:
            rating = "A"
        elif attained_cii <= d2:
            rating = "B"
        elif attained_cii <= d3:
            rating = "C"
        elif attained_cii <= d4:
            rating = "D"
        else:
            rating = "E"

        return rating, boundaries

    def evaluate_multi_year_trajectory(
        self,
        annual_fuel_tonnes: float,
        annual_distance_nm: float,
        fuel_type: str = "LNG"
    ) -> Dict[int, Dict[str, Any]]:
        """
        Audit voyage profile across 2023-2030 regulatory timeline.
        """
        attained_aer = self.calculate_operational_aer(annual_fuel_tonnes, annual_distance_nm, fuel_type)
        results = {}

        for year in sorted(IMO_ANNUAL_REDUCTION_FACTORS.keys()):
            rating, boundaries = self.determine_cii_rating(attained_aer, year)
            req = boundaries["target_required_cii"]
            margin_pct = ((req - attained_aer) / req) * 100.0

            results[year] = {
                "year": year,
                "reduction_factor_pct": round(IMO_ANNUAL_REDUCTION_FACTORS[year] * 100, 1),
                "required_cii": round(req, 2),
                "attained_aer": round(attained_aer, 2),
                "rating": rating,
                "compliance_margin_pct": round(margin_pct, 1),
                "status": "Compliant" if rating in ["A", "B", "C"] else "Corrective Action Required"
            }
        return results
