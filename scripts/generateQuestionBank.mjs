import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const outFile = join(root, 'src', 'data', 'questionBank.json')
const pi = Math.PI
const fmt = (value, digits = 2) => Number(value.toFixed(digits))
const optionSet = (answer, distractors) => [answer, ...distractors].map(String)

const questions = []
const counts = {}

function add(category, item) {
  counts[category] = (counts[category] || 0) + 1
  const id = `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${String(counts[category]).padStart(3, '0')}`
  questions.push({
    id,
    category,
    difficulty: item.difficulty || (category.includes('Advanced') ? 'Hard' : category.includes('JEE') ? 'Medium' : 'Easy-Medium'),
    conceptTag: item.conceptTag,
    commonTrap: item.commonTrap,
    shortcut: item.shortcut,
    ...item,
  })
}

function neetQuestion(index) {
  const t = index % 10
  const n = Math.floor(index / 10) + 1
  if (t === 0) {
    const peak = 20 + 10 * n
    const ans = `${fmt(peak / Math.SQRT2)} V`
    return {
      type: 'MCQ',
      question: `A sinusoidal AC voltage has peak value ${peak} V. Its RMS value is closest to`,
      options: optionSet(ans, [`${peak} V`, `${fmt(2 * peak / pi)} V`, `${fmt(peak / 2)} V`]),
      answer: ans,
      solution: `For sinusoidal AC, Vrms = V0/sqrt(2) = ${peak}/sqrt(2) = ${ans}.`,
      shortcut: 'RMS = 0.707 x peak.',
      conceptTag: 'RMS value',
      commonTrap: 'Using half-cycle average instead of RMS.',
    }
  }
  if (t === 1) {
    const rms = 10 + 5 * n
    const ans = `${fmt(rms * Math.SQRT2)} A`
    return {
      type: 'MCQ',
      question: `An AC ammeter reads ${rms} A for a sinusoidal current. The peak current is`,
      options: optionSet(ans, [`${fmt(rms / Math.SQRT2)} A`, `${2 * rms} A`, `${fmt(2 * rms / pi)} A`]),
      answer: ans,
      solution: `AC ammeters read RMS. I0 = Irms sqrt(2) = ${rms}sqrt(2) = ${ans}.`,
      shortcut: 'Peak = 1.414 x RMS.',
      conceptTag: 'Peak and RMS',
      commonTrap: 'Treating meter reading as peak value.',
    }
  }
  if (t === 2) {
    const multiple = 40 + 20 * n
    const ans = `${multiple / 2} Hz`
    return {
      type: 'MCQ',
      question: `For v = V0 sin(${multiple} pi t), the frequency of AC is`,
      options: optionSet(ans, [`${multiple} Hz`, `${multiple * 2} Hz`, `${fmt(multiple / (2 * pi))} Hz`]),
      answer: ans,
      solution: `Compare omega = ${multiple} pi with omega = 2 pi f. Hence f = ${multiple}/2 = ${multiple / 2} Hz.`,
      shortcut: 'Coefficient of pi in omega divided by 2 gives f.',
      conceptTag: 'Angular frequency',
      commonTrap: 'Forgetting omega = 2 pi f.',
    }
  }
  if (t === 3) {
    const l = 0.05 * n
    const ans = `${fmt(2 * pi * 50 * l)} ohm`
    return {
      type: 'MCQ',
      question: `The inductive reactance of a ${fmt(l)} H inductor at 50 Hz is closest to`,
      options: optionSet(ans, [`${fmt(50 * l)} ohm`, `${fmt(1 / (2 * pi * 50 * l))} ohm`, `${fmt(2 * pi * l)} ohm`]),
      answer: ans,
      solution: `XL = 2 pi f L = 2 pi x 50 x ${fmt(l)} = ${ans}.`,
      shortcut: 'Inductive reactance grows directly with f and L.',
      conceptTag: 'Inductive reactance',
      commonTrap: 'Using capacitive reactance formula for inductor.',
    }
  }
  if (t === 4) {
    const cMicro = 20 * n
    const ans = `${fmt(1 / (2 * pi * 50 * cMicro * 1e-6))} ohm`
    return {
      type: 'MCQ',
      question: `A capacitor of ${cMicro} microF is connected to 50 Hz AC. Its capacitive reactance is closest to`,
      options: optionSet(ans, [`${fmt(2 * pi * 50 * cMicro * 1e-6)} ohm`, `${fmt(cMicro / 50)} ohm`, `${fmt(50 / cMicro)} ohm`]),
      answer: ans,
      solution: `XC = 1/(2 pi f C). Convert ${cMicro} microF to ${cMicro} x 10^-6 F, then substitute.`,
      shortcut: 'Convert microfarad to farad before calculating XC.',
      conceptTag: 'Capacitive reactance',
      commonTrap: 'Forgetting micro = 10^-6.',
    }
  }
  if (t === 5) {
    const element = ['resistor', 'inductor', 'capacitor'][n % 3]
    const answer = element === 'resistor' ? 'Voltage and current are in phase' : element === 'inductor' ? 'Current lags voltage by 90 degrees' : 'Current leads voltage by 90 degrees'
    return {
      type: 'MCQ',
      question: `In a pure ${element} AC circuit, the correct phase relation is`,
      options: optionSet(answer, ['Current and voltage are always opposite', 'Average current is always positive', 'Voltage has no phase']),
      answer,
      solution: `Pure R has zero phase difference, pure L has current lagging by 90 degrees, and pure C has current leading by 90 degrees.`,
      shortcut: 'R together, L lag, C current comes first.',
      conceptTag: 'RLC phase relation',
      commonTrap: 'Reversing lead and lag.',
    }
  }
  if (t === 6) {
    return {
      type: 'MCQ',
      question: 'At resonance in a series LCR circuit, which statement is correct?',
      options: optionSet('XL = XC and current is maximum', ['XL = 0 and current is zero', 'XC = 0 and impedance is infinite', 'Power factor is zero']),
      answer: 'XL = XC and current is maximum',
      solution: 'At resonance, inductive and capacitive reactances cancel, Z = R and current becomes maximum.',
      shortcut: 'Resonance = reactance cancellation.',
      conceptTag: 'Series resonance',
      commonTrap: 'Saying impedance is zero even when R is present.',
    }
  }
  if (t === 7) {
    const vp = 100 + 20 * n
    const np = 100
    const ns = 100 + 50 * n
    const ans = `${fmt(vp * ns / np)} V`
    return {
      type: 'MCQ',
      question: `An ideal transformer has Np = ${np}, Ns = ${ns} and Vp = ${vp} V. The secondary voltage is`,
      options: optionSet(ans, [`${fmt(vp * np / ns)} V`, `${vp} V`, `${fmt(vp + ns - np)} V`]),
      answer: ans,
      solution: `Vs/Vp = Ns/Np, so Vs = ${vp} x ${ns}/${np} = ${ans}.`,
      shortcut: 'Voltage follows turns.',
      conceptTag: 'Transformer ratio',
      commonTrap: 'Reversing turns ratio.',
    }
  }
  if (t === 8) {
    const v = 100 + 20 * n
    const i = 2
    const pf = 0.5 + 0.05 * (n % 5)
    const ans = `${fmt(v * i * pf)} W`
    return {
      type: 'MCQ',
      question: `An AC circuit has Vrms = ${v} V, Irms = ${i} A and power factor ${fmt(pf)}. Average power is`,
      options: optionSet(ans, [`${v * i} W`, `${fmt(v * pf)} W`, `${fmt(i * pf)} W`]),
      answer: ans,
      solution: `P = VI cos phi = ${v} x ${i} x ${fmt(pf)} = ${ans}.`,
      shortcut: 'Average AC power = apparent power x power factor.',
      conceptTag: 'AC power',
      commonTrap: 'Forgetting the power factor.',
    }
  }
  const peak = 10 + 2 * n
  const ans = `${fmt(2 * peak / pi)} A`
  return {
    type: 'MCQ',
    question: `The mean value over a positive half cycle of i = ${peak} sin omega t ampere is`,
    options: optionSet(ans, [`${fmt(peak / Math.SQRT2)} A`, '0 A', `${peak} A`]),
    answer: ans,
    solution: `For a sine wave, half-cycle mean = 2I0/pi = 2 x ${peak}/pi = ${ans}.`,
    shortcut: 'Half-cycle mean = 0.637 x peak.',
    conceptTag: 'Mean value',
    commonTrap: 'Using full-cycle average zero.',
  }
}

