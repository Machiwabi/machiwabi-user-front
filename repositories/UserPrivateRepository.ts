import { graphqlApiClient } from '../apis/GraphqlApiClient'
import { UpsertUserDocument, UpsertUserMutation } from '../generated/graphql'

const upsert = async (secretJwt: string): Promise<UpsertUserMutation> => {
  return await graphqlApiClient(secretJwt).request<UpsertUserMutation>(
    UpsertUserDocument
  )
}

export const UserPrivateRepository = { upsert }
