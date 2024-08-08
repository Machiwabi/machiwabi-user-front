import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { NotFoundError } from '../exceptions/exceptions'
import {
  CastDocument,
  CastEntity,
  CastQuery,
  CastQueryVariables,
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

export const CastRepository = { findOne }
