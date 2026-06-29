import { CalendarClock, Gauge, ListChecks, Printer, ShieldAlert, Sigma } from 'lucide-react'
import {
  finalChecklist,
  graphPatterns,
  memoryHooks,
  questionTypes,
  revisionPlans,
  summaryTables,
  topConcepts,
  topDiagrams,
  topFormulas,
  topTraps,
} from '../data/revisionData'
import { AlertBox, CheckList, ConceptCard, InfoTable, SectionShell, Tag } from './ui'

export default function RevisionDashboard() {
  return (
    <SectionShell
      id="revision"
      eyebrow="Final high-yield dashboard"
      title="One place for formulas, concepts, traps, diagrams, graphs and exam strategy."
      description="Use this section on the last day or as a 30-minute final sweep before a test."
      tone="tint"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_.95fr]">
        <DashboardPanel icon={Sigma} title="Top 25 formulas" items={topFormulas} />
        <DashboardPanel icon={Gauge} title="Top 20 concepts" items={topConcepts} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <DashboardPanel icon={ShieldAlert} title="Top 15 traps" items={topTraps} />
        <DashboardPanel icon={Printer} title="Top 10 diagrams" items={topDiagrams} />
        <DashboardPanel icon={ListChecks} title="Top 10 graph patterns" items={graphPatterns} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <div className="glass-card p-6">
          <p className="micro-label">Top 10 question types</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {questionTypes.map((item) => <Tag key={item}>{item}</Tag>)}
          </div>
          <div className="mt-6 grid gap-4">
            <AlertBox title="30-minute revision plan" tone="meaning"><CheckList items={revisionPlans.thirtyMinute} /></AlertBox>
            <AlertBox title="Last-day revision plan" tone="ncert"><CheckList items={revisionPlans.lastDay} /></AlertBox>
            <AlertBox title="Exam-hall strategy" tone="neet"><CheckList items={revisionPlans.examHall} /></AlertBox>
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="micro-label">Memory hooks</p>
          <div className="mt-4 grid gap-3">
            {memoryHooks.map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
                <strong className="text-sm font-black text-ink dark:text-white">{title}</strong>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 glass-card p-6">
        <p className="micro-label">One-page revision sheet tables</p>
        <div className="mt-5 grid gap-6">
          {summaryTables.map((table) => (
            <div key={table.title}>
              <h3 className="mb-3 text-lg font-black text-ink dark:text-white">{table.title}</h3>
              <InfoTable columns={table.columns} rows={table.rows} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={CalendarClock} kicker="Last mile" title="30-minute sweep" color="orange">The revision plans tell students what to revise when the clock is tight.</ConceptCard>
        <ConceptCard icon={ShieldAlert} kicker="Traps" title="Error prevention" color="amber">The trap list is built around mistakes that repeatedly appear in AC questions.</ConceptCard>
        <ConceptCard icon={Printer} kicker="Printable" title="Revision sheet" color="blue">Tables are compact enough to print as a one-page or two-page quick sheet.</ConceptCard>
        <ConceptCard icon={ListChecks} kicker="Checklist" title="Completion check" color="teal"><CheckList items={finalChecklist.slice(0, 4)} /></ConceptCard>
      </div>
    </SectionShell>
  )
}

function DashboardPanel({ icon: Icon, title, items }) {
  return (
    <div className="glass-card p-6">
      <Icon size={22} className="text-copper dark:text-amber-300" />
      <p className="micro-label mt-4">{title}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[34px_1fr] gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 dark:bg-white/[.045] dark:text-slate-200">
            <span className="font-mono text-xs font-black text-copper dark:text-amber-300">{String(index + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
