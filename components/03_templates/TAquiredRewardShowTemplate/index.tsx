import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'
import { ORewardConsumeButton } from '../../02_organisms/ORewardConsumeButton'
import { ORewardNftWalletUrlButton } from '../../02_organisms/ORewardNftWalletUrlButton'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
}

const Component: FC<Props> = ({ waiting, reward, ...props }) => {
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
                reward.aquiredImageUrl ||
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
      </Box>

      <ORewardConsumeButton reward={reward} waiting={waiting} />

      <Box mt={24}>
        <ORewardNftWalletUrlButton />
      </Box>
    </>
  )
}

export { Component as TAquiredRewardShowTemplate }
