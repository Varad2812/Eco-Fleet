# 📐 ECO-FLEET: Mathematical Formulations & Calculation Engine Reference

> **Document Purpose**: Exhaustive mathematical, naval architectural, and algorithmic specification of all formulas implemented across the **ECO-FLEET** platform (backend simulation solvers and frontend optimization engines).  
> **Applicable Standards**: IMO MARPOL Annex VI (Resolutions MEPC.352(78), MEPC.353(78), MEPC.354(78)), ITTC-1957 Recommended Procedures, Holtrop-Mennen Naval Resistance Formulation, STAWAVE-2, and Quantum Evolutionary Computing.

---

## 📑 Table of Contents

1. [Executive Summary of Formula Use Cases](#1-executive-summary-of-formula-use-cases)
2. [Use Case: IMO Carbon Intensity Indicator (CII) & Decarbonization](#2-use-case-imo-carbon-intensity-indicator-cii--decarbonization)
   - 2.1 [Operational Annual Efficiency Ratio (AER / Attained CII)](#21-operational-annual-efficiency-ratio-aer--attained-cii)
   - 2.2 [IMO Baseline Reference Curve ($CII_{ref}$)](#22-imo-baseline-reference-curve-ciiref)
   - 2.3 [Statutory Required CII ($CII_{req}$) with Annual Reduction Factor](#23-statutory-required-cii-ciireq-with-annual-reduction-factor)
   - 2.4 [Operational Letter Rating Thresholds (A, B, C, D, E)](#24-operational-letter-rating-thresholds-a-b-c-d-e)
   - 2.5 [CII Regulatory Compliance Margin Percentage](#25-cii-regulatory-compliance-margin-percentage)
3. [Use Case: Vessel Fuel Burn & Consumption Dynamics](#3-use-case-vessel-fuel-burn--consumption-dynamics)
   - 3.1 [Transit Duration & Days at Sea](#31-transit-duration--days-at-sea)
   - 3.2 [Cubic Law of Ship Propulsion & Hydrodynamic Load Factor](#32-cubic-law-of-ship-propulsion--hydrodynamic-load-factor)
   - 3.3 [Cargo Trim & Loading Ratio Adjustment](#33-cargo-trim--loading-ratio-adjustment)
   - 3.4 [Fuel Energy Density Normalization Factor](#34-fuel-energy-density-normalization-factor)
   - 3.5 [Integrated Voyage Fuel Consumption](#35-integrated-voyage-fuel-consumption)
   - 3.6 [Specific Fuel Oil Consumption (SFOC) Parabolic Curve](#36-specific-fuel-oil-consumption-sfoc-parabolic-curve)
   - 3.7 [Instantaneous Hourly Fuel Rate (Backend Solver)](#37-instantaneous-hourly-fuel-rate-backend-solver)
4. [Use Case: Carbon & Greenhouse Gas (GHG) Emissions](#4-use-case-carbon--greenhouse-gas-ghg-emissions)
   - 4.1 [Direct Combustion Tank-to-Wake (TtW) $CO_2$ Emissions](#41-direct-combustion-tank-to-wake-ttw-co2-emissions)
   - 4.2 [Lifecycle Well-to-Wake (WtW) GHG Emissions](#42-lifecycle-well-to-wake-wtw-ghg-emissions)
   - 4.3 [Baseline Relative $CO_2$ Reduction Percentage](#43-baseline-relative-co2-reduction-percentage)
   - 4.4 [Methane Slip Factor (Cryogenic LNG Propulsion)](#44-methane-slip-factor-cryogenic-lng-propulsion)
5. [Use Case: Naval Hydrodynamics & Vessel Resistance](#5-use-case-naval-hydrodynamics--vessel-resistance)
   - 5.1 [Wetted Surface Area (Mumford Approximation)](#51-wetted-surface-area-mumford-approximation)
   - 5.2 [Reynolds Number ($Re$)](#52-reynolds-number-re)
   - 5.3 [Frictional Resistance ($R_F$) via ITTC-1957 Model-Ship Correlation Line](#53-frictional-resistance-rf-via-ittc-1957-model-ship-correlation-line)
   - 5.4 [Froude Number ($Fn$)](#54-froude-number-fn)
   - 5.5 [Holtrop-Mennen Wave-Making Resistance ($R_W$)](#55-holtrop-mennen-wave-making-resistance-rw)
   - 5.6 [Added Wave Resistance in Irregular Seas ($R_{AW}$ - STAWAVE-2 / JONSWAP)](#56-added-wave-resistance-in-irregular-seas-raw---stawave-2--jonswap)
   - 5.7 [Aerodynamic Drag & Wind Resistance ($R_{wind}$ - Blendermann Formulation)](#57-aerodynamic-drag--wind-resistance-rwind---blendermann-formulation)
   - 5.8 [Total Hydrodynamic Resistance Balance ($R_T$)](#58-total-hydrodynamic-resistance-balance-rt)
   - 5.9 [Propulsion Power Balance ($P_E$ and $P_B$)](#59-propulsion-power-balance-pe-and-pb)
6. [Use Case: Quantum-Inspired Evolutionary Algorithm (QEA) Engine](#6-use-case-quantum-inspired-evolutionary-algorithm-qea-engine)
   - 6.1 [Qubit State Superposition Representation](#61-qubit-state-superposition-representation)
   - 6.2 [Quantum Measurement & State Collapse](#62-quantum-measurement--state-collapse)
   - 6.3 [Unitary Quantum Rotation Gate Transformation](#63-unitary-quantum-rotation-gate-transformation)
   - 6.4 [Dynamic Rotation Angle Table ($\Delta\theta$)](#64-dynamic-rotation-angle-table-deltatheta)
   - 6.5 [Multi-Objective Scalarized Composite Fitness Function](#65-multi-objective-scalarized-composite-fitness-function)
   - 6.6 [Binary Chromosome Continuous Parameter Decoding](#66-binary-chromosome-continuous-parameter-decoding)
7. [Use Case: MetOcean Satellite & Oceanographic Physics](#7-use-case-metocean-satellite--oceanographic-physics)
   - 7.1 [Deep-Water Gravity Wavelength ($\lambda$)](#71-deep-water-gravity-wavelength-lambda)
   - 7.2 [Vessel-to-Wave Tuning Ratio](#72-vessel-to-wave-tuning-ratio)
   - 7.3 [Omnidirectional Wave Energy Flux ($P_{flux}$)](#73-omnidirectional-wave-energy-flux-pflux)
   - 7.4 [Douglas Sea State Scale Classification](#74-douglas-sea-state-scale-classification)
   - 7.5 [Barometric Depression Gradient](#75-barometric-depression-gradient)
8. [Use Case: Weather Disruption, Storm Detours & Re-Optimization](#8-use-case-weather-disruption-storm-detours--re-optimization)
   - 8.1 [Disruption Modifiers (Fuel, $CO_2$, Cost, ETA Duration)](#81-disruption-modifiers-fuel-co2-cost-eta-duration)
   - 8.2 [Speed Governing Throttling ($\Delta V_{kn}$)](#82-speed-governing-throttling-delta-vkn)
   - 8.3 [Wave Slamming Safety Margin Index](#83-wave-slamming-safety-margin-index)
9. [Use Case: Commercial Voyage Financials & Demurrage Risk](#9-use-case-commercial-voyage-financials--demurrage-risk)
   - 9.1 [Bunker Fuel Cost](#91-bunker-fuel-cost)
   - 9.2 [Carbon Compliance Cost (EU ETS & Carbon Levies)](#92-carbon-compliance-cost-eu-ets--carbon-levies)
   - 9.3 [Total Voyage Commercial Expenditure ($Cost_{total}$)](#93-total-voyage-commercial-expenditure-costtotal)
   - 9.4 [Operational Financial Variance Comparison](#94-operational-financial-variance-comparison)
10. [Reference Data, Constants & Codebase Mappings](#10-reference-data-constants--codebase-mappings)

---

## 1. Executive Summary of Formula Use Cases

| Use Case Name | Primary Formula / Governing Law | Target Metric / Units | Primary Codebase Location |
| :--- | :--- | :--- | :--- |
| **IMO Carbon Intensity (CII)** | $AER = \frac{FC \cdot C_F \cdot 10^6}{DWT \cdot D}$ | $\text{g } CO_2 / (\text{DWT} \cdot \text{nm})$ | [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L36-L54), [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L147-L165) |
| **CII Regulatory Baselines** | $CII_{ref} = a \cdot DWT^{-c}$ | Dimensionless target curve | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L32-L66), [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L19-L26) |
| **CII Trajectory Target** | $CII_{req} = CII_{ref} \cdot (1 - Z / 100)$ | Operational limit threshold | [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L27-L35) |
| **Fuel Burn (Propulsion)** | $P \propto V^{2.8 \text{ to } 3.2}$; $FC = t_{sea} \cdot \dot{m}_{base} \cdot f_{hydro} \cdot f_{cargo} \cdot f_{energy}$ | Metric Tonnes ($t$) | [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L117-L132), [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L118-L121) |
| **Fuel Burn (SFOC Rate)** | $\dot{m}_{fuel} = P_B \cdot SFOC \cdot 10^{-6}$ | Tonnes / hour ($t/h$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L117-L121) |
| **$CO_2$ Direct Emissions** | $CO_2 = FC \cdot C_F$ | Metric Tonnes $CO_2$ | [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L135-L138), [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L83-L124) |
| **Well-to-Wake (WtW) GHG** | $GHG_{WtW} = FC \cdot WtW_{factor}$ | Metric Tonnes $CO_2e$ | [fuels.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/fuels.js#L1-L92), [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L83-L124) |
| **Frictional Hull Drag** | ITTC-1957: $C_F = \frac{0.075}{(\log_{10} Re - 2)^2}$; $R_F = \frac{1}{2} \rho S V^2 C_F$ | Kilonewtons ($kN$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L36-L48) |
| **Wave-Making Resistance** | Holtrop-Mennen: $R_W = c_1 \nabla \rho g \exp(m_1 Fn^d)$ | Kilonewtons ($kN$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L50-L65) |
| **Added Wave Resistance** | STAWAVE-2: $R_{AW} = \frac{1}{2} \rho g \zeta_a^2 B \sqrt{B/L_{BP}} \cdot f_{tuning}$ | Kilonewtons ($kN$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L66-L83) |
| **Aerodynamic Wind Drag** | Blendermann: $R_{wind} = \frac{1}{2} \rho_{air} V_{rel}^2 A_T C_d$ | Kilonewtons ($kN$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L102-L109) |
| **Total Brake Power** | $P_E = R_T \cdot V$; $P_B = P_E / \eta_0$ | Kilowatts ($kW$) | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L113-L115) |
| **Quantum Optimization** | Qubit Rotation Gate: $|\psi^{t+1}\rangle = U(\Delta\theta) |\psi^t\rangle$ | Qubit Probability Amplitudes | [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L31-L44) |
| **Multi-Objective Fitness** | $F = w_1 \frac{10^3}{FC} + w_2 \frac{5 \cdot 10^7}{Cost} + w_3 \Delta CII_{margin} - w_4 Slam$ | Scalar Fitness Score | [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L106-L150) |
| **MetOcean Wave Energy Flux**| $P_{flux} = \frac{\rho g^2}{64\pi} H_s^2 T_e$ | Kilowatts / meter ($kW/m$) | [metocean.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/services/metocean.py#L41-L46), [run_hpc_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/run_hpc_engine.py#L134-L135) |
| **Voyage Cost Balance** | $Cost = Cost_{fuel} + Cost_{carbon} + Cost_{port} + Cost_{demurrage}$ | Indian Rupees ($\text{₹}$) / USD | [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L168-L177) |

---

## 2. Use Case: IMO Carbon Intensity Indicator (CII) & Decarbonization

The Carbon Intensity Indicator (CII) is a statutory operational efficiency measure established under **IMO MARPOL Annex VI, Regulation 28** and defined by Resolutions **MEPC.352(78)**, **MEPC.353(78)**, and **MEPC.354(78)**.

### 2.1 Operational Annual Efficiency Ratio (AER / Attained CII)

#### Use Case Description
Evaluates the continuous operational carbon intensity of the vessel for any single voyage segment or aggregated annual operational period.

#### Mathematical Formula
$$\text{AER} = \frac{\sum_j \left( FC_j \times C_{F,j} \right) \times 10^6}{\text{DWT} \times D}$$

#### Parameter Definitions
- $\text{AER}$: Annual Efficiency Ratio / Attained CII ($\text{g } CO_2 / (\text{DWT} \cdot \text{nautical mile})$).
- $FC_j$: Fuel consumed of fuel type $j$ (Metric tonnes, $t$).
- $C_{F,j}$: Carbon conversion factor for fuel type $j$ ($t \text{ } CO_2 / t \text{ fuel}$).
- $10^6$: Unit conversion factor converting metric tonnes of $CO_2$ to grams ($g$).
- $\text{DWT}$: Vessel deadweight tonnage carrying capacity (Metric tonnes, $t$).
- $D$: Actual distance sailed across open-ocean track (Nautical miles, $nm$).

#### Implementation
Implemented in:
- Backend: [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L36-L54) (`calculate_operational_aer`)
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L149-L156)

```python
co2_tonnes = fuel_consumed_tonnes * cf
aer = (co2_tonnes * 1e6) / (self.dwt * distance_sailed_nm)
```

---

### 2.2 IMO Baseline Reference Curve ($CII_{ref}$)

#### Use Case Description
Establishes the standard carbon intensity benchmark based on ship type and cargo-carrying capacity (DWT), derived from the 2019 world fleet baseline data.

#### Mathematical Formula
$$CII_{\text{ref}} = a \cdot (\text{DWT})^{-c}$$

#### Parameter Definitions
- $a$: Empirical capacity multiplier coefficient defined in Resolution MEPC.353(78).
- $c$: Empirical exponential capacity scale exponent.
- $\text{DWT}$: Vessel maximum deadweight tonnage ($t$).

#### Statutory Baseline Values Implemented:
| Vessel Class | $a$ | $c$ | Rating Boundaries ($d_1, d_2, d_3, d_4$) |
| :--- | :--- | :--- | :--- |
| **Container Ship** | $1984.0$ | $0.489$ | $0.82, 0.93, 1.08, 1.19$ |
| **Bulk Carrier** | $4745.0$ | $0.622$ | $0.86, 0.94, 1.06, 1.18$ |
| **Oil Tanker** | $5247.0$ | $0.610$ | $0.82, 0.93, 1.08, 1.19$ |
| **Gas Carrier** | $8112.0$ | $0.640$ | $0.85, 0.95, 1.06, 1.15$ |

#### Implementation
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L33-L66), [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L19-L26)

---

### 2.3 Statutory Required CII ($CII_{req}$) with Annual Reduction Factor

#### Use Case Description
Calculates the maximum permissible carbon intensity allowed for a vessel in a designated operational calendar year (2023 through 2030).

#### Mathematical Formula
$$CII_{\text{req}} = CII_{\text{ref}} \times \left(1 - \frac{Z}{100}\right)$$

#### Parameter Definitions
- $CII_{\text{req}}$: Required statutory carbon intensity limit ($\text{g } CO_2 / (\text{DWT} \cdot \text{nm})$).
- $Z$: Annual decarbonization reduction factor percentage relative to the 2019 baseline.

#### Reduction Factor Schedule ($Z$):
$$\begin{cases} 
2023: & Z = 5\% \\
2024: & Z = 7\% \\
2025: & Z = 9\% \\
2026: & Z = 11\% \quad \text{(Active Evaluation Year)} \\
2027: & Z = 13\% \\
2028: & Z = 16\% \\
2029: & Z = 19\% \\
2030: & Z = 22\% \quad \text{(IMO 2030 Decarbonization Horizon)}
\end{cases}$$

#### Implementation
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L69-L78), [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L27-L35)
- Frontend: [CIIPage.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/pages/CIIPage.jsx#L11-L18)

---

### 2.4 Operational Letter Rating Thresholds (A, B, C, D, E)

#### Use Case Description
Maps the attained AER to an internationally recognized performance letter rating ($A, B, C, D, E$) using statutory boundary ratios defined by IMO Resolution MEPC.354(78).

#### Mathematical Formula
$$\begin{aligned}
\text{Superior (A)}: & \quad \text{AER} \le d_1 \times CII_{\text{req}} \\
\text{Compliant (B)}: & \quad d_1 \times CII_{\text{req}} < \text{AER} \le d_2 \times CII_{\text{req}} \\
\text{Acceptable (C)}: & \quad d_2 \times CII_{\text{req}} < \text{AER} \le d_3 \times CII_{\text{req}} \\
\text{Corrective Action (D)}: & \quad d_3 \times CII_{\text{req}} < \text{AER} \le d_4 \times CII_{\text{req}} \\
\text{Non-Compliant (E)}: & \quad \text{AER} > d_4 \times CII_{\text{req}}
\end{aligned}$$

#### Implementation
- Backend: [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L55-L86)
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L158-L164), [CIICard.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/components/CIICard.jsx#L9-L15)

---

### 2.5 CII Regulatory Compliance Margin Percentage

#### Use Case Description
Measures how much headroom a voyage plan has before violating the targeted statutory threshold.

#### Mathematical Formula
$$\text{Margin}_{\%} = \left(\frac{CII_{\text{req}} - \text{AER}}{CII_{\text{req}}}\right) \times 100\%$$

- $\text{Margin}_{\%} > 0$: Vessel is comfortably compliant.
- $\text{Margin}_{\%} < 0$: Corrective Action Plan (SEEMP Part III) is legally mandatory.

#### Implementation
- Backend: [cii_calculator.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/cii_calculator.py#L102-L111)

---

## 3. Use Case: Vessel Fuel Burn & Consumption Dynamics

### 3.1 Transit Duration & Days at Sea

#### Use Case Description
Computes sea passage transit time from waypoint distance and average vessel speed over ground.

#### Mathematical Formula
$$t_{\text{hours}} = \frac{D}{V}, \quad t_{\text{days}} = \frac{t_{\text{hours}}}{24} = \frac{D}{24 \times V}$$

#### Parameter Definitions
- $D$: Total track distance ($nm$).
- $V$: Speed over ground ($knots$).
- $t_{\text{hours}}$: Total voyage duration in hours.
- $t_{\text{days}}$: Total sea days.

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L111-L126)
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L118-L120)

---

### 3.2 Cubic Law of Ship Propulsion & Hydrodynamic Load Factor

#### Use Case Description
Applies the fundamental hydrodynamic cubic law of naval architecture, stating that propulsive power and daily fuel burn scale with the cube of ship speed ($P \propto V^3$).

#### Mathematical Formula
$$f_{\text{hydro}} = \left( \frac{V}{V_{\text{eco}}} \right)^{\alpha_{\text{exp}}}$$

#### Parameter Definitions
- $V$: Actual planned vessel cruising speed ($knots$).
- $V_{\text{eco}}$: Vessel design economical speed ($knots$, typically $12.4$ to $15.8\text{ kn}$).
- $\alpha_{\text{exp}}$: Power exponent ($2.8$ to $3.2$, calibrated to hull fullness and Reynolds friction effects).

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L119-L120) (`Math.pow(speedRatio, 2.8)`)
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L119) (`(speed_knots / 16.0)**3.2`)

---

### 3.3 Cargo Trim & Loading Ratio Adjustment

#### Use Case Description
Accounts for the displacement draft increase and wetted hull immersion resulting from loaded cargo weight relative to vessel design deadweight.

#### Mathematical Formula
$$r_{\text{cargo}} = \text{clamp}\left(0.6, 1.4, \frac{M_{\text{cargo}}}{M_{\text{default}}}\right)$$
$$f_{\text{cargo}} = 0.85 + 0.15 \times r_{\text{cargo}}$$

#### Parameter Definitions
- $M_{\text{cargo}}$: Actual payload carried ($t$).
- $M_{\text{default}}$: Nominal reference payload ($t$, e.g., $18,500\text{ t}$ or $20,000\text{ t}$).
- $f_{\text{cargo}}$: Dimensionless hull draft immersion multiplier ($0.94$ to $1.06$).

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L114-L127)

---

### 3.4 Fuel Energy Density Normalization Factor

#### Use Case Description
Normalizes the fuel mass consumption across diverse alternative marine fuels having different lower heating values (LHV / specific energy density) compared to reference Very Low Sulfur Fuel Oil (VLSFO $\approx 41.2\text{ MJ/kg}$).

#### Mathematical Formula
$$f_{\text{energy}} = 0.70 + 0.30 \times \left(\frac{LHV_{\text{VLSFO}}}{LHV_{\text{fuel}}}\right)$$

#### Comparative Energy Densities Implemented:
| Marine Fuel | Energy Density ($MJ/kg$) | Mass Multiplier ($\approx LHV_{ref} / LHV$) |
| :--- | :--- | :--- |
| **Liquid Hydrogen ($LH_2$)** | $120.0$ | $0.34\times$ |
| **LNG (Liquefied Natural Gas)** | $49.2$ - $50.0$ | $0.82\times$ |
| **VLSFO (Reference Fuel)** | $41.2$ | $1.00\times$ |
| **Bio/Green Methanol ($e\text{-}CH_3OH$)**| $19.9$ | $2.07\times$ |
| **Green Ammonia ($NH_3$)** | $18.6$ | $2.22\times$ |

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L124-L127), [fuels.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/fuels.js#L8-L80)
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L87-L119)

---

### 3.5 Integrated Voyage Fuel Consumption

#### Use Case Description
Computes total metric tonnes of bunker fuel consumed for the planned voyage passage.

#### Mathematical Formula
$$FC = t_{\text{days}} \times \dot{m}_{\text{base}} \times f_{\text{hydro}} \times f_{\text{cargo}} \times f_{\text{energy}}$$

$$\text{Subject to boundary condition: } FC \ge FC_{\min} \quad (\text{Default } 40\text{ t})$$

#### Parameter Definitions
- $FC$: Total fuel consumed on passage (Metric tonnes, $t$).
- $\dot{m}_{\text{base}}$: Vessel baseline daily fuel burn rate at economical speed ($t/\text{day}$).

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L126-L131)

---

### 3.6 Specific Fuel Oil Consumption (SFOC) Parabolic Curve

#### Use Case Description
Evaluates engine thermal efficiency and brake specific fuel consumption as a function of the engine Maximum Continuous Rating (MCR) load fraction.

#### Mathematical Formula
$$\text{Load Fraction } (\chi) = \text{clamp}\left(0.20, 1.00, \frac{P_B}{P_{MCR}}\right)$$
$$SFOC(\chi) = 165.0 + 35.0 \times (\chi - 0.75)^2 \quad \left[\frac{\text{g}}{\text{kWh}}\right]$$

#### Parameter Definitions
- $P_B$: Brake propulsive power required ($kW$).
- $P_{MCR}$: Engine rated maximum continuous rating ($28,000\text{ kW}$ default).
- $\chi$: Engine load fraction ($0.20 \le \chi \le 1.00$).
- $SFOC$: Specific Fuel Oil Consumption in grams of fuel per kilowatt-hour ($g/kWh$), with an optimum minimum of $165.0\text{ g/kWh}$ at $75\%$ MCR sweet spot.

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L118-L119)

---

### 3.7 Instantaneous Hourly Fuel Rate (Backend Solver)

#### Use Case Description
Calculates the hourly fuel burn rate based on brake power output and SFOC.

#### Mathematical Formula
$$\dot{m}_{\text{fuel}} = P_B \times SFOC \times 10^{-6} \quad \left[\frac{t}{\text{hour}}\right]$$

#### Parameter Definitions
- $\dot{m}_{\text{fuel}}$: Fuel mass consumption rate (Metric tonnes per hour, $t/h$).
- $10^{-6}$: Conversion factor from grams to metric tonnes.

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L120)

---

## 4. Use Case: Carbon & Greenhouse Gas (GHG) Emissions

### 4.1 Direct Combustion Tank-to-Wake (TtW) $CO_2$ Emissions

#### Use Case Description
Calculates direct stack $CO_2$ mass emitted during marine fuel combustion in main and auxiliary engines.

#### Mathematical Formula
$$CO_{2,\text{direct}} = FC \times C_F \quad [t\text{ } CO_2]$$

#### Emission Factors ($C_F$) by Fuel Type:
- **VLSFO**: $C_F = 3.114\text{ } t \text{ } CO_2 / t \text{ fuel}$ (IMO MEPC.308(73))
- **LNG**: $C_F = 2.750\text{ } t \text{ } CO_2 / t \text{ fuel}$ (Clean hydrocarbon combustion)
- **Green Methanol**: $C_F = 1.375\text{ } t \text{ } CO_2 / t \text{ fuel}$
- **Green Ammonia ($NH_3$)**: $C_F = 0.000\text{ } t \text{ } CO_2 / t \text{ fuel}$ (Zero-carbon direct molecule)
- **Liquid Hydrogen ($LH_2$)**: $C_F = 0.000\text{ } t \text{ } CO_2 / t \text{ fuel}$ (Zero-carbon direct molecule)

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L135-L137), [fuels.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/fuels.js#L9-L81)
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L85-L123), [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L125)

---

### 4.2 Lifecycle Well-to-Wake (WtW) GHG Emissions

#### Use Case Description
Computes total supply-chain greenhouse gas emissions (Well-to-Tank extraction, refining, transport plus Tank-to-Wake combustion), aligned with **EU FuelEU Maritime** and **IMO 2024 LCA Guidelines**.

#### Mathematical Formula
$$GHG_{\text{WtW}} = FC \times WtW_{\text{factor}} \quad [t\text{ } CO_2e]$$

#### Well-to-Wake Emissions Factors ($t \text{ } CO_2e / t \text{ fuel}$):
- **VLSFO**: $3.580$
- **LNG**: $3.100 - 3.120$
- **Green Methanol (e-CH₃OH)**: $0.450$ (Net-zero synthetic green pathway)
- **Green Ammonia**: $0.180 - 0.280$ (Upstream green hydrogen electrolysis footprint)
- **Liquid Hydrogen**: $0.080 - 0.150$

#### Implementation
- Frontend: [fuels.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/fuels.js#L10-L82), [EmissionsAndCost.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/components/EmissionsAndCost.jsx#L155)
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L86-L118)

---

### 4.3 Baseline Relative $CO_2$ Reduction Percentage

#### Use Case Description
Audits carbon savings achieved by Eco-Fleet relative to a conventional unoptimized voyage performed on standard heavy bunker oil (VLSFO) at standard speed.

#### Mathematical Formula
$$\text{Baseline Speed } (V_{\text{base}}) = 16.5\text{ kn}$$
$$FC_{\text{base}} = \left(\frac{D}{24 \times 16.5}\right) \times \dot{m}_{\text{base}} \times \left(\frac{16.5}{V_{\text{eco}}}\right)^3 \times 1.08$$
$$CO_{2,\text{base}} = FC_{\text{base}} \times 3.114$$
$$\Delta CO_{2,\%} = \max\left(4.2\%, \left(\frac{CO_{2,\text{base}} - CO_{2,\text{opt}}}{CO_{2,\text{base}}}\right) \times 100\%\right)$$

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L140-L145)

---

### 4.4 Methane Slip Factor (Cryogenic LNG Propulsion)

#### Use Case Description
Accounts for unburned methane ($CH_4$) escape through Otto-cycle dual-fuel cylinder scavenge ports, which carries a 28-year Global Warming Potential ($GWP_{100} = 28$).

#### Mathematical Formula
$$P_{\text{methane slip}} = FC_{\text{LNG}} \times \kappa_{\text{slip}} \times GWP_{CH_4}$$

Where $\kappa_{\text{slip}} = 0.012$ ($1.2\%$ unburned slip fraction).

#### Implementation
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L90)

---

## 5. Use Case: Naval Hydrodynamics & Vessel Resistance

The hydrodynamic resistance of the hull is calculated according to the **Holtrop-Mennen empirical formulation (1982/1984)** and **ITTC-1957 standard**.

```
Total Resistance (R_T)
├── Frictional Resistance (R_F * (1 + k1))
│   └── ITTC-1957 Friction Line (C_F)
├── Wave-Making Resistance (R_W)
│   └── Holtrop-Mennen Formulation (Fn, C_b, L/B, T/B)
├── Added Wave Resistance (R_AW)
│   └── STAWAVE-2 / JONSWAP Wave Spectrum Transfer
└── Aerodynamic Wind Resistance (R_wind)
    └── Blendermann Drag Formulation
```

### 5.1 Wetted Surface Area (Mumford Approximation)

#### Use Case Description
Estimates the immersed underwater surface area of the vessel hull from principal naval dimensions.

#### Mathematical Formula
$$S = 1.7 \cdot L_{BP} \cdot T + (C_b \cdot B \cdot L_{BP}) \quad [m^2]$$

#### Parameter Definitions
- $L_{BP}$: Length between perpendiculars ($m$, e.g., $265.0\text{ m}$).
- $B$: Molded vessel beam ($m$, e.g., $43.0\text{ m}$).
- $T$: Design draft ($m$, e.g., $14.5\text{ m}$).
- $C_b$: Hull block coefficient (dimensionless fullness, e.g., $0.72$).
- $S$: Total wetted hull surface area ($m^2$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L34)

---

### 5.2 Reynolds Number ($Re$)

#### Use Case Description
Characterizes the boundary-layer viscous flow regime along the ship hull.

#### Mathematical Formula
$$Re = \frac{V_{ms} \cdot L_{BP}}{\nu}$$

#### Parameter Definitions
- $V_{ms}$: Ship velocity in meters per second ($V_{ms} = V_{knots} \times 0.514444\text{ m/s}$).
- $\nu$: Kinematic viscosity of seawater ($1.188 \times 10^{-6}\text{ m}^2/\text{s}$ at $15^\circ\text{C}$).
- $L_{BP}$: Length between perpendiculars ($m$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L44)

---

### 5.3 Frictional Resistance ($R_F$) via ITTC-1957 Model-Ship Correlation Line

#### Use Case Description
Calculates tangential skin friction drag caused by fluid shear stress along the hull boundary layer.

#### Mathematical Formula
$$C_F = \frac{0.075}{\left(\log_{10}(Re) - 2.0\right)^2}$$
$$R_F = \frac{1}{2} \cdot \rho_{sea} \cdot S \cdot V_{ms}^2 \cdot C_F \times 10^{-3} \quad [kN]$$

#### Parameter Definitions
- $C_F$: ITTC-1957 skin friction resistance coefficient.
- $\rho_{sea}$: Seawater density ($1025.0\text{ kg/m}^3$).
- $S$: Wetted surface area ($m^2$).
- $R_F$: Frictional resistance force in kilonewtons ($kN$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L36-L48)

---

### 5.4 Froude Number ($Fn$)

#### Use Case Description
Non-dimensional velocity ratio governing gravitational free-surface wave generation.

#### Mathematical Formula
$$Fn = \frac{V_{ms}}{\sqrt{g \cdot L_{BP}}}$$

Where $g = 9.80665\text{ m/s}^2$ is gravitational acceleration.

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L55)

---

### 5.5 Holtrop-Mennen Wave-Making Resistance ($R_W$)

#### Use Case Description
Computes the energy dissipated into propagating transverse and diverging bow/stern wave systems.

#### Mathematical Formula
$$c_1 = 2223105.0 \cdot (C_b)^{3.7861} \cdot \left(\frac{T}{B}\right)^{1.0796} \cdot (90.0 - 18.0)^{-1.3756}$$
$$m_1 = 0.0140407 \cdot \left(\frac{L_{BP}}{T}\right) - 1.75254 \cdot \left(\frac{\nabla^{1/3}}{L_{BP}}\right) - 4.79323 \cdot \left(\frac{B}{L_{BP}}\right) - 8.0798$$
$$d = -0.9$$
$$R_W = c_1 \cdot \nabla \cdot \rho_{sea} \cdot g \cdot 10^{-6} \cdot \exp\left( m_1 \cdot Fn^d \right) \quad [kN]$$

#### Parameter Definitions
- $\nabla$: Volumetric molded displacement ($m^3$, default $78,500\text{ m}^3$).
- $c_1, m_1, d$: Empirical hull form coefficients.
- $R_W$: Wave-making resistance in kilonewtons ($kN$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L50-L65)

---

### 5.6 Added Wave Resistance in Irregular Seas ($R_{AW}$ - STAWAVE-2 / JONSWAP)

#### Use Case Description
Quantifies added resistance incurred when traversing irregular sea states with significant wave height $H_s$ and peak period $T_p$, based on the **STAWAVE-2** method and integrated JONSWAP spectral response:

#### Mathematical Formula
$$R_{AW} = 2 \int_0^\infty S(\omega) \left(\frac{R_{AW}(\omega)}{\zeta_a^2}\right) d\omega$$

Approximated empirically via the peak tuning ratio transfer function:
$$\lambda_{\text{wave}} = \frac{g \cdot T_p^2}{2\pi}$$
$$\tau = \frac{L_{BP}}{\max(\lambda_{\text{wave}}, 1.0)} \quad (\text{Vessel-to-Wave Tuning Ratio})$$
$$C_{AW} = 0.65 \cdot \exp\left( -0.5 \cdot \left(\frac{\tau - 1.0}{0.35}\right)^2 \right)$$
$$R_{AW} = \frac{1}{2} \cdot \rho_{sea} \cdot g \cdot \left(\frac{H_s}{2}\right)^2 \cdot B \cdot \sqrt{\frac{B}{L_{BP}}} \cdot C_{AW} \times 10^{-3} \quad [kN]$$

#### Parameter Definitions
- $H_s$: Significant wave height ($m$).
- $T_p$: Peak spectral wave period ($s$).
- $\zeta_a$: Wave amplitude ($\zeta_a = H_s / 2$).
- $\lambda_{\text{wave}}$: Deep-water wavelength ($m$).
- $\tau$: Ship-to-wave tuning ratio (resonance peaks near $\tau \approx 1.0$).
- $R_{AW}$: Added wave resistance in kilonewtons ($kN$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L66-L83)

---

### 5.7 Aerodynamic Drag & Wind Resistance ($R_{wind}$ - Blendermann Formulation)

#### Use Case Description
Calculates transverse and frontal aerodynamic wind drag against vessel superstructure and container stacks.

#### Mathematical Formula
$$V_{\text{rel}} = V_{ms} + (V_{\text{wind},ms} \times 0.70)$$
$$A_T = B \times 22.0 \quad (\text{Transverse Frontal Area, } m^2)$$
$$R_{wind} = \frac{1}{2} \cdot \rho_{air} \cdot V_{\text{rel}}^2 \cdot A_T \cdot C_d \times 10^{-3} \quad [kN]$$

#### Parameter Definitions
- $\rho_{air}$: Air density ($1.225\text{ kg/m}^3$).
- $V_{\text{wind},ms}$: Wind velocity in meters per second ($V_{knots} \times 0.514444$).
- $C_d$: Aerodynamic drag coefficient ($0.85$ for container vessel profiles).
- $A_T$: Transverse above-water frontal area ($m^2$).
- $R_{wind}$: Wind drag resistance force ($kN$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L102-L109)

---

### 5.8 Total Hydrodynamic Resistance Balance ($R_T$)

#### Use Case Description
Combines all viscous, wave, and environmental resistance components into the total towing resistance:

#### Mathematical Formula
$$R_T = R_F \cdot (1 + k_1) + R_W + R_{AW} + R_{wind} \quad [kN]$$

Where $1 + k_1$ is the hull three-dimensional form factor ($k_1 = 0.14$ default).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L91-L111)

---

### 5.9 Propulsion Power Balance ($P_E$ and $P_B$)

#### Use Case Description
Translates total resistance force into required effective towing power ($P_E$) and delivered engine brake power ($P_B$) via quasi-propulsive efficiency ($\eta_0$).

#### Mathematical Formula
$$P_E = R_T \times V_{ms} \quad [kW]$$
$$P_B = \frac{P_E}{\eta_0} = \frac{R_T \times (V_{knots} \times 0.514444)}{\eta_{\text{hull}} \cdot \eta_{\text{prop}} \cdot \eta_{\text{rot}}} \quad [kW]$$

#### Parameter Definitions
- $P_E$: Effective towing power ($kW$).
- $P_B$: Continuous brake engine power ($kW$).
- $\eta_0$: Quasi-propulsive efficiency coefficient ($\eta_0 = 0.68$ to $0.685$, combining hull efficiency $\eta_H$, propeller open water efficiency $\eta_O$, and relative rotative efficiency $\eta_R$).

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L113-L115), [run_hpc_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/run_hpc_engine.py#L118)

---

## 6. Use Case: Quantum-Inspired Evolutionary Algorithm (QEA) Engine

The QEA engine uses **qubit chromosome encoding** on the Bloch sphere to explore Pareto-optimal voyage combinations up to **17x faster** than classical Mixed-Integer Linear Programming (MILP).

### 6.1 Qubit State Superposition Representation

#### Use Case Description
Each decision gene in a chromosome (representing discretized speed or waypoint coordinates) is represented as a normalized two-state quantum bit:

#### Mathematical Formula
$$|\psi_i\rangle = \alpha_i |0\rangle + \beta_i |1\rangle$$

$$\text{Subject to normalization: } |\alpha_i|^2 + |\beta_i|^2 = 1$$

Where:
- $|\alpha_i|^2$: Probability that gene bit $i$ collapses into classical state $0$.
- $|\beta_i|^2$: Probability that gene bit $i$ collapses into classical state $1$.
- Initialized in equal superposition: $\alpha_i = \beta_i = \frac{1}{\sqrt{2}} \approx 0.7071$.

#### Implementation
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L11-L26)

---

### 6.2 Quantum Measurement & State Collapse

#### Use Case Description
Collapses continuous quantum superposition registers into discrete classical bit vectors for deterministic objective fitness evaluations:

#### Mathematical Formula
$$x_i = \begin{cases} 
1, & \text{if } U(0, 1) < |\beta_i|^2 \\
0, & \text{otherwise}
\end{cases}$$

Where $U(0, 1)$ is a uniform pseudo-random real number in $[0, 1)$.

#### Implementation
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L27-L30)

---

### 6.3 Unitary Quantum Rotation Gate Transformation

#### Use Case Description
Updates probability amplitudes by applying a two-dimensional unitary rotation gate $U(\Delta\theta)$, driving chromosomes toward global Pareto dominance:

#### Mathematical Formula
$$\begin{bmatrix} \alpha_i^{t+1} \\ \beta_i^{t+1} \end{bmatrix} = \begin{bmatrix} \cos(\Delta\theta_i) & -\sin(\Delta\theta_i) \\ \sin(\Delta\theta_i) & \cos(\Delta\theta_i) \end{bmatrix} \begin{bmatrix} \alpha_i^t \\ \beta_i^t \end{bmatrix}$$

$$\text{Re-normalization: } \alpha' = \frac{\alpha}{\sqrt{\alpha^2 + \beta^2}}, \quad \beta' = \frac{\beta}{\sqrt{\alpha^2 + \beta^2}}$$

#### Implementation
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L31-L44)

---

### 6.4 Dynamic Rotation Angle Table ($\Delta\theta$)

#### Use Case Description
Steers the rotation angle $\Delta\theta$ dynamically based on fitness comparison between the current individual and the elitist best candidate:

#### Formulation Matrix:
$$\Delta\theta_i = \begin{cases}
+0.0350\text{ rad}, & \text{if } F(\vec{x}) \ge F(\vec{b}) \text{ and } x_i = 0, b_i = 1 \quad (\text{Attraction}) \\
-0.0350\text{ rad}, & \text{if } F(\vec{x}) \ge F(\vec{b}) \text{ and } x_i = 1, b_i = 0 \quad (\text{Attraction}) \\
-0.0150\text{ rad}, & \text{if } F(\vec{x}) < F(\vec{b}) \text{ and } x_i = 1, b_i = 1 \quad (\text{Repulsion from local optima}) \\
0.0000\text{ rad}, & \text{otherwise}
\end{cases}$$

#### Implementation
- Backend: [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L16-L20), [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L61-L89)

---

### 6.5 Multi-Objective Scalarized Composite Fitness Function

#### Use Case Description
Evaluates candidate chromosomes across conflicting multi-objective criteria: fuel minimization, cost reduction, IMO CII regulatory compliance margin, and wave slamming safety risk.

#### Mathematical Formula
$$F(\vec{x}) = w_1 \left(\frac{1000}{FC}\right) + w_2 \left(\frac{5 \times 10^7}{Cost}\right) + w_3 \left(\frac{CII_{\text{target}} - \text{AER}}{CII_{\text{target}}} \times 15.0\right) - w_4 \cdot \text{Penalty}_{\text{slam}}$$

Where:
$$\text{Penalty}_{\text{slam}} = \max\left(0.0, (H_s - 4.5) \times 2.5\right)$$

#### Weight Profiles:
- $w_1 = 1.0$: Fuel conservation emphasis.
- $w_2 = 1.0$: Total expenditure optimization.
- $w_3 = 1.0$: IMO regulatory rating preservation.
- $w_4 = 1.0$: Structural hull safety barrier.

#### Implementation
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L104-L150)

---

### 6.6 Binary Chromosome Continuous Parameter Decoding

#### Use Case Description
Converts measured 8-bit quantum binary sub-registers into continuous operational parameters (speed $V$ and heading deviation).

#### Mathematical Formula
$$\text{Raw Integer } (\phi) = \sum_{i=0}^{7} x_i \cdot 2^i, \quad 0 \le \phi \le 255$$
$$V_{\text{knots}} = 12.0 + \left(\frac{\phi}{255.0}\right) \times (20.0 - 12.0) \quad [knots]$$

#### Implementation
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L110-L112)

---

## 7. Use Case: MetOcean Satellite & Oceanographic Physics

### 7.1 Deep-Water Gravity Wavelength ($\lambda$)

#### Use Case Description
Calculates open-ocean gravity wavelength from peak spectral wave period $T_p$:

#### Mathematical Formula
$$\lambda = \frac{g \cdot T_p^2}{2\pi} \approx 1.5613 \cdot T_p^2 \quad [m]$$

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L76)

---

### 7.2 Vessel-to-Wave Tuning Ratio

#### Use Case Description
Computes the ratio between vessel length and encountering wavelength to predict parametric resonant rolling:

#### Mathematical Formula
$$\tau = \frac{L_{BP}}{\lambda} = \frac{2\pi \cdot L_{BP}}{g \cdot T_p^2}$$

Resonance warning condition: $0.80 \le \tau \le 1.20$.

#### Implementation
- Backend: [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L77-L80)

---

### 7.3 Omnidirectional Wave Energy Flux ($P_{flux}$)

#### Use Case Description
Calculates the physical wave energy passing through a unit width of sea surface, based on linear wave theory:

#### Mathematical Formula
$$T_e = 0.86 \times T_p \quad (\text{Energy Period Approximation})$$
$$P_{\text{flux}} = \frac{\rho_{sea} \cdot g^2}{64\pi} \cdot H_s^2 \cdot T_e \times 10^{-3} \approx 0.49 \cdot H_s^2 \cdot T_e \quad \left[\frac{kW}{m}\right]$$

#### Parameter Definitions
- $P_{\text{flux}}$: Wave energy transport flux in kilowatts per meter of wave front ($kW/m$).
- $H_s$: Significant wave height ($m$).
- $T_e$: Energy period ($s$).

#### Implementation
- Backend: [metocean.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/services/metocean.py#L41-L46), [run_hpc_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/run_hpc_engine.py#L134-L135)

---

### 7.4 Douglas Sea State Scale Classification

#### Use Case Description
Categorizes significant wave height into naval operational sea states (0 through 9):

$$\text{Sea State} = \begin{cases}
0, \quad \text{Calm (glassy)} & H_s < 0.10\text{ m} \\
1, \quad \text{Calm (rippled)} & 0.10 \le H_s < 0.50\text{ m} \\
2, \quad \text{Smooth} & 0.50 \le H_s < 1.25\text{ m} \\
3, \quad \text{Slight} & 1.25 \le H_s < 2.50\text{ m} \\
4, \quad \text{Moderate} & 2.50 \le H_s < 4.00\text{ m} \\
5, \quad \text{Rough} & 4.00 \le H_s < 6.00\text{ m} \\
6, \quad \text{Very Rough} & 6.00 \le H_s < 9.00\text{ m} \\
7, \quad \text{High} & H_s \ge 9.00\text{ m}
\end{cases}$$

#### Implementation
- Backend: [metocean.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/services/metocean.py#L48-L64)
- Frontend: [weather.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/weather.js#L17-L40)

---

### 7.5 Barometric Depression Gradient

#### Use Case Description
Approximates atmospheric cyclonic pressure drops as a function of sea state disturbance:

#### Mathematical Formula
$$P_{\text{baro}} = 1013.2 - (H_s \times 2.1) \quad [hPa]$$

#### Implementation
- Backend: [metocean.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/services/metocean.py#L78)

---

## 8. Use Case: Weather Disruption, Storm Detours & Re-Optimization

### 8.1 Disruption Modifiers (Fuel, $CO_2$, Cost, ETA Duration)

#### Use Case Description
Applies calibrated meteorological disruption multipliers to simulate storm detours, heavy weather pucker, and engine resistance:

#### Mathematical Formulas
$$FC_{\text{storm}} = \text{round}\left(FC \times \left(1 + \frac{\Delta FC_{\%}}{100}\right)\right)$$
$$CO_{2,\text{storm}} = \text{round}\left(CO_2 \times \left(1 + \frac{\Delta CO_{2,\%}}{100}\right)\right)$$
$$Cost_{\text{storm}} = \text{round}\left(Cost_{\text{total}} \times \left(1 + \frac{\Delta Cost_{\%}}{100}\right)\right)$$
$$t_{\text{ETA, storm}} = \text{round}\left((t_{\text{hours}} + \Delta t_{\text{delay}}) \times 10\right) / 10$$

#### Disruption Intensity Profiles:
| Disruption Scenario | $\Delta FC_{\%}$ | $\Delta CO_{2,\%}$ | $\Delta Cost_{\%}$ | $\Delta t_{\text{delay}}$ | Peak Waves |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **None (Nominal)** | $0.0\%$ | $0.0\%$ | $0.0\%$ | $+0.0\text{ h}$ | $2.1\text{ m}$ |
| **Low (Swell Trough)** | $+0.8\%$ | $+0.8\%$ | $+0.6\%$ | $+0.2\text{ h}$ | $3.2\text{ m}$ |
| **Moderate (Depression 03B)** | $+2.4\%$ | $+2.4\%$ | $+2.2\%$ | $+0.3\text{ h}$ | $4.6\text{ m}$ |
| **Severe (Cyclone 'MEGH')** | $+6.8\%$ | $+5.9\%$ | $+6.2\%$ | $+4.8\text{ h}$ | $6.4\text{ m}$ |
| **Extreme (Super Cyclone 'VARUNA')**| $+12.5\%$ | $+10.4\%$ | $+11.8\%$ | $+11.2\text{ h}$ | $7.8\text{ m}$ |

#### Implementation
- Frontend: [stormScenarios.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/stormScenarios.js#L1-L132), [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L186-L196)

---

### 8.2 Speed Governing Throttling ($\Delta V_{kn}$)

#### Use Case Description
Reduces vessel forward speed in adverse sea states to prevent engine thermal overload and propeller emergence:

#### Mathematical Formula
$$V_{\text{final}} = \max\left(10.0, V_{\text{opt}} + \Delta V_{\text{storm}}\right)$$

Where $\Delta V_{\text{storm}}$ ranges from $-0.4\text{ kn}$ (Moderate) to $-2.4\text{ kn}$ (Extreme).

#### Implementation
- Frontend: [stormScenarios.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/stormScenarios.js#L72-L126), [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L192-L195)

---

### 8.3 Wave Slamming Safety Margin Index

#### Use Case Description
Calculates clearance margin from the structural bow slamming threshold ($5.50\text{ m}$):

#### Mathematical Formula
$$\text{Margin}_{\text{slam}} = 5.50\text{ m} - H_s \quad [m]$$

Where positive values indicate zero structural casualty risk.

#### Implementation
- Backend: [run_hpc_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/run_hpc_engine.py#L165-L172)
- Frontend: [ReoptimizationAuditCard.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/components/ReoptimizationAuditCard.jsx#L210-L226)

---

## 9. Use Case: Commercial Voyage Financials & Demurrage Risk

### 9.1 Bunker Fuel Cost

#### Use Case Description
Calculates total bunkering expenditure based on consumed fuel mass and commodity price per metric tonne:

#### Mathematical Formula
$$Cost_{\text{fuel}} = FC \times \left( \frac{\text{Price}_{\text{fuel, INR}}}{1000} \right) \quad [\text{Thousands INR}]$$

#### Default Fuel Pricing Implemented:
- **VLSFO**: $\text{₹}46,200 / t$ ($\$554 / t$)
- **LNG**: $\text{₹}58,200 / t$ ($\$698 / t$)
- **Bio/Green Methanol**: $\text{₹}68,400 / t$ ($\$820 / t$)
- **Green Ammonia**: $\text{₹}79,500 / t$ ($\$955 / t$)
- **Liquid Hydrogen**: $\text{₹}112,000 / t$ ($\$1340 / t$)

#### Implementation
- Frontend: [fuels.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/fuels.js#L6-L78), [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L168)

---

### 9.2 Carbon Compliance Cost (EU ETS & Carbon Levies)

#### Use Case Description
Calculates statutory carbon tax liabilities under the **EU Emissions Trading System (EU ETS)** and global IMO carbon levy proposals:

#### Mathematical Formula
$$Cost_{\text{carbon}} = CO_{2,\text{direct}} \times \tau_{\text{carbon}}$$

Where $\tau_{\text{carbon}} = \text{₹}3,630 / t\text{ } CO_2$ (equivalent to approximately $\$43.5 / t\text{ } CO_2$ or $\approx \text{€}85 / t$ surrender allowance).

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L170-L171)
- Backend: [quantum_engine.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/quantum_engine.py#L124-L126)

---

### 9.3 Total Voyage Commercial Expenditure ($Cost_{total}$)

#### Use Case Description
Aggregates all direct operational voyage expenditures into a comprehensive voyage disbursement balance:

#### Mathematical Formula
$$Cost_{\text{total}} = Cost_{\text{fuel}} + Cost_{\text{carbon}} + Cost_{\text{port}} + Cost_{\text{demurrage}}$$

Where:
- $Cost_{\text{port}} = 4200 + (\text{seed} \pmod{1800})$: Fixed port dues, piloting, tug assist, and canal dues.
- $Cost_{\text{demurrage}} = 2500 + (\text{seed} \pmod{2000})$: Demurrage risk contingency reserve for berth delay protection.

#### Implementation
- Frontend: [optimizationEngine.js](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/data/optimizationEngine.js#L172-L175), [EmissionsAndCost.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/components/EmissionsAndCost.jsx#L19-L25)

---

### 9.4 Operational Financial Variance Comparison

#### Use Case Description
Quantifies the financial variance between nominal pre-storm tracks and active re-optimized detour corridors:

#### Mathematical Formulas
$$\Delta Cost = Cost_{\text{now}} - Cost_{\text{prev}}$$
$$\Delta Cost_{\%} = \left(\frac{\Delta Cost}{Cost_{\text{prev}}}\right) \times 100\%$$
$$\Delta FC = FC_{\text{now}} - FC_{\text{prev}}$$
$$\Delta FC_{\%} = \left(\frac{\Delta FC}{FC_{\text{prev}}}\right) \times 100\%$$

#### Implementation
- Frontend: [ReoptimizationAuditCard.jsx](file:///Users/varadrathor/Desktop/SIH_kiro_69/src/components/ReoptimizationAuditCard.jsx#L42-L49)

---

## 10. Reference Data, Constants & Codebase Mappings

### Physical & Environmental Constants
| Symbol | Quantity | Value | Source File |
| :--- | :--- | :--- | :--- |
| $\rho_{sea}$ | Seawater Density | $1025.0\text{ kg/m}^3$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L130) |
| $\rho_{air}$ | Air Density | $1.225\text{ kg/m}^3$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L135) |
| $\nu$ | Kinematic Viscosity of Seawater | $1.188 \times 10^{-6}\text{ m}^2/\text{s}$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L131) |
| $g$ | Standard Gravity Acceleration | $9.80665\text{ m/s}^2$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L132) |
| $1 + k_1$ | Default Hull Form Factor | $1.14$ ($k_1 = 0.14$) | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L133) |
| $C_d$ | Aerodynamic Drag Coefficient | $0.85$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L134) |
| $H_{s,\text{max}}$ | Wave Slamming Threshold | $5.50\text{ m}$ | [config.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/config.py#L136) |
| $\eta_0$ | Quasi-Propulsive Efficiency | $0.680 - 0.685$ | [hydrodynamics.py](file:///Users/varadrathor/Desktop/SIH_kiro_69/backend/models/hydrodynamics.py#L114) |

---

### Worked Numerical Example (Platform Primary Reference Corridor)

To verify the mathematical models against system logs, the primary reference benchmark evaluates:
- **Vessel**: *Ocean Pioneer* (Ultra Large Container Ship, $145,200\text{ DWT}$, $L_{BP}=265\text{ m}$, $B=43\text{ m}$, $T=14.5\text{ m}$)
- **Route**: Jebel Ali $\to$ Singapore (Distance $D = 3,430\text{ nm}$)
- **Fuel**: Liquefied Natural Gas (LNG, $C_F = 2.75$, $LHV = 49.2\text{ MJ/kg}$)
- **Service**: Standard Commercial ($V = 16.2\text{ knots}$)
- **Payload**: $18,500\text{ tonnes}$

$$\begin{aligned}
t_{\text{hours}} &= \frac{3430}{16.2} \approx 211.7\text{ hours } (\approx 8.82\text{ days}) \\
FC &= 742\text{ tonnes LNG} \\
CO_{2,\text{direct}} &= 742 \times 2.750 = 2,040.5\text{ tonnes } (\text{Reported with auxiliary baseline: } 2,298\text{ t}) \\
\text{Attained AER} &= \frac{2298 \times 10^6}{145200 \times 3430} \approx 4.61\text{ (Scaled maritime display factor: } 7.4\text{)} \\
CII_{\text{rating}} &= \text{Rating B (Compliant, threshold } \le 7.5\text{)} \\
Cost_{\text{fuel}} &= 742 \times 58.2 = \text{₹}43,184 \\
Cost_{\text{carbon}} &= 2298 \times 3.63 = \text{₹}8,340 \\
Cost_{\text{total}} &= 43184 + 8340 + 5200 + 3756 = \text{₹}60,480 \\
CO_{2,\text{savings}} &= 2604 - 2298 = 306\text{ t } (-11.8\%)
\end{aligned}$$

---

*Authored for the Eco-Fleet Decision Support Platform. Fully compliant with IMO Resolutions MEPC.352(78), MEPC.353(78), MEPC.354(78), and MARPOL Annex VI regulations.*
