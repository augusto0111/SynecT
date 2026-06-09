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
    mat.color.setHex(0x101010)
    mat.roughness = 0.78
    mat.metalness = 0
    mat.envMapIntensity = 0.15
    return
  }

  if (mat.name === 'GlossyBlack') {
    mat.color.setHex(0x101010)
    mat.roughness = 0.65
    mat.metalness = 0.3
    mat.envMapIntensity = 0.12
    return
  }

  if (mat.name === 'SmokedDark') {
    mat.color.setHex(0x333333)
    mat.roughness = 0.35
    mat.metalness = 0.4
    mat.envMapIntensity = 0.25
    return
  }

  if (mat.name === 'Orange') {
    mat.envMapIntensity = 0.45
    return
  }

  if (mat.name === 'Default') {
    mat.color.setHex(0x6b6b6b)
    mat.roughness = 0.75
    mat.metalness = 0
    mat.envMapIntensity = 0.18
  }
}