function jeeQuestion(index) {
  const t = index % 10
  const n = Math.floor(index / 10) + 1
  if (t === 0) {
    const scale = n
    const r = 3 * scale
    const net = 4 * scale
    const z = 5 * scale
    return {
      type: 'Numerical MCQ',
      question: `In a series LCR circuit, R = ${r} ohm and XL - XC = ${net} ohm. Find impedance.`,
      options: optionSet(`${z} ohm`, [`${r + net} ohm`, `${Math.abs(net - r)} ohm`, `${fmt(Math.sqrt(r * r + (2 * net) ** 2))} ohm`]),
      answer: `${z} ohm`,
      solution: `Z = sqrt(R^2 + (XL-XC)^2) = sqrt(${r}^2 + ${net}^2) = ${z} ohm.`,
      shortcut: 'Recognize 3-4-5 triangle.',
      conceptTag: 'Impedance',
      commonTrap: 'Adding R and net reactance directly.',
    }
  }
  if (t === 1) {
    const v = 100 + 10 * n
    const z = 50 + 5 * n
    return {
      type: 'Numerical MCQ',
      question: `An LCR circuit has RMS voltage ${v} V and impedance ${z} ohm. RMS current is`,
      options: optionSet(`${fmt(v / z)} A`, [`${fmt(v * z)} A`, `${fmt(z / v)} A`, `${fmt(v / (z * Math.SQRT2))} A`]),
      answer: `${fmt(v / z)} A`,
      solution: `Use RMS relation I = V/Z = ${v}/${z} = ${fmt(v / z)} A.`,
      shortcut: 'Ohm-like relation uses impedance.',
      conceptTag: 'LCR current',
      commonTrap: 'Dividing by sqrt(2) again when voltage is already RMS.',
    }
  }
  if (t === 2) {
    const r = 20
    const net = 20 * n
    const angle = fmt(Math.atan(net / r) * 180 / pi)
    return {
      type: 'Numerical MCQ',
      question: `For R = ${r} ohm and XL - XC = ${net} ohm, phase angle phi is closest to`,
      options: optionSet(`${angle} degrees`, [`${fmt(Math.atan(r / net) * 180 / pi)} degrees`, '0 degrees', '90 degrees']),
      answer: `${angle} degrees`,
      solution: `tan phi = (XL-XC)/R = ${net}/${r}. Hence phi = tan^-1(${fmt(net / r)}) = ${angle} degrees.`,
      shortcut: 'Use impedance triangle tangent.',
      conceptTag: 'Phase angle',
      commonTrap: 'Using R/(XL-XC) instead of opposite/base.',
    }
  }
  if (t === 3) {
    const l = 0.1 * n
    const c = 100e-6 / n
    const f0 = 1 / (2 * pi * Math.sqrt(l * c))
    return {
      type: 'Numerical MCQ',
      question: `For L = ${fmt(l)} H and C = ${fmt(c * 1e6)} microF, resonant frequency is closest to`,
      options: optionSet(`${fmt(f0)} Hz`, [`${fmt(2 * pi * Math.sqrt(l * c))} Hz`, `${fmt(1 / Math.sqrt(l * c))} Hz`, `${fmt(Math.sqrt(l / c))} Hz`]),
      answer: `${fmt(f0)} Hz`,
      solution: `f0 = 1/(2 pi sqrt(LC)). Substitute SI values to get ${fmt(f0)} Hz.`,
      shortcut: 'Use farad, not microfarad, in LC.',
      conceptTag: 'Resonant frequency',
      commonTrap: 'Forgetting 2 pi or micro conversion.',
    }
  }
  if (t === 4) {
    const w0 = 1000
    const l = 0.1 * n
    const r = 10 * n
    const q = fmt(w0 * l / r)
    return {
      type: 'Numerical MCQ',
      question: `A series LCR circuit has omega0 = ${w0} rad s^-1, L = ${fmt(l)} H and R = ${r} ohm. Q factor is`,
      options: optionSet(`${q}`, [`${fmt(r / (w0 * l))}`, `${fmt(w0 * r / l)}`, `${fmt(l / r)}`]),
      answer: `${q}`,
      solution: `Q = omega0 L/R = ${w0} x ${fmt(l)}/${r} = ${q}.`,
      shortcut: 'Q is reactance at resonance divided by R.',
      conceptTag: 'Quality factor',
      commonTrap: 'Inverting the Q formula.',
    }
  }
  if (t === 5) {
    const f0 = 1000 + 100 * n
    const q = 5 + n
    const bw = fmt(f0 / q)
    return {
      type: 'Numerical MCQ',
      question: `If f0 = ${f0} Hz and Q = ${q}, bandwidth is`,
      options: optionSet(`${bw} Hz`, [`${f0 * q} Hz`, `${q / f0} Hz`, `${fmt(f0 / (2 * q))} Hz`]),
      answer: `${bw} Hz`,
      solution: `Q = f0/bandwidth, so bandwidth = f0/Q = ${f0}/${q} = ${bw} Hz.`,
      shortcut: 'Bandwidth is inverse with Q.',
      conceptTag: 'Bandwidth',
      commonTrap: 'Multiplying f0 and Q.',
    }
  }
  if (t === 6) {
    const ip = 4
    const np = 200
    const ns = 50 * n
    const is = fmt(ip * np / ns)
    return {
      type: 'Numerical MCQ',
      question: `An ideal transformer has Np = ${np}, Ns = ${ns}, Ip = ${ip} A. Secondary current is`,
      options: optionSet(`${is} A`, [`${fmt(ip * ns / np)} A`, `${ip} A`, `${fmt(ip * np * ns)} A`]),
      answer: `${is} A`,
      solution: `For ideal transformer, Is/Ip = Np/Ns. Is = ${ip} x ${np}/${ns} = ${is} A.`,
      shortcut: 'Current ratio is inverse of turns ratio.',
      conceptTag: 'Transformer current',
      commonTrap: 'Using same ratio as voltage.',
    }
  }
  if (t === 7) {
    const current = 2 + n
    const r = 10
    const power = current * current * r
    return {
      type: 'Numerical MCQ',
      question: `In a series LCR circuit, RMS current is ${current} A and R = ${r} ohm. Average power is`,
      options: optionSet(`${power} W`, [`${current * r} W`, `${fmt(power / 2)} W`, '0 W']),
      answer: `${power} W`,
      solution: `Only R dissipates average power. P = I^2R = ${current}^2 x ${r} = ${power} W.`,
      shortcut: 'For series LCR, P = I^2R is fastest.',
      conceptTag: 'AC power in LCR',
      commonTrap: 'Including ideal L and C in real power loss.',
    }
  }
  if (t === 8) {
    const cMicro = 10 * n
    const v = 100
    const energy = fmt(0.5 * cMicro * 1e-6 * v * v, 4)
    return {
      type: 'Numerical MCQ',
      question: `A capacitor ${cMicro} microF is charged to ${v} V in an LC circuit. Maximum electric energy is`,
      options: optionSet(`${energy} J`, [`${fmt(cMicro * 1e-6 * v * v, 4)} J`, `${fmt(0.5 * cMicro * v * v, 2)} J`, `${fmt(0.5 * v * v / (cMicro * 1e-6), 2)} J`]),
      answer: `${energy} J`,
      solution: `U = (1/2)CV^2 = 0.5 x ${cMicro} x 10^-6 x ${v}^2 = ${energy} J.`,
      shortcut: 'Use C in farad.',
      conceptTag: 'LC energy',
      commonTrap: 'Using microfarad as farad.',
    }
  }
  const r = 40
  const z = 50 + 5 * n
  const pf = fmt(r / z)
  return {
    type: 'Numerical MCQ',
    question: `A series AC circuit has R = ${r} ohm and Z = ${z} ohm. Power factor is`,
    options: optionSet(`${pf}`, [`${fmt(z / r)}`, `${fmt((z - r) / z)}`, `${fmt(r * z)}`]),
    answer: `${pf}`,
    solution: `Power factor cos phi = R/Z = ${r}/${z} = ${pf}.`,
    shortcut: 'Power factor is adjacent/hypotenuse in impedance triangle.',
    conceptTag: 'Power factor',
    commonTrap: 'Using Z/R instead of R/Z.',
  }
}

