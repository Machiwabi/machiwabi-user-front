export type BlockchainNetworks = {
  [chainId: number]: {
    name: string
    logoUri: string
    explorerName: string
    url: string
    testnet: boolean
    addressPath?: string
    tokenPath?: string
    txPath?: string
    openseaUrl?: string
    openseaContractPath?: string
    openseaTokenPath?: string
  }
}
