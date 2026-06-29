import { useMemo, useState } from 'react'
import { Activity, BatteryCharging, CircuitBoard, Gauge, RadioTower, SlidersHorizontal, Zap } from 'lucide-react'
import { DiagramRenderer, LcrMeter, MiniWave } from './PhysicsDiagrams'
import { AlertBox, ConceptCard, FormulaBox, SectionShell } from './ui'

export default function Simulations() {
  return (
    <SectionShell
      id="simulations"
      eyebrow="Interactive simulation lab"
      title="Eight frontend-only AC simulations."
      description="All simulations use local React state and SVG math. No paid API, backend, database or external asset is required."
      tone="tint"
    >
      <div className="grid gap-6">
        <SineGenerator />
        <RmsExplorer />
        <PhaseCircuitSim type="resistor" title="Resistor AC Circuit Simulation" phase={0} insight="Voltage and current remain in phase, so power factor is one." ask="NEET/JEE can ask graph overlap, zero phase difference and P = VI for pure R." />
        <PhaseCircuitSim type="inductor" title="Inductor AC Circuit Simulation" phase={-Math.PI / 2} insight="Current lags voltage by 90 degrees because inductor opposes change in current." ask="Questions ask XL = omega L, current lag and zero average power for pure L." />
        <PhaseCircuitSim type="capacitor" title="Capacitor AC Circuit Simulation" phase={Math.PI / 2} insight="Current leads voltage by 90 degrees because capacitor current depends on dv/dt." ask="Questions ask XC = 1/(omega C), current lead and DC blocking." />
        <LcrExplorer />
        <ResonanceSimulator />
        <TransformerSimulator />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={SlidersHorizontal} kicker="Controls" title="Student-friendly sliders" color="blue">Every simulator exposes only the quantities a student naturally changes in exam problems.</ConceptCard>
        <ConceptCard icon={CircuitBoard} kicker="Circuits" title="SVG-drawn systems" color="amber">R, L, C, LCR and transformer visuals are code-generated and responsive.</ConceptCard>
        <ConceptCard icon={Gauge} kicker="Outputs" title="Numerical feedback" color="teal">Impedance, RMS, phase, resonance and transformer outputs update live.</ConceptCard>
        <ConceptCard icon={Zap} kicker="Exam angle" title="NEET/JEE boxes" color="orange">Every simulation includes a short exam-facing takeaway.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function SimulationCard({ title, icon: Icon = Activity, children, explanation, insight, ask }) {
  return (
    <article className="glass-card overflow-hidden">
      <div className="border-b border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[.04] md:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-300/12 dark:text-amber-200"><Icon size={20} /></span>
          <h3 className="text-xl font-black tracking-tight text-ink dark:text-white">{title}</h3>
        </div>
      </div>
      <div className="grid gap-5 p-5 md:p-6">
        {children}
        <p className="text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{explanation}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <AlertBox title="Exam insight" tone="meaning">{insight}</AlertBox>
          <AlertBox title="What NEET/JEE can ask" tone="neet">{ask}</AlertBox>
        </div>
      </div>
    </article>
  )
}

function Slider({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <label className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{label}</span>
        <strong className="font-mono text-sm text-ink dark:text-white">{value}{unit}</strong>
      </div>
      <input className="range-control" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function SineGenerator() {
  const [amplitude, setAmplitude] = useState(80)
  const [frequency, setFrequency] = useState(2)
  const [phaseDeg, setPhaseDeg] = useState(0)
  return (
    <SimulationCard
      title="AC Sine Wave Generator"
      icon={Activity}
      explanation="Change amplitude, frequency and phase to see how a sinusoidal AC source is described by v = V0 sin(omega t + phi)."
      insight="Amplitude changes peak value; frequency changes cycles per second; phase shifts the graph horizontally."
      ask="NEET asks peak/frequency from equation. JEE asks phase shift and angular frequency interpretation."
    >
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="grid gap-3">
          <Slider label="Amplitude" value={amplitude} min={20} max={120} unit=" V" onChange={setAmplitude} />
          <Slider label="Frequency cycles" value={frequency} min={1} max={5} onChange={setFrequency} />
          <Slider label="Phase" value={phaseDeg} min={-180} max={180} step={15} unit=" deg" onChange={setPhaseDeg} />
        </div>
        <div className="visual-panel">
          <MiniWave amplitude={amplitude / 2} frequency={frequency} phase={phaseDeg * Math.PI / 180} color="#2563eb" label={`v = ${amplitude} sin(omega t + ${phaseDeg} deg)`} />
        </div>
      </div>
    </SimulationCard>
  )
}

function RmsExplorer() {
  const [peak, setPeak] = useState(100)
  const rms = peak / Math.SQRT2
  const mean = 2 * peak / Math.PI
  return (
    <SimulationCard
      title="RMS vs Peak Value Explorer"
      icon={Gauge}
      explanation="RMS is the value of DC that would produce the same heating in a resistor as this AC sine wave."
      insight="For a sine wave, RMS is 0.707 times peak and half-cycle mean is 0.637 times peak."
      ask="Direct questions ask peak from RMS, RMS from peak, or why RMS is preferred over average."
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
          <Slider label="Peak value" value={peak} min={10} max={400} step={5} unit=" V" onChange={setPeak} />
          <FormulaBox title="Output values">
            Vrms = {rms.toFixed(2)} V<br />
            Half-cycle mean = {mean.toFixed(2)} V
          </FormulaBox>
        </div>
        <div className="visual-panel">
          <DiagramRenderer type="rms" />
        </div>
      </div>
    </SimulationCard>
  )
}

function PhaseCircuitSim({ type, title, phase, insight, ask }) {
  const diagramType = type === 'resistor' ? 'resistor-circuit' : type === 'inductor' ? 'inductor-circuit' : 'capacitor-circuit'
  const phaseType = type === 'resistor' ? 'phase-zero' : type === 'inductor' ? 'phase-lag' : 'phase-lead'
  return (
    <SimulationCard
      title={title}
      icon={CircuitBoard}
      explanation={`The circuit panel shows a pure ${type} connected to an AC source. The waveform panel shows voltage and current phase relation.`}
      insight={insight}
      ask={ask}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="visual-panel"><DiagramRenderer type={diagramType} /></div>
        <div className="visual-panel"><DiagramRenderer type={phaseType} /></div>
      </div>
    </SimulationCard>
  )
}

function LcrExplorer() {
  const [r, setR] = useState(40)
  const [lMilli, setL] = useState(120)
  const [cMicro, setC] = useState(80)
  const [frequency, setFrequency] = useState(50)
  const l = lMilli / 1000
  const c = cMicro / 1_000_000
  const omega = 2 * Math.PI * frequency
  const xl = omega * l
  const xc = 1 / (omega * c)
  const z = Math.sqrt(r * r + (xl - xc) ** 2)
  const current = 220 / z
  const phi = Math.atan2(xl - xc, r) * 180 / Math.PI
  const nature = Math.abs(xl - xc) < 1 ? 'near resonance' : xl > xc ? 'inductive' : 'capacitive'
  return (
    <SimulationCard
      title="Series LCR Circuit Explorer"
      icon={SlidersHorizontal}
      explanation="Move R, L, C and frequency to see how reactances create impedance, current and phase angle."
      insight="At resonance XL = XC, Z becomes R and current becomes maximum."
      ask="JEE Main can combine XL, XC, Z, current, phase angle and power factor in one numerical."
    >
      <div className="grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
        <div className="grid gap-3">
          <Slider label="R" value={r} min={5} max={150} unit=" ohm" onChange={setR} />
          <Slider label="L" value={lMilli} min={10} max={500} unit=" mH" onChange={setL} />
          <Slider label="C" value={cMicro} min={10} max={300} unit=" microF" onChange={setC} />
          <Slider label="Frequency" value={frequency} min={10} max={300} unit=" Hz" onChange={setFrequency} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="visual-panel"><LcrMeter r={r} l={l} c={c} f={frequency} /></div>
          <div className="flat-card">
            <p className="micro-label">Live outputs at 220 V RMS</p>
            <div className="mt-4 grid gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
              <p>XL = {xl.toFixed(2)} ohm</p>
              <p>XC = {xc.toFixed(2)} ohm</p>
              <p>Z = {z.toFixed(2)} ohm</p>
              <p>I = {current.toFixed(2)} A</p>
              <p>phi = {phi.toFixed(2)} degrees</p>
              <p>Nature = {nature}</p>
            </div>
          </div>
        </div>
      </div>
    </SimulationCard>
  )
}

function ResonanceSimulator() {
  const [r, setR] = useState(35)
  const [lMilli, setL] = useState(100)
  const [cMicro, setC] = useState(100)
  const l = lMilli / 1000
  const c = cMicro / 1_000_000
  const f0 = 1 / (2 * Math.PI * Math.sqrt(l * c))
  const q = (2 * Math.PI * f0 * l) / r
  const bandwidth = f0 / q
  return (
    <SimulationCard
      title="Resonance Simulator"
      icon={RadioTower}
      explanation="The resonance curve centers at f0, where inductive and capacitive reactances cancel."
      insight="Lower resistance makes resonance sharper and increases quality factor."
      ask="JEE asks f0, Q, bandwidth and graph interpretation; NEET asks condition XL = XC and current maximum."
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
          <Slider label="R" value={r} min={5} max={150} unit=" ohm" onChange={setR} />
          <Slider label="L" value={lMilli} min={20} max={500} unit=" mH" onChange={setL} />
          <Slider label="C" value={cMicro} min={20} max={300} unit=" microF" onChange={setC} />
          <FormulaBox title="Resonance output">
            f0 = {f0.toFixed(2)} Hz<br />
            Q = {q.toFixed(2)}<br />
            Bandwidth = {bandwidth.toFixed(2)} Hz
          </FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type={q > 4 ? 'quality' : 'resonance'} /></div>
      </div>
    </SimulationCard>
  )
}

function TransformerSimulator() {
  const [np, setNp] = useState(200)
  const [ns, setNs] = useState(500)
  const [vp, setVp] = useState(120)
  const vs = vp * ns / np
  const type = ns > np ? 'Step-up' : ns < np ? 'Step-down' : 'Isolation'
  const idealCurrentMessage = ns > np ? 'secondary current decreases ideally' : ns < np ? 'secondary current increases ideally' : 'current depends on load'
  return (
    <SimulationCard
      title="Transformer Simulator"
      icon={BatteryCharging}
      explanation="An ideal transformer changes RMS AC voltage in the same ratio as secondary turns to primary turns."
      insight="Voltage follows turns; current follows the inverse ratio because ideal power is conserved."
      ask="NEET asks transformer type and voltage ratio; JEE asks current ratio, power and losses."
    >
      <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
        <div className="grid gap-3">
          <Slider label="Primary turns Np" value={np} min={50} max={1000} step={10} onChange={setNp} />
          <Slider label="Secondary turns Ns" value={ns} min={50} max={1200} step={10} onChange={setNs} />
          <Slider label="Primary voltage Vp" value={vp} min={20} max={500} step={10} unit=" V" onChange={setVp} />
          <FormulaBox title="Output">
            Vs = {vs.toFixed(2)} V<br />
            Type = {type}<br />
            {idealCurrentMessage}
          </FormulaBox>
        </div>
        <div className="visual-panel">
          <DiagramRenderer type={type === 'Step-up' ? 'step-up' : type === 'Step-down' ? 'step-down' : 'transformer'} />
        </div>
      </div>
    </SimulationCard>
  )
}
