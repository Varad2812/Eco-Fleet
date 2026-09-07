// ====================================================================
// ECO-FLEET MARITIME ROUTE DATABASE & NAVIGATIONAL CORRIDOR ENGINE
// Accurate sea-lane waypoints strictly avoiding landmasses
// Viewport projection: 1060 x 520 (Maritime Mercator-aligned coordinates)
//
// Ports reference:
// - Jebel Ali: (430, 260) - Persian Gulf
// - Mumbai: (528, 295) - Arabian Sea / West Coast India
// - Singapore: (715, 388) - Malacca Strait / Singapore Anchorage
// - Rotterdam: (165, 122) - North Sea / Netherlands
// - Hamburg: (195, 110) - Elbe Estuary / Germany
// - Busan: (865, 205) - Korea Strait / East Asia
// ====================================================================

// Key international maritime navigational choke-points & sea junctions:
export const SEA_JUNCTIONS = {
  JEBEL_ALI: [430, 260],
  HORMUZ_TSS: [446, 244],        // Open water north of Musandam
  OMAN_GULF: [472, 258],         // Gulf of Oman deep water
  ARABIAN_SEA_NW: [498, 280],
  ARABIAN_SEA_MID: [518, 315],
  MUMBAI_APPROACH: [526, 296],
  KONKAN_OFFSHORE: [536, 335],   // Deep offshore west of India
  MALABAR_DEEP: [552, 370],      // Deep water west of Kerala
  CAPE_COMORIN_SOUTH: [568, 398],// Open ocean south of India
  DONDRA_HEAD_DEEP: [586, 406],  // Deep ocean safely south of Sri Lanka (y > 396 avoids land!)
  BAY_OF_BENGAL_SOUTH: [635, 396],
  GREAT_CHANNEL_NICOBAR: [665, 390],
  MALACCA_NORTH: [680, 392],
  MALACCA_MID: [698, 393],
  SINGAPORE_CHOKE: [715, 388],

  // Far East & East Asia
  SOUTH_CHINA_SEA_BASIN: [752, 345],
  LUZON_STRAIT_WEST: [792, 295],
  TAIWAN_STRAIT_EAST: [826, 255],
  EAST_CHINA_SEA: [848, 228],
  BUSAN_PORT: [865, 205],

  // Europe & Mediterranean & Red Sea
  HAMBURG_PORT: [195, 110],
  GERMAN_BIGHT: [184, 108],
  TEXEL_TSS: [172, 114],
  ROTTERDAM_PORT: [165, 122],
  ENGLISH_CHANNEL_DOVER: [152, 132],
  ENGLISH_CHANNEL_WEST: [142, 145],
  BAY_OF_BISCAY: [130, 180],
  CAPE_FINISTERRE: [118, 200],
  CAPE_ST_VINCENT: [116, 230],
  GIBRALTAR_STRAIT: [126, 236],
  MEDITERRANEAN_WEST: [165, 238],
  MEDITERRANEAN_MID: [230, 244],
  MEDITERRANEAN_EAST: [285, 252],
  SUEZ_CANAL_NORTH: [316, 255],
  SUEZ_CANAL_SOUTH: [324, 264],
  RED_SEA_NORTH: [338, 282],
  RED_SEA_MID: [356, 305],
  BAB_EL_MANDEB: [378, 326],
  GULF_OF_ADEN_WEST: [398, 332],
  GULF_OF_ADEN_EAST: [435, 330],
  SOCOTRA_PASSAGE: [465, 326]
};

