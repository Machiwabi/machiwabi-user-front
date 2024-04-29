import useSWR from 'swr'
import { EventsQuery } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'

export const useEvents = () => {
  const { data, error, isLoading } = useSWR<EventsQuery>(
    ['EventsDocument'],
    async () => {
      return EventRepository.findAll()
    }
  )

  return {
    events: data?.events,
    eventsError: error,
    eventsIsLoading: isLoading,
  }
}
