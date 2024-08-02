import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { BoosterEntity } from '../../../generated/graphql'
import { dateConverter } from '../../../utils/dateConverter'
import { EHeading } from '../../01_elements/EHeading/base'
import { EModal } from '../../01_elements/EModal'
import { EText } from '../../01_elements/EText/base'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  booster: BoosterEntity
}

const Component: FC<Props> = ({ booster, isOpen, setIsOpen }) => {
  const [confettiShow, setConffettiShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setConffettiShow(false)
    }, 5000)
  }, [])

  return (
    <>
      {isOpen && confettiShow && (
        <Box pos="fixed" top={0} left={0} style={{ zIndex: 250 }}>
          {<Confetti />}
        </Box>
      )}
      <EModal
        isOpen={isOpen}
        closedCallback={() => {
          setIsOpen(false)
        }}
        showCloseButton={true}
      >
        {booster.name === 'フラワー' ? (
          <>
            {/* TODO 負債なおす */}
            <EHeading.Page ta="center">
              ミッション達成！
              <Box fz={20}>「ホーム」見に来てね！</Box>
              いいことあるかも
            </EHeading.Page>
          </>
        ) : (
          <EHeading.Page ta="center">
            ミッション達成！
            <Box fz={20}>{booster.name}</Box>
            を獲得しました！
          </EHeading.Page>
        )}
        <Flex justify="center">
          <Image
            src={
              booster.iconUrl || '/assets/images/picture/picture_fallback.png'
            }
            width={200}
            height={200}
            alt={booster.name}
          />
        </Flex>
        <EText.Desc2 mt={0} ta="center">
          <Box component="span" fw={700}>
            {dateConverter.msToMMDDSS(booster.durationSeconds * 1000)}の間
          </Box>
          、10秒ごとに
          <Box component="span" fw={700}>
            {booster.multiplier - 1}ポイント
          </Box>
          が追加されます。
        </EText.Desc2>
      </EModal>
    </>
  )
}

export { Component as TModalGrantedWaitingBoosterTemplate }
