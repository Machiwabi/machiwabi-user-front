import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC, ReactNode } from 'react'
import { useAuthenticatedStore } from '../recoil/authenticatedStore/useAuthenticatedStore'

import { authenticationAdapter } from '../adapters/authenticationAdapter'
import { rainbowkitCustomTheme } from '../utils/rainbowkitTheme'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { mainnet, polygon } from 'viem/chains'
import { applicationProperties } from '../constants/applicationProperties'

const config = getDefaultConfig({
  appName: 'wallet-connect.project',
  projectId: applicationProperties.WALLET_CONNECT.PROJECT_ID,
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
})

const queryClient = new QueryClient()

type Props = {
  children: ReactNode
}

const Component: FC<Props> = ({ children }) => {
  const { authenticated } = useAuthenticatedStore()
  return (
    <>
      {/* <WagmiConfig client={wagmiClient}> */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={authenticated}
          >
            <RainbowKitProvider theme={rainbowkitCustomTheme}>
              {children}
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </QueryClientProvider>
      </WagmiProvider>
      {/* </WagmiConfig> */}
    </>
  )
}

export { Component as AuthenticationProvider }
