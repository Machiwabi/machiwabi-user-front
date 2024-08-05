import { shaderMaterial } from '@react-three/drei'
import { ReactThreeFiber, extend, useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  maxSeconds: number
  position?: [number, number, number]
  radius?: number
  denominatorSeconds?: number
  initialTime?: number
  borderWidth?: number
  color?: THREE.Color | string | number
  isRepeat?: boolean
}

const Component: FC<Props> = ({
  maxSeconds,
  position = [0, 0, 0],
  radius = 6,
  denominatorSeconds = 60.0,
  initialTime = 0,
  borderWidth = 0.1,
  color = new THREE.Color(0.6, 0.6, 0.6),
  isRepeat = true,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const elapsedTime = clock.getElapsedTime()
      let currentTime = (initialTime + elapsedTime) % denominatorSeconds

      if (!isRepeat && currentTime > maxSeconds) {
        currentTime = maxSeconds - 0.01
      }

      ;(materialRef.current as THREE.ShaderMaterial).uniforms.time.value =
        currentTime
    }
  })

  return (
    <>
      <mesh position={position}>
        <circleGeometry args={[radius, 64]} />
        <colorShiftMaterial
          ref={materialRef}
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          denominatorSeconds={denominatorSeconds}
          borderWidth={borderWidth}
        />
      </mesh>
    </>
  )
}

export { Component as Timer }

// private components -------------------------

// TODOこれはどこかに移動する
declare global {
  namespace JSX {
    interface IntrinsicElements {
      colorShiftMaterial: ReactThreeFiber.Node<
        THREE.ShaderMaterial,
        typeof THREE.ShaderMaterial
      > & {
        color?: THREE.Color | string | number
        time?: number
        denominatorSeconds?: number
        borderWidth?: number
      }
    }
  }
}

const ColorShiftMaterial = shaderMaterial(
  {
    time: 1,
    color: new THREE.Color(0.2, 0.0, 0.1),
    denominatorSeconds: 60.0,
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
uniform float time;
uniform vec3 color;
uniform float denominatorSeconds;
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
  float progress = mod(time / denominatorSeconds, 1.0) * 2.0 * PI;

  // 角度と進行度に基づいてピクセルを描画
  if (radius > 0.5 - borderWidth && radius < 0.5 && angle <= progress) {
    gl_FragColor = vec4(color, 1.0);
  } else {
    discard; // 描画範囲外のピクセルは描画しない
  }
}
`
)

extend({ ColorShiftMaterial })
