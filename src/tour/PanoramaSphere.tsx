import { useTexture } from '@react-three/drei'
import { useMemo } from 'react'
import { BackSide, SRGBColorSpace, Texture } from 'three'

type PanoramaSphereProps = {
  src: string
  radius?: number
}

function configureTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function PanoramaSphere({ src, radius = 8 }: PanoramaSphereProps) {
  const rawTexture = useTexture(src)
  const texture = useMemo(() => configureTexture(rawTexture), [rawTexture])

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 32]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  )
}
