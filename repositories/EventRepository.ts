import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { NotFoundError } from '../exceptions/exceptions'
import {
  EventDocument,
  EventQuery,
  EventQueryVariables,
  EventsDocument,
  EventsQuery,
} from '../generated/graphql'

const findAll = async (): Promise<EventsQuery> => {
  return await graphqlApiClient().request<EventsQuery>(EventsDocument)
}

const findOne = async (variables: EventQueryVariables): Promise<EventQuery> => {
  try {
    return await graphqlApiClient().request<EventQuery>(
      EventDocument,
      variables
    )
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('Project not found')

    throw e
  }
}

export const EventRepository = { findAll, findOne }
