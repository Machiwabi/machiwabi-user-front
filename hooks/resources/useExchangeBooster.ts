import {
  ExchangeBoosterMutation,
  ExchangeBoosterMutationVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingBoosterRepository } from '../../repositories/WaitingBoosterRepository'

export const useExchangeBooster = () => {
  const exchangeBooster = async (
    variables: ExchangeBoosterMutationVariables
  ): Promise<ExchangeBoosterMutation> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await WaitingBoosterRepository.exchange(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  return {
    exchangeBooster,
  }
}
