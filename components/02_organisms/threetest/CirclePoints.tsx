import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

interface CirclePointsProps {
  radius: number // 円の半径
  size: number // 点のサイズ
  count: number // 点の総数
}

const CirclePoints: React.FC<CirclePointsProps> = ({ radius, size, count }) => {
  const points = useMemo(() => {
    const points = []
    const angleStep = (Math.PI * 2) / count

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep
      const x = radius * Math.cos(angle)
      const z = radius * Math.sin(angle)
      points.push(new THREE.Vector3(x, 0, z))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.PointsMaterial({ size, color: 'black' })

    return <points geometry={geometry} material={material} />
  }, [radius, size, count])

  return points
}

export { CirclePoints }
