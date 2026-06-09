import { orionStages } from '../products/catalog'
import type { OrionStageId } from '../orionStage'

export const orionModularSystem = {
  tagline: 'Un mismo sistema modular — de la unidad en ruta al despacho',
}

const STAGE_IDS: OrionStageId[] = ['field-unit', 'live-map', 'telemetry', 'score-ia']

const STAGE_META: Record<
  OrionStageId,
  { layer: string; badge: string; title: string; points: string[]; value: string }
> = {
  'field-unit': {
    layer: 'Hardware',
    badge: 'Unidad en vehículo',
    title: 'El dato desde el camión',
    points: [
      'GPS y sensores de conducción en cada vehículo',
      'Conectividad celular y almacenamiento local',
      'Listo para sincronizar con Connect',
    ],
    value: 'Visibilidad en ruta desde el hardware, sin depender de apps sueltas.',
  },
  'live-map': {
    layer: 'Tracking',
    badge: 'Mapa en vivo',
    title: 'Dónde está cada vehículo ahora',
    points: [
      'Posición en tiempo real y historial de rutas',
      'Geocercas y alertas de desvío',
      'Visible para despacho y gerencia',
    ],
    value: 'El despacho ve la flota completa sin llamar a cada chofer.',
  },
  telemetry: {
    layer: 'Datos',
    badge: 'Telemetría',
    title: 'Qué pasa en el camino',
    points: [
      'Velocidad, frenado brusco, ralentí y consumo',
      'Eventos de caja negra en cada viaje',
      'Histórico en Connect, analítica en Insight',
    ],
    value: 'De la ubicación al detalle de conducción — todo en un solo lugar.',
  },
  'score-ia': {
    layer: 'Inteligencia',
    badge: 'Score de conducción',
    title: 'Mejorar antes del incidente',
    points: [
      'Calificación de choferes por flota',
      'Detección de patrones de riesgo',
      'Simulación de escenarios para capacitación',
    ],
    value: 'Menos incidentes y mejor uso de la flota con datos reales.',
  },
}

export type OrionShowroomStage = {
  id: OrionStageId
  step: string
  label: string
  short: string
  layer: string
  badge: string
  title: string
  description: string
  points: string[]
  value: string
}

function normalizeDetail(detail: string, id: OrionStageId) {
  const text = detail.replace(/ruggedizadas?/gi, 'resistentes').replace(/ruggedizada/gi, 'resistente')
  if (id === 'field-unit') {
    return text.replace(
      'Unidad resistente instalada en vehículo:',
      'Unidad resistente instalada en el vehículo:',
    )
  }
  return text
}

export const orionShowroomStages: OrionShowroomStage[] = orionStages.map((stage, index) => {
  const id = STAGE_IDS[index]
  const meta = STAGE_META[id]
  return {
    id,
    step: stage.step,
    label: stage.label,
    short: stage.short,
    layer: meta.layer,
    badge: meta.badge,
    title: meta.title,
    description: normalizeDetail(stage.detail, id),
    points: meta.points,
    value: meta.value,
  }
})
