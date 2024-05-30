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
      <Text
        color="black"
        fontWeight={'bold'}
        fontSize={0.5}
        position={[0, 1.3, 1]} // 位置を調整
        anchorX="center"
        anchorY="middle"
      >
        {waiting.event?.name}
      </Text>

      <CounterTime waiting={waiting} />

      {/* <CounterText fontSize={0.8} position={[0, 0, 0]} color="black" /> */}
      {/* <TotalPoint waiting={waiting} /> */}

      <Text
        color="black"
        fontSize={0.35}
        position={[0, -1.1, 1]} // 位置を調整
        anchorX="center"
        anchorY="middle"
      >
        {dateConverter.yyyyMMddHHmmss(waiting.event.startAt)}
      </Text>
      <Text
        color="black"
        fontSize={0.35}
        position={[0, -1.6, 1]} // 位置を調整
        anchorX="center"
        anchorY="middle"
      >
        {waiting.event.placeName}
      </Text>
    </>
  )
}

export { Component as GeoText3d }

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
      <Text
        color="black"
        fontSize={1}
        fontWeight="bold"
        position={[0, 0.1, 1.5]} // 位置を調整
        anchorX="center"
        anchorY="middle"
      >
        {dateConverter.msToMMDDSS(delta)}
      </Text>
    </>
  )
}
