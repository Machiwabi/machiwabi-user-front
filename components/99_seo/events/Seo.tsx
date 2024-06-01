import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { nextSeoConfig } from '../../../next-seo.config'

type Props = {
  eventTitle: string
  eventDescription: string
  eventImageUrl?: string
}

const Component: FC<Props> = ({
  eventTitle,
  eventDescription,
  eventImageUrl,
}) => {
  return (
    <>
      <NextSeo
        title={`${eventTitle} | Mati-wabi (マチワビ)`}
        description={eventDescription}
        openGraph={{
          title: `${eventTitle} | Mati-wabi (マチワビ)`,
          description: eventDescription,
          images: [
            {
              url:
                eventImageUrl ||
                `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_twitterCard_default.png`,
              width: 2400,
              height: 1254,
              alt: 'ogp',
            },
          ],
        }}
        twitter={{
          ...nextSeoConfig.twitter,
        }}
        additionalMetaTags={[...nextSeoConfig.additionalMetaTags]}
      />
    </>
  )
}

export { Component as Seo }
