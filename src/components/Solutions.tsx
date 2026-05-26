import { motion } from 'framer-motion'
import { Gauge, Cpu, BrainCircuit, ArrowRight } from 'lucide-react'

const solutions = [
  {
    icon: Gauge,
    number: '01',
    title: 'SynecT Vision — visibilidad in situ',
    description:
      'Reemplazá medidores físicos por pantallas industriales con visibilidad inmediata. Baja inversión inicial, alta tangibilidad y bases listas para escalar.',
    tags: ['Adquisición in situ', 'Tiempo real', 'Prueba de valor'],
    cta: { href: '#ecosistema-vision', label: 'Ver SynecT Vision' },
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Connect + Insight — datos y análisis',
    description:
      'Almacenamiento soberano con SynecT Connect y dashboards con KPIs en SynecT Insight. Del historial confiable a la información que impulsa decisiones.',
    tags: ['Datacenter propio', 'Dashboards KPI', 'Históricos'],
    cta: { href: '#ecosistema-connect', label: 'Ver Connect + Insight' },
  },
  {
    icon: BrainCircuit,
    number: '03',
    title: 'SynecT Intell — IA predictiva',
    description:
      'Mantenimiento predictivo, optimización automática de procesos y detección avanzada de anomalías. De reaccionar a anticipar — con ROI medible.',
    tags: ['Mantenimiento predictivo', 'Optimización', 'ROI'],
    cta: { href: '#ecosistema-intell', label: 'Ver SynecT Intell' },
  },
]

export function Solutions() {
  return (
    <section id="soluciones" className="section-seamless relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synect-orange/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
            Soluciones
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Capacidades industriales
            <br />
            <span className="text-neutral-500">sobre el stack SynecT.</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            Las tres etapas de la ruta VISION — más integración de PLCs,
            telemetría industrial y soluciones a medida sobre el stack SynecT.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map((solution, i) => (
            <motion.article
              key={solution.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group glass relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-synect-orange/30 hover:bg-white/[0.04]"
            >
              <div className="absolute -right-4 -top-4 text-8xl font-black text-white/[0.03] transition-colors group-hover:text-synect-orange/10">
                {solution.number}
              </div>

              <div className="glass-orange mb-6 inline-flex rounded-xl p-3">
                <solution.icon className="text-synect-orange" size={24} />
              </div>

              <h3 className="text-xl font-bold leading-snug">{solution.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                {solution.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={solution.cta.href}
                onClick={
                  solution.cta.href === '#contacto'
                    ? () => sessionStorage.setItem('synect-demo-product', 'integracion')
                    : undefined
                }
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-synect-orange transition-colors hover:text-synect-orange-light"
              >
                {solution.cta.label}
                <ArrowRight size={14} />
              </a>

              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-synect-orange to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
