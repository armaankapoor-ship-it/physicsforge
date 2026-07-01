import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Activity, Gauge, SlidersHorizontal, Zap } from 'lucide-react'
import { models3d } from '../data/models3d'
import { AlertBox, ConceptCard, FormulaBox, SectionShell, Tag } from './ui'

const clampPixelRatio = () => Math.min(window.devicePixelRatio || 1, 2)

export default function ThreeDLab() {
  const [activeId, setActiveId] = useState(models3d.models[0]?.id)
  const [intensity, setIntensity] = useState(1)
  const [motion, setMotion] = useState(0.7)
  const [autoSpin, setAutoSpin] = useState(true)
  const active = useMemo(() => models3d.models.find((model) => model.id === activeId) || models3d.models[0], [activeId])

  return (
    <SectionShell
      id="models-3d"
      eyebrow="Interactive 3D model lab"
      title={'20 detailed 3D models for ' + models3d.shortName + '.'}
      description="Drag the model, adjust field strength and animation speed, then switch between chapter-specific models. Built with free Three.js/WebGL and no paid assets."
      tone="tint"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <article className="glass-card overflow-hidden">
          <div className="grid gap-4 border-b border-slate-200 bg-white/85 p-5 dark:border-white/10 dark:bg-white/[.04] md:grid-cols-[1fr_auto] md:items-center md:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Tag>Model {String(active.number).padStart(2, '0')}</Tag>
                <Tag>{active.kind.replaceAll('-', ' ')}</Tag>
              </div>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-ink dark:text-white">{active.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{active.concept}</p>
            </div>
            <button onClick={() => setAutoSpin((value) => !value)} className="secondary-button">
              <Activity size={16} /> {autoSpin ? 'Pause spin' : 'Auto spin'}
            </button>
          </div>

          <div className="grid gap-5 p-5 md:p-6">
            <div className="relative min-h-[390px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-sm dark:border-white/10">
              <ThreeScene model={active} intensity={intensity} motion={motion} autoSpin={autoSpin} />
              <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white shadow-soft backdrop-blur">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Drag to orbit</p>
                <p className="mt-1 text-xs font-bold text-slate-200">Wheel-free, touch-friendly WebGL model.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
              <div className="grid gap-3">
                <ModelSlider label="Field/detail" value={intensity} min={0.4} max={1.8} step={0.05} onChange={setIntensity} />
                <ModelSlider label="Motion speed" value={motion} min={0} max={1.6} step={0.05} onChange={setMotion} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormulaBox title="3D formula focus">{active.formula}</FormulaBox>
                <AlertBox title="Exam trap removed" tone="trap">{active.exam}</AlertBox>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {active.labels.map((label) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/[.045] dark:text-slate-200">
                  <span className="mb-2 block h-1.5 w-10 rounded-full" style={{ background: active.color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="glass-card overflow-hidden">
          <div className="border-b border-slate-200 bg-white/85 p-5 dark:border-white/10 dark:bg-white/[.04]">
            <p className="micro-label">Choose a model</p>
            <h3 className="mt-2 text-xl font-black tracking-tight text-ink dark:text-white">20-model chapter deck</h3>
          </div>
          <div className="grid max-h-[760px] gap-2 overflow-y-auto p-3 section-nav">
            {models3d.models.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveId(model.id)}
                className={'grid grid-cols-[42px_1fr] gap-3 rounded-[18px] border p-3 text-left transition ' + (model.id === active.id ? 'border-amber-300 bg-amber-50 shadow-sm dark:border-amber-300/40 dark:bg-amber-300/10' : 'border-slate-200 bg-white/70 hover:border-amber-200 hover:bg-amber-50/60 dark:border-white/10 dark:bg-white/[.035] dark:hover:bg-white/[.07]')}
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl text-xs font-black text-white" style={{ background: model.color }}>
                  {model.number}
                </span>
                <span>
                  <span className="block text-sm font-black leading-5 text-ink dark:text-white">{model.title}</span>
                  <span className="mt-1 block text-[10px] font-black uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{model.kind.replaceAll('-', ' ')}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={Zap} kicker="WebGL" title="Real 3D canvases" color="blue">Every model is drawn with Three.js geometry, lights, camera and student controls.</ConceptCard>
        <ConceptCard icon={SlidersHorizontal} kicker="Interactive" title="Drag plus sliders" color="amber">Students can orbit, pause, speed up and change detail/intensity.</ConceptCard>
        <ConceptCard icon={Gauge} kicker="Exam use" title="Formula-linked" color="teal">Each model is tied to one high-yield formula and one common exam trap.</ConceptCard>
        <ConceptCard icon={Activity} kicker="Mobile" title="One canvas active" color="orange">Only the selected model renders, so the chapter stays smooth on phones.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function ModelSlider({ label, value, min, max, step, onChange }) {
  return (
    <label className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{label}</span>
        <strong className="font-mono text-sm text-ink dark:text-white">{value.toFixed(2)}</strong>
      </div>
      <input className="range-control" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function ThreeScene({ model, intensity, motion, autoSpin }) {
  const hostRef = useRef(null)
  const rotationRef = useRef({ x: -0.25, y: 0.55 })
  const dragRef = useRef({ active: false, x: 0, y: 0 })

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x07101f, 8, 18)
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 2.4, 8.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(clampPixelRatio())
    renderer.setClearColor(0x07101f, 1)
    host.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    buildModel(group, model, intensity)

    const ambient = new THREE.AmbientLight(0xffffff, 0.72)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffffff, 1.35)
    key.position.set(5, 7, 6)
    scene.add(key)
    const rim = new THREE.PointLight(new THREE.Color(model.color), 16, 18)
    rim.position.set(-4, 3, 3)
    scene.add(rim)

    const resize = () => {
      const width = Math.max(320, host.clientWidth)
      const height = Math.max(360, host.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)

    const canvas = renderer.domElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.cursor = 'grab'

    const onPointerDown = (event) => {
      dragRef.current = { active: true, x: event.clientX, y: event.clientY }
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onPointerMove = (event) => {
      if (!dragRef.current.active) return
      const dx = event.clientX - dragRef.current.x
      const dy = event.clientY - dragRef.current.y
      rotationRef.current.y += dx * 0.008
      rotationRef.current.x += dy * 0.006
      rotationRef.current.x = THREE.MathUtils.clamp(rotationRef.current.x, -1.15, 1.15)
      dragRef.current.x = event.clientX
      dragRef.current.y = event.clientY
    }
    const endDrag = (event) => {
      dragRef.current.active = false
      canvas.style.cursor = 'grab'
      if (event.pointerId !== undefined) canvas.releasePointerCapture?.(event.pointerId)
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', endDrag)
    canvas.addEventListener('pointercancel', endDrag)
    canvas.addEventListener('pointerleave', endDrag)

    let frameId = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const delta = clock.getDelta()
      if (autoSpin && !dragRef.current.active) rotationRef.current.y += delta * (0.22 + motion * 0.18)
      group.rotation.x = rotationRef.current.x
      group.rotation.y = rotationRef.current.y
      group.traverse((object) => {
        if (object.userData.float) {
          object.position.y = object.userData.baseY + Math.sin(clock.elapsedTime * object.userData.speed + object.userData.phase) * object.userData.float * motion
        }
        if (object.userData.spin) object.rotation[object.userData.spinAxis || 'y'] += delta * object.userData.spin * motion
      })
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
      canvas.removeEventListener('pointerleave', endDrag)
      host.removeChild(canvas)
      disposeObject(group)
      renderer.dispose()
    }
  }, [model, intensity, motion, autoSpin])

  return <div ref={hostRef} className="absolute inset-0" aria-label={model.title + ' interactive 3D model'} />
}

function buildModel(group, model, intensity) {
  addStage(group, model)
  const color = new THREE.Color(model.color)
  const secondary = new THREE.Color('#fbbf24')
  const kind = model.kind

  if (kind === 'charge-field') buildChargeField(group, color, intensity)
  else if (kind === 'dipole') buildDipole(group, color, secondary, intensity)
  else if (kind === 'capacitor') buildCapacitor(group, color, intensity)
  else if (kind === 'circuit') buildCircuit(group, color, intensity)
  else if (kind === 'magnetic') buildMagnetic(group, color, intensity)
  else if (kind === 'coil') buildCoil(group, color, intensity)
  else if (kind === 'wave') buildWave(group, color, secondary, intensity)
  else if (kind === 'phasor') buildPhasor(group, color, secondary, intensity)
  else if (kind === 'lcr') buildLcr(group, color, intensity)
  else if (kind === 'transformer') buildTransformer(group, color, secondary, intensity)
  else if (kind === 'optics') buildOptics(group, color, intensity)
  else if (kind === 'prism') buildPrism(group, color, intensity)
  else if (kind === 'interference') buildInterference(group, color, intensity)
  else if (kind === 'photoelectric') buildPhotoelectric(group, color, intensity)
  else if (kind === 'atom') buildAtom(group, color, intensity)
  else if (kind === 'energy-level') buildEnergyLevels(group, color, intensity)
  else if (kind === 'resonance') buildResonance(group, color, intensity)
  else if (kind === 'generator') buildGenerator(group, color, intensity)
  else if (kind === 'thermal') buildThermal(group, color, intensity)
  else buildDefault(group, color, intensity)

  model.labels.slice(0, 3).forEach((label, index) => {
    const positions = [new THREE.Vector3(-3.2, 1.9, 0.8), new THREE.Vector3(2.9, 1.3, -0.4), new THREE.Vector3(0, -1.9, 1.2)]
    addLabel(group, label, positions[index], index === 0 ? '#fde68a' : index === 1 ? '#bfdbfe' : '#99f6e4')
  })
}

function addStage(group, model) {
  const grid = new THREE.GridHelper(7.5, 18, 0x35506d, 0x1f3148)
  grid.position.y = -2.1
  group.add(grid)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4, 3.9, 0.08, 80),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.3, roughness: 0.45, transparent: true, opacity: 0.88 })
  )
  base.position.y = -2.14
  group.add(base)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.36, 0.025, 12, 120),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(model.color), emissive: new THREE.Color(model.color), emissiveIntensity: 0.24 })
  )
  ring.rotation.x = Math.PI / 2
  ring.position.y = -2.08
  group.add(ring)
}

