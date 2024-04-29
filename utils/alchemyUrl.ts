import { applicationProperties } from '../constants/applicationProperties'

export const getAlchemyUrlFromChainNumber = (chainNumber: number) => {
  const alchemyApiKey = applicationProperties.ALCHEMY.API_KEY
  switch (chainNumber) {
    case 1:
      return `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    case 5:
      return `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`
    case 137:
      return `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    case 80001:
      return `https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`
    case 11155111:
      return `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`
    default:
      throw new Error(`Chain number ${chainNumber} not supported`)
  }
}
