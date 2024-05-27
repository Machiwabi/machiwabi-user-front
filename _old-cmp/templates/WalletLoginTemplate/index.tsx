import { Box, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC } from 'react'

const Component: FC = () => {
  return (
    <>
      <Box py={4} px={4}>
        <Flex
          direction="column"
          py={6}
          bg="project.bg1"
          fontSize={16}
          borderRadius={4}
          align="center"
          justify="center"
        >
          <Box fontSize={16} opacity={0.5}>
            利用にはウォレットログインが必要です
          </Box>
          <Box mt={3}>
            <ConnectButton
              chainStatus="none"
              showBalance={false}
              accountStatus="address"
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export { Component as WalletLoginTemplate }
