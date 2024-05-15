import { AspectRatio, Box, Container, Divider, Flex } from '@mantine/core'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { EText } from '../../componentsNew/elements/EText/base'
import { colorScheme } from '../../theme/colorScheme'
import { OUserIconWithStatuses } from '../../componentsNew/organisms/OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../../componentsNew/organisms/OUserWaitingStatuses'
import { OBoostersStatuses } from '../../componentsNew/organisms/OBoostersStatuses'
import { BoosterType } from '../../generated/graphql'

const Page = () => {
  return (
    <>
      <Container size="xs" px={16} py={0}>
        <EHeading.PageHeading>
          ツイートをするツイートをするツイートをするツイートをするツイートをする
        </EHeading.PageHeading>
        <EHeading.SectionHeading>FORECAST</EHeading.SectionHeading>
        <EText.Desc1>
          ＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。
        </EText.Desc1>

        <Box py={40}>
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
          <Flex justify="space-between" align="center">
            <OUserIconWithStatuses
              displayName="danichang"
              waitingDuration={2000}
            />
            <OUserWaitingStatuses
              totalPoints={100000}
              secondPerTotalPoints={10}
              secondsPerWaitingPoint={10}
              isBoosting={false}
            />
          </Flex>
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
      </Container>
    </>
  )
}

export default Page
