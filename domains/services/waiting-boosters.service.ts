import { WaitingBoosterEntity } from '../../generated/graphql'

export class WaitingBoostersService {
  public addableSumPoint(waitingBoosters: WaitingBoosterEntity[]) {
    const waitingBoosterMultipliers = waitingBoosters
      .filter((waitingBooster) => waitingBooster.enabled) // TODO ドメイン分離
      .filter((waitingBooster) => {
        return new Date(waitingBooster.endAt).getTime() > new Date().getTime()
      })
      .map((waitingBooster) => {
        return waitingBooster.multiplier - 1
      })

    if (waitingBoosterMultipliers.length > 0) {
      return waitingBoosterMultipliers.reduce((acc, cur) => {
        return acc + cur
      })
    } else {
      return 0
    }
  }

  public enableBoosters(waitingBoosters: WaitingBoosterEntity[]) {
    return waitingBoosters.filter((waitingBooster) => {
      return (
        new Date(waitingBooster.endAt).getTime() > new Date().getTime() &&
        waitingBooster.enabled
      )
    })
  }

  public finishedBoosters(waitingBoosters: WaitingBoosterEntity[]) {
    return waitingBoosters.filter((waitingBooster) => {
      return (
        new Date(waitingBooster.endAt).getTime() <= new Date().getTime() &&
        waitingBooster.enabled
      )
    })
  }

  public reviewingBoosters(waitingBoosters: WaitingBoosterEntity[]) {
    return waitingBoosters.filter((waitingBooster) => {
      return (
        new Date(waitingBooster.endAt).getTime() > new Date().getTime() &&
        !waitingBooster.enabled
      )
    })
  }

  public enableLeftDuration(waitingBooster: WaitingBoosterEntity) {
    if (new Date(waitingBooster.endAt).getTime() <= new Date().getTime()) {
      return 0
    } else {
      return Math.floor(
        new Date(waitingBooster.endAt).getTime() - new Date().getTime()
      )
    }
  }

  public enableLeftDurationPersentage(waitingBooster: WaitingBoosterEntity) {
    if (new Date(waitingBooster.endAt).getTime() <= new Date().getTime()) {
      return 0
    } else {
      return Math.floor(
        ((new Date(waitingBooster.endAt).getTime() - new Date().getTime()) /
          (new Date(waitingBooster.endAt).getTime() -
            new Date(waitingBooster.startAt).getTime())) *
          100
      )
    }
  }
}
