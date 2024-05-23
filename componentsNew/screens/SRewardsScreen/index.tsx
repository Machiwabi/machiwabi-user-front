import { FC } from 'react'
import { ORewardCells } from '../../organisms/ORewardCells'
import { useRewards } from '../../../hooks/resources/useRewards'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { rewards, rewardsError, rewardsIsLoading } = useRewards({
    eventUniqueKey,
  })
  if (rewardsError) return <TErrorTemplate />
  if (rewardsIsLoading || !rewards) return <TLoadingTemplate />

  return (
    <>
      <ORewardCells px={16} rewards={rewards} />
    </>
  )
}

export { Component as SRewardsScreen }
