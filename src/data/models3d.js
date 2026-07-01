export const models3d = {
  "repo": "physicsforge",
  "chapterNumber": 7,
  "chapterName": "Alternating Current",
  "shortName": "AC",
  "count": 20,
  "models": [
    {
      "id": "model-01",
      "number": 1,
      "title": "Rotating Coil AC Source",
      "kind": "generator",
      "formula": "v = V0 sin omega t",
      "concept": "A rotating coil creates sinusoidal alternating voltage.",
      "exam": "Peak value is not RMS value.",
      "labels": [
        "coil",
        "magnet",
        "AC output"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-02",
      "number": 2,
      "title": "Sine Wave Phase Tunnel",
      "kind": "wave",
      "formula": "i = I0 sin omega t",
      "concept": "The 3D wave shows amplitude, wavelength-like spacing and phase shift.",
      "exam": "Average over complete cycle is zero.",
      "labels": [
        "peak",
        "zero crossing",
        "phase"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-03",
      "number": 3,
      "title": "RMS Heating Model",
      "kind": "thermal",
      "formula": "Vrms = V0/sqrt(2)",
      "concept": "RMS value gives equivalent DC heating.",
      "exam": "Do not use simple average for heating power.",
      "labels": [
        "peak",
        "RMS plane",
        "heat"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-04",
      "number": 4,
      "title": "Pure Resistor Phasors",
      "kind": "phasor",
      "formula": "V and I in phase",
      "concept": "Voltage and current arrows overlap for a pure resistor.",
      "exam": "Power factor is one.",
      "labels": [
        "V",
        "I",
        "same phase"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-05",
      "number": 5,
      "title": "Pure Inductor Lag Model",
      "kind": "coil",
      "formula": "XL = omega L",
      "concept": "Inductor current lags voltage because it opposes current change.",
      "exam": "Higher frequency means larger inductive reactance.",
      "labels": [
        "coil",
        "V leads",
        "I lags"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-06",
      "number": 6,
      "title": "Pure Capacitor Lead Model",
      "kind": "capacitor",
      "formula": "XC = 1/(omega C)",
      "concept": "Capacitor current leads voltage because current depends on dv/dt.",
      "exam": "At low frequency, capacitive reactance is large.",
      "labels": [
        "plates",
        "I leads",
        "V lags"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-07",
      "number": 7,
      "title": "Series LCR Circuit",
      "kind": "lcr",
      "formula": "Z = sqrt(R^2 + (XL-XC)^2)",
      "concept": "R, L and C contributions combine vectorially.",
      "exam": "Impedance is not R + XL + XC.",
      "labels": [
        "R",
        "L",
        "C"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-08",
      "number": 8,
      "title": "Impedance Triangle",
      "kind": "phasor",
      "formula": "tan phi = (XL-XC)/R",
      "concept": "The triangle shows resistance and net reactance as perpendicular components.",
      "exam": "Sign of XL-XC decides inductive or capacitive nature.",
      "labels": [
        "R",
        "XL-XC",
        "Z"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-09",
      "number": 9,
      "title": "Power Factor Dial",
      "kind": "phasor",
      "formula": "cos phi = R/Z",
      "concept": "Power factor measures the useful in-phase part of current.",
      "exam": "Low power factor means larger current for same real power.",
      "labels": [
        "real power",
        "phase angle",
        "cos phi"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-10",
      "number": 10,
      "title": "Wattless Current Loop",
      "kind": "wave",
      "formula": "Pavg = 0 for pure L or C",
      "concept": "Energy shuttles between source and field without net consumption.",
      "exam": "Current can be nonzero while average power is zero.",
      "labels": [
        "source",
        "stored energy",
        "return"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-11",
      "number": 11,
      "title": "Resonance Peak",
      "kind": "resonance",
      "formula": "omega0 = 1/sqrt(LC)",
      "concept": "At resonance, XL equals XC and current is maximum.",
      "exam": "Resonance does not mean zero resistance.",
      "labels": [
        "f0",
        "I max",
        "R limit"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-12",
      "number": 12,
      "title": "Quality Factor Tunnel",
      "kind": "resonance",
      "formula": "Q = omega0 L/R",
      "concept": "Sharper resonance appears when resistance is smaller.",
      "exam": "High Q means narrow bandwidth.",
      "labels": [
        "sharp peak",
        "bandwidth",
        "Q"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-13",
      "number": 13,
      "title": "Bandwidth Markers",
      "kind": "resonance",
      "formula": "BW = f0/Q",
      "concept": "Half-power points define bandwidth around resonance.",
      "exam": "Bandwidth decreases as Q increases.",
      "labels": [
        "f1",
        "f2",
        "BW"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-14",
      "number": 14,
      "title": "LC Energy Exchange",
      "kind": "atom",
      "formula": "U_E + U_B = constant",
      "concept": "Energy swaps between capacitor electric field and inductor magnetic field.",
      "exam": "Ideal LC oscillation has no resistance loss.",
      "labels": [
        "capacitor energy",
        "inductor energy",
        "oscillation"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-15",
      "number": 15,
      "title": "Transformer Core Flux",
      "kind": "transformer",
      "formula": "Vs/Vp = Ns/Np",
      "concept": "Changing magnetic flux links primary and secondary coils.",
      "exam": "Transformer works only with changing current.",
      "labels": [
        "primary",
        "core",
        "secondary"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-16",
      "number": 16,
      "title": "Step-Up Transformer",
      "kind": "transformer",
      "formula": "Ns > Np",
      "concept": "More secondary turns increase voltage and reduce ideal current.",
      "exam": "Power is conserved in ideal transformer.",
      "labels": [
        "low V primary",
        "high V secondary",
        "turns ratio"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-17",
      "number": 17,
      "title": "Step-Down Transformer",
      "kind": "transformer",
      "formula": "Ns < Np",
      "concept": "Fewer secondary turns reduce voltage and increase ideal current.",
      "exam": "Current ratio is inverse of voltage ratio.",
      "labels": [
        "high V primary",
        "low V secondary",
        "load"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-18",
      "number": 18,
      "title": "Laminated Core Losses",
      "kind": "thermal",
      "formula": "eddy loss reduced by laminations",
      "concept": "Thin insulated sheets restrict eddy current loops.",
      "exam": "Hysteresis and eddy losses make real transformers non-ideal.",
      "labels": [
        "laminations",
        "eddy loops",
        "heat"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-19",
      "number": 19,
      "title": "Choke Coil Model",
      "kind": "coil",
      "formula": "XL high, R low",
      "concept": "A choke limits AC current with little power loss.",
      "exam": "It is preferred over resistance for AC current control.",
      "labels": [
        "coil",
        "AC source",
        "low heat"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-20",
      "number": 20,
      "title": "Practical AC Filter",
      "kind": "lcr",
      "formula": "frequency response",
      "concept": "Reactance changes with frequency, so circuits can filter signals.",
      "exam": "Inductors block high frequency; capacitors block low frequency.",
      "labels": [
        "input",
        "filter",
        "output"
      ],
      "color": "#7c3aed"
    }
  ]
}
