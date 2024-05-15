import { WaitingRewardEntity } from '../generated/graphql'
import { rewardMock } from './reward.mock'

export const waitingRewardMock: WaitingRewardEntity = {
  reward: rewardMock,
  uniqueKey: 'uniqueKey',
  withdrawedTotalPoint: 0,
}
