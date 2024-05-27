import { FC } from 'react'
import { EHeading } from '../../elements/EHeading/base'
import { EModal } from '../../elements/EModal'
import { EText } from '../../elements/EText/base'
import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { colorScheme } from '../../../theme/colorScheme'

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
        ホーム画面に登録すると
        <br />
        通知を受け取ることができます！
      </EHeading.Page>

      <Flex direction="column" align="center" mt={16}>
        <EText.Desc1 lh={1}>シェアボタンを押下</EText.Desc1>
        <Box
          mt={8}
          style={{
            border: 'solid',
            borderWidth: '1px',
            borderColor: colorScheme.scheme1.border.mid,
          }}
        >
          <Image
            src="/assets/images/picture/picture_modal-home_share-01.png"
            alt="シェアボタンを押下"
            width={220}
            height={45}
          />
        </Box>
      </Flex>
      <Flex direction="column" align="center" mt={16}>
        <EText.Desc1 lh={1}>ホーム画面に追加を押下</EText.Desc1>
        <Box
          mt={8}
          style={{
            border: 'solid',
            borderWidth: '1px',
            borderColor: colorScheme.scheme1.border.mid,
          }}
        >
          <Image
            src="/assets/images/picture/picture_modal-home_share-02.png"
            alt="ホームに追加を押下"
            width={220}
            height={184}
          />
        </Box>
      </Flex>
    </EModal>
  )
}

export { Component as TModalGuidePwaTemplate }
