import { useMemo, useState } from 'react'
import { BookOpen, Brain, CheckCircle2, Eye, GraduationCap, ListChecks, Search, ShieldAlert, Sparkles } from 'lucide-react'
import { chapterSections } from '../data/chapterSections'
import { AlertBox, CheckList, ConceptCard, FormulaBox, SectionShell, Tag } from './ui'

function compact(items) {
  return Array.isArray(items) ? items : [items]
}

export default function ChapterNotebook() {
  const [activeId, setActiveId] = useState(chapterSections[0].id)
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chapterSections
    return chapterSections.filter((section) => [
      section.title,
      section.simple,
      section.ncert,
      section.neet,
      section.jeeMain,
      section.advanced,
      ...section.keyTerms,
      ...section.formulas,
    ].join(' ').toLowerCase().includes(q))
  }, [query])
  const active = useMemo(() => filtered.find((item) => item.id === activeId) || filtered[0] || chapterSections[0], [activeId, filtered])

  return (
    <SectionShell
      id="concept-notes"
      eyebrow="Deep notes section-wise"
      title="A complete guided notebook for all 28 sections."
      description="Each section includes simple explanation, NCERT layer, NEET focus, JEE Main depth, conceptual insight, formulas, units, visual planning, traps and practice prompts."
      tone="tint"
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_.72fr]">
        <label className="notebook-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search formulas, resonance, phase, transformer, power factor..." />
        </label>
        <div className="rounded-[24px] bg-slate-950 p-5 text-white dark:bg-white/[.06]">
          <div className="flex flex-wrap gap-2">
            {['NCERT', 'NEET', 'JEE Main', 'JEE Adv foundation', 'Boards'].map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.78fr_1.22fr]">
        <aside className="glass-card max-h-[790px] overflow-y-auto p-3 section-nav">
          <div className="grid gap-2">
            {filtered.map((section) => (
              <button
                id={`notes-${section.id}`}
                key={section.id}
                onClick={() => setActiveId(section.id)}
                className={`notebook-tab ${active.id === section.id ? 'active' : ''}`}
              >
                <span>{section.module}</span>
                <strong>{section.title}</strong>
              </button>
            ))}
          </div>
        </aside>

        <article className="glass-card overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-amber-50/90 via-white to-blue-50/80 p-6 dark:border-white/10 dark:from-amber-300/10 dark:via-white/[.035] dark:to-blue-300/5 md:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-copper shadow-sm dark:bg-white/10 dark:text-amber-300"><BookOpen size={25} /></div>
            <p className="micro-label mt-5">Section {active.module}</p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-ink dark:text-white md:text-4xl">{active.title}</h3>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{active.simple}</p>
          </div>

          <div className="grid gap-6 p-5 md:p-8">
            <div className="grid gap-4 lg:grid-cols-2">
              <LayerCard icon={BookOpen} title="NCERT-level explanation" text={active.ncert} />
              <LayerCard icon={GraduationCap} title="NEET-level depth" text={active.neet} />
              <LayerCard icon={ListChecks} title="JEE Main depth" text={active.jeeMain} />
              <LayerCard icon={Brain} title="Advanced-style insight" text={active.advanced} />
            </div>

            <div className="grid gap-4 lg:grid-cols-[.92fr_1.08fr]">
              <div className="flat-card">
                <p className="micro-label">Important definitions</p>
                <CheckList items={active.definitions} />
              </div>
              <div className="flat-card">
                <p className="micro-label">Important formulas</p>
                <div className="mt-4 grid gap-3">
                  {active.formulas.map((formula) => <FormulaBox key={formula}>{formula}</FormulaBox>)}
                </div>
              </div>
            </div>

            <details className="accord" open>
              <summary>Formula derivation, units and examples</summary>
              <div className="mt-5 grid gap-4">
                <AlertBox title="Formula derivation" tone="meaning">{active.derivation}</AlertBox>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flat-card">
                    <p className="micro-label">Units and dimensions</p>
                    <CheckList items={active.units} />
                  </div>
                  <div className="flat-card">
                    <p className="micro-label">Important examples</p>
                    <CheckList items={active.examples} />
                  </div>
                </div>
              </div>
            </details>

            <details className="accord" open>
              <summary>Visual, simulation, animation and graph plan</summary>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <VisualIdea icon={Eye} title="Diagram idea" text={active.diagram} />
                <VisualIdea icon={Sparkles} title="Interactive simulation idea" text={active.simulation} />
                <VisualIdea icon={Sparkles} title="Animation idea" text={active.animation} />
                <VisualIdea icon={Eye} title="Graph idea" text={active.graph} />
                <div className="flat-card lg:col-span-2">
                  <p className="micro-label">Flowchart idea</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.flowchart.map((step) => <span key={step} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">{step}</span>)}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300"><strong>Infographic:</strong> {active.infographic}</p>
                </div>
              </div>
            </details>

            <div className="grid gap-4 lg:grid-cols-2">
              <AlertBox title="Memory Hook" tone="meaning">{active.memory}</AlertBox>
              <AlertBox title="NCERT Line Alert" tone="ncert">{active.ncertLine}</AlertBox>
              <AlertBox title="NEET Favourite" tone="neet">{active.neetYield}</AlertBox>
              <AlertBox title="JEE High-Yield" tone="jee">{active.jeeYield}</AlertBox>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <AlertBox title="Common mistakes" tone="trap"><CheckList items={active.mistakes} /></AlertBox>
              <AlertBox title="Exam traps" tone="trap"><CheckList items={active.traps} /></AlertBox>
            </div>

            <details className="accord">
              <summary>Section practice: 5 MCQs, 3 numericals, 2 assertion-reason, conceptual and advanced-thinking prompts</summary>
              <div className="mt-5 grid gap-4">
                <PracticeMini title="5 MCQs" items={active.practice.mcqs} />
                <PracticeMini title="3 Numerical questions" items={active.practice.numericals} />
                <PracticeMini title="2 Assertion-Reason questions" items={active.practice.assertionReason.map((item) => ({
                  question: `Assertion: ${item.assertion} Reason: ${item.reason}`,
                  answer: item.answer,
                  solution: item.answer,
                }))} />
                <PracticeMini title="Conceptual checkpoint" items={[active.practice.conceptual]} />
                <PracticeMini title="Advanced-thinking question" items={[active.practice.advanced]} />
              </div>
            </details>

            <div className="flex flex-wrap gap-2">
              {active.keyTerms.map((term) => <Tag key={term}>{term}</Tag>)}
            </div>
          </div>
        </article>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={BookOpen} kicker="NCERT" title="Line-focused" color="blue">Every module includes a clean NCERT line alert for board and NEET statement questions.</ConceptCard>
        <ConceptCard icon={ShieldAlert} kicker="Traps" title="Mistake-proof" color="orange">Phase, RMS, unit and transformer traps are attached near the concept that causes them.</ConceptCard>
        <ConceptCard icon={GraduationCap} kicker="Practice" title="Section-wise" color="teal">Each topic has MCQ, numerical, assertion-reason, conceptual and advanced-thinking practice prompts.</ConceptCard>
        <ConceptCard icon={Brain} kicker="Depth" title="JEE foundation" color="amber">Advanced insights stay conceptual and useful without turning the chapter into an engineering course.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function LayerCard({ icon: Icon, title, text }) {
  return (
    <div className="flat-card">
      <Icon className="text-copper dark:text-amber-300" size={19} />
      <p className="micro-label mt-4">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  )
}

function VisualIdea({ icon: Icon, title, text }) {
  return (
    <div className="flat-card">
      <Icon className="text-copper dark:text-amber-300" size={18} />
      <p className="micro-label mt-4">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  )
}

function PracticeMini({ title, items }) {
  return (
    <div className="flat-card">
      <p className="micro-label">{title}</p>
      <div className="mt-4 grid gap-3">
        {compact(items).map((item, index) => (
          <div key={`${title}-${index}`} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04]">
            <p className="text-sm font-black leading-6 text-ink dark:text-white">{index + 1}. {item.question}</p>
            <p className="mt-2 text-xs font-bold leading-5 text-teal-700 dark:text-teal-300">Answer: {item.answer}</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">{item.solution || item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
