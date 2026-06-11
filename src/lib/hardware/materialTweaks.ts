import * as THREE from 'three'

function isPbrMaterial(
  mat: THREE.Material,
): mat is THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial {
  return (
    mat instanceof THREE.MeshStandardMaterial ||
    mat instanceof THREE.MeshPhysicalMaterial
  )
}

export function applyHardwareMaterialTweaks(mat: THREE.Material) {
  mat.side = THREE.DoubleSide
  mat.needsUpdate = true

  if (!isPbrMaterial(mat)) return

  if (mat.name === 'SmoothBlack' || mat.name === 'Material.001') {
    mat.color.setHex(0x222222)
    mat.roughness = 0.65
    mat.metalness = 0.05
    mat.envMapIntensity = 0.45
    return
  }

  if (mat.name === 'GlossyBlack') {
    mat.color.setHex(0x1e1e1e)
    mat.roughness = 0.48
    mat.metalness = 0.35
    mat.envMapIntensity = 0.4
    return
  }

  if (mat.name === 'SmokedDark') {
    mat.color.setHex(0x454545)
    mat.roughness = 0.25
    mat.metalness = 0.4
    mat.envMapIntensity = 0.55
    return
  }

  if (mat.name === 'Orange') {
    mat.envMapIntensity = 0.75
    return
  }

  if (mat.name === 'Default') {
    mat.color.setHex(0x848484)
    mat.roughness = 0.62
    mat.metalness = 0.05
    mat.envMapIntensity = 0.45
  }
}

const VISION_SCREEN_TEXTURE_SCALE = 0.72
const VISION_SCREEN_TEXTURE_OFFSET = (1 - VISION_SCREEN_TEXTURE_SCALE) / 2

export function generateVisionScreenUvs(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  if (!box) return

  const position = geometry.getAttribute('position')
  if (!position) return

  const uvs = new Float32Array(position.count * 2)
  const width = box.max.x - box.min.x || 1
  const height = box.max.y - box.min.y || 1

  for (let i = 0; i < position.count; i++) {
    const u = (position.getX(i) - box.min.x) / width
    const v = (position.getY(i) - box.min.y) / height
    uvs[i * 2] = u
    uvs[i * 2 + 1] = 1 - v
  }

  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
}

function createVisionScreenTexture(texture: THREE.Texture) {
  const screenMap = texture.clone()
  screenMap.colorSpace = THREE.SRGBColorSpace
  screenMap.flipY = false
  screenMap.wrapS = THREE.ClampToEdgeWrapping
  screenMap.wrapT = THREE.ClampToEdgeWrapping
  screenMap.repeat.set(
    VISION_SCREEN_TEXTURE_SCALE,
    VISION_SCREEN_TEXTURE_SCALE,
  )
  screenMap.offset.set(
    VISION_SCREEN_TEXTURE_OFFSET,
    VISION_SCREEN_TEXTURE_OFFSET,
  )
  screenMap.needsUpdate = true
  return screenMap
}

export function applyVisionScreenTexture(
  mat: THREE.Material,
  texture: THREE.Texture,
) {
  if (!isPbrMaterial(mat) || mat.name !== 'SmokedDark') return

  const screenMap = createVisionScreenTexture(texture)

  mat.map = screenMap
  mat.emissiveMap = screenMap
  mat.color.setHex(0xffffff)
  mat.emissive.setHex(0xffffff)
  mat.emissiveIntensity = 1.2
  mat.metalness = 0
  mat.roughness = 0.88
  mat.envMapIntensity = 0
  mat.needsUpdate = true
}
