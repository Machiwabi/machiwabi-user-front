import { RewardEntity, WaitingEntity } from '../../generated/graphql'
import { WaitingBoosterService } from './waiting-booster.service'
import { WaitingBoostersService } from './waiting-boosters.service'
import { WaitingRewardService } from './waiting-rewards.service'

export class WaitingService {
  constructor(private waiting: WaitingEntity) {}

  private waitingBoosterService = new WaitingBoosterService()
  private waitingBoostersService = new WaitingBoostersService()
  private waitingRewardService = new WaitingRewardService()

  // 現在の待機ポイント
  public waitingPoint(
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    const ceiledJoinAt = this._ceiledJoinAt()
    const ceiledStartAt = this._ceiledStartAt()

    let diffMiliseconds = 0
    // イベント開始前の場合はイベント開始日時までの待機時間を計算
    if (baseDate.getTime() > ceiledStartAt.getTime()) {
      diffMiliseconds = ceiledStartAt.getTime() - ceiledJoinAt.getTime()
    } else {
      diffMiliseconds = baseDate.getTime() - ceiledJoinAt.getTime()
    }

    const seconds = diffMiliseconds / 1000

    return Math.floor(seconds / this.waiting.secondsPerWaitingPoint)
  }

  // 現在のトータルポイント
  public totalPoint(
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    let boostedWaitingPoint = 0

    const ceiledStartAt = this._ceiledStartAt()

    // この変数の意図
    // baseDateが区切ったceiledStartAtとより後ろの場合は、ceiledStartAtを基準にする
    // そうではなく、baseDateがceiledStartAtと同じ場合は、切り下げになってしまうのでそのまま出力する
    const adjustedBaseDate =
      baseDate.getTime() > ceiledStartAt.getTime() ? ceiledStartAt : baseDate

    for (const waitingBooster of this.waiting.waitingBoosters) {
      if (!waitingBooster.enabled) continue
      boostedWaitingPoint += this.waitingBoosterService.boostedPoint(
        waitingBooster,
        this.waiting.secondsPerWaitingPoint,
        adjustedBaseDate
      )
    }

    const usedTotalPoint = this.waitingRewardService.usedTotalPoint(
      this.waiting.waitingRewards
    )

    return this.waitingPoint() + boostedWaitingPoint - usedTotalPoint
  }

  // 現在の単位時間においての獲得可能なポイント
  public earnableTotalPoint(
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    const baseDateTotalPoint = this.totalPoint(baseDate)

    const nextDateTotalPoint = this.totalPoint(
      new Date(baseDate.getTime() + this.waiting.secondsPerWaitingPoint * 1000) // 10秒後
    )

    return nextDateTotalPoint - baseDateTotalPoint + 1
  }

  public waitingCounterBgImageUrl() {
    return this.waiting.waitingCounter?.bgImageUrl
  }

  public isWaitingCounterBgDisplayable() {
    // return true
    if (!this.waiting.waitingCounter || !this.waiting.waitingCounter.bgImageUrl)
      return false

    return new Date(this.waiting.waitingCounter.bgExpiresAt) > new Date()
  }

  public waitingCounterWaitableMs() {
    console.log('waoo1o', this.waiting.waitingCounter)
    if (
      !this.waiting.waitingCounter ||
      !this.waiting.waitingCounter.bgExpiresAt
    )
      return 0
    return (
      new Date(this.waiting.waitingCounter.bgExpiresAt).getTime() -
      new Date(this.waiting.waitingCounter.updatedAt).getTime()
    )
  }

  public waitingCounterWaitedMs() {
    console.log('waooo2', this.waiting.waitingCounter)
    if (!this.waiting.waitingCounter) return 0
    return (
      new Date().getTime() -
      new Date(this.waiting.waitingCounter.updatedAt).getTime()
    )
  }

