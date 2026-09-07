import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { calculateVoyagePlan } from '../data/optimizationEngine';
import { WEATHER_SNAPSHOTS } from '../data/weather';
import { STORM_SCENARIOS, getStormScenario } from '../data/stormScenarios';
import { PORTS } from '../data/ports';
import { VESSELS } from '../data/vessels';
import { FUELS } from '../data/fuels';
import { SERVICE_PROFILES } from '../data/services';

const FleetContext = createContext(null);

export const FleetProvider = ({ children }) => {
  // 1. Voyage Configuration State
  const [config, setConfig] = useState({
    vesselId: "ocean-pioneer",
    sourceId: "jebel-ali",
    destId: "singapore",
    fuelId: "LNG",
    serviceId: "Standard",
    cargoTonnes: 18500,
    departureDate: "2026-09-10T06:00"
  });

  // 2. Active Storm State
  const [stormState, setStormState] = useState({
    intensity: "none",
    radius: 95,
    direction: "NW",
    speed: 18,
    activeScenario: STORM_SCENARIOS.none
  });

  // 3. Computed Plan State
  const [plan, setPlan] = useState(() => calculateVoyagePlan({
    vesselId: "ocean-pioneer",
    sourceId: "jebel-ali",
    destId: "singapore",
    fuelId: "LNG",
    serviceId: "Standard",
    cargoTonnes: 18500,
    stormIntensity: "none"
  }));

  // Disruption comparison state (for before/after audit)
  const [comparison, setComparison] = useState({
    original: null,
    disrupted: null,
    reoptimized: null
  });

  // 4. Optimization Modal / Animation State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStage, setOptStage] = useState(0);

  // 5. Re-optimization Modal / Animation State
  const [isReoptimizing, setIsReoptimizing] = useState(false);
  const [reoptStage, setReoptStage] = useState(0);
  const [isReoptModalOpen, setIsReoptModalOpen] = useState(false);

  // 6. Storm Simulator Modal
  const [isStormModalOpen, setIsStormModalOpen] = useState(false);

  // 7. Navigation State
  const [activePage, setActivePage] = useState("command-center");

  // 8. 30-Second Weather Feed State
  const [snapshotIndex, setSnapshotIndex] = useState(0); // 0..9 (Snapshot 01 to 10)
  const [weatherCountdown, setWeatherCountdown] = useState(30);

  // 9. Moving Ship Animation along route (0 to 1) & Direction ('forward' | 'reverse')
  const [shipProgress, setShipProgress] = useState(0.28); // initially positioned in open sea
  const [shipDirection, setShipDirection] = useState('forward'); // 'forward' (origin -> dest) | 'reverse' (dest -> origin)

  // 10. Live Event Feed
  const [events, setEvents] = useState([
    { id: 1, time: "00:00:12", label: "Voyage optimization completed", type: "success" },
    { id: 2, time: "00:00:24", label: "Weather conditions updated from satellite feed", type: "info" },
    { id: 3, time: "00:00:30", label: "Monitoring active shipping corridor", type: "info" }
  ]);

  // 11. Executive Walkthrough Mode State
  const [demoMode, setDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);

  // 12. Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const addEvent = useCallback((label, type = "info") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setEvents(prev => [
      { id: Date.now() + Math.random(), time: timeStr, label, type },
      ...prev.slice(0, 40)
    ]);
  }, []);

  // 30-Second Weather Snapshot Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setWeatherCountdown(prev => {
        if (prev <= 1) {
          setSnapshotIndex(sIdx => {
            const nextIdx = (sIdx + 1) % WEATHER_SNAPSHOTS.length;
            const snap = WEATHER_SNAPSHOTS[nextIdx];
            addEvent(`Weather update: ${snap.label} • Wind ${snap.windSpeedKn} kn ${snap.windDirection}, Waves ${snap.waveHeightM}m`, "info");
            return nextIdx;
          });
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [addEvent]);

  // Slow ship motion along route (supporting both forward and reverse from destination)
  useEffect(() => {
    const shipInterval = setInterval(() => {
      setShipProgress(prev => {
        if (shipDirection === 'reverse') {
          // Sailing from destination back towards departure
          const next = prev - 0.0016;
          return next < 0.04 ? 0.96 : next;
        } else {
          // Sailing from departure towards destination
          const next = prev + 0.0016;
          return next > 0.96 ? 0.04 : next;
        }
      });
    }, 150);
    return () => clearInterval(shipInterval);
  }, [shipDirection]);

  // Re-run plan calculation when configuration changes
  const updateConfig = useCallback((patch) => {
    setConfig(prev => {
      const next = { ...prev, ...patch };
      // Prevent source = destination
      if (patch.sourceId && patch.sourceId === next.destId) {
        const alt = PORTS.find(p => p.id !== patch.sourceId);
        next.destId = alt ? alt.id : "singapore";
      } else if (patch.destId && patch.destId === next.sourceId) {
        const alt = PORTS.find(p => p.id !== patch.destId);
        next.sourceId = alt ? alt.id : "jebel-ali";
      }

      // Re-evaluate deterministic plan
      const newPlan = calculateVoyagePlan({
        vesselId: next.vesselId,
        sourceId: next.sourceId,
        destId: next.destId,
        fuelId: next.fuelId,
        serviceId: next.serviceId,
        cargoTonnes: next.cargoTonnes,
        stormIntensity: stormState.intensity
      });
      setPlan(newPlan);
      return next;
    });
  }, [stormState.intensity]);

  // Run Optimization Animation & Calculation
  const runOptimization = useCallback(() => {
    setIsOptimizing(true);
    setOptStage(0);
    addEvent("QEA optimization solver initialized", "accent");

    const stages = [
      "Weather constraints verified",
      "Hydrodynamic vessel envelope verified",
      "Alternative fuel thermodynamics checked",
      "Navigational route candidates generated",
      "IMO CII rating boundary constraints verified",
      "Quantum-Inspired Evolutionary Algorithm converged"
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setOptStage(current);
      if (current < stages.length) {
        addEvent(stages[current - 1], "info");
      }
      if (current >= stages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsOptimizing(false);
          const computed = calculateVoyagePlan({
            vesselId: config.vesselId,
            sourceId: config.sourceId,
            destId: config.destId,
            fuelId: config.fuelId,
            serviceId: config.serviceId,
            cargoTonnes: config.cargoTonnes,
            stormIntensity: stormState.intensity
          });
          setPlan(computed);
          addEvent(`Optimal Voyage Plan found: ETA ${computed.etaDate} • Fuel ${computed.fuelConsumption}t • CII ${computed.cii}`, "success");
          showToast("Voyage Optimization Complete • Optimal Plan Applied", "success");
        }, 400);
      }
    }, 380);
  }, [config, stormState.intensity, addEvent, showToast]);

  // Simulate Weather Disruption (Storm)
  const simulateStorm = useCallback((intensity, options = {}) => {
    const scenario = getStormScenario(intensity);
    setStormState(prev => ({
      ...prev,
      intensity,
      radius: options.radius || scenario.radius || 95,
      direction: options.direction || "NW",
      speed: options.speed || scenario.movementSpeedKn || 18,
      activeScenario: scenario
    }));

    setIsStormModalOpen(false);

    if (intensity === "none") {
      addEvent("Storm system dissipated. Normal metocean conditions restored.", "info");
      showToast("Weather Disruption Cleared • Normal Track Resumed", "info");
      setShipDirection('forward');
      setShipProgress(0.15);
      const basePlan = calculateVoyagePlan({ ...config, stormIntensity: "none" });
      setPlan(basePlan);
      setComparison({ original: null, disrupted: null, reoptimized: null });
      return;
    }

    // Capture baseline before disruption
    const originalPlan = calculateVoyagePlan({ ...config, stormIntensity: "none" });
    const disruptedPlan = calculateVoyagePlan({ ...config, stormIntensity: intensity });

    setComparison(prev => ({
      original: originalPlan,
      disrupted: disruptedPlan,
      reoptimized: null
    }));

    setPlan(disruptedPlan);

    // USER REQUIREMENT: Once storm is simulated, make ship come from destination again!
    setShipDirection('reverse');
    setShipProgress(0.96); // Position at destination port to come from destination

    if (intensity === "low") {
      addEvent(`Advisory: ${scenario.name} detected. Weather within operational limits. Vessel inbound from ${disruptedPlan.destPort.name}.`, "warning");
      showToast(`Advisory: Weather Within Limits • Ship Inbound from ${disruptedPlan.destPort.name}`, "info");
    } else if (intensity === "moderate") {
      addEvent(`⚠ ${scenario.name} detected near route. Minor adjustment (+2.4% fuel). Vessel coming from ${disruptedPlan.destPort.name}.`, "warning");
      showToast(`Disruption: Minor Adjustment • Vessel Inbound from ${disruptedPlan.destPort.name}`, "warning");
    } else if (intensity === "severe") {
      addEvent(`🚨 CRITICAL: ${scenario.name} directly on route! Waves ${scenario.waveHeightM}m. Vessel coming from ${disruptedPlan.destPort.name}. RE-OPTIMIZATION REQUIRED.`, "danger");
      showToast(`🚨 Critical Storm: Re-Optimization Required! Ship Inbound from ${disruptedPlan.destPort.name}`, "danger");
    } else if (intensity === "extreme") {
      addEvent(`⛔ EMERGENCY: ${scenario.name} (7.8m waves). Alternate track mandatory. Vessel coming from ${disruptedPlan.destPort.name}.`, "danger");
      showToast(`⛔ Emergency Cyclone! Ship Inbound from ${disruptedPlan.destPort.name}`, "danger");
    }
  }, [config, addEvent, showToast]);

  // Dynamic Re-Optimization Procedure
  const runReoptimization = useCallback(() => {
    setIsReoptimizing(true);
    setReoptStage(0);
    setIsReoptModalOpen(true);
    addEvent("Dynamic Re-Optimization triggered in response to meteorological disruption", "accent");

    const stages = [
      "Weather change detected & storm boundary mapped",
      "Dynamic hydrodynamic fuel prediction updated",
      "Wave slamming & hull stress risk evaluated",
      "Southern detour candidate paths generated",
      "IMO CII rating operating threshold checked",
      "New optimal storm-avoidance route selected"
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setReoptStage(current);
      if (current < stages.length) {
        addEvent(stages[current - 1], "info");
      }
      if (current >= stages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsReoptimizing(false);
          const reoptPlan = calculateVoyagePlan({
            ...config,
            stormIntensity: stormState.intensity
          });
          
          setComparison(prev => ({
            original: prev.original || calculateVoyagePlan({ ...config, stormIntensity: "none" }),
            disrupted: prev.disrupted || reoptPlan,
            reoptimized: reoptPlan
          }));

          setPlan(reoptPlan);
          addEvent(`Dynamic Re-Optimization converged: Safe deep-water corridor selected (CII: ${reoptPlan.ciiRating})`, "success");
          showToast("Dynamic Re-Optimization Applied • New Optimal Route Active", "success");
        }, 500);
      }
    }, 420);
  }, [config, stormState.intensity, addEvent, showToast]);

  // Reset Simulation to default state
  const resetSimulation = useCallback(() => {
    const defaultConfig = {
      vesselId: "ocean-pioneer",
      sourceId: "jebel-ali",
      destId: "singapore",
      fuelId: "LNG",
      serviceId: "Standard",
      cargoTonnes: 18500,
      departureDate: "2026-09-10T06:00"
    };
    setConfig(defaultConfig);
    setStormState({
      intensity: "none",
      radius: 95,
      direction: "NW",
      speed: 18,
      activeScenario: STORM_SCENARIOS.none
    });
    setSnapshotIndex(0);
    setWeatherCountdown(30);
    setShipProgress(0.28);
    setShipDirection('forward');
    setIsStormModalOpen(false);
    setIsReoptModalOpen(false);
    setIsOptimizing(false);
    setIsReoptimizing(false);
    setComparison({ original: null, disrupted: null, reoptimized: null });
    
    const freshPlan = calculateVoyagePlan({
      ...defaultConfig,
      stormIntensity: "none"
    });
    setPlan(freshPlan);
    addEvent("Simulation reset to nominal baseline state", "info");
    showToast("Simulation Reset to Initial Baseline", "info");
  }, [addEvent, showToast]);

  // Restart vessel journey from destination (inbound)
  const restartShipFromDestination = useCallback(() => {
    setShipDirection('reverse');
    setShipProgress(0.96);
    addEvent(`Vessel repositioned to destination port (${plan.destPort?.name || 'Destination'}), sailing inbound`, "info");
    showToast(`Vessel Inbound • Sailing from ${plan.destPort?.name || 'Destination'}`, "info");
  }, [plan.destPort?.name, addEvent, showToast]);

  // Restart vessel journey from departure origin (outbound)
  const restartShipFromOrigin = useCallback(() => {
    setShipDirection('forward');
    setShipProgress(0.04);
    addEvent(`Vessel repositioned to departure port (${plan.sourcePort?.name || 'Departure'}), sailing outbound`, "info");
    showToast(`Vessel Outbound • Sailing from ${plan.sourcePort?.name || 'Departure'}`, "info");
  }, [plan.sourcePort?.name, addEvent, showToast]);

  // Toggle vessel direction anytime
  const toggleShipDirection = useCallback(() => {
    setShipDirection(prev => {
      const next = prev === 'forward' ? 'reverse' : 'forward';
      const label = next === 'reverse' ? `Inbound (from ${plan.destPort?.name || 'Destination'})` : `Outbound (from ${plan.sourcePort?.name || 'Departure'})`;
      addEvent(`Vessel heading track changed: ${label}`, "info");
      showToast(`Track Changed: ${label}`, "info");
      return next;
    });
  }, [plan.destPort?.name, plan.sourcePort?.name, addEvent, showToast]);

  // Presentation Demo Steps Tour
  const nextDemoStep = useCallback(() => {
    setDemoStep(step => {
      const next = step + 1;
      if (next === 1) {
        // Step 1: Default configuration
        setActivePage("command-center");
        addEvent("Walkthrough Step 1: Nominal Voyage Configuration loaded", "info");
        showToast("Step 1: Voyage parameters loaded (Ocean Pioneer, Jebel Ali -> Singapore)", "info");
      } else if (next === 2) {
        // Step 2: Run optimization
        runOptimization();
      } else if (next === 3) {
        // Step 3: Inspect MetOcean
        setActivePage("weather");
        addEvent("Walkthrough Step 3: MetOcean satellite telemetry analyzed", "info");
        showToast("Step 3: Live MetOcean satellite observation array active", "info");
      } else if (next === 4) {
        // Step 4: Simulate severe storm
        setActivePage("command-center");
        simulateStorm("severe");
      } else if (next === 5) {
        // Step 5: Dynamic Re-optimize
        runReoptimization();
      } else if (next === 6) {
        // Step 6: Before vs After audit
        setActivePage("reoptimization");
        addEvent("Walkthrough Step 6: Before vs Disrupted vs After comparison verified", "info");
        showToast("Step 6: Verified fuel, cost, CO₂, and CII impact", "info");
      } else if (next === 7) {
        // Step 7: Classical vs Quantum Benchmark
        setActivePage("benchmark");
        addEvent("Walkthrough Step 7: Algorithmic benchmarks compared", "info");
        showToast("Step 7: Classical MILP/XGBoost vs QEA/QINN Benchmark", "info");
      } else if (next >= 8) {
        // End of Demo
        setDemoMode(false);
        setActivePage("command-center");
        showToast("Operational Walkthrough Complete!", "success");
        return 0;
      }
      return next;
    });
  }, [runOptimization, simulateStorm, runReoptimization, addEvent, showToast]);

  const startDemo = useCallback(() => {
    resetSimulation();
    setDemoMode(true);
    setDemoStep(1);
    setActivePage("command-center");
    showToast("Executive Walkthrough Activated • Step 1: Configure Voyage", "accent");
  }, [resetSimulation, showToast]);

  const stopDemo = useCallback(() => {
    setDemoMode(false);
    setDemoStep(0);
    showToast("Walkthrough Closed", "info");
  }, [showToast]);

  const currentWeather = WEATHER_SNAPSHOTS[snapshotIndex];

  return (
    <FleetContext.Provider
      value={{
        config,
        updateConfig,
        plan,
        stormState,
        simulateStorm,
        isStormModalOpen,
        setIsStormModalOpen,
        isOptimizing,
        optStage,
        runOptimization,
        isReoptimizing,
        reoptStage,
        isReoptModalOpen,
        setIsReoptModalOpen,
        runReoptimization,
        resetSimulation,
        comparison,
        activePage,
        setActivePage,
        currentWeather,
        snapshotIndex,
        weatherCountdown,
        events,
        addEvent,
        shipProgress,
        setShipProgress,
        shipDirection,
        setShipDirection,
        restartShipFromDestination,
        restartShipFromOrigin,
        toggleShipDirection,
        demoMode,
        demoStep,
        demoPlaying,
        startDemo,
        stopDemo,
        nextDemoStep,
        toast
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
};
