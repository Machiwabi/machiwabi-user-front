import { Box } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC } from 'react'

const Component: FC = () => {
  return (
    <Box>
      <ConnectButton
        chainStatus="none"
        showBalance={false}
        accountStatus="address"
      />
    </Box>
  )
}

export { Component as WalletButton }
