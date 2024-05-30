import { AspectRatio, Box, BoxProps, Flex, RingProgress } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { WaitingBoosterEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'

type Props = BoxProps & {
  waitingBooster: WaitingBoosterEntity
  isEnable?: boolean
}

const Component: FC<Props> = ({ waitingBooster, isEnable, ...props }) => {
  const waitingBoostersService = new WaitingBoostersService()

  const leftMs = waitingBoostersService.enableLeftDuration(waitingBooster)
  const leftPersentage =
    100 - waitingBoostersService.enableLeftDurationPersentage(waitingBooster)

  return (
    <Flex
      pos="relative"
      direction="column"
      component="li"
      justify="center"
      align="center"
    >
      <AspectRatio ratio={1} w="100%" h="100%">
        <Flex
          pos="relative"
          w="100%"
          h="100%"
          align="center"
          justify="center"
          bg={colorScheme.scheme1.surface2.surface}
        >
          <Image
            src={
              waitingBooster.booster.iconUrl ||
              '/assets/images/picture/picture_fallback.png'
            }
            alt={waitingBooster.booster.name}
            fill={true}
          />
          <Box
            pos="absolute"
            w="100%"
            h="100%"
            top={0}
            left={0}
            bg="rgba(0,0,0,0.4)"
          >
            <RingProgress
              size={60}
              thickness={6}
              sections={[
                {
                  value: leftPersentage,
                  color: colorScheme.scheme1.accent1.surface,
                },
              ]}
            />
          </Box>
        </Flex>
      </AspectRatio>
      <Box mt={8}>
        <Box lh={1} fz={10} ta="center">
          あと
        </Box>
        <Box mt={2} lh={1} fz={10} ta="center">
          {dateConverter.msToMMDDSS(leftMs)}
        </Box>
      </Box>
    </Flex>
  )
}

export { Component as OBoosterCellItem }
