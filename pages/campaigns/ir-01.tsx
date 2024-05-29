import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { NextPageWithLayout } from '../_app'
import { HeadingSection } from '../../components/99_lp/HeadingSection'
import { Container } from '@mantine/core'
import { StickyHeaderSection } from '../../components/99_lp/StickyHeaderSection'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Container maw={{ base: 640, lg: 1440 }} px={{ base: 24, lg: 0 }}>
        <StickyHeaderSection />
        <HeadingSection mt={120} mb={80} />
      </Container>
    </>
  )
}

Page.getLayout = LLandingPageLayout

export default Page
