import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FC, useEffect, useState } from 'react'
import * as THREE from 'three'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { BgCircle } from './BgCircle'
import { GeoText3dBg } from './GeoText3dBg'
import { Timer } from './Timer'

type Props = {
  waiting: WaitingEntity
}
// AnimateWaitingコンポーネント
const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)
  const waitableSeconds = waitingService.waitableMs() / 1000
  const waitedSeconds = waitingService.waitedMs() / 1000 - 2

  const waitingCounterWaitableSeconds =
    waitingService.waitingCounterWaitableMs() / 1000
  const waitingCounterWaitedSeconds =
    waitingService.waitingCounterWaitedMs() / 1000

  const bgImageUrl = waitingService.waitingCounterBgImageUrl()

  const [windowSize, setWindowSize] = useState({
    width: calcaulateCanvasSize().width,
    height: calcaulateCanvasSize().height,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: calcaulateCanvasSize().width,
        height: calcaulateCanvasSize().height,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Canvas
        style={{
          width: windowSize.width,
          height: windowSize.width,
        }}
        camera={{ position: [0, 0, 3] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraAnimator />

        {/* 秒針 */}
        <group>
          <Timer
            maxSeconds={waitableSeconds}
            initialTime={waitedSeconds}
            position={[0, 0, 0.7]}
            radius={2.8}
            denominatorSeconds={1}
            borderWidth={0.006}
            color={new THREE.Color(0.88, 0.88, 0.88)}
          />
        </group>
        <group>
          {/* ポイント */}
          <BgCircle
            position={[0, 0, 1]}
            radius={3.9}
            borderWidth={0.005}
            color={new THREE.Color(0.25, 0.25, 0.25)}
          />
          <Timer
            maxSeconds={waitableSeconds}
            initialTime={waitedSeconds}
            position={[0, 0, 1]}
            radius={3.9}
            denominatorSeconds={10}
            borderWidth={0.005}
            color={new THREE.Color(0.88, 0.88, 0.88)}
          />
        </group>

        {/* 待ち時間 */}
        <group>
          <BgCircle
            position={[0, 0, 0.99]}
            radius={7}
            borderWidth={0.005}
            color={new THREE.Color(0.25, 0.25, 0.25)}
          />

          <Timer
            maxSeconds={waitableSeconds}
            position={[0, 0, 1]}
            radius={7}
            initialTime={waitedSeconds}
            denominatorSeconds={waitableSeconds}
            borderWidth={0.005}
            color={new THREE.Color(5 / 255, 255 / 255, 135 / 255)}
            isRepeat={false}
          />
        </group>

        <GeoText3dBg waiting={waiting} />

        {bgImageUrl && (
          <CircularImageMesh position={[0, 0, 0.6]} url={bgImageUrl} />
        )}

        {/* 残り表示時間 */}
        <group>
          {/* <BgCircle
            position={[0, 0, 0.61]}
            radius={5.9}
            borderWidth={0.005}
            color={new THREE.Color(0.25, 0.25, 0.25)}
          /> */}

          <Timer
            maxSeconds={waitingCounterWaitableSeconds}
            position={[0, 0, 0.61]}
            radius={5.98}
            initialTime={waitingCounterWaitedSeconds}
            denominatorSeconds={waitingCounterWaitableSeconds}
            borderWidth={0.012}
            color={new THREE.Color(246 / 255, 46 / 255, 46 / 255)}
            isRepeat={false}
          />
        </group>

        {/* <OrbitControls /> */}
      </Canvas>
    </>
  )
}

export { Component as WaitingCounterWithBg }

// private components -------------------------

// CameraAnimatorコンポーネント
const CameraAnimator = () => {
  const [directionX, setDirectionX] = useState(1)
  const [directionY, setDirectionY] = useState(1)
  const [directionZ, setDirectionZ] = useState(1)

  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime()
    const radius = 3

    // カメラが円周上を移動する半径
    let newX = radius * Math.sin(time * -0.4 + 2) * 0.2 * directionX
    let newY = radius * Math.sin(time * -0.4 + 3) * 0.1 * directionY
    let newZ = radius * Math.sin(time * -0.8 + 1) * 0.1 * directionZ + 9

    // 閾値チェックとランダム変更
    if (Math.abs(newX) > 1.5) {
      setDirectionX(directionX * -1)
      newX = radius * Math.sin(time * -0.4) * 0.3 * directionX
    }

    if (Math.abs(newY) > 1.0) {
      setDirectionY(directionY * -1)
      newY = radius * Math.sin(time * -0.4) * 0.2 * directionY
    }

    if (newZ > 10 || newZ < 6) {
      setDirectionZ(directionZ * -1)
      newZ = radius * Math.sin(time * -0.1 + 1) * 0.2 * directionZ + 8.3
    }

    camera.position.set(newX, newY, newZ)
    camera.lookAt(0, 0, 0) // 常に原点を向く
  })

  return null // このコンポーネントは視覚的な出力を持たない
}

const calcaulateCanvasSize = () => {
  if (window.innerWidth > 378 + 16 * 2) {
    const width = 378
    const height = 378
    return { width, height }
  } else {
    const width = window.innerWidth - 32
    const height = width
    return { width, height }
  }
}

// CircularImageMeshコンポーネント
const CircularImageMesh: FC<{
  position: [number, number, number]
  url: string
}> = ({ position, url }) => {
  const texture = useLoader(THREE.TextureLoader, url)

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_texture: { value: texture },
    },
    vertexShader: `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D u_texture;
      varying vec2 v_uv;
      void main() {
        vec2 uv = v_uv - vec2(0.5);
        float radius = 0.5;
        float dist = length(uv);
        if (dist < radius) {
          gl_FragColor = texture2D(u_texture, v_uv);
        } else {
          discard;
        }
      }
    `,
    transparent: true,
  })

  return (
    <mesh position={position}>
      <planeGeometry args={[12, 12]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  )
}
