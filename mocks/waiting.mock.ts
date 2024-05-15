import { WaitingEntity } from '../generated/graphql'
import { eventMock } from './event.mock'
import { userPublicMock } from './userPublic.mock'
import { waitingBoosterMock } from './waitingBooster.mock'
import { waitingRewardMock } from './waitingReward.mock'

export const waitingMock: WaitingEntity = {
  event: eventMock,
  joinAt: '2021-08-01T00:00:00Z',
  remainingEventStartDuration: 0,
  secondPerTotalPoint: 4,
  secondsPerWaitingPoint: 5,
  totalPoint: 1239102,
  totalPointMultiplier: 3,
  uniqueKey: 'uniqueKey',
  user: userPublicMock,
  waitingBoosters: [waitingBoosterMock],
  waitingDuration: 2000,
  waitingMessage: 'waitingMessage',
  waitingName: 'waitingName',
  waitingPoint: 1239102,
  waitingRewards: [waitingRewardMock],
}
