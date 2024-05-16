import { FC } from 'react'
import { ERollTabs } from '../../elements/ERollTabs/ERollTabs'
import { useRouter } from 'next/router'
import { Box, BoxProps } from '@mantine/core'

type Props = BoxProps & {
  current: string
}

const Component: FC<Props> = ({ current, ...props }) => {
  const router = useRouter()

  return (
    <>
      <Box {...props}>
        <ERollTabs
          tabs={[
            {
              name: 'HOME',
              isCurrent: current === 'HOME',
              action: () => {
                router.push('/v2/')
              },
            },
            {
              name: 'MEMBERS',
              isCurrent: current === 'MEMBERS',
              action: () => {
                router.push('/v2/member')
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
              name: 'AQUIRES',
              isCurrent: current === 'AQUIRES',
              action: () => {
                router.push('/v2/aquires')
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
      </Box>
    </>
  )
}

export { Component as OWaitingTabs }
