import { motion } from 'framer-motion'
import { SectionVideoBg } from '../SectionVideoBg'

const ORION_VIDEO = './videos/orion-bg.mp4'

export function OrionSectionBg() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 h-full w-full">
        <SectionVideoBg src={ORION_VIDEO} variant="hero" objectFit="cover" />
      </div>

      <div className="absolute inset-0 bg-[#0a0a0a]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/55 to-[#0a0a0a]/15" />
      <div className="section-blend-top absolute inset-x-0 top-0 h-40" />
      <div className="section-blend-bottom absolute inset-x-0 bottom-0 h-40" />
    </motion.div>
  )
}

export function OrionHudPanel() {
  return (
    <div className="flex flex-col gap-4 lg:items-end">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="glass-orange w-fit rounded-xl px-5 py-3 font-mono text-xs"
      >
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-synect-orange align-middle" />
        <span className="text-synect-orange">GPS · EN VIVO</span>
      </motion.div>

      <div className="glass w-fit rounded-xl px-5 py-3 font-mono text-xs">
        <span className="text-neutral-500">FLOTA</span>
        <span className="ml-2 text-white">12 activos</span>
      </div>

      <div className="glass w-fit rounded-xl px-5 py-3 font-mono text-xs">
        <span className="text-neutral-500">KM HOY</span>
        <span className="ml-2 text-synect-orange">2.847</span>
      </div>

      <div className="glass-orange w-fit rounded-xl px-5 py-3 font-mono text-xs">
        <span className="text-synect-orange">ORION</span>
        <span className="ml-2 text-white">Fleet Control</span>
      </div>
    </div>
  )
}
