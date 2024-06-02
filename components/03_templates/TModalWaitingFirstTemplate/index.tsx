import { FC } from 'react'
import { EHeading } from '../../01_elements/EHeading/base'
import { EModal } from '../../01_elements/EModal'
import { EText } from '../../01_elements/EText/base'
import { WaitingEntity } from '../../../generated/graphql'

type Props = {
  isOpen: boolean
  markAsUserTutorialRead: () => void
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting, isOpen, markAsUserTutorialRead }) => {
  return (
    <EModal
      isOpen={isOpen}
      closedCallback={markAsUserTutorialRead}
      showCloseButton={true}
    >
      <EHeading.Page ta="center">
        {waiting.event.name}の
        <br />
        マチワビルームに参加しました！
      </EHeading.Page>
      <EText.Desc2 mt={8} ta="center">
        マチワビルームでは
        <br />
        当日までの残り時間と、
        <br />
        待ち時間に応じたポイントをご覧いただけます！
      </EText.Desc2>
    </EModal>
  )
}

export { Component as TModalWaitingFirstTemplate }
