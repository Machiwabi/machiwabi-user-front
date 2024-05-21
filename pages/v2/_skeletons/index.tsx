import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  ScrollArea,
} from '@mantine/core'
import { ESectionHeading } from '../../../componentsNew/elements/ESectionHeading'
import { EText } from '../../../componentsNew/elements/EText/base'
import { OBoostersStatuses } from '../../../componentsNew/organisms/OBoostersStatuses'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { OUserIcon } from '../../../componentsNew/organisms/OUserIcon'
import { OWaitingHeader } from '../../../componentsNew/organisms/OWaitingHeader'
import { OWaitingListItem } from '../../../componentsNew/organisms/OWaitingListItem'
import { OWaitingTabs } from '../../../componentsNew/organisms/OWaitingTabs'
import { BoosterType } from '../../../generated/graphql'
import { waitingMock } from '../../../mocks/waiting.mock'
import { colorScheme } from '../../../theme/colorScheme'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="HOME" />

        <Box px={16}>
          <AspectRatio
            w="100%"
            bg="black"
            style={{ borderRadiusTopleft: 16, MozBorderRadiusTopright: 16 }}
          >
            <Box w="100%" h="100%" />
          </AspectRatio>

          <Box p={16} bg={colorScheme.scheme1.surface2.surface}>
            <OWaitingListItem waiting={waitingMock} />
            <Divider my={16} />
            <OBoostersStatuses
              secondPerTotalPoints={10}
              secondsPerWaitingPoint={10}
              boosters={[
                {
                  name: 'booster1',
                  uniqueKey: 'booster1',
                  iconUrl: '/assets/images/_sample/picture_ranking_01.png',
                  boosterType: BoosterType.Mission,
                  durationSeconds: 10,
                  emoji: '😄',
                  multiplier: 1.5,
                },
                {
                  name: 'booster2',
                  uniqueKey: 'booster2',
                  iconUrl: '/assets/images/_sample/picture_ranking_02.png',
                  boosterType: BoosterType.Mission,
                  durationSeconds: 10,
                  emoji: '😄',
                  multiplier: 1.5,
                },
                {
                  name: 'booster3',
                  uniqueKey: 'booster3',
                  iconUrl: '/assets/images/_sample/picture_ranking_03.png',
                  boosterType: BoosterType.Mission,
                  durationSeconds: 10,
                  emoji: '😄',
                  multiplier: 1.5,
                },
              ]}
            />
          </Box>
        </Box>

        <Box component="section" my={40} px={16}>
          <ESectionHeading
            heading="WAITING MEMBERS - 32"
            tooltip={<>同じイベントを待っているユーザー一覧です</>}
            moreAction={() => {
              alert('more')
            }}
          />
          <Box mt={8}>
            <ScrollArea scrollbarSize={0}>
              <Flex gap={4}>
                {[...Array(26)].map((_, index) => {
                  return (
                    <OUserIcon
                      displayName="a"
                      w={32}
                      h={32}
                      iconImageUrl={`/assets/images/_sample/picture_ranking_0${
                        (index % 9) + 1
                      }.png`}
                    />
                  )
                })}
              </Flex>
            </ScrollArea>
          </Box>
        </Box>
        <Box component="section" my={40} px={16}>
          <ESectionHeading
            heading="MESSAGE"
            tooltip={<>hanzochangさんがイベントにかける思いです</>}
          />
          <Box mt={8}>
            <EText.Desc1>
              ＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。
            </EText.Desc1>
          </Box>
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
