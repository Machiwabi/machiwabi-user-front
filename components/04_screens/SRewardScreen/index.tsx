import { FC } from 'react'
import { waitingRewardsUrl, waitingUrl } from '../../../helpers/url.helper'
import { useReward } from '../../../hooks/resources/useReward'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { truncator } from '../../../utils/truncator'
import { EBreadcrumb } from '../../01_elements/EBreadcrumb'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TRewardShowTemplate } from '../../03_templates/TRewardShowTemplate'

type Props = {
  waitingUniqueKey: string
  rewardUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, rewardUniqueKey }) => {
  const { reward, rewardIsLoading, rewardError } = useReward({
    uniqueKey: rewardUniqueKey,
  })
  const { waiting, waitingIsLoading, waitingError } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError || rewardError) return <TErrorTemplate />
  if (waitingIsLoading || rewardIsLoading || !reward || !waiting)
    return <TLoadingTemplate />

  return (
    <>
      <EBreadcrumb
        mt={24}
        px={16}
        breadcrumbs={[
          {
            title: waiting.event.name || '',
            href: waitingUrl(waiting.uniqueKey),
          },
          {
            title: 'REWARDS',
            href: waitingRewardsUrl(waiting.uniqueKey),
          },
          {
            title: truncator.truncateString(reward.name || '', 10),
          },
        ]}
      />
      <TRewardShowTemplate mt={24} waiting={waiting} reward={reward} />
    </>
  )
}

export { Component as SRewardScreen }
