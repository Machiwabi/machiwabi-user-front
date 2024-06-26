import { AspectRatio, Box } from '@mantine/core'
import { FC } from 'react'
import { AnimateWaiting } from '../../three/AnimateWaiting'
import { WaitingEntity } from '../../../generated/graphql'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  return (
    <>
      <AspectRatio pos="relative" w="100%" bg="black">
        <Box pos="relative" style={{ zIndex: 2 }}>
          <AnimateWaiting waiting={waiting} />
        </Box>
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0)"
          style={{ zIndex: 1 }}
        />
      </AspectRatio>
    </>
  )
}

export { Component as OWaitingCounter }
