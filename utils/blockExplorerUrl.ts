import { BLOCKCHAIN_NETWORKS } from '../constants/blockchainNetworks'

export const blockExplorerUrl = (
  chainId: number,
  payload:
    | {
        type: 'address'
        address: string
      }
    | {
        type: 'token'
        address?: string
        tokenId: string
      }
    | {
        type: 'tx'
        hash: string
      }
    | {
        type: 'top'
      }
) => {
  const blockchainNetwork = BLOCKCHAIN_NETWORKS[chainId]

  if (!blockchainNetwork) {
    return ''
  }

  if (payload.type === 'address') {
    return `${blockchainNetwork.url}${blockchainNetwork.addressPath?.replace(
      '__ADDR__',
      payload.address
    )}#nfttransfers`
  }

  if (payload.type === 'token') {
    return `${blockchainNetwork.url}${blockchainNetwork.tokenPath
      ?.replace('__ADDR__', `${payload.address}`)
      .replace('__TOKEN__', payload.tokenId)}`
  }
  if (payload.type === 'tx') {
    return `${blockchainNetwork.url}${blockchainNetwork.txPath?.replace(
      '__HASH__',
      `${payload.hash}`
    )}`
  }

  return ''
}