const advancedPrompts = [
  ['Why can current be maximum at resonance even though inductor and capacitor voltages may be large?', 'Because VL and VC are opposite in phase and cancel in source voltage; net impedance is only R.'],
  ['Why is impedance not a simple sum of R, XL and XC?', 'R voltage is in phase with current while reactive voltages are perpendicular in phasor space.'],
  ['Why does RMS survive sign reversal but average does not?', 'RMS squares the waveform before averaging, so positive and negative halves both contribute.'],
  ['Why can a capacitor pass AC but block DC ideally?', 'AC repeatedly charges and discharges plates; steady DC stops after charging is complete.'],
  ['Why does an inductor oppose high frequency more?', 'Higher frequency demands faster current change, producing larger back emf.'],
  ['Why does transformer current ratio invert the turns ratio?', 'Ideal power conservation requires higher voltage side to carry lower current.'],
  ['Why does poor power factor increase line current?', 'For fixed real power, I = P/(V cos phi), so smaller cos phi requires larger current.'],
  ['Why are half-power points defined using Imax/sqrt(2)?', 'Power is proportional to I^2, so half power corresponds to current reduced by sqrt(2).'],
  ['Why is LC oscillation called natural while LCR resonance is driven?', 'LC oscillates at its own frequency after initial energy; resonance is maximum response to external AC driving.'],
  ['Why can reactive power be important if average power is zero?', 'It increases current and voltage drops while energy circulates between source and fields.'],
]

