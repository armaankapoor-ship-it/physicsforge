import { useEffect, useState } from 'react'
import { Atom, BookOpen, CircuitBoard, FileText, Gauge, Menu, Moon, Printer, Search, Sigma, Sun, X, Zap } from 'lucide-react'
import ChapterHero from './components/ChapterHero'
import ChapterMap from './components/ChapterMap'
import ChapterNotebook from './components/ChapterNotebook'
import DerivationBank from './components/DerivationBank'
import FormulaSheet from './components/FormulaSheet'
import PracticeZone from './components/PracticeZone'
import PrintableSheet from './components/PrintableSheet'
import RevisionDashboard from './components/RevisionDashboard'
import Simulations from './components/Simulations'
import SolvedExamples from './components/SolvedExamples'
import VisualBanks from './components/VisualBanks'
import ThreeDLab from './components/ThreeDLab'

const navItems = [
  ['home', 'Home'],
  ['chapter-map', 'Map'],
  ['concept-notes', 'Notes'],
  ['formula-sheet', 'Formula'],
  ['derivations', 'Derive'],
  ['visual-bank', 'Visuals'],
  ['models-3d', '3D Lab'],
  ['simulations', 'Sim'],
  ['solved-examples', 'Solved'],
  ['practice', 'Practice'],
  ['revision', 'Revise'],
  ['printable', 'Print'],
]

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('ac-forge-theme') === 'dark')
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ac-forge-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.25] })
    navItems.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-ink transition-colors dark:bg-[#080e1b] dark:text-white">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[20px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_12px_40px_rgba(17,24,39,.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
          <a href="#home" className="flex items-center gap-2.5" aria-label="AC Forge home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-amber-300 dark:bg-amber-300 dark:text-slate-950"><Zap size={20} /></span>
            <span className="font-display text-[15px] font-black tracking-tight">AC<span className="text-copper dark:text-amber-300">FORGE</span></span>
          </a>
          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-amber-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-copper dark:bg-amber-300/10 dark:text-amber-300 sm:block">FOSS build</div>
            <button onClick={() => setDark((value) => !value)} className="nav-icon-button" aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMenuOpen((value) => !value)} className="nav-icon-button xl:hidden" aria-label="Open navigation">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-[20px] border border-white/70 bg-white/95 p-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 sm:grid-cols-3 xl:hidden">
            {navItems.map(([id, label]) => (
              <a onClick={() => setMenuOpen(false)} key={id} href={`#${id}`} className={`nav-link py-3 ${active === id ? 'active' : ''}`}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <ChapterHero />
        <ChapterMap />
        <ChapterNotebook />
        <FormulaSheet />
        <DerivationBank />
        <VisualBanks />
        <ThreeDLab />
        <Simulations />
        <SolvedExamples />
        <PracticeZone />
        <RevisionDashboard />
        <PrintableSheet />
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-14 dark:border-white/10 dark:bg-[#080e1b]">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-amber-300 dark:bg-amber-300 dark:text-slate-950"><Atom size={19} /></span>
            ACFORGE
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Original Class 12 Alternating Current visual notes, simulations and practice. Built with React, Vite, Tailwind CSS and SVG using free/open-source tooling only.
          </p>
        </div>
        <div className="grid gap-3 md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {[
              [BookOpen, 'NCERT'],
              [Sigma, 'Formulas'],
              [CircuitBoard, 'Diagrams'],
              [Gauge, 'Simulations'],
              [Search, 'Practice'],
              [Printer, 'Printable'],
              [FileText, 'README ready'],
            ].map(([Icon, label]) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] text-slate-600 dark:bg-white/10 dark:text-slate-300">
                <Icon size={12} /> {label}
              </span>
            ))}
          </div>
          <a href="#home" className="text-xs font-black uppercase tracking-[.16em] text-copper dark:text-amber-300">Back to top</a>
        </div>
      </div>
    </footer>
  )
}
