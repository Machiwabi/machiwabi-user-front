import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  AlreadyWaitingError,
  NotFoundError,
  NotSuitableEventError,
  NotSuitableUserError,
} from '../exceptions/exceptions'
import {
  CheckEventJoinableDocument,
  CheckEventJoinableQuery,
  CheckEventJoinableQueryVariables,
  EventDocument,
  EventEntity,
  EventQuery,
  EventQueryVariables,
  EventsDocument,
  EventsQuery,
} from '../generated/graphql'

const findAll = async (): Promise<EventEntity[]> => {
  const eventQuery = await graphqlApiClient().request<EventsQuery>(
    EventsDocument
  )
  return eventQuery.events
}

const findOne = async (
  variables: EventQueryVariables
): Promise<EventEntity> => {
  try {
    const eventQuery = await graphqlApiClient().request<EventQuery>(
      EventDocument,
      variables
    )

    return eventQuery.event
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('Project not found')
    throw e
  }
}

const isUserJoinable = async (
  variables: CheckEventJoinableQueryVariables,
  accessToken: string
): Promise<boolean> => {
  try {
    const query = await graphqlApiClient(
      accessToken
    ).request<CheckEventJoinableQuery>(CheckEventJoinableDocument, variables)

    return query.checkEventJoinable
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('Event not found')
    if (e.response.errors[0].extensions.code === 'ALREADY_WAITING_ERROR')
      throw new AlreadyWaitingError()
    if (e.response.errors[0].extensions.code === 'NOT_SUITABLE_EVENT_ERROR')
      throw new NotSuitableEventError()
    if (e.response.errors[0].extensions.code === 'NOT_SUITABLE_USER_ERROR')
      throw new NotSuitableUserError()

    throw e
  }
}

export const EventRepository = { findAll, findOne, isUserJoinable }
