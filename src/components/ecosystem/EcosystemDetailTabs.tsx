import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VisionStage } from '../../lib/products/types'

type TabId = 'specs' | 'how' | 'tech'

const tabs: { id: TabId; label: string }[] = [
  { id: 'specs', label: 'Capacidades' },
  { id: 'how', label: 'Cómo funciona' },
  { id: 'tech', label: 'Técnico' },
]

type Props = {
  layer: Pick<VisionStage, 'specs' | 'howItWorks' | 'technicalDetails'>
  extra?: ReactNode
}

export function EcosystemDetailTabs({ layer, extra }: Props) {
  const [active, setActive] = useState<TabId>('specs')

  return (
    <div className="mt-5 border-t border-white/5 pt-5">
      <div
        className="inline-flex gap-0.5 rounded-lg border border-white/5 bg-black/40 p-0.5"
        role="tablist"
        aria-label="Detalle del producto"
      >
        {tabs.map((tab) => {
          const selected = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={`relative rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                selected ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="ecosystem-detail-tab"
                  className="absolute inset-0 rounded-md bg-synect-orange/15"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mt-3"
        >
          {active === 'specs' && (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {layer.specs.map((spec) => (
                <div key={spec.label} className="glass rounded-lg px-3 py-2.5">
                  <p className="text-[11px] font-semibold text-white">{spec.label}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-neutral-500">{spec.detail}</p>
                </div>
              ))}
            </div>
          )}

          {active === 'how' && (
            <div className="grid gap-2 lg:grid-cols-3">
              {layer.howItWorks.map((step, i) => (
                <div key={step.title} className="glass rounded-lg p-3">
                  <span className="font-mono text-[10px] text-synect-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 text-xs font-medium text-neutral-200">{step.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-neutral-500">{step.detail}</p>
                </div>
              ))}
            </div>
          )}

          {active === 'tech' && (
            <div className="grid gap-2 lg:grid-cols-3">
              {layer.technicalDetails.map((block) => (
                <div key={block.category} className="glass rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-white">{block.category}</p>
                  <ul className="mt-1.5 space-y-1">
                    {block.items.map((item) => (
                      <li key={item} className="text-[10px] leading-snug text-neutral-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {extra}
    </div>
  )
}
