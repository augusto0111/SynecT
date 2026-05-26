import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Map, Radio } from 'lucide-react'

const ORION_VIDEO = './videos/orion-bg.mp4'

export function OrionVideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true)
      },
      { rootMargin: '120px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPlayback = () => {
      if (prefersReduced.matches) {
        video.pause()
        return
      }
      video.play().catch(() => {})
    }

    if (video.readyState === 0) video.load()
    syncPlayback()
    prefersReduced.addEventListener('change', syncPlayback)
    return () => prefersReduced.removeEventListener('change', syncPlayback)
  }, [shouldLoad])

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-synect-orange/15 blur-[90px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="visual-stage glow-orange relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[10px] text-neutral-500">orion.synect.io</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-synect-orange/15 px-2.5 py-0.5 font-mono text-[9px] text-synect-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-synect-orange animate-pulse-glow" />
            EN VIVO
          </span>
        </div>

        <div
          className="relative aspect-video w-full bg-[#050505]"
          role="img"
          aria-label="Demostración de ORION Fleet Control — mapa en vivo y telemetría de flota"
        >
          {shouldLoad ? (
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={ORION_VIDEO} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 grid-bg opacity-40" />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-black/40 px-4 py-2.5 font-mono text-[10px]">
          <span className="inline-flex items-center gap-1.5 text-neutral-500">
            <Map size={11} className="text-synect-orange" />
            Mapa · tracking GPS
          </span>
          <span className="inline-flex items-center gap-1.5 text-neutral-500">
            <Radio size={11} className="text-synect-orange" />
            Telemetría en ruta
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-[10px]"
      >
        <span className="text-synect-orange">ORION Fleet</span>
        <span className="mx-2 text-neutral-700">|</span>
        <span className="text-neutral-500">Control de flotas</span>
      </motion.div>
    </div>
  )
}
