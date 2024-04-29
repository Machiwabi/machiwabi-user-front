import useSWR from 'swr'
import { WaitingEntity, WaitingQueryVariables } from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaiting = (variables: WaitingQueryVariables) => {
  const { data, error, isLoading } = useSWR<WaitingEntity>(
    ['WaitingDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRepository.findOne(variables, `${secretJwt?.accessToken}`)
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
