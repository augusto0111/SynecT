import { motion } from 'framer-motion'
import { Gauge, Cpu, BrainCircuit, Truck } from 'lucide-react'

const solutions = [
  {
    icon: Gauge,
    number: '01',
    title: 'Monitoreo de Precisión en Tiempo Real',
    description:
      'Ecosistemas propios para medir variables críticas con extrema precisión. Monitoreo de niveles en tanques químicos, gestión de stock exacta y mitigación de riesgos productivos.',
    tags: ['Hardware SynecT', 'Tanques químicos', 'Alertas instantáneas'],
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Integración y Telemetría de PLCs',
    description:
      'Nos conectamos a la médula espinal de la industria. Extraemos datos directamente de PLCs en líneas de producción para generar telemetría robusta y flujo constante de información.',
    tags: ['Modbus / OPC-UA', 'Líneas productivas', 'Data pipeline'],
  },
  {
    icon: BrainCircuit,
    number: '03',
    title: 'Inteligencia Artificial Predictiva',
    description:
      'Nuestro motor de IA aprende ininterrumpidamente de los patrones operativos. Optimiza procesos, mejora diagnósticos de forma autónoma y previene fallas antes de que impacten la producción.',
    tags: ['ML propio', 'Diagnóstico autónomo', 'Prescriptivo'],
  },
  {
    icon: Truck,
    number: '04',
    title: 'ORION Fleet Control',
    description:
      'Plataforma de monitoreo de flotas con mapa en vivo, analítica de telemetría y caja negra. Corre nativamente en dispositivos SynecT — tracking, alertas y score de choferes.',
    tags: ['Mapa en vivo', 'Caja negra', 'Score de choferes'],
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
            Industria y flotas.
            <br />
            <span className="text-neutral-500">Un ecosistema.</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            Desde monitoreo en planta hasta control de flotas — cada vertical corre sobre la
            infraestructura VISION.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
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

              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-synect-orange to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
