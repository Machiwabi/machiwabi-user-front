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

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  const router = useRouter()
  const { grantedWaitingBoosterUniqueKey } = router.query
  const [showGrantedModal, setShowGrantedModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowGrantedModal(true)
    }, 1000)
  }, [waiting])

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  const waitingBoostersService = new WaitingBoostersService()
  const grantedWaitingBooster = waiting.waitingBoosters.find(
    (booster) => booster.uniqueKey === grantedWaitingBoosterUniqueKey
  )

  const enableBoosters = waitingBoostersService.enableBoosters(
    waiting.waitingBoosters
  )
  const finishedBoosters = waitingBoostersService.finishedBoosters(
    waiting.waitingBoosters
  )

  return (
    <>
      {grantedWaitingBooster && showGrantedModal && (
        <TModalGrantedWaitingBoosterTemplate
          booster={grantedWaitingBooster.booster}
          isOpen={showGrantedModal}
          setIsOpen={() => setShowGrantedModal}
        />
      )}

      <Box mb={40} px={16}>
        <EHeading.ParagraphJa>有効なブースター</EHeading.ParagraphJa>
        <EBlankNotice
          title="有効なブースターがありません"
          description="MISSONを達成するとポイントのスピードアップができるブースターを獲得できます！"
          additionalContent={<GotoMissionButton mt={16} />}
          mt={16}
        />
        <OBoosters
          mt={12}
          waitingBoosters={enableBoosters}
          grantedWaitingBoosterUniqueKey={
            grantedWaitingBoosterUniqueKey as string
          }
        />
      </Box>

      {finishedBoosters.length > 0 && (
        <Box my={40} px={16}>
          <EHeading.ParagraphJa>効果が終了したブースター</EHeading.ParagraphJa>
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
