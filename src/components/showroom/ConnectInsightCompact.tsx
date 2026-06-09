const KPIS = [
  { label: 'OEE', value: '87%' },
  { label: 'Energía', value: '−12%' },
  { label: 'Disp.', value: '94%' },
] as const

export function ConnectInsightCompact() {
  return (
    <div className="showroom-module-strip-panel" aria-hidden>
      <div className="showroom-module-strip-head">
        <span>Connect</span>
        <span className="showroom-module-strip-arrow">→</span>
        <span>Insight</span>
        <span className="showroom-module-strip-meta">Plataforma · módulo 02</span>
      </div>
      <div className="showroom-module-strip-kpis">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="showroom-module-strip-kpi">
            <span className="showroom-module-strip-kpi-label">{kpi.label}</span>
            <span className="showroom-module-strip-kpi-value">{kpi.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
