import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'
import { useWaiting } from '../../../hooks/resources/useWaiting'
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
        <OBoosters
          mt={12}
          waitingBoosters={waitingBoostersService.enableBoosters(
            waiting.waitingBoosters
          )}
          grantedWaitingBoosterUniqueKey={
            grantedWaitingBoosterUniqueKey as string
          }
        />
      </Box>

      <Box my={40} px={16}>
        <EHeading.ParagraphJa>効果が終了したブースター</EHeading.ParagraphJa>
        <OBoosters
          mt={12}
          waitingBoosters={waitingBoostersService.finishedBoosters(
            waiting.waitingBoosters
          )}
        />
      </Box>
    </>
  )
}
export { Component as SBoostersScreen }
