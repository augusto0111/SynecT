import { motion } from 'framer-motion'
import { Factory, FlaskConical, Truck, Zap } from 'lucide-react'

const industries = [
  { icon: FlaskConical, label: 'Química y procesos' },
  { icon: Factory, label: 'Manufactura' },
  { icon: Truck, label: 'Logística y flotas' },
  { icon: Zap, label: 'Energía e infraestructura' },
]

export function SocialProof() {
  return (
    <section
      className="relative border-y border-white/[0.06] bg-black/30 py-8"
      aria-label="Industrias que atendemos"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <div className="max-w-md text-center sm:text-left">
            <p className="tech-eyebrow">SECTORES // INDUSTRIA</p>
            <p className="mt-2 text-sm text-neutral-400">
              <span className="font-mono text-neutral-300">[STACK]</span> sensores, pantallas en
              planta, plataforma de datos e IA predictiva para operaciones reales.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {industries.map((item) => (
              <li key={item.label}>
                <span className="tech-panel inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  <item.icon size={12} className="shrink-0 text-synect-orange" />
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
