import { WaitingBoosterEntity } from '../generated/graphql'
import { boosterMock } from './booster.mock'

export const waitingBoosterMock: WaitingBoosterEntity = {
  booster: boosterMock,
  endAt: '2021-08-01T00:00:00Z',
  startAt: '2021-08-01T00:00:00Z',
  uniqueKey: 'uniqueKey',
}
