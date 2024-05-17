import { Box, Container, Flex, TextInput } from '@mantine/core'
import Image from 'next/image'
import { EBreadcrumb } from '../../../componentsNew/elements/EBreadcrumb'
import { EButton } from '../../../componentsNew/elements/EButton'
import { EDefinitionTerm } from '../../../componentsNew/elements/EDefinitionTerm'
import { EHeading } from '../../../componentsNew/elements/EHeading/base'
import { EText } from '../../../componentsNew/elements/EText/base'
import { OBoosterMultiplier } from '../../../componentsNew/organisms/OBoosterMultiplier'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { boosterMock } from '../../../mocks/booster.mock'
import { waitingMock } from '../../../mocks/waiting.mock'
import { colorScheme } from '../../../theme/colorScheme'
import { truncator } from '../../../utils/truncator'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <EBreadcrumb
          mt={24}
          px={16}
          breadcrumbs={[
            {
              title: waitingMock.event.name || '',
              href: waitingUrl(waitingMock.uniqueKey),
            },
            {
              title: 'MISSIONS',
              href: waitingMissionsUrl(waitingMock.uniqueKey),
            },
            {
              title: truncator.truncateString(
                boosterMock.missionName || '',
                10
              ),
            },
          ]}
        />
        <Box mt={24} px={16}>
          <EHeading.Page>{boosterMock.missionName}</EHeading.Page>
          <EText.Desc1 mt={16}>{boosterMock.missionDescription}</EText.Desc1>
        </Box>
        <Box my={40} px={16}>
          <EHeading.SectionJa>成功報酬</EHeading.SectionJa>
          <Flex align="center" my={16}>
            {boosterMock.iconUrl && (
              <Box
                w={24}
                h={24}
                style={{ borderRadius: 4, overflow: 'hidden' }}
              >
                <Image
                  src={boosterMock.iconUrl}
                  alt={boosterMock.name}
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
              <OBoosterMultiplier booster={boosterMock} />
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
          <EText.Desc1 mt={16}>{boosterMock.missionMdxContent}</EText.Desc1>
        </Box>
        <Box my={40} px={16}>
          <EHeading.SectionJa>ミッション報告フォーム</EHeading.SectionJa>
          <TextInput mt={8} placeholder="Input placeholder" />
          <EButton.Sm mt={16} type="filled">
            報告する
          </EButton.Sm>
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
