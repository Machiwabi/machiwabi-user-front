import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import Link from 'next/link'

const Component: FC = () => {
  const { menuOpenGlobalMenuStart } = useMenuOpeningStatus()

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
          <Box
            px={16}
            className="material-icons-outlined"
            onClick={() => {
              menuOpenGlobalMenuStart()
            }}
          >
            menu
          </Box>
          <Link
            href="/waitings"
            style={{ display: 'block', width: 173, height: 24 }}
          >
            <Image
              src="/assets/images/logo/logo_machiwabi.svg"
              alt="logo"
              width={173}
              height={24}
            />
          </Link>
          <Box px={16} fz={12}>
            guest
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export { Component as OHeaderNav }
