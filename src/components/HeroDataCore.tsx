import { motion } from 'framer-motion'

const nodes = [
  { id: 'field-a', label: 'FIELD', sub: 'HW', x: 18, y: 28 },
  { id: 'field-b', label: 'EDGE', sub: 'HW', x: 82, y: 22 },
  { id: 'core', label: 'SynecT', sub: 'PLATFORM', x: 50, y: 48, primary: true },
  { id: 'vision', label: 'VISION', sub: 'SW+IA', x: 22, y: 72, product: true },
  { id: 'orion', label: 'ORION', sub: 'SW+IA', x: 78, y: 76, product: true },
]

const links = [
  [0, 2], [1, 2], [2, 3], [2, 4], [3, 4],
]

export function HeroDataCore() {
  return (
    <div className="tech-panel scanline relative mx-auto aspect-square w-full max-w-lg p-4">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-synect-orange/[0.06] via-transparent to-transparent" />

      <p className="absolute left-4 top-3 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
        // ARCH · HW → SW → IA
      </p>

      <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" viewBox="0 0 100 100" aria-hidden="true">
        {links.map(([a, b], i) => {
          const n1 = nodes[a]
          const n2 = nodes[b]
          return (
            <motion.line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="rgba(255,107,0,0.3)"
              strokeWidth="0.35"
              strokeDasharray="1 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
            />
          )
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
        >
          <div
            className={`relative flex flex-col items-center justify-center ${
              node.primary
                ? 'tech-panel-orange h-[4.5rem] w-[4.5rem] glow-orange'
                : 'product' in node && node.product
                  ? 'tech-panel h-12 w-[4.25rem]'
                  : 'tech-panel h-10 w-10'
            }`}
          >
            {node.primary ? (
              <>
                <p className="text-xs font-bold text-white">{node.label}</p>
                <p className="font-mono text-[7px] uppercase tracking-widest text-synect-orange">
                  {node.sub}
                </p>
              </>
            ) : 'product' in node && node.product ? (
              <>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-wider text-synect-orange">
                  {node.label}
                </p>
                <p className="font-mono text-[6px] text-neutral-500">{node.sub}</p>
              </>
            ) : (
              <span className="h-2 w-2 bg-synect-orange animate-pulse-glow" />
            )}
          </div>
          {!node.primary && !('product' in node && node.product) && (
            <p className="mt-1.5 whitespace-nowrap text-center font-mono text-[8px] uppercase tracking-wider text-neutral-500">
              {node.label}
            </p>
          )}
        </motion.div>
      ))}

      <div className="absolute bottom-3 left-3 tech-panel px-3 py-2 font-mono text-[9px]">
        <span className="text-neutral-500">[TELEM]</span>
        <span className="ml-1.5 text-synect-orange">STREAM · LIVE</span>
      </div>
      <div className="absolute right-3 top-10 tech-panel-orange px-3 py-2 font-mono text-[9px]">
        <span className="text-synect-orange">[IA]</span>
        <span className="ml-1.5 text-white">INFERENCE · ON</span>
      </div>
    </div>
  )
}
