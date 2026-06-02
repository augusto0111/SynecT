import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { dataStoryIntro, dataStorySteps } from '../lib/products/dataStory'
import { DataStoryMiniPreview } from './DataStoryVisual'

export function DataStorySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const step = dataStorySteps[activeIndex]

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(dataStorySteps.length - 1, i + 1))

  return (
    <section
      id="historia-dato"
      className="section-seamless relative overflow-hidden py-16 sm:py-20 lg:py-28"
      aria-label={dataStoryIntro.eyebrow}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synect-orange/[0.03] to-transparent" />
      <div className="absolute left-1/2 top-0 h-[min(400px,50vw)] w-[min(800px,100vw)] -translate-x-1/2 rounded-full bg-synect-orange/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left"
        >
          <p className="tech-eyebrow">DATA // 02 · THREE LENSES</p>
          <h2 className="tech-title mt-3 sm:text-4xl lg:text-5xl">
            {dataStoryIntro.title}
            <br />
            <span className="text-neutral-500">{dataStoryIntro.subtitle}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            {dataStoryIntro.description}
          </p>
        </motion.div>

        {/* Selector — scroll horizontal en móvil, wrap en tablet+ */}
        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible lg:justify-start [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Tres preguntas sobre el dato"
        >
          {dataStorySteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-left transition-all sm:text-center ${
                activeIndex === i
                  ? 'bg-synect-orange text-black shadow-[0_0_24px_rgba(255,107,0,0.3)]'
                  : 'glass text-neutral-400 hover:text-white'
              }`}
            >
              <span className="block font-mono text-[10px] uppercase tracking-wider opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-sm font-semibold sm:whitespace-normal">
                {s.question}
              </span>
            </button>
          ))}
        </div>

        {/* Panel principal — columna en móvil, fila en desktop */}
        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              role="tabpanel"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="order-2 flex flex-col lg:order-1"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-synect-orange">
                {step.lens}
              </p>
              <p className="mt-1 font-mono text-xs text-neutral-500">{step.product}</p>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{step.question}</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-300 sm:text-base">
                {step.description}
              </p>
              <p className="mt-3 font-mono text-[11px] text-neutral-600">{step.detail}</p>

              <a
                href={step.href}
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-synect-orange hover:text-synect-orange-light"
              >
                Ver {step.product}
                <ArrowRight size={14} />
              </a>

              {/* Navegación táctil móvil */}
              <div className="mt-8 flex items-center justify-between gap-4 lg:hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  aria-label="Pregunta anterior"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-mono text-xs text-neutral-500">
                  {activeIndex + 1} / {dataStorySteps.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex === dataStorySteps.length - 1}
                  aria-label="Siguiente pregunta"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <DataStoryMiniPreview key={step.id} type={step.visual} />
            </AnimatePresence>
          </div>
        </div>

        {/* Indicador de progreso — todas las pantallas */}
        <div className="mt-8 flex justify-center gap-2 lg:mt-10 lg:justify-start">
          {dataStorySteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir a: ${s.question}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === i
                  ? 'w-8 bg-synect-orange'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
