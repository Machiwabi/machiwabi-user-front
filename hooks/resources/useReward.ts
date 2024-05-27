import useSWR from 'swr'
import { RewardEntity, RewardQueryVariables } from '../../generated/graphql'
import { RewardRepository } from '../../repositories/RewardRepository'

export const useReward = (variables: RewardQueryVariables) => {
  const { data, error, isLoading } = useSWR<RewardEntity>(
    ['RewardDocument', variables],
    async () => {
      return RewardRepository.findOne(variables)
    }
  )

  return {
    reward: data,
    rewardError: error,
    rewardIsLoading: isLoading,
  }
}
