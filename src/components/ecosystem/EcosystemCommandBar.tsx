import { motion } from 'framer-motion'
import { Eye, Truck } from 'lucide-react'
import { productLines, visionStages, stageIcons } from '../../lib/products'
import type { VisionStageId } from '../../lib/visionStage'

type Product = 'vision' | 'orion'

type Props = {
  product: Product
  visionLayer: VisionStageId
  onSelectProduct: (p: Product) => void
  onSelectStage: (s: VisionStageId) => void
}

export function EcosystemCommandBar({
  product,
  visionLayer,
  onSelectProduct,
  onSelectStage,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:justify-end">
      <div
        className="tech-panel flex shrink-0 p-1"
        role="tablist"
        aria-label="Producto"
      >
        {productLines.map((line) => {
          const Icon = line.id === 'vision' ? Eye : Truck
          const active = product === line.id
          return (
            <button
              key={line.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectProduct(line.id)}
              className={`relative flex items-center gap-2 rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="ecosystem-cmd-product"
                  className="absolute inset-0 rounded-sm bg-synect-orange shadow-[0_0_24px_rgba(255,107,0,0.35)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={14}
                className={`relative z-10 ${active ? 'text-black' : 'text-neutral-500'}`}
              />
              <span className={`relative z-10 ${active ? 'text-black' : ''}`}>{line.label}</span>
            </button>
          )
        })}
      </div>

      {product === 'vision' && (
        <div
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-lg border border-white/5 bg-black/40 p-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-xl lg:max-w-2xl [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Etapas VISION"
        >
          {visionStages.map((stage) => {
            const Icon = stageIcons[stage.id]
            const active = visionLayer === stage.id
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectStage(stage.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                  active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="ecosystem-cmd-stage"
                    className="absolute inset-0 rounded-md bg-white/10 ring-1 ring-synect-orange/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={14} className="relative z-10 shrink-0 text-synect-orange" />
                <span className="relative z-10 hidden whitespace-nowrap font-mono text-[9px] text-neutral-600 sm:inline">
                  {stage.step}
                </span>
                <span className="relative z-10 whitespace-nowrap text-xs font-medium">
                  {stage.label}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
