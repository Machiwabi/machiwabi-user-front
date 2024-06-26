import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'
import { ORewardRedeemButton } from '../../02_organisms/ORewardRedeemButton'
import { useWaitingRewards } from '../../../hooks/resources/useWaitingRewards'

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
                reward.iconUrl || '/assets/images/picture/picture_fallback.png'
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
          {reward.requiredTotalPoint?.toLocaleString()} pt
        </Box>
        <EText.Desc1 mt={8}>{reward.description}</EText.Desc1>
        {/* <Box mt={16}>
          <Progress
            h={3}
            value={50}
            color={colorScheme.scheme1.surface1.object.high}
          />
          <Flex justify="space-between" mt={6}>
            <Box fz={12} ff="outfit" fw={700}>
              {waiting.totalPoint.toLocaleString()} PT
            </Box>
            <Box ta="right">
              <Box fz={10}>現在のRateから32日後に達成見込みです</Box>
              <Box mt={1} fz={10} style={{ textDecoration: 'underline' }}>
                ポイント予測を見る
              </Box>
            </Box>
          </Flex>
        </Box> */}
      </Box>

      <ORewardRedeemButton waiting={waiting} reward={reward} />
    </>
  )
}

export { Component as TRewardShowTemplate }
