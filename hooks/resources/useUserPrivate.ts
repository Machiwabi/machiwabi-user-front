import useSWR from 'swr'
import {
  UpsertUserMutationVariables,
  UserPrivateEntity,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { UserPrivateRepository } from '../../repositories/UserPrivateRepository'

export const useUserPrivate = () => {
  const { data, error, isLoading } = useSWR<UserPrivateEntity>(
    ['UserPrivateDocument'],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return UserPrivateRepository.findOneByJwt(`${secretJwt?.accessToken}`)
    }
  )

  const upsertUser = async (variables?: UpsertUserMutationVariables) => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
    return await UserPrivateRepository.upsert(
      `${secretJwt?.accessToken}`,
      variables
    )
  }

  return {
    userPrivate: data,
    userPrivateError: error,
    userPrivateIsLoading: isLoading,
    upsertUser,
  }
}
