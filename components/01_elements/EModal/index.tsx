import { Box, Flex, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FC, ReactNode, useEffect } from 'react'
import { EButton } from '../EButton'

type Props = {
  isOpen: boolean
  children?: ReactNode
  closedCallback?: (func: () => void) => void
  showCloseButton?: boolean
  closedButtonLabel?: string
}

const Component: FC<Props> = ({
  isOpen,
  closedCallback,
  showCloseButton,
  closedButtonLabel = '閉じる',
  children,
}) => {
  const [opened, { open, close }] = useDisclosure(isOpen)

  useEffect(() => {
    if (isOpen) open()
  }, [isOpen])

  useEffect(() => {
    if (closedCallback) closedCallback(close)
  }, [opened])

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        xOffset={16}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={12}
      >
        <Box p={16}>
          {children}
          {showCloseButton && (
            <Flex justify="center">
              <EButton.Sm mt={16} onClick={close}>
                {closedButtonLabel}
              </EButton.Sm>
            </Flex>
          )}
        </Box>
      </Modal>
    </>
  )
}

export { Component as EModal }
