import { BoxProps, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ERollTabs } from '../../01_elements/ERollTabs'

type Props = BoxProps & {
  waitingUniqueKey: string
  current: string
}

const TABS = [
  'home',
  'members',
  'missions',
  'rewards',
  'boosters',
  'aquired',
  'information',
]

const Component: FC<Props> = ({ waitingUniqueKey, current, ...props }) => {
  const router = useRouter()

  const handleTabChange = (tabName: string) => {
    const selectedTab = TABS.find((tab) => tab === tabName)

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

    console.log('query', query)

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <>
      <Tabs.List {...props}>
        <ERollTabs
          tabs={[
            {
              name: 'home',
              isCurrent: current === 'home',
              action: () => {
                handleTabChange('home')
              },
            },
            {
              name: 'members',
              isCurrent: current === 'members',
              action: () => {
                handleTabChange('members')
              },
            },
            {
              name: 'missions',
              isCurrent: current === 'missions',
              action: () => {
                handleTabChange('missions')
              },
            },
            {
              name: 'rewards',
              isCurrent: current === 'rewards',
              action: () => {
                handleTabChange('rewards')
              },
            },
            {
              name: 'boosters',
              isCurrent: current === 'boosters',
              action: () => {
                handleTabChange('boosters')
              },
            },
            {
              name: 'aquired',
              isCurrent: current === 'aquired',
              action: () => {
                handleTabChange('aquired')
              },
            },
            {
              name: 'information',
              isCurrent: current === 'information',
              action: () => {
                handleTabChange('information')
              },
            },
          ]}
        />
      </Tabs.List>
    </>
  )
}

export { Component as OWaitingTabs }
