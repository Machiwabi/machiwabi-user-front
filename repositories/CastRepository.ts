import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { NotFoundError } from '../exceptions/exceptions'
import {
  CastDocument,
  CastEntity,
  CastQuery,
  CastQueryVariables,
  CastsDocument,
  CastsQuery,
  CastsQueryVariables,
} from '../generated/graphql'

const findOne = async (variables: CastQueryVariables): Promise<CastEntity> => {
  try {
    const castQuery = await graphqlApiClient().request<CastQuery>(
      CastDocument,
      variables
    )

    return castQuery.cast
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('Cast not found')
    throw e
  }
}

const findAll = async (): Promise<CastEntity[]> => {
  const castQuery = await graphqlApiClient().request<CastsQuery>(CastsDocument)

  return castQuery.casts
}

export const CastRepository = { findOne, findAll }
