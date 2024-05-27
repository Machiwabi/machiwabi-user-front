import useSWR from 'swr'
import { BoosterEntity, BoosterQueryVariables } from '../../generated/graphql'
import { BoosterRepository } from '../../repositories/BoosterRepository'

export const useBooster = (variables: BoosterQueryVariables) => {
  const { data, error, isLoading } = useSWR<BoosterEntity>(
    ['BoosterDocument', variables],
    async () => {
      return BoosterRepository.findOne(variables)
    }
  )

  return {
    booster: data,
    boosterError: error,
    boosterIsLoading: isLoading,
  }
}
