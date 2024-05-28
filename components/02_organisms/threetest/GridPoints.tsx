import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

interface GridPointsProps {
  spacing: number // 点の間隔
  size: number // 点のサイズ
  count: number // 一辺の点の数
  opacity: number // 点の透明度
}

const GridPoints: React.FC<GridPointsProps> = ({
  spacing,
  size,
  count,
  opacity,
}) => {
  const points = useMemo(() => {
    const points = []
    for (let x = -count / 2; x < count / 2; x++) {
      for (let y = -count / 2; y < count / 2; y++) {
        for (let z = 0; z > count / -2; z--) {
          points.push(new THREE.Vector3(x * spacing, y * spacing, z * spacing))
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.PointsMaterial({
      size,
      color: '#ffffff',
      opacity,
      transparent: true,
    })

    return <points geometry={geometry} material={material} />
  }, [spacing, size, count, opacity])

  return points
}

export { GridPoints }
