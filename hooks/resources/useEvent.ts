import useSWR from 'swr'
import { EventEntity, EventQueryVariables } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'

export const useEvent = (variables: EventQueryVariables) => {
  const { data, error, isLoading } = useSWR<EventEntity>(
    ['EventDocument', variables],
    async () => {
      return EventRepository.findOne(variables)
    }
  )

  return {
    event: data,
    eventError: error,
    eventIsLoading: isLoading,
  }
}
