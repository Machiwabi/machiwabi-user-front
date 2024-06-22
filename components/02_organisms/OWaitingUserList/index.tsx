import { SimpleGrid } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { OWaitingUserListItem } from '../OWaitingUserListItem'

type Props = {
  waitings: WaitingEntity[]
  animationEnabled?: boolean
}

const Component: FC<Props> = ({ waitings, animationEnabled = true }) => {
  return (
    <>
      <SimpleGrid px={16} spacing={16}>
        {waitings.map((waiting, index) => {
          return (
            <OWaitingUserListItem
              key={waiting.uniqueKey}
              waiting={waiting}
              rank={index + 1}
              animationEnabled={animationEnabled}
            />
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OWaitingUserList }
