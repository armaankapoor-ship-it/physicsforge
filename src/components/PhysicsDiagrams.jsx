function makeWavePoints({ phase = 0, amplitude = 58, cycles = 2, width = 520, y0 = 120, samples = 120 }) {
  return Array.from({ length: samples }, (_, index) => {
    const x = (index / (samples - 1)) * width
    const theta = (index / (samples - 1)) * Math.PI * 2 * cycles + phase
    const y = y0 - amplitude * Math.sin(theta)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

function curvePath(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
}

function Axis({ x1 = 35, x2 = 555, y = 120, yTop = 30, yBottom = 215 }) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
      <line x1={x1} y1={yBottom} x2={x1} y2={yTop} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
      <text x={x2 - 16} y={y + 24} className="fill-slate-500 text-[11px] font-bold">t</text>
      <text x={x1 - 22} y={yTop + 8} className="fill-slate-500 text-[11px] font-bold">value</text>
    </>
  )
}

function ArrowDefs({ id }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
      </marker>
    </defs>
  )
}

function BaseSvg({ children, className = '' }) {
  return (
    <svg viewBox="0 0 600 260" className={`h-full min-h-[250px] w-full text-slate-900 dark:text-white ${className}`} role="img">
      {children}
    </svg>
  )
}

function GraphFrame({ children, label }) {
  return (
    <BaseSvg>
      <rect x="18" y="18" width="564" height="224" rx="22" fill="currentColor" opacity=".035" />
      <Axis />
      {children}
      {label && <text x="40" y="232" className="fill-slate-500 text-[11px] font-black uppercase tracking-wide">{label}</text>}
    </BaseSvg>
  )
}

function SineDiagram({ variant = 'sine' }) {
  const sine = makeWavePoints({})
  const negative = makeWavePoints({ phase: Math.PI, amplitude: 58 })
  return (
    <GraphFrame label={variant === 'sine' ? 'sinusoidal alternating quantity' : undefined}>
      <polyline points={sine} transform="translate(35,0)" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      {variant === 'sine' && (
        <>
          <line x1="35" y1="62" x2="555" y2="62" stroke="#f97316" strokeDasharray="6 7" strokeWidth="2" />
          <line x1="35" y1="178" x2="555" y2="178" stroke="#f97316" strokeDasharray="6 7" strokeWidth="2" />
          <text x="48" y="54" className="fill-orange-600 text-[12px] font-black">+V0 / +I0</text>
          <text x="48" y="194" className="fill-orange-600 text-[12px] font-black">-V0 / -I0</text>
          <path d="M35 220 H295" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#period-sine)" />
          <ArrowDefs id="period-sine" />
          <text x="155" y="214" className="fill-teal-600 text-[12px] font-black">one period T</text>
        </>
      )}
      {variant === 'acdc' && (
        <>
          <line x1="35" y1="80" x2="555" y2="80" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          <text x="485" y="70" className="fill-orange-600 text-[12px] font-black">DC</text>
          <text x="488" y="158" className="fill-blue-600 text-[12px] font-black">AC</text>
        </>
      )}
      {variant === 'rms' && (
        <>
          <line x1="35" y1="79" x2="555" y2="79" stroke="#f97316" strokeWidth="2.5" strokeDasharray="7 7" />
          <line x1="35" y1="38" x2="555" y2="38" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 7" />
          <text x="445" y="75" className="fill-orange-600 text-[12px] font-black">Vrms = 0.707 V0</text>
          <text x="465" y="35" className="fill-amber-700 text-[12px] font-black">Peak V0</text>
        </>
      )}
      {variant === 'mean' && (
        <>
          <path d={`M 35 120 L ${Array.from({ length: 61 }, (_, index) => {
            const x = 35 + (index / 60) * 260
            const y = 120 - 58 * Math.sin((index / 60) * Math.PI)
            return `${x.toFixed(1)} ${y.toFixed(1)}`
          }).join(' L ')} L 295 120 Z`} fill="#f97316" opacity=".18" />
          <rect x="35" y="83" width="260" height="37" fill="#14b8a6" opacity=".22" />
          <line x1="35" y1="83" x2="295" y2="83" stroke="#14b8a6" strokeWidth="3" />
          <text x="305" y="87" className="fill-teal-600 text-[12px] font-black">mean = 2V0/pi</text>
          <text x="118" y="154" className="fill-orange-600 text-[12px] font-black">equal area</text>
        </>
      )}
      {variant === 'power-curve' && (
        <>
          <polyline points={negative} transform="translate(35,0)" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
          <path d={curvePath(Array.from({ length: 140 }, (_, index) => {
            const x = 35 + (index / 139) * 520
            const theta = (index / 139) * Math.PI * 4
            const p = Math.sin(theta) * Math.sin(theta - Math.PI / 3)
            return [x, 185 - 42 * p]
          }))} fill="none" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
          <line x1="35" y1="185" x2="555" y2="185" stroke="#14b8a6" strokeDasharray="7 7" strokeWidth="2" opacity=".45" />
          <text x="430" y="205" className="fill-teal-600 text-[12px] font-black">p = vi</text>
          <text x="62" y="102" className="fill-blue-600 text-[11px] font-black">v</text>
          <text x="78" y="172" className="fill-orange-600 text-[11px] font-black">i</text>
        </>
      )}
    </GraphFrame>
  )
}

