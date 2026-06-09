import { useEffect, useState, type RefObject } from 'react'

export function useInView(ref: RefObject<Element | null>, rootMargin = '80px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { rootMargin, threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
