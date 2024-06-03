import { Box, Flex, Modal } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { NormalButton } from './elements/NormalButton'
import { applicationUrls } from '../../constants/applicationUrls'

const Component: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    ;(async () => {
      const isLanded = await userLanded()
      if (!isLanded) {
        setIsOpen(true)
        await checkLanded()
      }
    })()
  }, [])

  return (
    <>
      <Modal
        size={'xl'}
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        withCloseButton={false}
        centered
        xOffset={16}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={12}
      >
        {step === 1 && (
          <Box p={16} c="black">
            <Box
              fz={{ base: 36, lg: 40 }}
              ff="RocknRoll One"
              lh={{ base: 1.45 }}
              ta="center"
            >
              雨のち、リボン2024
              <Box component="br" />
              のチケットを予約・購入済みですか？
            </Box>
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              justify="center"
              mt={{ base: 24, lg: 30 }}
            >
              <NormalButton
                ff="RocknRoll One"
                mx={16}
                px={32}
                href={''}
                value={
                  <>
                    <span>はい</span>
                  </>
                }
                onClick={() => setIsOpen(false)}
              />
              <NormalButton
                ff="RocknRoll One"
                mx={16}
                px={32}
                href={''}
                value={
                  <>
                    <span>いいえ</span>
                  </>
                }
                mt={{ base: 8, lg: 0 }}
                onClick={() => setStep(2)}
              />
            </Flex>
          </Box>
        )}
        {step === 2 && (
          <Box p={16} c="black">
            <Box
              fz={{ base: 36, lg: 40 }}
              ff="RocknRoll One"
              lh={{ base: 1.45 }}
              ta="center"
            >
              チケットを購入しますか？
            </Box>
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              justify="center"
              mt={{ base: 24, lg: 30 }}
            >
              <NormalButton
                ff="RocknRoll One"
                mx={16}
                px={32}
                href={applicationUrls.campaign.icr240603Ticket}
                value={
                  <>
                    <span>はい</span>
                  </>
                }
              />
              <NormalButton
                ff="RocknRoll One"
                mx={16}
                px={32}
                href={''}
                value={
                  <>
                    <span>閉じる</span>
                  </>
                }
                mt={{ base: 8, lg: 0 }}
                onClick={() => setIsOpen(false)}
              />
            </Flex>
          </Box>
        )}
      </Modal>
    </>
  )
}

export { Component as CheckFirstLandingSection }

const userLanded = async (): Promise<boolean> => {
  const landed: string | null = await localStorage.getItem(
    'machiwabi.icr.landed'
  )
  return !!landed
}

const checkLanded = async () => {
  try {
    await localStorage.setItem('machiwabi.icr.landed', 'true')
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

const Da = () => {
  return <></>
}
