type RailStage = {
  id: string
  step: string
  short: string
  layer: string
}

type Props<T extends string> = {
  stages: readonly RailStage[]
  activeStage: T
  onSelectStage: (id: T) => void
  ariaLabel: string
}

export function ShowroomModularRail<T extends string>({
  stages,
  activeStage,
  onSelectStage,
  ariaLabel,
}: Props<T>) {
  return (
    <div className="showroom-modular-rail" role="tablist" aria-label={ariaLabel}>
      {stages.map((stage, index) => {
        const active = activeStage === stage.id
        const isLast = index === stages.length - 1

        return (
          <div key={stage.id} className="showroom-modular-rail-item">
            <button
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectStage(stage.id as T)}
              className={active ? 'showroom-modular-node is-active' : 'showroom-modular-node'}
            >
              <span className="showroom-modular-node-step">{stage.step}</span>
              <span className="showroom-modular-node-label">{stage.short}</span>
              <span className="showroom-modular-node-layer">{stage.layer}</span>
            </button>
            {!isLast && <span className="showroom-modular-connector" aria-hidden />}
          </div>
        )
      })}
    </div>
  )
}
