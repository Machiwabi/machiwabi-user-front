export const rewardShowUrl = (uniqueKey: string) => `/v2/rewards/${uniqueKey}`
export const missionShowUrl = (uniqueKey: string) => `/v2/missions/${uniqueKey}`

export const waitingUrl = (uniqueKey: string) => `/v2/waitings/${uniqueKey}`
export const waitingMembersUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/members`

export const waitingMissionsUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/missions`
export const waitingMissionUrl = (
  uniqueKey: string,
  boosterUniqueKey: string
) => `/v2/waitings/${uniqueKey}/missions/${boosterUniqueKey}`

export const waitingRewardsUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/rewards`
export const waitingRewardUrl = (uniqueKey: string, rewardUniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/rewards/${rewardUniqueKey}`

export const waitingBoostersUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/boosters`
export const waitingAquiredUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/aquired`

export const waitingAquiredRewardUrl = (
  uniqueKey: string,
  rewardUniqueKey: string
) => `/v2/waitings/${uniqueKey}/aquired/${rewardUniqueKey}`

export const waitingInformationUrl = (uniqueKey: string) =>
  `/v2/waitings/${uniqueKey}/information`
