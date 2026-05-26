export type VisionStageId = 'synect-vision' | 'connect-insight' | 'synect-intell'

const HASH_TO_STAGE: Record<string, VisionStageId> = {
  'ecosistema-vision': 'synect-vision',
  vision: 'synect-vision',
  'ecosistema-connect': 'connect-insight',
  connect: 'connect-insight',
  'ecosistema-intell': 'synect-intell',
  intell: 'synect-intell',
}

const STAGE_TO_HASH: Record<VisionStageId, string> = {
  'synect-vision': 'ecosistema-vision',
  'connect-insight': 'ecosistema-connect',
  'synect-intell': 'ecosistema-intell',
}

export function visionStageFromHash(hash: string): VisionStageId | null {
  const clean = hash.replace('#', '').toLowerCase()
  return HASH_TO_STAGE[clean] ?? null
}

export function hashForVisionStage(stage: VisionStageId): string {
  return `#${STAGE_TO_HASH[stage]}`
}

export function navigateToVisionStage(stage: VisionStageId) {
  const hash = hashForVisionStage(stage)
  if (window.location.hash !== hash) {
    history.replaceState(null, '', hash)
  }
  document.getElementById('ecosistema')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