function buildChargeField(group, color, intensity) {
  const charge = sphere(0.45, color, 0.75)
  charge.userData.float = 0.05
  charge.userData.baseY = 0
  charge.userData.speed = 1.4
  charge.userData.phase = 0
  group.add(charge)
  for (let i = 0; i < 18; i += 1) {
    const a = (i / 18) * Math.PI * 2
    const y = (i % 3 - 1) * 0.42
    const dir = new THREE.Vector3(Math.cos(a), y * 0.35, Math.sin(a)).normalize()
    addArrow(group, dir, dir.clone().multiplyScalar(0.78), 1.6 + intensity * 0.35, color)
  }
  for (let r = 1; r <= 3; r += 1) {
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.72, 40, 18),
      new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.045, wireframe: true })
    )
    group.add(shell)
  }
}

function buildDipole(group, color, secondary, intensity) {
  const plus = sphere(0.34, '#ef4444', 0.8)
  const minus = sphere(0.34, '#3b82f6', 0.8)
  plus.position.x = -1.15
  minus.position.x = 1.15
  group.add(plus, minus)
  tube(group, [v(-1.15, 0, 0), v(1.15, 0, 0)], '#f8fafc', 0.025)
  for (let i = 0; i < 8; i += 1) {
    const side = i < 4 ? 1 : -1
    const height = 0.55 + (i % 4) * 0.35 * intensity
    tube(group, [v(-1.05, 0, 0), v(-0.45, side * height, 0.55), v(0.45, side * height, -0.55), v(1.05, 0, 0)], i % 2 ? color : secondary, 0.018)
  }
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-0.2, -0.78, 0), 0.8, '#fde68a')
}

