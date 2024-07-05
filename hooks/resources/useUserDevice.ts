import {
  CreateUserDeviceInput,
  UserDeviceEntity,
} from '../../generated/rest-api'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { UserDeviceRepository } from '../../repositories/UserDeviceRepository'

export const useCreateUserDevice = () => {
  const createUserDevice = async (
    input: CreateUserDeviceInput
  ): Promise<UserDeviceEntity> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await UserDeviceRepository.create(input, `${secretJwt?.accessToken}`)
  }

  return { createUserDevice }
}
