import { FC } from 'react'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { OWaitingUserList } from '../../02_organisms/OWaitingUserList'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { useEvent } from '../../../hooks/resources/useEvent'
import { EventService } from '../../../domains/services/event.service'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey: eventUniqueKey,
  })

  if (waitingSiblingError || eventError) return <TErrorTemplate />
  if (waitingSiblingsIsLoading || !waitingSiblings || eventIsLoading || !event)
    return <TLoadingTemplate />

  const eventService = new EventService(event)

  const waitings = waitingSiblings.sort((a, b) => {
    if (a.totalPoint < b.totalPoint) return 1
    if (a.totalPoint > b.totalPoint) return -1
    return 0
  })

  return (
    <>
      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜MEMBERSページ</>}
        tutorialKey="waiting-members-guide"
      >
        イベントを一緒に待ち侘びているメンバーたちのランキングです！みんなで盛り上がってアイスリボンイベント当日を楽しみに待ち侘びましょう！
      </OTutorialGuide>
      <OWaitingUserList
        waitings={waitings}
        animationEnabled={!eventService.eventStarted()}
      />
    </>
  )
}

export { Component as SMembersScreen }