function buildCapacitor(group, color, intensity) {
  const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.18 })
  const plateA = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 2.5), mat)
  const plateB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 2.5), mat.clone())
  plateA.position.x = -1.05
  plateB.position.x = 1.05
  group.add(plateA, plateB)
  const dielectric = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 1.8, 2.1),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18, roughness: 0.2 })
  )
  group.add(dielectric)
  for (let y = -0.8; y <= 0.8; y += 0.4) {
    addArrow(group, new THREE.Vector3(1, 0, 0), v(-0.78, y, 0.9), 1.3 * intensity, '#fbbf24')
    addArrow(group, new THREE.Vector3(1, 0, 0), v(-0.78, y, -0.9), 1.3 * intensity, '#fbbf24')
  }
}

function buildCircuit(group, color, intensity) {
  const points = [v(-2.2, 0, -1.25), v(2.2, 0, -1.25), v(2.2, 0, 1.25), v(-2.2, 0, 1.25), v(-2.2, 0, -1.25)]
  tube(group, points, '#94a3b8', 0.035)
  const battery = box(0.38, 0.9, 0.7, '#22c55e')
  battery.position.set(-2.2, 0.45, 0)
  const resistor = box(1.0, 0.38, 0.55, color)
  resistor.position.set(0, 0.35, -1.25)
  group.add(battery, resistor)
  for (let i = 0; i < 10; i += 1) {
    const bead = sphere(0.07, '#fde68a', 0.45)
    bead.position.set(-1.8 + i * 0.42, 0.09 + Math.sin(i) * 0.04, -1.25)
    bead.userData.float = 0.05
    bead.userData.baseY = bead.position.y
    bead.userData.speed = 1.2 + i * 0.12
    bead.userData.phase = i
    group.add(bead)
  }
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-0.9, 0.8, -1.25), 1.8 * intensity, color)
}

