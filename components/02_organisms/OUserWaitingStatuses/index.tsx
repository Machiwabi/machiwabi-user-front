import { Box, Flex, Text } from '@mantine/core'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'
import { colorScheme } from '../../../theme/colorScheme'
import { ELabel } from '../../01_elements/ELabel/ELabel'
import { OWaitingTotalCount } from '../OWaitingTotalCount'

type Props = {
  waiting: WaitingEntity
  rollSpeed?: number
  initialRollAnimation?: boolean
}

const Component: FC<Props> = ({
  waiting,
  rollSpeed,
  initialRollAnimation = false,
}) => {
  const waitingService = new WaitingService(waiting)
  const { trigger } = useAnimateTriggerStore()
  const [totalPoint, setTotalPoint] = useState<number>(waiting.totalPoint)

  useLayoutEffect(() => {
    if (trigger) {
      const totalPoint = waitingService.totalPoint()
      setTotalPoint(totalPoint)
    }
  }, [trigger])

  return (
    <Flex direction="column" align="end">
      <DelayedRenderingCounter
        waiting={waiting}
        rollSpeed={rollSpeed}
        initialRollAnimation={initialRollAnimation}
      />
      <Box mb={4}>
        <Text fz={10} ff="outfit" fw={700} lh={1}>
          {waitingService.earnableTotalPoint().toLocaleString()} pt /{' '}
          {waiting.secondsPerWaitingPoint} sec
        </Text>
      </Box>
      <Box>
        {waitingService.isBoosting() ? (
          <ELabel
            label="Boosting"
            c={colorScheme.scheme1.surface1.surface}
            bg={colorScheme.scheme1.notice.alert}
          />
        ) : (
          <ELabel
            px={0}
            label="No boosts"
            c={colorScheme.scheme1.surface1.object.inactive}
          />
        )}
      </Box>
    </Flex>
  )
}

export { Component as OUserWaitingStatuses }

// react-virtualを使った描画を行う際に、カウンターを含む本コンポーネントはレンダリングが遅れるため、
// スクロールの際にちらつきが発生してしまう。それを防ぐために最初のレンダーの時は静的なカウンターを表示し、
// 1秒後にアニメーションを開始するようにし、段階的なレンダリングを行うためのコンポーネントを作成した。
type DelayedRenderingCounterProps = {
  waiting: WaitingEntity
  rollSpeed?: number
  initialRollAnimation?: boolean
}

const DelayedRenderingCounter: FC<DelayedRenderingCounterProps> = ({
  waiting,
  rollSpeed,
  initialRollAnimation,
}) => {
  const [displayingCounter, setDisplayingCounter] = useState<boolean>(false)
  const waitingService = new WaitingService(waiting)

  useLayoutEffect(() => {
    setTimeout(() => {
      setDisplayingCounter(true)
    }, 1000)
  }, [])

  return (
    <>
      <Flex align="end" mb={4}>
        {displayingCounter ? (
          <OWaitingTotalCount
            waiting={waiting}
            rollSpeed={rollSpeed}
            initialRollAnimation={initialRollAnimation}
          />
        ) : (
          <Box ff="outfit" fw={800} fz={20} lh={1} lts={0.92}>
            {waitingService.totalPoint().toLocaleString()}
          </Box>
        )}
        <Text fz={10} ff="outfit" fw={900} ml={4} pb={3} lh={1}>
          pt
        </Text>
      </Flex>
    </>
  )
}
