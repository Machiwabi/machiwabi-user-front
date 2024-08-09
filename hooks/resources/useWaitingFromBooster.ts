import useSWR from 'swr'
import {
  WaitingEntity,
  WaitingFromBoosterQueryVariables,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaitingFromBooster = (
  variables: WaitingFromBoosterQueryVariables
) => {
  const { data, error, isLoading } = useSWR<WaitingEntity | null>(
    ['WaitingFromBoosterDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRepository.findByBooster(
        variables,
        `${secretJwt?.accessToken}`
      )
    }
  )

  return {
    waiting: data,
    waitingError: error,
    waitingIsLoading: isLoading,
  }
}
