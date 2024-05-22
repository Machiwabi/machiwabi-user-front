import useSWR from 'swr'
import { WaitingEntity } from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaitings = () => {
  const { data, error, isLoading } = useSWR<WaitingEntity[]>(
    'WaitingsDocument',
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRepository.findMany(`${secretJwt?.accessToken}`)
    }
  )

  return {
    waitings: data,
    waitingsError: error,
    waitingsIsLoading: isLoading,
  }
}