function PhaseGraph({ phase = 0, caption = '' }) {
  const voltage = makeWavePoints({})
  const current = makeWavePoints({ phase })
  return (
    <GraphFrame label={caption}>
      <polyline points={voltage} transform="translate(35,0)" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      <polyline points={current} transform="translate(35,0)" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <text x="480" y="58" className="fill-blue-600 text-[12px] font-black">v</text>
      <text x="500" y="190" className="fill-orange-600 text-[12px] font-black">i</text>
      {phase !== 0 && (
        <>
          <line x1="165" y1="216" x2="230" y2="216" stroke="#14b8a6" strokeWidth="3" markerEnd={`url(#phase-${phase > 0 ? 'lead' : 'lag'})`} />
          <ArrowDefs id={`phase-${phase > 0 ? 'lead' : 'lag'}`} />
          <text x="180" y="207" className="fill-teal-600 text-[11px] font-black">T/4</text>
        </>
      )}
    </GraphFrame>
  )
}

function CircuitSymbol({ type, x = 250, y = 84 }) {
  if (type === 'resistor') {
    return <path d={`M${x} ${y} l15 -18 l18 36 l18 -36 l18 36 l18 -36 l18 36 l15 -18`} fill="none" stroke="#f97316" strokeWidth="5" strokeLinejoin="round" />
  }
  if (type === 'inductor') {
    return (
      <path d={`M${x} ${y} c12 -32 36 -32 48 0 c12 -32 36 -32 48 0 c12 -32 36 -32 48 0`} fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
    )
  }
  if (type === 'capacitor') {
    return (
      <>
        <line x1={x} y1={y - 38} x2={x} y2={y + 38} stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" />
        <line x1={x + 42} y1={y - 38} x2={x + 42} y2={y + 38} stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" />
      </>
    )
  }
  return null
}

function Source({ x = 112, y = 145 }) {
  return (
    <>
      <circle cx={x} cy={y} r="34" fill="none" stroke="#111827" strokeWidth="4" className="dark:stroke-white" />
      <path d={`M${x - 22} ${y} C ${x - 12} ${y - 22}, ${x + 2} ${y + 22}, ${x + 22} ${y}`} fill="none" stroke="#2563eb" strokeWidth="3" />
      <text x={x - 18} y={y + 58} className="fill-slate-500 text-[12px] font-black">AC</text>
    </>
  )
}

