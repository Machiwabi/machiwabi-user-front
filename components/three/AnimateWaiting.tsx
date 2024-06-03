import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { FC } from 'react'
import * as THREE from 'three'
import { WaitingService } from '../../domains/services/waiting.service'
import { WaitingEntity } from '../../generated/graphql'
import { BgCircle } from './threetest/BgCircle'
import { GeoText3d } from './threetest/GeoBox'
import { Timer } from './threetest/Timer'

type Props = {
  waiting: WaitingEntity
}
// AnimateWaitingコンポーネント
const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)
  const waitableSeconds = waitingService.waitableMs() / 1000
  const waitedSeconds = waitingService.waitedMs() / 1000 - 2

  return (
    <>
      <Canvas
        style={{
          width: '378px',
          height: '378px',
        }}
        camera={{ position: [0, 0, 3] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraAnimator />

        {/* 秒針 */}
        <Timer
          maxSeconds={waitableSeconds}
          initialTime={waitedSeconds}
          position={[0, 0, -1]}
          radius={3}
          denominatorSeconds={1}
          borderWidth={0.01}
          color={new THREE.Color(0.88, 0.88, 0.88)}
        />
        {/* ポイント */}
        <BgCircle position={[0, 0, 0.49]} radius={3.9} borderWidth={0.01} />
        <Timer
          maxSeconds={waitableSeconds}
          initialTime={waitedSeconds}
          position={[0, 0, 0.49]}
          radius={3.9}
          denominatorSeconds={10}
          borderWidth={0.01}
          color="white"
        />

        {/* 待ち時間 */}
        <BgCircle
          position={[0, 0, 0.99]}
          radius={5}
          borderWidth={0.025}
          color={new THREE.Color(0.25, 0.25, 0.25)}
        />

        <Timer
          maxSeconds={waitableSeconds}
          position={[0, 0, 0.99]}
          radius={5}
          initialTime={waitedSeconds}
          denominatorSeconds={waitableSeconds}
          borderWidth={0.02}
          color="white"
          isRepeat={false}
        />

        <GeoText3d waiting={waiting} />

        {/* <OrbitControls /> */}
      </Canvas>
    </>
  )
}

export { Component as AnimateWaiting }

// private components -------------------------

// CameraAnimatorコンポーネント
const CameraAnimator = () => {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime()
    const radius = 3
    const height = 0 // マイナスY軸方向にどれだけ下に行くか
    camera.position.set(0, height, radius)
    // カメラが円周上を移動する半径
    camera.position.x = radius * Math.sin(time * -0.4) * 0.2

    camera.position.y = radius * Math.sin(time * -0.4) * 0.1
    // camera.position.z = radius * Math.sin(time * -0.4) * 0.1 + 9.6
    camera.position.z = 8

    camera.lookAt(0, 0, 0) // 常に原点を向く
  })

  return null // このコンポーネントは視覚的な出力を持たない
}