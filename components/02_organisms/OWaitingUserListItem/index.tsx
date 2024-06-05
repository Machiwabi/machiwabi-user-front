import { Box, Flex, Popover, Text } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { OUserIconWithStatuses } from '../OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'
import styles from './style.module.scss'
import { OMissionCompleteList } from '../OMissionCompleteList'

type Props = {
  waiting: WaitingEntity
  rank?: number
}

const Component: FC<Props> = ({ waiting, rank }) => {
  return (
    <Box pos="relative">
      <Popover>
        <Popover.Target>
          <Flex
            align="center"
            style={{ cursor: 'pointer' }}
            className={styles['o-waiting-user-list-item']}
          >
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
              <OUserWaitingStatuses waiting={waiting} />
            </Flex>
          </Flex>
        </Popover.Target>
        <Popover.Dropdown
          w="100%"
          maw={applicationProperties.CONTENT_MAX_WIDTH - 32}
        >
          <OMissionCompleteList waitingBoosters={waiting.waitingBoosters} />
        </Popover.Dropdown>
      </Popover>
    </Box>
  )
}

export { Component as OWaitingUserListItem }
