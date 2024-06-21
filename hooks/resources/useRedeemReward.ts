import useSWR from 'swr'
import {
  RedeemRewardMutation,
  RedeemRewardMutationVariables,
  RewardRedeemableQueryVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRewardRepository } from '../../repositories/WaitingRewardRepository'
import { useEffect, useState } from 'react'

export const useRedeemReward = (variables: RewardRedeemableQueryVariables) => {
  const [errorType, setErrorType] = useState<string | undefined>()

  const { data, error, isLoading } = useSWR<boolean>(
    ['RewardRedeemableDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRewardRepository.isRedeemable(
        variables,
        `${secretJwt?.accessToken}`
      )
    }
  )
  const redeemReward = async (
    variables: RedeemRewardMutationVariables
  ): Promise<RedeemRewardMutation> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await WaitingRewardRepository.redeem(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  useEffect(() => {
    if (!error) return
    if (`${error}`.includes('NotFoundError')) {
      setErrorType('NotFoundError')
    } else if (`${error}`.includes('NotEnoughTotalPointError')) {
      setErrorType('NotEnoughTotalPointError')
    } else if (`${error}`.includes('NotEnoughWaitingPointError')) {
      setErrorType('NotEnoughWaitingPointError')
    } else if (`${error}`.includes('RewardOutOfStockError')) {
      setErrorType('RewardOutOfStockError')
    } else if (`${error}`.includes('RewardOutOfStockPerWaitingError')) {
      setErrorType('RewardOutOfStockPerWaitingError')
    } else if (`${error}`.includes('RedeemNotStartedError')) {
      setErrorType('RedeemNotStartedError')
    } else if (`${error}`.includes('RedeemEndedError')) {
      setErrorType('RedeemEndedError')
    } else {
      setErrorType(`UnknownError ${error}`)
    }
  }, [error])

  return {
    isRewardRedeemable: data,
    isRewardRedeemableError: error,
    isRewardRedeemableIsLoading: isLoading,
    redeemRewardErrorType: errorType,
    redeemReward,
  }
}
