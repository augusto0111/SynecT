import { useMemo, type CSSProperties } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Star = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  peak: number
}

const STAR_COUNT = 160

export function Starfield() {
  const reducedMotion = useReducedMotion()

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: STAR_COUNT }, (_, id) => ({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.12 ? 2 : 1,
        delay: Math.random() * 10,
        duration: 2.5 + Math.random() * 6,
        peak: 0.2 + Math.random() * 0.6,
      })),
    []
  )

  return (
    <div className="starfield absolute inset-0" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className={`starfield__particle ${reducedMotion ? 'starfield__particle--static' : ''}`}
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--star-delay': `${star.delay}s`,
              '--star-duration': `${star.duration}s`,
              '--star-peak': String(star.peak),
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