function buildMagnetic(group, color, intensity) {
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 3.8, 32), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.7, roughness: 0.2 }))
  wire.rotation.x = Math.PI / 2
  group.add(wire)
  for (let r = 0.65; r <= 2.4; r += 0.45) {
    const torus = new THREE.Mesh(new THREE.TorusGeometry(r, 0.015 + intensity * 0.004, 8, 96), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.16 }))
    group.add(torus)
  }
  addArrow(group, new THREE.Vector3(0, 0, 1), v(0, 1.4, 0), 1.4, '#fbbf24')
}

function buildCoil(group, color, intensity) {
  const points = []
  for (let i = 0; i <= 220; i += 1) {
    const t = (i / 220) * Math.PI * 12
    points.push(v(-2.0 + i / 55, Math.sin(t) * 0.55, Math.cos(t) * 0.55))
  }
  tube(group, points, color, 0.035)
  for (let i = 0; i < 5; i += 1) {
    const loop = new THREE.Mesh(new THREE.TorusGeometry(0.9 + i * 0.18, 0.012, 8, 96), new THREE.MeshStandardMaterial({ color: '#fde68a', transparent: true, opacity: 0.62 }))
    loop.rotation.y = Math.PI / 2
    loop.position.x = -0.2 + i * 0.1
    loop.scale.x = 1 + intensity * 0.12
    group.add(loop)
  }
}

function buildWave(group, color, secondary, intensity) {
  const e = []
  const b = []
  for (let i = 0; i <= 170; i += 1) {
    const x = -3 + (i / 170) * 6
    const s = Math.sin(i * 0.18)
    e.push(v(x, s * 0.95 * intensity, 0))
    b.push(v(x, 0, s * 0.95 * intensity))
  }
  tube(group, e, color, 0.025)
  tube(group, b, secondary, 0.025)
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-3.2, -1.35, 0), 5.8, '#e2e8f0')
}

