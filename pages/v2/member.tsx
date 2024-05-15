import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  ScrollArea,
  SimpleGrid,
} from '@mantine/core'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { ESectionHeading } from '../../componentsNew/elements/ESectionHeading'
import { EText } from '../../componentsNew/elements/EText/base'
import { OBoostersStatuses } from '../../componentsNew/organisms/OBoostersStatuses'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { OUserIcon } from '../../componentsNew/organisms/OUserIcon'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingListItem } from '../../componentsNew/organisms/OWaitingListItem'
import { BoosterType } from '../../generated/graphql'
import { waitingMock } from '../../mocks/waiting.mock'
import { colorScheme } from '../../theme/colorScheme'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()

  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />

        <Box px={16}>
          <ERollTabs
            tabs={[
              {
                name: 'HOME',
                isCurrent: false,
                action: () => {
                  router.push('/v2/')
                },
              },
              {
                name: 'MEMBERS',
                isCurrent: true,
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

        <Box px={16}>
          <ERollTabs
            tabs={[
              {
                name: 'ALL',
                isCurrent: true,
                action: () => {
                  router.push('/v2/')
                },
              },
              {
                name: 'OSHI',
                isCurrent: false,
                action: () => {},
              },
            ]}
          />
        </Box>

        <SimpleGrid px={16} spacing={16}>
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
          <OWaitingListItem waiting={waitingMock} />
        </SimpleGrid>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
