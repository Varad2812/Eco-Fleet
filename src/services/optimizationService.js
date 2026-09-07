import { calculateVoyagePlan } from '../data/optimizationEngine';
import { STORM_SCENARIOS, getStormScenario } from '../data/stormScenarios';

/**
 * Optimization Service
 * Architecture-ready abstraction for future REST / GraphQL endpoint:
 * Later replace implementation with:
 * return fetch('/api/optimize', { method: 'POST', body: JSON.stringify(params) }).then(res => res.json())
 */
export const getOptimizationResult = (params) => {
  return calculateVoyagePlan(params);
};

/**
 * Re-optimization Service
 * Later replace with:
 * return fetch('/api/reoptimize', { method: 'POST', body: JSON.stringify(params) }).then(res => res.json())
 */
export const reoptimizeVoyage = (params, stormIntensity) => {
  return calculateVoyagePlan({
    ...params,
    stormIntensity
  });
};

export const getStormScenariosList = () => {
  return Object.values(STORM_SCENARIOS);
};

export const getActiveStorm = (intensity) => {
  return getStormScenario(intensity);
};
