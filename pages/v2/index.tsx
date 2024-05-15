import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  ScrollArea,
} from '@mantine/core'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { EText } from '../../componentsNew/elements/EText/base'
import { colorScheme } from '../../theme/colorScheme'
import { OUserIconWithStatuses } from '../../componentsNew/organisms/OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../../componentsNew/organisms/OUserWaitingStatuses'
import { OBoostersStatuses } from '../../componentsNew/organisms/OBoostersStatuses'
import { BoosterType } from '../../generated/graphql'
import { OWaitingListItem } from '../../componentsNew/organisms/OWaitingListItem'
import { waitingMock } from '../../mocks/waiting.mock'
import { ESectionHeading } from '../../componentsNew/elements/ESectionHeading'
import { OUserIcon } from '../../componentsNew/organisms/OUserIcon'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'

const Page = () => {
  return (
    <>
      <Container maw={410} p={0}>
        <OWaitingHeader />
        <Box py={24}>
          <ERollTabs
            tabs={[
              {
                name: 'HOME',
                isCurrent: true,
                action: () => {},
              },
              {
                name: 'MEMBERS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'MISSONS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'REWARDS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'BOOSTERS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'AQUIRES',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'INFORMATION',
                isCurrent: false,
                action: () => {},
              },
            ]}
          />
        </Box>

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
        <Box component="section" my={40}>
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
        <Box component="section" my={40}>
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
    </>
  )
}

export default Page
