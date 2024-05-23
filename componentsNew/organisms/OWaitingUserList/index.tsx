import { SimpleGrid } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { OWaitingUserListItem } from '../OWaitingUserListItem'

type Props = {
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ waitings }) => {
  return (
    <>
      <SimpleGrid px={16} spacing={16}>
        {waitings.map((waiting, index) => {
          return (
            <OWaitingUserListItem
              key={waiting.uniqueKey}
              waiting={waiting}
              rank={index + 1}
            />
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OWaitingUserList }
