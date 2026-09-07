export const BENCHMARK_DATA = {
  note: "Production version will evaluate these metrics using historical and operational datasets.",
  label: "DEMO BENCHMARK DATA",
  timestamp: "2026-09-08 00:00 UTC",
  hardwareProfile: "HPC Hybrid Node: Dual AMD EPYC 7763 (128 Cores) + Simulated Quantum Annealing Simulator (QEA-8000)",

  prediction: {
    title: "Weather-Aware Fuel Consumption Prediction",
    subtitle: "Evaluation across 12,400 nautical test segments with dynamic wave/wind vectors",
    models: [
      {
        name: "Standard XGBoost",
        category: "Classical Machine Learning",
        mae: "1.42 t/day",
        rmse: "1.89 t/day",
        r2: "0.912",
        predictionRuntime: "4.8 ms",
        overfittingRisk: "Moderate on extreme sea states (wave > 5m)",
        notes: "Solid tabular baseline; exhibits divergence under non-linear cross-swell interactions."
      },
      {
        name: "Deep MLP + Hydro Physics",
        category: "Deep Learning Hybrid",
        mae: "1.28 t/day",
        rmse: "1.65 t/day",
        r2: "0.934",
        predictionRuntime: "14.2 ms",
        overfittingRisk: "Low",
        notes: "Incorporates Holtrop-Mennen resistance equations into loss function."
      },
      {
        name: "QINN (Quantum-Inspired Neural Network)",
        category: "Quantum-Inspired Tensor",
        mae: "1.08 t/day",
        rmse: "1.37 t/day",
        r2: "0.958",
        predictionRuntime: "6.1 ms",
        overfittingRisk: "Very Low (Quantum state regularization)",
        notes: "Parameterized quantum tensor layers capture higher-order multi-axis hydrodynamic interference."
      }
    ],
    comparisonSummary: "QINN demonstrates a 23.9% reduction in MAE in high sea states (Hs > 4.0m), where classical polynomial regressors encounter quadratic error spikes."
  },

  optimization: {
    title: "Multi-Objective Fleet & Voyage Optimization",
    subtitle: "Combinatorial scale: 18 vessels × 14 waypoints × 6 speeds × 4 fuels (10¹² state combinations)",
    solvers: [
      {
        name: "Classical MILP (Gurobi / OR-Tools)",
        type: "Mixed-Integer Linear Programming",
        solutionCostUSD: "$64,250",
        co2Tonnes: "2,410 t",
        runtimeSec: "142.6 s",
        constraintViolations: "0 (Hard barrier)",
        scalabilityLimit: "O(2ⁿ) exponential runtime above 12 waypoints",
        optimalityGap: "Guaranteed 0.8% optimality on relaxed linear approximation"
      },
      {
        name: "Genetic Algorithm (NSGA-II)",
        type: "Classical Evolutionary Heuristic",
        solutionCostUSD: "$62,180",
        co2Tonnes: "2,352 t",
        runtimeSec: "38.4 s",
        constraintViolations: "Occasional CII boundary oscillation (1.2%)",
        scalabilityLimit: "Prone to local minima entrapment under steep weather gradients",
        optimalityGap: "~3.4% estimated"
      },
      {
        name: "QEA (Quantum-Inspired Evolutionary Algorithm)",
        type: "Qubit-State Superposition Optimizer",
        solutionCostUSD: "$60,480",
        co2Tonnes: "2,298 t",
        runtimeSec: "8.3 s",
        constraintViolations: "0 (Quantum penalty Hamiltonian enforces strict CII compliance)",
        scalabilityLimit: "Sub-polynomial scaling across high-dimensional meteorological grids",
        optimalityGap: "~1.1% near-global convergence"
      }
    ],
    comparisonSummary: "QEA achieves near-optimal solutions 17x faster than full MILP, enabling real-time 8-second rerouting in operational sea operations when severe weather strikes."
  },

  paretoMetrics: [
    { name: "Speed 14 kn", costMILP: 68500, costQEA: 64200, co2MILP: 2150, co2QEA: 2090 },
    { name: "Speed 15 kn", costMILP: 65200, costQEA: 61800, co2MILP: 2280, co2QEA: 2210 },
    { name: "Speed 16.2 kn (Optimal)", costMILP: 64250, costQEA: 60480, co2MILP: 2410, co2QEA: 2298 },
    { name: "Speed 17.5 kn", costMILP: 67900, costQEA: 63900, co2MILP: 2680, co2QEA: 2540 },
    { name: "Speed 19 kn", costMILP: 74200, costQEA: 70100, co2MILP: 3120, co2QEA: 2980 }
  ]
};
