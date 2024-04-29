import useSWR from 'swr'
import { WaitingsQuery } from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRepository } from '../../repositories/WaitingRepository'

export const useWaitings = () => {
  const { data, error, isLoading } = useSWR<WaitingsQuery>(
    'WaitingsDocument',
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRepository.findMany(`${secretJwt?.accessToken}`)
    }
  )

  return {
    waitings: data?.waitings,
    waitingsError: error,
    waitingsIsLoading: isLoading,
  }
}
