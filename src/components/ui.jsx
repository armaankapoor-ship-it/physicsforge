import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Lightbulb,
  Sigma,
  Target,
  Zap,
} from 'lucide-react'

export function SectionShell({ id, eyebrow, title, description, children, tone = 'default' }) {
  return (
    <section id={id} className={`section-shell scroll-mt-24 ${tone === 'tint' ? 'section-tint' : ''}`}>
      <div className="page-wrap">
        <div className="mb-10 max-w-4xl md:mb-14">
          <div className="eyebrow"><span>{eyebrow}</span></div>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function ConceptCard({ icon: Icon = Brain, kicker, title, children, color = 'amber', className = '' }) {
  const tone = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-300/10 dark:text-amber-200',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-300/10 dark:text-blue-200',
    teal: 'bg-teal-100 text-teal-800 dark:bg-teal-300/10 dark:text-teal-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-300/10 dark:text-orange-200',
  }[color] || 'bg-slate-100 text-slate-700'

  return (
    <article className={`flat-card transition hover:-translate-y-1 hover:shadow-soft ${className}`}>
      <div className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl ${tone}`}>
        <Icon size={20} strokeWidth={2.2} />
      </div>
      {kicker && <p className="micro-label">{kicker}</p>}
      <h3 className="mt-2 text-lg font-extrabold tracking-tight text-ink dark:text-white">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div>
    </article>
  )
}

export function FormulaBox({ children, title = 'Formula' }) {
  return (
    <div className="rounded-[22px] border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-300/20 dark:bg-amber-300/10">
      <p className="micro-label flex items-center gap-2"><Sigma size={15} />{title}</p>
      <div className="mt-3 font-mono text-lg font-black leading-8 text-amber-950 dark:text-amber-100">{children}</div>
    </div>
  )
}

export function AlertBox({ children, title = 'Common Trap', tone = 'trap' }) {
  const styles = {
    trap: 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-300/15 dark:bg-rose-300/5 dark:text-rose-50',
    ncert: 'border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-300/15 dark:bg-blue-300/5 dark:text-blue-50',
    neet: 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-300/15 dark:bg-emerald-300/5 dark:text-emerald-50',
    jee: 'border-purple-200 bg-purple-50 text-purple-950 dark:border-purple-300/15 dark:bg-purple-300/5 dark:text-purple-50',
    meaning: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-300/15 dark:bg-amber-300/5 dark:text-amber-50',
  }[tone]
  const Icon = tone === 'trap' ? AlertTriangle : tone === 'meaning' ? Lightbulb : Target

  return (
    <aside className={`rounded-[20px] border p-4 ${styles}`}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 shrink-0" size={18} />
        <div>
          <p className="text-xs font-black uppercase tracking-[.16em]">{title}</p>
          <div className="mt-1 text-sm font-semibold leading-6">{children}</div>
        </div>
      </div>
    </aside>
  )
}

export function FlowchartBlock({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <div className="contents" key={`${step}-${index}`}>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
            {step}
          </div>
          {index < steps.length - 1 && <ArrowUpRight size={15} className="rotate-45 text-copper/50 dark:text-amber-300/60" />}
        </div>
      ))}
    </div>
  )
}

export function VisualDiagram({ label, children, className = '' }) {
  return (
    <div className={`visual-panel ${className}`}>
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-copper backdrop-blur dark:border-white/10 dark:bg-slate-950/75 dark:text-amber-300">
        <Zap size={12} /> {label}
      </div>
      {children}
    </div>
  )
}

export function CheckList({ items }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 dark:bg-white/[.045] dark:text-slate-200">
          <CheckCircle2 className="mt-1 shrink-0 text-teal-600 dark:text-teal-300" size={16} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

export function InfoTable({ columns, rows }) {
  return (
    <table className="physics-table">
      <thead>
        <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-slate-600 dark:bg-white/10 dark:text-slate-300">
      {children}
    </span>
  )
}

export function SourceNote() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-xs font-semibold leading-6 text-slate-500 dark:border-white/10 dark:bg-white/[.035] dark:text-slate-400">
      <BookOpen className="mr-2 inline text-copper dark:text-amber-300" size={15} />
      Original educational content, NCERT-aligned and exam-oriented. Diagrams are code-drawn with free frontend tools only.
    </div>
  )
}
