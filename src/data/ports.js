export const PORTS = [
  {
    id: "jebel-ali",
    name: "Jebel Ali",
    code: "AEJEA",
    country: "United Arab Emirates",
    region: "Middle East / Persian Gulf",
    lat: 25.01,
    lon: 55.06,
    // SVG Map projection coordinates (viewport: 1000x520)
    svgX: 430,
    svgY: 260,
    timezone: "UTC+4",
    draftLimit: "17.0 m",
    turnaroundHours: 18.5,
    bunkeringAvailable: ["LNG", "VLSFO", "Methanol"],
    congestionIndex: "Low (0.8 days wait)"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    code: "INBOM",
    country: "India",
    region: "South Asia / Arabian Sea",
    lat: 18.94,
    lon: 72.84,
    svgX: 528,
    svgY: 295,
    timezone: "UTC+5:30",
    draftLimit: "14.5 m",
    turnaroundHours: 24.0,
    bunkeringAvailable: ["VLSFO", "LNG"],
    congestionIndex: "Moderate (1.4 days wait)"
  },
  {
    id: "singapore",
    name: "Singapore",
    code: "SGSIN",
    country: "Singapore",
    region: "Southeast Asia / Malacca",
    lat: 1.29,
    lon: 103.85,
    svgX: 715,
    svgY: 388,
    timezone: "UTC+8",
    draftLimit: "20.5 m",
    turnaroundHours: 14.0,
    bunkeringAvailable: ["LNG", "Methanol", "Ammonia", "Hydrogen", "VLSFO"],
    congestionIndex: "Low (0.6 days wait)"
  },
  {
    id: "rotterdam",
    name: "Rotterdam",
    code: "NLRTM",
    country: "Netherlands",
    region: "Northwest Europe",
    lat: 51.92,
    lon: 4.48,
    svgX: 165,
    svgY: 122,
    timezone: "UTC+1",
    draftLimit: "24.0 m",
    turnaroundHours: 16.0,
    bunkeringAvailable: ["LNG", "Methanol", "Hydrogen", "Ammonia", "VLSFO"],
    congestionIndex: "Low (0.9 days wait)"
  },
  {
    id: "busan",
    name: "Busan",
    code: "KRPUS",
    country: "South Korea",
    region: "East Asia / Sea of Japan",
    lat: 35.18,
    lon: 129.07,
    svgX: 865,
    svgY: 205,
    timezone: "UTC+9",
    draftLimit: "18.0 m",
    turnaroundHours: 15.2,
    bunkeringAvailable: ["LNG", "Methanol", "VLSFO"],
    congestionIndex: "Low (0.7 days wait)"
  },
  {
    id: "hamburg",
    name: "Hamburg",
    code: "DEHAM",
    country: "Germany",
    region: "Northwest Europe / Elbe",
    lat: 53.55,
    lon: 9.99,
    svgX: 195,
    svgY: 110,
    timezone: "UTC+1",
    draftLimit: "15.1 m",
    turnaroundHours: 20.4,
    bunkeringAvailable: ["LNG", "Methanol", "Hydrogen", "VLSFO"],
    congestionIndex: "Moderate (1.8 days wait)"
  }
];

export const getPortById = (id) => {
  return PORTS.find((p) => p.id === id) || PORTS[0];
};

export const getPortByName = (name) => {
  return PORTS.find((p) => p.name.toLowerCase() === (name || "").toLowerCase()) || PORTS[0];
};
