import { motion } from 'framer-motion'
import { BenefitsCarousel } from './BenefitsCarousel'

export function TechnologyBenefitsSection() {
  return (
    <section id="beneficios" className="section-seamless relative overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synect-orange/[0.02] to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 tech-grid-global"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="tech-eyebrow">BENEFICIOS // POTENCIAL OPERATIVO</p>
          <h2 className="tech-title mt-3">
            Qué puede aportar SynecT
            <br />
            <span className="text-neutral-500">a tu operación.</span>
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Deslizá entre productos: la tarjeta activa se ilumina y los beneficios se
            animan al enfocarla. Flechas, puntos o teclado ← →.
          </p>
        </motion.div>
      </div>

      <div className="layout-wide relative mt-10">
        <BenefitsCarousel />
      </div>
    </section>
  )
}
