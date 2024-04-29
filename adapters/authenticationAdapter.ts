import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { getNonce } from '../usecases/authentication/getNonce'
import { signOutEoa } from '../usecases/authentication/signOutEoa'
import { verifyEoa } from '../usecases/authentication/verifyEoa'

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    return await getNonce()
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: process.env.NEXT_PUBLIC_HOSTING_DOMAIN,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: process.env.NEXT_PUBLIC_HOSTING_URL,
      version: '1',
      chainId,
      nonce,
    })
  },
  getMessageBody: ({ message }) => {
    return message.prepareMessage()
  },
  verify: async ({ message, signature }) => {
    return await verifyEoa(message, signature)
  },
  signOut: async () => {
    return await signOutEoa()
  },
})

export { authenticationAdapter }
