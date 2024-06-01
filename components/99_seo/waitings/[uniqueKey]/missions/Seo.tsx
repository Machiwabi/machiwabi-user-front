import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { nextSeoConfig } from '../../../../../next-seo.config'
import { applicationProperties } from '../../../../../constants/applicationProperties'

type Props = {
  missionName: string
  missionDescription: string
}

const Component: FC<Props> = ({ missionName, missionDescription }) => {
  const title = `${missionName} | Mati-wabi (マチワビ)`

  return (
    <>
      <NextSeo
        title={title}
        description={missionDescription}
        openGraph={{
          title,
          description: missionDescription,
          images: [
            {
              url: `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_twitterCard_campaign_icr.png`, // TODO イベントごとに設定、読み込む
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
