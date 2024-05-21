import { Box, Container } from '@mantine/core'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { OBoosters } from '../../componentsNew/organisms/OBoosters'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../componentsNew/organisms/OHeaderGuestNav'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { boosterMocks } from '../../mocks/booster.mock'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="BOOSTERS" />

        <Box mb={40} px={16}>
          <EHeading.ParagraphJa>有効なブースター</EHeading.ParagraphJa>
          <OBoosters mt={12} boosters={boosterMocks} />
        </Box>

        <Box my={40} px={16}>
          <EHeading.ParagraphJa>効果が終了したブースター</EHeading.ParagraphJa>
          <OBoosters mt={12} boosters={boosterMocks} />
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
