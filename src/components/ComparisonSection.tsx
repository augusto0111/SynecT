import { motion } from 'framer-motion'
import { X, Minus, Check } from 'lucide-react'

const columns = [
  {
    title: 'Medición manual',
    subtitle: 'Datos atrapados en lo analógico',
    tone: 'muted' as const,
    items: [
      'Medidores físicos y registros en papel',
      'Visibilidad tardía — el dato llega tarde a decisión',
      'Procesos manuales propensos a error humano',
      'Sin historial digital confiable',
    ],
  },
  {
    title: 'Sistemas aislados',
    subtitle: 'Información fragmentada',
    tone: 'muted' as const,
    items: [
      'Múltiples vendors sin integración real',
      'Sensores y software desconectados entre sí',
      'Operaciones complejas y soporte fragmentado',
      'Licencias costosas sin visión unificada',
    ],
  },
  {
    title: 'SynecT',
    subtitle: 'Stack unificado de punta a punta',
    tone: 'highlight' as const,
    items: [
      'Un vendor para campo, datos e inteligencia — sin silos',
      'Adopción progresiva: empezá donde tengas más dolor',
      'Soberanía de datos con infraestructura propia',
      'VISION para planta, ORION para flota — mismo ecosistema',
    ],
  },
]

export function ComparisonSection() {
  return (
    <section id="comparativa" className="section-seamless relative py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synect-orange/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="tech-eyebrow">COMPARATIVA // EL PROBLEMA</p>
          <h2 className="tech-title mt-3">
            La brecha entre el dato
            <br />
            <span className="text-neutral-500">y la decisión.</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            Muchas operaciones generan datos valiosos, pero esos datos no llegan a tiempo a
            quien decide. SynecT une captura en campo, plataforma e IA en un solo stack.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {columns.map((col, i) => (
            <motion.article
              key={col.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
                col.tone === 'highlight'
                  ? 'glass-orange ring-1 ring-synect-orange/30'
                  : 'glass'
              }`}
            >
              {col.tone === 'highlight' && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-synect-orange/15 blur-[50px]" />
              )}

              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                {col.tone === 'highlight' ? 'SynecT' : 'Enfoque tradicional'}
              </p>
              <h3 className="mt-2 text-xl font-bold">{col.title}</h3>
              <p
                className={`mt-1 text-sm ${
                  col.tone === 'highlight' ? 'text-synect-orange' : 'text-neutral-500'
                }`}
              >
                {col.subtitle}
              </p>

              <ul className="mt-6 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-neutral-300">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        col.tone === 'highlight'
                          ? 'bg-synect-orange/20 text-synect-orange'
                          : 'bg-white/5 text-neutral-600'
                      }`}
                    >
                      {col.tone === 'highlight' ? (
                        <Check size={12} />
                      ) : i === 0 ? (
                        <X size={12} />
                      ) : (
                        <Minus size={12} />
                      )}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center font-mono text-xs text-neutral-500"
        >
          SynecT cierra la brecha entre el dato físico y la decisión digital.
        </motion.p>
      </div>
    </section>
  )
}
