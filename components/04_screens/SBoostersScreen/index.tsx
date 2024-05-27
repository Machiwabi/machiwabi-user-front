import { Box } from '@mantine/core'
import { FC } from 'react'
import { EHeading } from '../../01_elements/EHeading/base'
import { OBoosters } from '../../02_organisms/OBoosters'
import { boosterMocks } from '../../../mocks/booster.mock'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <Box mb={40} px={16}>
        <EHeading.ParagraphJa>有効なブースター</EHeading.ParagraphJa>
        <OBoosters
          mt={12}
          boosters={waiting.waitingBoosters.map((wb) => wb.booster)}
        />
      </Box>

      <Box my={40} px={16}>
        <EHeading.ParagraphJa>効果が終了したブースター</EHeading.ParagraphJa>
        <OBoosters mt={12} boosters={boosterMocks} />
      </Box>
    </>
  )
}
export { Component as SBoostersScreen }
