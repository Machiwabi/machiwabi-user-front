import { WaitingRewardEntity } from '../generated/graphql'
import { rewardMock, rewardMocks } from './reward.mock'

export const waitingRewardMock: WaitingRewardEntity = {
  reward: rewardMock,
  uniqueKey: 'uniqueKey',
  withdrawedTotalPoint: 0,
}

export const waitingRewardMocks: WaitingRewardEntity[] = [
  {
    reward: rewardMocks[0],
    uniqueKey: 'uniqueKey1',
    withdrawedTotalPoint: 0,
  },
  {
    reward: rewardMocks[2],
    uniqueKey: 'uniqueKey2',
    withdrawedTotalPoint: 0,
  },
  {
    reward: rewardMocks[2],
    uniqueKey: 'uniqueKey2',
    withdrawedTotalPoint: 0,
  },
  {
    reward: rewardMocks[3],
    uniqueKey: 'uniqueKey2',
    withdrawedTotalPoint: 0,
  },
  {
    reward: rewardMocks[6],
    uniqueKey: 'uniqueKey3',
    withdrawedTotalPoint: 0,
  },
  {
    reward: rewardMocks[9],
    uniqueKey: 'uniqueKey4',
    withdrawedTotalPoint: 0,
  },
]
