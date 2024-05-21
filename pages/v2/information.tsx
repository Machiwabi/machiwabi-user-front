import { Container } from '@mantine/core'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../componentsNew/organisms/OHeaderGuestNav'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { TEventShowTemplate } from '../../componentsNew/templates/TEventShowTemplate'
import { eventMock } from '../../mocks/event.mock'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="INFORMATION" />

        <TEventShowTemplate event={eventMock} />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
