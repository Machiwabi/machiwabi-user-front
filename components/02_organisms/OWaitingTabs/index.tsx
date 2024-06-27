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
              displayName: 'ホーム',
              isCurrent: current === 'home',
              action: () => {
                handleTabChange('home')
              },
            },
            {
              name: 'members',
              displayName: 'ワチワビスト',
              isCurrent: current === 'members',
              action: () => {
                handleTabChange('members')
              },
            },

            {
              name: 'missions',
              displayName: 'ミッション',
              isCurrent: current === 'missions',
              action: () => {
                handleTabChange('missions')
              },
            },
            {
              name: 'rewards',
              displayName: 'リワード',
              isCurrent: current === 'rewards',
              action: () => {
                handleTabChange('rewards')
              },
            },
            {
              name: 'boosters',
              displayName: 'ブースター',
              isCurrent: current === 'boosters',
              action: () => {
                handleTabChange('boosters')
              },
            },
            {
              name: 'aquired',
              displayName: '獲得済リワード',
              isCurrent: current === 'aquired',
              action: () => {
                handleTabChange('aquired')
              },
            },
            {
              name: 'totalpoints',
              displayName: '総合ポイント',
              isCurrent: current === 'totalpoints',
              action: () => {
                handleTabChange('totalpoints')
              },
            },
            {
              name: 'information',
              displayName: 'イベント情報',
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
