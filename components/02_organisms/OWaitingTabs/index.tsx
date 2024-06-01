import { BoxProps, Tabs } from '@mantine/core'
import { FC } from 'react'
import { useWaitingTabs } from '../../../hooks/useWaitingTabs'
import { ERollTabs } from '../../01_elements/ERollTabs'

type Props = BoxProps & {
  waitingUniqueKey: string
  current: string
}

const Component: FC<Props> = ({ waitingUniqueKey, current, ...props }) => {
  const { handleTabChange } = useWaitingTabs()

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
