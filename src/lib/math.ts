export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// yaw: -180..180 (left/right), pitch: -90..90 (down/up)
export function yawPitchToVector3(
  yawDegrees: number,
  pitchDegrees: number,
  radius: number,
): [number, number, number] {
  const yaw = degreesToRadians(yawDegrees)
  const pitch = degreesToRadians(pitchDegrees)

  const cosPitch = Math.cos(pitch)

  const x = Math.sin(yaw) * cosPitch
  const y = Math.sin(pitch)
  const z = Math.cos(yaw) * cosPitch

  return [x * radius, y * radius, z * radius]
}
