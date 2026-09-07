import { VESSELS } from '../data/vessels';

export const getFleetVessels = () => {
  return VESSELS;
};

export const getFleetSummary = () => {
  const totalVessels = VESSELS.length;
  const enRoute = VESSELS.filter(v => v.availability === "EN ROUTE").length;
  const inPort = VESSELS.filter(v => v.availability === "AVAILABLE" || v.availability === "LOADING").length;
  const ciiCompliant = VESSELS.filter(v => v.ciiRating === "A" || v.ciiRating === "B").length;

  return {
    totalVessels,
    enRoute,
    inPort,
    ciiCompliant,
    complianceRate: Math.round((ciiCompliant / totalVessels) * 100),
    activeRoutes: 6,
    weatherFeedActive: true,
    engineOnline: true
  };
};
