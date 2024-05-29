import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { CtaSection } from '../../components/99_lp/CtaSection'
import { FeatureSection } from '../../components/99_lp/FeatureSection'
import { FooterSection } from '../../components/99_lp/FooterSection'
import { HeadingSection } from '../../components/99_lp/HeadingSection'
import { HeroSection } from '../../components/99_lp/HeroSection'
import { HowToSection } from '../../components/99_lp/HowToSection'
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
      <CtaSection my={{ base: 62, lg: 300 }} />
      <HowToSection my={{ base: 62, lg: 300 }} />
      <FooterSection mt={120} />
    </>
  )
}

Page.getLayout = LLandingPageLayout

export default Page
