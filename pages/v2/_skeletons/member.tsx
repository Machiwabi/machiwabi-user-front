import { Box, Container, SimpleGrid } from '@mantine/core'
import { useRouter } from 'next/router'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingListItem } from '../../componentsNew/organisms/OWaitingListItem'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { waitingMock } from '../../mocks/waiting.mock'

const Page = () => {
  const router = useRouter()

  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="MEMBERS" />

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
