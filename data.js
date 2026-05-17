// data.js — Pasta parametric definitions from "Pasta by Design" by George L. Legendre

export const PASTA = [
  {
    name: "ANELLINI",
    page: "p.018",
    description: "The diminutive anellini (small rings) are part of the extended pastine minute (tiny pasta) clan. Their thickness varies between only 1.15 and 1.20 mm, and they are therefore usually found in light soups together with croutons and thinly sliced vegetables. This pasta may also be found served in a timballo (baked pasta dish).",
    profile: "STRAIGHT LONGITUDINAL PROFILE",
    profileType: "straight",
    properties: {
      hollow: true,
      smooth: true,
      smoothEdges: true,
      striated: false
    },
    ranges: { iMax: 200, jMax: 8 },
    Pi:    (i, j) => Math.cos(0.01 * i * Math.PI),
    Theta: (i, j) => 1.1 * Math.sin(0.01 * i * Math.PI),
    K:     (i, j) => 0.05 * j,
    eqPi:    "Π(i,j) = cos(0.01·i·π)",
    eqTheta: "Θ(i,j) = 1.1·sin(0.01·i·π)",
    eqK:     "K(i,j) = 0.05·j",
    eqRanges: "i = 0..200,  j = 0..8",
    specs: {
      diameter: "6 mm",
      thickness: "1 mm",
      cooking: "6 min"
    }
  },
  {
    name: "BUCATINI",
    page: "p.021",
    description: "Bucatini (pierced) pasta is commonly served as a pastasciutta (pasta boiled, drained and dished up with a sauce, rather than in broth). Its best-known accompaniment is amatriciana, a hearty traditional sauce made with dried pork, Pecorino Romano and tomato sauce, and named after the medieval town of Amatrice in central Italy.",
    profile: "STRAIGHT LONGITUDINAL PROFILE",
    profileType: "straight",
    properties: {
      hollow: true,
      smooth: true,
      smoothEdges: true,
      striated: false
    },
    ranges: { iMax: 60, jMax: 90 },
    Pi:    (i, j) => 0.3 * Math.cos((i / 30) * Math.PI),
    Theta: (i, j) => 0.3 * Math.sin((i / 30) * Math.PI),
    K:     (i, j) => j / 45,
    eqPi:    "Π(i,j) = 0.3·cos(i/30·π)",
    eqTheta: "Θ(i,j) = 0.3·sin(i/30·π)",
    eqK:     "K(i,j) = j/45",
    eqRanges: "i = 0..60,  j = 0..90",
    specs: {
      length: "237 mm",
      diameter: "3 mm",
      cooking: "11 min"
    }
  },
  {
    name: "BUCCOLI",
    page: "p.022",
    description: "A spiral-shaped example from the pasta corta (short pasta) family, and of rather uncertain pedigree, buccoli are suitable in a mushroom and sausage dish. They are also excellent with a tomato, aubergine, pesto and ricotta salad.",
    profile: "HELICOIDAL LONGITUDINAL PROFILE",
    profileType: "helicoidal",
    properties: {
      hollow: true,
      smooth: true,
      smoothEdges: true,
      striated: false
    },
    ranges: { iMax: 200, jMax: 25 },
    Pi:    (i, j) => (0.7 + 0.2 * Math.sin((21 * j / 250) * Math.PI)) * Math.cos((i / 20) * Math.PI),
    Theta: (i, j) => (0.7 + 0.2 * Math.sin((21 * j / 250) * Math.PI)) * Math.sin(-(i / 20) * Math.PI),
    K:     (i, j) => (39 * i / 1000) + 1.5 * Math.sin((j / 50) * Math.PI),
    eqPi:    "Π(i,j) = (0.7 + 0.2·sin(21j/250·π))·cos(i/20·π)",
    eqTheta: "Θ(i,j) = (0.7 + 0.2·sin(21j/250·π))·sin(−i/20·π)",
    eqK:     "K(i,j) = 39·i/1000 + 1.5·sin(j/50·π)",
    eqRanges: "i = 0..200,  j = 0..25",
    specs: {
      length: "30 mm",
      diameter: "8 mm",
      cooking: "8 min"
    }
  },
  {
    name: "CALAMARETTI",
    page: "p.024",
    description: "Literally 'little squids', calamaretti are small ring-shaped pasta cooked as pastasciutto then dished up with a tomato-, egg- or cheese-based sauce. Their shape means that calamaretti hold both chunky and thin sauces equally well. Fittingly, they are often served with seafood.",
    profile: "STRAIGHT LONGITUDINAL PROFILE",
    profileType: "straight",
    properties: {
      hollow: true,
      smooth: true,
      smoothEdges: true,
      striated: false
    },
    ranges: { iMax: 150, jMax: 20 },
    Pi:    (i, j) => Math.cos((i / 75) * Math.PI) + 0.1 * Math.cos((j / 40) * Math.PI) + 0.1 * Math.cos((i / 75) * Math.PI + (j / 40) * Math.PI),
    Theta: (i, j) => 1.2 * Math.sin((i / 75) * Math.PI) + 0.2 * Math.sin((j / 40) * Math.PI),
    K:     (i, j) => j / 10,
    eqPi:    "Π(i,j) = cos(i/75·π) + 0.1·cos(j/40·π) + 0.1·cos(i/75·π + j/40·π)",
    eqTheta: "Θ(i,j) = 1.2·sin(i/75·π) + 0.2·sin(j/40·π)",
    eqK:     "K(i,j) = j/10",
    eqRanges: "i = 0..150,  j = 0..20",
    specs: {
      length: "14 mm",
      diameter: "25 mm",
      cooking: "14 min"
    }
  },
  {
    name: "CANNELLONI",
    page: "p.027",
    description: "Made with wheat flour, eggs and olive oil, cannelloni (big tubes) originate as strips of pasta shaped into perfect cylinders, which can be stuffed with meat, vegetables or ricotta. The stuffed cannelloni are covered with a creamy besciamella sauce, a sprinkling of Parmigiano-Reggiano cheese and then oven-baked.",
    profile: "STRAIGHT LONGITUDINAL PROFILE",
    profileType: "straight",
    properties: {
      hollow: true,
      smooth: true,
      smoothEdges: true,
      striated: false
    },
    ranges: { iMax: 110, jMax: 50 },
    Pi:    (i, j) => (1 + j / 100) * Math.cos((i / 55) * Math.PI) + 0.5 * Math.cos((j / 100) * Math.PI) + 0.1 * Math.cos((i / 55) * Math.PI + (j / 125) * Math.PI),
    Theta: (i, j) => 1.3 * Math.sin((i / 55) * Math.PI) + 0.3 * Math.sin((j / 100) * Math.PI),
    K:     (i, j) => (i * j) / 50,
    eqPi:    "Π(i,j) = (1 + j/100)·cos(i/55·π) + 0.5·cos(j/100·π) + 0.1·cos(i/55·π + j/125·π)",
    eqTheta: "Θ(i,j) = 1.3·sin(i/55·π) + 0.3·sin(j/100·π)",
    eqK:     "K(i,j) = i·j/50",
    eqRanges: "i = 0..110,  j = 0..50",
    specs: {
      length: "100 mm",
      diameter: "23 mm",
      cooking: "20 min"
    }
  },
  {
    name: "CANNOLICCHI RIGATI",
    page: "p.028",
    description: "Known as 'little tubes', cannolicchi exist both in a rigati (grooved) and lisci (smooth) form. These hollow pasta corta (short pasta) come in various diameters and are often served with seafood. Cannolicchi hail from Campania in southern Italy.",
    profile: "STRAIGHT LONGITUDINAL PROFILE",
    profileType: "straight",
    properties: {
      hollow: true,
      smooth: false,
      smoothEdges: true,
      striated: true
    },
    ranges: { iMax: 140, jMax: 50 },
    Pi:    (i, j) => 8 * Math.cos((i / 70) * Math.PI) + 0.2 * Math.cos((2 * i / 7) * Math.PI) + 5 * Math.cos((j / 100) * Math.PI),
    Theta: (i, j) => 8 * Math.sin((i / 70) * Math.PI) + 0.2 * Math.sin((2 * i / 7) * Math.PI) + 4 * Math.sin((j / 100) * Math.PI),
    K:     (i, j) => (6 * j) / 5,
    eqPi:    "Π(i,j) = 8·cos(i/70·π) + 0.2·cos(2i/7·π) + 5·cos(j/100·π)",
    eqTheta: "Θ(i,j) = 8·sin(i/70·π) + 0.2·sin(2i/7·π) + 4·sin(j/100·π)",
    eqK:     "K(i,j) = 6j/5",
    eqRanges: "i = 0..140,  j = 0..50",
    specs: {
      length: "41 mm",
      diameter: "8 mm",
      cooking: "11 min"
    }
  }
];
