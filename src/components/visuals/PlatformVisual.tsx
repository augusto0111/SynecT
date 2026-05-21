import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import orionAnalytics from '../../assets/products/orion-analytics.png'

export function PlatformVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl perspective-dramatic">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-synect-orange/20 blur-[90px]" />

      <motion.div
        initial={{ opacity: 0, rotateX: 8 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="visual-stage relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        style={{ transform: 'rotateY(-6deg) rotateX(4deg)' }}
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-[10px] text-neutral-600">
            plataforma.vision.synect.io
          </span>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={orionAnalytics}
            alt="Plataforma VISION — analítica e históricos"
            className="w-full object-cover object-top brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-synect-orange/5" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute -bottom-3 -right-3 flex items-center gap-2 glass-orange rounded-xl px-4 py-2 font-mono text-[10px] shadow-lg"
      >
        <BarChart3 size={12} className="text-synect-orange" />
        <span className="text-synect-orange">Vista previa</span>
      </motion.div>
    </div>
  )
}
