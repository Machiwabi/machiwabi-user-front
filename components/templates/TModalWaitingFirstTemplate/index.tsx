import { FC } from 'react'
import { EHeading } from '../../elements/EHeading/base'
import { EModal } from '../../elements/EModal'
import { EText } from '../../elements/EText/base'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Component: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <EModal
      isOpen={isOpen}
      closedCallback={() => setIsOpen(false)}
      showCloseButton={true}
    >
      <EHeading.Page ta="center">
        aiueoの
        <br />
        待ち侘びルームに参加しました！
      </EHeading.Page>
      <EText.Desc2 mt={8} ta="center">
        イベント開催までにポイントが貯まっていきます。定期的にチェックしましょう！
      </EText.Desc2>
    </EModal>
  )
}

export { Component as TModalWaitingFirstTemplate }
