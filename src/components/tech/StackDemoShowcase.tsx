import { motion } from 'framer-motion'
import { pipelineSteps, stackDemoPanels } from '../../lib/tech/stackDemoPanels'
import { TechDemoPanel } from './TechDemoPanel'

export function StackDemoShowcase() {
  return (
    <section
      id="stack-demo"
      className="relative border-y border-white/[0.06] py-16 lg:py-24"
      aria-label="Ejemplos del stack SynecT"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-synect-orange/[0.03] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="tech-eyebrow">DEMO // STACK MODULES</p>
            <h2 className="tech-title mt-3">
              El stack,
              <br />
              <span className="text-neutral-500">en paneles.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
              Paneles ilustrativos del flujo SynecT — de sensores en campo a IA en planta y
              flota. Sin métricas inventadas: muestran cómo se ve operar el ecosistema.
            </p>

            <div className="tech-pipeline mt-10">
              {pipelineSteps.map((step, i) => (
                <div key={step.id} className="tech-pipeline-step">
                  <span className="tech-pipeline-index">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-white">
                      {step.label}
                    </p>
                    <p className="font-mono text-[10px] text-neutral-600">{step.sub}</p>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <span className="tech-pipeline-arrow hidden sm:inline" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="tech-readout mt-8 border-l border-white/10 pl-3">
              <span>[NOTE]</span> Simulaciones interactivas · próximamente
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stackDemoPanels.map((panel, i) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <TechDemoPanel panel={panel} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
