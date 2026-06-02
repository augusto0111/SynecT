import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { platformLayers, synectAudiences, synectMission } from '../lib/products'

export function WhatIsSynecT() {
  return (
    <section id="que-es-synect" className="section-seamless relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-synect-orange/[0.04] via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-synect-orange/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="tech-eyebrow">PLATAFORMA // QUÉ ES SYNECT</p>
          <h2 className="tech-title mt-3">
            {synectMission.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            {synectMission.subheadline}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {synectMission.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="tech-panel p-6"
            >
              <span className="font-mono text-[10px] text-synect-orange">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-bold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-2">
            <Users size={18} className="text-synect-orange" />
            <p className="tech-eyebrow">ROLES // QUIÉN USA QUÉ</p>
          </div>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
            Un stack, distintos roles en planta y oficina
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-neutral-400">
            SynecT no habla solo a un departamento: cada rol encuentra valor en una capa
            distinta. Los productos VISION y ORION empaquetan esas capas según tu operación.
          </p>

          <details className="group mt-8 tech-panel">
            <summary className="cursor-pointer list-none px-6 py-4 font-mono text-xs uppercase tracking-wider text-neutral-400 marker:content-none hover:text-synect-orange [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                Ver tabla por rol
                <ArrowRight
                  size={12}
                  className="transition-transform group-open:rotate-90"
                />
              </span>
            </summary>
            <div className="overflow-x-auto border-t border-white/5 px-6 pb-6">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                    <th className="pb-3 pr-4 pt-4">Rol</th>
                    <th className="pb-3 pr-4">Necesidad</th>
                    <th className="pb-3">Respuesta SynecT</th>
                  </tr>
                </thead>
                <tbody>
                  {synectAudiences.map((row) => (
                    <tr key={row.role} className="border-b border-white/5">
                      <td className="py-4 pr-4 font-medium text-white">{row.role}</td>
                      <td className="py-4 pr-4 text-neutral-400">{row.need}</td>
                      <td className="py-4 text-neutral-300">{row.synectAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="tech-eyebrow">STACK // CAPAS TÉCNICAS</p>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
            Capas del stack y productos
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Las <strong className="font-medium text-neutral-300">capas</strong> describen
            cómo está construido SynecT (campo → datos → IA). Los{' '}
            <strong className="font-medium text-neutral-300">productos</strong> empaquetan
            esas capas para tu operación: VISION agrupa las etapas de planta; ORION lleva
            el stack a flota. Todo el detalle está en la sección Productos más abajo.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {platformLayers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="tech-panel flex gap-4 p-4"
              >
                <layer.icon className="mt-0.5 shrink-0 text-synect-orange" size={18} />
                <div>
                  <h4 className="text-sm font-bold">{layer.title}</h4>
                  <p className="mt-1 text-xs text-neutral-500">{layer.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a href="#ecosistema" className="tech-btn-primary group">
            Ir a Productos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
