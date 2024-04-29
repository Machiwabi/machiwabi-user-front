import Script from 'next/script'
import React, { FC } from 'react'

export type GoogleAnalyticsId = `G-${string}`

type Props = {
  googleAnalyticsId: GoogleAnalyticsId
}

const GoogleAnalyticsV4: FC<Props> = ({ googleAnalyticsId }: Props) => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
    />
    <Script
      id="analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${googleAnalyticsId}');
        `,
      }}
    />
  </>
)

export default GoogleAnalyticsV4
