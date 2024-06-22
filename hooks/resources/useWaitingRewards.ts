import useSWR from 'swr'
import {
  WaitingRewardEntity,
  WaitingRewardsByRewardQueryVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRewardRepository } from '../../repositories/WaitingRewardRepository'

export const useWaitingRewards = (
  variables: WaitingRewardsByRewardQueryVariables
) => {
  const { data, error, isLoading } = useSWR<WaitingRewardEntity[]>(
    ['WaitingRewardsByRewardDocument'],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRewardRepository.findManyBy(
        variables,
        `${secretJwt?.accessToken}`
      )
    }
  )

  return {
    waitingRewards: data,
    waitingRewardsError: error,
    waitingRewardsIsLoading: isLoading,
  }
}
