export const summaryTables = [
  {
    title: 'AC vs DC',
    columns: ['Feature', 'AC', 'DC'],
    rows: [
      ['Direction', 'Reverses periodically', 'One fixed direction'],
      ['Typical graph', 'Sinusoidal or periodic', 'Constant line for ideal DC'],
      ['Average over cycle', 'Zero for symmetric sine AC', 'Equal to constant value'],
      ['Transformer use', 'Works because current changes', 'Does not work in steady state'],
      ['Storage', 'Not stored directly as AC in a cell', 'Stored in batteries/cells'],
    ],
  },
  {
    title: 'Peak vs RMS vs Average',
    columns: ['Quantity', 'Meaning', 'Sine-wave value', 'Exam alert'],
    rows: [
      ['Peak', 'Maximum magnitude', 'V0 or I0', 'Largest instantaneous value'],
      ['RMS', 'Heating-equivalent value', 'Peak/sqrt(2)', 'AC meter reading'],
      ['Half-cycle mean', 'Area average over positive half', '2 peak/pi', 'Used in rectification contexts'],
      ['Full-cycle mean', 'Average over full symmetric cycle', '0', 'Not used for heating'],
    ],
  },
  {
    title: 'R, L, C Phase Relation',
    columns: ['Element', 'Phase relation', 'Reactance/Impedance', 'Average power'],
    rows: [
      ['R', 'V and I in phase', 'Z = R', 'Maximum: VI'],
      ['L', 'Current lags voltage by 90 degrees', 'XL = omega L', 'Zero for ideal L'],
      ['C', 'Current leads voltage by 90 degrees', 'XC = 1/(omega C)', 'Zero for ideal C'],
    ],
  },
  {
    title: 'Reactance Behavior',
    columns: ['Quantity', 'Formula', 'As frequency increases', 'DC limit'],
    rows: [
      ['XL', '2 pi f L', 'Increases linearly', '0 for ideal inductor'],
      ['XC', '1/(2 pi f C)', 'Decreases non-linearly', 'Infinite for ideal capacitor'],
      ['Net reactance', 'XL - XC', 'Changes from negative to positive', 'Capacitive side at very low f'],
    ],
  },
  {
    title: 'Series LCR Summary',
    columns: ['Condition', 'Circuit nature', 'Phase', 'Current'],
    rows: [
      ['XL > XC', 'Inductive', 'Current lags voltage', 'Less than resonance value'],
      ['XL = XC', 'Resistive at resonance', 'In phase', 'Maximum'],
      ['XL < XC', 'Capacitive', 'Current leads voltage', 'Less than resonance value'],
    ],
  },
  {
    title: 'Power Factor Cases',
    columns: ['Case', 'phi', 'cos phi', 'Meaning'],
    rows: [
      ['Pure resistor', '0 degrees', '1', 'All apparent power is real power'],
      ['Pure L/C', '90 degrees', '0', 'Wattless current'],
      ['LCR off resonance', 'Between 0 and 90 degrees', 'R/Z', 'Partial real power'],
      ['LCR resonance', '0 degrees', '1', 'Unity power factor'],
    ],
  },
  {
    title: 'Resonance Conditions',
    columns: ['Quantity', 'At resonance', 'Why it matters'],
    rows: [
      ['XL and XC', 'Equal', 'Reactive voltages cancel'],
      ['Impedance', 'Minimum, Z = R', 'Current becomes maximum'],
      ['Phase angle', '0', 'Power factor becomes one'],
      ['Frequency', 'f0 = 1/(2 pi sqrt(LC))', 'Natural response point'],
    ],
  },
  {
    title: 'Transformer Types',
    columns: ['Type', 'Turns relation', 'Voltage relation', 'Current relation'],
    rows: [
      ['Step-up', 'Ns > Np', 'Vs > Vp', 'Is < Ip ideal'],
      ['Step-down', 'Ns < Np', 'Vs < Vp', 'Is > Ip ideal'],
      ['Isolation', 'Ns = Np', 'Vs = Vp', 'Current depends on load'],
    ],
  },
  {
    title: 'Transformer Losses',
    columns: ['Loss', 'Cause', 'Reduction'],
    rows: [
      ['Copper loss', 'Winding resistance', 'Thick low-resistance wire'],
      ['Eddy current loss', 'Circulating currents in core', 'Laminated core'],
      ['Hysteresis loss', 'Repeated magnetization reversal', 'Soft iron/suitable core'],
      ['Flux leakage', 'Flux not linking both coils', 'Closed core, tight coupling'],
    ],
  },
  {
    title: 'NEET vs JEE Question Patterns',
    columns: ['Area', 'NEET pattern', 'JEE Main pattern'],
    rows: [
      ['Wave values', 'Direct RMS/peak/average conversion', 'Mixed peak-RMS power use'],
      ['RLC', 'Phase and resonance facts', 'Multi-step impedance and power'],
      ['Graphs', 'Identify curve shape', 'Extract values from graph'],
      ['Transformer', 'Turns ratio and type', 'Efficiency/current/power combinations'],
    ],
  },
]

