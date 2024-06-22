import { WaitingRewardEntity } from '../../generated/graphql'

export class WaitingRewardService {
  public usedTotalPoint(waitingRewards: WaitingRewardEntity[]) {
    return waitingRewards
      .map((transaction) => {
        return transaction.withdrawedTotalPoint
      })
      .reduce((acc, cur) => acc + cur, 0)
  }

  public redeemable(waitingReward: WaitingRewardEntity) {}
}
