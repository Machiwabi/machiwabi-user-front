import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { BoosterEntity, WaitingBoosterEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { dateHumanizer } from '../../../utils/dateHumanizer'

type Props = BoxProps & {
  waitingBooster: WaitingBoosterEntity
  isEnable?: boolean
}

const Component: FC<Props> = ({ waitingBooster, isEnable, ...props }) => {
  const waitingBoostersService = new WaitingBoostersService()

  const leftSeconds = waitingBoostersService.enableLeftDurations(waitingBooster)

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
            } // TODO fallback image
            alt={waitingBooster.booster.name}
            fill={true}
          />
        </Flex>
      </AspectRatio>
      <Box mt={8}>
        <Box lh={1} fz={10} ta="center">
          あと
        </Box>
        <Box mt={2} lh={1} fz={10} ta="center">
          {/* {datetimeHumanizer} */}
          {Math.round(leftSeconds / 1000).toLocaleString()}秒
          {/* {dateHumanizer.jaFullLength(leftSeconds)} */}
        </Box>
      </Box>
    </Flex>
  )
}

export { Component as OBoosterCellItem }