export const memoryHooks = [
  ['RMS value', 'Root, Mean, Square: square first so negative halves cannot cancel.'],
  ['Mean value', 'Mean over half uses area; mean over full symmetric cycle cancels.'],
  ['Inductor phase', 'L means Lag: current lags voltage.'],
  ['Capacitor phase', 'C means Current Comes first.'],
  ['Reactance frequency', 'L line climbs with f; C curve collapses with f.'],
  ['Resonance', 'Reactances cancel, current climbs.'],
  ['Power factor', 'Cosine of cooperation between V and I.'],
  ['Transformer', 'Turns decide voltage; current goes inverse.'],
  ['Wattless current', 'Sideways current stores and returns energy.'],
  ['Graph behavior', 'Current peak pairs with impedance dip.'],
]

export const topFormulas = [
  'v = V0 sin omega t',
  'i = I0 sin omega t',
  'omega = 2 pi f',
  'T = 1/f',
  'Vrms = V0/sqrt(2)',
  'Irms = I0/sqrt(2)',
  'Vavg = 2V0/pi over half cycle',
  'Iavg = 2I0/pi over half cycle',
  'XL = omega L',
  'XC = 1/(omega C)',
  'Z = sqrt(R^2 + (XL - XC)^2)',
  'I = V/Z',
  'tan phi = (XL - XC)/R',
  'cos phi = R/Z',
  'P = VI cos phi',
  'P = I^2R',
  'omega0 = 1/sqrt(LC)',
  'f0 = 1/(2 pi sqrt(LC))',
  'Q = omega0 L/R',
  'Q = 1/(omega0 C R)',
  'Q = f0/bandwidth',
  'Bandwidth = f2 - f1',
  'Vs/Vp = Ns/Np',
  'Is/Ip = Np/Ns',
  'Efficiency = Pout/Pin x 100 percent',
]

export const topConcepts = [
  'RMS is used because heating depends on square of current.',
  'Average AC over a complete symmetric cycle is zero.',
  'In a resistor, voltage and current are in phase.',
  'In an inductor, current lags voltage by 90 degrees.',
  'In a capacitor, current leads voltage by 90 degrees.',
  'Reactance depends on frequency because L and C respond to rate of change.',
  'Inductor blocks high-frequency AC more strongly.',
  'Capacitor blocks low-frequency AC and DC more strongly.',
  'Impedance is a vector combination of resistance and net reactance.',
  'Series resonance gives maximum current because impedance is minimum.',
  'Power factor measures useful fraction of apparent power.',
  'Wattless current carries energy back and forth without net work.',
  'Transformer works only with changing flux.',
  'Ideal transformer conserves power.',
  'Real transformer losses reduce efficiency.',
  'At resonance, phase angle becomes zero.',
  'Quality factor measures sharpness of resonance.',
  'Bandwidth is measured between half-power points.',
  'LC oscillations exchange electric and magnetic energy.',
  'Phasors convert phase differences into geometry.',
]

