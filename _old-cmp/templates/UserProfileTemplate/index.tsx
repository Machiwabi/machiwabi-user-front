import { Box, Flex } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { useEarnedTrigger } from '../../../hooks/useEarnedTrigger'
import { msToMMDDSS } from '../../../utils/msToMMDDSS'
import { HeartAnimation } from '../../organisms/HeartAnimation'
import { UserIcon } from '../../organisms/UserIcon'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)
  const offsetMs = waitingService.offsetMs()
  const { trigger, resetTrigger } = useEarnedTrigger(
    waiting.secondsPerWaitingPoint,
    offsetMs
  )

  const [addableTotalPoint, setAddableTotalPoint] = useState<
    number | undefined
  >(1)
  const [totalPoint, setTotalPoint] = useState<number | undefined>(
    waiting.totalPoint
  )

  const calcAddableTotalPoint = () => {
    const earnableTotalPoint = waitingService.earnableTotalPoint()

    const totalPoint = waitingService.totalPoint()

    setAddableTotalPoint(earnableTotalPoint)
    setTotalPoint(totalPoint)
  }

  useEffect(() => {
    if (trigger) {
      calcAddableTotalPoint()
      resetTrigger()
    }
  }, [trigger])

  return (
    <>
      <Box px={6} py={6} borderRadius={8}>
        <Flex justify="center" align="center">
          <Box pos="relative">
            <Flex
              align="center"
              justify="center"
              pos="absolute"
              zIndex={2}
              w="100%"
            >
              <HeartAnimation
                offsetMs={offsetMs}
                earnedUnitSeconds={waiting.secondsPerWaitingPoint}
                addableTotalPoint={addableTotalPoint}
                isBoosting={waitingService.isBoosting()}
              />
            </Flex>
            <Box mt={1} width="64px" height="64px">
              <UserIcon
                offsetMs={offsetMs}
                width={64}
                height={64}
                imageUrl={
                  waiting.user.iconImageUrl ||
                  '/assets/images/_sample/picture_ranking_10.png'
                }
                earnedUnitSeconds={waiting.secondsPerWaitingPoint}
                isBoosting={waitingService.isBoosting()}
              />
            </Box>
          </Box>
          <Box ml={4}>
            <Box fontSize={18} fontWeight="bold">
              {waiting.user.displayName}
            </Box>

            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                color="project.surface3.object.high"
                bg="project.surface3.surface"
                borderRadius={16}
                fontSize={18}
              >
                attach_money
              </Box>
              <Box ml={2} mr="2px" fontSize={14} fontWeight="bold">
                {totalPoint?.toLocaleString()} WABI
              </Box>
            </Flex>

            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                color="project.surface3.object.high"
                bg={waitingService.isBoosting() ? 'red' : 'black'}
                borderRadius={16}
                fontSize={18}
              >
                timelapse
              </Box>
              <Flex
                ml={2}
                mr="2px"
                fontSize={14}
                fontWeight="bold"
                color={waitingService.isBoosting() ? 'red' : 'black'}
              >
                {waitingService.earnableTotalPoint().toLocaleString()} WABI /
                10sec
              </Flex>
              <Flex
                align="center"
                mt={0.5}
                ml={1}
                px={1}
                borderRadius={8}
                color={'white'}
                fontSize={10}
                bg="red"
              >
                ↑ BOOST
              </Flex>
            </Flex>

            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                color="project.surface3.object.high"
                bg="project.surface3.surface"
                borderRadius={16}
                fontSize={18}
              >
                hourglass_bottom
              </Box>
              <Box ml={2} mr="2px" fontSize={14} fontWeight="bold">
                {msToMMDDSS(waiting.waitingDuration)}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export { Component as UserProfileTemplate }
