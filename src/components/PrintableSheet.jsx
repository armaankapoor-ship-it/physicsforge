import { Download, Printer } from 'lucide-react'
import { finalChecklist, memoryHooks, summaryTables, topFormulas, topTraps } from '../data/revisionData'
import { CheckList, InfoTable, SectionShell } from './ui'

export default function PrintableSheet() {
  return (
    <SectionShell
      id="printable"
      eyebrow="Downloadable / printable notes layout"
      title="Printable AC revision sheet."
      description="This section is designed for browser print or PDF export using only the free print feature built into the browser."
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={() => window.print()} className="primary-button"><Printer size={17} /> Print / Save PDF</button>
        <a href="#revision" className="secondary-button"><Download size={17} /> Revision dashboard</a>
      </div>

      <article className="print-sheet rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:p-8">
        <header className="border-b border-slate-200 pb-5">
          <p className="text-xs font-black uppercase tracking-[.18em] text-copper">NCERT Class 12 Physics Chapter 7</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight">Alternating Current: One-Page Revision Sheet</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Formula-first, graph-aware, trap-proof revision for CBSE, NEET and JEE Main foundation.</p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <h4 className="text-lg font-black">Top formulas</h4>
            <div className="mt-3 grid gap-2">
              {topFormulas.map((item, index) => (
                <div key={item} className="grid grid-cols-[30px_1fr] rounded-xl bg-amber-50 p-2 text-sm font-bold text-slate-800">
                  <span className="font-mono text-copper">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {summaryTables.slice(2, 7).map((table) => (
              <div key={table.title}>
                <h4 className="mb-2 text-base font-black">{table.title}</h4>
                <InfoTable columns={table.columns} rows={table.rows} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-black">Most common traps</h4>
            <CheckList items={topTraps} />
          </div>
          <div>
            <h4 className="text-lg font-black">Memory hooks</h4>
            <div className="mt-3 grid gap-2">
              {memoryHooks.map(([title, text]) => (
                <div key={title} className="rounded-xl border border-slate-200 p-3">
                  <strong className="text-sm">{title}</strong>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-6 border-t border-slate-200 pt-5">
          <h4 className="text-lg font-black">Final checklist</h4>
          <CheckList items={finalChecklist} />
        </footer>
      </article>
    </SectionShell>
  )
}
