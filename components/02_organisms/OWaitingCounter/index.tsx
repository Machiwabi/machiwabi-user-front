import { AspectRatio } from '@mantine/core'
import { FC } from 'react'
import { AnimateWaiting } from '../../../_old-cmp/organisms/AnimateWaiting'
import { WaitingEntity } from '../../../generated/graphql'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  return (
    <>
      <AspectRatio w="100%" bg="black">
        <AnimateWaiting waiting={waiting} />
      </AspectRatio>
    </>
  )
}

export { Component as OWaitingCounter }
