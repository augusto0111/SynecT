function StripPanel({
  head,
  meta,
  cells,
}: {
  head: string
  meta: string
  cells: readonly { label: string; value: string }[]
}) {
  return (
    <div className="showroom-module-strip-panel" aria-hidden>
      <div className="showroom-module-strip-head">
        <span>{head}</span>
        <span className="showroom-module-strip-meta">{meta}</span>
      </div>
      <div className="showroom-module-strip-kpis">
        {cells.map((cell) => (
          <div key={cell.label} className="showroom-module-strip-kpi">
            <span className="showroom-module-strip-kpi-label">{cell.label}</span>
            <span className="showroom-module-strip-kpi-value">{cell.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function OrionFieldUnitStrip() {
  return (
    <StripPanel
      head="SynecT Field Unit"
      meta="Hardware · módulo 01"
      cells={[
        { label: 'GPS', value: 'En vivo' },
        { label: 'Sensores', value: 'Conducción' },
        { label: 'Sync', value: 'Connect' },
      ]}
    />
  )
}

export function OrionMapStrip() {
  return (
    <StripPanel
      head="Mapa en vivo"
      meta="Tracking · módulo 02"
      cells={[
        { label: 'Flota', value: '12 activos' },
        { label: 'Rutas', value: 'Historial' },
        { label: 'Alertas', value: 'Geocerca' },
      ]}
    />
  )
}

export function OrionTelemetryStrip() {
  return (
    <StripPanel
      head="Telemetría"
      meta="Datos · módulo 03"
      cells={[
        { label: 'Velocidad', value: 'Monitoreo' },
        { label: 'Frenado', value: 'Eventos' },
        { label: 'Histórico', value: 'Connect' },
      ]}
    />
  )
}

export function OrionScoreStrip() {
  return (
    <StripPanel
      head="Score IA"
      meta="Inteligencia · módulo 04"
      cells={[
        { label: 'Choferes', value: 'Ranking' },
        { label: 'Riesgo', value: 'Patrones' },
        { label: 'Acción', value: 'Capacitar' },
      ]}
    />
  )
}
