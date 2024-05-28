export const rewardShowUrl = (uniqueKey: string) => `/rewards/${uniqueKey}`
export const missionShowUrl = (uniqueKey: string) => `/missions/${uniqueKey}`

export const userNewUrl = () => '/users/new'
export const userEditUrl = () => '/users/edit'

export const waitingsUrl = () => '/waitings'
export const waitingUrl = (uniqueKey: string) => `/waitings/${uniqueKey}`
export const waitingMembersUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/members`
export const waitingMissionsUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/missions`
export const waitingMissionUrl = (
  uniqueKey: string,
  boosterUniqueKey: string
) => `/waitings/${uniqueKey}/missions/${boosterUniqueKey}`

export const waitingRewardsUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/rewards`
export const waitingRewardUrl = (uniqueKey: string, rewardUniqueKey: string) =>
  `/waitings/${uniqueKey}/rewards/${rewardUniqueKey}`

export const waitingBoostersUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/boosters`
export const waitingAquiredUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/aquired`

export const waitingAquiredRewardUrl = (
  uniqueKey: string,
  rewardUniqueKey: string
) => `/waitings/${uniqueKey}/aquired/${rewardUniqueKey}`

export const waitingInformationUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}/information`

export const web3AuthCallbackUrl = () => '/auth/callback'
export const web3AuthEntranceUrl = () => '/auth/entrance'
export const web3AuthSignOutUrl = () => '/signout'

export const eventUrl = (uniqueKey: string) => `/events/${uniqueKey}`
