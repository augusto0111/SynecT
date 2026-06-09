import { HomeSectionLink } from './HomeSectionLink'
import { SynectLogo } from './SynectLogo'
import { homeHero, homeProducts } from '../lib/copy/home'
import type { HomeSectionId } from '../lib/navigation/homeScroll'

const navLinks: { section: HomeSectionId; label: string }[] = [
  { section: 'inicio', label: 'Inicio' },
  { section: 'synect', label: 'VISION' },
  { section: 'orion-catalog', label: 'ORION' },
]

const catalogLinks = [
  {
    section: 'synect' as const,
    label: 'SynecT Vision',
    tagline: homeProducts.vision.tagline,
  },
  {
    section: 'orion-catalog' as const,
    label: 'ORION',
    tagline: homeProducts.orion.tagline,
  },
]

const linkClass =
  'text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synect-orange/50 rounded-sm'

export function Footer() {
  return (
    <footer className="section-seamless-top border-t border-white/[0.06] pb-24 pt-14 lg:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <HomeSectionLink section="inicio" className="inline-block">
              <SynectLogo size="sm" />
            </HomeSectionLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              {homeHero.intro}
            </p>
            <a
              href="mailto:contacto@synect.io"
              className="mt-4 block text-sm text-neutral-400 transition-colors hover:text-synect-orange-light"
            >
              contacto@synect.io
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                Navegación
              </p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.section}>
                    <HomeSectionLink section={link.section} className={linkClass}>
                      {link.label}
                    </HomeSectionLink>
                  </li>
                ))}
                <li>
                  <HomeSectionLink section="contacto" className={linkClass}>
                    Contacto
                  </HomeSectionLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                Catálogo
              </p>
              <ul className="mt-4 space-y-4">
                {catalogLinks.map((link) => (
                  <li key={link.section}>
                    <HomeSectionLink section={link.section} className={`block ${linkClass}`}>
                      {link.label}
                    </HomeSectionLink>
                    <p className="mt-1 text-xs text-neutral-600">{link.tagline}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                Demo
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Contanos tu operación y armamos una demo con VISION, ORION o una solución a medida.
              </p>
              <HomeSectionLink
                section="contacto"
                className="mt-5 inline-flex rounded-sm border border-white/[0.08] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500 transition-colors hover:border-white/15 hover:text-white"
              >
                Ir a contacto
              </HomeSectionLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} SynecT. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-700">
            Argentina — Expansión global
          </p>
        </div>
      </div>
    </footer>
  )
}
