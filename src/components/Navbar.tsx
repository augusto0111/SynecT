import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { HomeSectionLink } from './HomeSectionLink'
import { SynectLogo } from './SynectLogo'
import type { HomeSectionId } from '../lib/navigation/homeScroll'

const links: { section: HomeSectionId; label: string }[] = [
  { section: 'inicio', label: 'Inicio' },
  { section: 'synect', label: 'VISION' },
  { section: 'orion-catalog', label: 'ORION' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-sm px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synect-orange/50 ${
    isActive ? 'text-synect-orange' : 'text-neutral-500 hover:text-white'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block font-mono text-sm uppercase tracking-wider ${
    isActive ? 'text-synect-orange' : 'text-neutral-300'
  }`

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-white/[0.06] py-2.5'
            : 'border-b border-transparent py-4 bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          <HomeSectionLink section="inicio" className="inline-block">
            <SynectLogo size="sm" />
          </HomeSectionLink>

          <ul className="hidden items-center gap-1 lg:ml-auto lg:flex">
            {links.map((link) => (
              <li key={link.section}>
                <HomeSectionLink section={link.section} className={navLinkClass}>
                  {link.label}
                </HomeSectionLink>
              </li>
            ))}
            <li>
              <HomeSectionLink section="contacto" className={navLinkClass}>
                Contacto
              </HomeSectionLink>
            </li>
          </ul>

          <button
            type="button"
            className="lg:hidden text-neutral-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-strong border-t border-white/5 lg:hidden"
            >
              <ul className="flex flex-col gap-4 px-6 py-6">
                {links.map((link) => (
                  <li key={link.section}>
                    <HomeSectionLink
                      section={link.section}
                      className={mobileLinkClass}
                      onNavigate={closeMobile}
                    >
                      {link.label}
                    </HomeSectionLink>
                  </li>
                ))}
                <li>
                  <HomeSectionLink
                    section="contacto"
                    className={mobileLinkClass}
                    onNavigate={closeMobile}
                  >
                    Contacto
                  </HomeSectionLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-black/95 p-3 backdrop-blur-lg lg:hidden"
        aria-hidden={false}
      >
        <HomeSectionLink
          section="contacto"
          className="flex w-full items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.02] py-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500 transition-colors hover:border-white/15 hover:text-white"
        >
          Contacto
        </HomeSectionLink>
      </div>
    </>
  )
}
