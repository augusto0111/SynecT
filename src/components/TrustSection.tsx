import { motion } from 'framer-motion'
import { Quote, Cpu, Layers, ShieldCheck } from 'lucide-react'

const pillars = [
  {
    icon: Layers,
    title: 'Stack propio',
    text: 'Hardware SynecT, plataforma de datos y agente de IA — diseñados para trabajar juntos, no como parches.',
  },
  {
    icon: Cpu,
    title: 'De sensor a decisión',
    text: 'Telemetría en vivo en planta, históricos centralizados y prescripciones predictivas en un solo flujo.',
  },
  {
    icon: ShieldCheck,
    title: 'Hecho para operación real',
    text: 'Interfaces pensadas para piso de producción y gerencia — carcasas industriales, alertas claras, datos accionables.',
  },
]

export function TrustSection() {
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
            SynecT nace de la gestión directa de fábricas y líneas de producción. Construimos
            lo que necesitamos operar — y lo llevamos a otras industrias con el mismo rigor.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
            >
              <pillar.icon className="text-synect-orange" size={22} />
              <h3 className="mt-4 font-bold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

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
