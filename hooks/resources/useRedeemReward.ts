import useSWR from 'swr'
import {
  RedeemRewardMutation,
  RedeemRewardMutationVariables,
  RewardRedeemableQueryVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRewardRepository } from '../../repositories/WaitingRewardRepository'

export const useRedeemReward = (variables: RewardRedeemableQueryVariables) => {
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

  return {
    isRewardRedeemable: data,
    isRewardRedeemableError: error,
    isRewardRedeemableIsLoading: isLoading,
    redeemReward,
  }
}
