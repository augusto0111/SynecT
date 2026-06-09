const SIGNALS = [
  { label: 'Ubicación', value: 'En planta' },
  { label: 'Dato', value: 'Tiempo real' },
  { label: 'Escala', value: 'Por etapas' },
] as const

export function VisionHardwareCompact() {
  return (
    <div className="showroom-module-strip-panel" aria-hidden>
      <div className="showroom-module-strip-head">
        <span>SynecT Vision</span>
        <span className="showroom-module-strip-meta">Hardware · módulo 01</span>
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
