import { Box, Flex } from '@mantine/core'
import { FC, useState } from 'react'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { colorScheme } from '../../../theme/colorScheme'
import { TModalGuidePwaTemplate } from '../../03_templates/TModalGuidePwaTemplate'
import { GA4_CUSTOM_EVENT } from '../../../constants/ga4CustomEvent'
import { ga4PushEvent } from '../../../utils/ga4'

const Component: FC = () => {
  const { isAuthenticated } = useAuthenticatedStore()

  if (!isAuthenticated()) return <></>

  return <></>
  return (
    <>
      <GuideFloatButton />
    </>
  )
}

export { Component as OFooterNav }

const GuideFloatButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Flex
        pos="fixed"
        justify="center"
        align="center"
        right={16}
        bottom={48}
        bg={colorScheme.scheme1.surface3.surface}
        w={68}
        h={68}
        onClick={() => {
          setIsOpen(true)
        }}
        style={{
          borderRadius: 68 / 2,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          component="i"
          className="material-icons-outlined"
          fz={24}
          px={24}
          py={24}
          c={colorScheme.scheme1.surface3.object.high}
        >
          add_circle
        </Box>
      </Flex>
      <TModalGuidePwaTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
