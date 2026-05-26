import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  Brain,
  Bot,
  BarChart3,
  Sparkles,
  Gauge,
  Shield,
  Wifi,
  Activity,
  ArrowRight,
  Map,
  Truck,
  Database,
  Layers,
  TrendingUp,
  Lock,
  LineChart,
} from 'lucide-react'
import { VisionPhotoShowcase } from './VisionPhotoShowcase'
import { PlatformVisual } from './visuals/PlatformVisual'
import { AgentVisual } from './visuals/AgentVisual'
import { OrionSectionBg } from './visuals/OrionSectionBg'
import { OrionPhotoShowcase } from './OrionPhotoShowcase'
import { EcosystemCta } from './EcosystemCta'
import {
  hashForVisionStage,
  visionStageFromHash,
  type VisionStageId,
} from '../lib/visionStage'

type Product = 'vision' | 'orion'

const visionFlow = [
  { icon: Eye, label: 'SynecT Vision', short: 'Visión' },
  { icon: Layers, label: 'Connect + Insight', short: 'Datos' },
  { icon: Sparkles, label: 'SynecT Intell', short: 'Intell' },
]

const orionFlow = [
  { icon: Truck, label: 'Field Unit', short: 'Hardware' },
  { icon: Map, label: 'Mapa en vivo', short: 'Tracking' },
  { icon: BarChart3, label: 'Telemetría', short: 'Datos' },
  { icon: Brain, label: 'Score IA', short: 'IA' },
]

const visionTabs = [
  {
    id: 'synect-vision',
    label: 'SynecT Vision',
    icon: Eye,
    step: '01',
    badge: 'Adquisición in situ',
    title: 'Visualización donde ocurre la operación',
    description:
      'Punto de entrada a la transformación digital. Reemplazá medidores físicos por visibilidad inmediata en pantalla — el valor capturado se ve al instante, en el mismo sitio donde ocurre.',
    features: [
      'Baja inversión inicial — el paquete más accesible para empezar',
      'Total tangibilidad: el operador ve el equipo y el dato con curva mínima de aprendizaje',
      'Hardware y software locales 100% compatibles y escalables a Connect e Insight',
      'Prueba de valor: calidad de adquisición con compromiso mínimo',
    ],
    clientValue: 'Monitoreo en tiempo real — visibilidad instantánea de activos y reacción inmediata ante eventos críticos.',
    visual: 'vision' as const,
  },
  {
    id: 'connect-insight',
    label: 'Connect + Insight',
    icon: Layers,
    step: '02',
    badge: 'Almacenamiento + análisis',
    title: 'Del dato confiable al conocimiento accionable',
    description:
      'Una misma etapa de madurez: SynecT Connect guarda y estandariza la telemetría; SynecT Insight la transforma en dashboards, KPIs y reportes para optimizar procesos.',
    features: [
      'Connect: datacenter propio, soberanía de datos y almacenamiento escalable',
      'Historial confiable — lo capturado hoy disponible mañana o dentro de un año',
      'Insight: dashboards interactivos con KPIs de producción en tiempo real',
      'Patrones, tendencias y correlaciones invisibles a simple vista',
    ],
    clientValue:
      'Información para la toma de decisiones — de datos crudos a reportes que impulsan eficiencia, ahorro energético y reducción de fallas.',
    visual: 'analytics' as const,
  },
  {
    id: 'synect-intell',
    label: 'SynecT Intell',
    icon: Sparkles,
    step: '03',
    badge: 'Inteligencia artificial',
    title: 'De reaccionar a predecir y optimizar',
    description:
      'Etapa de mayor madurez en VISION. Mientras Insight explica qué pasó y por qué, Intell anticipa desvíos y sugiere cómo optimizar la operación con modelos entrenados sobre tus propios datos.',
    features: [
      'Mantenimiento predictivo — alertas antes de paradas no planificadas',
      'Optimización de temperatura, presión, flujo y consumo energético',
      'Detección multivariable de anomalías, más allá de umbrales fijos',
      'Mejora continua medible — eficiencia que crece etapa a etapa',
    ],
    clientValue:
      'Anticipación y optimización — menos paradas imprevistas, mejor uso de recursos y ROI acumulativo sobre la inversión en datos.',
    visual: 'terminal' as const,
  },
]

const orionFeatures = [
  'Tracking GPS en tiempo real',
  'Alertas y eventos críticos',
  'Score de choferes y simulación',
  'Integrado con SynecT Field Unit',
]

