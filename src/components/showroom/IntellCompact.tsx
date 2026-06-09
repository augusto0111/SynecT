const SIGNALS = [
  { label: 'Origen', value: 'Connect' },
  { label: 'Alerta', value: '4 días' },
  { label: 'Activo', value: 'TQ-03' },
] as const

export function IntellCompact() {
  return (
    <div className="showroom-module-strip-panel" aria-hidden>
      <div className="showroom-module-strip-head">
        <span>SynecT Intell</span>
        <span className="showroom-module-strip-meta">Inteligencia · módulo 03</span>
      </div>
      <div className="showroom-module-strip-kpis">
        {SIGNALS.map((item) => (
          <div key={item.label} className="showroom-module-strip-kpi">
            <span className="showroom-module-strip-kpi-label">{item.label}</span>
            <span className="showroom-module-strip-kpi-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
