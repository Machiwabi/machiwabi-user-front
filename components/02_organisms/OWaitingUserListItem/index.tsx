import { Box, Flex, Popover, Text } from '@mantine/core'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { EText } from '../../01_elements/EText/base'
import { OUserIconWithStatuses } from '../OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'

type Props = {
  waiting: WaitingEntity
  rank?: number
  rollSpeed?: number
}

const Component: FC<Props> = ({ waiting, rank, rollSpeed }) => {
  return (
    <Box pos="relative">
      <Popover>
        <Popover.Target>
          <Flex align="center" style={{ cursor: 'pointer' }}>
            {rank && (
              <Flex
                w={24}
                h={24}
                mr={24}
                fz={14}
                fw={900}
                ff="outfit"
                bg={
                  rank < 4
                    ? colorScheme.scheme1.surface3.surface
                    : colorScheme.scheme1.surface1.surface
                }
                c={
                  rank < 4
                    ? colorScheme.scheme1.surface3.object.high
                    : colorScheme.scheme1.surface1.object.high
                }
                justify="center"
                align="center"
                style={{ borderRadius: 12 }}
              >
                {rank}
              </Flex>
            )}
            <Flex flex={1} justify="space-between" align="center">
              <OUserIconWithStatuses waiting={waiting} />
              <OUserWaitingStatuses waiting={waiting} rollSpeed={rollSpeed} />
            </Flex>
          </Flex>
        </Popover.Target>
        <Popover.Dropdown
          w="100%"
          maw={applicationProperties.CONTENT_MAX_WIDTH - 32}
        >
          <Text mb={4} fz={14} fw={700}>
            {waiting.user.displayName}
          </Text>
          <EText.Desc2>
            （準備中：推しに対する応援メッセージを追加できる機能を予定しています）
          </EText.Desc2>
          {/* 下記はちょっといやらしいという意見があり一旦排除 */}
          {/* <OMissionCompleteList waitingBoosters={waiting.waitingBoosters} /> */}
        </Popover.Dropdown>
      </Popover>
    </Box>
  )
}

export { Component as OWaitingUserListItem }
