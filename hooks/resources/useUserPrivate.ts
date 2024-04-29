import { UserPrivateRepository } from '../../repositories/UserPrivateRepository'

export const useUserPrivate = () => {
  const upsertUser = async (secretJwt: string) => {
    return await UserPrivateRepository.upsert(secretJwt)
  }

  return { upsertUser }
}
