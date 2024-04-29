import useSWR from 'swr'
import { RewardsQuery, RewardsQueryVariables } from '../../generated/graphql'
import { RewardRepository } from '../../repositories/RewardRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useRewards = (variables: RewardsQueryVariables) => {
  const { data, error, isLoading } = useSWR<RewardsQuery>(
    ['RewardDocuments', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return RewardRepository.findMany(variables, `${secretJwt?.accessToken}`)
    }
  )

  return {
    rewards: data?.rewards,
    rewardsError: error,
    rewardsIsLoading: isLoading,
  }
}
