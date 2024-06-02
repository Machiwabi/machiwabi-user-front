import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { useTutorialHistory } from '../../../hooks/resources/useTutorialHistory'
import { TModalWaitingFirstTemplate } from '../../03_templates/TModalWaitingFirstTemplate'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const { isRead, markAsUserTutorialRead } = useTutorialHistory(
    `waiting-first-screen_${waiting.uniqueKey}`
  )
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)

  if (!isSiweWallet) return <></>
  if (isRead) return <></>

  // 自分自身かつ、最初の画面の場合
  return (
    <>
      <TModalWaitingFirstTemplate
        waiting={waiting}
        isOpen={true}
        markAsUserTutorialRead={markAsUserTutorialRead}
      />
    </>
  )
}

export { Component as WaitingFirstScreen }
