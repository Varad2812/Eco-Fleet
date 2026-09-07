"""
Quantum-Inspired Evolutionary Algorithm (QEA) Engine
Multi-objective Pareto optimization for maritime route waypoint and speed scheduling.
"""

import math
import random
from typing import List, Tuple, Dict, Any
from backend.config import QEA_CONFIG

class Qubit:
    """
    Two-state quantum bit representation where state |ψ⟩ = α|0⟩ + β|1⟩
    Normalized such that |α|^2 + |β|^2 = 1.
    """
    def __init__(self, alpha: float = 1.0 / math.sqrt(2), beta: float = 1.0 / math.sqrt(2)):
        self.alpha = alpha
        self.beta = beta
        self.normalize()

    def normalize(self):
        magnitude = math.sqrt(self.alpha**2 + self.beta**2)
        if magnitude > 0:
            self.alpha /= magnitude
            self.beta /= magnitude

    def measure(self) -> int:
        """Collapse qubit state into classical bit based on probability |β|^2."""
        return 1 if random.random() < (self.beta**2) else 0

    def apply_rotation_gate(self, delta_theta: float):
        """
        Apply 2D unitary quantum rotation gate:
        [α'] = [cos(Δθ)  -sin(Δθ)] [α]
        [β'] = [sin(Δθ)   cos(Δθ)] [β]
        """
        cos_t = math.cos(delta_theta)
        sin_t = math.sin(delta_theta)
        new_alpha = cos_t * self.alpha - sin_t * self.beta
        new_beta = sin_t * self.alpha + cos_t * self.beta
        self.alpha = new_alpha
        self.beta = new_beta
        self.normalize()


class QuantumChromosome:
    """
    Qubit-represented chromosome encoding voyage speed profile and waypoint deviations.
    """
    def __init__(self, length: int):
        self.length = length
        # Initialize each gene in equal quantum superposition
        self.qubits = [Qubit() for _ in range(length)]
        self.best_classical_individual: List[int] = []
        self.best_fitness: float = -float('inf')

    def collapse(self) -> List[int]:
        """Perform quantum measurement across all qubits."""
        return [q.measure() for q in self.qubits]

    def update_quantum_gates(self, best_binary: List[int], current_binary: List[int], f_current: float, f_best: float):
        """
        Update qubit probability amplitudes using dynamic rotation angle Δθ
        steering probabilities toward Pareto-dominant solutions.
        """
        d_theta_base = QEA_CONFIG["rotation_angle_table"]["f_better"]
        
        for i in range(self.length):
            x_i = current_binary[i]
            b_i = best_binary[i]

            if f_current >= f_best:
                # Directional steering toward dominant individual
                if x_i == 0 and b_i == 1:
                    delta_theta = d_theta_base
                elif x_i == 1 and b_i == 0:
                    delta_theta = -d_theta_base
                else:
                    delta_theta = 0.0
            else:
                # Repulsive step away from dominated local optima
                if x_i == 1 and b_i == 1:
                    delta_theta = QEA_CONFIG["rotation_angle_table"]["f_worse"]
                else:
                    delta_theta = 0.0

            if delta_theta != 0.0:
                self.qubits[i].apply_rotation_gate(delta_theta)


