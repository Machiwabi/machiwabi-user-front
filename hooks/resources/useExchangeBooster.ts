import {
  ExchangeBoosterMutation,
  ExchangeBoosterMutationVariables,
  ExchangeBoosterWithMissionCouponMutationVariables,
  WaitingBoosterEntity,
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

  const exchangeBoosterWithMissionCoupon = async (
    variables: ExchangeBoosterWithMissionCouponMutationVariables
  ): Promise<WaitingBoosterEntity> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await WaitingBoosterRepository.exchangeWithMissionCoupon(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  return {
    exchangeBooster,
    exchangeBoosterWithMissionCoupon,
  }
}
