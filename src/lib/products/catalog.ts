import {
  Eye,
  Layers,
  Sparkles,
  Gauge,
  Shield,
  Wifi,
  Activity,
  Database,
  Lock,
  LineChart,
  TrendingUp,
  Bot,
  Brain,
  Truck,
  Map,
  BarChart3,
  Cpu,
  Radio,
  Server,
} from 'lucide-react'
import type {
  Audience,
  OrionStage,
  PlatformLayer,
  ProductLine,
  ProductModule,
  VisionStage,
} from './types'

export const synectMission = {
  headline: 'Una plataforma industrial completa',
  subheadline:
    'SynecT no es un solo producto: es hardware, software e inteligencia artificial diseñados en conjunto para llevar operaciones físicas al mundo digital — sin depender de vendors aislados.',
  pillars: [
    {
      title: 'Captura en campo',
      text: 'Sensores y hardware SynecT Field convierten señales físicas en telemetría digital confiable.',
    },
    {
      title: 'Plataforma unificada',
      text: 'Connect almacena, Insight analiza e Intell predice — sobre infraestructura propia, con soberanía de datos.',
    },
    {
      title: 'Verticales de producto',
      text: 'VISION cubre planta y procesos industriales. ORION extiende el mismo stack a flotas y operación en ruta.',
    },
  ],
}

export const platformLayers: PlatformLayer[] = [
  {
    icon: Radio,
    title: 'Campo · Sensores y adquisición',
    description: 'Donde nace el dato físico',
    items: [
      'Lectura de tanques, presión, temperatura y flujo',
      'Hardware SynecT Vision en piso de planta',
      'SynecT Field Unit para vehículos y activos móviles',
    ],
  },
  {
    icon: Server,
    title: 'Plataforma · Connect + Insight',
    description: 'Donde el dato se guarda y se entiende',
    items: [
      'Datacenter propio con retención histórica escalable',
      'Dashboards KPI por línea, turno o activo',
      'Reportes, tendencias y correlaciones multivariable',
    ],
  },
  {
    icon: Brain,
    title: 'Inteligencia · Intell',
    description: 'Donde el dato anticipa el futuro',
    items: [
      'Modelos entrenados sobre tus propios históricos',
      'Alertas predictivas antes de paradas no planificadas',
      'Optimización de parámetros de proceso y consumo',
    ],
  },
  {
    icon: Cpu,
    title: 'Productos · VISION y ORION',
    description: 'Donde la plataforma se vuelve solución',
    items: [
      'VISION — vertical para operaciones en planta',
      'ORION — vertical para flotas y operación en ruta',
    ],
  },
]

export const productLines: ProductLine[] = [
  {
    id: 'vision',
    label: 'VISION',
    tagline: 'Planta y procesos',
    description:
      'Vertical para operaciones industriales: de la pantalla en piso de planta al mantenimiento predictivo. Tres etapas que podés adoptar según madurez — cada una con ROI medible.',
  },
  {
    id: 'orion',
    label: 'ORION',
    tagline: 'Fleet Control',
    description:
      'Vertical para flotas y campo: tracking GPS, telemetría de caja negra, alertas en ruta y analítica de conducción — nativo en hardware SynecT.',
  },
]

export const synectAudiences: Audience[] = [
  {
    role: 'Operaciones / piso de planta',
    need: 'Ver el dato donde ocurre, reaccionar al instante',
    synectAnswer: 'SynecT Vision — pantallas industriales junto al activo, alertas claras',
  },
  {
    role: 'Gerencia / producción',
    need: 'KPIs confiables, comparar turnos y justificar decisiones',
    synectAnswer: 'Connect + Insight — historial soberano y dashboards accionables',
  },
  {
    role: 'Mantenimiento / confiabilidad',
    need: 'Anticipar fallas antes de paradas no planificadas',
    synectAnswer: 'SynecT Intell — alertas predictivas sobre tus propios históricos',
  },
  {
    role: 'Logística / flotas',
    need: 'Visibilidad en ruta, telemetría y control de conducción',
    synectAnswer: 'ORION Fleet Control — mapa en vivo y score nativo en Field Unit',
  },
]

export const connectModule: ProductModule = {
  name: 'SynecT Connect',
  role: 'Ingesta, almacenamiento y soberanía de datos',
  capabilities: [
    'Datacenter propio con retención histórica configurable',
    'Normalización de telemetría desde SynecT Vision y sensores de campo',
      'Exportación e integración hacia ERP, MES o sistemas corporativos (según despliegue)',
    'Seguridad perimetral, backups y trazabilidad de accesos',
  ],
}

