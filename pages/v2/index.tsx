import { AspectRatio, Box, Container, Flex } from '@mantine/core'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { EText } from '../../componentsNew/elements/EText/base'
import { colorScheme } from '../../theme/colorScheme'
import { OUserIconWithStatuses } from '../../componentsNew/organisms/OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../../componentsNew/organisms/OUserWaitingStatuses'

const Page = () => {
  return (
    <>
      <Container size="xs" p={0}>
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
        </Box>
      </Container>
    </>
  )
}

export default Page
