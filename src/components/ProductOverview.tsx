import { motion } from 'framer-motion'
import { Cpu, Eye, Truck } from 'lucide-react'

const visionSteps = [
  { step: '1', name: 'SynecT Vision', text: 'Ver el dato en vivo, en planta.' },
  { step: '2', name: 'Connect + Insight', text: 'Guardar y analizar con dashboards.' },
  { step: '3', name: 'SynecT Intell', text: 'Anticipar fallas con IA.' },
]

/** Resumen estático — sin enlaces duplicados a las fichas de abajo */
export function ProductOverview() {
  return (
    <div id="mapa-plataforma" className="scroll-mt-28">
      <p className="text-center text-sm text-neutral-500">
        <span className="font-mono text-[10px] uppercase tracking-wider text-synect-orange">
          Resumen
        </span>
        {' · '}
        El detalle de cada producto está en el selector y la ficha de abajo.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-6">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-panel p-5"
        >
          <div className="flex items-center gap-3">
            <Cpu className="text-synect-orange" size={20} />
            <div>
              <p className="font-bold">SynecT</p>
              <p className="font-mono text-[10px] text-neutral-500">La plataforma</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Hardware, software e IA propios. Base de VISION y ORION — no es un producto que se
            compra aislado.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="tech-panel-orange p-5 ring-1 ring-synect-orange/15"
        >
          <div className="flex items-center gap-3">
            <Eye className="text-synect-orange" size={20} />
            <div>
              <p className="font-bold">VISION</p>
              <p className="font-mono text-[10px] text-neutral-500">Planta · 3 etapas</p>
            </div>
          </div>
          <ol className="mt-3 space-y-2">
            {visionSteps.map((item) => (
              <li key={item.step} className="text-xs text-neutral-400">
                <span className="font-mono text-synect-orange/80">{item.step}.</span>{' '}
                <span className="text-neutral-300">{item.name}</span> — {item.text}
              </li>
            ))}
          </ol>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="tech-panel p-5"
        >
          <div className="flex items-center gap-3">
            <Truck className="text-synect-orange" size={20} />
            <div>
              <p className="font-bold">ORION</p>
              <p className="font-mono text-[10px] text-neutral-500">Flotas · campo</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Mapa en vivo, GPS, telemetría en ruta y alertas — mismo stack SynecT, vertical
            logística.
          </p>
        </motion.article>
      </div>
    </div>
  )
}
