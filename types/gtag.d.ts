interface GA4Event {
  [key: string]: any
}

interface Window {
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string }): void
  gtag(type: 'event', eventAction: string, fieldObject?: GA4Event): void
}
