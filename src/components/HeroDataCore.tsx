import { motion } from 'framer-motion'

const nodes = [
  { label: 'Sensores', x: 18, y: 28 },
  { label: 'PLCs', x: 82, y: 22 },
  { label: 'SynecT Vision', x: 50, y: 48, primary: true },
  { label: 'Plataforma', x: 22, y: 72 },
  { label: 'Agente IA', x: 78, y: 76 },
]

const links = [
  [0, 2], [1, 2], [2, 3], [2, 4], [3, 4],
]

export function HeroDataCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-0 rounded-full bg-synect-orange/10 blur-[100px]" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-synect-orange/20 blur-[60px]"
      />

      {/* Orbital rings */}
      {[100, 78, 56].map((size, i) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 rounded-full border border-synect-orange/15"
          style={{ width: `${size}%`, height: `${size}%`, x: '-50%', y: '-50%' }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 15, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
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
              stroke="rgba(255,107,0,0.25)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
            />
          )
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
        >
          <div
            className={`relative flex items-center justify-center rounded-full ${
              node.primary
                ? 'h-20 w-20 glass-orange glow-orange'
                : 'h-11 w-11 glass'
            }`}
          >
            {node.primary ? (
              <div className="text-center">
                <p className="font-mono text-[8px] uppercase tracking-widest text-synect-orange">
                  SynecT
                </p>
                <p className="text-xs font-bold text-white">VISION</p>
              </div>
            ) : (
              <span className="h-2 w-2 rounded-full bg-synect-orange animate-pulse-glow" />
            )}
          </div>
          {!node.primary && (
            <p className="mt-1.5 whitespace-nowrap text-center font-mono text-[9px] text-neutral-500">
              {node.label}
            </p>
          )}
        </motion.div>
      ))}

      {/* Live metrics */}
      <div className="absolute bottom-0 left-0 glass rounded-xl px-4 py-3 font-mono text-[10px]">
        <span className="text-neutral-500">TELEMETRÍA</span>
        <span className="ml-2 text-synect-orange">EN VIVO</span>
      </div>
      <div className="absolute right-0 top-0 glass-orange rounded-xl px-4 py-3 font-mono text-[10px]">
        <span className="text-synect-orange">IA</span>
        <span className="ml-2 text-white">ACTIVA</span>
      </div>
    </div>
  )
}
