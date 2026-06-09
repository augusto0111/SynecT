import { visionStages } from '../products/catalog'
import type { VisionStageId } from '../visionStage'

export const visionModularSystem = {
  tagline: 'Un mismo sistema modular — adoptá por etapas',
}

const STAGE_META: Record<VisionStageId, { short: string; layer: string }> = {
  'synect-vision': { short: 'Visión', layer: 'Hardware' },
  'connect-insight': { short: 'Datos', layer: 'Plataforma' },
  'synect-intell': { short: 'Intell', layer: 'Inteligencia' },
}

export type VisionShowroomStage = {
  id: VisionStageId
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

/** Copy del showroom derivado de visionStages (fuente PDF / catálogo) */
export const visionShowroomStages: VisionShowroomStage[] = visionStages.map((stage) => ({
  id: stage.id,
  step: stage.step,
  label: stage.label,
  short: STAGE_META[stage.id].short,
  layer: STAGE_META[stage.id].layer,
  badge: stage.badge,
  title: stage.title,
  description: stage.description,
  points: stage.features,
  value: stage.clientValue,
}))
