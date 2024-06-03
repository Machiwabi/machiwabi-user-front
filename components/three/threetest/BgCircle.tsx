import { shaderMaterial } from '@react-three/drei'
import { ReactThreeFiber, extend, useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  position?: [number, number, number]
  radius?: number
  borderWidth?: number
  color?: THREE.Color | string | number
}

const Component: FC<Props> = ({
  position = [0, 0, 0],
  radius = 6,
  borderWidth = 0.1,
  color = new THREE.Color(0.96, 0.96, 0.96),
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    // console.log(clock.getElapsedTime() % 10)
  })

  return (
    <>
      <mesh position={position}>
        <circleGeometry args={[radius, 64]} />
        <bgCircleMaterial
          ref={materialRef}
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          borderWidth={borderWidth}
        />
      </mesh>
    </>
  )
}

export { Component as BgCircle }

// private components -------------------------

// TODOこれはどこかに移動する
declare global {
  namespace JSX {
    interface IntrinsicElements {
      bgCircleMaterial: ReactThreeFiber.Node<
        THREE.ShaderMaterial,
        typeof THREE.ShaderMaterial
      > & {
        color?: THREE.Color | string | number
        borderWidth?: number
      }
    }
  }
}

const BgCircleMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.1, 0.0, 0.1),
    borderWidth: 0.1,
  },
  // vertex shader
  /*glsl*/ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  // fragment shader
  /*glsl*/ `

uniform vec3 color;
uniform float borderWidth;
varying vec2 vUv;

void main() {
  const float PI = 3.141592653589793;
  vec2 center = vec2(0.5, 0.5);
  vec2 pos = vUv - center;
  float radius = length(pos);
  // atan2を使って角度を計算し、真上を起点にするためにPI/2を引く
  float angle = atan(pos.y, pos.x) - PI / 2.0;
  // 負の角度を正の角度に変換
  if (angle < 0.0) angle += 2.0 * PI;
  // 時間に応じた進行度を角度で計算
  float progress = 1.0 * 2.0 * PI;

  // 角度と進行度に基づいてピクセルを描画
  if (radius > 0.5 - borderWidth && radius < 0.5 && angle <= progress) {
    gl_FragColor = vec4(color, 1.0);
  } else {
    discard; // 描画範囲外のピクセルは描画しない
  }
}
`
)

extend({ BgCircleMaterial })