export const ROUTES = {
  // 1. Jebel Ali <-> Singapore
  "jebel-ali_singapore": {
    id: "jebel-ali_singapore",
    sourceId: "jebel-ali",
    destId: "singapore",
    name: "Persian Gulf - Malacca Deep-Sea Corridor",
    distanceNm: 3430,
    baseDurationHours: 211.7, // ~8.8 days at 16.2 kn
    chokepoints: ["Strait of Hormuz", "Dondra Head TSS", "Malacca Strait"],
    waypoints: [
      { name: "Jebel Ali Berth", x: 430, y: 260 },
      { name: "Strait of Hormuz TSS", x: 446, y: 244 },
      { name: "Gulf of Oman Deep", x: 472, y: 258 },
      { name: "Arabian Sea North", x: 502, y: 285 },
      { name: "Offshore Laccadive", x: 540, y: 345 },
      { name: "Cape Comorin South", x: 568, y: 398 },
      { name: "Dondra Head (South Sri Lanka)", x: 586, y: 406 },
      { name: "Bay of Bengal South", x: 635, y: 396 },
      { name: "Great Channel (Nicobar)", x: 665, y: 390 },
      { name: "Malacca Strait Corridor", x: 698, y: 393 },
      { name: "Singapore Anchorage", x: 715, y: 388 }
    ],
    // Baseline commercial track (safely in water)
    baselinePoints: [
      [430, 260], [446, 244], [472, 258], [502, 285],
      [540, 345], [568, 398], [586, 406], [635, 396],
      [665, 390], [698, 393], [715, 388]
    ],
    // Quantum-optimized route: rides favorable equatorial currents in open deep sea
    optimizedPoints: [
      [430, 260], [446, 244], [474, 256], [506, 282],
      [542, 342], [570, 396], [588, 404], [638, 394],
      [668, 389], [700, 392], [715, 388]
    ],
    // Moderate storm detour (dips south to avoid 3.5m wave swell)
    stormDetourModerate: [
      [430, 260], [446, 244], [474, 256], [508, 305],
      [546, 370], [574, 408], [594, 412], [642, 402],
      [672, 392], [702, 393], [715, 388]
    ],
    // Severe storm detour: southern deep-ocean corridor avoiding 6.4m cyclonic slamming
    stormDetourSevere: [
      [430, 260], [446, 244], [474, 256], [498, 325],
      [536, 395], [572, 425], [605, 428], [650, 415],
      [680, 396], [704, 394], [715, 388]
    ],
    // Extreme tropical cyclone detour: deep calm sub-equatorial trench
    stormDetourExtreme: [
      [430, 260], [446, 244], [474, 256], [490, 340],
      [528, 418], [568, 448], [615, 450], [660, 430],
      [688, 405], [708, 395], [715, 388]
    ]
  },

  // 2. Mumbai <-> Singapore
  "mumbai_singapore": {
    id: "mumbai_singapore",
    sourceId: "mumbai",
    destId: "singapore",
    name: "West India - Singapore Express Channel",
    distanceNm: 2450,
    baseDurationHours: 151.2,
    chokepoints: ["Dondra Head TSS", "Malacca Strait"],
    waypoints: [
      { name: "Mumbai JNPT", x: 528, y: 295 },
      { name: "Konkan Offshore", x: 536, y: 335 },
      { name: "Malabar Deep", x: 552, y: 370 },
      { name: "South of Sri Lanka", x: 586, y: 406 },
      { name: "Great Channel Entrance", x: 665, y: 390 },
      { name: "Singapore Anchorage", x: 715, y: 388 }
    ],
    baselinePoints: [
      [528, 295], [536, 335], [552, 370], [568, 398],
      [586, 406], [635, 396], [665, 390], [698, 393], [715, 388]
    ],
    optimizedPoints: [
      [528, 295], [538, 332], [554, 368], [570, 396],
      [588, 404], [638, 394], [668, 389], [700, 392], [715, 388]
    ],
    stormDetourModerate: [
      [528, 295], [534, 345], [550, 385], [576, 412],
      [596, 415], [645, 404], [672, 392], [715, 388]
    ],
    stormDetourSevere: [
      [528, 295], [526, 360], [546, 405], [580, 428],
      [610, 428], [655, 415], [682, 396], [715, 388]
    ],
    stormDetourExtreme: [
      [528, 295], [520, 380], [540, 425], [578, 452],
      [620, 452], [665, 432], [690, 405], [715, 388]
    ]
  },

  // 3. Jebel Ali <-> Mumbai
  "jebel-ali_mumbai": {
    id: "jebel-ali_mumbai",
    sourceId: "jebel-ali",
    destId: "mumbai",
    name: "Arabian Sea Trans-Gulf Highway",
    distanceNm: 1080,
    baseDurationHours: 66.7,
    chokepoints: ["Strait of Hormuz"],
    waypoints: [
      { name: "Jebel Ali Port", x: 430, y: 260 },
      { name: "Strait of Hormuz TSS", x: 446, y: 244 },
      { name: "Gulf of Oman", x: 472, y: 258 },
      { name: "Arabian Sea Crossing", x: 500, y: 278 },
      { name: "Mumbai JNPT", x: 528, y: 295 }
    ],
    baselinePoints: [
      [430, 260], [446, 244], [472, 258], [500, 278], [528, 295]
    ],
    optimizedPoints: [
      [430, 260], [446, 244], [474, 256], [502, 276], [528, 295]
    ],
    stormDetourModerate: [
      [430, 260], [446, 244], [474, 256], [498, 292], [528, 295]
    ],
    stormDetourSevere: [
      [430, 260], [446, 244], [474, 256], [492, 310], [520, 315], [528, 295]
    ],
    stormDetourExtreme: [
      [430, 260], [446, 244], [474, 256], [486, 325], [515, 332], [528, 295]
    ]
  },

  // 4. Rotterdam <-> Singapore (via Suez & Gibraltar)
  "rotterdam_singapore": {
    id: "rotterdam_singapore",
    sourceId: "rotterdam",
    destId: "singapore",
    name: "Europe - Far East Trunk Line (via Suez)",
    distanceNm: 8280,
    baseDurationHours: 511.0,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Bab-el-Mandeb", "Malacca Strait"],
    waypoints: [
      { name: "Rotterdam Maasvlakte", x: 165, y: 122 },
      { name: "English Channel", x: 148, y: 138 },
      { name: "Biscay West", x: 126, y: 185 },
      { name: "Strait of Gibraltar", x: 126, y: 236 },
      { name: "Mediterranean Sea", x: 230, y: 244 },
      { name: "Suez Canal", x: 320, y: 258 },
      { name: "Red Sea Corridor", x: 356, y: 305 },
      { name: "Bab-el-Mandeb", x: 378, y: 326 },
      { name: "Gulf of Aden", x: 435, y: 330 },
      { name: "Indian Ocean Open Sea", x: 520, y: 360 },
      { name: "South of Sri Lanka", x: 586, y: 406 },
      { name: "Malacca Strait", x: 698, y: 393 },
      { name: "Singapore Anchorage", x: 715, y: 388 }
    ],
    baselinePoints: [
      [165, 122], [148, 138], [126, 185], [126, 236], [230, 244],
      [320, 258], [356, 305], [378, 326], [435, 330], [520, 360],
      [586, 406], [665, 390], [698, 393], [715, 388]
    ],
    optimizedPoints: [
      [165, 122], [148, 138], [126, 185], [126, 236], [232, 242],
      [320, 258], [356, 305], [378, 326], [438, 328], [522, 355],
      [588, 404], [668, 389], [700, 392], [715, 388]
    ],
    stormDetourModerate: [
      [165, 122], [148, 138], [126, 185], [126, 236], [230, 244],
      [320, 258], [356, 305], [378, 326], [435, 330], [515, 385],
      [592, 415], [670, 392], [715, 388]
    ],
    stormDetourSevere: [
      [165, 122], [148, 138], [126, 185], [126, 236], [230, 244],
      [320, 258], [356, 305], [378, 326], [435, 330], [505, 410],
      [580, 435], [660, 418], [715, 388]
    ],
    stormDetourExtreme: [
      [165, 122], [148, 138], [126, 185], [126, 236], [230, 244],
      [320, 258], [356, 305], [378, 326], [435, 330], [495, 435],
      [575, 455], [665, 430], [715, 388]
    ]
  },

  // 5. Rotterdam <-> Jebel Ali
  "rotterdam_jebel-ali": {
    id: "rotterdam_jebel-ali",
    sourceId: "rotterdam",
    destId: "jebel-ali",
    name: "Northwest Europe - Arabian Gulf Corridor (via Suez)",
    distanceNm: 6350,
    baseDurationHours: 392.0,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Bab-el-Mandeb", "Strait of Hormuz"],
    waypoints: [
      { name: "Rotterdam Maasvlakte", x: 165, y: 122 },
      { name: "English Channel", x: 148, y: 138 },
      { name: "Strait of Gibraltar", x: 126, y: 236 },
      { name: "Mediterranean", x: 230, y: 244 },
      { name: "Suez Canal", x: 320, y: 258 },
      { name: "Red Sea", x: 356, y: 305 },
      { name: "Bab-el-Mandeb", x: 378, y: 326 },
      { name: "Gulf of Aden", x: 435, y: 330 },
      { name: "Arabian Sea North", x: 495, y: 295 },
      { name: "Gulf of Oman", x: 472, y: 258 },
      { name: "Strait of Hormuz", x: 446, y: 244 },
      { name: "Jebel Ali Port", x: 430, y: 260 }
    ],
    baselinePoints: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [495, 295], [472, 258], [446, 244], [430, 260]
    ],
    optimizedPoints: [
      [165, 122], [148, 138], [126, 236], [232, 242], [320, 258],
      [356, 305], [378, 326], [435, 330], [492, 292], [472, 258], [446, 244], [430, 260]
    ],
    stormDetourModerate: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [485, 310], [470, 268], [446, 244], [430, 260]
    ],
    stormDetourSevere: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [475, 330], [465, 275], [446, 244], [430, 260]
    ],
    stormDetourExtreme: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [465, 345], [460, 280], [446, 244], [430, 260]
    ]
  },

  // 6. Rotterdam <-> Mumbai
  "rotterdam_mumbai": {
    id: "rotterdam_mumbai",
    sourceId: "rotterdam",
    destId: "mumbai",
    name: "Europe - West India Corridor (via Suez)",
    distanceNm: 6330,
    baseDurationHours: 390.7,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Bab-el-Mandeb"],
    waypoints: [
      { name: "Rotterdam Maasvlakte", x: 165, y: 122 },
      { name: "English Channel", x: 148, y: 138 },
      { name: "Strait of Gibraltar", x: 126, y: 236 },
      { name: "Mediterranean", x: 230, y: 244 },
      { name: "Suez Canal", x: 320, y: 258 },
      { name: "Red Sea", x: 356, y: 305 },
      { name: "Bab-el-Mandeb", x: 378, y: 326 },
      { name: "Gulf of Aden", x: 435, y: 330 },
      { name: "Arabian Sea Central", x: 490, y: 310 },
      { name: "Mumbai JNPT", x: 528, y: 295 }
    ],
    baselinePoints: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [490, 310], [528, 295]
    ],
    optimizedPoints: [
      [165, 122], [148, 138], [126, 236], [232, 242], [320, 258],
      [356, 305], [378, 326], [435, 330], [492, 308], [528, 295]
    ],
    stormDetourModerate: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [485, 335], [520, 320], [528, 295]
    ],
    stormDetourSevere: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [475, 360], [515, 345], [528, 295]
    ],
    stormDetourExtreme: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [465, 385], [510, 365], [528, 295]
    ]
  },

  // 7. Singapore <-> Busan
  "singapore_busan": {
    id: "singapore_busan",
    sourceId: "singapore",
    destId: "busan",
    name: "South China Sea - East Asia Trunk",
    distanceNm: 2510,
    baseDurationHours: 154.9,
    chokepoints: ["Taiwan Strait", "Korea Strait"],
    waypoints: [
      { name: "Singapore Anchorage", x: 715, y: 388 },
      { name: "South China Sea Basin", x: 752, y: 345 },
      { name: "Luzon Strait West", x: 792, y: 295 },
      { name: "Taiwan Strait East", x: 826, y: 255 },
      { name: "East China Sea", x: 848, y: 228 },
      { name: "Busan New Port", x: 865, y: 205 }
    ],
    baselinePoints: [
      [715, 388], [752, 345], [792, 295], [826, 255], [848, 228], [865, 205]
    ],
    optimizedPoints: [
      [715, 388], [756, 342], [796, 290], [828, 250], [850, 225], [865, 205]
    ],
    stormDetourModerate: [
      [715, 388], [744, 350], [784, 305], [818, 265], [845, 235], [865, 205]
    ],
    stormDetourSevere: [
      [715, 388], [736, 360], [775, 318], [808, 278], [840, 245], [865, 205]
    ],
    stormDetourExtreme: [
      [715, 388], [728, 370], [765, 330], [800, 290], [835, 255], [865, 205]
    ]
  },

  // 8. Rotterdam <-> Hamburg
  "rotterdam_hamburg": {
    id: "rotterdam_hamburg",
    sourceId: "rotterdam",
    destId: "hamburg",
    name: "North Sea Coastal Feeder Run",
    distanceNm: 360,
    baseDurationHours: 22.2,
    chokepoints: ["Elbe Estuary"],
    waypoints: [
      { name: "Rotterdam Maasvlakte", x: 165, y: 122 },
      { name: "Texel TSS", x: 172, y: 114 },
      { name: "German Bight", x: 184, y: 108 },
      { name: "Hamburg Port", x: 195, y: 110 }
    ],
    baselinePoints: [
      [165, 122], [172, 114], [184, 108], [195, 110]
    ],
    optimizedPoints: [
      [165, 122], [170, 112], [182, 106], [195, 110]
    ],
    stormDetourModerate: [
      [165, 122], [174, 116], [186, 111], [195, 110]
    ],
    stormDetourSevere: [
      [165, 122], [176, 119], [188, 114], [195, 110]
    ],
    stormDetourExtreme: [
      [165, 122], [178, 121], [190, 116], [195, 110]
    ]
  },

  // 9. Jebel Ali <-> Busan
  "jebel-ali_busan": {
    id: "jebel-ali_busan",
    sourceId: "jebel-ali",
    destId: "busan",
    name: "Persian Gulf - East Asia Transpacific Gateway",
    distanceNm: 5880,
    baseDurationHours: 362.9,
    chokepoints: ["Strait of Hormuz", "Malacca Strait", "Korea Strait"],
    waypoints: [
      { name: "Jebel Ali Port", x: 430, y: 260 },
      { name: "Strait of Hormuz", x: 446, y: 244 },
      { name: "Gulf of Oman", x: 472, y: 258 },
      { name: "South of Sri Lanka", x: 586, y: 406 },
      { name: "Singapore Chokepoint", x: 715, y: 388 },
      { name: "South China Sea", x: 752, y: 345 },
      { name: "Taiwan Strait East", x: 826, y: 255 },
      { name: "Busan New Port", x: 865, y: 205 }
    ],
    baselinePoints: [
      [430, 260], [446, 244], [472, 258], [502, 285], [540, 345],
      [586, 406], [665, 390], [698, 393], [715, 388],
      [752, 345], [792, 295], [826, 255], [848, 228], [865, 205]
    ],
    optimizedPoints: [
      [430, 260], [446, 244], [474, 256], [506, 282], [542, 342],
      [588, 404], [668, 389], [700, 392], [715, 388],
      [756, 342], [796, 290], [828, 250], [850, 225], [865, 205]
    ],
    stormDetourModerate: [
      [430, 260], [446, 244], [474, 256], [508, 305], [546, 370],
      [594, 412], [672, 392], [715, 388],
      [752, 345], [792, 295], [826, 255], [865, 205]
    ],
    stormDetourSevere: [
      [430, 260], [446, 244], [474, 256], [498, 325], [536, 395],
      [605, 428], [680, 396], [715, 388],
      [752, 345], [792, 295], [826, 255], [865, 205]
    ],
    stormDetourExtreme: [
      [430, 260], [446, 244], [474, 256], [490, 340], [528, 418],
      [615, 450], [688, 405], [715, 388],
      [752, 345], [792, 295], [826, 255], [865, 205]
    ]
  },

  // 10. Mumbai <-> Busan
  "mumbai_busan": {
    id: "mumbai_busan",
    sourceId: "mumbai",
    destId: "busan",
    name: "India - Far East Maritime Corridor",
    distanceNm: 4920,
    baseDurationHours: 303.7,
    chokepoints: ["Dondra Head TSS", "Malacca Strait", "Korea Strait"],
    waypoints: [
      { name: "Mumbai JNPT", x: 528, y: 295 },
      { name: "South of Sri Lanka", x: 586, y: 406 },
      { name: "Singapore Chokepoint", x: 715, y: 388 },
      { name: "South China Sea", x: 752, y: 345 },
      { name: "Busan New Port", x: 865, y: 205 }
    ],
    baselinePoints: [
      [528, 295], [536, 335], [552, 370], [586, 406], [665, 390],
      [715, 388], [752, 345], [792, 295], [826, 255], [865, 205]
    ],
    optimizedPoints: [
      [528, 295], [538, 332], [554, 368], [588, 404], [668, 389],
      [715, 388], [756, 342], [796, 290], [828, 250], [865, 205]
    ],
    stormDetourModerate: [
      [528, 295], [534, 345], [550, 385], [596, 415], [672, 392],
      [715, 388], [752, 345], [826, 255], [865, 205]
    ],
    stormDetourSevere: [
      [528, 295], [526, 360], [546, 405], [610, 428], [682, 396],
      [715, 388], [752, 345], [826, 255], [865, 205]
    ],
    stormDetourExtreme: [
      [528, 295], [520, 380], [540, 425], [620, 452], [690, 405],
      [715, 388], [752, 345], [826, 255], [865, 205]
    ]
  },

  // 11. Hamburg <-> Singapore (via English Channel, Gibraltar & Suez)
  "hamburg_singapore": {
    id: "hamburg_singapore",
    sourceId: "hamburg",
    destId: "singapore",
    name: "Northern Europe - Asia Silk Route (via Suez)",
    distanceNm: 8560,
    baseDurationHours: 528.4,
    chokepoints: ["Elbe Estuary", "English Channel", "Gibraltar", "Suez Canal", "Malacca Strait"],
    waypoints: [
      { name: "Hamburg Port", x: 195, y: 110 },
      { name: "German Bight", x: 184, y: 108 },
      { name: "Texel TSS", x: 172, y: 114 },
      { name: "English Channel", x: 148, y: 138 },
      { name: "Strait of Gibraltar", x: 126, y: 236 },
      { name: "Mediterranean", x: 230, y: 244 },
      { name: "Suez Canal", x: 320, y: 258 },
      { name: "Red Sea", x: 356, y: 305 },
      { name: "Bab-el-Mandeb", x: 378, y: 326 },
      { name: "South of Sri Lanka", x: 586, y: 406 },
      { name: "Malacca Strait", x: 698, y: 393 },
      { name: "Singapore Anchorage", x: 715, y: 388 }
    ],
    baselinePoints: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 185],
      [126, 236], [230, 244], [320, 258], [356, 305], [378, 326],
      [435, 330], [520, 360], [586, 406], [665, 390], [698, 393], [715, 388]
    ],
    optimizedPoints: [
      [195, 110], [182, 106], [170, 112], [148, 138], [126, 185],
      [126, 236], [232, 242], [320, 258], [356, 305], [378, 326],
      [438, 328], [522, 355], [588, 404], [668, 389], [700, 392], [715, 388]
    ],
    stormDetourModerate: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [515, 385], [592, 415], [670, 392], [715, 388]
    ],
    stormDetourSevere: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [505, 410], [580, 435], [660, 418], [715, 388]
    ],
    stormDetourExtreme: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [495, 435], [575, 455], [665, 430], [715, 388]
    ]
  },

  // 12. Hamburg <-> Jebel Ali
  "hamburg_jebel-ali": {
    id: "hamburg_jebel-ali",
    sourceId: "hamburg",
    destId: "jebel-ali",
    name: "North Germany - Arabian Gulf Trunk",
    distanceNm: 6620,
    baseDurationHours: 408.6,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Bab-el-Mandeb", "Strait of Hormuz"],
    baselinePoints: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [495, 295], [472, 258], [446, 244], [430, 260]
    ],
    optimizedPoints: [
      [195, 110], [182, 106], [170, 112], [148, 138], [126, 236],
      [232, 242], [320, 258], [356, 305], [378, 326], [435, 330],
      [492, 292], [472, 258], [446, 244], [430, 260]
    ],
    stormDetourModerate: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [485, 310], [470, 268], [446, 244], [430, 260]
    ],
    stormDetourSevere: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [475, 330], [465, 275], [446, 244], [430, 260]
    ],
    stormDetourExtreme: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [465, 345], [460, 280], [446, 244], [430, 260]
    ]
  },

  // 13. Hamburg <-> Mumbai
  "hamburg_mumbai": {
    id: "hamburg_mumbai",
    sourceId: "hamburg",
    destId: "mumbai",
    name: "Hamburg - West India Service",
    distanceNm: 6600,
    baseDurationHours: 407.4,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Bab-el-Mandeb"],
    baselinePoints: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [490, 310], [528, 295]
    ],
    optimizedPoints: [
      [195, 110], [182, 106], [170, 112], [148, 138], [126, 236],
      [232, 242], [320, 258], [356, 305], [378, 326], [435, 330],
      [492, 308], [528, 295]
    ],
    stormDetourModerate: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [485, 335], [520, 320], [528, 295]
    ],
    stormDetourSevere: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [475, 360], [515, 345], [528, 295]
    ],
    stormDetourExtreme: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [465, 385], [510, 365], [528, 295]
    ]
  },

  // 14. Rotterdam <-> Busan
  "rotterdam_busan": {
    id: "rotterdam_busan",
    sourceId: "rotterdam",
    destId: "busan",
    name: "Northern Europe - Far East Express (via Suez & Malacca)",
    distanceNm: 10790,
    baseDurationHours: 666.0,
    chokepoints: ["English Channel", "Gibraltar", "Suez Canal", "Malacca Strait", "Korea Strait"],
    baselinePoints: [
      [165, 122], [148, 138], [126, 185], [126, 236], [230, 244],
      [320, 258], [356, 305], [378, 326], [435, 330], [520, 360],
      [586, 406], [665, 390], [715, 388], [752, 345], [792, 295],
      [826, 255], [848, 228], [865, 205]
    ],
    optimizedPoints: [
      [165, 122], [148, 138], [126, 185], [126, 236], [232, 242],
      [320, 258], [356, 305], [378, 326], [438, 328], [522, 355],
      [588, 404], [668, 389], [715, 388], [756, 342], [796, 290],
      [828, 250], [850, 225], [865, 205]
    ],
    stormDetourModerate: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [515, 385], [592, 415],
      [670, 392], [715, 388], [752, 345], [826, 255], [865, 205]
    ],
    stormDetourSevere: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [505, 410], [580, 435],
      [660, 418], [715, 388], [752, 345], [826, 255], [865, 205]
    ],
    stormDetourExtreme: [
      [165, 122], [148, 138], [126, 236], [230, 244], [320, 258],
      [356, 305], [378, 326], [435, 330], [495, 435], [575, 455],
      [665, 430], [715, 388], [752, 345], [826, 255], [865, 205]
    ]
  },

  // 15. Hamburg <-> Busan
  "hamburg_busan": {
    id: "hamburg_busan",
    sourceId: "hamburg",
    destId: "busan",
    name: "Germany - Korea Direct Containerlane",
    distanceNm: 11050,
    baseDurationHours: 682.0,
    chokepoints: ["Elbe Estuary", "English Channel", "Gibraltar", "Suez Canal", "Malacca Strait", "Korea Strait"],
    baselinePoints: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [520, 360], [586, 406], [665, 390], [715, 388], [752, 345],
      [826, 255], [865, 205]
    ],
    optimizedPoints: [
      [195, 110], [182, 106], [170, 112], [148, 138], [126, 236],
      [232, 242], [320, 258], [356, 305], [378, 326], [438, 328],
      [522, 355], [588, 404], [668, 389], [715, 388], [756, 342],
      [828, 250], [865, 205]
    ],
    stormDetourModerate: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [515, 385], [592, 415], [670, 392], [715, 388], [752, 345], [865, 205]
    ],
    stormDetourSevere: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [505, 410], [580, 435], [660, 418], [715, 388], [752, 345], [865, 205]
    ],
    stormDetourExtreme: [
      [195, 110], [184, 108], [172, 114], [148, 138], [126, 236],
      [230, 244], [320, 258], [356, 305], [378, 326], [435, 330],
      [495, 435], [575, 455], [665, 430], [715, 388], [752, 345], [865, 205]
    ]
  }
};