class QuantumEvolutionaryOptimizer:
    """
    Quantum-Inspired Evolutionary Algorithm (QEA) Solver for Maritime Multi-Objective Optimization.
    """
    def __init__(self, gene_length: int = 32, population_size: int = None):
        self.gene_length = gene_length
        self.pop_size = population_size or QEA_CONFIG["qubit_population_size"]
        self.max_generations = QEA_CONFIG["max_generations"]
        self.population = [QuantumChromosome(gene_length) for _ in range(self.pop_size)]
        self.global_best_individual: List[int] = []
        self.global_best_fitness: float = -float('inf')
        self.convergence_history: List[Dict[str, Any]] = []

    def evaluate_fitness(self, binary_chromosome: List[int], voyage_context: Dict[str, Any]) -> Tuple[float, Dict[str, float]]:
        """
        Multi-objective fitness function:
        F = w1 * (1 / Fuel) + w2 * (1 / Cost) + w3 * (CII_margin) - w4 * (Wave_Risk)
        """
        # Decode chromosome to continuous parameters
        speed_raw = sum(bit * (2**i) for i, bit in enumerate(binary_chromosome[:8]))
        speed_knots = 12.0 + (speed_raw / 255.0) * 8.0  # 12.0 to 20.0 knots
        
        distance_nm = voyage_context.get("distance_nm", 3380.0)
        cargo_tonnes = voyage_context.get("cargo_tonnes", 18500.0)
        wave_height_m = voyage_context.get("wave_height_m", 2.4)
        
        # Hydrodynamic resistance approximation
        hours = distance_nm / max(speed_knots, 10.0)
        daily_fuel_t = 28.0 * (speed_knots / 16.0)**3.2 * (1.0 + 0.08 * (wave_height_m / 2.0)**1.8)
        total_fuel_t = daily_fuel_t * (hours / 24.0)
        
        # Financial model
        fuel_price_per_tonne = 64800.0
        carbon_tax_per_tonne_co2 = 3630.0
        co2_emissions_t = total_fuel_t * 2.75
        total_cost = (total_fuel_t * fuel_price_per_tonne) + (co2_emissions_t * carbon_tax_per_tonne_co2)
        
        # CII Calculation
        dwt = voyage_context.get("vessel_dwt", 64800.0)
        aer = (co2_emissions_t * 1e6) / (dwt * distance_nm)
        cii_target = 7.30
        cii_margin = (cii_target - aer) / cii_target
        
        # Wave slamming safety penalty
        wave_slam_penalty = max(0.0, (wave_height_m - 4.5) * 2.5)

        # Composite multi-objective scalarized fitness
        fitness = (1000.0 / total_fuel_t) + (5e7 / total_cost) + (cii_margin * 15.0) - wave_slam_penalty

        metrics = {
            "speed_knots": round(speed_knots, 2),
            "fuel_consumption_tonnes": round(total_fuel_t, 1),
            "total_cost_inr": round(total_cost, 0),
            "co2_emissions_tonnes": round(co2_emissions_t, 1),
            "aer_metric": round(aer, 3),
            "cii_margin_pct": round(cii_margin * 100, 2),
            "wave_slam_penalty": round(wave_slam_penalty, 3)
        }
        return fitness, metrics

    def step_generation(self, generation: int, voyage_context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute one full evolutionary cycle across all quantum chromosomes."""
        gen_best_fitness = -float('inf')
        gen_best_individual = []
        gen_best_metrics = {}

        # 1. Measurement & Fitness Evaluation
        for q_chrom in self.population:
            classical_individual = q_chrom.collapse()
            fitness, metrics = self.evaluate_fitness(classical_individual, voyage_context)

            if fitness > gen_best_fitness:
                gen_best_fitness = fitness
                gen_best_individual = classical_individual
                gen_best_metrics = metrics

            if fitness > q_chrom.best_fitness:
                q_chrom.best_fitness = fitness
                q_chrom.best_classical_individual = classical_individual

        # 2. Update Global Elitist Optimum
        if gen_best_fitness > self.global_best_fitness:
            self.global_best_fitness = gen_best_fitness
            self.global_best_individual = gen_best_individual

        # 3. Quantum Rotation Gate Application
        for q_chrom in self.population:
            q_chrom.update_quantum_gates(
                best_binary=self.global_best_individual,
                current_binary=q_chrom.best_classical_individual,
                f_current=q_chrom.best_fitness,
                f_best=self.global_best_fitness
            )

        gen_log = {
            "generation": generation,
            "best_fitness": round(self.global_best_fitness, 4),
            "speed_knots": gen_best_metrics.get("speed_knots", 16.2),
            "fuel_tonnes": gen_best_metrics.get("fuel_consumption_tonnes", 412.8),
            "aer": gen_best_metrics.get("aer_metric", 6.84),
            "cost_inr": gen_best_metrics.get("total_cost_inr", 32800000)
        }
        self.convergence_history.append(gen_log)
        return gen_log
