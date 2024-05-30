import { Box } from '@mantine/core'
import { FC } from 'react'
import { EHeading } from '../../01_elements/EHeading/base'
import { OBoosters } from '../../02_organisms/OBoosters'
import { boosterMocks } from '../../../mocks/booster.mock'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { WaitingBoostersService } from '../../../domains/services/waiting-boosters.service'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  const waitingBoostersService = new WaitingBoostersService()

  return (
    <>
      <Box mb={40} px={16}>
        <EHeading.ParagraphJa>有効なブースター</EHeading.ParagraphJa>
        <OBoosters
          mt={12}
          waitingBoosters={waitingBoostersService.enableBoosters(
            waiting.waitingBoosters
          )}
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