function CircuitDiagram({ kind = 'resistor-circuit' }) {
  const parts = {
    'resistor-circuit': ['resistor'],
    'inductor-circuit': ['inductor'],
    'capacitor-circuit': ['capacitor'],
    'lcr-circuit': ['resistor', 'inductor', 'capacitor'],
    choke: ['inductor', 'load'],
  }[kind] || ['resistor']
  return (
    <BaseSvg>
      <ArrowDefs id={`current-${kind}`} />
      <Source />
      <path d="M146 145 H220 V84 H245" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M500 84 H530 V205 H112 V179" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {parts.length === 1 && <CircuitSymbol type={parts[0]} x={260} y={84} />}
      {kind === 'lcr-circuit' && (
        <>
          <CircuitSymbol type="resistor" x={208} y={84} />
          <CircuitSymbol type="inductor" x={335} y={84} />
          <CircuitSymbol type="capacitor" x={485} y={84} />
          <text x="255" y="47" className="fill-orange-600 text-[13px] font-black">R</text>
          <text x="390" y="47" className="fill-blue-600 text-[13px] font-black">L</text>
          <text x="486" y="47" className="fill-teal-600 text-[13px] font-black">C</text>
        </>
      )}
      {kind === 'choke' && (
        <>
          <CircuitSymbol type="inductor" x={260} y={84} />
          <rect x="444" y="56" width="70" height="56" rx="12" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
          <text x="456" y="90" className="fill-amber-800 text-[12px] font-black">LOAD</text>
          <text x="260" y="45" className="fill-blue-600 text-[12px] font-black">choke coil L, small R</text>
        </>
      )}
      {kind !== 'lcr-circuit' && kind !== 'choke' && (
        <>
          <path d="M410 84 H500" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <text x="322" y="45" className="fill-slate-700 text-[13px] font-black dark:fill-white">
            {kind.includes('resistor') ? 'R' : kind.includes('inductor') ? 'L' : 'C'}
          </text>
        </>
      )}
      <path d="M198 202 H278" stroke="#14b8a6" strokeWidth="4" markerEnd={`url(#current-${kind})`} />
      <text x="222" y="193" className="fill-teal-600 text-[12px] font-black">i</text>
    </BaseSvg>
  )
}

function phasorArrow(cx, cy, length, deg, color, label, markerId) {
  const rad = (Math.PI / 180) * deg
  const x = cx + length * Math.cos(rad)
  const y = cy - length * Math.sin(rad)
  return (
    <g key={label}>
      <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="5" strokeLinecap="round" markerEnd={`url(#${markerId})`} />
      <text x={x + 8} y={y + 4} className="text-[13px] font-black" fill={color}>{label}</text>
    </g>
  )
}

function PhasorDiagram({ kind = 'phasor-r' }) {
  const vAngle = kind === 'phasor-l' ? 90 : kind === 'phasor-c' ? -90 : 0
  return (
    <BaseSvg>
      <ArrowDefs id={`phasor-${kind}`} />
      <circle cx="300" cy="132" r="92" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
      <line x1="165" y1="132" x2="455" y2="132" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
      <line x1="300" y1="36" x2="300" y2="228" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
      {phasorArrow(300, 132, 116, 0, '#f97316', 'I', `phasor-${kind}`)}
      {phasorArrow(300, 132, 96, vAngle, '#2563eb', kind === 'phasor-r' ? 'V' : kind === 'phasor-l' ? 'VL' : 'VC', `phasor-${kind}`)}
      <path d={vAngle === 90 ? 'M336 132 A36 36 0 0 0 300 96' : vAngle === -90 ? 'M336 132 A36 36 0 0 1 300 168' : 'M336 132 L360 132'} fill="none" stroke="#14b8a6" strokeWidth="3" />
      <text x="348" y={vAngle === -90 ? 166 : 111} className="fill-teal-600 text-[12px] font-black">
        {kind === 'phasor-r' ? 'phi = 0' : '90 deg'}
      </text>
    </BaseSvg>
  )
}

