import { VisionPhotoShowcase } from '../VisionPhotoShowcase'
import { PlatformVisual } from './PlatformVisual'
import { AgentVisual } from './AgentVisual'
import { OrionVideoShowcase } from '../OrionVideoShowcase'
import type { VisualType } from '../../lib/products/types'

export function StageVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'vision':
      return <VisionPhotoShowcase />
    case 'terminal':
      return <AgentVisual />
    case 'orion':
      return <OrionVideoShowcase />
    default:
      return <PlatformVisual />
  }
}
