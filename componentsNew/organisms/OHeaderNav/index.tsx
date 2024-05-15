import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

const Component: FC = () => {
  return (
    <>
      <Box
        pos="fixed"
        w="100%"
        h={56}
        bg={colorScheme.scheme1.surface1.surface}
        style={{
          zIndex: 10,
          borderBottom: `0.5px solid ${colorScheme.scheme1.border.mid}`,
        }}
      >
        <Flex justify="space-between" align="center" h={'100%'}>
          <Box px={16} className="material-icons-outlined">
            menu
          </Box>
          <Image
            src="/assets/images/logo/logo_machiwabi.svg"
            alt="logo"
            width={173}
            height={24}
          />
          <Box px={16} fz={12}>
            guest
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export { Component as OHeaderNav }
