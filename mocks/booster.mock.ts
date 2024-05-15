import { BoosterEntity, BoosterType } from '../generated/graphql'

export const boosterMock: BoosterEntity = {
  boosterType: BoosterType.Mission,
  durationSeconds: 0,
  emoji: 'emoji',
  multiplier: 0,
  name: 'name',
  uniqueKey: 'uniqueKey',
}
