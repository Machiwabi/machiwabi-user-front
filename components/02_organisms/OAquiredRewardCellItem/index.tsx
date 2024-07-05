import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { waitingAquiredRewardUrl } from '../../../helpers/url.helper'
import { colorScheme } from '../../../theme/colorScheme'
import styles from './style.module.scss'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
  isAquired?: boolean
  count?: number
}

const Component: FC<Props> = ({
  waiting,
  reward,
  isAquired,
  count,
  ...props
}) => {
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
          w="100%"
          h="100%"
          align="center"
          justify="center"
          bg={colorScheme.scheme1.surface2.surface}
        >
          {!isAquired && (
            <Box
              ff="outfit"
              fz={24}
              c={colorScheme.scheme1.surface2.object.inactive}
            >
              ?
            </Box>
          )}
        </Flex>
      </AspectRatio>
      {isAquired && (
        <Box pos="absolute">
          <Link
            href={waitingAquiredRewardUrl(waiting.uniqueKey, reward.uniqueKey)}
            className={styles['o-reward-cell-item']}
            style={{ textDecoration: 'none' }}
          >
            <Box
              pos="relative"
              h={104}
              bg={colorScheme.scheme1.surface2.surface}
              {...props}
            >
              <Image
                src={
                  reward.iconUrl ||
                  '/assets/images/_sample/picture_ranking_01.png'
                } // TODO fallback image
                alt={reward.name}
                width={104}
                height={104}
              />
              {count && count > 1 && (
                <Flex
                  pos="absolute"
                  w={24}
                  h={24}
                  top={-12}
                  right={-12}
                  fz={12}
                  fw={700}
                  align="center"
                  justify="center"
                  bg={colorScheme.scheme1.surface3.surface}
                  c={colorScheme.scheme1.surface3.object.high}
                  style={{ borderRadius: 16 }}
                >
                  {count}
                </Flex>
              )}
            </Box>
          </Link>
        </Box>
      )}
    </Flex>
  )
}

export { Component as OAquiredRewardCellItem }
