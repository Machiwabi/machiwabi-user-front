import { Box, Flex } from '@mantine/core'
import Image from 'next/image'

import Link from 'next/link'
import { FC } from 'react'
import { waitingsUrl, web3AuthEntranceUrl } from '../../../helpers/url.helper'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { colorScheme } from '../../../theme/colorScheme'
import { truncator } from '../../../utils/truncator'
import { OPwaInstallBanner } from '../OPwaInstallBanner'

const Component: FC = () => {
  const { menuOpenGlobalMenuStart } = useMenuOpeningStatus()

  const { isAuthenticated } = useAuthenticatedStore()
  const { siweEoaAddress } = useSiweEoaAddress()

  return (
    <>
      <Box
        pos="fixed"
        w="100%"
        bg={colorScheme.scheme1.surface1.surface}
        style={{
          zIndex: 100,
          borderBottom: `0.5px solid ${colorScheme.scheme1.border.mid}`,
        }}
      >
        <OPwaInstallBanner />
        <Flex pos="relative" justify="space-between" align="center" h={56}>
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
            <Link
              href={web3AuthEntranceUrl()}
              style={{ marginRight: 16, textDecoration: 'none', zIndex: 100 }}
            >
              <Box>
                <Box
                  px={8}
                  fz={10}
                  ff="outfit"
                  fw="bold"
                  c={colorScheme.scheme1.notice.alert}
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${colorScheme.scheme1.notice.alert}`,
                    textDecoration: 'none',
                  }}
                >
                  未ログイン
                </Box>
              </Box>
            </Link>
          )}
        </Flex>
      </Box>
    </>
  )
}

export { Component as OHeaderNav }
