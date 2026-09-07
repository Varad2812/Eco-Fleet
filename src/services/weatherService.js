import { WEATHER_SNAPSHOTS } from '../data/weather';

/**
 * Weather Service
 * Architecture-ready abstraction for future MetOcean feed:
 * Later replace with:
 * return fetch('/api/weather/current').then(res => res.json())
 */
export const getWeatherSnapshot = (index) => {
  const safeIndex = Math.abs(index) % WEATHER_SNAPSHOTS.length;
  return WEATHER_SNAPSHOTS[safeIndex];
};

export const getAllWeatherSnapshots = () => {
  return WEATHER_SNAPSHOTS;
};
