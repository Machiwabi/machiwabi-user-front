import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { BgSection } from '../../components/99_lp/BgSection'
import { FeatureSection } from '../../components/99_lp/FeatureSection'
import { HeadingSection } from '../../components/99_lp/HeadingSection'
import { HeroSection } from '../../components/99_lp/HeroSection'
import { StickyHeaderSection } from '../../components/99_lp/StickyHeaderSection'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <StickyHeaderSection />
      {/* <BgSection /> */}
      <HeadingSection mt={120} mb={80} />
      <HeroSection mt={120} mb={80} />
      <FeatureSection my={{ base: 62, lg: 300 }} />
    </>
  )
}

Page.getLayout = LLandingPageLayout

export default Page
