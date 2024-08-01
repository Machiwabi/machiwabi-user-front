import { FC } from 'react'
import { WaitingService } from '../../domains/services/waiting.service'
import { WaitingEntity } from '../../generated/graphql'
import { WaitingCounterNoBg } from './threetest/WaitingCounterNoBg'
import { WaitingCounterWithBg } from './threetest/WaitingCounterWithBg'

type Props = {
  waiting: WaitingEntity
}
// AnimateWaitingコンポーネント
const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)
  const isWaitingCounterBgDisplayable =
    waitingService.isWaitingCounterBgDisplayable()

  return (
    <>
      {isWaitingCounterBgDisplayable ? (
        <>
          <WaitingCounterWithBg waiting={waiting} />
        </>
      ) : (
        <>
          <WaitingCounterNoBg waiting={waiting} />
        </>
      )}
    </>
  )
}

export { Component as AnimateWaiting }
