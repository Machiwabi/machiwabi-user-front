import { AspectRatio, Box, BoxProps, Flex, Progress } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { RewardEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../elements/EButton'
import { EHeading } from '../../elements/EHeading/base'
import { EText } from '../../elements/EText/base'

type Props = BoxProps & {
  reward: RewardEntity
}

const Component: FC<Props> = ({ reward, ...props }) => {
  return (
    <>
      <Box px={16} {...props}>
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
                reward.iconUrl ||
                '/assets/images/_sample/picture_ranking_01.png'
              } // TODO fallback image
              alt={reward.name}
              fill={true}
            />
          </Flex>
        </AspectRatio>
      </Box>
      <Box my={24} px={16}>
        <EHeading.Page ta="center">{reward.name}</EHeading.Page>
        <Box mt={2} ta="center" ff="outfit" fw={700} fz={18}>
          {reward.requiredTotalPoint?.toLocaleString()} PT
        </Box>
        <EText.Desc1 mt={8}>{reward.description}</EText.Desc1>
        <EText.Desc1 mt={8} ta="center">
          2024-01-01 12:23 に引換　他4回
        </EText.Desc1>
      </Box>

      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm type="filled">利用する</EButton.Sm>
        <Box mt={8} fz={12} fw={500} ff="outfit">
          あと4回
        </Box>
      </Flex>
    </>
  )
}

export { Component as TAquiredRewardShowTemplate }
