import { Box, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  userDisplayName?: string | null
  waitingPoint: number
}

const Component: FC<Props> = ({ userDisplayName = 'guest', waitingPoint }) => {
  return (
    <>
      {/* header */}
      <Flex
        pos="relative"
        justify="space-between"
        align="center"
        h={14}
        pl={3}
        pr={6}
        zIndex={10}
        bg="white"
      >
        <Link href="/waitings">
          <Flex align="center" _hover={{ opacity: 0.2 }}>
            <Box
              className="material-icons-outlined"
              as="i"
              color="project.support"
              fontSize={24}
              mr={3}
            >
              chevron_left
            </Box>
            {/* <Box bg="blue" w={5} h={5} borderRadius={20} /> */}
            <Box ml={0.5} fontSize={16} fontWeight="bold" mb={0.5}>
              戻る
            </Box>
          </Flex>
        </Link>
        <Box mr={-3}>
          <ConnectButton
            chainStatus="none"
            showBalance={false}
            accountStatus="address"
          />
        </Box>
      </Flex>
    </>
  )
}

export { Component as NewHeaderSection }
