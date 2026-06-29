import { BookOpenCheck, PenTool, Sigma } from 'lucide-react'
import { derivations } from '../data/derivations'
import { AlertBox, ConceptCard, FormulaBox, SectionShell } from './ui'

export default function DerivationBank() {
  return (
    <SectionShell
      id="derivations"
      eyebrow="Derivation bank"
      title="Step-by-step derivations for boards and competitive clarity."
      description="Each derivation starts from the basic equation, explains the mathematical step, adds physical meaning, and ends with shortcut plus board-exam writing guidance."
      tone="tint"
    >
      <div className="grid gap-6">
        {derivations.map((item, index) => (
          <details key={item.id} className="glass-card overflow-hidden" open={index < 3}>
            <summary className="cursor-pointer border-b border-slate-200 bg-white/80 p-5 text-base font-black text-ink dark:border-white/10 dark:bg-white/[.04] dark:text-white md:p-6">
              {index + 1}. {item.title}
            </summary>
            <div className="grid gap-5 p-5 md:p-7">
              <FormulaBox title="Start from">{item.startsFrom}</FormulaBox>
              <div className="grid gap-4">
                {item.steps.map(([label, math, meaning], stepIndex) => (
                  <div key={`${item.id}-${label}`} className="grid gap-4 rounded-[20px] border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[.035] md:grid-cols-[170px_1fr]">
                    <div>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 font-mono text-xs font-black text-amber-800 dark:bg-amber-300/12 dark:text-amber-200">{stepIndex + 1}</span>
                      <p className="mt-3 text-xs font-black uppercase tracking-[.14em] text-copper dark:text-amber-300">{label}</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-black leading-7 text-ink dark:text-white">{math}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
              <FormulaBox title="Final highlighted formula">{item.finalFormula}</FormulaBox>
              <div className="grid gap-4 lg:grid-cols-3">
                <AlertBox title="NEET/JEE shortcut" tone="neet">{item.shortcut}</AlertBox>
                <AlertBox title="Board-exam writing style" tone="ncert">{item.boardStyle}</AlertBox>
                <AlertBox title="Common mistake warning" tone="trap">{item.mistake}</AlertBox>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={BookOpenCheck} kicker="Boards" title="Line-by-line proof" color="blue">The derivations are written in a board-answer style with the key starting equation shown first.</ConceptCard>
        <ConceptCard icon={Sigma} kicker="JEE" title="Shortcuts preserved" color="teal">Each derivation ends with the shortcut that competitive exams actually reward.</ConceptCard>
        <ConceptCard icon={PenTool} kicker="Practice" title="Mistake warning" color="orange">Common algebra and phase mistakes are attached to the exact derivation where they happen.</ConceptCard>
      </div>
    </SectionShell>
  )
}
