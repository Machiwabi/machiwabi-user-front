import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const signOutEoa = async () => {
  await SiweJwtRepository.removeSiweJwtFromBrowser()
}
