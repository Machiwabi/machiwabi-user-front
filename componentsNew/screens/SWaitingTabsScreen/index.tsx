import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'
import { Tabs } from '@mantine/core'
import { OWaitingHeader } from '../../organisms/OWaitingHeader'
import { OWaitingTabs } from '../../organisms/OWaitingTabs'
import { SWaitingScreen } from '../SWaitingScreen'
import { SMembersScreen } from '../SMembersScreen'
import { SMissionsScreen } from '../SMissionsScreen'
import { SRewardsScreen } from '../SRewardsScreen'
import { SBoostersScreen } from '../SBoostersScreen'
import { SAquiredRewardsScreen } from '../SAquiredRewardsScreen'
import { SInformationScreen } from '../SInformationScreen'

type WaitingTabValues =
  | 'HOME'
  | 'MEMBERS'
  | 'MISSIONS'
  | 'REWARDS'
  | 'BOOSTERS'
  | 'AQUIRED'
  | 'INFORMATION'
type Props = { waitingUniqueKey: string; currentTabValue: WaitingTabValues }

const Component: FC<Props> = ({ waitingUniqueKey, currentTabValue }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <Tabs variant="pills" defaultValue={currentTabValue}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs current="HOME" waitingUniqueKey={waitingUniqueKey} />

        <Tabs.Panel value="HOME">
          <SWaitingScreen waitingUniqueKey={waitingUniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="MEMBERS">
          <SMembersScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="MISSIONS">
          <SMissionsScreen
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event.uniqueKey}
          />
        </Tabs.Panel>

        <Tabs.Panel value="REWARDS">
          <SRewardsScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="BOOSTERS">
          <SBoostersScreen waitingUniqueKey={waiting.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="AQUIRED">
          <SAquiredRewardsScreen
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event.uniqueKey}
          />
        </Tabs.Panel>

        <Tabs.Panel value="INFORMATION">
          <SInformationScreen waitingUniqueKey={waiting.uniqueKey} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export { Component as SWaitingTabsScreen }