function buildPhasor(group, color, secondary, intensity) {
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.025, 12, 120), new THREE.MeshStandardMaterial({ color: '#e2e8f0' }))
  group.add(wheel)
  addArrow(group, new THREE.Vector3(0.78, 0.55, 0), v(0, 0, 0), 1.7 * intensity, color)
  addArrow(group, new THREE.Vector3(0.28, 0.95, 0), v(0, 0, 0), 1.35 * intensity, secondary)
  tube(group, [v(-2.9, -1.2, 0), v(-1.5, -0.45, 0), v(0, -1.2, 0), v(1.5, -1.95, 0), v(2.9, -1.2, 0)], '#60a5fa', 0.018)
}

function buildLcr(group, color, intensity) {
  buildCircuit(group, color, intensity)
  const coil = new THREE.Group()
  buildCoil(coil, '#fbbf24', intensity)
  coil.scale.set(0.34, 0.34, 0.34)
  coil.position.set(1.35, 0.42, 1.25)
  group.add(coil)
  const capA = box(0.08, 0.75, 0.75, '#38bdf8')
  const capB = box(0.08, 0.75, 0.75, '#38bdf8')
  capA.position.set(-0.25, 0.42, 1.25)
  capB.position.set(0.15, 0.42, 1.25)
  group.add(capA, capB)
}

function buildTransformer(group, color, secondary, intensity) {
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.25 })
  const parts = [
    [0, 0, -1.1, 3.4, 0.28, 0.28],
    [0, 0, 1.1, 3.4, 0.28, 0.28],
    [-1.7, 0, 0, 0.28, 0.28, 2.45],
    [1.7, 0, 0, 0.28, 0.28, 2.45],
  ]
  parts.forEach(([x, y, z, sx, sy, sz]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), coreMat)
    mesh.position.set(x, y, z)
    group.add(mesh)
  })
  const left = new THREE.Group()
  buildCoil(left, color, intensity)
  left.scale.set(0.28, 0.28, 0.28)
  left.rotation.z = Math.PI / 2
  left.position.x = -1.7
  const right = left.clone()
  right.position.x = 1.7
  right.traverse((object) => {
    if (object.material) object.material = object.material.clone()
  })
  group.add(left, right)
  for (let i = 0; i < 3; i += 1) {
    const loop = new THREE.Mesh(new THREE.TorusGeometry(1.15 + i * 0.22, 0.012, 8, 96), new THREE.MeshStandardMaterial({ color: secondary, transparent: true, opacity: 0.6 }))
    loop.rotation.x = Math.PI / 2
    loop.scale.x = 1.35
    group.add(loop)
  }
}

function buildOptics(group, color, intensity) {
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.18, 64), new THREE.MeshPhysicalMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.38, transmission: 0.3, roughness: 0.05 }))
  lens.rotation.z = Math.PI / 2
  group.add(lens)
  tube(group, [v(-3, 0.7, 0), v(-0.15, 0.22, 0), v(2.8, -0.35, 0)], color, 0.018)
  tube(group, [v(-3, -0.5, 0.45), v(-0.15, -0.15, 0.08), v(2.8, 0.55, -0.25)], '#fbbf24', 0.018)
  tube(group, [v(-3, 0, -0.45), v(-0.15, 0, -0.05), v(2.8, 0, 0.4)], '#34d399', 0.018)
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-3.1, -1.35, 0), 5.8 * intensity, '#e2e8f0')
}

function buildPrism(group, color, intensity) {
  const shape = new THREE.Shape()
  shape.moveTo(0, 1)
  shape.lineTo(-0.9, -0.8)
  shape.lineTo(0.9, -0.8)
  shape.lineTo(0, 1)
  const prism = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 1.1, bevelEnabled: false }), new THREE.MeshPhysicalMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.38, roughness: 0.05 }))
  prism.position.z = -0.55
  group.add(prism)
  tube(group, [v(-3, 0.2, 0), v(-0.75, 0.05, 0), v(2.9, 0.8, 0.2)], '#ef4444', 0.018)
  tube(group, [v(-3, 0.2, 0), v(-0.75, 0.05, 0), v(2.9, 0.35, 0)], '#fbbf24', 0.018)
  tube(group, [v(-3, 0.2, 0), v(-0.75, 0.05, 0), v(2.9, -0.12, -0.2)], color, 0.018)
}

