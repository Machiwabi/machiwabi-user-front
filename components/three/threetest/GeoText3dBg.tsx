import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FC, useState } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { dateConverter } from '../../../utils/dateConverter'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  return (
    <>
      <group position={[0, -3, 3]}>
        <TextBackground
          position={[0, 0, 0]}
          width={4}
          height={0.4}
          color="black"
        />
        <Text
          color="white"
          fontWeight={'bold'}
          fontSize={0.3}
          position={[0, 0, 0.01]}
          anchorX="center"
          anchorY="middle"
        >
          {waiting.event?.name}
        </Text>
      </group>

      <CounterTime waiting={waiting} />

      <group position={[0, -3.5, 3]}>
        <TextBackground
          position={[0, 0, 0]} // 位置を調整
          width={3}
          height={0.4}
          color="black"
        />
        <Text
          color="white"
          fontSize={0.28}
          position={[0, 0, 0.01]} // 位置を調整
          anchorX="center"
          anchorY="middle"
        >
          {dateConverter.yyyyMMddHHmmss(waiting.event.startAt)}
        </Text>
      </group>
    </>
  )
}

export { Component as GeoText3dBg }

const CounterTime: FC<{
  waiting: WaitingEntity
}> = ({ waiting }) => {
  const [delta, setDelta] = useState(0)
  const waitingService = new WaitingService(waiting)

  useFrame(() => {
    const time = waitingService.remainingMs()
    setDelta(time)
  })

  return (
    <>
      <group position={[0, -2.2, 3]}>
        <TextBackground
          position={[0, 0, 0]} // 位置を調整
          width={8}
          height={1}
          color="black"
        />
        <Text
          color="white"
          fontSize={0.8}
          fontWeight="bold"
          position={[0, 0, 0.01]} // 位置を調整
          anchorX="center"
          anchorY="middle"
        >
          {dateConverter.msToMMDDSS(delta)}
        </Text>
      </group>
    </>
  )
}

const TextBackground: FC<{
  position: [number, number, number]
  width: number
  height: number
  color: string
}> = ({ position, width, height, color }) => {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
