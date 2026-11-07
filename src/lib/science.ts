export function quadratic(x: number, a: number, b: number, c: number) {
  return a * x * x + b * x + c
}
export function wave(
  x: number,
  time: number,
  amplitude: number,
  frequency: number,
  wavelength: number,
) {
  return amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * time))
}
export function resultant(first: number, second: number, angleDegrees: number) {
  const angle = (angleDegrees * Math.PI) / 180
  const x = first + second * Math.cos(angle)
  const y = second * Math.sin(angle)
  const magnitude = Math.hypot(x, y)
  // Remove o ruído numérico de sen(π): o vetor nulo não possui direção.
  if (magnitude < 1e-10) return { x: 0, y: 0, magnitude: 0, angle: null }
  return { x, y, magnitude, angle: (Math.atan2(y, x) * 180) / Math.PI }
}
