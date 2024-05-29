import { Box, Button } from '@mantine/core'
import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { NextPageWithLayout } from '../_app'
import { HeadingSection } from '../../components/99_lp/HeadingSection'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <HeadingSection />
    </>
  )
}

Page.getLayout = LLandingPageLayout

export default Page
