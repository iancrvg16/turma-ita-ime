import test from 'node:test'
import assert from 'node:assert/strict'
import { quadratic, wave, resultant } from '../src/lib/science.ts'

test('A função quadrática preserva raízes, interseção e casos degenerados', () => {
  assert.equal(quadratic(2, 0.5, 0, -2), 0)
  assert.equal(quadratic(-2, 0.5, 0, -2), 0)
  assert.equal(quadratic(0, 0.5, 3, -2), -2)
  assert.equal(quadratic(2, 0, 3, 4), 10)
  assert.equal(quadratic(100, 0, 0, -3), -3)
})
test('A onda tem amplitude, comprimento e período coerentes', () => {
  assert.ok(Math.abs(wave(0.75, 0, 0.6, 0.5, 3) - 0.6) < 1e-10)
  assert.ok(Math.abs(wave(0, 0, 0.6, 0.5, 3)) < 1e-10)
  assert.ok(Math.abs(wave(3, 0, 0.6, 0.5, 3)) < 1e-10)
  assert.ok(Math.abs(wave(0.75, 2, 0.6, 0.5, 3) - 0.6) < 1e-10)
  assert.ok(Math.abs(wave(1.5, 0.5, 0.6, 0.5, 3) - 0.6) < 1e-10)
})
test('A soma vetorial corresponde aos casos paralelo, perpendicular e oposto', () => {
  assert.equal(resultant(4, 3, 0).magnitude, 7)
  assert.equal(resultant(4, 3, 90).magnitude, 5)
  assert.ok(Math.abs(resultant(4, 3, 180).magnitude - 1) < 1e-10)
  assert.ok(Math.abs(resultant(4, 5, 180).angle - 180) < 1e-10)
  const example = resultant(4, 3, 60)
  assert.ok(Math.abs(example.x - 5.5) < 1e-10)
  assert.ok(Math.abs(example.y - (3 * Math.sqrt(3)) / 2) < 1e-10)
  assert.deepEqual(resultant(4, 4, 180), { x: 0, y: 0, magnitude: 0, angle: null })
})