function addAdvanced(index) {
  const [question, answer] = advancedPrompts[index % advancedPrompts.length]
  add('JEE Advanced Conceptual', {
    type: 'Conceptual',
    question: `${question} Context set ${Math.floor(index / advancedPrompts.length) + 1}.`,
    answer,
    solution: `${answer} This follows from phase, energy storage and phasor geometry rather than scalar DC thinking.`,
    shortcut: 'Draw the phasor or energy picture before algebra.',
    conceptTag: 'Advanced conceptual AC',
    commonTrap: 'Using DC intuition in phase-dependent AC behavior.',
  })
}

const arBank = [
  ['Assertion: RMS value is used for AC heating calculations.', 'Reason: Heating effect is proportional to square of current.', 'Both A and R are true and R explains A.'],
  ['Assertion: Pure inductor consumes zero average power.', 'Reason: Current lags voltage by 90 degrees.', 'Both A and R are true and R explains A.'],
  ['Assertion: Transformer works on steady DC.', 'Reason: Steady DC produces changing magnetic flux.', 'Both A and R are false.'],
  ['Assertion: At series resonance current is maximum.', 'Reason: Impedance becomes minimum and equals R.', 'Both A and R are true and R explains A.'],
  ['Assertion: Capacitive reactance decreases with frequency.', 'Reason: XC = 1/(omega C).', 'Both A and R are true and R explains A.'],
  ['Assertion: Power factor is efficiency.', 'Reason: Power factor equals cos phi.', 'A is false but R is true.'],
]