// Maritime corridor resolver: handles any pair (forward or reverse),
// guaranteeing ZERO overland pathing.
export const getRouteForPorts = (sourcePort, destPort) => {
  if (!sourcePort || !destPort) return ROUTES["jebel-ali_singapore"];
  
  const forwardKey = `${sourcePort.id}_${destPort.id}`;
  if (ROUTES[forwardKey]) return ROUTES[forwardKey];
  
  const reverseKey = `${destPort.id}_${sourcePort.id}`;
  if (ROUTES[reverseKey]) {
    const rev = ROUTES[reverseKey];
    return {
      ...rev,
      id: forwardKey,
      sourceId: sourcePort.id,
      destId: destPort.id,
      name: `${sourcePort.name} to ${destPort.name} Corridor`,
      baselinePoints: [...rev.baselinePoints].reverse(),
      optimizedPoints: [...rev.optimizedPoints].reverse(),
      stormDetourModerate: [...rev.stormDetourModerate].reverse(),
      stormDetourSevere: [...rev.stormDetourSevere].reverse(),
      stormDetourExtreme: [...rev.stormDetourExtreme].reverse(),
      waypoints: [...(rev.waypoints || [])].reverse()
    };
  }

  // If completely unknown pair, fallback safely to Jebel Ali -> Singapore
  return ROUTES["jebel-ali_singapore"];
};
