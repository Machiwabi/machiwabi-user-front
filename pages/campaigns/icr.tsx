import { useEffect } from 'react'
import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { BgSection } from '../../components/101_lp/BgSection'
import { CtaSection } from '../../components/101_lp/CtaSection'
import { FeatureSection } from '../../components/101_lp/FeatureSection'
import { FooterSection } from '../../components/101_lp/FooterSection'
import { HeadingSection } from '../../components/101_lp/HeadingSection'
import { HeroSection } from '../../components/101_lp/HeroSection'
import { HowToSection } from '../../components/101_lp/HowToSection'
import { StickyHeaderSection } from '../../components/101_lp/StickyHeaderSection'
import { Seo } from '../../components/99_seo/campaigns/icr/Seo'
import { GA4_CUSTOM_EVENT } from '../../constants/ga4CustomEvent'
import { ga4PushEvent } from '../../utils/ga4'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  useEffect(() => {
    ga4PushEvent(GA4_CUSTOM_EVENT.DISPLAY_PAGE_CAMPAIGN_ICR2406)
  }, [])

  return (
    <>
      <Seo />
      <StickyHeaderSection />
      <BgSection />
      <HeadingSection mt={120} mb={80} />
      {/* <CheckFirstLandingSection /> */}
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
