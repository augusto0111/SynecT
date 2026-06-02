import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const COMMAND = 'intell analyze --plant-id norte'

const streamLines = [
  { tag: 'INTELL', text: 'Histórico Connect sincronizado · 12 meses' },
  { tag: 'INTELL', text: 'Entrenando modelo multivariable — activo TQ-03' },
  { tag: 'INTELL', text: 'Anomalía correlacionada · nivel + presión' },
  { tag: 'INTELL', text: 'Score de riesgo actualizado para turno B' },
]

const reportLines = [
  { text: 'Informe predictivo · Línea extrusión', accent: true },
  { text: 'Desvío respecto al patrón operativo habitual' },
  { text: 'Recomendación: ventana de mantenimiento preventivo' },
  { text: 'Listo para exportar a SynecT Insight', accent: true },
]

type Phase = 'typing' | 'analyze' | 'stream' | 'report'

export function IntellLiveDemo() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typed, setTyped] = useState('')
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reducedMotion) {
      setTyped(COMMAND)
      setPhase('report')
      setVisibleLines(streamLines.length)
      setProgress(100)
      return
    }

    setPhase('typing')
    setTyped('')
    setVisibleLines(0)
    setProgress(0)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn()
        }, ms)
      )
    }

    COMMAND.split('').forEach((_, i) => {
      schedule(() => setTyped(COMMAND.slice(0, i + 1)), 40 + i * 35)
    })

    const typingEnd = 40 + COMMAND.length * 35 + 200
    schedule(() => setPhase('analyze'), typingEnd)

    for (let p = 0; p <= 100; p += 4) {
      schedule(() => setProgress(p), typingEnd + (p / 4) * 45)
    }

    const streamStart = typingEnd + 1200
    schedule(() => setPhase('stream'), streamStart)
    streamLines.forEach((_, i) => {
      schedule(() => setVisibleLines(i + 1), streamStart + 350 + i * 450)
    })

    const reportStart = streamStart + 350 + streamLines.length * 450 + 300
    schedule(() => setPhase('report'), reportStart)

    const loopAt = reportStart + 5500
    schedule(() => setCycle((c) => c + 1), loopAt)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [visible, reducedMotion, cycle])

  const statusLabel =
    phase === 'typing'
      ? 'ESPERANDO'
      : phase === 'analyze'
        ? 'ANALIZANDO'
        : phase === 'stream'
          ? 'PROCESANDO'
          : 'GENERANDO REPORTE'

  return (
    <div
      ref={rootRef}
      className="intell-live relative w-full max-w-2xl overflow-hidden rounded-xl border border-synect-orange/30 bg-[#060606] font-mono text-xs shadow-[0_0_48px_rgba(255,107,0,0.12)] sm:text-sm"
      aria-live="polite"
      aria-label="Demostración SynecT Intell analizando datos y generando reportes"
    >
      <div className="intell-live-scan pointer-events-none absolute inset-0 z-10 opacity-40" aria-hidden />

      <div className="relative z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-black/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-synect-orange" />
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            synect-intell
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            animate={reducedMotion ? {} : { opacity: [1, 0.35, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="h-1.5 w-1.5 rounded-full bg-synect-orange"
          />
          <span className="text-[10px] uppercase tracking-wider text-synect-orange">
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="relative z-20 space-y-3 p-4 sm:p-5">
        <p className="text-neutral-500">
          <span className="text-synect-orange">$</span> {typed}
          {!reducedMotion && phase === 'typing' && (
            <span className="ml-0.5 inline-block h-3.5 w-1.5 align-middle bg-synect-orange animate-blink" />
          )}
        </p>

        <AnimatePresence>
          {(phase === 'analyze' || phase === 'stream' || phase === 'report') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-synect-orange-dim via-synect-orange to-synect-orange-light"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <p className="mt-1 text-[9px] text-neutral-600">
                Ingesta · correlación · scoring
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-[5.5rem] space-y-1.5">
          {streamLines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={`${cycle}-${line.text}`}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-neutral-400"
            >
              <span className="text-neutral-600">[{line.tag}]</span> {line.text}
              {i === visibleLines - 1 && phase === 'stream' && !reducedMotion && (
                <span className="ml-1 inline-block h-3 w-1 bg-synect-orange/80 animate-blink" />
              )}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {phase === 'report' && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-synect-orange/25 bg-synect-orange/[0.06] p-3"
            >
              <p className="text-[10px] uppercase tracking-wider text-synect-orange">
                Reporte generado
              </p>
              <ul className="mt-2 space-y-1">
                {reportLines.map((line) => (
                  <li
                    key={line.text}
                    className={`text-[11px] leading-snug sm:text-xs ${
                      line.accent ? 'text-synect-orange' : 'text-neutral-300'
                    }`}
                  >
                    {line.accent ? '→ ' : '· '}
                    {line.text}
                  </li>
                ))}
              </ul>
              <motion.p
                animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-2 text-[9px] text-neutral-600"
              >
                Sincronizando con SynecT Insight…
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 flex flex-wrap items-center gap-x-4 border-t border-white/5 bg-black/50 px-4 py-2 text-[9px] uppercase tracking-wider">
        <span>
          <span className="text-neutral-600">Modo </span>
          <span className="text-synect-orange">predictivo</span>
        </span>
        <span>
          <span className="text-neutral-600">Salida </span>
          <span className="text-white">reporte + alertas</span>
        </span>
      </div>
    </div>
  )
}
