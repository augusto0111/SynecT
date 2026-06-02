import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { VisionStageId } from '../lib/visionStage'

type Stage = { id: VisionStageId; label: string; short?: string }

type Props = {
  stages: Stage[]
  current: VisionStageId
  onSelect: (id: VisionStageId) => void
}

export function StageStepNav({ stages, current, onSelect }: Props) {
  const index = stages.findIndex((s) => s.id === current)
  const prev = index > 0 ? stages[index - 1] : null
  const next = index < stages.length - 1 ? stages[index + 1] : null

  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-4 lg:hidden">
      <button
        type="button"
        disabled={!prev}
        onClick={() => prev && onSelect(prev.id)}
        className="glass inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-neutral-300 disabled:opacity-30"
      >
        <ChevronLeft size={14} />
        {prev ? (prev.short ?? prev.label) : '—'}
      </button>
      <span className="font-mono text-[10px] text-neutral-600">
        {index + 1} / {stages.length}
      </span>
      <button
        type="button"
        disabled={!next}
        onClick={() => next && onSelect(next.id)}
        className="glass inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-neutral-300 disabled:opacity-30"
      >
        {next ? (next.short ?? next.label) : '—'}
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
