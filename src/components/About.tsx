import { motion } from 'framer-motion'
import { Globe, Factory, Layers } from 'lucide-react'

const highlights = [
  {
    icon: Factory,
    title: 'Experiencia real en planta',
    text: 'Fundada por quienes gestionan planta y producción — entendemos tiempos de parada, riesgo operativo y presión de KPIs.',
  },
  {
    icon: Layers,
    title: 'Ingeniería de punta',
    text: 'Equipo integrado de ingenieros, programadores y diseñadores 3D especializados en interfaces industriales.',
  },
  {
    icon: Globe,
    title: 'Expansión global',
    text: 'Diseñada para escalar a nivel nacional e internacional. Soluciones que se adaptan a industrias complejas en cualquier mercado.',
  },
]

export function About() {
  return (
    <section id="nosotros" className="section-seamless relative py-24 overflow-hidden">
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-synect-orange/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
              Quiénes Somos
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl leading-tight">
              Transformación digital
              <br />
              <span className="text-neutral-500">con raíces industriales</span>
            </h2>
            <p className="mt-6 text-neutral-400 leading-relaxed">
              SynecT transforma datos físicos en inteligencia accionable — desde la
              captura en campo hasta modelos de IA que optimizan el negocio. VISION
              articula esa ruta en tres etapas: Vision, Connect + Insight e Intell.
              ORION extiende el stack a flotas y operación en campo.
            </p>
          </motion.div>

          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass flex gap-5 rounded-2xl p-6 transition-all hover:border-white/15"
              >
                <div className="glass-orange shrink-0 rounded-xl p-3 h-fit">
                  <item.icon className="text-synect-orange" size={22} />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
