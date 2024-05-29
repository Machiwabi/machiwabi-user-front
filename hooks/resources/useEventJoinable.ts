import useSWR from 'swr'
import { CheckEventJoinableQueryVariables } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useEventJoinable = (
  variables: CheckEventJoinableQueryVariables
) => {
  const { data, error, isLoading } = useSWR<boolean>(
    ['CheckEventJoinableDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      const event = await EventRepository.isUserJoinable(
        variables,
        `${secretJwt?.accessToken}`
      )

      return event
    }
  )

  return {
    isUserJoinable: data,
    isUserJoiableError: error,
    isUserJoinableEventIsLoading: isLoading,
  }
}
