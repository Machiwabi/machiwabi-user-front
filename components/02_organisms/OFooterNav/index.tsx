import { Box, Flex } from '@mantine/core'
import { FC, useState } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import Link from 'next/link'
import styles from './style.module.scss'
import { userEditUrl, waitingsUrl } from '../../../helpers/url.helper'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { TModalGuidePwaTemplate } from '../../03_templates/TModalGuidePwaTemplate'

const Component: FC = () => {
  const { isAuthenticated } = useAuthenticatedStore()

  if (!isAuthenticated()) return <></>

  return (
    <>
      <Box pos="fixed" w="100%" left={0} bottom={0}>
        <Flex w="100%" h={80}>
          <Flex
            w={`calc(50% - ${96 / 2}px)`}
            h="100%"
            bg={colorScheme.scheme1.surface2.surface}
            justify="end"
            align="center"
          >
            <Link
              href={waitingsUrl()}
              className={styles['o-footer-nav__menu-link']}
            >
              <Flex
                component="i"
                className={`material-icons-outlined`}
                align="center"
                h="100%"
                px={24 * 2}
                py={24}
                fz={24}
                c={colorScheme.scheme1.surface1.object.high}
              >
                home
              </Flex>
            </Link>
          </Flex>
          <Box pos="relative" w={96} h="100%">
            <GuidePwaScreen />
          </Box>
          <Flex
            w={`calc(50% - ${96 / 2}px)`}
            h="100%"
            bg={colorScheme.scheme1.surface2.surface}
            justify="start"
            align="center"
          >
            <Link
              href={userEditUrl()}
              className={styles['o-footer-nav__menu-link']}
            >
              <Flex
                component="i"
                className="material-icons-outlined"
                align="center"
                h="100%"
                px={24 * 2}
                py={24}
                fz={24}
                c={colorScheme.scheme1.surface1.object.high}
              >
                account_circle
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export { Component as OFooterNav }

const GuidePwaScreen: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* <Link href="/" className={styles['o-footer-nav__menu-link']}> */}
      <Flex
        pos="absolute"
        justify="center"
        align="center"
        left={(96 - 68) / 2}
        top={-68 / 2}
        bg={colorScheme.scheme1.surface3.surface}
        w={68}
        h={68}
        style={{ borderRadius: 68 / 2 }}
        onClick={() => {
          setIsOpen(true)
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
      <svg
        width="96"
        height="80"
        viewBox="0 0 96 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M48 48C74.5097 48 96 26.5097 96 0V80H0V0C0 26.5097 21.4903 48 48 48Z"
          fill={colorScheme.scheme1.surface2.surface}
        />
      </svg>
      <TModalGuidePwaTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
