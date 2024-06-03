import useSWR from 'swr'
import {
  LatestWaitingBoosterQueryVariables,
  WaitingBoosterEntity,
} from '../../generated/graphql'
import { WaitingBoosterRepository } from '../../repositories/WaitingBoosterRepository'

export const useLatestWaitingBooster = (
  variables: LatestWaitingBoosterQueryVariables
) => {
  const { data, error, isLoading } = useSWR<
    WaitingBoosterEntity | null | undefined
  >(['LatestWaitingBoosterDocument', variables], async () => {
    return await WaitingBoosterRepository.latestWaitingBooster(variables)
  })

  return {
    latestWaitingBooster: data,
    latestWaitingBoosterError: error,
    latestWaitingBoosterIsLoading: isLoading,
  }
}
