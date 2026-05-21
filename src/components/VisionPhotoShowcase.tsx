import synectVision from '../assets/products/synect-vision-seamless.png'
import { DevicePhotoShowcase } from './DevicePhotoShowcase'

export function VisionPhotoShowcase() {
  return (
    <DevicePhotoShowcase
      src={synectVision}
      alt="SynecT Vision — pantalla industrial de monitoreo en tiempo real"
      label="SynecT Vision"
      sublabel="Monitoreo en vivo"
      variant="soft"
    />
  )
}
