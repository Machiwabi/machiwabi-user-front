import { Box, Flex } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { HeartAnimation } from '../../organisms/HeartAnimation'
import { UserIcon } from '../../organisms/UserIcon'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey: waiting.event.uniqueKey,
    })

  if (waitingSiblingError) return <>読み込みエラー</>
  if (!waitingSiblings || waitingSiblingsIsLoading) return <>aaa</>

  return (
    <>
      <Flex justify="center" fontWeight="black">
        このイベントを待っている人
      </Flex>

      <Flex justify="center" mt={4}>
        {waitingSiblings.map((waiting, i) => {
          return <WaitingUserComponent waiting={waiting} index={i} />
        })}
      </Flex>
    </>
  )
}

export { Component as WaitingUserIconsTemplate }

type WaitingUserComponentProps = {
  waiting: WaitingEntity
  index: number
}

const WaitingUserComponent: FC<WaitingUserComponentProps> = ({
  waiting,
  index,
}) => {
  const [addableTotalPoint, setAddableTotalPoint] = useState<
    number | undefined
  >(1)

  const waitingService = new WaitingService(waiting)
  const offsetMs = waitingService.offsetMs()

  // 数秒ごとに実行する関数
  const calcAddableTotalPoint = () => {
    const earnableTotalPoint = waitingService.earnableTotalPoint()

    setAddableTotalPoint(earnableTotalPoint)
  }

  useEffect(() => {
    const interval = setInterval(calcAddableTotalPoint, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Box pos="relative" mx={1}>
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

        <UserIcon
          offsetMs={offsetMs}
          width={32}
          height={32}
          imageUrl={
            waiting.user.iconImageUrl ||
            '/assets/images/_sample/picture_ranking_10.png'
          }
          earnedUnitSeconds={waiting.secondsPerWaitingPoint}
          isBoosting={waitingService.isBoosting()}
          tooltipLabel={
            <>
              {waiting.user.displayName || 'guest'} -{' '}
              {waiting.totalPoint.toLocaleString()}WABI
            </>
          }
        />
      </Box>
    </>
  )
}
