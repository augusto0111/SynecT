import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { href: '#que-es-synect', id: 'que-es-synect', label: 'SynecT' },
  { href: '#ecosistema', id: 'ecosistema', label: 'Productos' },
  { href: '#beneficios', id: 'beneficios', label: 'Beneficios' },
  { href: '#contacto', id: 'contacto', label: 'Contacto' },
]

const sectionIds = links.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)

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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
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
          <a href="#" className="text-lg font-bold tracking-tight">
            Synec<span className="text-synect-orange">T</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-sm px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synect-orange/50 ${
                    activeSection === link.id
                      ? 'text-synect-orange'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="tech-stack-tag hidden xl:inline">
              <em>HW</em> · SW · IA
            </span>
            <a href="#contacto" className="tech-btn-primary !py-2 !px-4 !text-[11px]">
              Demo
            </a>
          </div>

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

        {scrolled && (
          <div
            className="mx-auto hidden max-w-7xl border-t border-white/[0.04] px-6 py-1.5 lg:block lg:px-8"
            aria-hidden="true"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">
              STACK :: hardware en campo · software operativo · IA predictiva · planta + flota
            </p>
          </div>
        )}

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
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`block font-mono text-sm uppercase tracking-wider ${
                        activeSection === link.id ? 'text-synect-orange' : 'text-neutral-300'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contacto"
                    className="tech-btn-primary block text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Solicitar demo
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#050505]/95 p-3 backdrop-blur-lg lg:hidden"
        aria-hidden={false}
      >
        <a
          href="#contacto"
          className="tech-btn-primary flex w-full items-center justify-center !py-3"
        >
          Solicitar demo
        </a>
      </div>
    </>
  )
}
