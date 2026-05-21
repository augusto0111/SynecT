const footerLinks = {
  producto: [
    { href: '#vision', label: 'Ecosistema VISION' },
    { href: '#productos', label: 'Productos' },
    { href: '#soluciones', label: 'Soluciones' },
  ],
  empresa: [
    { href: '#confianza', label: 'Confianza' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ],
}

export function Footer() {
  return (
    <footer className="section-seamless-top pb-24 pt-12 lg:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-bold tracking-tight">
              Synec<span className="text-synect-orange">T</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              Plataforma de Inteligencia Industrial y Telemetría. Hardware, software e IA
              predictiva en un solo ecosistema.
            </p>
            <a
              href="mailto:contacto@synect.io"
              className="mt-4 inline-block text-sm text-synect-orange transition-colors hover:text-synect-orange-light"
            >
              contacto@synect.io
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              Producto
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              Empresa
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} SynecT. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] text-neutral-700">
            Argentina — Expansión global
          </p>
        </div>
      </div>
    </footer>
  )
}
