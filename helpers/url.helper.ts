import { applicationUrls } from '../constants/applicationUrls'

export const rewardShowUrl = (uniqueKey: string) => `/rewards/${uniqueKey}`
export const missionShowUrl = (uniqueKey: string) => `/missions/${uniqueKey}`

export const userNewUrl = () => '/users/new'
export const userEditUrl = () => '/users/edit'

export const waitingsUrl = (params?: { key: string; value: string }[]) => {
  if (params && params.length > 0) {
    const stringParams = params
      .map((param) => `${param.key}=${param.value}`)
      .join('&')
    return `/waitings?${stringParams}`
  } else {
    return `/waitings`
  }
}
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
  `/rewards/${rewardUniqueKey}?waitingUniqueKey=${uniqueKey}`

export const waitingBoostersUrl = (
  uniqueKey: string,
  grantedBoostersUniqueKey?: string
) => {
  if (grantedBoostersUniqueKey) {
    return `/waitings/${uniqueKey}?tab=boosters&grantedWaitingBoosterUniqueKey=${grantedBoostersUniqueKey}`
  } else {
    return `/waitings/${uniqueKey}?tab=boosters`
  }
}

export const waitingAquiredUrl = (
  uniqueKey: string,
  grantedRewardUniqueKey?: string
) => {
  if (grantedRewardUniqueKey) {
    return `/waitings/${uniqueKey}?tab=aquired&grantedRewardUniqueKey=${grantedRewardUniqueKey}`
  } else {
    return `/waitings/${uniqueKey}?tab=aquired`
  }
}

export const waitingAquiredRewardUrl = (
  uniqueKey: string,
  rewardUniqueKey: string
) => `/aquired/${rewardUniqueKey}?waitingUniqueKey=${uniqueKey}`

export const waitingInformationUrl = (uniqueKey: string) =>
  `/waitings/${uniqueKey}?tab=information`

export const web3AuthCallbackUrl = () => '/auth/callback'
export const web3AuthEntranceUrl = () => '/auth/entrance'
export const web3AuthSignOutUrl = () => '/signout'

export const eventUrl = (
  uniqueKey: string,
  params?: { key: string; value: string }[]
) => {
  if (params && params.length > 0) {
    const stringParams = params
      .map((param) => `${param.key}=${param.value}`)
      .join('&')
    return `/events/${uniqueKey}?${stringParams}`
  } else {
    return `/events/${uniqueKey}`
  }
}

export const nftWalletUrl = (siweEoaAddress: string) => {
  return `${applicationUrls.nftWalletUrl}/${siweEoaAddress}`
}
