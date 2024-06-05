import { FC, useEffect, useState } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { Box } from '@mantine/core'
import { ECounterUnit } from '../../01_elements/ECounterUnit'
import { WaitingService } from '../../../domains/services/waiting.service'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
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
        return (
          <ECounterUnit
            delay={index * 0.1}
            startNum={Math.random() * 10}
            goalNum={Number(digit)}
            fz={20}
            key={index}
          />
        )
      })}
    </>
  )
}

export { Component as OWaitingTotalCount }
