import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { NotFoundError } from '../exceptions/exceptions'
import {
  WaitingBoosterEntity,
  WaitingDocument,
  WaitingEntity,
  WaitingQuery,
  WaitingQueryVariables,
  WaitingRewardEntity,
  WaitingSiblingsDocument,
  WaitingSiblingsQuery,
  WaitingSiblingsQueryVariables,
  WaitingsDocument,
  WaitingsQuery,
} from '../generated/graphql'

const findMany = async (accessToken: string): Promise<WaitingsQuery> => {
  return await graphqlApiClient(accessToken).request<WaitingsQuery>(
    WaitingsDocument
  )
}

const findOne = async (
  variables: WaitingQueryVariables,
  accessToken: string
): Promise<WaitingEntity> => {
  try {
    const waitingQuery = await graphqlApiClient(
      accessToken
    ).request<WaitingQuery>(WaitingDocument, variables)

    return waitingQuery.waiting
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('Project not found')

    throw e
  }
}

const siblings = async (
  variables: WaitingSiblingsQueryVariables
): Promise<WaitingSiblingsQuery> => {
  return await graphqlApiClient().request<WaitingSiblingsQuery>(
    WaitingSiblingsDocument,
    variables
  )
}

export const WaitingRepository = { findMany, findOne, siblings }