export const insightModule: ProductModule = {
  name: 'SynecT Insight',
  role: 'Análisis, visualización y KPIs operativos',
  capabilities: [
    'Dashboards por activo, línea, turno o planta completa',
    'KPIs de producción, calidad, energía y disponibilidad',
    'Detección de tendencias, correlaciones y desvíos multivariable',
    'Reportes exportables para gerencia e ingeniería de procesos',
  ],
}

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
      'Pantallas ruggedizadas con UI diseñada para operadores de planta',
      'Baja inversión inicial — el paquete más accesible del ecosistema',
      'Alertas visuales y sonoras ante umbrales críticos en tiempo real',
      'Hardware y software locales, listos para escalar a Connect e Insight',
    ],
    clientValue:
      'Visibilidad instantánea: el operador reacciona en segundos, no en horas. Ideal como prueba de valor antes de escalar.',
    specs: [
      { label: 'Visibilidad inmediata', detail: 'Dato en pantalla, en planta' },
      { label: 'Bases escalables', detail: 'Compatible con Connect e Insight' },
      { label: 'Prueba de valor', detail: 'Inversión inicial accesible' },
      { label: 'Reacción en vivo', detail: 'Alertas y eventos críticos' },
    ],
    howItWorks: [
      {
        title: 'Sensores capturan la señal',
        detail: 'Nivel, presión, temperatura u otras variables se leen del activo industrial.',
      },
      {
        title: 'SynecT Vision procesa y muestra',
        detail: 'El dato se normaliza y aparece en la pantalla industrial junto al equipo.',
      },
      {
        title: 'El operador actúa en el momento',
        detail: 'Umbrales configurables disparan alertas antes de que un desvío se convierta en parada.',
      },
    ],
    technicalDetails: [
      {
        category: 'Hardware',
        items: [
          'Pantallas industriales ruggedizadas para piso de planta',
          'Gateway local de adquisición y edge processing',
          'Compatibilidad con sensores de nivel, presión, temperatura y flujo',
        ],
      },
      {
        category: 'Software',
        items: [
          'Interfaz diseñada para operadores — curva de aprendizaje mínima',
          'Alertas visuales, sonoras y por umbral configurable',
          'Preparado para sincronizar telemetría con SynecT Connect',
        ],
      },
      {
        category: 'Despliegue',
        items: [
          'Implementación por activo crítico — empezá donde más duele',
          'Prueba de valor antes de escalar al resto de la planta',
          'Despliegue acotado por etapa — el alcance se define según tu operación',
        ],
      },
    ],
    benefitId: 'benefit-vision',
    visual: 'vision',
  },
  {
    id: 'connect-insight',
    step: '02',
    label: 'Connect + Insight',
    badge: 'Almacenamiento + análisis',
    title: 'Del dato confiable al conocimiento accionable',
    description:
      'Una misma etapa de madurez con dos capacidades complementarias: SynecT Connect guarda y estandariza la telemetría en infraestructura propia; SynecT Insight la transforma en dashboards, KPIs y reportes para gerencia y ingeniería.',
    features: [
      'Connect: datacenter propio, soberanía de datos y retención histórica escalable',
      'APIs y exportación para integrar con ERP, MES o sistemas corporativos',
      'Insight: dashboards por activo, línea, turno o planta completa',
      'Detección de patrones, tendencias y correlaciones invisibles en tiempo real',
    ],
    clientValue:
      'Gerencia y planta hablan con los mismos números: de datos crudos a reportes que impulsan eficiencia, ahorro energético y reducción de fallas.',
    specs: [
      { label: 'SynecT Connect', detail: 'Almacenamiento soberano y escalable' },
      { label: 'Datacenter propio', detail: 'Seguridad y cumplimiento corporativo' },
      { label: 'SynecT Insight', detail: 'Dashboards e indicadores KPI' },
      { label: 'Análisis avanzado', detail: 'Patrones, tendencias y correlaciones' },
    ],
    howItWorks: [
      {
        title: 'Connect ingesta y almacena',
        detail: 'Telemetría de SynecT Vision y sensores llega al datacenter SynecT con timestamps confiables.',
      },
      {
        title: 'Insight agrega y visualiza',
        detail: 'Dashboards muestran KPIs de producción, consumo energético y calidad por periodo.',
      },
      {
        title: 'Equipos deciden con historial',
        detail: 'Comparás turnos, detectás desvíos recurrentes y justificás inversiones con datos reales.',
      },
    ],
    technicalDetails: [
      {
        category: 'Connect · infraestructura',
        items: [
          'Datacenter propio — soberanía y retención histórica escalable',
          'Ingesta desde SynecT Vision y sensores de campo',
          'Exportación hacia ERP, MES o sistemas corporativos vía REST',
        ],
      },
      {
        category: 'Insight · analítica',
        items: [
          'Dashboards por activo, línea, turno o planta',
          'KPIs configurables: OEE, energía, calidad, disponibilidad',
          'Detección de anomalías en series temporales multivariable',
        ],
      },
      {
        category: 'Gobernanza',
        items: [
          'Roles y permisos por área operativa',
          'Auditoría de accesos y exportaciones',
          'Cumplimiento de políticas corporativas de datos',
        ],
      },
    ],
    benefitId: 'benefit-insight',
    visual: 'analytics',
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
    specs: [
      { label: 'Predicción', detail: 'Anticipa fallas y desvíos' },
      { label: 'Optimización', detail: 'Ajuste de parámetros sugerido' },
      { label: 'Anomalías', detail: 'Detección multivariable avanzada' },
      { label: 'ROI', detail: 'Eficiencia que crece en el tiempo' },
    ],
    howItWorks: [
      {
        title: 'Intell analiza históricos',
        detail: 'Modelos ML procesan meses de telemetría de Connect para detectar firmas de falla.',
      },
      {
        title: 'Genera alertas predictivas',
        detail: 'Antes de que un activo cruce umbral crítico, Intell avisa con ventana de acción.',
      },
      {
        title: 'Sugiere optimización',
        detail: 'Recomienda ajustes de proceso para reducir consumo o mejorar throughput.',
      },
    ],
    technicalDetails: [
      {
        category: 'Modelos',
        items: [
          'Entrenados sobre históricos propios de la planta — no reglas genéricas',
          'Detección multivariable: vibración, temperatura, presión, caudal',
          'Reentrenamiento periódico con nuevos datos de Connect',
        ],
      },
      {
        category: 'Salidas',
        items: [
          'Alertas predictivas con ventana de mantenimiento sugerida',
          'Recomendaciones de ajuste de parámetros de proceso',
          'Informes de confianza y explicabilidad para ingeniería',
        ],
      },
      {
        category: 'Requisitos',
        items: [
          'Histórico suficiente en Connect — Intell es etapa 03 de VISION',
          'Definición conjunta de activos críticos con mantenimiento',
          'ROI acumulativo sobre la inversión en captura y almacenamiento',
        ],
      },
    ],
    benefitId: 'benefit-intell',
    visual: 'terminal',
  },
]

