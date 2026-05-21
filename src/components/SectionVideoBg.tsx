import { useEffect, useRef, useState } from 'react'

type SectionVideoBgProps = {
  src: string
  poster?: string
  /** cinema = full bleed, minimal overlay. content = gradient for overlaid text. hero = video protagonist, no dark bars */
  variant?: 'cinema' | 'content' | 'hero'
  textSide?: 'left' | 'right'
  /** contain = full frame, less crop. cover = fill area (more zoom) */
  objectFit?: 'contain' | 'cover'
  /** Edge-to-edge viewport — no side fades */
  fullscreen?: boolean
}

export function SectionVideoBg({
  src,
  poster,
  variant = 'content',
  textSide = 'right',
  objectFit,
  fullscreen = false,
}: SectionVideoBgProps) {
  const fit = objectFit ?? 'cover'
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

  const textGradient =
    textSide === 'right'
      ? 'bg-gradient-to-l from-[#0a0a0a]/90 via-[#0a0a0a]/35 to-transparent'
      : 'bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/35 to-transparent'

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {variant === 'hero' ? null : variant === 'cinema' ? (
        fullscreen ? (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        ) : (
          <>
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </>
        )
      ) : (
        <>
          <div className={`absolute inset-0 ${textGradient}`} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </>
      )}
    </div>
  )
}
