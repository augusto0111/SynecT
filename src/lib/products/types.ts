import type { LucideIcon } from 'lucide-react'
import type { VisionStageId } from '../visionStage'

export type VisualType = 'vision' | 'analytics' | 'terminal' | 'orion'

export type ProductSpec = {
  label: string
  detail: string
}

export type HowItWorksStep = {
  title: string
  detail: string
}

export type TechnicalDetail = {
  category: string
  items: string[]
}

export type VisionStage = {
  id: VisionStageId
  step: string
  label: string
  badge: string
  title: string
  description: string
  features: string[]
  clientValue: string
  specs: ProductSpec[]
  howItWorks: HowItWorksStep[]
  technicalDetails: TechnicalDetail[]
  benefitId: string
  visual: VisualType
}

export type ProductModule = {
  name: string
  role: string
  capabilities: string[]
}

export type OrionStage = {
  step: string
  label: string
  short: string
  detail: string
}

export type ProductLine = {
  id: 'vision' | 'orion'
  label: string
  tagline: string
  description: string
}

export type TechnologyBenefit = {
  id: string
  product: string
  area: string
  title: string
  challenge: string
  howSynecTHelps: string
  potentialBenefits: string[]
  href: string
  tags: string[]
}

export type PlatformLayer = {
  icon: LucideIcon
  title: string
  description: string
  items: string[]
}

export type Audience = {
  role: string
  need: string
  synectAnswer: string
}