function TriangleDiagram({ kind = 'impedance-triangle' }) {
  const labels = kind === 'power-triangle'
    ? ['P real', 'Q reactive', 'S apparent', 'cos phi = P/S']
    : kind === 'phase-angle'
      ? ['VR', 'VL - VC', 'V', 'tan phi']
      : ['R', 'XL - XC', 'Z', 'phi']
  return (
    <BaseSvg>
      <polygon points="135,195 465,195 465,70" fill="#fef3c7" opacity=".5" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
      <line x1="135" y1="195" x2="465" y2="70" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
      <text x="292" y="220" className="fill-amber-800 text-[13px] font-black">{labels[0]}</text>
      <text x="478" y="134" className="fill-orange-600 text-[13px] font-black">{labels[1]}</text>
      <text x="302" y="112" className="fill-blue-600 text-[13px] font-black">{labels[2]}</text>
      <path d="M190 195 A55 55 0 0 0 220 155" fill="none" stroke="#14b8a6" strokeWidth="3" />
      <text x="205" y="179" className="fill-teal-600 text-[12px] font-black">{labels[3]}</text>
    </BaseSvg>
  )
}

function ResonanceLike({ kind = 'resonance' }) {
  const currentPath = curvePath(Array.from({ length: 140 }, (_, index) => {
    const x = 50 + (index / 139) * 500
    const u = (x - 300) / 95
    const y = 205 - 132 / (1 + u * u)
    return [x, y]
  }))
  const broadPath = curvePath(Array.from({ length: 140 }, (_, index) => {
    const x = 50 + (index / 139) * 500
    const u = (x - 300) / 160
    const y = 205 - 92 / (1 + u * u)
    return [x, y]
  }))
  const zPath = curvePath(Array.from({ length: 140 }, (_, index) => {
    const x = 50 + (index / 139) * 500
    const u = (x - 300) / 110
    const y = 86 + 108 * (1 - Math.exp(-u * u))
    return [x, y]
  }))
  return (
    <GraphFrame label={kind.includes('impedance') ? 'minimum impedance at f0' : 'series resonance response'}>
      {kind === 'impedance-frequency' ? (
        <>
          <path d={zPath} fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <line x1="300" y1="55" x2="300" y2="212" stroke="#14b8a6" strokeDasharray="6 7" strokeWidth="2" />
          <text x="310" y="82" className="fill-teal-600 text-[12px] font-black">f0, Zmin = R</text>
        </>
      ) : kind === 'quality' ? (
        <>
          <path d={currentPath} fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <path d={broadPath} fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          <text x="322" y="75" className="fill-blue-600 text-[12px] font-black">high Q</text>
          <text x="405" y="128" className="fill-orange-600 text-[12px] font-black">low Q</text>
        </>
      ) : kind === 'bandwidth' ? (
        <>
          <path d={currentPath} fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <rect x="238" y="90" width="124" height="115" fill="#14b8a6" opacity=".14" />
          <line x1="50" y1="112" x2="550" y2="112" stroke="#f97316" strokeDasharray="7 8" strokeWidth="2" />
          <line x1="238" y1="112" x2="238" y2="205" stroke="#14b8a6" strokeWidth="3" />
          <line x1="362" y1="112" x2="362" y2="205" stroke="#14b8a6" strokeWidth="3" />
          <text x="246" y="228" className="fill-teal-600 text-[12px] font-black">f1</text>
          <text x="366" y="228" className="fill-teal-600 text-[12px] font-black">f2</text>
          <text x="244" y="100" className="fill-orange-600 text-[12px] font-black">Imax/sqrt(2)</text>
        </>
      ) : (
        <>
          <path d={currentPath} fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <line x1="300" y1="55" x2="300" y2="212" stroke="#14b8a6" strokeDasharray="6 7" strokeWidth="2" />
          <text x="310" y="72" className="fill-teal-600 text-[12px] font-black">f0</text>
          <text x="365" y="102" className="fill-blue-600 text-[12px] font-black">I max</text>
          {kind === 'current-frequency' && (
            <>
              <text x="82" y="193" className="fill-orange-600 text-[11px] font-black">capacitive side</text>
              <text x="390" y="193" className="fill-orange-600 text-[11px] font-black">inductive side</text>
            </>
          )}
        </>
      )}
    </GraphFrame>
  )
}