  // 現時点での数字を元に、目標のポイントまでの秒数を返す
  // WIP
  public remainingSecondsToGoalTotalPoint(goalTotalPoint: number) {
    // const currentTotalPoint = this.totalPoint()
    // if (currentTotalPoint >= goalTotalPoint) return 0
    // let leftEarnablePoint = 0
    // for (const waitingBooster of this.waiting.waitingBoosters) {
    //   leftEarnablePoint += this.waitingBoosterService.leftEarnablePoint(
    //     waitingBooster,
    //     this.waiting.secondsPerWaitingPoint
    //   )
    // }
    // const leftPoint = goalTotalPoint - currentTotalPoint + leftEarnablePoint
    // return remainingPoint * this.waiting.secondsPerWaitingPoint
  }

  // 待った時間
  public waitedMs(
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    const startAt = new Date(this.waiting.event.startAt)
    const joinAt = new Date(this.waiting.joinAt)
    if (baseDate.getTime() > startAt.getTime()) {
      return this.waitableMs()
    } else {
      return baseDate.getTime() - joinAt.getTime()
    }
  }

  // 残り時間
  public remainingMs(
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    const startAt = new Date(this.waiting.event.startAt)
    if (baseDate.getTime() > startAt.getTime()) {
      return 0
    } else {
      return startAt.getTime() - baseDate.getTime()
    }
  }

  // 待つ必要がある時間
  public waitableMs() {
    return (
      new Date(this.waiting.event.startAt).getTime() -
      new Date(this.waiting.joinAt).getTime()
    )
  }

  // 次のポイント獲得秒までに対して、すでにどれくらい経過しているか
  // -----|-----|-----|-----|... という単位で|でポイントが獲得されるとして、
  // -----|-- と経過していたら
  // -- を返す
  public offsetMs() {
    const flooredWaitedMs =
      Math.floor(
        this.waitedMs() / (this.waiting.secondsPerWaitingPoint * 1000)
      ) *
      (this.waiting.secondsPerWaitingPoint * 1000)

    return this.waitedMs() - flooredWaitedMs
  }

  // ブースターによって追加されているポイントを返す
  public addableSumPoint() {
    return this.waitingBoostersService.addableSumPoint(
      this.waiting.waitingBoosters
    )
  }

  // 現在有効なブースターを返す
  public enableBoosters() {
    return this.waitingBoostersService.enableBoosters(
      this.waiting.waitingBoosters
    )
  }

  // 現在ブーストしているかどうか
  public isBoosting() {
    const boosters = this.waitingBoostersService.enableBoosters(
      this.waiting.waitingBoosters
    )

    return boosters.length > 0
  }

  // TODO viewModelがやること
  public enableBoostersEmojis(displayableCount: number = 3) {
    const emojis = this.enableBoosters().map(
      (waitingBooster) => waitingBooster.booster.emoji
    )

    return emojis.slice(0, displayableCount)
  }

  // TODO rewardServiceがやることかもしれない
  public rewardClaimable(reward: RewardEntity) {
    const totalPointEnable = reward.requiredTotalPoint
      ? reward.requiredTotalPoint <= this.totalPoint()
      : true

    const waitingPointEnable = reward.requiredWaitingPoint
      ? reward.requiredWaitingPoint <= this.waitingPoint()
      : true

    return totalPointEnable && waitingPointEnable
  }

  private _ceiledJoinAt(): Date {
    return new Date(
      Math.ceil(
        new Date(this.waiting.joinAt).getTime() /
          (this.waiting.secondsPerWaitingPoint * 1000)
      ) *
        (this.waiting.secondsPerWaitingPoint * 1000)
    )
  }

  // TODO これはEventServiceに移動するかも
  private _ceiledStartAt(): Date {
    return new Date(
      Math.ceil(
        new Date(this.waiting.event.startAt).getTime() /
          (this.waiting.secondsPerWaitingPoint * 1000)
      ) *
        (this.waiting.secondsPerWaitingPoint * 1000)
    )
  }
}
