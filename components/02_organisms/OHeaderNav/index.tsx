import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import Link from 'next/link'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { truncator } from '../../../utils/truncator'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { waitingsUrl } from '../../../helpers/url.helper'

const Component: FC = () => {
  const { menuOpenGlobalMenuStart } = useMenuOpeningStatus()

  const { isAuthenticated } = useAuthenticatedStore()
  const { siweEoaAddress } = useSiweEoaAddress()

  return (
    <>
      <Box
        pos="fixed"
        w="100%"
        h={56}
        bg={colorScheme.scheme1.surface1.surface}
        style={{
          zIndex: 100,
          borderBottom: `0.5px solid ${colorScheme.scheme1.border.mid}`,
        }}
      >
        <Flex pos="relative" justify="space-between" align="center" h={'100%'}>
          <Box
            pos="relative"
            px={16}
            className="material-icons-outlined"
            onClick={() => {
              menuOpenGlobalMenuStart()
            }}
            style={{ zIndex: 100, cursor: 'pointer' }}
          >
            menu
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
    </>
  )
}

export { Component as OHeaderNav }
