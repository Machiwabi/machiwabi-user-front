import { Box, Flex, ScrollArea } from '@mantine/core'
import { FC } from 'react'
import { OUserIcon } from '../OUserIcon'
import { WaitingEntity } from '../../../generated/graphql'
import { OCountBaloonAnimation } from '../OCountBaloonAnimation'
import { WaitingService } from '../../../domains/services/waiting.service'

type Props = {
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ waitings }) => {
  return (
    <>
      <ScrollArea mt={-30} scrollbarSize={0} style={{ overflowY: 'visible' }}>
        <Flex gap={4} pt={30}>
          {waitings.map((waiting, index) => {
            const waitingService = new WaitingService(waiting)
            return (
              <Box pos="relative" key={waiting.uniqueKey}>
                <Box pos="absolute" top={0} left={0} style={{ zIndex: 100 }}>
                  <OCountBaloonAnimation
                    addableTotalPoint={waitingService.earnableTotalPoint()}
                    isBoosting={waitingService.isBoosting()}
                  />
                </Box>
                <OUserIcon
                  displayName="a"
                  w={32}
                  h={32}
                  iconImageUrl={
                    waiting.user.iconImageUrl ||
                    '/assets/images/picture/picture_user-profile-fallback.png'
                  } // TODO fallback image
                  isBoosting={waitingService.isBoosting()}
                />
              </Box>
            )
          })}
        </Flex>
      </ScrollArea>
    </>
  )
}

export { Component as OWaitingUserIcons }
