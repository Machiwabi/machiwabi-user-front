import useSWR from 'swr'
import {
  BoosterUseableDurationEntity,
  BoosterUseableDurationQueryVariables,
} from '../../generated/graphql'
import { BoosterUseableDurationRepository } from '../../repositories/BoosterUseableDurationRepository'

export const useBoosterUseableDuration = (
  variables: BoosterUseableDurationQueryVariables
) => {
  const { data, error, isLoading } = useSWR<BoosterUseableDurationEntity>(
    ['BoosterUseableDurationDocument', variables],
    async () => {
      return BoosterUseableDurationRepository.find(variables)
    }
  )

  return {
    boosterUseableDuration: data,
    boosterUseableDurationError: error,
    boosterUseableDurationIsLoading: isLoading,
  }
}