function addAssertion(index) {
  const [assertion, reason, answer] = arBank[index % arBank.length]
  add('Assertion-Reason', {
    type: 'Assertion-Reason',
    question: `${assertion} ${reason}`,
    options: ['Both A and R are true and R explains A', 'Both A and R are true but R does not explain A', 'A is true but R is false', 'A is false but R is true', 'Both A and R are false'],
    answer,
    solution: `Evaluate the assertion and reason independently, then check explanation link. Correct choice: ${answer}.`,
    shortcut: 'Test truth first, explanation second.',
    conceptTag: 'Assertion reasoning',
    commonTrap: 'Selecting explanation just because both statements sound related.',
  })
}

function addInteger(index) {
  const t = index % 5
  const n = Math.floor(index / 5) + 1
  if (t === 0) {
    const peak = 14 * n * Math.SQRT2
    add('Integer-Type', {
      type: 'Integer',
      question: `Peak current is ${fmt(peak)} A. Find RMS current to nearest integer.`,
      answer: `${14 * n}`,
      solution: `Irms = I0/sqrt(2) = ${fmt(peak)}/sqrt(2) = ${14 * n}.`,
      shortcut: 'Divide peak by sqrt(2).',
      conceptTag: 'RMS integer',
      commonTrap: 'Rounding before dividing.',
    })
  } else if (t === 1) {
    add('Integer-Type', {
      type: 'Integer',
      question: `A transformer has Np = ${100 * n}, Ns = ${200 * n}, Vp = 50 V. Find Vs in volt.`,
      answer: '100',
      solution: `Vs = Vp Ns/Np = 50 x 2 = 100 V.`,
      shortcut: 'Voltage follows turns.',
      conceptTag: 'Transformer integer',
      commonTrap: 'Using inverse ratio.',
    })
  } else if (t === 2) {
    add('Integer-Type', {
      type: 'Integer',
      question: `R = ${3 * n} ohm and XL - XC = ${4 * n} ohm. Find Z in ohm.`,
      answer: `${5 * n}`,
      solution: `Use 3-4-5 triangle: Z = ${5 * n} ohm.`,
      shortcut: 'Spot Pythagorean triples.',
      conceptTag: 'Impedance integer',
      commonTrap: 'Adding sides.',
    })
  } else if (t === 3) {
    add('Integer-Type', {
      type: 'Integer',
      question: `If f0 = ${600 + 100 * n} Hz and Q = ${6 + n}, find bandwidth to nearest integer.`,
      answer: `${Math.round((600 + 100 * n) / (6 + n))}`,
      solution: `Bandwidth = f0/Q = ${(600 + 100 * n)}/${6 + n}.`,
      shortcut: 'Bandwidth = f0 divided by Q.',
      conceptTag: 'Bandwidth integer',
      commonTrap: 'Multiplying by Q.',
    })
  } else {
    add('Integer-Type', {
      type: 'Integer',
      question: `Current is ${n + 1} A RMS through R = 10 ohm in series LCR. Find average power in watt.`,
      answer: `${(n + 1) ** 2 * 10}`,
      solution: `P = I^2R = ${n + 1}^2 x 10.`,
      shortcut: 'Only R dissipates average power.',
      conceptTag: 'Power integer',
      commonTrap: 'Using total impedance for dissipated resistance.',
    })
  }
}

