import { FC } from 'react'
import { ORewardCells } from '../../organisms/ORewardCells'
import { useRewards } from '../../../hooks/resources/useRewards'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'
import { useWaiting } from '../../../hooks/resources/useWaiting'

type Props = {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, eventUniqueKey }) => {
  const { rewards, rewardsError, rewardsIsLoading } = useRewards({
    eventUniqueKey,
  })
  const { waiting, waitingIsLoading, waitingError } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError || rewardsError) return <TErrorTemplate />
  if (waitingIsLoading || rewardsIsLoading || !rewards || !waiting)
    return <TLoadingTemplate />

  return (
    <>
      <ORewardCells px={16} waiting={waiting} rewards={rewards} />
    </>
  )
}

export { Component as SRewardsScreen }
