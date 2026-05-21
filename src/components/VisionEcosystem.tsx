import { motion } from 'framer-motion'
import { Eye, Brain, Radio, History, Bot, Activity, ArrowRight, HardDrive, Monitor } from 'lucide-react'

const layers = [
  {
    icon: Radio,
    tag: 'Capa 01',
    title: 'Sensores SynecT',
    description:
      'Red de sensores propios capturando variables críticas en planta — niveles, temperatura, presión, flujo.',
  },
  {
    icon: Eye,
    tag: 'Capa 02',
    title: 'SynecT Vision',
    description:
      'Pantalla industrial en tiempo real. Cada sensor visible al instante, con gráficos, alertas y tendencias en el piso de producción.',
  },
  {
    icon: Brain,
    tag: 'Capa 03',
    title: 'Plataforma VISION + Agente IA',
    description:
      'Históricos centralizados, analítica avanzada y agente de IA que aprende, diagnostica y prescribe acciones.',
  },
]

const pillars = [
  {
    icon: HardDrive,
    name: 'SynecT Vision',
    role: 'Tiempo real en planta',
    description: 'El rostro del ecosistema: monitoreo live de cada sensor en el piso de producción.',
  },
  {
    icon: Monitor,
    name: 'Plataforma VISION',
    role: 'Históricos + analítica',
    description: 'Donde el presente se convierte en datos accionables y reportes de alto impacto.',
  },
  {
    icon: Brain,
    name: 'Agente de IA',
    role: 'Inteligencia predictiva',
    description: 'Aprende de cada planta para optimizar procesos y prevenir fallas de forma autónoma.',
  },
]

export function VisionEcosystem() {
  return (
    <section id="vision" className="section-seamless relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-synect-orange/[0.04] via-transparent to-transparent" />
      <div className="absolute left-0 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-synect-orange/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
            Ecosistema principal
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
            <span className="text-shimmer">VISION</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Hardware, plataforma y agente de IA diseñados juntos — del sensor en planta a la
            decisión gerencial.
          </p>
        </motion.div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-orange inline-flex rounded-full px-3 py-1 font-mono text-[10px] text-synect-orange">
              HW + SW + IA — UN SOLO ECOSISTEMA
            </div>
            <h3 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
              La pantalla ve el presente.
              <br />
              <span className="text-neutral-500">La plataforma entiende el pasado.</span>
            </h3>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Activity, label: 'Monitoreo en vivo' },
                { icon: History, label: 'Históricos completos' },
                { icon: Bot, label: 'Agente IA integrado' },
              ].map((f) => (
                <div
                  key={f.label}
                  className="glass flex items-center gap-2 rounded-full px-4 py-2"
                >
                  <f.icon className="text-synect-orange" size={16} />
                  <span className="text-xs text-neutral-400">{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#productos"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-synect-orange px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-synect-orange-light hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]"
            >
              Explorar productos
              <ArrowRight size={16} />
            </a>

            <div className="mt-10 glass-strong rounded-2xl p-5 text-left">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-neutral-500">FLUJO VISION</span>
                <span className="text-synect-orange">SINCRONIZADO</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {['SENSORES', 'SynecT Vision', 'PLATAFORMA', 'IA'].map((step, idx) => (
                  <span key={step} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-synect-orange/40">→</span>}
                    <span className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] text-neutral-400">
                      {step}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {layers.map((layer, i) => (
            <motion.article
              key={layer.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 ${i === 1 ? 'glass-orange md:-translate-y-2' : ''}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-synect-orange">
                {layer.tag}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="glass-orange rounded-xl p-2.5">
                  <layer.icon className="text-synect-orange" size={20} />
                </div>
                <h4 className="text-lg font-bold">{layer.title}</h4>
              </div>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                {layer.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass group rounded-2xl p-6 transition-all hover:border-synect-orange/20"
            >
              <div className="flex items-start gap-4">
                <div className="glass-orange shrink-0 rounded-xl p-3">
                  <pillar.icon className="text-synect-orange" size={22} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">{pillar.name}</h3>
                    <span className="font-mono text-[10px] text-neutral-600">{pillar.role}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-400">{pillar.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
