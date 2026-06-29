import { useMemo, useState } from 'react'
import { ClipboardCheck, Filter, ListChecks, Search, Target } from 'lucide-react'
import bank from '../data/questionBank.json'
import { AlertBox, ConceptCard, SectionShell, Tag } from './ui'

const categories = ['All', ...Object.keys(bank.meta.counts)]

export default function PracticeZone() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(24)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bank.questions.filter((item) => {
      const categoryOk = category === 'All' || item.category === category
      const text = [
        item.question,
        item.caseText,
        item.answer,
        item.solution,
        item.conceptTag,
        item.commonTrap,
        item.type,
      ].filter(Boolean).join(' ').toLowerCase()
      return categoryOk && (!q || text.includes(q))
    })
  }, [category, query])

  return (
    <SectionShell
      id="practice"
      eyebrow="Practice zone"
      title="Original question bank for NEET, JEE Main and advanced conceptual practice."
      description={`${bank.meta.totalQuestions} questions are stored locally in JSON with answers, detailed solutions, shortcuts, concept tags, difficulty and traps.`}
      tone="tint"
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="notebook-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setLimit(24)
            }}
            placeholder="Search resonance, transformer, RMS, graph, phasor..."
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item)
                setLimit(24)
              }}
              className={`dashboard-tab ${category === item ? 'active' : ''}`}
            >
              {item === 'All' ? 'All' : item.replace('JEE Main MCQ/Numerical', 'JEE Main')}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {Object.entries(bank.meta.counts).map(([name, count]) => (
          <div key={name} className="rounded-[20px] border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/[.045]">
            <p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{name}</p>
            <strong className="mt-2 block text-2xl font-black text-ink dark:text-white">{count}</strong>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] bg-slate-950 p-5 text-white dark:bg-white/[.06]">
        <div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Showing {Math.min(limit, filtered.length)} of {filtered.length}</p>
          <p className="mt-2 text-sm font-semibold text-slate-300">Filter: {category}</p>
        </div>
        <button onClick={() => setLimit((value) => Math.min(value + 24, filtered.length))} className="secondary-button dark:bg-amber-300 dark:text-ink" disabled={limit >= filtered.length}>
          Load more
        </button>
      </div>

      <div className="grid gap-5">
        {filtered.slice(0, limit).map((item, index) => <QuestionCard key={item.id} item={item} serial={index + 1} />)}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={Target} kicker="NEET" title="Direct high-yield" color="teal">100 NEET-level MCQs emphasize formulas, NCERT statements, phase relations and transformer basics.</ConceptCard>
        <ConceptCard icon={ListChecks} kicker="JEE Main" title="Numerical chain" color="blue">100 JEE Main questions cover impedance, resonance, power, Q, bandwidth and transformer current ratios.</ConceptCard>
        <ConceptCard icon={ClipboardCheck} kicker="Mixed formats" title="Exam variety" color="amber">Assertion-reason, integer, match, graph, circuit, phasor and case formats are included.</ConceptCard>
        <ConceptCard icon={Filter} kicker="Tags" title="Trap-aware" color="orange">Each question carries a concept tag and common trap for targeted revision.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function QuestionCard({ item, serial }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="question-card">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{String(serial).padStart(3, '0')}</Tag>
        <Tag>{item.category}</Tag>
        <Tag>{item.type}</Tag>
        <Tag>{item.difficulty}</Tag>
        <Tag>{item.conceptTag}</Tag>
      </div>

      {item.caseText && <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-semibold leading-7 text-blue-950 dark:bg-blue-300/8 dark:text-blue-50">{item.caseText}</p>}
      <h3 className="mt-4 text-base font-black leading-7 text-ink dark:text-white">{item.question}</h3>

      {item.options && (
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {item.options.map((option, index) => (
            <div key={`${item.id}-${option}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[.04] dark:text-slate-200">
              {String.fromCharCode(65 + index)}. {option}
            </div>
          ))}
        </div>
      )}

      {item.columnI && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Column title="Column I" items={item.columnI} />
          <Column title="Column II" items={item.columnII} />
        </div>
      )}

      {item.subquestions && (
        <div className="mt-4 grid gap-3">
          {item.subquestions.map((sub, index) => (
            <div key={`${item.id}-sub-${index}`} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04]">
              <p className="text-sm font-black text-ink dark:text-white">{index + 1}. {sub.question}</p>
              {open && <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">{sub.solution}</p>}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setOpen((value) => !value)} className="primary-button mt-5">
        {open ? 'Hide solution' : 'Show answer and solution'}
      </button>

      {open && (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <AlertBox title="Answer" tone="neet">{item.answer}</AlertBox>
          <AlertBox title="Detailed solution" tone="ncert">{item.solution}</AlertBox>
          <AlertBox title="Shortcut" tone="meaning">{item.shortcut}</AlertBox>
          <AlertBox title="Common trap" tone="trap">{item.commonTrap}</AlertBox>
        </div>
      )}
    </article>
  )
}

function Column({ title, items }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04]">
      <p className="micro-label">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item, index) => <p key={`${title}-${item}`} className="text-sm font-semibold text-slate-600 dark:text-slate-300">{index + 1}. {item}</p>)}
      </div>
    </div>
  )
}
