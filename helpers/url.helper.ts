export const rewardShowUrl = (uniqueKey: string) => `/rewards/${uniqueKey}`
export const missionShowUrl = (uniqueKey: string) => `/missions/${uniqueKey}`

export const userNewUrl = () => '/users/new'
export const userEditUrl = () => '/users/edit'

export const waitingsUrl = () => '/waitings'
export const waitingUrl = (uniqueKey: string) => `/waitings/${uniqueKey}`
export const waitingMembersUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=members`
export const waitingMissionsUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=missions`

export const waitingMissionUrl = (
  uniqueKey: string,
  boosterUniqueKey: string
) => `/missions/${boosterUniqueKey}?waitingUniqueKey=${uniqueKey}`

export const waitingRewardsUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=rewards`
export const waitingRewardUrl = (uniqueKey: string, rewardUniqueKey: string) =>
  `/waitings/${uniqueKey}/rewards/${rewardUniqueKey}`

export const waitingBoostersUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=boosters`
export const waitingAquiredUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=aquired`

export const waitingAquiredRewardUrl = (
  uniqueKey: string,
  rewardUniqueKey: string
) => `/waitings/${uniqueKey}/aquired/${rewardUniqueKey}`

export const waitingInformationUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=information`

export const web3AuthCallbackUrl = () => '/auth/callback'
export const web3AuthEntranceUrl = () => '/auth/entrance'
export const web3AuthSignOutUrl = () => '/signout'

export const eventUrl = (uniqueKey: string) => `/events/${uniqueKey}`
