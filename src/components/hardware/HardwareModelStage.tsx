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
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { applyHardwareMaterialTweaks } from '../../lib/hardware/materialTweaks'
import { orionModelSrc, visionModelSrc } from '../../lib/hardware/models'
import { dispatchLayoutSync, LAYOUT_SYNC_EVENT } from '../../lib/layout/sync'

type HardwareModelStageProps = {
  modelUrl?: string
  code: string
  caption: string
  fallbackAlt?: string
  /** Rotación inicial en radianes (eje Y) */
  rotationY?: number
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

function buildCenteredPivot(scene: THREE.Object3D, rotationY: number, targetSize = 1.05) {
  const pivot = new THREE.Group()
  const model = scene.clone(true)

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    const mats = Array.isArray(child.material) ? child.material : [child.material]
    mats.forEach(applyHardwareMaterialTweaks)
  })

  pivot.add(model)
  centerAndScale(model, targetSize)
  pivot.rotation.y = rotationY

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

function ProductModel({
  url,
  rotationY = 0,
  onReady,
}: {
  url: string
  rotationY?: number
  onReady: () => void
}) {
  const { scene } = useGLTF(url)

  const model = useMemo(
    () => buildCenteredPivot(scene, rotationY),
    [scene, rotationY],
  )

  useEffect(() => {
    onReady()
  }, [model, onReady])

  return <primitive object={model} />
}

function ModelScene({
  modelUrl,
  rotationY,
  autoRotate,
  onReady,
  shellRef,
}: {
  modelUrl: string
  rotationY?: number
  autoRotate: boolean
  onReady: () => void
  shellRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <CanvasResizeSync shellRef={shellRef} />
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#b8b8b8', '#1a1a1a', 0.95]} />
      <directionalLight position={[4, 6, 4]} intensity={1.85} />
      <directionalLight position={[-4, 3, -3]} intensity={0.75} />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#ff6520" />
      <directionalLight position={[0, -2, 4]} intensity={0.45} />
      <pointLight position={[0, 1.5, 2.5]} intensity={1.1} />
      <pointLight position={[-2, 0.5, 1.5]} intensity={0.5} color="#ffe8dc" />
      <ProductModel url={modelUrl} rotationY={rotationY} onReady={onReady} />
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
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
}: HardwareModelStageProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  useEffect(() => {
    if (!inView) setReady(false)
  }, [inView, modelUrl])

  const handleReady = useCallback(() => {
    setReady(true)
    dispatchLayoutSync()
  }, [])

  return (
    <div ref={containerRef} className="hardware-model-stage">
      <div className="hardware-model-stage-inner">
        {mounted && !ready && (
          <p className="hardware-model-loading font-mono text-[10px] text-neutral-600">
            Cargando modelo…
          </p>
        )}

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
                gl.toneMappingExposure = 1
              }}
            >
              <Suspense fallback={null}>
                <ModelScene
                  modelUrl={modelUrl}
                  rotationY={rotationY}
                  autoRotate={inView && !reducedMotion}
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
