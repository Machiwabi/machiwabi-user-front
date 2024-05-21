import { Box, Container } from '@mantine/core'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../componentsNew/organisms/OHeaderGuestNav'
import { OWaitingCells } from '../../componentsNew/organisms/OWaitingCells'
import { waitingMocks } from '../../mocks/waiting.mock'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <Box mt={24} mb={40}>
          <EHeading.Section>WAITING EVENTS</EHeading.Section>
          <OWaitingCells mt={12} waitings={waitingMocks} />
        </Box>
        <Box my={40}>
          <EHeading.Section>PAST EVENTS</EHeading.Section>
          <OWaitingCells mt={12} waitings={waitingMocks} />
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
