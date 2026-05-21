import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Factory, FlaskConical, Truck, Zap, Quote } from 'lucide-react'

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime del sistema', decimals: 1 },
  { value: 847, suffix: '+', label: 'Nodos monitoreados', decimals: 0 },
  { value: 24, suffix: '/7', label: 'Operación continua', decimals: 0 },
  { value: 3, suffix: '', label: 'Capas integradas', decimals: 0 },
]

const sectors = [
  {
    icon: FlaskConical,
    title: 'Química y procesos',
    text: 'Monitoreo de tanques, niveles críticos y mitigación de riesgos productivos.',
  },
  {
    icon: Factory,
    title: 'Manufactura',
    text: 'Telemetría de PLCs, líneas de producción y variables operativas en tiempo real.',
  },
  {
    icon: Truck,
    title: 'Logística y flotas',
    text: 'Tracking GPS, caja negra y score de choferes con ORION Fleet Control.',
  },
  {
    icon: Zap,
    title: 'Energía e infraestructura',
    text: 'Sensores distribuidos, históricos centralizados y alertas predictivas.',
  },
]

function AnimatedNumber({
  value,
  suffix,
  decimals,
  inView,
}: {
  value: number
  suffix: string
  decimals: number
  inView: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const start = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, value])

  return (
    <span>
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display)}
      {suffix}
    </span>
  )
}

export function TrustSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="confianza" className="section-seamless section-light relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
            Confianza
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Diseñado en planta,
            <br />
            <span className="text-neutral-500">no en un deck.</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            SynecT nace de la gestión directa de fábricas y líneas de producción. Conocemos la
            industria porque venimos de ella.
          </p>
        </motion.div>

        <div ref={ref} className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-synect-orange lg:text-4xl">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  inView={inView}
                />
              </p>
              <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-synect-orange/20"
            >
              <sector.icon className="text-synect-orange" size={22} />
              <h3 className="mt-4 font-bold">{sector.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{sector.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-synect-orange/15 bg-synect-orange/[0.04] p-8 sm:p-10"
        >
          <Quote className="text-synect-orange/60" size={28} />
          <p className="mt-4 text-lg leading-relaxed text-neutral-300 sm:text-xl">
            &ldquo;Transformamos datos industriales complejos en interfaces claras — para que quien
            opera en planta y quien decide en gerencia hablen el mismo idioma.&rdquo;
          </p>
          <footer className="mt-6 font-mono text-xs text-neutral-500">
            — Equipo SynecT · Ingeniería industrial + software
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
