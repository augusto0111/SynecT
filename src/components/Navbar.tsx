import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { href: '#vision', id: 'vision', label: 'Ecosistema' },
  { href: '#productos', id: 'productos', label: 'Productos' },
  { href: '#soluciones', id: 'soluciones', label: 'Soluciones' },
  { href: '#confianza', id: 'confianza', label: 'Confianza' },
  { href: '#nosotros', id: 'nosotros', label: 'Nosotros' },
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
          scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          <a href="#" className="text-xl font-bold tracking-tight">
            Synec<span className="text-synect-orange">T</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm transition-colors ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href="#contacto"
              className="glass-orange inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-synect-orange transition-all hover:bg-synect-orange/15 hover:shadow-[0_0_30px_rgba(255,107,0,0.2)]"
            >
              Solicitar demo
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
                      className={`block ${
                        activeSection === link.id ? 'text-white' : 'text-neutral-300'
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
                    className="glass-orange block rounded-full px-5 py-2.5 text-center text-sm font-medium text-synect-orange"
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
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/95 p-3 backdrop-blur-lg lg:hidden"
        aria-hidden={false}
      >
        <a
          href="#contacto"
          className="flex w-full items-center justify-center rounded-full bg-synect-orange py-3 text-sm font-semibold text-black"
        >
          Solicitar demo
        </a>
      </div>
    </>
  )
}
