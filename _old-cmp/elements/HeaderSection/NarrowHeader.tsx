import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'

export const Component: FC = () => {
  const { menuOpenGlobalMenuStart } = useMenuOpeningStatus()

  return (
    <>
      <Flex
        pos="relative"
        align="center"
        justify="space-between"
        w="100%"
        h="58px"
        px="22px"
        bg="project.surface1.surface"
      >
        <Box pos="absolute" left="calc(50% - 94.5px)">
          <Link href="/">
            <Image
              src="/assets/logo/logo_machiwabi.svg"
              alt="logo"
              width={189}
              height={25}
            />
          </Link>
        </Box>
        <Box
          className="material-icons-outlined"
          as="i"
          cursor="pointer"
          onClick={() => {
            menuOpenGlobalMenuStart()
          }}
        >
          menu
        </Box>

        <Flex
          align="center"
          px={1.5}
          border="solid"
          borderWidth="1px"
          borderColor="project.border.border1"
          borderRadius={100}
        >
          <Box
            w={13}
            h={13}
            mr={1}
            bg="project.border.border1"
            borderRadius={100}
          />
          <Box fontSize={12} fontWeight="bold">
            0x6...
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export { Component as NarrowHeader }
