import type { VisionStageId } from '../visionStage'

export type VisionStage = {
  id: VisionStageId
  step: string
  label: string
  badge: string
  title: string
  description: string
  features: string[]
  clientValue: string
}

export type OrionStage = {
  step: string
  label: string
  short: string
  detail: string
}
