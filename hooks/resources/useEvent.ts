import useSWR from 'swr'
import { EventQuery, EventQueryVariables } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'

export const useEvent = (variables: EventQueryVariables) => {
  const { data, error, isLoading } = useSWR<EventQuery>(
    ['EventDocument', variables],
    async () => {
      return EventRepository.findOne(variables)
    }
  )

  return {
    event: data?.event,
    eventError: error,
    eventIsLoading: isLoading,
  }
}
