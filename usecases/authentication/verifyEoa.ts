import { SiweMessage } from 'siwe'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const verifyEoa = async (message: SiweMessage, signature: string) => {
  const siweJwt = await SiweJwtRepository.login(message, signature)
  await SiweJwtRepository.saveSiweJwtToBrowser(siweJwt)

  return Boolean(siweJwt)
}
