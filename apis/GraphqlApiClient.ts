import { GraphQLClient } from 'graphql-request'
import { applicationProperties } from '../constants/applicationProperties'

export const graphqlApiClient = (secretJwt?: string) => {
  const headers = secretJwt
    ? {
        authorization: `Bearer ${secretJwt}`,
      }
    : undefined

  return new GraphQLClient(applicationProperties.API_GQL_URL, {
    method: 'POST',
    headers,
  })
}