function LCVisual() {
  return (
    <BaseSvg>
      <rect x="42" y="42" width="516" height="176" rx="24" fill="#f8fafc" className="dark:fill-white" opacity=".06" stroke="currentColor" strokeOpacity=".12" />
      <line x1="135" y1="80" x2="135" y2="180" stroke="#14b8a6" strokeWidth="7" strokeLinecap="round" />
      <line x1="178" y1="80" x2="178" y2="180" stroke="#14b8a6" strokeWidth="7" strokeLinecap="round" />
      <path d="M300 132 c12 -34 36 -34 48 0 c12 -34 36 -34 48 0 c12 -34 36 -34 48 0" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
      <path d="M178 132 H300 M444 132 H495 V205 H92 V132 H135" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <rect x="82" y="48" width="150" height="16" rx="8" fill="#14b8a6" opacity=".25" />
      <rect x="82" y="48" width="108" height="16" rx="8" fill="#14b8a6" />
      <rect x="318" y="182" width="150" height="16" rx="8" fill="#2563eb" opacity=".25" />
      <rect x="318" y="182" width="70" height="16" rx="8" fill="#2563eb" />
      <text x="82" y="38" className="fill-teal-600 text-[12px] font-black">electric energy in C</text>
      <text x="318" y="222" className="fill-blue-600 text-[12px] font-black">magnetic energy in L</text>
      <text x="145" y="112" className="fill-teal-700 text-[18px] font-black">+ -</text>
    </BaseSvg>
  )
}

function TransformerVisual({ kind = 'transformer' }) {
  const primaryTurns = kind === 'step-down' ? 9 : kind === 'step-up' ? 4 : 6
  const secondaryTurns = kind === 'step-up' ? 9 : kind === 'step-down' ? 4 : 6
  const turns = (x, count, color) => Array.from({ length: count }, (_, i) => (
    <ellipse key={`${x}-${i}`} cx={x} cy={68 + i * (124 / Math.max(count - 1, 1))} rx="24" ry="9" fill="none" stroke={color} strokeWidth="4" />
  ))
  return (
    <BaseSvg>
      <rect x="190" y="42" width="220" height="176" rx="22" fill="none" stroke="#64748b" strokeWidth="16" opacity=".45" />
      <rect x="230" y="82" width="140" height="96" rx="16" fill="currentColor" opacity=".035" />
      {turns(176, primaryTurns, '#f97316')}
      {turns(424, secondaryTurns, '#2563eb')}
      <path d="M248 96 C305 45, 358 45, 410 96" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="8 7" />
      <path d="M410 164 C350 215, 296 215, 248 164" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="8 7" />
      <text x="128" y="232" className="fill-orange-600 text-[12px] font-black">Primary Np</text>
      <text x="390" y="232" className="fill-blue-600 text-[12px] font-black">Secondary Ns</text>
      <text x="260" y="132" className="fill-slate-600 text-[12px] font-black dark:fill-slate-300">laminated core</text>
      {kind !== 'transformer' && (
        <text x="240" y="28" className="fill-teal-600 text-[13px] font-black">
          {kind === 'step-up' ? 'Ns > Np, Vs > Vp, Is < Ip' : 'Ns < Np, Vs < Vp, Is > Ip'}
        </text>
      )}
    </BaseSvg>
  )
}

function LossesVisual() {
  const cards = [
    ['Copper', 68, 54, '#f97316'],
    ['Eddy', 420, 54, '#2563eb'],
    ['Hysteresis', 58, 174, '#14b8a6'],
    ['Flux leakage', 395, 174, '#b45309'],
  ]
  return (
    <BaseSvg>
      <TransformerVisual />
      {cards.map(([label, x, y, color]) => (
        <g key={label}>
          <rect x={x} y={y} width="126" height="42" rx="14" fill={color} opacity=".14" stroke={color} strokeWidth="2" />
          <text x={x + 13} y={y + 26} fill={color} className="text-[12px] font-black">{label}</text>
        </g>
      ))}
    </BaseSvg>
  )
}