const matchSets = [
  [['Pure R', 'Pure L', 'Pure C', 'Resonance'], ['phi = 0', 'current lags', 'current leads', 'XL = XC']],
  [['XL', 'XC', 'Z', 'Power factor'], ['omega L', '1/(omega C)', 'sqrt(R^2+(XL-XC)^2)', 'R/Z']],
  [['Step-up', 'Step-down', 'Copper loss', 'Eddy loss'], ['Ns > Np', 'Ns < Np', 'I^2R heating', 'core circulating currents']],
  [['RMS', 'Half-cycle mean', 'Full-cycle mean', 'Peak'], ['V0/sqrt(2)', '2V0/pi', '0 for symmetric sine', 'maximum value']],
]

function addMatch(index) {
  const [left, right] = matchSets[index % matchSets.length]
  add('Match-the-Column', {
    type: 'Match',
    question: `Match Column I with Column II for AC concepts. Set ${index + 1}.`,
    columnI: left,
    columnII: right,
    answer: left.map((item, i) => `${item} -> ${right[i]}`).join('; '),
    solution: 'Each pair follows the standard definition or formula from AC circuits.',
    shortcut: 'Pair formulas first, then phase relations.',
    conceptTag: 'Matching AC facts',
    commonTrap: 'Pairing transformer current and voltage ratios in same direction.',
  })
}

const graphQuestions = [
  ['Which graph is a straight line through origin: XL-f or XC-f?', 'XL-f', 'XL = 2 pi f L is directly proportional to frequency.'],
  ['In current-frequency graph of series LCR, what happens at f0?', 'Current is maximum', 'At f0 impedance is minimum and equals R.'],
  ['In impedance-frequency graph, what is value at resonance?', 'Z = R', 'Reactances cancel at resonance.'],
  ['Half-power points correspond to which current?', 'Imax/sqrt(2)', 'Power is proportional to I^2.'],
]

function addGraph(index) {
  const [question, answer, solution] = graphQuestions[index % graphQuestions.length]
  add('Graph-Based', {
    type: 'Graph',
    question: `${question} Graph set ${Math.floor(index / graphQuestions.length) + 1}.`,
    answer,
    solution,
    shortcut: 'Read axes, then use limiting cases.',
    conceptTag: 'AC graphs',
    commonTrap: 'Confusing current peak with impedance peak.',
  })
}

const circuitQuestions = [
  ['A series circuit has R, L and C. Is current same through all elements?', 'Yes, same RMS current flows through all series elements.', 'Series circuit has one path for current.'],
  ['Which element should be used as a low-loss AC current limiter?', 'Choke coil', 'A choke uses inductive reactance with small resistance.'],
  ['What is net nature if XL > XC?', 'Inductive', 'Positive net reactance means current lags voltage.'],
  ['Why is resistor power non-zero in AC?', 'Because heat depends on i^2, whose average is not zero.', 'Positive and negative current both heat the resistor.'],
]

