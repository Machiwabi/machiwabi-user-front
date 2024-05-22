import { Container } from '@mantine/core'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { TWaitingEventsTemplate } from '../../../componentsNew/templates/TWaitingEventsTemplate'
import { waitingMocks } from '../../../mocks/waiting.mock'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <TWaitingEventsTemplate
          mt={24}
          mb={40}
          heading="WAITING EVENTS"
          waitings={waitingMocks}
        />
        <TWaitingEventsTemplate
          my={40}
          heading="PAST EVENTS"
          waitings={waitingMocks}
        />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
