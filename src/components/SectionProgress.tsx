import { useActiveSection } from '../hooks/useActiveSection'

const chapters = [
  { id: 'que-es-synect', label: 'SynecT' },
  { id: 'comparativa', label: 'Problema' },
  { id: 'ecosistema', label: 'Productos' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'contacto', label: 'Contacto' },
]

export function SectionProgress() {
  const active = useActiveSection(chapters.map((c) => c.id))

  return (
    <nav
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 xl:flex"
      aria-label="Capítulos de la página"
    >
      {chapters.map((chapter) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className="group flex items-center justify-end gap-2"
          aria-current={active === chapter.id ? 'true' : undefined}
        >
          <span
            className={`rounded-sm px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100 ${
              active === chapter.id ? 'text-synect-orange opacity-100' : 'text-neutral-500'
            }`}
          >
            {chapter.label}
          </span>
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              active === chapter.id
                ? 'scale-125 bg-synect-orange shadow-[0_0_8px_rgba(255,107,0,0.6)]'
                : 'bg-white/20 group-hover:bg-white/50'
            }`}
          />
        </a>
      ))}
    </nav>
  )
}
