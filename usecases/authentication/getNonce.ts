import { SiweNonceRepository } from '../../repositories/SiweNonceRepository'

export const getNonce = async (): Promise<string> => {
  try {
    const result = await SiweNonceRepository.challange()
    return result
  } catch (e) {
    throw e
  }
}
