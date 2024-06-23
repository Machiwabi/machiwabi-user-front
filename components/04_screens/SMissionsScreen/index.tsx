import { FC } from 'react'
import { useBoosters } from '../../../hooks/resources/useBoosters'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { EBlankNotice } from '../../01_elements/EBlankNotice'
import { OMissionList } from '../../02_organisms/OMissionList'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { useEvent } from '../../../hooks/resources/useEvent'
import { EventService } from '../../../domains/services/event.service'

type Props = {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, eventUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  const { boosters, boostersIsLoading, boostersError } = useBoosters({
    eventUniqueKey,
  })

  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey: eventUniqueKey,
  })

  if (waitingError || boostersError || eventError) return <TErrorTemplate />
  if (
    waitingIsLoading ||
    boostersIsLoading ||
    eventIsLoading ||
    !boosters ||
    !waiting ||
    !event
  )
    return <TLoadingTemplate />

  const eventService = new EventService(event)

  if (eventService.eventStarted()) {
    return (
      <>
        <EBlankNotice
          title="イベントが開始されました"
          description="イベントが開始されたため、MISSIONは終了しました。"
        />
      </>
    )
  }
  if (boosters.length === 0) {
    return (
      <>
        <EBlankNotice
          title="MISSIONがありません"
          description="現在公開されているMISSIONはありません。"
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
        alertTitle={<>💁 ガイド｜MISSIONSページ</>}
        tutorialKey="waiting-missions-guide"
      >
        MISSIONをクリアして、ポイントを効率的に増やせるBOOSTERを獲得しましょう！
      </OTutorialGuide>
      <OMissionList px={16} waiting={waiting} boosters={boosters} />
    </>
  )
}

export { Component as SMissionsScreen }
