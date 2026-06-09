import { useEffect, useState, type RefObject } from 'react'

function isElementVisible(el: Element, rootMargin = '80px') {
  const margin = Number.parseFloat(rootMargin) || 0
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.bottom > -margin &&
    rect.top < vh + margin &&
    rect.right > 0 &&
    rect.left < vw &&
    rect.width > 0 &&
    rect.height > 0
  )
}

export function useInView(ref: RefObject<Element | null>, rootMargin = '80px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const sync = () => {
      setInView(isElementVisible(el, rootMargin))
    }

    sync()

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { rootMargin, threshold: 0 },
    )

    observer.observe(el)

    // Chrome + scroll-snap: IO can miss the settled frame after hash scroll.
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [ref, rootMargin])

  return inView
}
