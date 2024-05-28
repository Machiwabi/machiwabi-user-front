import React, { useRef } from 'react'
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      circleProgressShaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof THREE.ShaderMaterial
      > & {
        // ここにカスタムシェーダーマテリアルのpropsの型定義を追加します。
        time?: number
        color?: THREE.Color | string | number
      }
    }
  }
}

// カスタムシェーダーマテリアルを定義
const CircleProgressShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0xffffff),
  },
  /*glsl*/ `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  /*glsl*/ `uniform float time;
  uniform vec3 color;
  varying vec2 vUv;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 pos = vUv - center;
    float radius = length(pos);
    float angle = atan(pos.y, pos.x) + time * 6.28318; // 2 * PI = 6.28318
    if (angle < 0.0) angle += 6.28318;
    float progress = mod(time, 60.0) / 60.0;
    if (radius > 0.48 && radius < 0.5 && angle < (2.0 * 3.14159 * progress)) {
      gl_FragColor = vec4(color, 1.0);
    } else {
      discard;
    }
  }`
)

extend({ CircleProgressShaderMaterial })

const AnimatedCircle = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      ;(shaderRef.current as THREE.ShaderMaterial).uniforms.time.value =
        clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <circleProgressShaderMaterial
        ref={shaderRef}
        attach="material"
        color={'#00ff00'}
      />
    </mesh>
  )
}

export { AnimatedCircle }
