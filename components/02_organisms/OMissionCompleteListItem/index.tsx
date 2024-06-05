import { Box, Flex, FlexProps } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { WaitingBoosterEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'

type Props = FlexProps & {
  waitingBooster: WaitingBoosterEntity
}

const Component: FC<Props> = ({ waitingBooster, ...props }) => {
  return (
    <>
      <Flex align="center" mb={6} {...props}>
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
          <Box fz={10} c={colorScheme.scheme1.surface1.object.low}>
            {dateConverter.yyyyMMddHHmmss(waitingBooster.startAt)}
          </Box>
        </Box>
        <Box>
          <Box ml={8} ff="outfit" fw={700} fz={12} lh={1}>
            +{waitingBooster.multiplier - 1}pt
          </Box>
          <Flex align="center">
            <Box ff="outfit" fw={700} fz={10} lh={1}>
              / 10sec
            </Box>{' '}
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export { Component as OMissionCompleteListItem }
