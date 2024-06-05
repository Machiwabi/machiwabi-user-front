import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { WaitingBoosterEntity } from '../../../generated/graphql'

export const useOMissionCompleteList = (
  waitingBoosters: WaitingBoosterEntity[]
) => {
  const waitingBoostersService = new WaitingBoostersService()

  const enableBoosters = waitingBoostersService.enableBoosters(waitingBoosters)
  const finishedBoosters =
    waitingBoostersService.finishedBoosters(waitingBoosters)
  const reviewingBoosters =
    waitingBoostersService.reviewingBoosters(waitingBoosters)

  return {
    enableBoosters,
    finishedBoosters,
    reviewingBoosters,
  }
}
