import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { dispatchLayoutSync } from '../lib/layout/sync'
import { parseHomeHash, scrollToHomeSection } from '../lib/navigation/homeScroll'

export function useHomeHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return

    const section = parseHomeHash(hash)
    if (!section) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToHomeSection(section)
        window.setTimeout(dispatchLayoutSync, 120)
        window.setTimeout(dispatchLayoutSync, 420)
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}
