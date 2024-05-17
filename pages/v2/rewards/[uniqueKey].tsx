import { AspectRatio, Box, Container, Flex, Progress } from '@mantine/core'
import Image from 'next/image'
import { EBreadcrumb } from '../../../componentsNew/elements/EBreadcrumb'
import { EButton } from '../../../componentsNew/elements/EButton'
import { EHeading } from '../../../componentsNew/elements/EHeading/base'
import { EText } from '../../../componentsNew/elements/EText/base'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { boosterMock } from '../../../mocks/booster.mock'
import { rewardMock } from '../../../mocks/reward.mock'
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
          <AspectRatio ratio={1} w="100%" h="100%">
            <Flex
              pos="relative"
              w="100%"
              h="100%"
              align="center"
              justify="center"
              bg={colorScheme.scheme1.surface2.surface}
            >
              <Image
                src={
                  boosterMock.iconUrl ||
                  '/assets/images/_sample/picture_ranking_01.png'
                } // TODO fallback image
                alt={boosterMock.name}
                fill={true}
              />
            </Flex>
          </AspectRatio>
        </Box>
        <Box my={24} px={16}>
          <EHeading.Page ta="center">{rewardMock.name}</EHeading.Page>
          <Box mt={2} ta="center" ff="outfit" fw={700} fz={18}>
            {rewardMock.requiredTotalPoint?.toLocaleString()} PT
          </Box>
          <EText.Desc1 mt={8}>{boosterMock.missionDescription}</EText.Desc1>
          <Box mt={16}>
            <Progress
              h={3}
              value={50}
              color={colorScheme.scheme1.surface1.object.high}
            />
            <Flex justify="space-between" mt={6}>
              <Box fz={12} ff="outfit" fw={700}>
                186,123
              </Box>
              <Box ta="right">
                <Box fz={10}>現在のRateから32日後に達成見込みです</Box>
                <Box mt={1} fz={10} style={{ textDecoration: 'underline' }}>
                  ポイント予測を見る
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Flex direction="column" my={0} px={16} justify="center" align="center">
          <EButton.Sm type="disabled">Insufficient points</EButton.Sm>
          <Box mt={8} fz={10} c={colorScheme.scheme1.surface1.object.mid}>
            アカウントあたり1つまで引換可 ／ 残り32個
          </Box>
        </Flex>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
