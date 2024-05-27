import { FC } from 'react'
import { waitingAquiredUrl, waitingUrl } from '../../../helpers/url.helper'
import { useReward } from '../../../hooks/resources/useReward'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { truncator } from '../../../utils/truncator'
import { EBreadcrumb } from '../../elements/EBreadcrumb'
import { TAquiredRewardShowTemplate } from '../../templates/TAquiredRewardShowTemplate'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

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
            title: 'Aquired',
            href: waitingAquiredUrl(waiting.uniqueKey),
          },
          {
            title: truncator.truncateString(reward.name || '', 10),
          },
        ]}
      />
      <TAquiredRewardShowTemplate mt={24} reward={reward} />
    </>
  )
}

export { Component as SAquiredRewardScreen }
