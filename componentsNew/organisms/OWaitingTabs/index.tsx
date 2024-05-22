import { BoxProps, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ERollTabs } from '../../elements/ERollTabs'

type Props = BoxProps & {
  current: string
}

const Component: FC<Props> = ({ current, ...props }) => {
  const router = useRouter()

  return (
    <>
      <Tabs.List {...props}>
        <ERollTabs
          tabs={[
            {
              name: 'HOME',
              isCurrent: current === 'HOME',
              action: () => {
                router.replace('/v2/')
                // router.push('/v2/')
              },
            },
            {
              name: 'MEMBERS',
              isCurrent: current === 'MEMBERS',
              action: () => {
                router.replace('/v2/member')
                // router.push('/v2/member')
              },
            },
            {
              name: 'MISSIONS',
              isCurrent: current === 'MISSIONS',
              action: () => {
                router.push('/v2/missions')
              },
            },
            {
              name: 'REWARDS',
              isCurrent: current === 'REWARDS',
              action: () => {
                router.push('/v2/rewards')
              },
            },
            {
              name: 'BOOSTERS',
              isCurrent: current === 'BOOSTERS',
              action: () => {
                router.push('/v2/boosters')
              },
            },
            {
              name: 'AQUIRED',
              isCurrent: current === 'AQUIRED',
              action: () => {
                router.push('/v2/aquired')
              },
            },
            {
              name: 'INFORMATION',
              isCurrent: current === 'INFORMATION',
              action: () => {
                router.push('/v2/information')
              },
            },
          ]}
        />
      </Tabs.List>
    </>
  )
}

export { Component as OWaitingTabs }
