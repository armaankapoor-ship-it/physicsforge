import { ArrowDown, BookOpenCheck, CircleDot, Gauge, Play, RadioTower, Sigma, Zap } from 'lucide-react'
import { MiniWave } from './PhysicsDiagrams'

export default function ChapterHero() {
  return (
    <section id="home" className="hero-section scroll-mt-20">
      <div className="page-wrap relative z-10 grid min-h-[820px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[1.03fr_.97fr] lg:pb-20">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/75 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-copper shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-amber-300">
            <Zap size={13} /> Class 12 Physics · Chapter 7 · Free forever
          </div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.3em] text-copper/70 dark:text-amber-300/70">NCERT + NEET + JEE foundation</p>
          <h1 className="hero-title">Alternating<span>Current</span><em>Visual Notes</em></h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
            A complete exam-oriented learning system for AC waveforms, RMS values, RLC circuits, resonance, power factor, LC oscillations and transformers, built with original code-drawn visuals and frontend-only simulations.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#chapter-map" className="primary-button"><Play size={17} fill="currentColor" /> Start learning</a>
            <a href="#simulations" className="secondary-button"><Gauge size={17} /> Open simulations</a>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 overflow-hidden rounded-[24px] border border-white/70 bg-white/60 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
            <div className="hero-stat"><strong>28</strong><span>sections</span></div>
            <div className="hero-stat border-x border-slate-200 dark:border-white/10"><strong>30</strong><span>SVG visuals</span></div>
            <div className="hero-stat"><strong>380</strong><span>questions</span></div>
          </div>
        </div>

        <div className="trace-card p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="micro-label">Live waveform board</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-ink dark:text-white">v = V0 sin omega t</h2>
            </div>
            <div className="rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-[.14em] text-white dark:bg-amber-300 dark:text-ink">zero-cost stack</div>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-white/70 p-2 dark:border-white/10 dark:bg-white/[.035]">
            <MiniWave amplitude={62} frequency={2} color="#2563eb" label="sinusoidal AC" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              [Sigma, 'RMS', 'Effective value'],
              [RadioTower, 'Resonance', 'Maximum current'],
              [BookOpenCheck, 'Boards', 'Derivation-ready'],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
                <Icon size={18} className="text-copper dark:text-amber-300" />
                <strong className="mt-3 block text-sm font-black text-ink dark:text-white">{title}</strong>
                <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a href="#chapter-map" aria-label="Scroll to chapter map" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-copper/60 dark:text-amber-300/60">
        Explore <ArrowDown size={16} className="animate-bounce" />
      </a>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f8fafc] to-transparent dark:from-[#080e1b]" />
      <CircleDot className="pointer-events-none absolute right-8 top-28 hidden text-amber-400/35 lg:block" size={72} />
    </section>
  )
}
