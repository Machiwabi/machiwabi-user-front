import { Box, BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import Image from 'next/image'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import Link from 'next/link'
import { rewardShowUrl, waitingRewardUrl } from '../../../helpers/url.helper'
import styles from './style.module.scss'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
}

const Component: FC<Props> = ({ waiting, reward, ...props }) => {
  return (
    <Flex direction="column" component="li" justify="center" align="center">
      <Link
        href={waitingRewardUrl(waiting.uniqueKey, reward.uniqueKey)}
        className={styles['o-reward-cell-item']}
        style={{ textDecoration: 'none' }}
      >
        <Box h={120} bg={colorScheme.scheme1.surface2.surface} {...props}>
          <Image
            src={
              reward.iconUrl || '/assets/images/_sample/picture_ranking_01.png'
            } // TODO fallback image
            alt={reward.name}
            width={120}
            height={120}
          />
        </Box>
        <Box mt={12}>
          <Box
            lh={1}
            fz={12}
            fw={700}
            ta="center"
            c={colorScheme.scheme1.surface1.object.high}
          >
            {reward.name}
          </Box>
          <Box
            mt={6}
            lh={1}
            fz={12}
            ff="outfit"
            fw={700}
            ta="center"
            c={colorScheme.scheme1.surface1.object.high}
          >
            {reward.requiredTotalPoint} pt
          </Box>
        </Box>
      </Link>
    </Flex>
  )
}

export { Component as ORewardCellItem }
