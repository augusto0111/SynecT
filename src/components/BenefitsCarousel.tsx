import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { technologyBenefits } from '../lib/products'
import { useReducedMotion } from '../hooks/useReducedMotion'

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
}

export function BenefitsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  activeIndexRef.current = activeIndex
  const reducedMotion = useReducedMotion()
  const count = technologyBenefits.length

  const getScrollLeftForCenter = useCallback((card: HTMLElement, track: HTMLElement) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const ideal = cardCenter - track.clientWidth / 2
    const max = Math.max(0, track.scrollWidth - track.clientWidth)
    return Math.max(0, Math.min(ideal, max))
  }, [])

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cards = [...track.querySelectorAll<HTMLElement>('[data-benefit-card]')]
    if (cards.length === 0) return

    const viewportCenter = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity

    cards.forEach((el, i) => {
      const cardCenter = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(cardCenter - viewportCenter)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })

    setActiveIndex(best)
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const card = track.querySelectorAll<HTMLElement>('[data-benefit-card]')[index]
      if (!card) return

      track.scrollTo({
        left: getScrollLeftForCenter(card, track),
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
      setActiveIndex(index)
    },
    [getScrollLeftForCenter, reducedMotion]
  )

  const updateTrackPadding = useCallback(() => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('[data-benefit-card]')
    if (!track || !card) return

    const pad = Math.max(0, (track.clientWidth - card.offsetWidth) / 2)
    track.style.setProperty('--benefits-side-pad', `${pad}px`)
    track.style.paddingLeft = `${pad}px`
    track.style.paddingRight = `${pad}px`
  }, [])

  useLayoutEffect(() => {
    updateTrackPadding()
  }, [updateTrackPadding])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const recenterActive = () => {
      updateTrackPadding()
      requestAnimationFrame(() => {
        const card = track.querySelectorAll<HTMLElement>('[data-benefit-card]')[
          activeIndexRef.current
        ]
        if (card) {
          track.scrollTo({
            left: getScrollLeftForCenter(card, track),
            behavior: 'auto',
          })
        }
        syncActiveFromScroll()
      })
    }

    recenterActive()

    const ro = new ResizeObserver(recenterActive)
    ro.observe(track)
    const firstCard = track.querySelector('[data-benefit-card]')
    if (firstCard) ro.observe(firstCard)

    return () => ro.disconnect()
  }, [updateTrackPadding, getScrollLeftForCenter, syncActiveFromScroll])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncActiveFromScroll()
    track.addEventListener('scroll', syncActiveFromScroll, { passive: true })
    return () => track.removeEventListener('scroll', syncActiveFromScroll)
  }, [syncActiveFromScroll])

  useEffect(() => {
    const section = document.getElementById('beneficios')
    if (!section) return

    const onKey = (e: KeyboardEvent) => {
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 120 || rect.top > window.innerHeight - 120) return

      if (e.key === 'ArrowRight' && activeIndex < count - 1) {
        e.preventDefault()
        scrollToIndex(activeIndex + 1)
      }
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        e.preventDefault()
        scrollToIndex(activeIndex - 1)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, count, scrollToIndex])

  const go = (dir: -1 | 1) => {
    scrollToIndex(Math.min(count - 1, Math.max(0, activeIndex + dir)))
  }

  const active = technologyBenefits[activeIndex]

  return (
    <div className="benefits-carousel relative">
      <div className="pointer-events-none absolute -left-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-synect-orange/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-synect-orange/5 blur-[80px]" />

      <div className="relative benefits-carousel-mask">
        <div
          ref={trackRef}
          className="benefits-track mt-10 flex gap-5 overflow-x-auto pb-6 perspective-dramatic [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label="Beneficios por producto"
        >
          {technologyBenefits.map((item, i) => {
            const isActive = activeIndex === i
            return (
              <motion.article
                key={item.id}
                id={item.id}
                data-benefit-card
                role="listitem"
                aria-current={isActive ? 'true' : undefined}
                animate={
                  reducedMotion
                    ? { opacity: isActive ? 1 : 0.75 }
                    : {
                        scale: isActive ? 1 : 0.96,
                        opacity: isActive ? 1 : 0.58,
                        y: isActive ? 0 : 6,
                      }
                }
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className={`benefits-card glass relative shrink-0 scroll-mt-28 rounded-2xl p-6 sm:p-8 xl:grid xl:grid-cols-12 xl:gap-10 ${
                  isActive ? 'benefits-card-active' : ''
                }`}
                onClick={() => !isActive && scrollToIndex(i)}
              >
                {isActive && !reducedMotion && (
                  <motion.span
                    layoutId="benefits-card-glow"
                    className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-synect-orange/20 via-transparent to-transparent"
                    transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  />
                )}

                <div className="relative min-w-0 xl:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-synect-orange">
                    {item.product}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{item.area}</p>
                  <h3 className="mt-4 text-xl font-bold leading-snug">{item.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={false}
                        animate={
                          isActive && !reducedMotion
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0.7, scale: 1 }
                        }
                        transition={{ delay: isActive ? ti * 0.04 : 0 }}
                        className="rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] text-neutral-500"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="relative mt-6 min-w-0 space-y-5 text-sm xl:col-span-5 xl:mt-0">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                      Desafío operativo habitual
                    </p>
                    <p className="mt-1.5 leading-relaxed text-neutral-400">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                      Cómo lo aborda SynecT
                    </p>
                    <p className="mt-1.5 leading-relaxed text-neutral-300">{item.howSynecTHelps}</p>
                  </div>
                </div>

                <div className="relative mt-6 min-w-0 xl:col-span-3 xl:mt-0">
                  <div
                    className={`glass-orange rounded-xl p-5 transition-shadow duration-500 ${
                      isActive ? 'shadow-[0_0_40px_rgba(255,107,0,0.12)]' : ''
                    }`}
                  >
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-synect-orange">
                      <Sparkles size={11} className={isActive ? 'animate-pulse-glow' : ''} />
                      Beneficios potenciales
                    </p>
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.ul
                          key={`${item.id}-list`}
                          variants={listVariants}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="mt-3 space-y-2"
                        >
                          {item.potentialBenefits.map((benefit) => (
                            <motion.li
                              key={benefit}
                              variants={itemVariants}
                              className="flex gap-2 text-xs leading-relaxed text-neutral-300"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-synect-orange" />
                              {benefit}
                            </motion.li>
                          ))}
                        </motion.ul>
                      ) : (
                        <ul className="mt-3 space-y-2">
                          {item.potentialBenefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex gap-2 text-xs leading-relaxed text-neutral-500"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <a
                    href={item.href}
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-synect-orange hover:text-synect-orange-light'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Ver ficha del producto
                    <ArrowRight size={14} className={isActive ? 'transition-transform group-hover:translate-x-0.5' : ''} />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tabular-nums text-neutral-600">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-synect-orange"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
            <span className="text-neutral-700"> / {String(count).padStart(2, '0')}</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-neutral-600 sm:inline">
            {active?.product}
          </span>

          <div className="flex gap-1.5" role="tablist" aria-label="Ir a beneficio">
            {technologyBenefits.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={item.title}
                onClick={() => scrollToIndex(i)}
                className="relative flex h-8 w-8 items-center justify-center rounded-full"
              >
                {activeIndex === i && (
                  <motion.span
                    layoutId="benefits-dot-ring"
                    className="absolute inset-0 rounded-full border border-synect-orange/50 bg-synect-orange/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 h-1.5 w-1.5 rounded-full transition-colors ${
                    activeIndex === i ? 'bg-synect-orange' : 'bg-white/25 hover:bg-white/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-4 sm:max-w-md sm:flex-none lg:max-w-lg">
          <div className="h-px flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-synect-orange-dim via-synect-orange to-synect-orange-light"
              animate={{ scaleX: (activeIndex + 1) / count }}
              initial={false}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={activeIndex === 0}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-transform hover:scale-105 hover:text-white disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Beneficio anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={activeIndex === count - 1}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-transform hover:scale-105 hover:text-white disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Beneficio siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
