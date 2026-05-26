import { motion } from 'framer-motion'
import { Database, LineChart } from 'lucide-react'
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
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[10px] text-neutral-500">
            connect.synect.io
          </span>
          <span className="text-neutral-700">→</span>
          <span className="font-mono text-[10px] text-synect-orange">insight.synect.io</span>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={orionAnalytics}
            alt="SynecT Connect e Insight — almacenamiento soberano y dashboards KPI"
            className="w-full object-cover object-top brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-synect-orange/5" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-3 flex items-center gap-2 glass rounded-xl px-3 py-2 font-mono text-[10px] shadow-lg"
      >
        <Database size={12} className="text-synect-orange" />
        <span className="text-neutral-400">Connect</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute -bottom-3 -right-3 flex items-center gap-2 glass-orange rounded-xl px-3 py-2 font-mono text-[10px] shadow-lg"
      >
        <LineChart size={12} className="text-synect-orange" />
        <span className="text-synect-orange">Insight</span>
      </motion.div>
    </div>
  )
}
