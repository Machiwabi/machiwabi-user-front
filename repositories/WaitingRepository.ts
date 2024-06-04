import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { NotFoundError } from '../exceptions/exceptions'
import {
  WaitingDocument,
  WaitingEntity,
  WaitingQuery,
  WaitingQueryVariables,
  WaitingSiblingsDocument,
  WaitingSiblingsQuery,
  WaitingSiblingsQueryVariables,
  WaitingsAllDocument,
  WaitingsAllQuery,
  WaitingsDocument,
  WaitingsQuery,
} from '../generated/graphql'

const all = async (): Promise<WaitingEntity[]> => {
  const waitingsAllQuery = await graphqlApiClient().request<WaitingsAllQuery>(
    WaitingsAllDocument
  )

  return waitingsAllQuery.waitingsAll
}

const findMany = async (accessToken: string): Promise<WaitingEntity[]> => {
  const waitingsQuery = await graphqlApiClient(
    accessToken
  ).request<WaitingsQuery>(WaitingsDocument)

  return waitingsQuery.waitings
}

const findOne = async (
  variables: WaitingQueryVariables
): Promise<WaitingEntity> => {
  try {
    const waitingQuery = await graphqlApiClient().request<WaitingQuery>(
      WaitingDocument,
      variables
    )

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

export const WaitingRepository = { all, findMany, findOne, siblings }
