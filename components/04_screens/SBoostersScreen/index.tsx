import { Box, BoxProps } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { useWaitingTabs } from '../../../hooks/useWaitingTabs'
import { EBlankNotice } from '../../01_elements/EBlankNotice'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { OBoosters } from '../../02_organisms/OBoosters'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TModalGrantedWaitingBoosterTemplate } from '../../03_templates/TModalGrantedWaitingBoosterTemplate'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { useEvent } from '../../../hooks/resources/useEvent'
import { EventService } from '../../../domains/services/event.service'
import { WaitingBoosterEntity } from '../../../generated/graphql'

type Props = {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, eventUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey: eventUniqueKey,
  })

  const router = useRouter()
  const { grantedWaitingBoosterUniqueKey } = router.query
  const [showGrantedModal, setShowGrantedModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowGrantedModal(true)
    }, 1000)
  }, [waiting])

  if (waitingError || eventError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting || eventIsLoading || !event)
    return <TLoadingTemplate />

  const waitingBoostersService = new WaitingBoostersService()
  const eventService = new EventService(event)

  const grantedWaitingBooster = waiting.waitingBoosters.find(
    (booster) => booster.uniqueKey === grantedWaitingBoosterUniqueKey
  )

  let enableBoosters: WaitingBoosterEntity[] = []
  let finishedBoosters: WaitingBoosterEntity[] = []
  let reviewingBoosters: WaitingBoosterEntity[] = []

  if (eventService.eventStarted()) {
    enableBoosters = []
    finishedBoosters = waiting.waitingBoosters
    reviewingBoosters = []
  } else {
    enableBoosters = waitingBoostersService.enableBoosters(
      waiting.waitingBoosters
    )
    finishedBoosters = waitingBoostersService.finishedBoosters(
      waiting.waitingBoosters
    )
    reviewingBoosters = waitingBoostersService.reviewingBoosters(
      waiting.waitingBoosters
    )
  }

  return (
    <>
      {grantedWaitingBooster && showGrantedModal && (
        <TModalGrantedWaitingBoosterTemplate
          booster={grantedWaitingBooster.booster}
          isOpen={showGrantedModal}
          setIsOpen={() => setShowGrantedModal}
        />
      )}

      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜BOOSTERSページ</>}
        tutorialKey="waiting-boosters-guide"
      >
        現在発動中のBOOSTER一覧！BOOSTER 発動中は速くポイントが貯まります！
      </OTutorialGuide>

      <Box mb={40} px={16}>
        <EHeading.ParagraphJa>有効なBOOSTERS</EHeading.ParagraphJa>
        {enableBoosters.length === 0 && (
          <EBlankNotice
            title="有効なブースターがありません"
            description="MISSONを達成するとポイントのスピードアップができるブースターを獲得できます！"
            additionalContent={<GotoMissionButton mt={16} />}
            mt={16}
          />
        )}
        <OBoosters
          mt={12}
          waitingBoosters={enableBoosters}
          grantedWaitingBoosterUniqueKey={
            grantedWaitingBoosterUniqueKey as string
          }
        />
      </Box>

      {reviewingBoosters.length > 0 && (
        <Box my={40} px={16}>
          <EHeading.ParagraphJa>レビュー中のBOOSTERS</EHeading.ParagraphJa>
          <OBoosters
            mt={12}
            waitingBoosters={reviewingBoosters}
            opacity={0.2}
            grantedWaitingBoosterUniqueKey={
              grantedWaitingBoosterUniqueKey as string
            }
          />
        </Box>
      )}

      {finishedBoosters.length > 0 && (
        <Box my={40} px={16}>
          <EHeading.ParagraphJa>効果が終了したBOOSTERS</EHeading.ParagraphJa>
          <OBoosters mt={12} waitingBoosters={finishedBoosters} />
        </Box>
      )}
    </>
  )
}
export { Component as SBoostersScreen }

type GotoMissionButtonProps = BoxProps
const GotoMissionButton: FC<GotoMissionButtonProps> = ({ ...props }) => {
  const { handleTabChange } = useWaitingTabs()
  return (
    <Box {...props}>
      <EButton.Sm onClick={() => handleTabChange('missions')}>
        MISSION一覧へ
      </EButton.Sm>
    </Box>
  )
}
