import { motion } from 'framer-motion'
import { StageVisual } from '../visuals/StageVisual'
import type { VisualType } from '../../lib/products/types'

type Props = {
  visual: VisualType
  stageLabel: string
}

export function EcosystemVisualFrame({ visual, stageLabel }: Props) {
  return (
    <div className="ecosystem-visual relative h-full min-h-[280px] w-full lg:min-h-[360px]">
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-synect-orange/8 blur-[60px]" />
      <motion.div
        key={visual}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="ecosystem-visual-inner visual-stage relative flex h-full min-h-[inherit] flex-col overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
            Demo
          </span>
          <span className="rounded-full bg-synect-orange/15 px-2 py-0.5 font-mono text-[9px] text-synect-orange">
            {stageLabel}
          </span>
        </div>
        <div className="relative flex flex-1 items-center justify-center p-2">
          <StageVisual type={visual} />
        </div>
      </motion.div>
    </div>
  )
}
