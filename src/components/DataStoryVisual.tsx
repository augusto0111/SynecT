import { motion } from 'framer-motion'
import { StageVisual } from './visuals/StageVisual'
import type { VisualType } from '../lib/products/types'

export function DataStoryVisual({ type }: { type: VisualType }) {
  return (
    <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none lg:mx-0">
      <div className="origin-center scale-[0.92] sm:scale-95 lg:scale-100">
        <StageVisual type={type} />
      </div>
    </div>
  )
}

export function DataStoryMiniPreview({ type }: { type: VisualType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <DataStoryVisual type={type} />
      <p className="mt-3 text-center font-mono text-[10px] text-neutral-600 lg:text-left">
        Vista ilustrativa del producto · datos de demostración
      </p>
    </motion.div>
  )
}
