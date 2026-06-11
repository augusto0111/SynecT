import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import orionScreenUrl from '../../assets/products/orion-screen.png'
import visionScreenUrl from '../../assets/products/vision-screen.png'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  applyHardwareMaterialTweaks,
  applyVisionScreenTexture,
  generateVisionScreenUvs,
} from '../../lib/hardware/materialTweaks'
import { attachOrionScreenOverlay } from '../../lib/hardware/orionScreenOverlay'
import { orionModelSrc, visionModelSrc } from '../../lib/hardware/models'
import { dispatchLayoutSync, LAYOUT_SYNC_EVENT } from '../../lib/layout/sync'

type HardwareModelStageProps = {
  modelUrl?: string
  code: string
  caption: string
  fallbackAlt?: string
  /** Rotación inicial en radianes (eje Y) */
  rotationY?: number
  /** Rotación inicial en radianes (eje Z, antihorario = positivo) */
  rotationZ?: number
}

function readShellSize(shell: HTMLElement) {
  const width = Math.round(shell.clientWidth)
  const height = Math.round(shell.clientHeight)
  return { width, height }
}

function centerAndScale(object: THREE.Object3D, targetSize = 1.05) {
  object.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(object)
  object.position.sub(box.getCenter(new THREE.Vector3()))

  object.updateMatrixWorld(true)
  const sized = new THREE.Box3().setFromObject(object)
  const size = sized.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  object.scale.setScalar(targetSize / maxDim)

  object.updateMatrixWorld(true)
  const centered = new THREE.Box3().setFromObject(object)
  object.position.sub(centered.getCenter(new THREE.Vector3()))
}

function buildCenteredPivot(
  scene: THREE.Object3D,
  rotationY: number,
  rotationZ: number,
  options?: {
    visionScreenTexture?: THREE.Texture
    orionScreenTexture?: THREE.Texture
    targetSize?: number
  },
) {
  const targetSize = options?.targetSize ?? 1.05
  const pivot = new THREE.Group()
  const model = scene.clone(true)

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    const mats = Array.isArray(child.material) ? child.material : [child.material]
    const isVisionScreen =
      child.name === 'Solid3_2' || mats.some((mat) => mat.name === 'SmokedDark')

    if (isVisionScreen && options?.visionScreenTexture) {
      generateVisionScreenUvs(child.geometry)
    }

    mats.forEach((mat) => {
      applyHardwareMaterialTweaks(mat)
      if (options?.visionScreenTexture && mat.name === 'SmokedDark') {
        applyVisionScreenTexture(mat, options.visionScreenTexture)
      }
    })
  })

  pivot.add(model)
  centerAndScale(model, targetSize)

  if (options?.orionScreenTexture) {
    attachOrionScreenOverlay(model, options.orionScreenTexture)
  }

  pivot.rotation.y = rotationY
  pivot.rotation.z = rotationZ

  return pivot
}

function CanvasResizeSync({ shellRef }: { shellRef: RefObject<HTMLDivElement | null> }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const setSize = useThree((state) => state.setSize)
  const setDpr = useThree((state) => state.setDpr)
  const invalidate = useThree((state) => state.invalidate)

  useLayoutEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const apply = () => {
      const { width, height } = readShellSize(shell)
      if (width < 2 || height < 2) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      setDpr(dpr)
      setSize(width, height)

      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      gl.setPixelRatio(dpr)
      invalidate()
    }

    apply()

    const delayed = [50, 150, 400, 900].map((ms) => window.setTimeout(apply, ms))
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(apply)
    })

    const observer = new ResizeObserver(apply)
    observer.observe(shell)

    window.addEventListener('scroll', apply, { passive: true })
    window.addEventListener('resize', apply, { passive: true })
    window.addEventListener(LAYOUT_SYNC_EVENT, apply)
    window.visualViewport?.addEventListener('resize', apply)
    window.visualViewport?.addEventListener('scroll', apply)

    return () => {
      cancelAnimationFrame(raf)
      delayed.forEach((id) => window.clearTimeout(id))
      observer.disconnect()
      window.removeEventListener('scroll', apply)
      window.removeEventListener('resize', apply)
      window.removeEventListener(LAYOUT_SYNC_EVENT, apply)
      window.visualViewport?.removeEventListener('resize', apply)
      window.visualViewport?.removeEventListener('scroll', apply)
    }
  }, [shellRef, camera, gl, setSize, setDpr, invalidate])

  return null
}