export const orionBenefitId = 'benefit-orion'

export const orionStages: OrionStage[] = [
  {
    step: '01',
    label: 'SynecT Field Unit',
    short: 'Hardware',
    detail:
      'Unidad ruggedizada instalada en vehículo: GPS, sensores de conducción, conectividad celular y almacenamiento local de telemetría.',
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

export const orionTechnicalDetails = [
  {
    category: 'Field Unit',
    items: [
      'GPS, sensores de conducción y conectividad celular',
      'Almacenamiento local con sync a Connect',
      'Instalación ruggedizada para vehículos comerciales',
    ],
  },
  {
    category: 'Plataforma ORION',
    items: [
      'Mapa en vivo, geocercas y alertas de desvío',
      'Telemetría: velocidad, frenado, ralentí, consumo',
      'Score de conducción y ranking por flota',
    ],
  },
  {
    category: 'Stack compartido',
    items: [
      'Históricos en Connect — misma base que VISION en planta',
      'Analítica avanzada opcional con Insight e Intell',
      'APIs para despacho y sistemas de gestión de flota',
    ],
  },
]

export const orionFeatures = [
  'Tracking GPS en tiempo real con historial de rutas',
  'Alertas de geocerca, velocidad y eventos críticos',
  'Score de choferes con simulación de escenarios',
  'Integrado nativamente con SynecT Field Unit',
  'Telemetría de caja negra: frenado, aceleración, ralentí',
  'Mismo stack Connect + Insight para analítica de flota',
]

export const technologyBenefits = [
  {
    id: 'benefit-vision',
    product: 'SynecT Vision',
    area: 'Monitoreo en planta',
    title: 'Visibilidad inmediata junto al activo',
    challenge:
      'En muchas plantas el operador depende de lecturas manuales, rondas periódicas o reportes que llegan tarde. Eso retrasa la reacción ante desvíos de nivel, presión o temperatura.',
    howSynecTHelps:
      'SynecT Vision muestra el dato en una pantalla industrial instalada donde ocurre la operación — con alertas configurables y tendencias en tiempo real.',
    potentialBenefits: [
      'El operador ve el estado del activo sin desplazarse ni anotar en planilla',
      'Alertas visuales ante umbrales críticos, en el momento del evento',
      'Punto de entrada accesible antes de escalar a Connect e Insight',
    ],
    href: '#ecosistema-vision',
    tags: ['Tiempo real', 'Planta', 'Etapa 01'],
  },
  {
    id: 'benefit-insight',
    product: 'Connect + Insight',
    area: 'Datos y análisis',
    title: 'De telemetría cruda a decisiones informadas',
    challenge:
      'Sin historial unificado ni KPIs por turno o línea, gerencia e ingeniería operan con datos fragmentados o llegan tarde para corregir desvíos.',
    howSynecTHelps:
      'SynecT Connect centraliza la telemetría en infraestructura propia. SynecT Insight la convierte en dashboards, indicadores y reportes accionables.',
    potentialBenefits: [
      'Historial confiable con soberanía de datos en datacenter SynecT',
      'KPIs comparables entre turnos, líneas o activos',
      'Base común para gerencia y planta — mismos números, misma fuente',
    ],
    href: '#ecosistema-connect',
    tags: ['Dashboards', 'KPIs', 'Etapa 02'],
  },
  {
    id: 'benefit-intell',
    product: 'SynecT Intell',
    area: 'Inteligencia predictiva',
    title: 'Anticipar antes de la parada',
    challenge:
      'El mantenimiento reactivo y los umbrales fijos detectan el problema cuando el daño ya avanzó — paradas no planificadas, repuestos de urgencia y producción perdida.',
    howSynecTHelps:
      'SynecT Intell entrena modelos sobre los históricos almacenados en Connect para detectar patrones de falla y sugerir ventanas de intervención.',
    potentialBenefits: [
      'Alertas predictivas con margen de acción antes del evento crítico',
      'Detección multivariable — más allá de un solo umbral',
      'Optimización progresiva a medida que crece el histórico de datos',
    ],
    href: '#ecosistema-intell',
    tags: ['Predictivo', 'IA', 'Etapa 03'],
  },
  {
    id: 'benefit-orion',
    product: 'ORION Fleet',
    area: 'Control de flotas',
    title: 'Visibilidad y telemetría en ruta',
    challenge:
      'Despachos sin ubicación en tiempo real, incidentes reportados tarde y poca visibilidad sobre hábitos de conducción dificultan la gestión de flotas.',
    howSynecTHelps:
      'ORION con SynecT Field Unit ofrece mapa en vivo, telemetría de conducción, alertas y score — sobre el mismo stack de datos que VISION en planta.',
    potentialBenefits: [
      'Tracking GPS y geocercas para despacho centralizado',
      'Telemetría de conducción: velocidad, frenado, ralentí',
      'Score de choferes para capacitación y mejora continua',
    ],
    href: '#orion',
    tags: ['Flota', 'GPS', 'ORION'],
  },
]

export const visionFlow = [
  { icon: Eye, label: 'SynecT Vision', short: 'Visión' },
  { icon: Layers, label: 'Connect + Insight', short: 'Datos' },
  { icon: Sparkles, label: 'SynecT Intell', short: 'Intell' },
]

export const orionFlow = [
  { icon: Truck, label: 'Field Unit', short: 'Hardware' },
  { icon: Map, label: 'Mapa en vivo', short: 'Tracking' },
  { icon: BarChart3, label: 'Telemetría', short: 'Datos' },
  { icon: Brain, label: 'Score IA', short: 'IA' },
]

export const stageIcons = {
  'synect-vision': Eye,
  'connect-insight': Layers,
  'synect-intell': Sparkles,
} as const

export const stageSpecIcons = [Gauge, Shield, Wifi, Activity, Database, Lock, LineChart, TrendingUp, Sparkles, Bot, Brain, TrendingUp] as const