function buildInterference(group, color, intensity) {
  const screen = box(0.12, 2.7, 2.7, '#e2e8f0')
  screen.position.x = 2.65
  group.add(screen)
  const slitWall = box(0.12, 2.4, 1.8, '#334155')
  slitWall.position.x = -1.15
  group.add(slitWall)
  for (let i = 0; i < 9; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28 + i * 0.18, 0.01, 8, 64), new THREE.MeshStandardMaterial({ color: i % 2 ? color : '#fbbf24', transparent: true, opacity: 0.55 }))
    ring.position.set(-0.65 + i * 0.18, 0.35, 0)
    ring.rotation.y = Math.PI / 2
    ring.scale.y = 1.35
    group.add(ring)
  }
  for (let y = -1; y <= 1; y += 0.5) {
    const band = box(0.025, 0.08, 1.8, y === 0 ? '#fde68a' : color)
    band.position.set(2.58, y, 0)
    group.add(band)
  }
}

function buildPhotoelectric(group, color, intensity) {
  const plate = box(0.16, 2.25, 2.4, '#64748b')
  plate.position.x = -1.1
  group.add(plate)
  for (let i = 0; i < 7; i += 1) {
    addArrow(group, new THREE.Vector3(1, -0.05, 0), v(-3.1, -0.9 + i * 0.3, -0.6 + (i % 3) * 0.45), 1.55, '#fde68a')
    const electron = sphere(0.08, '#38bdf8', 0.6)
    electron.position.set(-0.55 + i * 0.42, -0.6 + i * 0.16, -0.5 + (i % 3) * 0.45)
    electron.userData.float = 0.06
    electron.userData.baseY = electron.position.y
    electron.userData.speed = 1.6
    electron.userData.phase = i
    group.add(electron)
  }
  addArrow(group, new THREE.Vector3(1, 0.25, 0), v(-0.75, 0.2, 0.7), 2.2 * intensity, color)
}

function buildAtom(group, color, intensity) {
  for (let i = 0; i < 9; i += 1) {
    const n = sphere(0.12, i % 2 ? '#ef4444' : '#fbbf24', 0.75)
    n.position.set((Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35)
    group.add(n)
  }
  for (let i = 0; i < 4; i += 1) {
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.85 + i * 0.42, 0.012, 8, 128), new THREE.MeshStandardMaterial({ color: i % 2 ? color : '#fbbf24', transparent: true, opacity: 0.8 }))
    orbit.rotation.x = (i * Math.PI) / 7
    orbit.rotation.y = (i * Math.PI) / 5
    orbit.userData.spin = 0.15 + i * 0.05
    orbit.userData.spinAxis = 'z'
    group.add(orbit)
    const electron = sphere(0.08, '#38bdf8', 0.8)
    electron.position.set(0.85 + i * 0.42, 0, 0)
    orbit.add(electron)
  }
}

function buildEnergyLevels(group, color, intensity) {
  for (let i = 0; i < 6; i += 1) {
    const level = box(3.4 - i * 0.25, 0.035, 0.08, i % 2 ? color : '#fbbf24')
    level.position.y = -1.35 + i * 0.5
    group.add(level)
    addLabel(group, 'n=' + (i + 1), v(-2.25, level.position.y, 0), '#e2e8f0')
  }
  addArrow(group, new THREE.Vector3(0.05, -1, 0), v(0.75, 1.3, 0), 2.2 * intensity, '#38bdf8')
  addArrow(group, new THREE.Vector3(-0.1, 1, 0), v(-0.75, -1.15, 0), 2.0 * intensity, color)
}

