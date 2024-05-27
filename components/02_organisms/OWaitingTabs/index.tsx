import { BoxProps, Tabs } from '@mantine/core'
import { FC } from 'react'
import {
  waitingAquiredUrl,
  waitingBoostersUrl,
  waitingInformationUrl,
  waitingMembersUrl,
  waitingMissionsUrl,
  waitingRewardsUrl,
  waitingUrl,
} from '../../../helpers/url.helper'
import { ERollTabs } from '../../01_elements/ERollTabs'

type Props = BoxProps & {
  waitingUniqueKey: string
  current: string
}

const Component: FC<Props> = ({ waitingUniqueKey, current, ...props }) => {
  return (
    <>
      <Tabs.List {...props}>
        <ERollTabs
          tabs={[
            {
              name: 'HOME',
              isCurrent: current === 'HOME',
              action: () => {
                history.pushState(null, '', waitingUrl(waitingUniqueKey))
              },
            },
            {
              name: 'MEMBERS',
              isCurrent: current === 'MEMBERS',
              action: () => {
                history.pushState(null, '', waitingMembersUrl(waitingUniqueKey))
              },
            },
            {
              name: 'MISSIONS',
              isCurrent: current === 'MISSIONS',
              action: () => {
                history.pushState(
                  null,
                  '',
                  waitingMissionsUrl(waitingUniqueKey)
                )
              },
            },
            {
              name: 'REWARDS',
              isCurrent: current === 'REWARDS',
              action: () => {
                history.pushState(null, '', waitingRewardsUrl(waitingUniqueKey))
              },
            },
            {
              name: 'BOOSTERS',
              isCurrent: current === 'BOOSTERS',
              action: () => {
                history.pushState(
                  null,
                  '',
                  waitingBoostersUrl(waitingUniqueKey)
                )
              },
            },
            {
              name: 'AQUIRED',
              isCurrent: current === 'AQUIRED',
              action: () => {
                history.pushState(null, '', waitingAquiredUrl(waitingUniqueKey))
              },
            },
            {
              name: 'INFORMATION',
              isCurrent: current === 'INFORMATION',
              action: () => {
                history.pushState(
                  null,
                  '',
                  waitingInformationUrl(waitingUniqueKey)
                )
              },
            },
          ]}
        />
      </Tabs.List>
    </>
  )
}

export { Component as OWaitingTabs }
