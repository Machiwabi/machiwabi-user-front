import useSWR from 'swr'
import { EventEntity, EventsQuery } from '../../generated/graphql'
import { EventRepository } from '../../repositories/EventRepository'

export const useEvents = () => {
  const { data, error, isLoading } = useSWR<EventEntity[]>(
    ['EventsDocument'],
    async () => {
      return EventRepository.findAll()
    }
  )

  return {
    events: data,
    eventsError: error,
    eventsIsLoading: isLoading,
  }
}