function WattlessVisual() {
  return (
    <BaseSvg>
      <ArrowDefs id="wattless-arrow" />
      <line x1="155" y1="168" x2="445" y2="168" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
      <line x1="250" y1="220" x2="250" y2="55" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
      {phasorArrow(250, 168, 175, 0, '#2563eb', 'V reference', 'wattless-arrow')}
      {phasorArrow(250, 168, 150, 42, '#f97316', 'I', 'wattless-arrow')}
      <line x1="250" y1="168" x2="362" y2="168" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#wattless-arrow)" />
      <line x1="362" y1="168" x2="362" y2="68" stroke="#b45309" strokeWidth="5" markerEnd="url(#wattless-arrow)" />
      <text x="286" y="190" className="fill-teal-600 text-[12px] font-black">I cos phi useful</text>
      <text x="374" y="113" className="fill-amber-700 text-[12px] font-black">I sin phi wattless</text>
    </BaseSvg>
  )
}

export function DiagramRenderer({ type }) {
  if (type === 'sine') return <SineDiagram variant="sine" />
  if (type === 'acdc') return <SineDiagram variant="acdc" />
  if (type === 'rms') return <SineDiagram variant="rms" />
  if (type === 'mean') return <SineDiagram variant="mean" />
  if (type === 'phase-zero') return <PhaseGraph phase={0} caption="same phase" />
  if (type === 'phase-lag') return <PhaseGraph phase={-Math.PI / 2} caption="current lags voltage by 90 degrees" />
  if (type === 'phase-lead') return <PhaseGraph phase={Math.PI / 2} caption="current leads voltage by 90 degrees" />
  if (type?.includes('circuit') || type === 'choke') return <CircuitDiagram kind={type} />
  if (type?.startsWith('phasor')) return <PhasorDiagram kind={type} />
  if (['impedance-triangle', 'phase-angle', 'power-triangle'].includes(type)) return <TriangleDiagram kind={type} />
  if (['resonance', 'current-frequency', 'impedance-frequency', 'quality', 'bandwidth'].includes(type)) return <ResonanceLike kind={type} />
  if (type === 'lc-energy') return <LCVisual />
  if (['transformer', 'step-up', 'step-down'].includes(type)) return <TransformerVisual kind={type} />
  if (type === 'losses') return <LossesVisual />
  if (type === 'power-curve') return <SineDiagram variant="power-curve" />
  if (type === 'wattless') return <WattlessVisual />
  return <SineDiagram variant="sine" />
}

export function MiniWave({ amplitude = 44, frequency = 1, phase = 0, color = '#2563eb', label = '' }) {
  const points = makeWavePoints({ amplitude, cycles: frequency, phase, width: 500, y0: 95, samples: 120 })
  return (
    <svg viewBox="0 0 560 190" className="min-h-[180px] w-full">
      <line x1="30" y1="95" x2="535" y2="95" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
      <polyline points={points} transform="translate(30,0)" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {label && <text x="34" y="28" fill={color} className="text-[12px] font-black">{label}</text>}
    </svg>
  )
}

export function LcrMeter({ r, l, c, f }) {
  const omega = 2 * Math.PI * f
  const xl = omega * l
  const xc = c > 0 ? 1 / (omega * c) : 0
  const net = xl - xc
  const z = Math.sqrt(r * r + net * net)
  const angle = Math.atan2(net, r) * 180 / Math.PI
  const x2 = 112 + Math.min(170, z / 3)
  const y2 = 188 - Math.max(-90, Math.min(90, net / 3))
  return (
    <svg viewBox="0 0 360 240" className="min-h-[220px] w-full">
      <line x1="52" y1="188" x2="318" y2="188" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
      <line x1="112" y1="220" x2="112" y2="32" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
      <line x1="112" y1="188" x2={x2} y2="188" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
      <line x1={x2} y1="188" x2={x2} y2={y2} stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" />
      <line x1="112" y1="188" x2={x2} y2={y2} stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
      <text x="116" y="208" className="fill-orange-600 text-[11px] font-black">R</text>
      <text x={x2 + 8} y={(188 + y2) / 2} className="fill-teal-600 text-[11px] font-black">XL-XC</text>
      <text x={(112 + x2) / 2} y={(188 + y2) / 2 - 8} className="fill-blue-600 text-[11px] font-black">Z</text>
      <text x="24" y="26" className="fill-slate-600 text-[12px] font-black dark:fill-slate-300">phi = {angle.toFixed(1)} deg</text>
    </svg>
  )
}
