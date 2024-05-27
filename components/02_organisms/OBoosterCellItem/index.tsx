import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  booster: BoosterEntity
  isEnable?: boolean
}

const Component: FC<Props> = ({ booster, isEnable, ...props }) => {
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
              booster.iconUrl || '/assets/images/_sample/picture_ranking_01.png'
            } // TODO fallback image
            alt={booster.name}
            fill={true}
          />
        </Flex>
      </AspectRatio>
      <Box mt={8}>
        <Box lh={1} fz={10} ta="center">
          ツイート
        </Box>
        <Box mt={2} lh={1} fz={10} ta="center">
          あと240秒
        </Box>
      </Box>
    </Flex>
  )
}

export { Component as OBoosterCellItem }
