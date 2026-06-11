import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HardwareModelStage } from './hardware/HardwareModelStage'
import { ShowroomModularRail } from './showroom/ShowroomModularRail'
import {
  OrionFieldUnitStrip,
  OrionMapStrip,
  OrionScoreStrip,
  OrionTelemetryStrip,
} from './showroom/orion/OrionModuleStrips'
import { homeProducts, homeShowroom } from '../lib/copy/home'
import { orionModularSystem, orionShowroomStages } from '../lib/copy/orionShowroom'
import { orionModelSrc } from '../lib/hardware/models'
import { orionStageOrder, type OrionStageId } from '../lib/orionStage'

function ModuleStrip({ stage }: { stage: OrionStageId }) {
  switch (stage) {
    case 'live-map':
      return <OrionMapStrip />
    case 'telemetry':
      return <OrionTelemetryStrip />
    case 'score-ia':
      return <OrionScoreStrip />
    default:
      return <OrionFieldUnitStrip />
  }
}

function stageIndex(stage: OrionStageId) {
  return orionStageOrder.indexOf(stage)
}

export function OrionShowroomSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState<OrionStageId>('field-unit')
  const currentStage =
    orionShowroomStages.find((s) => s.id === activeStage) ?? orionShowroomStages[0]
  const idx = stageIndex(activeStage)
  const prevStage = idx > 0 ? orionStageOrder[idx - 1] : null
  const nextStage = idx < orionStageOrder.length - 1 ? orionStageOrder[idx + 1] : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return

      if (e.key === 'ArrowRight' && nextStage) {
        e.preventDefault()
        setActiveStage(nextStage)
      }
      if (e.key === 'ArrowLeft' && prevStage) {
        e.preventDefault()
        setActiveStage(prevStage)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nextStage, prevStage])

  return (
    <section
      ref={sectionRef}
      id="orion-catalog"
      className="home-viewport-section"
      aria-labelledby="orion-catalog-heading"
    >
      <div className="home-viewport-inner">
        <div className="showroom-panel tech-panel">
          <header className="showroom-vision-header">
            <div className="showroom-vision-header-top">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-synect-orange">
                {homeProducts.catalogLabel}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                {homeShowroom.catalog}
              </p>
            </div>
            <p className="showroom-vision-header-tagline">{orionModularSystem.tagline}</p>
            <ShowroomModularRail
              stages={orionShowroomStages}
              activeStage={activeStage}
              onSelectStage={setActiveStage}
              ariaLabel="Módulos del ecosistema ORION"
            />
          </header>

          <article className="showroom-vision-grid showroom-vision-grid--orion lg:divide-x lg:divide-white/[0.06]">
            <div className="showroom-vision-copy lg:order-1">
              <div className="showroom-vision-copy-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                      Módulo {currentStage.step} · {currentStage.layer}
                    </p>
                    <h2
                      id="orion-catalog-heading"
                      className="mt-1 text-xl font-medium sm:text-2xl"
                    >
                      {currentStage.label}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                      {currentStage.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                      {currentStage.badge}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {currentStage.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {currentStage.points.map((point) => (
                        <li
                          key={point}
                          className="text-xs leading-relaxed text-neutral-500 before:mr-2 before:text-neutral-600 before:content-['—'] sm:text-sm"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                      {currentStage.value}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="showroom-stage-pager">
                <button
                  type="button"
                  disabled={!prevStage}
                  onClick={() => prevStage && setActiveStage(prevStage)}
                  className="showroom-stage-pager-btn"
                  aria-label="Módulo anterior"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">
                    {prevStage
                      ? orionShowroomStages.find((s) => s.id === prevStage)?.short
                      : '—'}
                  </span>
                </button>
                <span className="font-mono text-[10px] text-neutral-600">
                  {idx + 1} / {orionShowroomStages.length}
                </span>
                <button
                  type="button"
                  disabled={!nextStage}
                  onClick={() => nextStage && setActiveStage(nextStage)}
                  className="showroom-stage-pager-btn"
                  aria-label="Módulo siguiente"
                >
                  <span className="hidden sm:inline">
                    {nextStage
                      ? orionShowroomStages.find((s) => s.id === nextStage)?.short
                      : '—'}
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="showroom-vision-media-stack border-b border-white/[0.06] lg:order-2 lg:border-b-0">
              <div className="showroom-vision-media showroom-vision-media-stage">
                <HardwareModelStage
                  modelUrl={orionModelSrc}
                  rotationY={Math.PI}
                  rotationZ={Math.PI / 2}
                  code="SY-ORION-FC"
                  caption="Tablet resistente · control de flotas"
                  fallbackAlt="ORION — tablet resistente con control de flotas"
                />
              </div>

              <div className="showroom-vision-module-strip">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="showroom-module-strip-content"
                  >
                    <ModuleStrip stage={activeStage} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
