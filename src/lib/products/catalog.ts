import type { OrionStage, VisionStage } from './types'

export const visionStages: VisionStage[] = [
  {
    id: 'synect-vision',
    step: '01',
    label: 'SynecT Vision',
    badge: 'Adquisición in situ',
    title: 'Visualización donde ocurre la operación',
    description:
      'SynecT Vision es el punto de entrada: reemplaza medidores analógicos por pantallas industriales junto al equipo. El operador ve el activo y el dato en el mismo lugar — sin subir escaleras ni anotar en planillas.',
    features: [
      'Pantallas resistentes para planta, con interfaz clara para operadores',
      'Baja inversión inicial — el paquete más accesible del ecosistema',
      'Alertas visuales ante umbrales críticos en tiempo real',
      'Hardware y software locales, listos para escalar a Connect e Insight',
    ],
    clientValue:
      'Visibilidad instantánea: el operador reacciona en segundos, no en horas. Ideal como prueba de valor antes de escalar.',
  },
  {
    id: 'connect-insight',
    step: '02',
    label: 'Connect + Insight',
    badge: 'Almacenamiento + análisis',
    title: 'Del dato confiable al conocimiento accionable',
    description:
      'Una misma etapa de madurez con dos capacidades complementarias: SynecT Connect guarda y estandariza la telemetría en infraestructura propia; SynecT Insight la transforma en dashboards, KPIs y reportes para gerencia e ingeniería.',
    features: [
      'Connect: datacenter propio, soberanía de datos y retención histórica escalable',
      'Insight: dashboards por activo, línea, turno o planta completa',
      'Detección de patrones, tendencias y correlaciones invisibles en tiempo real',
    ],
    clientValue:
      'Gerencia y planta hablan con los mismos números: de datos crudos a reportes que impulsan eficiencia, ahorro energético y reducción de fallas.',
  },
  {
    id: 'synect-intell',
    step: '03',
    label: 'SynecT Intell',
    badge: 'Inteligencia artificial',
    title: 'De reaccionar a predecir y optimizar',
    description:
      'Etapa de mayor madurez en VISION. Mientras Insight explica qué pasó y por qué, Intell anticipa desvíos y sugiere cómo optimizar la operación — con modelos entrenados sobre tus propios históricos, no reglas genéricas.',
    features: [
      'Mantenimiento predictivo: alertas días antes de fallas en bombas, compresores o motores',
      'Optimización automática de temperatura, presión, flujo y consumo energético',
      'Detección multivariable de anomalías — más allá de umbrales fijos',
      'Mejora continua: el modelo aprende con cada ciclo operativo',
    ],
    clientValue:
      'Anticipación y optimización: menos paradas imprevistas, mejor uso de recursos y ROI acumulativo sobre la inversión en datos.',
  },
]

export const orionStages: OrionStage[] = [
  {
    step: '01',
    label: 'SynecT Field Unit',
    short: 'Hardware',
    detail:
      'Unidad resistente instalada en el vehículo: GPS, sensores de conducción, conectividad celular y almacenamiento local de telemetría.',
  },
  {
    step: '02',
    label: 'Mapa en vivo',
    short: 'Tracking',
    detail:
      'Panel web con posición en tiempo real, rutas, geocercas y alertas de desvío — visible para despacho y gerencia.',
  },
  {
    step: '03',
    label: 'Telemetría',
    short: 'Datos',
    detail:
      'Velocidad, frenado brusco, ralentí, consumo y eventos de caja negra. Histórico en Connect, analítica en Insight.',
  },
  {
    step: '04',
    label: 'Score IA',
    short: 'IA',
    detail:
      'Modelo de conducción que califica choferes, simula escenarios y detecta patrones de riesgo antes de incidentes.',
  },
]
