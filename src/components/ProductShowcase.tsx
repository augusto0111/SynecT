import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Bot,
  Eye,
  Map,
  Sparkles,
  Gauge,
  Shield,
  Wifi,
  Activity,
} from 'lucide-react'
import { VisionPhotoShowcase } from './VisionPhotoShowcase'
import { PlatformVisual } from './visuals/PlatformVisual'
import { AgentVisual } from './visuals/AgentVisual'
import { OrionSectionBg, OrionHudPanel } from './visuals/OrionSectionBg'

const tabs = [
  {
    id: 'synect-vision',
    label: 'SynecT Vision',
    icon: Eye,
    badge: 'Hardware en planta',
    title: 'El presente, en el piso de producción',
    description:
      'Pantalla industrial que monitorea cada sensor SynecT en tiempo real — niveles, tendencias y alertas donde ocurre la operación.',
    features: [
      'Gráficos y alertas instantáneas',
      'Carcasa industrial para planta y campo',
      'Sincronización con la Plataforma VISION',
      'UI nativa con glassmorphism integrado',
    ],
    visual: 'vision' as const,
    accent: 'from-synect-orange/20 via-transparent to-transparent',
  },
  {
    id: 'plataforma',
    label: 'Plataforma VISION',
    icon: BarChart3,
    badge: 'Datos históricos',
    title: 'Toda tu operación, registrada',
    description:
      'Centraliza telemetría agregada, eventos y KPIs de cada sensor. El complemento analítico a lo que SynecT Vision muestra en vivo.',
    features: [
      'Históricos completos de telemetría',
      'Distribución de variables y tendencias',
      'KPIs operativos y reportes avanzados',
      'Exportación y analítica prescriptiva',
    ],
    visual: 'analytics' as const,
    accent: 'from-blue-500/10 via-transparent to-synect-orange/10',
  },
  {
    id: 'agente-ia',
    label: 'Agente IA',
    icon: Bot,
    badge: 'Inteligencia predictiva',
    title: 'Inteligencia que aprende de tu planta',
    description:
      'Procesa patrones operativos, detecta anomalías y entrega recomendaciones prescriptivas antes de que un fallo impacte la producción.',
    features: [
      'Aprendizaje continuo por planta',
      'Detección autónoma de anomalías',
      'Diagnóstico y analítica predictiva',
      'Prescripciones accionables',
    ],
    visual: 'terminal' as const,
    accent: 'from-synect-orange/15 via-purple-500/5 to-transparent',
  },
  {
    id: 'orion',
    label: 'ORION Fleet',
    icon: Map,
    badge: 'Control de flotas',
    title: 'Monitoreo de flotas en vivo',
    description:
      'Vertical de flotas sobre la misma infraestructura VISION. Mapa en vivo, tracking GPS, alertas y telemetría de caja negra — nativo en hardware SynecT.',
    features: [
      'Tracking GPS en tiempo real',
      'Alertas y eventos críticos',
      'Score de choferes y simulación',
      'Integrado con SynecT Field Unit',
    ],
    visual: 'orion' as const,
    accent: 'from-synect-orange/25 via-transparent to-synect-orange/5',
  },
]

const visionSpecs = [
  { icon: Gauge, label: 'Sensores en vivo', detail: 'Gráficos y alertas instantáneas' },
  { icon: Shield, label: 'Carcasa industrial', detail: 'Diseñada para planta y campo' },
  { icon: Wifi, label: 'Sync con plataforma', detail: 'Históricos + agente IA' },
  { icon: Activity, label: 'UI SynecT nativa', detail: 'Glassmorphism integrado' },
]

function ProductVisual({ type }: { type: (typeof tabs)[number]['visual'] }) {
  switch (type) {
    case 'vision':
      return <VisionPhotoShowcase />
    case 'terminal':
      return <AgentVisual />
    default:
      return <PlatformVisual />
  }
}

function TabContent({
  active,
  current,
  onVideoBg = false,
}: {
  active: string
  current: (typeof tabs)[number]
  onVideoBg?: boolean
}) {
  return (
    <div className={onVideoBg ? 'glass-strong rounded-3xl p-8 sm:p-10' : undefined}>
      <div className="glass-orange inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] text-synect-orange">
        {active === 'agente-ia' && <Sparkles size={12} />}
        {current.badge}
      </div>
      <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{current.title}</h3>
      <p className={`mt-3 max-w-lg leading-relaxed ${onVideoBg ? 'text-neutral-300' : 'text-neutral-400'}`}>
        {current.description}
      </p>

      <ul className="mt-6 space-y-3">
        {current.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-synect-orange" />
            {feature}
          </li>
        ))}
      </ul>

      {active === 'synect-vision' && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {visionSpecs.map((spec) => (
            <div key={spec.label} className="glass flex gap-3 rounded-xl p-4">
              <spec.icon className="mt-0.5 shrink-0 text-synect-orange" size={18} />
              <div>
                <p className="text-sm font-semibold text-white">{spec.label}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{spec.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ProductShowcase() {
  const [active, setActive] = useState('synect-vision')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]
  const isOrion = active === 'orion'

  return (
    <section
      id="productos"
      className={`relative overflow-hidden ${
        isOrion ? 'section-orion-cinema min-h-svh py-28' : 'section-seamless py-28'
      }`}
    >
      <AnimatePresence mode="wait">
        {isOrion && <OrionSectionBg key="orion-bg" />}
      </AnimatePresence>

      {!isOrion && (
        <>
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${current.accent} transition-all duration-700`}
          />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-synect-orange/8 blur-[140px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
            Productos
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
            Un ecosistema.
            <br />
            <span className="text-gradient-orange glow-text">Cuatro capas.</span>
          </h2>
          <p className={`mt-4 ${isOrion ? 'text-neutral-300' : 'text-neutral-400'}`}>
            Hardware en planta, plataforma en la nube, agente de IA y control de flotas — un solo
            stack, cero piezas sueltas.
          </p>
        </motion.div>

        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Productos SynecT"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
                active === tab.id
                  ? 'bg-synect-orange text-black shadow-[0_0_40px_rgba(255,107,0,0.4)] scale-[1.02]'
                  : isOrion
                    ? 'glass-strong text-neutral-300 hover:text-white'
                    : 'glass text-neutral-400 hover:text-white hover:border-white/15'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              role="tabpanel"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <TabContent active={active} current={current} onVideoBg={isOrion} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative flex items-center justify-center"
            >
              {isOrion ? (
                <OrionHudPanel />
              ) : (
                <ProductVisual type={current.visual} />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
