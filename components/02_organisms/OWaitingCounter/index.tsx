import { AspectRatio, Box } from '@mantine/core'
import { FC } from 'react'
import { AnimateWaiting } from '../../../_old-cmp/organisms/AnimateWaiting'
import { WaitingEntity } from '../../../generated/graphql'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  return (
    <>
      <AspectRatio pos="relative" w="100%" bg="black">
        <AnimateWaiting waiting={waiting} />
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0)"
        />
      </AspectRatio>
    </>
  )
}

export { Component as OWaitingCounter }