function addCircuit(index) {
  const [question, answer, solution] = circuitQuestions[index % circuitQuestions.length]
  add('Circuit-Based', {
    type: 'Circuit',
    question: `${question} Circuit set ${Math.floor(index / circuitQuestions.length) + 1}.`,
    answer,
    solution,
    shortcut: 'Identify element behavior before formula use.',
    conceptTag: 'AC circuits',
    commonTrap: 'Assigning different currents to series elements.',
  })
}

const phasorQuestions = [
  ['In pure L phasor diagram with current as reference, where is voltage?', '90 degrees ahead/upward', 'Inductor voltage leads current.'],
  ['In pure C phasor diagram with current as reference, where is voltage?', '90 degrees behind/downward', 'Capacitor current leads voltage, so voltage lags current.'],
  ['What side of impedance triangle gives power factor?', 'R/Z', 'Power factor is adjacent over hypotenuse.'],
  ['What does vertical current component represent in wattless-current diagram?', 'Reactive or wattless current', 'It is perpendicular to voltage and gives no average power.'],
]

function addPhasor(index) {
  const [question, answer, solution] = phasorQuestions[index % phasorQuestions.length]
  add('Phasor-Based', {
    type: 'Phasor',
    question: `${question} Phasor set ${Math.floor(index / phasorQuestions.length) + 1}.`,
    answer,
    solution,
    shortcut: 'Take current as reference unless stated otherwise.',
    conceptTag: 'Phasors',
    commonTrap: 'Reversing lead and lag when reference changes.',
  })
}

function addCase(index) {
  const r = 30 + 5 * index
  const xl = 80 + 4 * index
  const xc = 40 + 2 * index
  const z = fmt(Math.sqrt(r * r + (xl - xc) ** 2))
  const current = fmt(200 / z)
  add('Case-Based', {
    type: 'Case',
    caseText: `A student studies a series LCR circuit connected to a 200 V RMS AC source. For setting ${index + 1}, R = ${r} ohm, XL = ${xl} ohm and XC = ${xc} ohm.`,
    question: 'Answer the subparts based on the circuit data.',
    subquestions: [
      { question: 'Find net reactance.', answer: `${xl - xc} ohm`, solution: `XL - XC = ${xl} - ${xc} = ${xl - xc} ohm.` },
      { question: 'Find impedance.', answer: `${z} ohm`, solution: `Z = sqrt(${r}^2 + ${xl - xc}^2) = ${z} ohm.` },
      { question: 'Find RMS current.', answer: `${current} A`, solution: `I = V/Z = 200/${z} = ${current} A.` },
    ],
    answer: `Net reactance ${xl - xc} ohm, Z ${z} ohm, current ${current} A.`,
    solution: 'Use the standard LCR chain: reactance difference, impedance triangle, then current.',
    shortcut: 'LCR case questions usually follow XL-XC -> Z -> I -> phi/P.',
    conceptTag: 'Case-based LCR',
    commonTrap: 'Using XL + XC instead of XL - XC.',
  })
}

for (let i = 0; i < 100; i += 1) add('NEET MCQ', neetQuestion(i))
for (let i = 0; i < 100; i += 1) add('JEE Main MCQ/Numerical', jeeQuestion(i))
for (let i = 0; i < 30; i += 1) addAdvanced(i)
for (let i = 0; i < 30; i += 1) addAssertion(i)
for (let i = 0; i < 30; i += 1) addInteger(i)
for (let i = 0; i < 20; i += 1) addMatch(i)
for (let i = 0; i < 20; i += 1) addGraph(i)
for (let i = 0; i < 20; i += 1) addCircuit(i)
for (let i = 0; i < 20; i += 1) addPhasor(i)
for (let i = 0; i < 10; i += 1) addCase(i)

const payload = {
  meta: {
    title: 'Original AC Practice Question Bank',
    chapter: 'NCERT Class 12 Physics Chapter 7 - Alternating Current',
    totalQuestions: questions.length,
    counts,
    generatedFor: ['CBSE Boards', 'NEET', 'JEE Main', 'JEE Advanced conceptual foundation'],
    licenseNote: 'Original generated educational questions. No copied coaching or previous-year content.',
  },
  questions,
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Wrote ${questions.length} questions to ${outFile}`)
