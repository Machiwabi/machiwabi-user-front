import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { RewardEntity } from '../../../generated/graphql'
import { EHeading } from '../../01_elements/EHeading/base'
import { EModal } from '../../01_elements/EModal'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  reward: RewardEntity
}

const Component: FC<Props> = ({ reward, isOpen, setIsOpen }) => {
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
        <EHeading.Page ta="center" mb={12}>
          リワード獲得！
          <Box fz={20}>{reward.name}</Box>
        </EHeading.Page>
        <Flex justify="center">
          <Image
            src={
              reward.iconUrl || '/assets/images/picture/picture_fallback.png'
            }
            width={200}
            height={200}
            alt={reward.name}
          />
        </Flex>
      </EModal>
    </>
  )
}

export { Component as TModalGrantedWaitingRewardTemplate }