const visionSpecs = [
  { icon: Gauge, label: 'Visibilidad inmediata', detail: 'El dato en pantalla, en planta' },
  { icon: Shield, label: 'Bases escalables', detail: 'Listo para Connect e Insight' },
  { icon: Wifi, label: 'Prueba de valor', detail: 'Inversión inicial accesible' },
  { icon: Activity, label: 'Reacción en vivo', detail: 'Alertas y eventos críticos' },
]

const connectInsightSpecs = [
  { icon: Database, label: 'SynecT Connect', detail: 'Almacenamiento soberano y escalable' },
  { icon: Lock, label: 'Datacenter propio', detail: 'Seguridad y cumplimiento corporativo' },
  { icon: LineChart, label: 'SynecT Insight', detail: 'Dashboards e indicadores KPI' },
  { icon: TrendingUp, label: 'Análisis avanzado', detail: 'Patrones, tendencias y correlaciones' },
]

const intellSpecs = [
  { icon: Sparkles, label: 'Predicción', detail: 'Anticipa fallas y desvíos' },
  { icon: Bot, label: 'Optimización', detail: 'Ajuste automático de parámetros' },
  { icon: Brain, label: 'Anomalías', detail: 'Detección multivariable avanzada' },
  { icon: TrendingUp, label: 'ROI', detail: 'Eficiencia que crece en el tiempo' },
]

const products = [
  {
    id: 'vision' as const,
    label: 'VISION',
    tagline: 'De la medición a la predicción',
    description:
      'De la medición al liderazgo con IA — Vision para ver, Connect + Insight para entender, Intell para predecir y optimizar.',
  },
  {
    id: 'orion' as const,
    label: 'ORION',
    tagline: 'Fleet Control',
    description:
      'Vertical de flotas sobre el mismo stack SynecT — mapa en vivo, telemetría y caja negra en campo.',
  },
]

function productFromHash(): Product {
  const hash = window.location.hash.replace('#', '')
  return hash === 'orion' ? 'orion' : 'vision'
}

