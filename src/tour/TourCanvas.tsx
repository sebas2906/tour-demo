import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import { yawPitchToVector3 } from '../lib/math'
import { HOTSPOTS } from './hotspots'
import { Hotspot3D } from './Hotspot3D'
import { PanoramaSphere } from './PanoramaSphere'

type TourCanvasProps = {
  selectedId?: string
  collectedIds: Set<string>
  onSelectHotspot: (id: string) => void
}

function Scene({ collectedIds, onSelectHotspot }: Omit<TourCanvasProps, 'selectedId'>) {
  const radius = 7.6

  const hotspotPositions = useMemo(() => {
    return HOTSPOTS.map((h) => ({
      id: h.id,
      label: h.label,
      position: yawPitchToVector3(h.yaw, h.pitch, radius),
    }))
  }, [radius])

  return (
    <>
      <color attach="background" args={["#050a12"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 3, 2]} intensity={1.0} />

      <Suspense fallback={null}>
        <PanoramaSphere src={'/assets/panorama.jpg'} radius={8} />
      </Suspense>

      {hotspotPositions.map((h) => (
        <Hotspot3D
          key={h.id}
          position={h.position}
          label={h.label}
          collected={collectedIds.has(h.id)}
          onClick={() => onSelectHotspot(h.id)}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.55}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI - 0.2}
      />
    </>
  )
}

export function TourCanvas({ collectedIds, onSelectHotspot }: TourCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0.01], fov: 75, near: 0.01, far: 50 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <Scene collectedIds={collectedIds} onSelectHotspot={onSelectHotspot} />
    </Canvas>
  )
}