export const topTraps = [
  'Using average over full AC cycle as effective value.',
  'Forgetting that 220 V mains is RMS.',
  'Mixing peak voltage with RMS current in power.',
  'Writing impedance as R + XL + XC.',
  'Using XL + XC instead of XL - XC.',
  'Reversing inductor phase relation.',
  'Reversing capacitor phase relation.',
  'Thinking reactance dissipates energy like resistance.',
  'Putting R in ideal resonance frequency formula.',
  'Saying impedance is zero at resonance when R is present.',
  'Using Imax/2 instead of Imax/sqrt(2) for half-power current.',
  'Calling power factor efficiency.',
  'Thinking wattless current means no current.',
  'Applying transformer to steady DC.',
  'Saying a step-up transformer increases both voltage and current.',
]

export const topDiagrams = [
  'Sinusoidal waveform with V0, Vrms and T',
  'AC vs DC graph',
  'Resistor AC circuit',
  'Inductor AC circuit',
  'Capacitor AC circuit',
  'R, L, C phasor diagrams',
  'Series LCR circuit',
  'Impedance triangle',
  'Resonance curve with bandwidth',
  'Transformer structure with core and coils',
]

export const graphPatterns = [
  'Sine wave: repeated positive and negative halves.',
  'RMS line: 0.707 of peak.',
  'Half-cycle mean line: 0.637 of peak.',
  'XL-f: straight line through origin.',
  'XC-f: decreasing hyperbola.',
  'Current-frequency: peak at f0.',
  'Impedance-frequency: dip at f0.',
  'Power curve: can have negative portions when phase is large.',
  'High-Q resonance: narrow and tall.',
  'Bandwidth graph: f2 - f1 between half-power points.',
]

export const questionTypes = [
  'Peak-RMS conversion',
  'Half-cycle average',
  'Phase relation identification',
  'Reactance calculation',
  'LCR impedance',
  'Power factor',
  'Resonance frequency',
  'Quality factor and bandwidth',
  'Transformer turns ratio',
  'Graph interpretation',
]

export const revisionPlans = {
  thirtyMinute: [
    '0-5 min: RMS, average, reactance formulas.',
    '5-10 min: R/L/C phase table and phasor diagrams.',
    '10-16 min: LCR impedance, phase and resonance formulas.',
    '16-21 min: Power, power factor and wattless current.',
    '21-25 min: Transformer ratios and losses.',
    '25-30 min: Top traps and two quick numericals.',
  ],
  lastDay: [
    'Morning: redo all derivation final lines and diagram labels.',
    'Afternoon: solve mixed LCR, transformer and graph questions.',
    'Evening: revise mistakes log and formula sheet only.',
    'Night: no new topics; review phase table and resonance facts.',
  ],
  examHall: [
    'Write RMS/peak labels before substituting.',
    'Compare XL and XC before deciding lead/lag.',
    'Draw a quick impedance triangle for LCR.',
    'Use units to catch microfarad, millihenry and angular-frequency errors.',
    'For transformer, write voltage ratio first, then inverse current ratio.',
  ],
}

export const finalChecklist = [
  'I can derive RMS value using mean square.',
  'I can derive half-cycle average.',
  'I can draw R, L, C circuit and phasor diagrams.',
  'I can compute XL and XC with correct SI units.',
  'I can solve series LCR impedance, current, phase and power.',
  'I can explain why resonance gives maximum current.',
  'I can use Q and bandwidth correctly.',
  'I can explain LC energy exchange.',
  'I can solve ideal transformer voltage/current ratios.',
  'I can list transformer losses and remedies.',
  'I can identify every major AC graph pattern.',
  'I can avoid the top 15 traps.',
]
