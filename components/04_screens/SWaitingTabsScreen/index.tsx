import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { OFooterNav } from '../../02_organisms/OFooterNav'
import { OWaitingHeader } from '../../02_organisms/OWaitingHeader'
import { OWaitingTabs } from '../../02_organisms/OWaitingTabs'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { SAquiredRewardsScreen } from '../SAquiredRewardsScreen'
import { SBoostersScreen } from '../SBoostersScreen'
import { SInformationScreen } from '../SInformationScreen'
import { SMembersScreen } from '../SMembersScreen'
import { SMissionsScreen } from '../SMissionsScreen'
import { SRewardsScreen } from '../SRewardsScreen'
import { SWaitingScreen } from '../SWaitingScreen'
import { STotalWaitingScreen } from '../STotalWaitingScreen'
import { Seo } from '../../99_seo/waitings/[uniqueKey]/Seo'

type Props = { waitingUniqueKey: string }

const WAITING_TABS = [
  'home',
  'members',
  'missions',
  'rewards',
  'boosters',
  'aquired',
  'information',
  'totalpoints',
]

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  const router = useRouter()
  const { tab } = router.query
  const selectedTab = WAITING_TABS.find((tabName) => tab === tabName) || 'home'

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <Tabs variant="pills" defaultValue={selectedTab}>
        <OWaitingHeader waiting={waiting} mt={24} px={16} />
        <OWaitingTabs
          current={tab as string}
          waitingUniqueKey={waitingUniqueKey}
        />

        <Tabs.Panel value="home">
          <SWaitingScreen waitingUniqueKey={waitingUniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="members">
          <SMembersScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="missions">
          <SMissionsScreen
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event.uniqueKey}
          />
        </Tabs.Panel>

        <Tabs.Panel value="rewards">
          <SRewardsScreen
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event.uniqueKey}
          />
        </Tabs.Panel>

        <Tabs.Panel value="boosters">
          <SBoostersScreen waitingUniqueKey={waiting.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="aquired">
          <SAquiredRewardsScreen
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event.uniqueKey}
          />
        </Tabs.Panel>

        <Tabs.Panel value="totalpoints">
          <STotalWaitingScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="information">
          <SInformationScreen waitingUniqueKey={waiting.uniqueKey} />
        </Tabs.Panel>
      </Tabs>
      <OFooterNav />
    </>
  )
}

export { Component as SWaitingTabsScreen }
