import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
  UserPrivateDocument,
  UserPrivateEntity,
  UserPrivateQuery,
} from '../generated/graphql'

const findOneByJwt = async (secretJwt: string): Promise<UserPrivateEntity> => {
  const userPrivateQuery = await graphqlApiClient(
    secretJwt
  ).request<UserPrivateQuery>(UserPrivateDocument)

  return userPrivateQuery.userPrivate
}

const upsert = async (
  secretJwt: string,
  variables?: UpsertUserMutationVariables
): Promise<UpsertUserMutation> => {
  return await graphqlApiClient(secretJwt).request<UpsertUserMutation>(
    UpsertUserDocument,
    variables
  )
}

export const UserPrivateRepository = { findOneByJwt, upsert }