function buildResonance(group, color, intensity) {
  const points = []
  for (let i = 0; i <= 160; i += 1) {
    const x = -3 + (i / 160) * 6
    const y = -1.3 + 2.7 / (1 + (x * x) * (1.4 / intensity))
    points.push(v(x, y, 0))
  }
  tube(group, points, color, 0.04)
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-3.25, -1.55, 0), 6.1, '#e2e8f0')
  addArrow(group, new THREE.Vector3(0, 1, 0), v(0, -1.75, 0), 3.35, '#e2e8f0')
  const peak = sphere(0.16, '#fde68a', 0.8)
  peak.position.set(0, 1.35, 0)
  peak.userData.float = 0.08
  peak.userData.baseY = 1.35
  peak.userData.speed = 2
  group.add(peak)
}

function buildGenerator(group, color, intensity) {
  const magnetA = box(0.45, 1.8, 1.2, '#ef4444')
  const magnetB = box(0.45, 1.8, 1.2, '#3b82f6')
  magnetA.position.x = -2.1
  magnetB.position.x = 2.1
  group.add(magnetA, magnetB)
  const coil = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.035, 10, 96), new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.2 }))
  coil.scale.z = 0.45
  coil.userData.spin = 0.8
  coil.userData.spinAxis = 'y'
  group.add(coil)
  addArrow(group, new THREE.Vector3(1, 0, 0), v(-1.55, 0.95, 0), 3.1 * intensity, '#fbbf24')
}

function buildThermal(group, color, intensity) {
  const body = box(1.8, 0.62, 0.9, color)
  body.userData.float = 0.04
  body.userData.baseY = 0
  body.userData.speed = 1.2
  group.add(body)
  for (let i = 0; i < 9; i += 1) {
    const heat = new THREE.Mesh(new THREE.TorusGeometry(0.35 + i * 0.16, 0.01, 8, 64), new THREE.MeshStandardMaterial({ color: i % 2 ? '#f97316' : '#fde68a', transparent: true, opacity: 0.55 }))
    heat.position.set(-0.8 + i * 0.2, 0.45 + i * 0.08, 0)
    heat.rotation.x = Math.PI / 2
    heat.userData.spin = 0.12 + i * 0.03
    group.add(heat)
  }
  addArrow(group, new THREE.Vector3(0, 1, 0), v(1.25, -1.1, 0), 2.1 * intensity, '#fde68a')
}

function buildDefault(group, color, intensity) {
  buildWave(group, color, new THREE.Color('#fbbf24'), intensity)
  const cube = box(0.9, 0.9, 0.9, color)
  cube.position.set(0, 0, 0)
  cube.userData.spin = 0.42
  group.add(cube)
}

function sphere(radius, color, emissiveIntensity = 0.2) {
  const material = new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity, metalness: 0.25, roughness: 0.22 })
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 40, 24), material)
}

function box(x, y, z, color) {
  return new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshStandardMaterial({ color, metalness: 0.28, roughness: 0.28 }))
}

function tube(group, points, color, radius = 0.02) {
  const curve = new THREE.CatmullRomCurve3(points)
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 80, radius, 8, false),
    new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: 0.14, roughness: 0.26 })
  )
  group.add(mesh)
  return mesh
}

function addArrow(group, dir, origin, length, color) {
  const arrow = new THREE.ArrowHelper(dir.clone().normalize(), origin, length, color, 0.22, 0.12)
  group.add(arrow)
  return arrow
}

function addLabel(group, text, position, color) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(15, 23, 42, 0.78)'
  context.roundRect?.(8, 18, 496, 86, 24)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 4
  context.strokeRect(14, 24, 484, 74)
  context.fillStyle = color
  context.font = '800 34px Manrope, Arial, sans-serif'
  context.fillText(text, 32, 73)
  const texture = new THREE.CanvasTexture(canvas)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }))
  sprite.position.copy(position)
  sprite.scale.set(1.45, 0.36, 1)
  group.add(sprite)
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if (material.map) material.map.dispose()
        material.dispose()
      })
    }
  })
}

function v(x, y, z) {
  return new THREE.Vector3(x, y, z)
}
