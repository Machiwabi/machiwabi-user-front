import { FC } from 'react'
import { EBreadcrumb } from '../../elements/EBreadcrumb'
import { waitingMock } from '../../../mocks/waiting.mock'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { truncator } from '../../../utils/truncator'
import { boosterMock } from '../../../mocks/booster.mock'
import { Box, Flex, TextInput } from '@mantine/core'
import { EHeading } from '../../elements/EHeading/base'
import { EText } from '../../elements/EText/base'
import Image from 'next/image'
import { EDefinitionTerm } from '../../elements/EDefinitionTerm'
import { OBoosterMultiplier } from '../../organisms/OBoosterMultiplier'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../elements/EButton'
import { useBooster } from '../../../hooks/resources/useBooster'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

type Props = {
  waitingUniqueKey: string
  boosterUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, boosterUniqueKey }) => {
  const { booster, boosterIsLoading, boosterError } = useBooster({
    uniqueKey: boosterUniqueKey,
  })
  const { waiting, waitingIsLoading, waitingError } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError || boosterError) return <TErrorTemplate />
  if (waitingIsLoading || boosterIsLoading || !booster || !waiting)
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
            title: 'MISSIONS',
            href: waitingMissionsUrl(waiting.uniqueKey),
          },
          {
            title: truncator.truncateString(booster.missionName || '', 10),
          },
        ]}
      />
      <Box mt={24} px={16}>
        <EHeading.Page>{booster.missionName}</EHeading.Page>
        <EText.Desc1 mt={16}>{booster.missionDescription}</EText.Desc1>
      </Box>
      <Box my={40} px={16}>
        <EHeading.SectionJa>成功報酬</EHeading.SectionJa>
        <Flex align="center" my={16}>
          {booster.iconUrl && (
            <Box w={24} h={24} style={{ borderRadius: 4, overflow: 'hidden' }}>
              <Image
                src={booster.iconUrl}
                alt={booster.name}
                width={24}
                height={24}
              />
            </Box>
          )}
          <Box fz={14} fw={700} ml={8}>
            ツイートの印
          </Box>
        </Flex>
        <Box mt={16}>
          <Flex justify="space-between" align="center">
            <EDefinitionTerm term="効果" tooltip="ツイートの印" />
            <OBoosterMultiplier booster={booster} />
          </Flex>
          <Flex mt={4} justify="space-between" align="center">
            <EDefinitionTerm term="重複利用" tooltip="ツイートの印" />
            <EText.Desc1 fz={10} c={colorScheme.scheme1.surface1.object.low}>
              不可
            </EText.Desc1>
          </Flex>
          <Flex mt={4} justify="space-between" align="center">
            <EDefinitionTerm term="利用上限" tooltip="ツイートの印" />
            <EText.Desc1 fz={10} c={colorScheme.scheme1.surface1.object.low}>
              なし
            </EText.Desc1>
          </Flex>
        </Box>
      </Box>
      <Box my={40} px={16}>
        <EHeading.SectionJa>ミッション内容</EHeading.SectionJa>
        <EText.Desc1 mt={16}>{booster.missionMdxContent}</EText.Desc1>
      </Box>
      <Box my={40} px={16}>
        <EHeading.SectionJa>ミッション報告フォーム</EHeading.SectionJa>
        <TextInput mt={8} placeholder="Input placeholder" />
        <EButton.Sm mt={16} type="filled">
          報告する
        </EButton.Sm>
      </Box>
    </>
  )
}

export { Component as SMissionScreen }
