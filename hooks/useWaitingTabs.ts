import { useRouter } from 'next/router'

export const WAITING_TABS = [
  'home',
  'members',
  'missions',
  'rewards',
  'boosters',
  'aquired',
  'information',
]

export const useWaitingTabs = () => {
  const router = useRouter()

  const handleTabChange = (tabName: string) => {
    const selectedTab = WAITING_TABS.find((tab) => tab === tabName)

    if (!selectedTab) return

    let query
    const { grantedWaitingBoosterUniqueKey, ...extractQuery } = router.query
    if (selectedTab === 'home') {
      query = { ...extractQuery }
    } else {
      query = {
        ...extractQuery,
        tab: selectedTab,
      }
    }

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    )
  }

  return { handleTabChange }
}
