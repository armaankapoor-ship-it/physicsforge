import { Calculator, CheckCircle2, ClipboardList } from 'lucide-react'
import { AlertBox, ConceptCard, FormulaBox, SectionShell, Tag } from './ui'

const examples = [
  {
    title: 'RMS from peak voltage',
    tag: 'Wave value',
    problem: 'A sinusoidal voltage has peak value 311 V. Find RMS value.',
    steps: ['For sine AC, Vrms = V0/sqrt(2).', 'Vrms = 311/1.414 = 219.94 V.', 'So it is approximately 220 V.'],
    answer: '220 V',
    trap: 'Do not call 311 V the household RMS value; it is the peak corresponding to 220 V RMS.',
  },
  {
    title: 'Half-cycle mean current',
    tag: 'Average',
    problem: 'For i = 5 sin omega t A, find mean current over positive half cycle.',
    steps: ['Use Iavg = 2I0/pi.', 'Iavg = 10/pi = 3.18 A.', 'Full-cycle average would be zero, but half-cycle average is not.'],
    answer: '3.18 A',
    trap: 'Question says half cycle, so do not answer zero.',
  },
  {
    title: 'Inductive reactance',
    tag: 'Reactance',
    problem: 'Find XL for L = 0.2 H at 50 Hz.',
    steps: ['Use XL = 2 pi f L.', 'XL = 2 pi x 50 x 0.2.', 'XL = 62.83 ohm.'],
    answer: '62.83 ohm',
    trap: 'Reactance has unit ohm, but it does not mean heat loss like resistance.',
  },
  {
    title: 'Capacitive reactance',
    tag: 'Reactance',
    problem: 'Find XC for C = 100 microF at 50 Hz.',
    steps: ['Convert C = 100 x 10^-6 F.', 'XC = 1/(2 pi f C).', 'XC = 1/(2 pi x 50 x 100 x 10^-6) = 31.83 ohm.'],
    answer: '31.83 ohm',
    trap: 'Forgetting microfarad conversion changes the answer by a million.',
  },
  {
    title: 'LCR impedance',
    tag: 'LCR',
    problem: 'A series LCR circuit has R = 30 ohm, XL = 70 ohm, XC = 30 ohm. Find Z.',
    steps: ['Net reactance = XL - XC = 40 ohm.', 'Z = sqrt(R^2 + (XL-XC)^2).', 'Z = sqrt(30^2 + 40^2) = 50 ohm.'],
    answer: '50 ohm',
    trap: 'Use XL - XC, not XL + XC.',
  },
  {
    title: 'Phase angle',
    tag: 'Phase',
    problem: 'For R = 20 ohm and XL - XC = 20 ohm, find phase angle.',
    steps: ['tan phi = (XL-XC)/R.', 'tan phi = 20/20 = 1.', 'phi = 45 degrees; positive sign means net inductive.'],
    answer: '45 degrees, current lags',
    trap: 'The sign tells lead/lag; do not report only magnitude when asked circuit nature.',
  },
  {
    title: 'Average power',
    tag: 'Power',
    problem: 'Vrms = 200 V, Irms = 3 A, power factor = 0.8. Find average power.',
    steps: ['P = VI cos phi.', 'P = 200 x 3 x 0.8.', 'P = 480 W.'],
    answer: '480 W',
    trap: 'Without power factor, 600 VA is apparent power, not real power.',
  },
  {
    title: 'Resonant frequency',
    tag: 'Resonance',
    problem: 'Find f0 for L = 1 H and C = 1 microF.',
    steps: ['Use f0 = 1/(2 pi sqrt(LC)).', 'LC = 1 x 10^-6, so sqrt(LC) = 10^-3.', 'f0 = 1/(2 pi x 10^-3) = 159.15 Hz.'],
    answer: '159.15 Hz',
    trap: 'Use farad, not microfarad, inside LC.',
  },
  {
    title: 'Quality factor and bandwidth',
    tag: 'Q factor',
    problem: 'A circuit has f0 = 1000 Hz and Q = 20. Find bandwidth.',
    steps: ['Q = f0/bandwidth.', 'Bandwidth = f0/Q.', 'Bandwidth = 1000/20 = 50 Hz.'],
    answer: '50 Hz',
    trap: 'Higher Q means smaller bandwidth.',
  },
  {
    title: 'Transformer voltage',
    tag: 'Transformer',
    problem: 'Np = 200, Ns = 1000, Vp = 120 V. Find Vs and transformer type.',
    steps: ['Vs/Vp = Ns/Np.', 'Vs = 120 x 1000/200 = 600 V.', 'Since Ns > Np, it is step-up.'],
    answer: '600 V, step-up',
    trap: 'Step-up voltage means secondary current decreases ideally.',
  },
  {
    title: 'LC energy exchange',
    tag: 'LC oscillation',
    problem: 'A 20 microF capacitor is charged to 100 V. Find maximum energy in ideal LC circuit.',
    steps: ['Initially energy is electric: U = (1/2)CV^2.', 'C = 20 x 10^-6 F.', 'U = 0.5 x 20 x 10^-6 x 100^2 = 0.1 J.'],
    answer: '0.1 J',
    trap: 'At maximum current, this same energy is magnetic in the inductor.',
  },
  {
    title: 'Choke coil current limiting',
    tag: 'Application',
    problem: 'Why is a choke coil preferred over a resistor to reduce AC current?',
    steps: ['A resistor reduces current by dissipating heat I^2R.', 'A choke uses inductive reactance XL = omega L.', 'Ideal inductive reactance limits current with zero average power loss.'],
    answer: 'It limits AC mainly by reactance, with small power loss.',
    trap: 'A practical choke still has winding resistance, so loss is small, not exactly zero.',
  },
]

export default function SolvedExamples() {
  return (
    <SectionShell
      id="solved-examples"
      eyebrow="Solved examples"
      title="Exam-style solved examples with traps called out."
      description="These examples cover the fastest scoring numerical and conceptual patterns before the full practice bank."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {examples.map((example, index) => (
          <article key={example.title} className="glass-card p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{String(index + 1).padStart(2, '0')}</Tag>
              <Tag>{example.tag}</Tag>
            </div>
            <h3 className="mt-4 text-xl font-black tracking-tight text-ink dark:text-white">{example.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{example.problem}</p>
            <div className="mt-4 grid gap-2">
              {example.steps.map((step, stepIndex) => (
                <div key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 dark:bg-white/[.045] dark:text-slate-200">
                  <CheckCircle2 className="mt-1 shrink-0 text-teal-600 dark:text-teal-300" size={16} />
                  <span><strong>Step {stepIndex + 1}:</strong> {step}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              <FormulaBox title="Final answer">{example.answer}</FormulaBox>
              <AlertBox title="Common trap" tone="trap">{example.trap}</AlertBox>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={Calculator} kicker="Numericals" title="Formula chain" color="blue">Each solved example shows the exact sequence of formula decisions.</ConceptCard>
        <ConceptCard icon={ClipboardList} kicker="Boards" title="Writing style" color="amber">The steps are short enough to reproduce cleanly in board answers.</ConceptCard>
        <ConceptCard icon={CheckCircle2} kicker="Traps" title="Mistake-aware" color="teal">Every solution ends with the most likely exam mistake.</ConceptCard>
      </div>
    </SectionShell>
  )
}
