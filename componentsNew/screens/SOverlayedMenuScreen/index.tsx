import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { colorScheme } from '../../../theme/colorScheme'
import { OverlayedMenuList } from './OverlayedMenuList'

const Component: React.FC = () => {
  const { isMenuOpening, menuOpenGlobalMenuEnd, menuOpenGlobalMenuStart } =
    useMenuOpeningStatus()
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    if (!!isMenuOpening) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [isMenuOpening])

  return (
    <>
      {isMenuOpening === 'globalMenu' && (
        <Flex pos="fixed" top={0} h="100%" w="100%" style={{ zIndex: 10000 }}>
          <Flex
            pos="relative"
            align="center"
            justify="space-between"
            direction="column"
            w="100%"
            h="100%"
            bg={colorScheme.scheme1.surface1.surface}
          >
            <Box w="100%" h={56} bg={colorScheme.scheme1.surface1.surface}>
              <Flex justify="space-between" align="center" h={'100%'}>
                <Box
                  px={16}
                  className="material-icons-outlined"
                  onClick={() => {
                    menuOpenGlobalMenuEnd()
                  }}
                >
                  close
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
            <OverlayedMenuList mt={8} px={4} />
            <Box />
            {/* 調整用Div */}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export { Component as SOverlayedMenuScreen }
