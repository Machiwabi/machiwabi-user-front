import {
  ExchangeRewardMutation,
  ExchangeRewardMutationVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRewardRepository } from '../../repositories/WaitingRewardRepository'

export const useExchangeReward = () => {
  const exchangeReward = async (
    variables: ExchangeRewardMutationVariables
  ): Promise<ExchangeRewardMutation> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await WaitingRewardRepository.exchange(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  return {
    exchangeReward,
  }
}
