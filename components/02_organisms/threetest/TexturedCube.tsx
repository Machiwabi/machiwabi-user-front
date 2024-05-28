import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

const Component: React.FC = () => {
  const meshRef = useRef<Mesh>(null)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = 256
    canvas.height = 128
    ctx.fillStyle = '#ffffff' // 白背景
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '64px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('1 WABI', 12, 64) // 中央にテキストを描画
    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Adjust these values to control the speed of the movement
      const speedY = 0.2
      const speedX = 0.1
      const speedZ = 0.5

      // Move the mesh upwards and sideways
      meshRef.current.position.y += speedY * delta
      meshRef.current.position.x +=
        speedX * delta * Math.sin(state.clock.elapsedTime)
      meshRef.current.position.z += speedZ * delta
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1, 0.1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export { Component as TexturedCube }