function scrollToEcosystem() {
  document.getElementById('ecosistema')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function VisionVisual({ type }: { type: (typeof visionTabs)[number]['visual'] }) {
  switch (type) {
    case 'vision':
      return <VisionPhotoShowcase />
    case 'terminal':
      return <AgentVisual />
    default:
      return <PlatformVisual />
  }
}

function FlowStrip({
  steps,
  tagline,
  columns = 4,
}: {
  steps: typeof visionFlow
  tagline: string
  columns?: 3 | 4
}) {
  const colClass = columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'

  return (
    <div className="border-b border-white/5 px-6 py-8 sm:px-10 sm:py-10">
      <div className={`grid grid-cols-2 gap-4 sm:gap-3 ${colClass}`}>
        {steps.map((step, i) => (
          <div key={step.label} className="relative flex flex-col items-center text-center">
            {i < steps.length - 1 && (
              <span className="absolute right-0 top-5 hidden translate-x-1/2 text-synect-orange/30 sm:block">
                <ArrowRight size={14} />
              </span>
            )}
            <div className="glass-orange flex h-10 w-10 items-center justify-center rounded-xl">
              <step.icon className="text-synect-orange" size={16} />
            </div>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-neutral-600">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-white">{step.short}</p>
            <p className="mt-0.5 hidden text-[10px] text-neutral-500 sm:block">{step.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-neutral-400">{tagline}</p>
    </div>
  )
}

const ECOSYSTEM_SCROLL_HASHES = new Set([
  'ecosistema',
  'vision',
  'orion',
  'ecosistema-vision',
  'ecosistema-connect',
  'ecosistema-intell',
  'connect',
  'intell',
])

export function SynectEcosystem() {
  const [product, setProduct] = useState<Product>(productFromHash)
  const [visionLayer, setVisionLayer] = useState<VisionStageId>(
    () => visionStageFromHash(window.location.hash) ?? 'synect-vision'
  )
  const currentLayer = visionTabs.find((t) => t.id === visionLayer) ?? visionTabs[0]
  const currentProduct = products.find((p) => p.id === product) ?? products[0]

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      const stage = visionStageFromHash(hash)

      if (hash === 'orion') {
        setProduct('orion')
      } else if (stage) {
        setProduct('vision')
        setVisionLayer(stage)
      } else if (hash === 'ecosistema' || hash === 'vision') {
        setProduct('vision')
        setVisionLayer('synect-vision')
      } else {
        setProduct(productFromHash())
      }

      if (ECOSYSTEM_SCROLL_HASHES.has(hash)) {
        requestAnimationFrame(scrollToEcosystem)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const selectVisionLayer = (stage: VisionStageId) => {
    setVisionLayer(stage)
    const hash = hashForVisionStage(stage)
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash)
    }
  }

  const selectProduct = (next: Product) => {
    setProduct(next)
    if (next === 'orion') {
      if (window.location.hash !== '#orion') {
        history.replaceState(null, '', '#orion')
      }
      return
    }
    setVisionLayer('synect-vision')
    const hash = hashForVisionStage('synect-vision')
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash)
    }
  }

  return (
    <section id="ecosistema" className="section-seamless relative overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-synect-orange/[0.04] via-transparent to-transparent" />
      <div className="absolute left-0 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-synect-orange/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
            Ecosistema SynecT
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Productos propios.
            <br />
            <span className="text-neutral-500">Un solo stack industrial.</span>
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Hardware, software e IA de fábrica SynecT. Elegí el vertical que querés explorar —
            todo vive en la misma plataforma.
          </p>
        </motion.div>

        {/* Selector de producto */}
        <div
          className="mx-auto mt-10 flex max-w-md justify-center"
          role="tablist"
          aria-label="Productos del ecosistema SynecT"
        >
          <div className="glass flex w-full rounded-full p-1.5">
            {products.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={product === item.id}
                onClick={() => selectProduct(item.id)}
                className={`flex flex-1 flex-col items-center rounded-full px-4 py-3 text-sm font-semibold transition-all duration-400 sm:flex-row sm:justify-center sm:gap-2 ${
                  product === item.id
                    ? 'bg-synect-orange text-black shadow-[0_0_40px_rgba(255,107,0,0.35)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`hidden font-mono text-[10px] font-normal uppercase tracking-wider sm:inline ${
                    product === item.id ? 'text-black/60' : 'text-neutral-600'
                  }`}
                >
                  {item.tagline}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel único integrado */}
        <motion.div
          layout
          className="relative mt-10 overflow-hidden rounded-3xl glass-strong"
        >
          <AnimatePresence mode="wait">
            {product === 'vision' ? (
              <motion.div
                key="vision"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-5 sm:px-10">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                      Producto VISION
                    </p>
                    <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
                      Ruta{' '}
                      <span className="text-gradient-orange">VISION</span>
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      De la medición a la predicción — SynecT Vision, Connect + Insight e
                      Intell
                    </p>
                  </div>
                  <span className="hidden font-mono text-[10px] text-synect-orange sm:block">
                    3 ETAPAS
                  </span>
                </div>

                <p className="border-b border-white/5 px-6 py-4 text-sm text-neutral-400 sm:px-10">
                  {currentProduct.description} Una ruta tecnológica progresiva: transformá
                  mediciones de campo en predicción y eficiencia automatizada, con ROI
                  medible en cada escalón.
                </p>

                <FlowStrip
                  steps={visionFlow}
                  columns={3}
                  tagline="Comenzá con SynecT Vision. Escalá con Connect + Insight. Anticipá con SynecT Intell."
                />

                <div className="px-6 py-8 sm:px-10 sm:py-10">
                  <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
                    Etapas del producto
                  </p>

                  <div
                    className="mt-4 flex flex-wrap gap-2"
                    role="tablist"
                    aria-label="Etapas de VISION"
                  >
                    {visionTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={visionLayer === tab.id}
                        onClick={() => selectVisionLayer(tab.id as VisionStageId)}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          visionLayer === tab.id
                            ? 'bg-white/10 text-white ring-1 ring-synect-orange/40'
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        <tab.icon size={15} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={visionLayer}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
                    >
                      <div role="tabpanel" className="order-2 lg:order-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-synect-orange/70">
                            ETAPA {currentLayer.step}
                          </span>
                          <div className="glass-orange inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] text-synect-orange">
                            {visionLayer === 'synect-intell' && <Sparkles size={12} />}
                            {currentLayer.badge}
                          </div>
                        </div>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                          {currentLayer.label}
                        </p>
                        <h4 className="mt-1 text-xl font-bold sm:text-2xl">
                          {currentLayer.title}
                        </h4>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-400">
                          {currentLayer.description}
                        </p>

                        {visionLayer === 'connect-insight' && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] text-neutral-400">
                              <Database size={11} className="text-synect-orange" />
                              SynecT Connect
                            </span>
                            <span className="glass-orange inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] text-synect-orange">
                              <LineChart size={11} />
                              SynecT Insight
                            </span>
                          </div>
                        )}

                        <ul className="mt-5 hidden space-y-2.5 sm:block">
                          {currentLayer.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm text-neutral-300"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-synect-orange" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {'clientValue' in currentLayer && currentLayer.clientValue && (
                          <div className="mt-6 glass-orange rounded-xl p-4 text-sm leading-relaxed text-neutral-300">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-synect-orange">
                              Valor para el cliente
                            </span>
                            <p className="mt-2">{currentLayer.clientValue}</p>
                          </div>
                        )}

                        {visionLayer === 'synect-vision' && (
                          <div className="mt-6 hidden gap-2.5 sm:grid sm:grid-cols-2">
                            {visionSpecs.map((spec) => (
                              <div key={spec.label} className="glass flex gap-3 rounded-xl p-3.5">
                                <spec.icon
                                  className="mt-0.5 shrink-0 text-synect-orange"
                                  size={16}
                                />
                                <div>
                                  <p className="text-xs font-semibold text-white">{spec.label}</p>
                                  <p className="mt-0.5 text-[11px] text-neutral-500">
                                    {spec.detail}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {visionLayer === 'connect-insight' && (
                          <div className="mt-6 hidden gap-2.5 sm:grid sm:grid-cols-2">
                            {connectInsightSpecs.map((spec) => (
                              <div key={spec.label} className="glass flex gap-3 rounded-xl p-3.5">
                                <spec.icon
                                  className="mt-0.5 shrink-0 text-synect-orange"
                                  size={16}
                                />
                                <div>
                                  <p className="text-xs font-semibold text-white">{spec.label}</p>
                                  <p className="mt-0.5 text-[11px] text-neutral-500">
                                    {spec.detail}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {visionLayer === 'synect-intell' && (
                          <div className="mt-6 hidden gap-2.5 sm:grid sm:grid-cols-2">
                            {intellSpecs.map((spec) => (
                              <div key={spec.label} className="glass flex gap-3 rounded-xl p-3.5">
                                <spec.icon
                                  className="mt-0.5 shrink-0 text-synect-orange"
                                  size={16}
                                />
                                <div>
                                  <p className="text-xs font-semibold text-white">{spec.label}</p>
                                  <p className="mt-0.5 text-[11px] text-neutral-500">
                                    {spec.detail}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="relative order-1 flex items-center justify-center lg:order-2">
                        <VisionVisual type={currentLayer.visual} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <EcosystemCta product="vision" />
              </motion.div>
            ) : (
              <motion.div
                key="orion"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative min-h-[520px]"
              >
                <OrionSectionBg />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-5 backdrop-blur-sm sm:px-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        Ecosistema ORION
                      </p>
                      <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
                        ORION{' '}
                        <span className="text-gradient-orange glow-text">Fleet Control</span>
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-synect-orange">FLOTA + CAMPO</span>
                  </div>

                  <p className="border-b border-white/10 bg-black/15 px-6 py-4 text-sm text-neutral-300 backdrop-blur-sm sm:px-10">
                    {currentProduct.description}
                  </p>

                  <div className="bg-black/20 backdrop-blur-sm">
                    <FlowStrip
                      steps={orionFlow}
                      columns={4}
                      tagline="Hardware ruggedizado en ruta. Telemetría y mapa en vivo desde el mismo stack SynecT."
                    />

                    <div className="grid items-center gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-2 lg:gap-14">
                      <div className="order-2 lg:order-1">
                        <div className="glass-orange inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] text-synect-orange">
                          <Map size={12} />
                          Control de flotas
                        </div>
                        <h4 className="mt-4 text-xl font-bold sm:text-2xl">
                          Monitoreo de flotas en vivo
                        </h4>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-300">
                          Mapa en vivo, tracking GPS, alertas y telemetría de caja negra — nativo
                          en hardware SynecT, listo para salir a ruta.
                        </p>

                        <ul className="mt-5 space-y-2.5">
                          {orionFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm text-neutral-300"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-synect-orange" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 glass rounded-xl p-4 font-mono text-xs">
                          <Sparkles size={12} className="mb-2 inline text-synect-orange" />
                          <span className="text-neutral-500"> STACK </span>
                          <span className="text-white">SynecT HW + SW</span>
                          <span className="mx-2 text-neutral-700">·</span>
                          <span className="text-synect-orange">ORION nativo</span>
                        </div>
                      </div>

                      <div className="relative order-1 flex items-center justify-center lg:order-2">
                        <OrionPhotoShowcase />
                      </div>
                    </div>
                  </div>

                  <EcosystemCta product="orion" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
