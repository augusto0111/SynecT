import { motion } from 'framer-motion'
import { homeHero } from '../lib/copy/home'
import { HomeSectionLink } from './HomeSectionLink'
import { SynectLogo } from './SynectLogo'

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
  }
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="home-viewport-section relative flex flex-col items-center justify-center px-6 py-20 sm:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-[1] flex max-w-4xl flex-col items-center text-center">
        <motion.div {...fadeUp(0.12)}>
          <SynectLogo size="lg" />
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          id="hero-heading"
          className="mt-8 text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight"
        >
          <span className="block text-white">{homeHero.title}</span>
          <span className="text-gradient mt-1 block">{homeHero.titleAccent}</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.28)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg"
        >
          {homeHero.intro}
        </motion.p>
      </div>

      <HomeSectionLink
        section="synect"
        className="absolute bottom-10 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-600 transition-colors hover:text-neutral-400 sm:bottom-12"
        aria-label="Ver catálogo de productos"
      >
        <span className="text-sm text-neutral-500">Ver catálogo</span>
        <span className="block h-8 w-px bg-neutral-700" />
      </HomeSectionLink>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
