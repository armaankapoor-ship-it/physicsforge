import { useMemo, useState } from 'react'
import { Calculator, Search, Sigma } from 'lucide-react'
import { formulaGroups, formulas } from '../data/formulas'
import { AlertBox, CheckList, ConceptCard, FormulaBox, SectionShell, Tag } from './ui'

export default function FormulaSheet() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All')
  const filtered = useMemo(() => {
    const groupIds = group === 'All' ? null : formulaGroups.find((item) => item.title === group)?.formulas
    const q = query.trim().toLowerCase()
    return formulas.filter((formula) => {
      const groupOk = !groupIds || groupIds.includes(formula.id)
      const queryOk = !q || [
        formula.title,
        formula.formula,
        formula.meaning,
        formula.trap,
        formula.graph,
      ].join(' ').toLowerCase().includes(q)
      return groupOk && queryOk
    })
  }, [query, group])

  return (
    <SectionShell
      id="formula-sheet"
      eyebrow="Formula mastery"
      title="Formula sheet with meaning, units, dimensions and exam traps."
      description="Every required AC formula is explained as a physical statement, not just memorized as a symbol pattern."
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="notebook-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search RMS, reactance, resonance, transformer..." />
        </label>
        <div className="flex flex-wrap gap-2">
          {['All', ...formulaGroups.map((item) => item.title)].map((item) => (
            <button key={item} onClick={() => setGroup(item)} className={`dashboard-tab ${group === item ? 'active' : ''}`}>{item}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((formula) => (
          <article key={formula.id} className="glass-card overflow-hidden">
            <div className="grid gap-5 border-b border-slate-200 bg-gradient-to-r from-amber-50/80 to-blue-50/60 p-6 dark:border-white/10 dark:from-amber-300/10 dark:to-blue-300/5 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="micro-label flex items-center gap-2"><Sigma size={15} /> {formula.title}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink dark:text-white">{formula.display}</h3>
              </div>
              <FormulaBox title="Physical meaning">{formula.meaning}</FormulaBox>
            </div>
            <div className="grid gap-5 p-6 lg:grid-cols-[1fr_1fr]">
              <div className="flat-card">
                <p className="micro-label">Symbols and SI units</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="physics-table">
                    <thead><tr><th>Symbol</th><th>Meaning</th><th>SI unit</th></tr></thead>
                    <tbody>
                      {formula.symbols.map(([symbol, meaning, unit]) => (
                        <tr key={symbol}><td className="font-mono font-black">{symbol}</td><td>{meaning}</td><td>{unit}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid gap-4">
                <AlertBox title="Dimensional check" tone="meaning">{formula.dimension}</AlertBox>
                <AlertBox title="Graph interpretation" tone="ncert">{formula.graph}</AlertBox>
                <AlertBox title="Common exam trap" tone="trap">{formula.trap}</AlertBox>
              </div>
              <div className="flat-card lg:col-span-2">
                <p className="micro-label">Examples and conceptual twist</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <Example label="Easy" text={formula.easyExample} />
                  <Example label="NEET-style" text={formula.neetExample} />
                  <Example label="JEE Main-style" text={formula.jeeExample} />
                  <Example label="Conceptual twist" text={formula.twist} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={Calculator} kicker="Unit check" title="Dimensional safety" color="teal">Reactance and impedance must land in ohm; resonance frequency must land in s^-1 or Hz.</ConceptCard>
        <ConceptCard icon={Sigma} kicker="Peak/RMS" title="Value discipline" color="amber">Keep peak and RMS quantities in separate lanes during power and current calculations.</ConceptCard>
        <ConceptCard icon={Search} kicker="Graph link" title="Formula to graph" color="blue">Every formula card includes the graph pattern it creates, which is essential for NEET and JEE options.</ConceptCard>
      </div>

      <div className="mt-8 glass-card p-6">
        <p className="micro-label">Formula families</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {formulaGroups.map((item) => (
            <div key={item.title} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04]">
              <h3 className="text-sm font-black text-ink dark:text-white">{item.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.formulas.map((id) => <Tag key={id}>{formulas.find((f) => f.id === id)?.title}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function Example({ label, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
      <p className="text-[10px] font-black uppercase tracking-[.14em] text-copper dark:text-amber-300">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  )
}
