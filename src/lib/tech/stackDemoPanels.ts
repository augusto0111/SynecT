export type DemoLogLine = {
  tag: string
  text: string
  tone?: 'default' | 'ok' | 'warn' | 'accent'
}

export type DemoPanelData = {
  id: string
  code: string
  command: string
  lines: DemoLogLine[]
  status?: 'live' | 'idle' | 'done'
}

export const stackDemoPanels: DemoPanelData[] = [
  {
    id: 'field',
    code: 'MODULE-01 // FIELD-INGEST',
    command: 'synect field sync --unit vision-line-a',
    status: 'live',
    lines: [
      { tag: 'INIT', text: 'Conectando sensores en planta...' },
      { tag: 'READ', text: 'Tanque T-04 · presión · temperatura · nivel', tone: 'accent' },
      { tag: 'EDGE', text: 'Field Unit · buffer local OK' },
      { tag: 'SYNC', text: 'Telemetría → Connect datacenter' },
      { tag: 'OK', text: 'Stream activo · 24/7', tone: 'ok' },
    ],
  },
  {
    id: 'connect',
    code: 'MODULE-02 // CONNECT + INSIGHT',
    command: 'synect insight query --asset T-04 --window 24h',
    status: 'done',
    lines: [
      { tag: 'INIT', text: 'Namespace plant-a · datacenter propio' },
      { tag: 'FETCH', text: 'Históricos · KPIs · correlaciones' },
      { tag: 'VIEW', text: 'Dashboard operativo por línea / turno', tone: 'accent' },
      { tag: 'REPORT', text: 'Tendencias multivariable generadas' },
      { tag: 'OK', text: 'Insight session abierta', tone: 'ok' },
    ],
  },
  {
    id: 'intell',
    code: 'MODULE-03 // INTELL',
    command: 'synect intell predict --model process-guard',
    status: 'live',
    lines: [
      { tag: 'INIT', text: 'Modelo sobre históricos propios' },
      { tag: 'INFER', text: 'Análisis predictivo multivariable...', tone: 'accent' },
      { tag: 'ALERT', text: 'Desviación en ventana operativa', tone: 'warn' },
      { tag: 'RX', text: 'Prescripción disponible en consola' },
      { tag: 'OK', text: 'IA activa en planta', tone: 'ok' },
    ],
  },
  {
    id: 'orion',
    code: 'MODULE-04 // ORION-FLEET',
    command: 'synect orion track --fleet north-route',
    status: 'live',
    lines: [
      { tag: 'INIT', text: 'Field Unit móvil · telemetría en ruta' },
      { tag: 'GPS', text: 'Activos en mapa · estado en vivo', tone: 'accent' },
      { tag: 'SYNC', text: 'Mismo stack Connect + Intell' },
      { tag: 'VIEW', text: 'Consola flota · alertas unificadas' },
      { tag: 'OK', text: 'Planta + ruta · un ecosistema', tone: 'ok' },
    ],
  },
]

export const pipelineSteps = [
  { id: 'field', label: 'Campo', sub: 'HW · sensores' },
  { id: 'platform', label: 'Plataforma', sub: 'SW · datos' },
  { id: 'intell', label: 'Intell', sub: 'IA · modelos' },
  { id: 'action', label: 'Acción', sub: 'planta + flota' },
]
