import { useEffect } from 'react'
import LLandingPageLayout from '../../components/00_layouts/LLandingPageLayout'
import { BgSection } from '../../components/101_lp/enxross/BgSection'
import { FooterSection } from '../../components/101_lp/enxross/FooterSection'
import { HeadingSection } from '../../components/101_lp/enxross/HeadingSection'
import { HowToSection } from '../../components/101_lp/enxross/HowToSection'
import { StickyHeaderSection } from '../../components/101_lp/enxross/StickyHeaderSection'
import { Seo } from '../../components/99_seo/campaigns/enxross/Seo'
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
      <HowToSection my={{ base: 62, lg: 300 }} />
      <FooterSection mt={120} />
    </>
  )
}

Page.getLayout = LLandingPageLayout

export default Page
