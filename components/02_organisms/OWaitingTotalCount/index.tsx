import { FC, useEffect, useState } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { Box } from '@mantine/core'
import { ECounterUnit } from '../../01_elements/ECounterUnit'
import { WaitingService } from '../../../domains/services/waiting.service'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'

type Props = {
  waiting: WaitingEntity
  fz?: number
  rollSpeed?: number
  initialRollAnimation?: boolean
}

const Component: FC<Props> = ({
  waiting,
  fz = 20,
  rollSpeed = 0,
  initialRollAnimation = false,
}) => {
  // 初期値生成
  const waitingService = new WaitingService(waiting)
  const totalPoint = waitingService.totalPoint()
  const totalPointString = totalPoint.toLocaleString()
  const digitsArray = totalPointString.split('')
  const [recentTotalPointDigitArray, setRecentTotalPointDigitArray] =
    useState(digitsArray)

  const { trigger } = useAnimateTriggerStore()

  useEffect(() => {
    const totalPoint = waitingService.totalPoint()
    const totalPointString = totalPoint.toLocaleString()
    const digitsArray = totalPointString.split('')
    setRecentTotalPointDigitArray(digitsArray)
  }, [trigger])

  return (
    <>
      {recentTotalPointDigitArray.map((digit, index) => {
        if (digit === ',')
          return (
            <Box
              w={'1rem'}
              ml={-4}
              mr={-6}
              lh={1}
              fz={20}
              ff="outfit"
              fw={800}
              ta="center"
              key={index}
            >
              {digit}
            </Box>
          )
        if (digit.match(/\d/) === null) return null
        return (
          <ECounterUnit
            rollSpeed={rollSpeed}
            delay={index * 0.1}
            startNum={initialRollAnimation ? Math.random() * 10 : Number(digit)}
            goalNum={Number(digit)}
            fz={fz}
            key={index}
          />
        )
      })}
    </>
  )
}

export { Component as OWaitingTotalCount }
