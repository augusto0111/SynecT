import { useState } from 'react'
import { motion } from 'framer-motion'

const words = [
  'TELEMETRÍA',
  'SENSORES',
  'VISIÓN',
  'IA PREDICTIVA',
  'FLOTA',
  'TIEMPO REAL',
  'INDUSTRIA',
  'ORION',
]

export function ImpactBand() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="section-seamless relative overflow-hidden py-4"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-synect-orange/8 via-transparent to-synect-orange/8" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <motion.div
        animate={paused ? undefined : { x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="flex w-max gap-12 whitespace-nowrap"
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-mono text-xs tracking-[0.3em] text-neutral-600"
          >
            {word}
            <span className="ml-12 text-synect-orange/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
