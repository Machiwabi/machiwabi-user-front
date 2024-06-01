import { FC } from 'react'
import { useRewards } from '../../../hooks/resources/useRewards'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { EBlankNotice } from '../../01_elements/EBlankNotice'
import { ORewardCells } from '../../02_organisms/ORewardCells'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'

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

  if (rewards.length === 0) {
    return (
      <>
        <EBlankNotice
          title="REWARDがありません"
          description="現在公開されているREWARDはありません。"
        />
      </>
    )
  }

  return (
    <>
      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜REWARDSページ</>}
        tutorialKey="waiting-rewards-guide"
      >
        ポイントと引き換え可能なREWARD一覧です！
      </OTutorialGuide>
      <ORewardCells px={16} waiting={waiting} rewards={rewards} />
    </>
  )
}

export { Component as SRewardsScreen }
