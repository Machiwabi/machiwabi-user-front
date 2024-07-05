import { RestApiClient } from '../apis/RestApiClient'
import { CreateUserDeviceInput, UserDeviceEntity } from '../generated/rest-api'

const create = async (
  input: CreateUserDeviceInput,
  accessToken: string
): Promise<UserDeviceEntity> => {
  const client = new RestApiClient()
  try {
    const result = await client.userDevice.create(input, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const userDevice: UserDeviceEntity = result.data

    return userDevice
  } catch (e) {
    throw e
  }
}

export const UserDeviceRepository = {
  create,
}
