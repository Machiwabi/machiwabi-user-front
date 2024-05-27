import useSWR from 'swr'
import { WaitingEntity, WaitingQueryVariables } from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaiting = (variables: WaitingQueryVariables) => {
  const { data, error, isLoading } = useSWR<WaitingEntity>(
    ['WaitingDocument', variables],
    async () => {
      return WaitingRepository.findOne(variables)
    }
    // {
    //   refreshInterval: 6000,
    // }
  )

  return {
    waiting: data,
    waitingError: error,
    waitingIsLoading: isLoading,
  }
}
