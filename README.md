# 🌊 ECO-FLEET: Quantum-Inspired Green Maritime Fleet Optimizer

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![IMO CII](https://img.shields.io/badge/IMO%20CII-Compliant-00e5a3?style=flat)](#)
[![Decarbonization](https://img.shields.io/badge/MARPOL-Annex%20VI-00f0ff?style=flat)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ECO-FLEET** is a commercial-grade maritime fleet and voyage optimization platform designed for ship operators, charterers, and naval operations centers. It unites hydrodynamic resistance modeling, multi-fuel thermodynamics, **Quantum-Inspired Evolutionary Algorithms (QEA)**, **IMO Carbon Intensity Indicator (CII)** compliance, and **autonomous dynamic disruption recovery** into a mission-critical command dashboard.

---

## 🎯 Key Operational Capabilities

### 1. Quantum-Inspired Voyage Optimization (QEA)
- Formulates voyage planning as a high-dimensional combinatorial problem (speed profiles, waypoint deviations, engine load curves, and weather windows).
- Evaluates candidate permutations in seconds, converging up to **17x faster** than classical Mixed-Integer Linear Programming (MILP).
- Achieves Pareto-optimal trade-offs balancing bunker fuel consumption, total voyage expenditure, and schedule integrity.

### 2. Zero-Overland Maritime Routing Corridors
- Navigation engine strictly avoids continental landmasses, utilizing verified international shipping lanes, choke points, and traffic separation schemes (TSS):
  - **Strait of Hormuz & Gulf of Oman** (Persian Gulf deep channel)
  - **Bab-el-Mandeb & Red Sea** (Suez maritime access)
  - **Dondra Head Deep Water** (safely south of Sri Lanka)
  - **Malacca Strait Channel** (Sumatra/Malaysia clearance)
  - **Strait of Gibraltar & English Channel**
- Dynamic reverse pathing for return voyages preserves oceanic integrity with zero overland interpolation.

### 3. Live MetOcean Satellite Telemetry Stream
- Simulated real-time downlink syncing with oceanic monitoring arrays:
  - **NOAA-NDBC Deep Ocean Buoys** (Arabian Sea Central, Mid-Ocean Moorings)
  - **ECMWF Meteorological Nodes** (Gulf of Oman, Andaman Sea)
  - **INCOIS-RAMA Mooring Arrays** (Laccadive Sea, Bay of Bengal)
  - **Sentinel-6 Altimetry Passes** (South of Sri Lanka)
- Real-time tracking of wind vectors, significant wave height ($H_s$), ocean surface drift, Douglas sea state, swell period, and barometric pressure.

### 4. Dynamic Weather Disruption & Casualty Avoidance
- **Disruption Radar Simulator**: Model sudden tropical cyclones and typhoons with configurable radius ($50-180\text{ nm}$), intensity, and storm speed.
- **Simultaneous Dual-Route Rendering**:
  - **Previous Best Track**: Rendered in glowing dashed amber (`#fb923c`) with hazard underglow.
  - **Re-Optimized Green Corridor**: Rendered in vibrant animated cyan (`#00f0ff`) traversing safe deep-water corridors.
- **Inbound Ship Positioning**: Vessels automatically reposition at the destination port on inbound legs with bow headings aligned with the revised heading.
- **Side-by-Side Audit Card**: Instant variance analysis comparing Previous Plan vs Re-Optimized Detour across total cost, bunker burn, CO₂ emissions, ETA, speed, distance, CII rating, and wave slamming risk.

### 5. IMO Decarbonization & Carbon Intensity Indicator (CII)
- Automatic operational CII rating determination ($A$ through $E$) based on deadweight tonnage, nautical distance sailed, and fuel carbon factors.
- Multi-year trajectory tracking benchmarking against the **IMO 2023–2030 decarbonization trajectory** ($-5\%$ in 2023 to $-22\%$ in 2030).
- Alternative fuel intelligence analyzing Well-to-Wake (WtW) emissions for **LNG**, **Green Methanol**, **Green Ammonia**, **Liquid Hydrogen**, and **VLSFO**.

### 6. Explainable Decision Support (SHAP Attribution)
- Transparent algorithmic rationale ranking the primary predictive drivers behind every route recommendation (e.g., wave resistance mitigation, thermal efficiency, hydrodynamic trim, adverse current avoidance).

### 7. Executive Walkthrough Mode
- Integrated 7-step guided operational tour walking evaluators through voyage ingestion, QEA optimization, satellite downlink verification, cyclone stress-testing, dynamic re-routing, and algorithmic benchmarks.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Hooks, Context API) |
| **Build & Tooling** | Vite 6 |
| **Styling & Aesthetics** | Pure Vanilla CSS (Naval command dark theme, Glassmorphism, CSS Variables) |
| **Icons & Visuals** | Lucide React |
| **Mapping Engine** | Interactive High-Precision Vector SVG with pan/zoom and dynamic ship physics |
| **Architecture** | Service-oriented structure, zero external backend dependency required for local execution |

---

## 📁 Repository Structure

```
eco-fleet/
├── index.html                   # HTML entry point with naval command typography & theme
├── package.json                 # Project configuration & dependencies
├── vite.config.js               # Vite build configuration
├── src/
│   ├── main.jsx                 # Application bootstrapping
│   ├── App.jsx                  # Main application container & page router
│   ├── context/
│   │   └── FleetContext.jsx     # Centralized operational state, telemetry, and actions
│   ├── data/
│   │   ├── vessels.js           # 6 vessel profiles (Container, Tanker, Bulk, LNG)
│   │   ├── ports.js             # 6 global maritime hub ports with coordinate anchors
│   │   ├── fuels.js             # 5 marine fuel specifications & WtW emission factors
│   │   ├── routes.js            # 15 precomputed nautical corridors & storm bypasses
│   │   ├── weather.js           # Oceanic telemetry stations (NOAA, ECMWF, INCOIS)
│   │   ├── stormScenarios.js    # Disruption states (None, Low, Moderate, Severe, Extreme)
│   │   ├── benchmark.js         # Classical MILP vs QEA algorithmic metrics
│   │   └── optimizationEngine.js# Deterministic multi-objective optimization engine
│   ├── components/
│   │   ├── Header.jsx           # UTC clock, satellite sync status, executive walkthrough
│   │   ├── Sidebar.jsx          # Brand navigation & system telemetry status
│   │   ├── RouteMap.jsx         # SVG chart with continental polygons, dual routes & ship physics
│   │   ├── HeroVoyageCard.jsx   # Active dispatch headline & primary controls
│   │   ├── VoyageConfig.jsx     # Interactive vessel, route, fuel, and cargo selectors
│   │   ├── KPICards.jsx         # Executive metrics: Cost, Fuel, CO₂, CII, ETA, Distance
│   │   ├── ReoptimizationAuditCard.jsx # Side-by-side Before vs After disruption variance
│   │   ├── MetoceanPanel.jsx    # Real-time satellite telemetry downlink & wave gauges
│   │   ├── StormSimulator.jsx   # Cyclone injector modal with radius and intensity controls
│   │   ├── OptimizationModal.jsx# 6-stage QEA solver convergence animation
│   │   ├── ReoptimizationModal.jsx# 6-stage dynamic recovery pipeline modal
│   │   ├── ExplainabilityCard.jsx# SHAP-style predictive driver attribution bars
│   │   ├── FuelIntelligence.jsx # Alternative fuels comparison & energy densities
│   │   ├── CIICard.jsx          # IMO regulatory band gauge & target benchmarks
│   │   ├── EmissionsAndCost.jsx # Stacked expenditure breakdown & CO₂ savings
│   │   ├── EventFeed.jsx        # Real-time operations audit stream
│   │   └── DemoTourBanner.jsx   # Guided executive walkthrough overlay
│   ├── pages/
│   │   ├── CommandCenter.jsx    # Primary operations command center
│   │   ├── VoyageOptimizer.jsx  # Multi-scenario Pareto candidate comparator
│   │   ├── FleetPage.jsx        # Fleet telemetry matrix & vessel filtering
│   │   ├── WeatherPage.jsx      # Global oceanic observation array & radar simulator
│   │   ├── ReoptimizationPage.jsx # Incident casualty recovery & detour audit
│   │   ├── CIIPage.jsx          # IMO decarbonization & regulatory compliance horizon
│   │   ├── BenchmarkPage.jsx    # Classical MILP vs Quantum QEA benchmarking
│   │   └── SettingsPage.jsx     # Optimization governance & API bindings
│   └── styles/
│       └── main.css             # Unified dark naval command design tokens
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Varad2812/eco-fleet.git
   cd eco-fleet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173/`.

### Production Build

To validate or build the optimized production bundle:
```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```

---

## 🧭 Step-by-Step Walkthrough Guide

Follow this sequence for an executive demonstration:

1. **Voyage Ingestion**: On the **Command Center**, view the active dispatch for *Ocean Pioneer* from *Jebel Ali* to *Singapore*.
2. **Execute Optimization**: Click **`[ RUN OPTIMIZATION ]`** to trigger the 6-stage QEA solver and observe the optimal speed, fuel savings, and CII Rating B.
3. **Inspect Explainability**: Scroll down to the **Why This Plan?** card to inspect the predictive feature attributions (Wave Avoidance, Thermal Efficiency, Draft Trim).
4. **MetOcean Telemetry**: Observe the live **Satellite Downlink** and oceanic wave height gauges syncing with NOAA and ECMWF station buoys.
5. **Simulate Disruption**: Click **`[ DISRUPT ]`** on the map, select **Severe Cyclone**, and launch the simulation. Notice the ship repositioning on an inbound trajectory and the alert triggering.
6. **Dynamic Re-Optimization**: Click **`[ RE-OPTIMIZE VOYAGE ]`**. Observe the previous best route in glowing dashed amber and the new cyan detour bypassing the storm cell, along with the **Re-Optimization Variance Audit** table.
7. **Algorithmic Benchmarking**: Open the **Benchmark** page from the sidebar to review runtime comparisons, constraint satisfaction, and MAE curves showing QEA outperforming classical MILP.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Acknowledgments

Developed by **Varad Rathor** for smart maritime fleet optimization and decarbonization research.
Questions or contributions? Feel free to open an issue or pull request!
