import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Keyboard, Truck } from 'lucide-react'
import { productLines, visionStages, stageIcons } from '../lib/products'
import {
  visionStageIndex,
  visionStageOrder,
  type VisionStageId,
} from '../lib/visionStage'

type Product = 'vision' | 'orion'

type Props = {
  product: Product
  visionLayer: VisionStageId
  onSelectProduct: (p: Product) => void
  onSelectStage: (s: VisionStageId) => void
}

export function ProductExplorerSidebar({
  product,
  visionLayer,
  onSelectProduct,
  onSelectStage,
}: Props) {
  const stageIdx = visionStageIndex(visionLayer)
  const progress = product === 'vision' ? ((stageIdx + 1) / visionStages.length) * 100 : 0

  const goStage = (delta: number) => {
    const next = stageIdx + delta
    if (next >= 0 && next < visionStageOrder.length) {
      onSelectStage(visionStageOrder[next])
    }
  }

  return (
    <aside
      className="ecosystem-sidebar hidden lg:flex lg:flex-col lg:gap-5"
      aria-label="Navegación de productos"
    >
      <div className="tech-panel p-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-synect-orange">
          Explorador
        </p>
        <p className="mt-2 text-xs leading-relaxed text-neutral-500">
          Elegí vertical y etapa. También podés usar la ruta superior del panel o las flechas
          ← → del teclado.
        </p>
        <p className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-neutral-600">
          <Keyboard size={11} className="text-synect-orange/70" />
          ← → cambia etapa
        </p>
      </div>

      <div className="tech-panel flex flex-col gap-1 p-1">
        {productLines.map((line) => {
          const Icon = line.id === 'vision' ? Eye : Truck
          const active = product === line.id
          return (
            <button
              key={line.id}
              type="button"
              onClick={() => onSelectProduct(line.id)}
              className={`relative flex items-center gap-2 rounded-sm px-3 py-2.5 text-left text-sm transition-colors ${
                active ? 'text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="ecosystem-product-pill"
                  className="absolute inset-0 rounded-sm bg-synect-orange/15 ring-1 ring-synect-orange/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={16} className={`relative z-10 ${active ? 'text-synect-orange' : ''}`} />
              <span className="relative z-10 font-semibold">{line.label}</span>
            </button>
          )
        })}
      </div>

      {product === 'vision' && (
        <>
          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-synect-orange-dim to-synect-orange"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            />
          </div>

          <nav className="relative flex flex-col gap-0.5" aria-label="Etapas VISION">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-synect-orange">
              Etapas VISION
            </p>
            <span
              className="absolute left-[11px] top-10 bottom-10 w-px bg-white/10"
              aria-hidden
            />
            {visionStages.map((stage) => {
              const Icon = stageIcons[stage.id]
              const active = visionLayer === stage.id
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onSelectStage(stage.id)}
                  className={`relative flex items-start gap-2 rounded-sm border-l-2 py-2.5 pl-3 pr-2 text-left transition-colors ${
                    active
                      ? 'border-synect-orange bg-synect-orange/10 text-white'
                      : 'border-transparent text-neutral-500 hover:border-white/20 hover:bg-white/[0.03] hover:text-neutral-300'
                  }`}
                >
                  <Icon
                    size={14}
                    className={`relative z-10 mt-0.5 shrink-0 ${active ? 'text-synect-orange' : 'text-neutral-600'}`}
                  />
                  <span className="relative z-10">
                    <span className="block font-mono text-[9px] text-neutral-600">
                      {stage.step}
                    </span>
                    <span className="block text-xs font-medium leading-snug">{stage.label}</span>
                  </span>
                </button>
              )
            })}
          </nav>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={stageIdx === 0}
              onClick={() => goStage(-1)}
              className="glass flex flex-1 items-center justify-center gap-1 rounded-lg py-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400 disabled:opacity-30 hover:text-white"
            >
              <ChevronLeft size={12} />
              Anterior
            </button>
            <button
              type="button"
              disabled={stageIdx === visionStages.length - 1}
              onClick={() => goStage(1)}
              className="glass-orange flex flex-1 items-center justify-center gap-1 rounded-lg py-2 font-mono text-[10px] uppercase tracking-wider text-synect-orange disabled:opacity-30"
            >
              Siguiente
              <ChevronRight size={12} />
            </button>
          </div>
        </>
      )}

      {product === 'orion' && (
        <div className="tech-panel p-4 text-xs leading-relaxed text-neutral-500">
          ORION integra hardware en ruta, mapa en vivo y telemetría sobre el mismo stack SynecT
          que VISION usa en planta.
        </div>
      )}
    </aside>
  )
}
