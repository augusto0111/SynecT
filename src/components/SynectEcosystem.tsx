import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Sparkles } from 'lucide-react'
import { EcosystemCta } from './EcosystemCta'
import { ProductOverview } from './ProductOverview'
import { StageStepNav } from './StageStepNav'
import { EcosystemCommandBar } from './ecosystem/EcosystemCommandBar'
import { EcosystemStageVisual } from './ecosystem/EcosystemStageVisual'
import {
  hashForVisionStage,
  visionStageFromHash,
  type VisionStageId,
} from '../lib/visionStage'
import {
  productLines,
  visionStages,
  visionFlow,
  orionFlow,
  orionFeatures,
  orionTechnicalDetails,
  stageIcons,
} from '../lib/products'

type Product = 'vision' | 'orion'

function productFromHash(): Product {
  const hash = window.location.hash.replace('#', '')
  return hash === 'orion' ? 'orion' : 'vision'
}

function scrollToEcosystem() {
  document.getElementById('ecosistema')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const ECOSYSTEM_SCROLL_HASHES = new Set([
  'ecosistema',
  'mapa-plataforma',
  'vision',
  'orion',
  'ecosistema-vision',
  'ecosistema-connect',
  'ecosistema-intell',
  'connect',
  'intell',
])

function PanelHeader({
  vertical,
  title,
  accent,
  description,
  commandBar,
}: {
  vertical: string
  title: ReactNode
  accent?: string
  description: string
  commandBar: ReactNode
}) {
  return (
    <div className="border-b border-white/5 px-5 py-4 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            {vertical}
          </p>
          <h3 className="mt-0.5 text-xl font-bold sm:text-2xl">
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-gradient-orange">{accent}</span>
              </>
            )}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{description}</p>
        </div>
        {commandBar}
      </div>
    </div>
  )
}

