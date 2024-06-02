import { applicationProperties } from '../constants/applicationProperties'

export const googleAnalyticsId = applicationProperties.GOOGLE_ANALYTICS_ID

export const ga4PushEvent = (action: string, params?: GA4Event) => {
  console.debug('ga4PushEvent', action, params)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

export const ga4PushPageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', { page_path: location.pathname })
  }
}
