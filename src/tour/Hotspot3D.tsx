import { Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import type { Group } from 'three'

type Hotspot3DProps = {
  position: [number, number, number]
  label: string
  collected?: boolean
  onClick: () => void
}

export function Hotspot3D({ position, label, collected, onClick }: Hotspot3DProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const baseColor = collected ? '#22c55e' : '#ef4444'
  const color = hovered ? '#fbbf24' : baseColor

  const labelColor = useMemo(() => (collected ? '#bbf7d0' : '#fee2e2'), [collected])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.7
    groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.05
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <mesh>
        <icosahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.26, 28]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>

      <Billboard follow lockX={false} lockY={false} lockZ={false} position={[0, 0.3, 0]}>
        <Text
          fontSize={0.12}
          color={labelColor}
          outlineWidth={0.008}
          outlineColor={'#0b1220'}
          anchorX={'center'}
          anchorY={'middle'}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  )
}
