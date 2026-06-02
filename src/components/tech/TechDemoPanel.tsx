import type { DemoPanelData } from '../../lib/tech/stackDemoPanels'

type TechDemoPanelProps = {
  panel: DemoPanelData
  className?: string
  compact?: boolean
}

const toneClass: Record<NonNullable<DemoPanelData['lines'][0]['tone']>, string> = {
  default: 'text-neutral-400',
  ok: 'text-emerald-400/90',
  warn: 'text-amber-400/90',
  accent: 'text-synect-orange/90',
}

export function TechDemoPanel({ panel, className = '', compact = false }: TechDemoPanelProps) {
  return (
    <div className={`tech-demo-panel ${className}`}>
      <div className="tech-demo-panel-header">
        <span className="tech-demo-panel-code">{panel.code}</span>
        {panel.status === 'live' && (
          <span className="tech-demo-status tech-demo-status-live">
            <span className="h-1.5 w-1.5 bg-emerald-400 animate-pulse-glow" />
            LIVE
          </span>
        )}
        {panel.status === 'done' && (
          <span className="tech-demo-status text-neutral-500">DONE</span>
        )}
      </div>

      <div className="tech-demo-cmd">
        <span className="text-neutral-600">&gt;</span> {panel.command}
      </div>

      <ul className={`tech-demo-log ${compact ? 'tech-demo-log-compact' : ''}`}>
        {panel.lines.map((line) => (
          <li key={`${line.tag}-${line.text}`} className={toneClass[line.tone ?? 'default']}>
            <span className="text-neutral-600">[{line.tag}]</span> {line.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
