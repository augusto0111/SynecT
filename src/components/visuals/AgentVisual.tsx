import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const lines = [
  { prefix: 'IA', text: 'Patrón operativo aprendido — 847 ciclos', delay: 0 },
  { prefix: 'IA', text: 'Anomalía descartada — confianza 99.2%', delay: 0.4 },
  { prefix: 'IA', text: 'Prescripción generada ✓', highlight: true, delay: 0.8 },
  { prefix: 'PRESC', text: 'Riesgo de falla mitigado — acción sugerida', delay: 1.2 },
]

export function AgentVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-synect-orange/15 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="visual-stage scanline glow-orange overflow-hidden rounded-2xl border border-synect-orange/20"
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/50 px-5 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <Sparkles size={12} className="ml-2 text-synect-orange" />
          <span className="font-mono text-xs text-neutral-500">
            agente-vision — análisis en vivo
          </span>
        </div>

        <div className="space-y-3 p-6 font-mono text-sm">
          <p className="text-neutral-500">
            <span className="text-synect-orange">$</span> vision-agent analyze --plant
          </p>

          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + line.delay }}
              className={line.highlight ? 'text-synect-orange' : 'text-neutral-400'}
            >
              [{line.prefix}] {line.text}
            </motion.p>
          ))}

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="inline-block h-4 w-2 bg-synect-orange animate-blink"
          />
        </div>

        <div className="border-t border-white/5 bg-synect-orange/[0.04] px-6 py-3 font-mono text-[10px]">
          <span className="text-neutral-600">CONFIDENCE</span>
          <span className="ml-3 text-synect-orange">99.2%</span>
          <span className="ml-6 text-neutral-600">STATUS</span>
          <span className="ml-3 text-white">PRESCRIBIENDO</span>
        </div>
      </motion.div>
    </div>
  )
}
