import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { CheckEventJoinableQueryVariables } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useEventJoinable = (
  variables: CheckEventJoinableQueryVariables
) => {
  const [errorType, setErrorType] = useState<string | undefined>()

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

  useEffect(() => {
    if (!error) return
    if (`${error}`.includes('AlreadyWaitingError')) {
      setErrorType('AlreadyWaitingError')
    } else if (`${error}`.includes('NotFoundError')) {
      setErrorType('NotFoundError')
    } else if (`${error}`.includes('NotSuitableEventError')) {
      setErrorType('NotSuitableEventError')
    } else if (`${error}`.includes('NotSuitableUserError')) {
      setErrorType('NotSuitableUserError')
    } else {
      setErrorType(`UnknownError ${error}`)
    }
  }, [error])

  return {
    isUserJoinable: data,
    isUserJoiableError: error,
    isUserJoinableErrorType: errorType,
    isUserJoinableEventIsLoading: isLoading,
  }
}