function ModelOrbitControls({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <OrbitControls
      makeDefault
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      enableDamping={!reducedMotion}
      dampingFactor={reducedMotion ? 1 : 0.07}
      rotateSpeed={0.72}
      minPolarAngle={Math.PI * 0.38}
      maxPolarAngle={Math.PI * 0.62}
    />
  )
}

function ProductModel({
  url,
  rotationY = 0,
  rotationZ = 0,
  onReady,
}: {
  url: string
  rotationY?: number
  rotationZ?: number
  onReady: () => void
}) {
  const { scene } = useGLTF(url)
  const visionScreenTexture = useTexture(visionScreenUrl)
  const orionScreenTexture = useTexture(orionScreenUrl)
  const isVision = url === visionModelSrc
  const isOrion = url === orionModelSrc

  const model = useMemo(
    () =>
      buildCenteredPivot(scene, rotationY, rotationZ, {
        visionScreenTexture: isVision ? visionScreenTexture : undefined,
        orionScreenTexture: isOrion ? orionScreenTexture : undefined,
      }),
    [scene, rotationY, rotationZ, isVision, isOrion, visionScreenTexture, orionScreenTexture],
  )

  useEffect(() => {
    onReady()
  }, [model, onReady])

  return <primitive object={model} />
}

function ModelScene({
  modelUrl,
  rotationY,
  rotationZ,
  reducedMotion,
  onReady,
  shellRef,
}: {
  modelUrl: string
  rotationY?: number
  rotationZ?: number
  reducedMotion: boolean
  onReady: () => void
  shellRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <CanvasResizeSync shellRef={shellRef} />
      <ModelOrbitControls reducedMotion={reducedMotion} />
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#d0d0d0', '#080808', 1.4]} />
      <directionalLight position={[5, 7, 6]} intensity={3.1} />
      <directionalLight position={[-6, 4, 3]} intensity={1.5} />
      <directionalLight position={[0, 3, -6]} intensity={1} color="#9eb0c4" />
      <directionalLight position={[0, 1.5, 7]} intensity={2.1} />
      <directionalLight position={[-3, 2, 4]} intensity={0.75} color="#ff7540" />
      <directionalLight position={[0, -2, 4]} intensity={0.55} />
      <pointLight position={[2, 2, 3.5]} intensity={2} distance={10} decay={2} />
      <pointLight position={[-2, 1, 2.5]} intensity={1.3} color="#fff0e6" distance={10} decay={2} />
      <ProductModel
        url={modelUrl}
        rotationY={rotationY}
        rotationZ={rotationZ}
        onReady={onReady}
      />
    </>
  )
}

export function HardwareModelStage({
  modelUrl = visionModelSrc,
  code,
  caption,
  fallbackAlt,
  rotationY = 0,
  rotationZ = 0,
}: HardwareModelStageProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  const handleReady = useCallback(() => {
    dispatchLayoutSync()
  }, [])

  return (
    <div ref={containerRef} className="hardware-model-stage">
      <div className="hardware-model-stage-inner">
        <p className="hardware-model-hint" aria-hidden="true">
          Arrastrá para explorar
        </p>
        {mounted && (
          <div ref={shellRef} className="hardware-model-canvas-shell">
            <Canvas
              key={modelUrl}
              className="hardware-model-canvas"
              aria-label={fallbackAlt ?? `Modelo 3D ${code} — ${caption}`}
              camera={{ position: [0, 0.05, 1.8], fov: 45, near: 0.01, far: 100 }}
              dpr={[1, 2]}
              frameloop={inView ? 'always' : 'never'}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'default',
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0)
                gl.outputColorSpace = THREE.SRGBColorSpace
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.toneMappingExposure = 1.55
              }}
            >
              <Suspense fallback={null}>
                <ModelScene
                  modelUrl={modelUrl}
                  rotationY={rotationY}
                  rotationZ={rotationZ}
                  reducedMotion={reducedMotion}
                  onReady={handleReady}
                  shellRef={shellRef}
                />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>
    </div>
  )
}

useGLTF.preload(visionModelSrc)
useGLTF.preload(orionModelSrc)
useTexture.preload(visionScreenUrl)
useTexture.preload(orionScreenUrl)
