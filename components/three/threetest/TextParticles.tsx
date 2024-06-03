import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Texture,
} from 'three'

interface TextParticleProps {
  count: number
  fontSize: number
  fontFace: string
}

const createTextTexture = (
  text: string,
  fontSize: number,
  fontFace: string
): Texture => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Cannot get canvas context')

  context.font = `${fontSize}px ${fontFace}`
  const textWidth = context.measureText(text).width
  canvas.width = textWidth
  canvas.height = fontSize * 2 // Ensure there is space for the font

  context.font = `${fontSize}px ${fontFace}`
  context.fillStyle = 'rgba(255, 255, 255, 1.0)'
  context.fillText(text, 0, fontSize)

  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true

  return texture
}

const TextParticles: React.FC<TextParticleProps> = ({
  count,
  fontSize,
  fontFace,
}) => {
  const particlesRef = useRef<THREE.Points>(null)

  const [pointsGeometry, materials] = useMemo(() => {
    const pointsGeometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = Math.random() * 3 - 1 // Random positions from -1 to 1
    }

    pointsGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    )

    const materials = new Array(count).fill(null).map(() => {
      const text = `+${Math.floor(Math.random() * 100)}` // Random points value
      const texture = createTextTexture(text, fontSize, fontFace)
      return new PointsMaterial({ map: texture, transparent: true, size: 0.5 })
    })

    return [pointsGeometry, materials]
  }, [count, fontSize, fontFace])

  useFrame(({ clock }) => {
    // Update particle properties if needed
    if (particlesRef.current) {
      particlesRef.current.position.y = clock.getElapsedTime() * 0.4
      particlesRef.current.position.z = clock.getElapsedTime() * 0.4
      // particlesRef.current.position.z = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group>
      {materials.map((material, i) => (
        <points
          key={i}
          geometry={pointsGeometry}
          material={material}
          ref={particlesRef}
        />
      ))}
    </group>
  )
}

export { TextParticles }
