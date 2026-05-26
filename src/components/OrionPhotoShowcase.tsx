import orionFleet from '../assets/products/orion-fleet-render.png'
import { DevicePhotoShowcase } from './DevicePhotoShowcase'

export function OrionPhotoShowcase() {
  return (
    <DevicePhotoShowcase
      src={orionFleet}
      alt="ORION Fleet Control — tablet industrial con mapa en vivo y telemetría de flota"
      label="ORION Fleet"
      sublabel="Control de flotas"
      maxWidth="xl"
      variant="integrated"
    />
  )
}
