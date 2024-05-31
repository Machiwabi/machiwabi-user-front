import { WaitingBoosterEntity } from '../../generated/graphql'

export class WaitingBoosterService {
  // 指定した日時においてのポイントの増加量を返す
  public boostedPoint(
    waitingWithBooster: WaitingBoosterEntity,
    secondsPerWaitingPoint: number,
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    if (waitingWithBooster.startAt > baseDate) return 0

    // secondsPerWaiting秒ごとに切り上げる
    // waitingBooster.endAtのタイミングはバラバラなので
    // secondsPerWaitingの区切りを位置させるためにこのような処理をしている
    const ceiledEndAt = new Date(
      Math.ceil(
        new Date(waitingWithBooster.endAt).getTime() /
          (secondsPerWaitingPoint * 1000)
      ) *
        (secondsPerWaitingPoint * 1000)
    )
    const ceiledStartAt = new Date(
      Math.ceil(
        new Date(waitingWithBooster.startAt).getTime() /
          (secondsPerWaitingPoint * 1000)
      ) *
        (secondsPerWaitingPoint * 1000)
    )

    let diffMiliseconds = 0

    if (ceiledEndAt > baseDate) {
      diffMiliseconds = baseDate.getTime() - ceiledStartAt.getTime()
    } else {
      diffMiliseconds = ceiledEndAt.getTime() - ceiledStartAt.getTime()
    }

    const seconds = diffMiliseconds / 1000

    const baseWaitingPoint = Math.floor(seconds / secondsPerWaitingPoint)

    // multiplierは加算分の倍数ではなく、本来のwaitingPointの増加分(例1.x)倍の数字なので
    // 1を引いた値をかける
    const multipliedWaitingPoint = Math.floor(
      baseWaitingPoint * (waitingWithBooster.multiplier - 1)
    )

    return multipliedWaitingPoint
  }

  // baseDateを基準に残りの取得できるポイントを返す
  // TODO waitingの終了時間が加味されていない
  public leftEarnablePoint(
    waitingWithBooster: WaitingBoosterEntity,
    secondsPerWaitingPoint: number,
    baseDate: Date = new Date() // 指定がない場合は現在日時
  ) {
    if (waitingWithBooster.endAt < baseDate) return 0

    // secondsPerWaiting秒ごとに切り上げる
    // waitingBooster.endAtのタイミングはバラバラなので
    // secondsPerWaitingの区切りを位置させるためにこのような処理をしている
    const ceiledEndAt = new Date(
      Math.ceil(
        new Date(waitingWithBooster.endAt).getTime() /
          (secondsPerWaitingPoint * 1000)
      ) *
        (secondsPerWaitingPoint * 1000)
    )
    const ceiledStartAt = new Date(
      Math.ceil(
        new Date(waitingWithBooster.startAt).getTime() /
          (secondsPerWaitingPoint * 1000)
      ) *
        (secondsPerWaitingPoint * 1000)
    )

    let diffMiliseconds = 0

    if (baseDate > ceiledStartAt) {
      diffMiliseconds = ceiledEndAt.getTime() - baseDate.getTime()
    } else {
      diffMiliseconds = ceiledEndAt.getTime() - ceiledStartAt.getTime()
    }

    const seconds = diffMiliseconds / 1000

    const baseWaitingPoint = Math.floor(seconds / secondsPerWaitingPoint)

    // multiplierは加算分の倍数ではなく、本来のwaitingPointの増加分(例1.x)倍の数字なので
    // 1を引いた値をかける
    const multipliedWaitingPoint = Math.floor(
      baseWaitingPoint * (waitingWithBooster.multiplier - 1)
    )

    return multipliedWaitingPoint
  }
}
