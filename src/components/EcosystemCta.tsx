const PRODUCT_LABELS = {
  vision: 'VISION',
  orion: 'ORION',
} as const

type DemoProduct = keyof typeof PRODUCT_LABELS

export function setDemoProduct(product: DemoProduct) {
  sessionStorage.setItem('synect-demo-product', product)
}

export function EcosystemCta({ product }: { product: DemoProduct }) {
  const label = PRODUCT_LABELS[product]

  return (
    <div className="flex flex-col items-start justify-between gap-4 border-t border-white/5 bg-white/[0.02] px-6 py-6 sm:flex-row sm:items-center sm:px-10">
      <p className="text-sm text-neutral-400">
        ¿Querés ver <span className="font-semibold text-white">{label}</span> en tu
        operación?
      </p>
      <a
        href="#contacto"
        onClick={() => setDemoProduct(product)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-synect-orange px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-synect-orange-light hover:shadow-[0_0_30px_rgba(255,107,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synect-orange/50"
      >
        Solicitar demo {label}
      </a>
    </div>
  )
}
