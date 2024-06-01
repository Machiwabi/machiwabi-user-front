import { FC } from 'react'
import { OAquiredRewardCells } from '../../02_organisms/OAquiredRewardCells'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { useRewards } from '../../../hooks/resources/useRewards'
import { EBlankNotice } from '../../01_elements/EBlankNotice'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'

type Props = {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, eventUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })
  const { rewards, rewardsError, rewardsIsLoading } = useRewards({
    eventUniqueKey,
  })

  if (waitingError || rewardsError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting || rewardsIsLoading || !rewards)
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
        alertTitle={<>💁 ガイド｜AQUIREDページ</>}
        tutorialKey="waiting-aquired-guide"
      >
        獲得REWARD一覧です！REWARDページで引き換え可能なREWARDを確認しましょう！
      </OTutorialGuide>
      <OAquiredRewardCells
        px={16}
        waiting={waiting}
        cellingRewards={rewards}
        aquiredWaitingRewards={waiting.waitingRewards}
      />
    </>
  )
}

export { Component as SAquiredRewardsScreen }
