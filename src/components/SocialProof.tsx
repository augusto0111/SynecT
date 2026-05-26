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
      className="relative border-y border-white/5 bg-white/[0.02] py-8"
      aria-label="Industrias que atendemos"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <p className="max-w-md text-center text-sm text-neutral-500 sm:text-left">
            <span className="text-neutral-300">Stack industrial propio</span> — sensores,
            pantallas en planta, plataforma de datos e IA predictiva para operaciones reales.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            {industries.map((item) => (
              <li key={item.label}>
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-neutral-400">
                  <item.icon size={14} className="shrink-0 text-synect-orange" />
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
