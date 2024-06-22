import { Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { waitingRewardUrl } from '../../../helpers/url.helper'
import { colorScheme } from '../../../theme/colorScheme'
import styles from './style.module.scss'
import { dateConverter } from '../../../utils/dateConverter'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
  isNowGranted?: boolean
}

const Component: FC<Props> = ({ waiting, reward, isNowGranted, ...props }) => {
  return (
    <Flex direction="column" component="li" justify="center" align="center">
      <Link
        href={waitingRewardUrl(waiting.uniqueKey, reward.uniqueKey)}
        className={styles['o-reward-cell-item']}
        style={{ textDecoration: 'none' }}
      >
        <Flex justify="center" h={120} {...props}>
          <Image
            src={
              reward.iconUrl || '/assets/images/picture/picture_fallback.png'
            }
            alt={reward.name}
            width={120}
            height={120}
          />
        </Flex>
        <Box mt={12}>
          <Box
            lh={1.45}
            fz={14}
            fw={600}
            ta="center"
            c={colorScheme.scheme1.surface1.object.high}
          >
            {reward.name}
          </Box>
          <Box
            mt={6}
            lh={1}
            fz={14}
            ff="outfit"
            fw={700}
            ta="center"
            c={colorScheme.scheme1.surface1.object.high}
          >
            {reward.requiredTotalPoint?.toLocaleString()}
            pt
          </Box>
          <Box
            mt={9}
            lh={1}
            fz={10}
            ff="outfit"
            fw={400}
            ta="center"
            c={colorScheme.scheme1.surface1.object.low}
          >
            {new Date(reward.startAt) > new Date() &&
              `${dateConverter.yyyyMMddHHmmss(reward.startAt)}から交換可能`}
          </Box>
        </Box>
      </Link>
    </Flex>
  )
}

export { Component as ORewardCellItem }
