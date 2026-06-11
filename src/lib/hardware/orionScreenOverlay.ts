import * as THREE from 'three'

const ORION_SCREEN_MESH = 'Solid1_3'
const ORION_SCREEN_INSET = 0.96
const ORION_SCREEN_LIFT = 0.015

function findMeshByName(root: THREE.Object3D, name: string) {
  let found: THREE.Mesh | undefined
  root.traverse((child) => {
    if (!found && child instanceof THREE.Mesh && child.name === name) {
      found = child
    }
  })
  return found
}

function createCoverTexture(texture: THREE.Texture, planeAspect: number) {
  const image = texture.image as { width: number; height: number }
  const imageAspect = image.width / image.height

  const screenMap = texture.clone()
  screenMap.colorSpace = THREE.SRGBColorSpace
  screenMap.flipY = true
  screenMap.wrapS = THREE.ClampToEdgeWrapping
  screenMap.wrapT = THREE.ClampToEdgeWrapping

  if (imageAspect > planeAspect) {
    const repeatX = planeAspect / imageAspect
    screenMap.repeat.set(repeatX, 1)
    screenMap.offset.set((1 - repeatX) / 2, 0)
  } else {
    const repeatY = imageAspect / planeAspect
    screenMap.repeat.set(1, repeatY)
    screenMap.offset.set(0, (1 - repeatY) / 2)
  }

  screenMap.needsUpdate = true
  return screenMap
}

export function attachOrionScreenOverlay(
  model: THREE.Object3D,
  texture: THREE.Texture,
) {
  const screenMesh = findMeshByName(model, ORION_SCREEN_MESH)
  if (!screenMesh) return

  const geometry = screenMesh.geometry
  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  if (!box) return

  const center = box.getCenter(new THREE.Vector3())
  const sizeX = box.max.x - box.min.x
  const sizeY = box.max.y - box.min.y
  if (sizeX <= 0 || sizeY <= 0) return

  // Dashboard landscape sobre pantalla portrait (geometría local en XY)
  const planeW = sizeY * ORION_SCREEN_INSET
  const planeH = sizeX * ORION_SCREEN_INSET
  const planeAspect = planeW / planeH
  const screenMap = createCoverTexture(texture, planeAspect)

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(planeW, planeH),
    new THREE.MeshBasicMaterial({
      map: screenMap,
      toneMapped: false,
      depthTest: false,
      depthWrite: false,
    }),
  )

  plane.name = 'OrionScreenOverlay'
  plane.rotation.z = -Math.PI / 2
  plane.position.set(center.x, center.y, box.max.z + ORION_SCREEN_LIFT)
  plane.renderOrder = 20

  screenMesh.add(plane)
}
