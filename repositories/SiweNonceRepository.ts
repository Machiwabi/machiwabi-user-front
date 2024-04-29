import { RestApiClient } from '../apis/RestApiClient'

const challange = async (): Promise<string> => {
  const client = new RestApiClient()

  const result: any = await client.authentication.challenge({
    withCredentials: true,
  })
  const { nonce }: { nonce: string } = result.data

  if (!nonce) {
    throw new Error('Failed to get nonce.')
  } else {
    return nonce
  }
}

export const SiweNonceRepository = {
  challange,
}
