import { Flex, ScrollArea } from '@mantine/core'
import { FC } from 'react'
import { OUserIcon } from '../OUserIcon'
import { WaitingEntity } from '../../../generated/graphql'

type Props = {
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ waitings }) => {
  return (
    <>
      <ScrollArea scrollbarSize={0}>
        <Flex gap={4}>
          {waitings.map((waiting, index) => {
            return (
              <OUserIcon
                displayName="a"
                w={32}
                h={32}
                iconImageUrl={
                  waiting.user.iconImageUrl ||
                  '/assets/images/picture/picture_user-profile-fallback.png'
                } // TODO fallback image
              />
            )
          })}
        </Flex>
      </ScrollArea>
    </>
  )
}

export { Component as OWaitingUserIcons }
