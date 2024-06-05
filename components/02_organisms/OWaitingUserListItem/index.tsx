import { Box, Flex, Popover, Text } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { OUserIconWithStatuses } from '../OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'
import { EText } from '../../01_elements/EText/base'
import { applicationProperties } from '../../../constants/applicationProperties'
import { EHeading } from '../../01_elements/EHeading/base'
import { dateConverter } from '../../../utils/dateConverter'
import Image from 'next/image'

type Props = {
  waiting: WaitingEntity
  rank?: number
}

const Component: FC<Props> = ({ waiting, rank }) => {
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
              <OUserWaitingStatuses waiting={waiting} />
            </Flex>
          </Flex>
        </Popover.Target>
        <Popover.Dropdown
          w="100%"
          maw={applicationProperties.CONTENT_MAX_WIDTH}
        >
          <Text fz={14} fw={700}>
            達成ミッション
          </Text>
          {waiting.waitingBoosters.length === 0 ? (
            <></>
          ) : (
            <>
              <Box mt={8}>
                {waiting.waitingBoosters.map((waitingBooster) => {
                  return (
                    <Flex align="center" mb={6}>
                      <Box
                        pos="relative"
                        w={32}
                        h={32}
                        style={{ borderRadius: 32, overflow: 'hidden' }}
                      >
                        <Image
                          src={
                            waitingBooster.booster.iconUrl ||
                            '/assets/images/picture/picture_fallback.png'
                          }
                          alt={waitingBooster.booster.name}
                          fill={true}
                        />
                      </Box>
                      <Box ml={8} style={{ flexGrow: 1 }}>
                        <Box fz={12}>{waitingBooster.booster.missionName}</Box>
                        <Box
                          fz={10}
                          c={colorScheme.scheme1.surface1.object.low}
                        >
                          {dateConverter.yyyyMMddHHmmss(waitingBooster.startAt)}
                        </Box>
                      </Box>
                      <Box>
                        <Box ml={8} ff="outfit" fw={700} fz={14}>
                          +{waitingBooster.multiplier - 1}pt{' '}
                        </Box>
                      </Box>
                    </Flex>
                  )
                })}
              </Box>
            </>
          )}
        </Popover.Dropdown>
      </Popover>
    </Box>
  )
}

export { Component as OWaitingUserListItem }
