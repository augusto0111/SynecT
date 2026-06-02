import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import synectVision from '../../assets/products/synect-vision-render.png'
import { IntellLiveDemo } from './IntellLiveDemo'
import { InsightTelemetryViz } from './InsightTelemetryViz'
import type { VisualType } from '../../lib/products/types'

const ORION_VIDEO = './videos/orion-bg.mp4'

function VisionBare() {
  return (
    <img
      src={synectVision}
      alt="SynecT Vision — pantalla industrial en planta"
      className="ecosystem-visual-asset mx-auto h-full max-h-[min(56vh,540px)] w-auto max-w-full object-contain drop-shadow-[0_24px_48px_rgba(255,107,0,0.2)]"
      draggable={false}
    />
  )
}

function AnalyticsBare() {
  return <InsightTelemetryViz />
}

function IntellBare() {
  return <IntellLiveDemo />
}

function OrionBare() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true)
      },
      { rootMargin: '80px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (mq.matches) video.pause()
      else video.play().catch(() => {})
    }
    if (video.readyState === 0) video.load()
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [shouldLoad])

  return (
    <div
      ref={containerRef}
      className="ecosystem-visual-asset relative aspect-video w-full max-h-[min(50vh,480px)] overflow-hidden rounded-lg"
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
          aria-label="ORION Fleet Control — mapa y telemetría"
        >
          <source src={ORION_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 grid-bg opacity-30" />
      )}
    </div>
  )
}

export function EcosystemStageVisual({ type }: { type: VisualType }) {
  let content: ReactNode
  switch (type) {
    case 'vision':
      content = <VisionBare />
      break
    case 'terminal':
      content = <IntellBare />
      break
    case 'analytics':
      content = <AnalyticsBare />
      break
    case 'orion':
      content = <OrionBare />
      break
    default:
      content = <AnalyticsBare />
  }

  return (
    <motion.div
      key={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full items-center justify-center"
    >
      {content}
    </motion.div>
  )
}