export function SynectEcosystem() {
  const [product, setProduct] = useState<Product>(productFromHash)
  const [visionLayer, setVisionLayer] = useState<VisionStageId>(
    () => visionStageFromHash(window.location.hash) ?? 'synect-vision'
  )
  const currentLayer = visionStages.find((t) => t.id === visionLayer) ?? visionStages[0]
  const currentProduct = productLines.find((p) => p.id === product) ?? productLines[0]

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      const stage = visionStageFromHash(hash)

      if (hash === 'orion') {
        setProduct('orion')
      } else if (stage) {
        setProduct('vision')
        setVisionLayer(stage)
      } else if (hash === 'ecosistema' || hash === 'mapa-plataforma' || hash === 'vision') {
        setProduct('vision')
        setVisionLayer('synect-vision')
      } else {
        setProduct(productFromHash())
      }

      if (ECOSYSTEM_SCROLL_HASHES.has(hash)) {
        requestAnimationFrame(scrollToEcosystem)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const selectVisionLayer = (stage: VisionStageId) => {
    setVisionLayer(stage)
    const hash = hashForVisionStage(stage)
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash)
    }
  }

  const selectProduct = (next: Product) => {
    setProduct(next)
    if (next === 'orion') {
      if (window.location.hash !== '#orion') {
        history.replaceState(null, '', '#orion')
      }
      return
    }
    setVisionLayer('synect-vision')
    const hash = hashForVisionStage('synect-vision')
    if (window.location.hash !== hash) {
      history.replaceState(null, '', hash)
    }
  }

  const visionStagesNav = visionStages.map((stage, i) => ({
    id: stage.id,
    label: stage.label,
    short: visionFlow[i]?.short,
  }))

  const commandBar = (
    <EcosystemCommandBar
      product={product}
      visionLayer={visionLayer}
      onSelectProduct={selectProduct}
      onSelectStage={selectVisionLayer}
    />
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (product !== 'vision') return
      const section = document.getElementById('ecosistema')
      if (!section) return
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return

      const idx = visionStages.findIndex((s) => s.id === visionLayer)
      if (e.key === 'ArrowRight' && idx < visionStages.length - 1) {
        e.preventDefault()
        selectVisionLayer(visionStages[idx + 1].id)
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault()
        selectVisionLayer(visionStages[idx - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, visionLayer])

  return (
    <section
      id="ecosistema"
      className="ecosystem-star section-seamless relative overflow-hidden py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-synect-orange/[0.05] via-transparent to-transparent" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[min(1200px,100vw)] -translate-x-1/2 rounded-full bg-synect-orange/6 blur-[120px]" />

      <div className="layout-wide relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="tech-eyebrow">PRODUCTOS // VISION · ORION</p>
          <h2 className="tech-title mt-2">
            Ficha técnica <span className="text-neutral-500">por vertical</span>
          </h2>
        </motion.div>

        <div className="mt-8 lg:hidden">
          <ProductOverview />
          <div className="mt-6">{commandBar}</div>
        </div>

        <div className="ecosystem-panel relative mt-8 w-full overflow-hidden rounded-2xl glass-strong lg:mt-10">
          <AnimatePresence mode="wait">
            {product === 'vision' ? (
              <motion.div
                key="vision"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PanelHeader
                  vertical="Vertical VISION"
                  title={<>Planta y procesos</>}
                  description={currentProduct.description}
                  commandBar={<div className="hidden lg:block">{commandBar}</div>}
                />

                <div className="flex flex-wrap gap-2 border-b border-white/5 px-5 py-3 lg:hidden">
                  {visionStages.map((tab) => {
                    const Icon = stageIcons[tab.id]
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectVisionLayer(tab.id)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${
                          visionLayer === tab.id
                            ? 'bg-synect-orange/15 text-white ring-1 ring-synect-orange/40'
                            : 'text-neutral-500'
                        }`}
                      >
                        <Icon size={13} />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={visionLayer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ecosystem-split lg:grid lg:grid-cols-[minmax(280px,40%)_1fr] lg:items-stretch"
                  >
                    <div className="ecosystem-copy flex flex-col justify-center gap-3 border-b border-white/5 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-synect-orange">
                          ETAPA {currentLayer.step}
                        </span>
                        <span className="tech-badge !text-[10px]">
                          {visionLayer === 'synect-intell' && <Sparkles size={11} />}
                          {currentLayer.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-bold leading-snug sm:text-lg">
                        {currentLayer.title}
                      </h4>
                      <p className="line-clamp-3 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                        {currentLayer.description}
                      </p>
                      <p className="text-xs leading-snug text-neutral-400">
                        <span className="font-mono text-[9px] uppercase text-synect-orange">
                          Valor ·{' '}
                        </span>
                        {currentLayer.clientValue}
                      </p>

                      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                        {currentLayer.specs.map((spec) => (
                          <div key={spec.label} className="rounded-lg border border-white/5 px-2.5 py-2">
                            <p className="text-[10px] font-semibold text-white">{spec.label}</p>
                            <p className="text-[9px] leading-snug text-neutral-600">{spec.detail}</p>
                          </div>
                        ))}
                      </div>

                      <details className="group text-xs">
                        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-wider text-neutral-500 hover:text-synect-orange">
                          Cómo funciona y detalle técnico
                        </summary>
                        <div className="mt-2 grid gap-2 lg:grid-cols-2">
                          {currentLayer.howItWorks.map((step, i) => (
                            <p key={step.title} className="text-[10px] text-neutral-500">
                              <span className="text-synect-orange">{i + 1}.</span> {step.title}
                            </p>
                          ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {currentLayer.technicalDetails.map((block) => (
                            <span
                              key={block.category}
                              className="rounded-full border border-white/5 px-2 py-0.5 font-mono text-[9px] text-neutral-600"
                            >
                              {block.category}
                            </span>
                          ))}
                        </div>
                      </details>

                      <div className="lg:hidden">
                        <StageStepNav
                          stages={visionStagesNav}
                          current={visionLayer}
                          onSelect={selectVisionLayer}
                        />
                      </div>
                    </div>

                    <div className="ecosystem-visual-pane relative flex min-h-[240px] items-center justify-center p-4 sm:min-h-[280px] sm:p-6 lg:min-h-[320px] lg:p-8">
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-synect-orange/[0.07] via-transparent to-transparent"
                        aria-hidden
                      />
                      <EcosystemStageVisual type={currentLayer.visual} />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <EcosystemCta product="vision" />
              </motion.div>
            ) : (
              <motion.div
                key="orion"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PanelHeader
                  vertical="Vertical ORION"
                  title={<>ORION</>}
                  accent="Fleet Control"
                  description={currentProduct.description}
                  commandBar={<div className="hidden lg:block">{commandBar}</div>}
                />

                <div className="ecosystem-split lg:grid lg:grid-cols-[minmax(280px,40%)_1fr] lg:items-stretch">
                  <div className="ecosystem-copy flex flex-col justify-center gap-3 border-b border-white/5 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-6">
                    <span className="tech-badge !text-[10px]">
                      <Map size={11} />
                      Control de flotas
                    </span>
                    <h4 className="text-base font-bold sm:text-lg">
                      De la unidad en ruta al despacho centralizado
                    </h4>
                    <p className="line-clamp-3 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                      {currentProduct.description}
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      {orionFeatures.map((feature) => (
                        <p key={feature} className="text-[10px] leading-snug text-neutral-500">
                          · {feature}
                        </p>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                      {orionFlow.map((step, i) => (
                        <div
                          key={step.label}
                          className="flex items-center gap-1.5 rounded-lg border border-white/5 px-2 py-1.5"
                        >
                          <step.icon size={12} className="text-synect-orange" />
                          <span className="text-[10px] font-medium text-white">{step.short}</span>
                          <span className="font-mono text-[8px] text-neutral-700">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <details>
                      <summary className="cursor-pointer font-mono text-[10px] uppercase text-neutral-500 hover:text-synect-orange">
                        Detalle técnico
                      </summary>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {orionTechnicalDetails.map((b) => (
                          <span
                            key={b.category}
                            className="rounded border border-white/5 px-1.5 py-0.5 text-[9px] text-neutral-600"
                          >
                            {b.category}
                          </span>
                        ))}
                      </div>
                    </details>
                  </div>
                  <div className="ecosystem-visual-pane relative flex min-h-[240px] items-center justify-center p-4 sm:p-6 lg:min-h-[320px] lg:p-8">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-synect-orange/[0.07] via-transparent to-transparent"
                      aria-hidden
                    />
                    <EcosystemStageVisual type="orion" />
                  </div>
                </div>

                <EcosystemCta product="orion" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
