import { AspectRatio, Box, BoxProps, Flex, RingProgress } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { WaitingBoosterEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { motion } from 'framer-motion'

type Props = BoxProps & {
  waitingBooster: WaitingBoosterEntity
  isNowGranted?: boolean
}

const Component: FC<Props> = ({ waitingBooster, isNowGranted, ...props }) => {
  const waitingBoostersService = new WaitingBoostersService()

  const leftMs = waitingBoostersService.enableLeftDuration(waitingBooster)
  const leftPersentage =
    100 - waitingBoostersService.enableLeftDurationPersentage(waitingBooster)

  const animationShadowStyle = {
    hide: {},
    show: {
      initial: {
        rotate: 270,
        scale: 4,
      },
      animate: {
        rotate: 0,
        scale: 1,
      },
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <Flex
      pos="relative"
      direction="column"
      component="li"
      justify="start"
      align="center"
      style={{ borderRadius: 8 }}
    >
      <AspectRatio ratio={1} w="100%" h="100%">
        <motion.div
          {...(isNowGranted
            ? animationShadowStyle.show
            : animationShadowStyle.hide)}
        >
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

            <Flex
              pos="absolute"
              w="100%"
              h="100%"
              align="center"
              justify="center"
              top={0}
              left={0}
              bg="rgba(0,0,0,0.4)"
            >
              <RingProgress
                size={80}
                thickness={6}
                sections={[
                  {
                    value: leftPersentage,
                    color: colorScheme.scheme1.accent1.surface,
                  },
                ]}
              />
            </Flex>
          </Flex>
        </motion.div>
      </AspectRatio>

      <Box mt={8} h="100%">
        <Box lh={1} fz={10} ta="center">
          あと
        </Box>
        <Box mt={2} lh={1} fz={10} ta="center">
          {dateConverter.msToMMDDSS(leftMs)}
        </Box>
        <Box fz={10} mt={8} fw={900} ta="justify">
          {waitingBooster.booster.missionName}達成記念
        </Box>
      </Box>
    </Flex>
  )
}

export { Component as OBoosterCellItem }
