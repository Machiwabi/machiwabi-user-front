import useSWR from 'swr'
import {
  WaitingSiblingsQuery,
  WaitingSiblingsQueryVariables,
} from '../../generated/graphql'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaitingSiblings = (
  variables: WaitingSiblingsQueryVariables
) => {
  const { data, error, isLoading } = useSWR<WaitingSiblingsQuery>(
    ['WaitingSiblingsDocument', variables],
    async () => {
      return WaitingRepository.siblings(variables)
    }
  )

  return {
    waitingSiblings: data?.waitingSiblings,
    waitingSiblingError: error,
    waitingSiblingsIsLoading: isLoading,
  }
}
