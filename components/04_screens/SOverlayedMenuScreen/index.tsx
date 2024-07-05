import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { colorScheme } from '../../../theme/colorScheme'
import { OverlayedMenuList } from './OverlayedMenuList'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { truncator } from '../../../utils/truncator'
import Link from 'next/link'
import { waitingsUrl } from '../../../helpers/url.helper'
import { useClipboardCopy } from '../../../hooks/useClipboardCopy'

const Component: React.FC = () => {
  const { isMenuOpening, menuOpenGlobalMenuEnd } = useMenuOpeningStatus()
  const [display, setDisplay] = useState<boolean>(false)

  const { isAuthenticated } = useAuthenticatedStore()
  const { siweEoaAddress } = useSiweEoaAddress()
  const { handleCopyClick } = useClipboardCopy()

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
        <Flex pos="fixed" top={0} h="100%" w="100%" style={{ zIndex: 200 }}>
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
                  style={{ cursor: 'pointer', zIndex: 100 }}
                >
                  close
                </Box>
                <Flex pos="absolute" w="100%" justify="center">
                  <Link
                    href={waitingsUrl()}
                    style={{ display: 'block', width: 173, height: 24 }}
                  >
                    <Image
                      src="/assets/images/logo/logo_machiwabi.svg"
                      alt="logo"
                      width={173}
                      height={24}
                    />
                  </Link>
                </Flex>
                {isAuthenticated() && siweEoaAddress ? (
                  <Box mr={16}>
                    <Box
                      px={8}
                      fz={10}
                      ff="outfit"
                      fw="bold"
                      bg={colorScheme.scheme1.surface2.surface}
                      style={{ borderRadius: 16 }}
                    >
                      {truncator.truncateString(siweEoaAddress, 8, 'middle')}
                    </Box>
                  </Box>
                ) : (
                  <Box mr={16}>
                    <Box
                      px={8}
                      fz={10}
                      ff="outfit"
                      fw="bold"
                      bg={colorScheme.scheme1.surface2.surface}
                      c={colorScheme.scheme1.surface2.object.low}
                      style={{ borderRadius: 16 }}
                    >
                      GUEST
                    </Box>
                  </Box>
                )}
              </Flex>
            </Box>
            <OverlayedMenuList mt={8} px={4} siweEoaAddress={siweEoaAddress} />
            {siweEoaAddress && (
              <Flex
                align="center"
                px={16}
                py={2}
                onClick={() => {
                  handleCopyClick(siweEoaAddress)
                }}
                bg={colorScheme.scheme1.surface2.surface}
                style={{ cursor: 'pointer', borderRadius: 16 }}
              >
                <Box fz={11} c={colorScheme.scheme1.surface1.object.mid}>
                  {siweEoaAddress}
                </Box>
                <Box
                  pos="relative"
                  ml={4}
                  className="material-icons-outlined"
                  fz={12}
                >
                  copy
                </Box>
              </Flex>
            )}
            <Box />
            {/* 調整用Div */}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export { Component as SOverlayedMenuScreen }
