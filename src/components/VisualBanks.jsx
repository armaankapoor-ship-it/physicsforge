import { useMemo, useState } from 'react'
import { CircuitBoard, Eye, GitBranch, LineChart, PenTool, Play, Search, Shapes } from 'lucide-react'
import { visualPlans } from '../data/visualPlans'
import { DiagramRenderer } from './PhysicsDiagrams'
import { AlertBox, ConceptCard, SectionShell, Tag } from './ui'

const categories = ['All', 'Graph', 'Circuit', 'Phasor', 'Infographic']

export default function VisualBanks() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return visualPlans.filter((visual) => {
      const categoryOk = category === 'All' || visual.category === category
      const queryOk = !q || [visual.title, visual.concept, visual.labels.join(' '), visual.removesConfusion].join(' ').toLowerCase().includes(q)
      return categoryOk && queryOk
    })
  }, [category, query])

  return (
    <SectionShell
      id="visual-bank"
      eyebrow="Graphs, circuits and phasors"
      title="30 original SVG visual plans with actual diagrams."
      description="Every visual is self-made with frontend code and includes what it shows, required labels, confusion removed, manual drawing steps and free digital implementation idea."
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="notebook-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search phasor, transformer, RMS, resonance, choke..." />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`dashboard-tab ${category === item ? 'active' : ''}`}>{item}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((visual, index) => (
          <article key={visual.id} className="glass-card overflow-hidden">
            <div className="grid gap-5 p-5 lg:grid-cols-[.9fr_1.1fr] md:p-6">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Tag>{String(index + 1).padStart(2, '0')}</Tag>
                  <Tag>{visual.category}</Tag>
                  <Tag>{visual.mode}</Tag>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-ink dark:text-white">{visual.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{visual.shows}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {visual.labels.map((label) => <Tag key={label}>{label}</Tag>)}
                </div>
              </div>
              <div className="visual-panel min-h-[280px]">
                <DiagramRenderer type={visual.diagramType} />
              </div>
            </div>
            <div className="grid gap-4 border-t border-slate-200 p-5 dark:border-white/10 md:p-6 lg:grid-cols-2">
              <AlertBox title="Concept it explains" tone="ncert">{visual.concept}</AlertBox>
              <AlertBox title="Student confusion it removes" tone="trap">{visual.removesConfusion}</AlertBox>
              <PlanBox icon={PenTool} title="How to draw manually" text={visual.manual} />
              <PlanBox icon={Play} title="How to build digitally using free tools" text={visual.digital} />
              <div className="flat-card lg:col-span-2">
                <p className="micro-label flex items-center gap-2"><GitBranch size={15} /> Exact implementation idea</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{visual.implementation}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={LineChart} kicker="Graph bank" title="Wave + frequency response" color="blue">Sine, AC/DC, RMS, mean, reactance, resonance, bandwidth and power curves.</ConceptCard>
        <ConceptCard icon={CircuitBoard} kicker="Circuit bank" title="R, L, C, LCR and transformer" color="amber">All circuits are self-drawn SVGs with current and component labels.</ConceptCard>
        <ConceptCard icon={Shapes} kicker="Phasor bank" title="Phase made geometric" color="teal">Pure R, L, C, impedance, phase, power factor and wattless current visuals.</ConceptCard>
        <ConceptCard icon={Eye} kicker="Exam skill" title="Draw from memory" color="orange">Manual drawing instructions are included for board diagrams and quick rough work.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function PlanBox({ icon: Icon, title, text }) {
  return (
    <div className="flat-card">
      <Icon size={18} className="text-copper dark:text-amber-300" />
      <p className="micro-label mt-4">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  )
}
