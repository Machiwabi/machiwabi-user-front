import { FC } from 'react'
import { EHeading } from '../../01_elements/EHeading/base'
import { EModal } from '../../01_elements/EModal'
import { EText } from '../../01_elements/EText/base'

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
      <EHeading.Page ta="center">利用開始</EHeading.Page>
      <EText.Desc2 mt={8} ta="center">
        お楽しみください！
      </EText.Desc2>
    </EModal>
  )
}

export { Component as TModalRewardConsumedTemplate }
