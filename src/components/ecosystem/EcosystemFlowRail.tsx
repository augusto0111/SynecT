import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import type { VisionStageId } from '../../lib/visionStage'
import { visionStageOrder } from '../../lib/visionStage'

type FlowStep = {
  icon: LucideIcon
  label: string
  short: string
}

type Props = {
  steps: FlowStep[]
  tagline: string
  activeStageId?: VisionStageId | null
  onSelectStage?: (id: VisionStageId) => void
  className?: string
}

export function EcosystemFlowRail({
  steps,
  tagline,
  activeStageId = null,
  onSelectStage,
  className = '',
}: Props) {
  const interactive = Boolean(onSelectStage && activeStageId)

  return (
    <div className={`ecosystem-flow border-b border-white/5 px-6 py-6 sm:px-10 sm:py-8 lg:px-12 ${className}`}>
      <div
        className={`grid gap-3 ${
          steps.length === 3 ? 'sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
        }`}
        role={interactive ? 'tablist' : undefined}
        aria-label={interactive ? 'Ruta de etapas VISION' : undefined}
      >
        {steps.map((step, i) => {
          const stageId = visionStageOrder[i]
          const isActive = interactive && activeStageId === stageId
          const Icon = step.icon
          const clickable = interactive && onSelectStage && stageId

          const inner = (
            <>
              {i < steps.length - 1 && (
                <span
                  className="ecosystem-flow-connector absolute right-0 top-6 hidden h-px w-[calc(50%+0.5rem)] translate-x-1/2 bg-gradient-to-r from-synect-orange/40 to-transparent sm:block"
                  aria-hidden
                />
              )}
              <motion.div
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? 'bg-synect-orange text-black shadow-[0_0_28px_rgba(255,107,0,0.45)]'
                    : 'glass-orange text-synect-orange'
                }`}
                animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon size={18} className={isActive ? 'text-black' : ''} />
              </motion.div>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-neutral-600">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-white">{step.short}</p>
              <p className="mt-0.5 hidden text-[10px] leading-snug text-neutral-500 sm:block">
                {step.label}
              </p>
            </>
          )

          if (clickable) {
            return (
              <button
                key={step.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectStage!(stageId)}
                className={`ecosystem-flow-step group relative flex flex-col items-center rounded-xl px-2 py-3 text-center transition-colors ${
                  isActive
                    ? 'ecosystem-flow-step-active bg-white/[0.04] ring-1 ring-synect-orange/25'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                {inner}
              </button>
            )
          }

          return (
            <div
              key={step.label}
              className="relative flex flex-col items-center px-2 py-3 text-center"
            >
              {inner}
            </div>
          )
        })}
      </div>
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-neutral-400">
        {interactive && (
          <ArrowRight size={14} className="hidden text-synect-orange/60 sm:inline" />
        )}
        {tagline}
      </p>
    </div>
  )
}
