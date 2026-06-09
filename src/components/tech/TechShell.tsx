import { Starfield } from './Starfield'

export function TechShell() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-black" aria-hidden="true">
      <Starfield />
    </div>
  )
}
